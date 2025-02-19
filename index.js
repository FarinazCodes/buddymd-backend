import express from "express";
import cors from "cors";
import knex from "knex";
import knexConfig from "./knexfile.js";
import medicationRoutes from "./routes/medication-routes.js";
import authRoutes from "./routes/auth-routes.js";

const db = knex(knexConfig);

const app = express();

app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());

app.use("/api/medications", medicationRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
