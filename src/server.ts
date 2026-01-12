// src/server.ts
import dotenv from "dotenv";
import { createApp } from "./app";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
