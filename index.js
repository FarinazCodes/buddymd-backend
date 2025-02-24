import express from "express";
import cors from "cors";
import knex from "knex";
import knexConfig from "./knexfile.js";
import medicationRoutes from "./routes/medication-routes.js";
import authRoutes from "./routes/auth-routes.js";
import remindersRoutes from "./routes/reminders-routes.js";
import "./utils/sendReminders.js";
import profileRoutes from "./routes/profile-routes.js";
import adherenceRoutes from "./routes/adherence-routes.js";
import recipesRoutes from "./routes/recipes-routes.js";
import drugReactionsRoutes from "./routes/drug-reactions-routes.js";
import dotenv from "dotenv";
const db = knex(knexConfig);
dotenv.config();
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/medications", medicationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reminders", remindersRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/adherence", adherenceRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/drug-reactions", drugReactionsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
