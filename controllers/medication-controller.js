import knexConfig from "../knexfile.js";
import knex from "knex";

const db = knex(knexConfig);

export const getAllMedications = async (req, res) => {
  const user_id = req.user.uid;

  try {
    const medications = await db("medications")
      .where({ user_id })
      .select("id", "name", "dosage", "frequency", "start_date", "end_date");
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching medications", error });
  }
};

export const getMedicationById = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.uid;

  try {
    const medication = await db("medications").where({ id, user_id }).first();
    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }
    res.json(medication);
  } catch (error) {
    res.status(500).json({ message: "Error fetching medication", error });
  }
};

export const addMedication = async (req, res) => {
  try {
    const { name, dosage, frequency, start_date, end_date } = req.body;
    const user_id = req.user?.uid;

    if (!user_id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found" });
    }

    const userExists = await db("users").where({ id: user_id }).first();
    if (!userExists) {
      return res.status(404).json({ message: "User not found in database" });
    }

    const [id] = await db("medications").insert({
      user_id,
      name,
      dosage,
      frequency,
      start_date,
      end_date,
    });

    res.status(201).json({ message: "Medication added", id });
  } catch (error) {
    console.error("🔥 Error adding medication:", error);
    res
      .status(500)
      .json({ message: "Error adding medication", error: error.message });
  }
};

export const updateMedication = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.uid;
  const { name, dosage, frequency, start_date, end_date } = req.body;

  try {
    const updated = await db("medications").where({ id, user_id }).update({
      name,
      dosage,
      frequency,
      start_date,
      end_date,
    });

    if (!updated) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json({ message: "Medication updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating medication", error });
  }
};

export const deleteMedication = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.uid;

  try {
    const deleted = await db("medications").where({ id, user_id }).del();

    if (!deleted) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json({ message: "Medication deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting medication", error });
  }
};
