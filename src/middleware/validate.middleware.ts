import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod/v3";

// src/middleware/validate.ts
export const validate =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Throws error if invalid
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next(); // Valid! Continue.
    } catch (error) {
      return res.status(400).json(error);
    }
  };
