import { UserDocument, UserModel } from "../models/user.model";

export const getAllUsersService = async () => {
  const users = await UserModel.find();

  if (users.length === 0) throw new Error("No users found...");

  return users;
};

export const getUserByIdService = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) throw new Error("User not found...");

  return user;
};

export const createUserService = async (name: string, age: number, email: string) => {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) throw new Error("User already exists...");

  const newUser: UserDocument = {
    name,
    age,
    email,
  };

  await UserModel.create(newUser);
  return newUser;
};

export const updateUserService = async (id: string, updateData: Partial<UserDocument>) => {
  const existingUser = await UserModel.findById(id);

  if (!existingUser) throw new Error("User not found...");

  const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

  if (!updatedUser) throw new Error("User not found...");

  return updatedUser;
};
