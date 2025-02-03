import { Request, Response } from "express";
import {
  register,
  login,
  verifyOTP,
  generateNewOtp,
  generateNewAccessToken
} from "../services/authentication.service";

export const handleRegisterUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await register(req, res);
};

export const handleVerifyOtp = async (req: Request, res: Response) => {
  return verifyOTP(req, res);
};

export const handleNewOtp = async (req: Request, res: Response) => {
  return generateNewOtp(req, res);
};

export const handleLoginUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await login(req, res);
};

export const handleNewAccessToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await generateNewAccessToken(req, res);
};
