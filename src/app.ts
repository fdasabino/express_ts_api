import express, { type Request, type Response } from "express";

export const createApp = () => {
  const app = express();
  console.log("I am the best!!!");
  // Global middleware (runs on every request)
  app.use(express.json());

  // Health check (quick way to verify server is alive)
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return app;
};
