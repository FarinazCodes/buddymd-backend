import knexConfig from "../knexfile.js";
import knex from "knex";

const db = knex(knexConfig);

export const getAdherenceLogs = async (req, res) => {
  const { medication_id } = req.params;

  try {
    const logs = await db("adherence_logs")
      .where({ medication_id })
      .orderBy("date", "desc");

    res.json(logs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching adherence logs", error: error.message });
  }
};

export const addAdherenceLog = async (req, res) => {
  const { medication_id, date, status } = req.body;

  if (!medication_id || !date || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [id] = await db("adherence_logs").insert({
      medication_id,
      date,
      status,
    });
    res.status(201).json({ message: "Adherence log added", id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding adherence log", error: error.message });
  }
};

export const deleteAdherenceLog = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db("adherence_logs").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ message: "Adherence log not found" });
    }

    res.json({ message: "Adherence log deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting adherence log", error: error.message });
  }
};
