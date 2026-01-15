import type { Request, Response } from "express";
import { createUserService } from "../services/user.service";

const users = [
  { id: 1, name: "Dexter Morgan", job: "Forensics Analist" },
  {
    id: 2,
    name: "Debra Morgan",
    job: "Capitain",
  },
];

interface createUserType {
  id: number;
  name: string;
  job: string;
  email: string;
}

export const getUsers = (req: Request, res: Response) => {
  res.status(200).json(users);
};

export const getUserById = (req: Request, res: Response) => {
  console.log(req.params.id);
  const userId = req.params.id;

  res.status(200).send(userId);
};

export const createUser = async (req: Request<{}, {}, createUserType>, res: Response) => {
  try {
    console.log("Request", req);
    const { name, job, email } = req.body;
    const newUser = await createUserService(name, job, email);

    console.log(newUser);

    res.status(201).json({ status: "User Created sucesfully", user: newUser });
  } catch (error: any) {
    if (error.message === "User already exists...") {
      res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: "An error has occured", error });
  }
};
