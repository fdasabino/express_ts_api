import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app.error";

// src/middleware/error.ts
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Express requires all 4 params for error middleware.
  void req;
  void next;

  let statusCode = 500;
  let message = "Server Error";
  let details: unknown;
  let errors: Array<{ path: string; message: string; code?: string }> | undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Zod (v4) validation errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    // make it the human-friendly list.
    details = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));
  }

  res.status(statusCode).json({ message, details, errors });
};
