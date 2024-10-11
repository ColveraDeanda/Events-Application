import express from "express";
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - users
 *     summary: Get the authenticated user
 *     description: Retrieve the authenticated user's information.
 *     responses:
 *       200:
 *         description: Authenticated user information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *     security:
 *       - basicAuth: []
 */
router.get("/", requiresAuth, UserController.getAuthenticatedUser);

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - users
 *     summary: Sign up a new user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 */
router.post("/signup", UserController.signUp);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - users
 *     summary: Log in a user
 *     description: Authenticate a user and return a session.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       201:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/login", UserController.login);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     tags:
 *       - users
 *     summary: Log out a user
 *     description: Log out the authenticated user.
 *     responses:
 *       200:
 *         description: User logged out successfully
 *     security:
 *       - basicAuth: []
 */
router.post("/logout", UserController.logout);

export default router;