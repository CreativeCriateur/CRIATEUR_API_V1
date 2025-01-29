import { Router, Request, Response } from "express";
import {
  handleCreateUser,
  handlePhotoUpload
} from "../controllers/user.controller";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

/**
 * @swagger
 * /api/users/create-user:
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
 * /api/users/register:
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
 *               fullName:
 *                 type: string
 *                 example: john
 *               email:
 *                 type: string
 *                 example: johnkenny@example.com
 *               password:
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
router.route("/register").post(handleCreateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send({ id, name: "John Doe" });
});

router.route("/photo/upload").post(handlePhotoUpload, upload.single("image"));

export default router;
