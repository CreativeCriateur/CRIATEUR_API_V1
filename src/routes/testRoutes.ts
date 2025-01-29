import {
  handleCreateTest,
  handleGetAllTest
} from "../controllers/test.controller";
import { Router, Request, Response } from "express";

const router = Router();
/**
 * @swagger
 * /api/tests/example:
 *   get:
 *     summary: Example endpoint
 *     tags:
 *       - Test
 *     description: Returns a "Hello World" message
 *     responses:
 *       200:
 *         description: A JSON response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World!
 */

router.get("/example", (req: Request, res: Response) => {
  res.send({ message: "Hello World!" });
});

/**
 * @swagger
 * /api/tests/list:
 *   get:
 *     summary: List endpoint
 *     tags:
 *       - Test
 *     description: Returns a list of test data
 *     responses:
 *       200:
 *         description: A JSON response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 */
router.route("/list").get(handleGetAllTest);

/**
 * @swagger
 * /api/tests/create-test:
 *   post:
 *     summary: Create a new User Test
 *     description: Adds a new user to the system as a test
 *     tags:
 *       - Test
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: james
 *               lastName:
 *                 type: string
 *                 example: owen
 *               email:
 *                 type: string
 *                 example: jamesowen@example.com
 *               password:
 *                 type: string
 *                 example: Mypassword123
 *     responses:
 *       201:
 *         description: Test User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 firstName:
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

router.route("/create-test").post(handleCreateTest);
export default router;
