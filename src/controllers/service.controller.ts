import { Request, Response } from "express";
import {
  getAllServiceList,
  getAllServices,
  getServiceById,
  updateServiceById
} from "../services/services.service";

export const handleGetAllSevice = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllServices(req, res);
};

export const handleGetServiceList = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllServiceList(req, res);
};

export const handleGetServiceById = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getServiceById(req, res);
};

export const handleUpdateService = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await updateServiceById(req, res);
};
