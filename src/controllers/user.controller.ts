import type { NextFunction, Request, Response } from "express";
import { CreateUserTypeZ } from "../models/user.model";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdSevervice,
  updateUserService,
} from "../services/user.service";

export const createUserController = async (
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

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
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

export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdSevervice(Number(id));

    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUserContoller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await deleteUserService(Number(id));

    res
      .status(200)
      .json({ status: `${user.firstname} ${user.lastname} deleted successfully`, user });
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const user = await updateUserService(Number(id), data);
    res.status(200).json({ status: "User updated successfully", user });
  } catch (error) {
    next(error);
  }
};
