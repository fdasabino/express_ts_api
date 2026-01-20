import type { Request, Response } from "express";
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

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const user = await getUserByIdService(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const createUser = async (req: Request<{}, {}, createUserType>, res: Response) => {
  try {
    const { name, age, email } = req.body;
    const newUser = await createUserService(name, age, email);
    res.status(201).json({ status: "User Created sucesfully", user: newUser });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updateData = req.body;
    // Implementation for updating user goes here
    const updateUser = await updateUserService(id, updateData);

    res.status(200).json({ status: `User with id ${id} updated successfully`, user: updateUser });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};
