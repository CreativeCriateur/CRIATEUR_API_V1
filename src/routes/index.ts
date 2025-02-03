import { Router } from "express";
import { authenticateToken } from "../middlewares/auth";
import userRoutes from "./userRoutes";
import waitlistRoutes from "./waitlistRoutes";
import authorizationRoutes from "./authorizationRoutes";
import authenticationRoutes from "./authenticationRoutes";

const router = Router();

router.use("/authenticate", authenticationRoutes);
router.use("/users", authenticateToken, userRoutes);
router.use("/waitlists", waitlistRoutes);
router.use("/authorization", authenticateToken, authorizationRoutes);

export default router;
