import { Request, Response } from "express";
import {
  changePassword,
  createUser,
  deleteUserAccount,
  getUserById,
  getUsersByIds,
  list,
  loginNoPassword,
  loginUser,
  photoUpload,
  updateUser,
  verifyOTP,
  createAccountInfo,
  updateAccountInfo
} from "../services/user.service";

export const handleGetListUser = async (req: Request, res: Response) => {
  return await list(req, res);
};

export const handleUpdateUser = async (req: Request, res: Response) => {
  return await updateUser(req, res);
};

export const handleDeleteUser = async (req: Request, res: Response) => {
  return deleteUserAccount(req, res);
};

export const handleLoginNoPassword = async (req: Request, res: Response) => {
  return loginNoPassword(req, res);
};

export const handleVerifyOtp = async (req: Request, res: Response) => {
  return verifyOTP(req, res);
};

export const handleChangePassword = async (req: Request, res: Response) => {
  return changePassword(req, res);
};

export const handleGetAllUser = async (req: Request, res: Response) => {
  return;
};

export const handleGetUserByEmail = async (req: Request, res: Response) => {
  return;
};

export const handleGetUserByPhone = async (req: Request, res: Response) => {
  return;
};

export const handleGetUserById = async (req: Request, res: Response) => {
  return getUserById(req, res);
};

export const handleGetUsersByIds = async (req: Request, res: Response) => {
  return getUsersByIds(req, res);
};

export const handlePhotoUpload = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log("inside the photo upload controller");
  return await photoUpload(req, res);
};

export const handleCreateAccountInfo = async (req: Request, res: Response) => {
  return createAccountInfo(req, res);
};

export const handleUpdateAccountInfo = async (req: Request, res: Response) => {
  return await updateAccountInfo(req, res);
};
