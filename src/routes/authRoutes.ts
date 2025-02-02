import { Router } from "express";
const router = Router();
import {
  handleLoginUser,
  handleRegisterUser,
  handleCreatePermission,
  handleCreateResource,
  handleAddPermissionToRole,
  handleCreateRole,
  handleGetListResources,
  handleGetResourceById,
  handleDeleteResource,
  handleGetListPermission,
  handleDeletePermission,
  handleGetPermissionById,
  handleGetPermissionByIdWithRole,
  handleGetPermissionByIdWithResource,
  handleGetRoleByIdWithPermission,
  handleAddPermissionsToRole,
  handleGetListRole,
  handleGetRoleById,
  handleGetRoleWithPermissions,
  handleDeletePermissionsToRole,
  handleDeletePermissionToRole,
  handleUpdatePermissionsToRole
} from "../controllers/authorization.controller";

/**
 * @swagger
 * /v1/authorization/register:
 *   post:
 *     summary: Sign up as a new User
 *     description: Adds a new user to the system
 *     tags:
 *       - Authorization
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
 * /v1/authorization/login:
 *   post:
 *     summary: Login as a verified User
 *     description: Login as a verified user
 *     tags:
 *       - Authorization
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
 * /v1/authorization/resource/create:
 *   post:
 *     summary: Create Resource for a particular Permission
 *     description: Create a Resource for a particular Permission action
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
router.route("/resource/create").post(handleCreateResource);

/**
 * @swagger
 * /v1/authorization/resource/list:
 *   get:
 *     summary: List endpoint for get resource
 *     tags:
 *       - Authorization
 *     description: Returns a list of Resource and permission data
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
router.route("/resource/list").get(handleGetListResources);

/**
 * @swagger
 * /v1/authorization/resource/{id}:
 *   get:
 *     summary: Get a single resource by id which is the primary key
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
router.route("/resource/:id").get(handleGetResourceById);

/**
 * @swagger
 * /v1/authorization/resource/{id}:
 *   delete:
 *     summary: Delete resource by id which is the primary key
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
 *         description: Resource Deleted
 */
router.route("/resource/:id").delete(handleDeleteResource);

/**
 * @swagger
 * /v1/authorization/permission/create:
 *   post:
 *     summary: Create Permission a user can perform by it's resource
 *     description: Create a Permission action a Role or a user can perform
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
router.route("/permission/create").post(handleCreatePermission);

/**
 * @swagger
 * /v1/authorization/permission/list:
 *   get:
 *     summary: List endpoint for get permission
 *     tags:
 *       - Authorization
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
 * /v1/authorization/role/{roleId}/add-permission/{permissionId}:
 *   post:
 *     summary: Add a single permission to an existing role
 *     description: Add a single permission to role
 *     tags:
 *       - Authorization
 *     parameters:
 *       - name: roleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The role id
 *     parameters:
 *       - name: permissionId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
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
router.route("/role/:id/add-permission").post(handleAddPermissionToRole);

/**
 * @swagger
 * /v1/authorization/role/{roleId}/add-permissions:
 *   post:
 *     summary: Add multiple permissions to an existing role
 *     description: Add multiple permissions to an existing role
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
router.route("/role/:roleId/add-permissions").post(handleAddPermissionsToRole);

/**
 * @swagger
 * /v1/authorization/role/list:
 *   get:
 *     summary: List endpoint for get role
 *     tags:
 *       - Authorization
 *     description: Returns a list of roles
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
 * /v1/authorization/role/{id}:
 *   get:
 *     summary: Get role by id which is the primary key
 *     tags:
 *       - Authorization
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
 *   get:
 *     summary: Get multiple permission by a role id
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
 *         description: Role details with permissions
 */
router.route("/role/:roleId/permissions").get(handleGetRoleWithPermissions);

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

/**
 * @swagger
 * /v1/authorization/role/{roleId}/permission/{permissionId}:
 *   delete:
 *     summary: Remove a single permission from a role
 *     tags:
 *       - Authorization
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
  .delete(handleDeletePermissionToRole);

/**
 * @swagger
 * /v1/authorization/role/{roleId}/permissions:
 *   delete:
 *     summary: Remove a multiple permission from a role
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
 *         description: Permissions Deleted
 */
router.route("/role/:roleId/permissions").delete(handleDeletePermissionsToRole);
export default router;
