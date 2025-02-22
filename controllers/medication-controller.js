import knexConfig from "../knexfile.js";
import knex from "knex";

const db = knex(knexConfig);

export const getAllMedications = async (req, res) => {
  console.log("Incoming request to /api/medications");
  console.log("Request User:", req.user);

  if (!req.user || !req.user.uid) {
    console.error(" Error: No user ID found in request");
    return res
      .status(401)
      .json({ message: "Unauthorized: No user ID provided" });
  }

  const user_id = req.user.uid;
  console.log("Fetching medications for user_id:", user_id);

  try {
    const medications = await db("medications")
      .where({ user_id })
      .select(
        "id",
        "name",
        "dosage",
        "dosage_unit",
        "start_date",
        "schedule_time",
        "end_date"
      );

    console.log("Fetched Medications:", medications);
    res.json(medications);
  } catch (error) {
    console.error(" Database Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching medications", error: error.message });
  }
};

export const getMedicationById = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.uid;

  try {
    const medication = await db("medications")
      .where({ id, user_id })
      .select(
        "id",
        "name",
        "dosage",
        "dosage_unit",
        "start_date",
        "schedule_time",
        "end_date"
      )
      .first();

    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }

    console.log("Fetched medication by ID:", medication);
    res.json(medication);
  } catch (error) {
    console.error("Error fetching medication by ID:", error);
    res
      .status(500)
      .json({ message: "Error fetching medication", error: error.message });
  }
};

export const addMedication = async (req, res) => {
  const {
    name,
    dosage,
    dosage_unit,
    schedule_time,
    start_date,
    end_date,
    phone_number,
  } = req.body;
  const user_id = req.user?.uid;

  if (!user_id) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user ID provided" });
  }

  const validUnits = ["mg", "mcg", "g", "ml", "%"];
  if (!validUnits.includes(dosage_unit)) {
    return res.status(400).json({ message: "Invalid dosage unit" });
  }

  try {
    const userExists = await db("users").where({ id: user_id }).first();
    if (!userExists) {
      return res.status(404).json({ message: "User not found in database" });
    }

    const [medication_id] = await db("medications").insert({
      user_id,
      name,
      dosage,
      dosage_unit,
      schedule_time: schedule_time === "" ? null : schedule_time,
      start_date,
      end_date: end_date === "" ? null : end_date,
    });

    console.log(" Medication added successfully with ID:", medication_id);

    await db("reminders").insert({
      medication_id,
      time: schedule_time,
      delivery_method: "sms",
      phone_number,
    });

    console.log(" Reminder added for medication ID:", medication_id);

    res
      .status(201)
      .json({ message: "Medication added with reminder", medication_id });
  } catch (error) {
    console.error(" Error adding medication:", error);
    res
      .status(500)
      .json({ message: "Error adding medication", error: error.message });
  }
};

export const deleteMedication = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.uid;

  try {
    // First, delete associated reminders
    await db("reminders").where({ medication_id: id }).del();
    console.log(` Deleted reminders for medication ID: ${id}`);

    // Then delete the medication
    const deleted = await db("medications").where({ id, user_id }).del();

    if (!deleted) {
      return res.status(404).json({ message: "Medication not found" });
    }

    console.log(`Deleted medication with ID: ${id}`);
    res.json({ message: "Medication and associated reminders deleted" });
  } catch (error) {
    console.error("Error deleting medication:", error);
    res
      .status(500)
      .json({ message: "Error deleting medication", error: error.message });
  }
};

export const updateMedication = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.uid;
  const { name, dosage, dosage_unit, start_date, schedule_time, end_date } =
    req.body;

  try {
    const updated = await db("medications").where({ id, user_id }).update({
      name,
      dosage,
      dosage_unit,
      start_date,
      schedule_time,
      end_date,
    });

    if (!updated) {
      return res.status(404).json({ message: "Medication not found" });
    }

    console.log("Medication updated successfully with ID:", id);
    res.json({ message: "Medication updated" });
  } catch (error) {
    console.error(" Error updating medication:", error);
    res
      .status(500)
      .json({ message: "Error updating medication", error: error.message });
  }
};
