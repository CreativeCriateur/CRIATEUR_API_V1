import { Router, Request, Response } from "express";
import {
  handleCreateWaitList,
  handleGetAllWaitList
} from "../controllers/waitList.controller";

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

/**
 * @swagger
 * /v1/waitlists/add:
 *   post:
 *     summary: Add a new WaitList
 *     description: Add a new waitList to the system
 *     tags:
 *       - Waitlists
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
 *               businessType:
 *                 type: string
 *                 example: Content Creation & Strategy
 *               title:
 *                 type: string
 *                 example: Content
 *     responses:
 *       201:
 *         description: New WaitList added successfully
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
router.route("/add").post(handleCreateWaitList);

/**
 * @swagger
 * /v1/waitlists/list/{currentPage}/size/{pageSize}:
 *   get:
 *     summary: Get a list of waitlist with pagination
 *     tags:
 *       - Waitlists
 *     parameters:
 *       - name: currentPage
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The page id
 *       - name: pageSize
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The size id
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
router.route("/list/:currentPage/size/:pageSize").get(handleGetAllWaitList);

export default router;
