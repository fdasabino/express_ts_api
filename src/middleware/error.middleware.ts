import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app.error";

// src/middleware/error.ts
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = "Server Error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  if (err instanceof Error && err.message === "User already exists...") {
    console.log(err.message);
    statusCode = 409;
    message = err.message;
  }

  // ... Handle Zod errors too validation errors if needed

  res.status(statusCode).json({ message });
};
