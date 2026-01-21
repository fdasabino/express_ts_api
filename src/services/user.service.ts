import { UserDocument, UserModel } from "../models/user.model";
import { AppError } from "../utils/app.error";

export const getAllUsersService = async () => {
  const users = await UserModel.find();

  if (users.length === 0) throw new AppError("No users found...", 404);

  return users;
};

export const getUserByIdService = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) throw new AppError("User not found...", 404);

  return user;
};

export const createUserService = async (name: string, age: number, email: string) => {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) throw new AppError("User already exists...", 409);

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

  if (!existingUser) throw new AppError("User not found...", 404);

  const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) throw new AppError("User not found...", 404);

  return updatedUser;
};
