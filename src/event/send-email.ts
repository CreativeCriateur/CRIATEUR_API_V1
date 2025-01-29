import path from "path";
import * as fs from "fs";
import { SUPPORTED_FRENCH_COUNTRY } from "../utils";
import Mustache from "mustache";
import { config } from "../config";
import { publishMessage } from "../redis/pubsub";
import * as frenchEmailTranslation from "../i18/fr/email.json";

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

export const getTemplateFile = (country = "NG", templateName: string) => {
  let templatePath = `../../templates/${templateName}.html`;
  if (SUPPORTED_FRENCH_COUNTRY.includes(country.toUpperCase())) {
    templatePath = `../../templates/fr/${templateName}.html`;
  }

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

export const handleTranslation = (country = "NG", text: string) => {
  let translatedText = text;
  if (SUPPORTED_FRENCH_COUNTRY.includes(country.toUpperCase())) {
    const translationObject = frenchEmailTranslation;
    translatedText =
      translationObject["Please verify your emaill address"] || text;
  }

  return translatedText;
};

const generateEmailVerifyLink = (payload: any): string => {
  const { resetPassword } = payload;
  // Logger.log(`config.isDevelopment = ${config.isDevelopment}`);
  let url;
  if (config.isDevelopment) {
    url = `https://marketplace.dev.myautochek.com/${payload.country.toLowerCase()}`;
  } else if (config.isStaging || config.isTesting) {
    url = `https://marketplace.staging.myautochek.com/${payload.country.toLowerCase()}`;
  } else {
    url = `https://autochek.africa/${payload.country.toLowerCase()}`;
  }

  console.log(`node env config.isDeve true or false = ${config.isDevelopment}`);
  console.log(`url = ${url}`);

  console.log(
    `url = ${url}/email/verify?auth_token=${payload.token}${
      resetPassword ? "&resetPassword=true" : ""
    }`
  );

  return `${url}/email/verify?auth_token=${payload.token}${
    resetPassword ? "&resetPassword=true" : ""
  }`;
};

export const sendUserSignUpVerifyEmail = (payload: any) => {
  const templatePath = getTemplateFile(payload.country, "user_signup_verify");
  const templateString = fs.readFileSync(
    path.join(__dirname, templatePath),
    "utf-8"
  );

  payload.firstname = toTitleCase(payload.firstname);
  payload.link = generateEmailVerifyLink(payload);

  const rendered = Mustache.render(templateString, { user: payload });
  const emailData = {
    recipients: [payload.email],
    subject: handleTranslation(
      payload.country,
      "Please verify your email address"
    ),
    html: rendered
  };
  sendEmail(emailData);
};

export const sendFranchiseCreationEmail = (payload: any, country = "NG") => {
  const templatePath = getTemplateFile(country, "franchise_signup");

  const templateString = fs.readFileSync(
    path.join(__dirname, templatePath),
    "utf-8"
  );

  payload.name = toTitleCase(payload.name);

  const rendered = Mustache.render(templateString, { franchise: payload });
  const emailData = {
    recipients: [payload.email],
    subject: handleTranslation(payload.country, "Welcome to Autochek"),
    html: rendered
  };
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
