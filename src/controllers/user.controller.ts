import type { NextFunction, Request, Response } from "express";
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../services/user.service";

interface createUserType {
  name: string;
  age: number;
  email: string;
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const user = await getUserByIdService(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request<{}, {}, createUserType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, age, email } = req.body;
    const newUser = await createUserService(name, age, email);
    res.status(201).json({ status: "User Created sucesfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const updateData = req.body;
    // Implementation for updating user goes here
    const updateUser = await updateUserService(id, updateData);

    res.status(200).json({ status: `User with id ${id} updated successfully`, user: updateUser });
  } catch (error) {
    next(error);
  }
};
