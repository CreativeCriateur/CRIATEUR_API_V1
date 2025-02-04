import { Request, Response } from "express";
import db from "../models";

export const addRole = async (req: Request, res: Response): Promise<any> => {
  const { name } = req.body;
  if (!name || !name.trim().length) {
    return res
      .status(400)
      .json({ message: "name cannot be empty", status: false });
  }

  try {
    const roleDetails = {
      name: name.trim().toUpperCase()
    };
    const result = await db.Role.create(roleDetails);

    return res
      .status(201)
      .json({ message: "Role added successfully", data: result, status: true });
  } catch (error) {
    console.log(error);
  }
};

export const addPermissionToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { roleId, permissionId } = req.params;

  const role = await db.Role.findByPk(roleId);
  const permission = await db.Permission.findById(permissionId);
  //

  if (!role || !permission) {
    return res
      .status(400)
      .json({ message: "Role or Permission not found", status: false });
  }

  try {
    await role.addPermission(permission);
    //await role.save();
    return role;
  } catch (error: any) {
    console.log(error);
  }
};

export const addPermissionsToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { roleId } = req.params;
  const { permissionIds } = req.body;

  const role = await db.Role.findByPk(roleId);
  const permissions = await db.Permission.findAll({
    where: { id: permissionIds }
  });
  if (!role || permissions.length === 0) {
    return res
      .status(400)
      .json({ message: "Role or Permissions not found", status: false });
  }

  try {
    await role.addPermissions(permissions);

    //await role.save();
    return role;
  } catch (error: any) {
    console.log(error);
  }
};

export const getAllRole = async (req: Request, res: Response): Promise<any> => {
  try {
    const roles = await db.Role.findAll();

    return res.status(200).json({ roles, status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

export const getAllListRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const currentPage = req.params.currentPage || 0;
    const pageSize = req.params.pageSize || 10;

    const { rows, count } = await db.Role.findAndCountAll({
      limit: pageSize,
      offset: currentPage
    });

    return res.status(200).json({
      rows,
      pagination: {
        count,
        currentPage,
        pageSize
      }
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

export const getRoleById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const role = await db.Role.findOne({
      where: { id }
    });

    if (!role) {
      return res.status(400).json({ message: "Role not found", status: false });
    }
    return res.status(200).json({ role, status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

// get all roles with permission with no pagination
export const getAllPermissionToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const roles = await db.Role.findAll({
      include: [
        {
          model: db.Permission,
          include: [
            {
              model: db.Resource
            }
          ],
          through: { attributes: [] }
        }
      ]
    });

    return res.status(200).json({ roles, status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

// get all roles with permission with no pagination
export const getAllPermissionListToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const currentPage = req.params.currentPage || 0;
    const pageSize = req.params.pageSize || 10;

    const { rows, count } = await db.Role.findAndCountAll({
      include: [
        {
          model: db.Permission,
          include: [
            {
              model: db.Resource
            }
          ],
          through: { attributes: [] }
        }
      ],
      limit: pageSize,
      offset: currentPage
    });

    return res.status(200).json({
      rows,
      pagination: {
        count,
        currentPage,
        pageSize
      }
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

export const getRoleByIdWithPermission = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const role = await db.Role.findOne({
      where: { id },
      include: [
        {
          model: db.Permission,
          include: [
            {
              model: db.Resource
            }
          ]
        }
      ]
    });
    if (!role)
      return res
        .status(400)
        .json({ message: "Role not found ", status: false });
    return res.status(200).json({ role, status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

// Replace all permissions for a role
export const updatePermissionsToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { roleId } = req.params;
    const { permissionIds } = req.body;

    const role = await db.Role.findByPk(roleId);
    const permissions = await db.Permission.findAll({
      where: { id: permissionIds }
    });

    if (!role || permissions.length === 0) {
      return res.status(400).json({ message: "Role or Permissions not found" });
    }

    await role.setPermissions(permissions);
    return res
      .status(200)
      .json({ message: "Permissions replaced successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Remove a single permission from a role
export const deletePermissionToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { roleId, permissionId } = req.params;

    const role = await db.Role.findByPk(roleId);
    const permission = await db.Permission.findByPk(permissionId);

    if (!role || !permission) {
      return res
        .status(400)
        .json({ message: "Role or Permission not found", status: false });
    }

    await role.removePermission(permission);
    return res
      .status(200)
      .json({ message: "Permission removed successfully!", status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

// Remove multiple permissions from a role
export const deletePermissionsToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { roleId } = req.params;
    const { permissionIds } = req.body;

    const role = await db.Role.findByPk(roleId);
    const permissions = await db.Permission.findAll({
      where: { id: permissionIds }
    });

    if (!role || !permissions) {
      return res
        .status(400)
        .json({ message: "Role or Permissions not found", status: false });
    }

    await role.removePermissions(permissions);
    return res
      .status(200)
      .json({ message: "Permissions removed successfully!", status: true });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

export const getUserAuthority = async (userId: string): Promise<any> => {
  // const userRoles = await db.Role.findAll({
  //   where: {}
  // });
  return;
};
