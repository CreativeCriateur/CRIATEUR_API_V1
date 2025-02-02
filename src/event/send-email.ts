import path from "path";
import * as fs from "fs";
import Mustache from "mustache";
import { config } from "../config";
import { publishMessage } from "../redis/pubsub";

type EmailPayload = {
  recipients: string[];
  subject: string;
  html: string;
};

const toTitleCase = (str: any) => {
  if (str === null || str === undefined) {
    return "";
  }
  return str.replace(/\w\S*/g, (txt: string) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const getTemplateFile = (templateName: string) => {
  let templatePath = `../../templates/${templateName}.html`;
  return templatePath;
};

export const sendEmail = async (payload: EmailPayload) => {
  // const pubsub = new Pubsub();
  const data = {
    recipients: payload.recipients,
    subject: payload.subject,
    html: payload.html
  };
  publishMessage("EmailSendEvent", JSON.stringify(data));
};

const generateEmailVerifyLink = (payload: any): string => {
  const { resetPassword } = payload;
  // Logger.log(`config.isDevelopment = ${config.isDevelopment}`);
  let url;
  if (config.isDevelopment) {
    url = `https://dev.criateur.com`;
  } else if (config.isStaging || config.isTesting) {
    url = `https://staging.criateur.com`;
  } else {
    url = `https://criateur.com`;
  }

  console.log(
    `url = ${url}/email/verify?auth_token=${payload.registrationToken}${
      resetPassword ? "&resetPassword=true" : ""
    }`
  );

  return `${url}/email/verify?auth_token=${payload.registrationToken}${
    resetPassword ? "&resetPassword=true" : ""
  }`;
};

export const sendUserSignUpVerifyEmail = (payload: any) => {
  const templatePath = getTemplateFile("user_signup_verify");
  const templateString = fs.readFileSync(
    path.join(__dirname, templatePath),
    "utf-8"
  );

  payload.firstName = toTitleCase(payload.fullName.split(" ")[0]);
  payload.link = generateEmailVerifyLink(payload);

  const rendered = Mustache.render(templateString, { user: payload });
  const emailData = {
    recipients: [payload.email],
    subject: "Please verify your email address",
    html: rendered
  };
  //console.log(emailData);
  sendEmail(emailData);
};

export const sendOtpToUser = (user: any, otp: string) => {
  const templateString = fs.readFileSync(
    path.join(__dirname, "../../templates/otp.html"),
    "utf-8"
  );

  otp = otp.split("").join(" ");
  const rendered = Mustache.render(templateString, { otp });
  const emailData = {
    recipients: [user.email],
    subject: "Your Verification token",
    html: rendered
  };
  sendEmail(emailData);
};
