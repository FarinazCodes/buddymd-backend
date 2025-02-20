import express from "express";
import {
  addReminder,
  getReminders,
  deleteReminder,
} from "../controllers/reminders-controller.js";

const router = express.Router();

router.post("/", addReminder);
router.get("/", getReminders);
router.delete("/:id", deleteReminder);

export default router;
