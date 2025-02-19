import express from "express";
import {
  getAllMedications,
  getMedicationById,
  addMedication,
  updateMedication,
  deleteMedication,
} from "../controllers/medication-controller.js";
import { verifyFirebaseToken } from "../authMiddleware.js";

const router = express.Router();

router.get("/", verifyFirebaseToken, getAllMedications);
router.get("/:id", verifyFirebaseToken, getMedicationById);
router.post("/", verifyFirebaseToken, addMedication);
router.put("/:id", verifyFirebaseToken, updateMedication);
router.delete("/:id", verifyFirebaseToken, deleteMedication);

export default router;
