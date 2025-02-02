import * as jwt from "jsonwebtoken";
import { config } from "../config";
import { Request, Response } from "express";
import { loginUser, createUser } from "./user.service";
import { sendUserSignUpVerifyEmail } from "../event/send-email";

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await createUser(req, res);
    const userId = user.dataValues.uuid;
    user.dataValues.registrationToken = await generateToken(userId);

    // send an email
    if (user.dataValues.email) {
      sendUserSignUpVerifyEmail(user.dataValues);
    }

    return res.status(201).json({
      message:
        "New User registered successfully! Please check your email to verify your account",
      id: user.dataValues.uuid,
      status: true
    });
  } catch (error) {}
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req, res);
    delete user.dataValues.password;
    delete user.dataValues.confirmPassword;
    const userId = user.dataValues.uuid;
    const token = await generateToken(userId);
    return res
      .status(200)
      .json({ message: "Login successfully", data: user, token, status: true });
  } catch (error) {
    console.log(error);
  }
};

export const generateToken = async (userId: string) => {
  try {
    const secret = await getSecretKey();
    return jwt.sign({ userId }, secret, {
      algorithm: "HS512",
      expiresIn: "365d"
    });
  } catch (error) {
    console.log(error);
  }
};

export const generateShortToken = async (userId: string): Promise<any> => {
  try {
    const secret = await getSecretKey();
    return jwt.sign({ userId }, secret, {
      algorithm: "HS512",
      expiresIn: 300 // 5 mins
    });
  } catch (error) {
    console.log(error);
  }
};

const getSecretKey = async () => {
  return config.secretKey;
};
