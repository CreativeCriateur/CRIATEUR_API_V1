import { Request, Response } from "express";
import {
  loginUser,
  createUser,
  verifyUserOTP,
  generateNewUserOTP
} from "./user.service";
import {
  sendOtpToUser,
  sendUserSignUpFileVerifyEmail
} from "../event/send-email";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from "../utils/jwt";
import { generateOtp } from "../utils/otps";

//
export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await createUser(req, res);
    const userId = user.dataValues.uuid;
    const email = user.dataValues.email;

    // send an email with redis and pubsub
    if (email) {
      //sendUserSignUpFileVerifyEmail(user.dataValues);
    }

    const otp = await generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.update({ otp, otpExpiry }); // update the users table

    if (email) {
      // await sendOtpToUser(email, otp);
    }

    return res.status(201).json({
      message:
        "New User registered successfully! Please check your email to verify your account",
      id: user.dataValues.uuid,
      status: true
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<any> => {
  const result = await verifyUserOTP(req, res);
  return result;
};

export const generateNewOtp = async (
  req: Request,
  res: Response
): Promise<any> => {
  const result = await generateNewUserOTP(req, res);
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req, res);

    delete user.dataValues.password;
    delete user.dataValues.confirmPassword;
    const userId = user.dataValues.uuid;
    const accessToken = await generateAccessToken(userId);
    const refreshToken = await generateRefreshToken(userId);
    // save refreshtoken inside the database;
    // const login =
    user.registrationToken = refreshToken;
    await user.save();

    return res.status(200).json({
      message: "Login successfully",
      data: user,
      accessToken,
      refreshToken,
      status: true
    });
  } catch (error) {
    console.log(error);
  }
};

export const generateNewAccessToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshToken.includes(refreshToken)) {
    return res
      .status(403)
      .json({ message: "Invalid refresh token", status: false });
  }

  try {
    const decoded: any = await verifyRefreshToken(refreshToken);
    const newAccessToken = await generateAccessToken(decoded.userId);
    return res.status(200).json({ accessToken: newAccessToken, status: true });
  } catch (error: any) {
    return res.status(500).json({
      message: `Invalid or expired refresh token or ${error.message}`,
      status: false
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  const { refreshToken } = req.body;
  // delete refreshToken from redis or database stored
  return res.json({ message: "Logged out" });
};
