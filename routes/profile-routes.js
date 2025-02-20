import express from "express";
import {
  getPhoneNumber,
  updatePhoneNumber,
} from "../controllers/profile-controller.js";
import { verifyFirebaseToken } from "../authMiddleware.js";

const router = express.Router();

router.get("/get-phone", verifyFirebaseToken, getPhoneNumber);
router.post("/update-phone", verifyFirebaseToken, updatePhoneNumber);

export default router;
