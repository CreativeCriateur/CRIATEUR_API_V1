import { Request, Response } from "express";
import {
  addPermission,
  addResource,
  adminAddPermissionsToRole,
  adminAddPermissionToRole,
  adminDeletePermissionsToRole,
  adminDeletePermissionToRole,
  assignRole,
  getUserRole
} from "../services/admin.service";
import { createServices, deleteService } from "../services/services.service";

export const handleAssignRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await assignRole(req, res);
};

export const handleGetUserRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await getUserRole(req, res);
};

//// Resources

export const handleCreateResource = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await addResource(req, res);
};

///// Permission

export const handleCreatePermission = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await addPermission(req, res);
};

export const handleDeletePermissionToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await adminDeletePermissionToRole(req, res);
};

export const handleDeletePermissionsToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await adminDeletePermissionsToRole(req, res);
};

////// Roles

export const handleAddPermissionToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await adminAddPermissionToRole(req, res);
};

export const handleAddPermissionsToRole = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await adminAddPermissionsToRole(req, res);
};

///// Service

export const handleAddService = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await createServices(req, res);
};

export const handleDeleteService = async (
  req: Request,
  res: Response
): Promise<any> => {
  return await deleteService(req, res);
};
