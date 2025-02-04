import { Router } from "express";
const router = Router();
import {
  handleCreateRole,
  handleGetResourcesList,
  handleGetResourceById,
  handleDeleteResource,
  handleGetListPermission,
  handleDeletePermission,
  handleGetPermissionById,
  handleGetPermissionByIdWithRole,
  handleGetPermissionByIdWithResource,
  handleGetRoleByIdWithPermission,
  handleGetListRole,
  handleGetRoleById,
  handleGetRoleWithPermissions,
  handleUpdatePermissionsToRole,
  handleGetAllRole,
  handleGetRoleListWithPermissions,
  handleGetResourceByIdWithPermission
} from "../controllers/authorization.controller";

/**
 * @swagger
 * /v1/authorization/resource/{id}/permission:
 *   get:
 *     summary: Get a single resource with his permission
 *     tags:
 *       - Authorization
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The resource id
 *     responses:
 *       200:
 *         description: Resource details
 */
router
  .route("/resource/:id/permission")
  .get(handleGetResourceByIdWithPermission);

/**
 * @swagger
 * /v1/authorization/resource/list/{currentPage}/size/{pageSize}:
 *   get:
 *     summary: List endpoint for get resource
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     description: Returns a list of Resource and permission data
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
router
  .route("/resource/list/:currentPage/size/:pageSize")
  .get(handleGetResourcesList);

/**
 * @swagger
 * /v1/authorization/resource/{id}:
 *   get:
 *     summary: Get a single resource by id which is the primary key
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The resource id
 *     responses:
 *       200:
 *         description: Resource details
 */
router.route("/resource/:id").get(handleGetResourceById);

/**
 * @swagger
 * /v1/authorization/resource/{id}:
 *   delete:
 *     summary: Delete resource by id which is the primary key
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The resource id
 *     responses:
 *       200:
 *         description: Resource Deleted
 */
router.route("/resource/:id").delete(handleDeleteResource);

/**
 * @swagger
 * /v1/authorization/permission/list:
 *   get:
 *     summary: List endpoint for get permission
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     description: Returns a list of Permission
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
router.route("/permission/list").get(handleGetListPermission);

/**
 * @swagger
 * /v1/authorization/permission/{id}:
 *   get:
 *     summary: Get a single permission by id which is the primary key
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The permission id
 *     responses:
 *       200:
 *         description: Permission details
 */
router.route("/permission/:id").get(handleGetPermissionById);

/**
 * @swagger
 * /v1/authorization/permission/{id}/role:
 *   get:
 *     summary: Get all roles assigned to a permission
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The permission id
 *     responses:
 *       200:
 *         description: Permission details with role
 */
router.route("/permission/:id/role").get(handleGetPermissionByIdWithRole);

/**
 * @swagger
 * /v1/authorization/permission/{id}/resource:
 *   get:
 *     summary: Get all resources assigned to a permission
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The permission id
 *     responses:
 *       200:
 *         description: Permission details with resource
 */
router
  .route("/permission/:id/resource")
  .get(handleGetPermissionByIdWithResource);

/**
 * @swagger
 * /v1/authorization/permission/{id}:
 *   delete:
 *     summary: Delete permission by id which is the primary key
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The permission id
 *     responses:
 *       200:
 *         description: Permission Deleted
 */
router.route("/permission/:id").delete(handleDeletePermission);

/**
 * @swagger
 * /v1/authorization/role/create:
 *   post:
 *     summary: Create Role a user can have access to
 *     description: Create a Role users can have access to
 *     tags:
 *       - Authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin, User, e.t.c
 *     responses:
 *       201:
 *         description: Role added successfully
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
 *                   type: array
 *                   example: []
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route("/role/create").post(handleCreateRole);

/**
 * @swagger
 * /v1/authorization/role:
 *   get:
 *     summary: List endpoint for get role
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     description: Returns a list of roles
 *     responses:
 *       200:
 *         description: A JSON response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: string
 */
router.route("/role").get(handleGetAllRole);

/**
 * @swagger
 * /v1/authorization/role/list:
 *   get:
 *     summary: List endpoint for get all roles with pagination
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     description: Returns a list of roles with pagination
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
router.route("/role/list").get(handleGetListRole);

/**
 * @swagger
 * /v1/authorization/role/permission:
 *   get:
 *     summary: Get multiple roles with permission
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     responses:
 *       200:
 *         description: Role details with permissions
 */
router.route("/role/permission").get(handleGetRoleWithPermissions);

/**
 * @swagger
 * /v1/authorization/role/permission/list:
 *   get:
 *     summary: Get multiple roles and permission with pagination
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
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
router.route("/role/permission/list").get(handleGetRoleListWithPermissions);

/**
 * @swagger
 * /v1/authorization/role/{id}:
 *   get:
 *     summary: Get role by id which is the primary key
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The role id
 *     responses:
 *       200:
 *         description: Role details
 */
router.route("/role/:id").get(handleGetRoleById);

/**
 * @swagger
 * /v1/authorization/role/{id}/permission:
 *   get:
 *     summary: Get a single permission by a role id
 *     tags:
 *       - Authorization
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The role id
 *     responses:
 *       200:
 *         description: Role details with a single permission
 */
router.route("/role/:id/permission").get(handleGetRoleByIdWithPermission);

/**
 * @swagger
 * /v1/authorization/role/{roleId}/permissions:
 *   put:
 *     summary: Replace all permissions for a role
 *     tags:
 *       - Authorization
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
 *         description: Permission Updated
 */
router.route("/role/:roleId/permissions").put(handleUpdatePermissionsToRole);

export default router;
