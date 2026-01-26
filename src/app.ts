import express, { type Request, type Response } from "express";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

export const createApp = () => {
  const app = express();
  // * middlewares
  app.use(express.json());

  // * routes
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);

  // * error handling middleware
  app.use(errorHandler); // new line

  // * Health check (quick way to verify server is alive)
  app.get("/health", (req: Request, res: Response) => {
    void req;
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return app;
};
