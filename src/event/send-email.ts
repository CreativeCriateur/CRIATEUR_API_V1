import path from "path";
import * as fs from "fs";
import Mustache from "mustache";
import { config } from "../config";
import { publishMessage } from "../redis/pubsub";
import { Request, Response } from "express";
import { generateOtp } from "../utils/otps";
import { isValidEmail } from "../utils/helpers";
import db from "../models";

type EmailHtmlPayload = {
  recipients: string[];
  subject: string;
  html: string;
};

type EmailPayload = {
  recipients: string;
  subject: string;
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

export const sendHtmlEmail = async (payload: EmailHtmlPayload) => {
  // const pubsub = new Pubsub();
  const data = {
    recipients: payload.recipients,
    subject: payload.subject,
    html: payload.html
  };
  publishMessage("EmailSendEvent", JSON.stringify(data));
};

export const sendEmail = async (payload: EmailPayload) => {
  // const pubsub = new Pubsub();
  const data = {
    recipients: payload.recipients,
    subject: payload.subject
  };
  // use SendGrid to send email and Redis
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

export const sendUserSignUpFileVerifyEmail = (payload: any) => {
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
  sendHtmlEmail(emailData);
};

export const sendOtpFileToUser = async (user: any, otp: string) => {
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
  sendHtmlEmail(emailData);
};

export const sendOtpToUser = async (recipient: string, otp: string) => {
  otp = otp.split("").join(" ");

  const emailData = {
    recipients: recipient,
    subject: "Your Verification OTP",
    text: `Please verify your email address using this verification code ${otp}`
  };
  return sendEmail(emailData);
};

export const resendOtpFileToUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;
  const data = req.body;
  let user = null;

  if (email && !isValidEmail(email)) {
    return await res.status(400).json({
      message: "Invalid email address supplied",
      success: false
    });
  }

  user = await db.User.findAll({
    where: {
      email
    }
  });

  if (!user)
    return await res
      .status(400)
      .json({ message: "User not found", status: false });

  if (user.isActive)
    return await res
      .status(400)
      .json({ message: "User already verified", status: false });

  try {
    const otp = await generateOtp();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() * 10 * 60 * 1000);
    sendOtpFileToUser(email, otp);
    await db.User.create(user);

    return await res.status(201).json({
      message: "OTP resent successfully! Please verify your OTP sent",
      status: true
    });
  } catch (error: any) {
    return await res
      .status(500)
      .json({ message: error.message, status: false });
  }
};
