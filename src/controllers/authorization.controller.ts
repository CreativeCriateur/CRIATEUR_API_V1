import { Request, Response } from "express";
import {
  deletePermission,
  getAllPermissions,
  getPermissionById,
  getPermissionByIdWithResource,
  getPermissionByIdWithRole
} from "../services/permission.service";
import {
  deleteResource,
  getAllResources,
  getAllResourcesList,
  getResourceById,
  getAllResourceWithPermission,
  getResourceByIdWithPermission
} from "../services/resource.service";
import {
  addRole,
  addPermissionToRole,
  addPermissionsToRole,
  getRoleByIdWithPermission,
  getAllRole,
  getAllPermissionToRole,
  getRoleById,
  updatePermissionsToRole,
  deletePermissionToRole,
  deletePermissionsToRole,
  getAllListRole,
  getAllPermissionListToRole
} from "../services/roles.service";

import { logout } from "../services/authentication.service";

/// Users

//// Resources

export const handleGetResources = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllResources(req, res);
};

export const handleGetResourcesList = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllResourcesList(req, res);
};

export const handleGetResourceById = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getResourceById(req, res);
};

export const handleGetResourceWithPermission = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllResourceWithPermission(req, res);
};

export const handleGetResourceByIdWithPermission = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getResourceByIdWithPermission(req, res);
};

export const handleDeleteResource = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await deleteResource(req, res);
};

//// Permissions

export const handleGetListPermission = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllPermissions(req, res);
};

export const handleGetPermissionById = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getPermissionById(req, res);
};

export const handleGetPermissionByIdWithRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getPermissionByIdWithRole(req, res);
};

export const handleGetPermissionByIdWithResource = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getPermissionByIdWithResource(req, res);
};

export const handleDeletePermission = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await deletePermission(req, res);
};

///// Roles

export const handleCreateRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await addRole(req, res);
};

export const handleGetAllRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllRole(req, res);
};

export const handleGetListRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllListRole(req, res);
};

export const handleGetRoleWithPermissions = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllPermissionToRole(req, res);
};

export const handleGetRoleListWithPermissions = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllPermissionListToRole(req, res);
};

export const handleGetRoleById = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getRoleById(req, res);
};

export const handleGetRoleByIdWithPermission = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getRoleByIdWithPermission(req, res);
};

export const handleUpdatePermissionsToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await updatePermissionsToRole(req, res);
};

//// logout
export const handleLogoutUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await logout(req, res);
};
