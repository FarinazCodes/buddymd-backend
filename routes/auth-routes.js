import express from "express";
import { verifyFirebaseToken } from "../authMiddleware.js";
import { verifyUser } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/verify", verifyFirebaseToken, verifyUser);

export default router;
