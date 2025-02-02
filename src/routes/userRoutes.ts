import { Router, Request, Response } from "express";
import {
  handlePhotoUpload,
  handleVerifyOtp,
  handleGetListUser,
  handleGetUserById,
  handleGetAllUser
} from "../controllers/user.controller";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

/**
 * @swagger
 * /v1/users/verifyOtp:
 *   post:
 *     summary: Verify an Otp sent to the user email
 *     description: Verify an Otp to make the user active
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: kelvin20@example.com
 *               otp:
 *                 type: string
 *                 example: 129987
 *     responses:
 *       201:
 *         description: Email verified successfully, you can now login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 123
 *                 uuid:
 *                   type: string
 *                   example: 12398u-8177827
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

router.route("/verifyOtp").post(handleVerifyOtp);

/**
 * @swagger
 * /v1/users/list:
 *   get:
 *     summary: List endpoint
 *     tags:
 *       - Users
 *     description: Returns a list of User data
 *     responses:
 *       200:
 *         description: A JSON response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                 pagination:
 *                   type: string
 */
router.route("/list").get(handleGetListUser);

/**
 * @swagger
 * /v1/users/{uuid}:
 *   get:
 *     summary: Get user by the uuID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The user uuid
 *     responses:
 *       200:
 *         description: User details
 */

router.route("/:id").get(handleGetUserById);

router.route("/photo/upload").post(handlePhotoUpload, upload.single("image"));

export default router;
