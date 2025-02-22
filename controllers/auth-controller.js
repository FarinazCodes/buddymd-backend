import knex from "knex";
import knexConfig from "../knexfile.js";

const db = knex(knexConfig);

export const verifyUser = async (req, res) => {
  try {
    const user = req.user;
    const { uid, email } = user;

    console.log("Firebase User UID:", uid);

    const userExists = await db("users").where({ id: uid }).first();

    if (!userExists) {
      console.log("Inserting new user into database...");
      await db("users").insert({
        id: uid,
        email: email || "",
        display_name: user.name || "",
        photo_url: user.picture || "",
      });
    } else {
      console.log("User already exists in database.");
    }

    res.status(200).json({ message: "Token Verified", user });
  } catch (error) {
    console.error("Error verifying user", error);
    res
      .status(500)
      .json({ message: "Error verifying user", error: error.message });
  }
};
