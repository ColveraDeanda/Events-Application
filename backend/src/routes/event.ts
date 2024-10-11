import express from "express";
import * as EventController from "../controllers/event";

const router = express.Router();

/**
 * Get events
 * @swagger
 * /events:
 *    get:
 *      tags:
 *        - events
 *      summary: "List all events"
 *      description: This endpoint will list all the events.
 *      requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/event'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/event'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/event'
 *      responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/event'          
 *               application/xml:
 *                schema:
 *                   $ref: '#/components/schemas/event'
 *      security:
 *        - basicAuth: []
 */
router.get("/", EventController.getEvents);

/**
 * @swagger
 * /events:
 *   post:
 *     tags:
 *       - events
 *     summary: Create a new event
 *     description: This endpoint allows you to create a new event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/event'
 *       400:
 *         description: Bad request
 *     security:
 *       - basicAuth: []
 */
router.post("/", EventController.createEvent);

/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     tags:
 *       - events
 *     summary: Update an existing event
 *     description: This endpoint allows you to update an existing event.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The event ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/event'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Event not found
 *     security:
 *       - basicAuth: []
 */
router.patch("/:id", EventController.updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     tags:
 *       - events
 *     summary: Delete an event by ID
 *     description: This endpoint allows you to delete an event by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The event ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *     security:
 *       - basicAuth: []
 */
router.delete("/:id", EventController.deleteEvent);

export default router;