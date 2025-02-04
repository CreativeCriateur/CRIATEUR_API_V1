import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyAccessToken } from "../utils/jwt";

interface AuthRequest extends Request {
  user?: { userId: string; roles: string[] };
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token: any = authHeader && authHeader.split(" ")[1];

  try {
    if (!token) {
      res
        .status(401)
        .json({ message: "Access Token required!", status: false });
    }

    let verified = null;
    verified = await verifyAccessToken(token);
    if (!verified) {
      res
        .status(403)
        .json({ message: "Invalid or expired token", status: false });
    }
    req.user = verified;
    next();
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      status: false
    });
  }
};

export const authorize = (requiredRoles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): any => {
    const authReq = req as AuthRequest;
    console.log("authReq ", authReq?.user);
    if (
      !authReq.user ||
      !authReq?.user?.roles?.some((role) => requiredRoles.includes(role))
    ) {
      return res
        .status(403)
        .json({ error: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};
