import { Request, Response } from "express";
import { createWaitList, list } from "../services/waitList.service";

export const handleCreateWaitList = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await createWaitList(req, res);
};

export const handleGetAllWaitList = async (req: Request, res: Response) => {
  return await list(req, res);
};
