import { Router } from "express";
import { authenticateToken } from "../middlewares/auth";
import userRoutes from "./userRoutes";
import waitlistRoutes from "./waitlistRoutes";
import authorizationRoutes from "./authorizationRoutes";
import authenticationRoutes from "./authenticationRoutes";
import adminRoutes from "./adminRoutes";
import serviceRoutes from "./serviceRoutes";

const router = Router();

router.use("/authenticate", authenticationRoutes);
router.use("/users", authenticateToken, userRoutes);
router.use("/waitlists", waitlistRoutes);
router.use("/authorization", authenticateToken, authorizationRoutes);
router.use("/admin", authenticateToken, adminRoutes);
router.use("/service", authenticateToken, serviceRoutes);

export default router;
