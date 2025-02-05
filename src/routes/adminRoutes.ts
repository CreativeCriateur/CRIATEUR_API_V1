import { Router } from "express";
const router = Router();
import { authorize } from "../middlewares/auth";
import {
  handleAddPermissionsToRole,
  handleAddPermissionToRole,
  handleAddService,
  handleAssignRole,
  handleCreatePermission,
  handleCreateResource,
  handleDeletePermissionsToRole,
  handleDeletePermissionToRole,
  handleDeleteService,
  handleGetUserRole
} from "../controllers/admin.controller";

/**
 * @swagger
 * /v1/admin/assign-role:
 *   post:
 *     summary: Assign role(s) to a user
 *     description: assign a role to a user
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 example: 2
 *               roleName:
 *                 type: string
 *                 example: "TeamUser"
 *     responses:
 *       201:
 *         description: role assign successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: string
 *                   example: Admin
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route("/assign-role").post(authorize(["ADMIN"]), handleAssignRole);

/**
 * @swagger
 * /v1/admin/user-role/{id}:
 *   get:
 *     summary: Get a single role assign to a user
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The user id
 *     responses:
 *       200:
 *         description: User Role details
 */
router.route("/user-role/:id").get(handleGetUserRole);

/**
 * @swagger
 * /v1/admin/resource/create:
 *   post:
 *     summary: Create Resource for a particular Permission
 *     description: Create a Resource for a particular Permission action
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: GetUserData - Resources related to API Endpoints
 *               url:
 *                 type: string
 *                 example: /v1/users/data
 *     responses:
 *       201:
 *         description: Resources added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 12
 *                 name:
 *                   type: string
 *                   example: GetUserData
 *                 url:
 *                   type: string
 *                   example: /v1/users/data
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router
  .route("/resource/create")
  .post(authorize(["ADMIN"]), handleCreateResource);

/**
 * @swagger
 * /v1/admin/permission/create:
 *   post:
 *     summary: Create Permission action a user with a role can perform by it's resource
 *     description: Create a Permission action a Role or a user can perform
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: create
 *               resourceId:
 *                 type: string
 *                 example: 12
 *     responses:
 *       201:
 *         description: Permission added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 123
 *                 name:
 *                   type: string
 *                   example: create
 *                 resourceId:
 *                   type: string
 *                   example: 12
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router
  .route("/permission/create")
  .post(authorize(["ADMIN"]), handleCreatePermission);

/**
 * @swagger
 * /v1/admin/role/{roleId}/permission/{permissionId}:
 *   delete:
 *     summary: Remove a single permission from a role
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: roleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The role id
 *       - name: permissionId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The permission id
 *     responses:
 *       200:
 *         description: Permission Deleted
 */
router
  .route("/role/:roleId/permission/:permissionId")
  .delete(authorize(["ADMIN"]), handleDeletePermissionToRole);

/**
 * @swagger
 * /v1/admin/role/{roleId}/permissions:
 *   delete:
 *     summary: Remove a multiple permission from a role
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: roleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The role id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissionIds:
 *                 type: array
 *                 example: [2, 3, 6, 9]
 *     responses:
 *       200:
 *         description: Permissions Deleted
 */
router
  .route("/role/:roleId/permissions")
  .delete(authorize(["ADMIN"]), handleDeletePermissionsToRole);

/**
 * @swagger
 * /v1/admin/role/{roleId}/add-permission/{permissionId}:
 *   post:
 *     summary: Add a single permission to an existing role
 *     description: Add a single permission to role
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: roleId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The role id
 *     parameters:
 *       - name: permissionId
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The permission id
 *     responses:
 *       201:
 *         description: Permission added to role successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 123
 *                 name:
 *                   type: string
 *                   example: Admin
 *                 permission:
 *                   type: string
 *                   example: []
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router
  .route("/role/:roleId/add-permission/:permissionId")
  .post(authorize(["ADMIN"]), handleAddPermissionToRole);

/**
 * @swagger
 * /v1/admin/role/{roleId}/add-permissions:
 *   post:
 *     summary: Add multiple permissions to an existing role
 *     description: Add multiple permissions to an existing role
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: roleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The role id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissionIds:
 *                 type: array
 *                 example: [12, 1, 2]
 *     responses:
 *       201:
 *         description: Permissions added to role successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 123
 *                 name:
 *                   type: string
 *                   example: Admin
 *                 permission:
 *                   type: string
 *                   example: []
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router
  .route("/role/:roleId/add-permissions")
  .post(authorize(["ADMIN"]), handleAddPermissionsToRole);

/**
 * @swagger
 * /v1/admin/service/create:
 *   post:
 *     summary: Create A service, with name and description
 *     description: Create A service, with name and description....
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Writing poem
 *               description:
 *                 type: string
 *                 example: writing a poem
 *               pricing:
 *                 type: string
 *                 example: starting from $0.04 per word
 *     responses:
 *       201:
 *         description: Service added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 12
 *                 name:
 *                   type: string
 *                   example: writing
 *                 description:
 *                   type: string
 *                   example: writing
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route("/service/create").post(authorize(["ADMIN"]), handleAddService);

/**
 * @swagger
 * /v1/admin/service/{id}:
 *   delete:
 *     summary: Remove a single service and set is isDeleted to true
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: The service id
 *     responses:
 *       200:
 *         description: Service Deleted
 */
router.route("/service/:id").delete(authorize(["ADMIN"]), handleDeleteService);

export default router;
