import { pool } from "../config/db";
import { UserDocument, UserModel } from "../models/user.model";
import { AppError } from "../utils/app.error";

interface USER {
  id: string;
  email: string;
}

export const getAllUsersService = async () => {
  const results = await pool.query("SELECT * FROM users");
  console.log(results.rows);
  return results.rows;
};

export const getUserByIdService = async (id: string) => {
  const query = "SELECT * FROM users WHERE id = $1";

  const result = await pool.query<USER>(query, [id]);
  if (!result) throw new AppError("User not found...", 404);

  return result.rows[0] || null;
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
