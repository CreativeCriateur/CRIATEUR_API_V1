import { Router, Request, Response } from "express";
import {
  handleCreateUser,
  handleLoginUser,
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
 * /v1/users/create-user:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the system
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: mypassword123
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
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

router.post("/create-user", (req: Request, res: Response): any => {
  //return res.status(201).send(newUser);

  const { username, email, password } = req.body;

  // Simulate user creation logic
  if (!username || !email || !password) {
    return res.status(400).send({ message: "Invalid input", success: false });
  }

  const newUser = {
    id: "12345",
    username,
    email
  };

  return res.status(201).json({ message: "added successfully", success: true });
});

/**
 * @swagger
 * /v1/users/register:
 *   post:
 *     summary: Sign up as a new User
 *     description: Adds a new user to the system
 *     tags:
 *       - Users
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

router.route("/register").post(handleCreateUser);

/**
 * @swagger
 * /v1/users/login:
 *   post:
 *     summary: Login as a verified User
 *     description: Login as a verified user
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
