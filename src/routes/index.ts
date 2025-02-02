import { Router } from "express";
import userRoutes from "./userRoutes";
import waitlistRoutes from "./waitlistRoutes";
import authorizationRoutes from "./authRoutes";

const router = Router();
router.use("/users", userRoutes);
router.use("/waitlists", waitlistRoutes);
router.use("/authorization", authorizationRoutes);

export default router;
