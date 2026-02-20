import mongoose from "mongoose";
import { z } from "zod";

export interface UserDocument {
  name: string;
  email: string;
  age: number;
}

export const createUserValidation = z.object({
  body: z.object({
    firstname: z.string("Please enter a valid name").min(2),
    lastname: z.string("Please enter a valid last name").min(2),
    email: z.email("Please enter a valid email"),
    password: z.string("Please enter a valid password").min(8),
  }),
});

export type CreateUserTypeZ = z.infer<typeof createUserValidation>["body"];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
