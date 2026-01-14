import type { Request, Response } from "express";
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
}

export const getUsers = (req: Request, res: Response) => {
  res.status(200).json(users);
};

export const getUserById = (req: Request, res: Response) => {
  console.log(req.params.id);
  const userId = req.params.id;

  res.status(200).send(userId);
};

export const createUser = (req: Request<{}, {}, createUserType>, res: Response) => {
  console.log(req.body);
  const { name, job, id } = req.body;

  const user = {
    name,
    job,
    id,
  };

  res.status(201).json({ status: "User Created sucesfully", user });
};
