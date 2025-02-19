import { admin } from "./firebase.js";

export const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
};
