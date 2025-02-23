import express from "express";
import { getDrugReactions } from "../controllers/drug-reactions-controller.js";

const router = express.Router();

router.get("/reactions", getDrugReactions);

export default router;
