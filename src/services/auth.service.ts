import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { RegisterUserTypeZ, UserModel } from "../models/user.model";
import { AppError } from "../utils/app.error";

export const registerUserService = async (userData: RegisterUserTypeZ) => {
  const { name, email, age, password } = userData;

  // Registration logic here
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    age,
    password: hashedPassword,
  };

  const createdUser = await UserModel.create(newUser);

  return createdUser;
}

export const loginUserService = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password!);
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new AppError("JWT_SECRET is not set", 500);
  }

  const expiresIn = (process.env.JWT_EXPIRES_IN ?? "1d") as SignOptions["expiresIn"];

  const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
    expiresIn,
  });

 // do not return password field
  user.password = undefined;

  return { user, token };
}
