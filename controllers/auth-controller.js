import knex from "knex";
import knexConfig from "../knexfile.js";

const db = knex(knexConfig);

export const registerUser = async (req, res) => {
  try {
    const { uid, email, displayName, photoUrl } = req.body;

    console.log("Registering New User:", { uid, email });

    const existingUser = await db("users").where({ id: uid }).first();

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    await db("users").insert({
      id: uid,
      email: email || "",
      display_name: displayName || "",
      photo_url: photoUrl || "",
      phone_number: "",
      created_at: new Date(),
      updated_at: new Date(),
    });

    console.log("User Registered Successfully!");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error Registering User:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
