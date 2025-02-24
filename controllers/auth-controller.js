import knex from "knex";
import knexConfig from "../knexfile.js";

const db = knex(knexConfig);

export const registerUser = async (req, res) => {
  try {
    const { uid, email, photoUrl } = req.body;

    console.log("Registering New User:", { uid, email });

    const existingUser = await db("users").where({ id: uid }).first();

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    await db("users").insert({
      id: uid,
      email: email || "",
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

export const verifyUser = async (req, res) => {
  try {
    const uid = req.body.uid || req.user?.uid;

    if (!uid) {
      return res
        .status(400)
        .json({ message: "Missing user ID (uid) in request body" });
    }

    console.log("Verifying User:", uid);

    const user = await db("users").where({ id: uid }).first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User verified successfully", user });
  } catch (error) {
    console.error("Error Verifying User:", error);
    res
      .status(500)
      .json({ message: "Error verifying user", error: error.message });
  }
};
