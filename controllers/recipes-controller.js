import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getRecipes = async (req, res) => {
  const { intolerances } = req.query;

  try {
    const response = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          intolerances: intolerances,
          number: 5,
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Spoonacular API Error:", error.response?.data || error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
