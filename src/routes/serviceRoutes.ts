import {
  handleGetAllSevice,
  handleGetServiceById,
  handleGetServiceList,
  handleUpdateService
} from "../controllers/service.controller";
import { Router } from "express";
const router = Router();

/**
 * @swagger
 * /v1/service:
 *   get:
 *     summary: Get a multiple service
 *     tags:
 *       - Service
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     responses:
 *       200:
 *         description: Services details
 */
router.route("/").get(handleGetAllSevice);

/**
 * @swagger
 * /v1/service/list:
 *   get:
 *     summary: List endpoint for get services with pagonation
 *     tags:
 *       - Service
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     description: Returns a list of Services
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
router.route("/list").get(handleGetServiceList);

/**
 * @swagger
 * /v1/service/{id}:
 *   get:
 *     summary: Get a single service by id which is the primary key
 *     tags:
 *       - Service
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The service id
 *     responses:
 *       200:
 *         description: Service details
 */
router.route("/:id").get(handleGetServiceById);

/**
 * @swagger
 * /v1/service/update/{id}:
 *   put:
 *     summary: Replace all service
 *     tags:
 *       - Service
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The service id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Content Creator
 *               description:
 *                 type: string
 *                 example: build content for...
 *               pricing:
 *                 type: string
 *                 example: Starting at $120 monthly
 *     responses:
 *       200:
 *         description: Service Updated
 */
router.route("/update/:id").put(handleUpdateService);

export default router;
