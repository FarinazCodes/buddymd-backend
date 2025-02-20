import knexConfig from "../knexfile.js";
import knex from "knex";

const db = knex(knexConfig);

export const getPhoneNumber = async (req, res) => {
  const user_id = req.user?.uid;

  if (!user_id) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user ID provided" });
  }

  try {
    const user = await db("users")
      .where({ id: user_id })
      .select("phone_number")
      .first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ phone_number: user.phone_number });
  } catch (error) {
    console.error("Error fetching phone number:", error);
    res
      .status(500)
      .json({ message: "Error fetching phone number", error: error.message });
  }
};

export const updatePhoneNumber = async (req, res) => {
  const { phone_number } = req.body;
  const user_id = req.user?.uid;

  if (!user_id) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user ID provided" });
  }

  if (!phone_number) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    await db("users").where({ id: user_id }).update({ phone_number });
    res.json({ message: "Phone number updated successfully" });
  } catch (error) {
    console.error("Error updating phone number:", error);
    res
      .status(500)
      .json({ message: "Error updating phone number", error: error.message });
  }
};
