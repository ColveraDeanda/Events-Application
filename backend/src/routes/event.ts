import express from "express";
import * as EventController from "../controllers/event";

const router = express.Router();

router.get("/", EventController.getEvents);
router.get("/:id", EventController.getEvent);
router.post("/", EventController.createEvent);
router.patch("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);

export default router;