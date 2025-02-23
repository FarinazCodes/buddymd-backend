import express from "express";
import { getRecipes } from "../controllers/recipes-controller.js";

const router = express.Router();

router.get("/", getRecipes);

export default router;
