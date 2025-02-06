import { Router } from "express";
import {
  handlePhotoUpload,
  handleGetListUser,
  handleGetUserById,
  handleGetAllUser,
  handleCreateAccountInfo,
  handleGetAccountProfileList,
  handleGetAccountProfile,
  handleUpdatePassword,
  handleChangePassword,
  handleUpdateUserById
} from "../controllers/user.controller";
import multer from "multer";
// save this in your server you use diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
const router = Router();

/**
 * @swagger
 * /v1/users/list:
 *   get:
 *     summary: Get multiple users with pagination
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
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
 * /v1/users:
 *   get:
 *     summary: Get multiple users with no pagination
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
 *                 users:
 *                   type: string
 */
router.route("/").get(handleGetAllUser);

/**
 * @swagger
 * /v1/users/profile:
 *   get:
 *     summary: Get multiple user profile with no pagination
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     description: Returns a list of Account Profile data
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
 */
router.route("/profile").get(handleGetAccountProfile);

/**
 * @swagger
 * /v1/users/{uuid}:
 *   get:
 *     summary: Get user by the uuID
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
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

/**
 * @swagger
 * /v1/users/change-password:
 *   put:
 *     summary: Replace old password with new password
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: Password12
 *               newPassword:
 *                 type: string
 *                 example: Password2311
 *               uuid:
 *                 type: string
 *                 example: 9019922-kjsjssjki-ooiiaa
 *     responses:
 *       200:
 *         description: Password Changed Successfully
 */
router.route("/change-password").put(handleChangePassword);

/**
 * @swagger
 * /v1/users/update-password:
 *   put:
 *     summary: Replace old password with new password by a user uuid
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 example: 009oiiiis-ooi000iiw
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Password Updated
 */
router.route("/update-password").put(handleUpdatePassword);

/**
 * @swagger
 * /v1/users/update/{uuid}:
 *   put:
 *     summary: Replace all users by uuid
 *     tags:
 *       - Users
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The users uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: James Kay
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *               password:
 *                 type: string
 *                 example: Password09k
 *     responses:
 *       200:
 *         description: Users Updated
 */
router.route("/update/:uuid").put(handleUpdateUserById);

/**
 * @swagger
 * /v1/users/profile/upload:
 *   post:
 *     summary: Upload a file
 *     tags:
 *       - Users
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route("/profile/upload").post(upload.single("file"), handlePhotoUpload);

/**
 * @swagger
 * /v1/users/profile/create:
 *   post:
 *     summary: create profile for the AccountInfo
 *     description: Use to create profile for the AccountInfo
 *     tags:
 *       - Users
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
 *                 type: string
 *                 example: 29893889-oskjhahhs-0299
 *               userName:
 *                 type: string
 *                 example: kennyKay
 *               phoneNumber:
 *                 type: string
 *                 example: 23470598210
 *               organization:
 *                 type: string
 *                 example: autobeaker
 *               position:
 *                 type: string
 *                 example: manager
 *               address:
 *                 type: string
 *                 example: plot 2, adeshina
 *     responses:
 *       201:
 *         description: Profile added successfully
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
 *                 userName:
 *                   type: string
 *                   example: kennykay
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.route("/profile/create").post(handleCreateAccountInfo);

/**
 * @swagger
 * /v1/users/profile/list:
 *   get:
 *     summary: Get multiple user profile with pagination
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []  # Secure this route with BearerAuth
 *     description: Returns a list of Account Profile data
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
router.route("/profile/list").get(handleGetAccountProfileList);

export default router;
