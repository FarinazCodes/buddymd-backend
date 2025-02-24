import axios from "axios";

const FDA_API_URL = "https://api.fda.gov/drug/event.json";

export const getDrugReactions = async (req, res) => {
  const { drug } = req.query;

  if (!drug) {
    return res
      .status(400)
      .json({ success: false, message: "Drug name is required" });
  }

  try {
    const url = `${FDA_API_URL}?search=patient.drug.medicinalproduct:"${encodeURIComponent(
      drug
    )}"&count=patient.reaction.reactionmeddrapt.exact`;

    const response = await axios.get(url);

    if (!response.data.results || response.data.results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No reaction data available." });
    }

    res.json({ success: true, reactions: response.data.results });
  } catch (error) {
    console.error("Error fetching drug reactions:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch drug reactions" });
  }
};
