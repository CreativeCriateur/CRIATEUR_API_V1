import { Router } from "express";
const router = Router();
import {
  handleLoginUser,
  handleNewAccessToken,
  handleNewOtp,
  handleRegisterUser,
  handleVerifyOtp
} from "../controllers/authenticate.controller";

/**
 * @swagger
 * /v1/authenticate/register:
 *   post:
 *     summary: Sign up as a new User
 *     description: Adds a new user to the system
 *     tags:
 *       - Authenticate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Kelvin Joe
 *               email:
 *                 type: string
 *                 example: kelvin20@example.com
 *               password:
 *                 type: string
 *                 example: Mypassword123
 *               confirmPassword:
 *                 type: string
 *                 example: Mypassword123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 fullName:
 *                   type: string
 *                   example: john doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route("/register").post(handleRegisterUser);

/**
 * @swagger
 * /v1/authenticate/verifyOtp:
 *   post:
 *     summary: Verify an Otp sent to the user email
 *     description: Verify an Otp to make the user active
 *     tags:
 *       - Authenticate
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
 * /v1/authenticate/new-otp:
 *   post:
 *     summary: Generate a new otp for a user who already exist if it's otp expired
 *     description: Generate a new otp for a user who already exist if it's otp expired
 *     tags:
 *       - Authenticate
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
 *     responses:
 *       201:
 *         description: Otp generated and sent to user's email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 otp:
 *                   type: number
 *                   example: 123902
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route("/new-otp").post(handleNewOtp);

/**
 * @swagger
 * /v1/authenticate/login:
 *   post:
 *     summary: Login as a verified User
 *     description: Login as a verified user
 *     tags:
 *       - Authenticate
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
 *               password:
 *                 type: string
 *                 example: Mypassword123
 *     responses:
 *       201:
 *         description: Login successfully
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
router.route("/login").post(handleLoginUser);

/**
 * @swagger
 * /v1/authenticate/new-access-token:
 *   post:
 *     summary: Generate a new access-token if expired with your refreshToken
 *     description: Generate a new access-token if expired
 *     tags:
 *       - Authenticate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: 0oiisjjshhshss-kkjjhshshshsh
 *     responses:
 *       201:
 *         description: Otp generated and sent to user's email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: 99siiuiw999
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route("/new-access-token").post(handleNewAccessToken);

export default router;
