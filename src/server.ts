// src/server.ts
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createApp } from "./app";
import { pool } from "./config/db";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const NODE_ENV = process.env.NODE_ENV || "development";
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/myapp";

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.info("✅ Connected to MONGO DB - Congrats!");

    const app = createApp();
    pool
      .connect()
      .then(() => console.log("DB connected"))
      .catch((e) => console.log(e));

    app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server", error);
    process.exit(1);
  }
};

startServer();
