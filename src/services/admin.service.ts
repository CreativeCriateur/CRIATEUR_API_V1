import { Request, Response } from "express";
import db from "../models";
import { createResource } from "./resource.service";
import { createPermission } from "./permission.service";
import {
  addPermissionsToRole,
  addPermissionToRole,
  deletePermissionsToRole,
  deletePermissionToRole
} from "./roles.service";

export const assignRole = async (req: Request, res: Response): Promise<any> => {
  const { userId, roleName } = req.body;
  try {
    const user = await db.User.findByPk(userId);
    const role = await db.Role.findOne({
      where: { name: roleName.trim().toUpperCase() }
    });

    if (!user || !role) {
      return res
        .status(404)
        .json({ error: "User or Role not found", status: false });
    }
    await user.addRole(role);
    res.json({ message: "Role assigned successfully", status: true });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      status: false
    });
  }
};

export const getUserRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const user = await db.User.findOne({
      where: { id },
      include: [db.Role]
    });

    if (!user) {
      return res.status(404).json({ error: "User not found", status: false });
    }

    res.status(200).json({
      roles: user?.dataValues.Roles?.map((role: any) => role?.name),
      status: true
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      status: false
    });
  }
};

export const addResource = async (
  req: Request,
  res: Response
): Promise<any> => {
  const result = await createResource(req, res);
  return res.status(201).json({
    message: "Resource added successfully!",
    data: result,
    status: true
  });
};

export const addPermission = async (
  req: Request,
  res: Response
): Promise<any> => {
  const result = await createPermission(req, res);
  res.status(201).json({
    message: "Permission added successfully!",
    data: result,
    status: true
  });
};

export const adminAddPermissionToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  const role = await addPermissionToRole(req, res);
  res.status(201).json({
    message: "permission added to role successfully",
    role,
    status: true
  });
};

export const adminAddPermissionsToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  const role = await addPermissionsToRole(req, res);
  res.status(201).json({
    message: "permissions added to role successfully",
    role,
    status: true
  });
};

export const adminDeletePermissionToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await deletePermissionToRole(req, res);
};

export const adminDeletePermissionsToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await deletePermissionsToRole(req, res);
};
