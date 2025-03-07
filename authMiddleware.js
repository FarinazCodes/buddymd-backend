import { admin } from "./Firebase.js";

export const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    console.error(" No token provided in request headers");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    console.log(" Verifying Firebase Token:", token.substring(0, 50) + "...");
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(" Firebase Token Verified. Decoded User:", decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(" Firebase Token Verification Failed:", error);
    res
      .status(403)
      .json({ message: "Unauthorized: Invalid token", error: error.message });
  }
};
