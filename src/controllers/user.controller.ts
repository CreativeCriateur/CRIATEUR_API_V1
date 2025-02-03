import { Request, Response } from "express";
import {
  changePassword,
  deleteUserAccount,
  getUserById,
  getUsersByIds,
  list,
  loginNoPassword,
  photoUpload,
  updateUser,
  createAccountInfo,
  updateAccountInfo,
  getAccountProfileList,
  getAllAccountProfile,
  getAllUsers
} from "../services/user.service";

export const handleGetListUser = async (req: Request, res: Response) => {
  return await list(req, res);
};

export const handleGetAllUser = async (req: Request, res: Response) => {
  return await getAllUsers(req, res);
};

export const handleGetUserById = async (req: Request, res: Response) => {
  return getUserById(req, res);
};

export const handleGetUsersByIds = async (req: Request, res: Response) => {
  return getUsersByIds(req, res);
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

export const handleChangePassword = async (req: Request, res: Response) => {
  return changePassword(req, res);
};

export const handleGetUserByEmail = async (req: Request, res: Response) => {
  return;
};

export const handleGetUserByPhone = async (req: Request, res: Response) => {
  return;
};

export const handlePhotoUpload = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log("inside the photo upload controller");
  return await photoUpload(req, res);
};

//// Account Profile

export const handleCreateAccountInfo = async (req: Request, res: Response) => {
  return await createAccountInfo(req, res);
};

export const handleGetAccountProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllAccountProfile(req, res);
};

export const handleGetAccountProfileList = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAccountProfileList(req, res);
};

export const handleUpdateAccountInfo = async (req: Request, res: Response) => {
  return await updateAccountInfo(req, res);
};
