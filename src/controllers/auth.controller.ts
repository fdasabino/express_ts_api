import { NextFunction, Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/auth.service";


export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, age, password } = req.body;
  try {
    const newUser = await registerUserService({ name, email, age, password });
    res.status(201).json({ status: "User Registered successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const token = await loginUserService(email, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
