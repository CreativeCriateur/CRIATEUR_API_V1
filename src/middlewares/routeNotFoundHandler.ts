import { Request, Response } from "express";

export function routeNotFoundHandler(req: Request, res: Response): any {
  const error = new Error("Route not found");
  return res.status(404).json({ error: error.message });
}
