import express, { type Request, type Response } from "express";
import { errorHandler } from "./middleware/error.middleware";
import userRoutes from "./routes/user.routes";

export const createApp = () => {
  const app = express();
  // * middlewares
  app.use(express.json());

  // * routes
  app.use("/api/users", userRoutes);

  // * error handling middleware
  app.use(errorHandler); // new line

  // * Health check (quick way to verify server is alive)
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return app;
};
