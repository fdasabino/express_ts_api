import bcrypt from "bcrypt";
import { prisma } from "../config/db";
import { CreateUserTypeZ, UpdateUserTypeZ } from "../models/user.model";
import { AppError } from "../utils/app.error";

export const getAllUsersService = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });

  return users;
};

export const createUserService = async (data: CreateUserTypeZ) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new AppError("An user with that email already exists", 409);
  }

  // encrypt password
  const hashedPassword = await bcrypt.hash(data.password, 12);

  return prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      password: hashedPassword,
      email: data.email,
    },
  });
};

export const getUserByIdSevervice = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      created_at: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const deleteUserService = async (id: number) => {
  const userTobeDeleted = await prisma.user.findUnique({
    where: { id },
  });

  if (!userTobeDeleted) {
    throw new AppError("User not found", 404);
  }

  return await prisma.user.delete({
    where: { id },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });
};

export const updateUserService = async (id: number, data: UpdateUserTypeZ) => {
  const userTobeUpdated = await prisma.user.findUnique({
    where: { id },
  });

  if (!userTobeUpdated) {
    throw new AppError("User not found", 404);
  }

  // encrypt password
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 12);
  } else {
    data.password = userTobeUpdated.password;
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  return await prisma.user.update({
    where: { id },
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      password: hashedPassword || userTobeUpdated.password,
      email: data.email,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });
};
