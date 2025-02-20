import express from "express";
import cors from "cors";
import knex from "knex";
import knexConfig from "./knexfile.js";
import medicationRoutes from "./routes/medication-routes.js";
import authRoutes from "./routes/auth-routes.js";
import remindersRoutes from "./routes/reminders-routes.js";
import "./utils/sendReminders.js";
import profileRoutes from "./routes/profile-routes.js";
const db = knex(knexConfig);

const app = express();

app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());

app.use("/api/medications", medicationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reminders", remindersRoutes);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
