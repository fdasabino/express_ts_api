import express, { type Request, type Response } from "express";
import userRoutes from "./routes/user.routes";

export const createApp = () => {
  const app = express();
  // * middlewares
  app.use(express.json());

  // * routes
  app.use("/api/users", userRoutes);

  // * Health check (quick way to verify server is alive)
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return app;
};
