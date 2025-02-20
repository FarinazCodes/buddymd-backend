import knexConfig from "../knexfile.js";
import knex from "knex";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const db = knex(knexConfig);
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (phone_number, message) => {
  try {
    console.log(`Attempting to send SMS to: ${phone_number}...`);
    const response = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone_number,
    });
    console.log(` SMS Sent Successfully: ${response.sid}`);
  } catch (error) {
    console.error(` Failed to send SMS: ${error.message}`);
  }
};

const checkAndSendReminders = async () => {
  try {
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    const currentDate = new Date().toISOString().split("T")[0];

    console.log(
      `🔎 Checking reminders for ${currentDate} at ${currentTime}...`
    );

    const reminders = await db("reminders")
      .join("medications", "reminders.medication_id", "medications.id")
      .whereRaw("TIME_FORMAT(reminders.time, '%H:%i') = ?", [currentTime])
      .where((query) => {
        query
          .whereNull("medications.end_date")
          .orWhere("medications.end_date", ">=", currentDate);
      });

    if (reminders.length === 0) {
      console.log("⏳ No reminders matched this time.");
      return;
    }

    for (const reminder of reminders) {
      console.log(
        `📲 Found Reminder: ${reminder.name} for ${reminder.phone_number}`
      );
      const message = `Reminder: Time to take your medication: ${reminder.name}!`;

      if (reminder.delivery_method === "sms") {
        await sendSMS(reminder.phone_number, message);
      }
    }
  } catch (error) {
    console.error(" Error checking reminders:", error);
  }
};

setInterval(checkAndSendReminders, 60 * 1000);
