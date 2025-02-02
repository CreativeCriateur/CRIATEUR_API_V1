import { Request, Response } from "express";
import db from "../models";

export const createResource = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, url } = req.body;

  if (!name || !name.trim().length) {
    return res
      .status(400)
      .json({ message: "resource name cannot be empty", status: false });
  }
  if (!url || !url.trim().length) {
    return res
      .status(400)
      .json({ message: "resource url cannot be empty", status: false });
  }
  try {
    if (name !== null && url !== null) {
      const resourceDetail = {
        name: name.trim(),
        url
      };

      const dataResult = await db.Resource.create(resourceDetail);

      return res.status(201).json({
        message: "Resource added successfully!",
        data: dataResult,
        status: true
      });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: true });
  }
};

export const getAllResources = async (
  req: Request,
  res: Response
): Promise<any> => {
  const resources = await db.Resource.findAll({ include: db.Permission });
  return res.status(200).json({ resources, status: 200 });
};

export const getResourceById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const resource = await db.Resource.findByPk(id, { include: db.Permission });
    if (!resource)
      return res
        .status(404)
        .json({ message: "Resource not found", status: false });
    return res.status(200).json({ resource, status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: true });
  }
};

export const deleteResource = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    await db.Resource.destroy({ where: { id: req.params.id } });
    return res.json({ message: "Resource deleted successfully", status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: true });
  }
};
