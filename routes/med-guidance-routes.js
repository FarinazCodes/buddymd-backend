import express from "express";
import { verifyFirebaseToken } from "../authMiddleware.js";
import { getMedGuidance } from "../controllers/med-guidance-controller.js";

const router = express.Router();

router.get("/", verifyFirebaseToken, getMedGuidance);

export default router;
