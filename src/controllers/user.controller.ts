import type { NextFunction, Request, Response } from "express";
import { CreateUserTypeZ } from "../models/user.model";
import { createUserService, getAllUsersService } from "../services/user.service";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsersService();

    if (!users) {
      return res.status(404).json({ status: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request<{}, {}, CreateUserTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const newUser = await createUserService(data);

    if (!newUser) {
      return res.status(500).json({ status: "Failed to create user" });
    }

    res.status(201).json({ status: "User Created sucesfully", user: newUser });
  } catch (error) {
    next(error);
  }
};
