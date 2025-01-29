import { Request, Response, NextFunction } from "express";

export function corsHandlers(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  res.header("Access-Control-Allow-Origin", req.header("Origin"));
  res.header(
    "Access-Control-Allow-Origin",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, GET, POST, PATCH, DELETE, HEAD"
    );
    return res.status(200).json({});
  }
  next();
}
