import { Request, Response } from "express";
import db from "../models";

export const createServices = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, description, pricing } = req.body;

  try {
    if (!name || !name.trim().length) {
      return res
        .status(400)
        .json({ message: "service name cannot be empty", status: false });
    }
    if (!description || !description.trim().length) {
      return res.status(400).json({
        message: "service description cannot be empty",
        status: false
      });
    }

    if (!pricing || !pricing.trim().length) {
      return res
        .status(400)
        .json({ message: "service price cannot be empty", status: false });
    }

    const serviceData = {
      name,
      description,
      pricing,
      isDeleted: false
    };

    const result = await db.Service.create(serviceData);
    return res
      .status(201)
      .json({ message: "Service added successfully", result, status: true });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "internal server error",
      status: false
    });
  }
};

export const getAllServices = async (
  req: Request,
  res: Response
): Promise<any> => {
  const services = await db.Service.findAll();
  return res.status(200).json({ services, status: true });
};

export const getAllServiceList = async (
  req: Request,
  res: Response
): Promise<any> => {
  const currentPage = req.params.currentPage || 0;
  const pageSize = req.params.pageSize || 10;

  const { rows, count } = await db.Service.findAndCountAll({
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
};

export const getServiceById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const service = await db.Service.findOne({
      where: { id, isDeleted: false }
    });

    if (!service) {
      return res
        .status(400)
        .json({ message: "Service not found ", status: false });
    }
    return res.status(200).json({ service });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      status: false
    });
  }
};

export const updateServiceById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const data = req.body;
  let service = null;
  try {
    if (id) {
      service = await db.Service.findByPk(id);
    }

    if (!service) {
      return res
        .status(400)
        .json({ message: "Service not found", status: false });
    }
    service = Object.assign(service, data);

    await service.save();
    return res.status(200).json({
      message: "Service updated successfully!",
      service,
      status: true
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      status: false
    });
  }
};

export const deleteService = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id, deleteReason } = req.body;
  try {
    const service = await db.Service.findOne({
      where: { id, isDeleted: false }
    });
    if (!service) {
      return res
        .status(400)
        .json({ message: "service not found", status: false });
    }
    const updateData = {
      isDeleted: true,
      deletedAt: new Date().toISOString(),
      deleteReason: deleteReason || service.deleteReason
    };
    const updatedService = await db.Service.update(updateData, {
      where: {
        id: service.id
      }
    });

    return res
      .status(200)
      .json({ message: "Service deleted", status: true, updatedService });
  } catch (error: any) {
    return res.status(500).json({
      message:
        `Error deleting service ${error.message}` || "Internal server error",
      status: false
    });
  }
};
