import knexConfig from "../knexfile.js";
import knex from "knex";

const db = knex(knexConfig);

// Create a reminder
export const addReminder = async (req, res) => {
  const { medication_id, time, delivery_method, phone_number } = req.body;

  if (!medication_id || !time || !delivery_method || !phone_number) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [id] = await db("reminders").insert({
      medication_id,
      time,
      delivery_method,
      phone_number,
    });

    res.status(201).json({ message: "Reminder created", id });
  } catch (error) {
    console.error("Error adding reminder:", error);
    res
      .status(500)
      .json({ message: "Error adding reminder", error: error.message });
  }
};

// Get all reminders
export const getReminders = async (req, res) => {
  try {
    const reminders = await db("reminders").select("*");
    res.json(reminders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reminders", error: error.message });
  }
};

// Delete a reminder
export const deleteReminder = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db("reminders").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.json({ message: "Reminder deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting reminder", error: error.message });
  }
};
