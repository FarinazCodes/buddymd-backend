import express from "express";
import {
  getAdherenceLogs,
  addAdherenceLog,
  deleteAdherenceLog,
} from "../controllers/adherence-controller.js";
import { verifyFirebaseToken } from "../authMiddleware.js";

const router = express.Router();

router.get("/:medication_id", verifyFirebaseToken, getAdherenceLogs);

router.post("/", verifyFirebaseToken, addAdherenceLog);

router.delete("/:id", verifyFirebaseToken, deleteAdherenceLog);

export default router;
