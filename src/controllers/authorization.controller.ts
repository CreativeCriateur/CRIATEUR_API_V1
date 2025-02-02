import { Request, Response } from "express";
import { login, register } from "../services/authorization.service";
import {
  createPermission,
  deletePermission,
  getAllPermissions,
  getPermissionById,
  getPermissionByIdWithResource,
  getPermissionByIdWithRole
} from "../services/permission.service";
import {
  createResource,
  deleteResource,
  getAllResources,
  getResourceById
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
  deletePermissionsToRole
} from "../services/roles.service";

/// Users
export const handleRegisterUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await register(req, res);
};

export const handleLoginUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await login(req, res);
};

//// Resources

export const handleCreateResource = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await createResource(req, res);
};

export const handleGetListResources = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllResources(req, res);
};

export const handleGetResourceById = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getResourceById(req, res);
};

export const handleDeleteResource = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await deleteResource(req, res);
};

//// Permissions

export const handleCreatePermission = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await createPermission(req, res);
};

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

export const handleAddPermissionToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await addPermissionToRole(req, res);
};

export const handleAddPermissionsToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await addPermissionsToRole(req, res);
};

export const handleGetListRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllRole(req, res);
};

export const handleGetRoleById = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getRoleById(req, res);
};

export const handleGetRoleWithPermissions = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getAllPermissionToRole(req, res);
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

export const handleDeletePermissionToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await deletePermissionToRole(req, res);
};

export const handleDeletePermissionsToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await deletePermissionsToRole(req, res);
};
