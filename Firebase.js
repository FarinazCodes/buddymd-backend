import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Read the file path from the env variable
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;

// Read JSON from that file path
const serviceAccountJSON = fs.readFileSync(serviceAccountPath, "utf8");
const serviceAccount = JSON.parse(serviceAccountJSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { admin };
