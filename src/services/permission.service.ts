import { Request, Response } from "express";
import db from "../models";

export const createPermission = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, resourceId } = req.body;
  let resource = null;
  if (resourceId) {
    resource = await db.Resource.findOne({
      where: { id: resourceId }
    });
  }

  if (!name || !name.trim().length) {
    return res
      .status(400)
      .json({ message: "permission name cannot be empty", status: false });
  }
  try {
    if (resource !== null) {
      const permissionDetail = {
        name: name.trim().toUpperCase(),
        resourceId
      };

      const dataResult = await db.Permission.create(permissionDetail);
      console.log(dataResult);
      const result = {
        ...dataResult,
        resource
      };
      return res.status(201).json({
        message: "Permission added successfully!",
        data: result,
        status: true
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllPermissions = async (
  req: Request,
  res: Response
): Promise<any> => {
  const permissions = await db.Permission.findAll();
  return res.status(200).json({ permissions, status: true });
};

export const getPermissionById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const permission = await db.Permission.findByPk(id);

    if (!permission)
      return res
        .status(404)
        .json({ message: "Permission not found", status: false });
    return res.status(200).json({ permission, status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

export const getPermissionByIdWithRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const permission = await db.Permission.findOne({
      where: { id },
      include: { model: db.Role }
    });
    if (!permission)
      return res
        .status(400)
        .json({ message: "Permission not found ", status: false });
    return res.status(200).json({ permission, status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

export const getPermissionByIdWithResource = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const permission = await db.Permission.findOne({
      where: { id },
      include: { model: db.Resource }
    });
    if (!permission)
      return res
        .status(400)
        .json({ message: "Permission not found ", status: false });
    return res.status(200).json({ permission, status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

export const deletePermission = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    await db.Permission.destroy({ where: { id } });
    return res
      .status(209)
      .json({ message: "Permission deleted successfully", status: true });
  } catch (error: any) {
    return res.status(209).json({ message: error.message, status: false });
  }
};
