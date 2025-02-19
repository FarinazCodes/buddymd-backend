import "dotenv/config";

const knexConfig = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "medication_db",
  },
  migrations: { directory: "./migrations" },
  useNullAsDefault: true,
};

export default knexConfig;
