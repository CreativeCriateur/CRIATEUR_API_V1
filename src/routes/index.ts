import { Router } from "express";
import testRoutes from "./testRoutes";
import userRoutes from "./userRoutes";
import waitlistRoutes from "./waitlistRoutes";

const router = Router();
router.use("/tests", testRoutes);
router.use("/users", userRoutes);
router.use("/waitlists", waitlistRoutes);

export default router;
