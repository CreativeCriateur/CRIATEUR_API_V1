import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token: any = authHeader && authHeader.split(" ")[1];
  console.log("token ", token);

  try {
    if (!token) {
      res
        .status(401)
        .json({ message: "Access Token required!", status: false });
    }

    let verified = null;
    verified = await verifyAccessToken(token);
    console.log("verified ", verified);
    if (!verified) {
      res
        .status(403)
        .json({ message: "Invalid or expired token", status: false });
    }
    next();
  } catch (error: any) {
    console.error("Error during token verification: ", error);
    res.status(500).json({
      message: error.message || "Internal Server Error",
      status: false
    });
  }
};
