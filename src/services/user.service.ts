import bcrypt from "bcrypt";
import { pool } from "../config/db";
import { AppError } from "../utils/app.error";

interface USER {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  admin: boolean;
  password: string;
  created_at: string;
  updated_at: string;
}

const fieldsToReturn = "id, firstname, lastname, email, admin, created_at, updated_at";

export const getAllUsersService = async () => {
  // return users without password field
  const results = await pool.query<Partial<USER>>(`SELECT ${fieldsToReturn} FROM users`);
  console.log(results);

  return results.rows;
};

export const getUserByIdService = async (id: string) => {
  const query = `SELECT ${fieldsToReturn} FROM users WHERE id = $1`;

  const result = await pool.query<Partial<USER>>(query, [id]);
  if (!result) throw new AppError("User not found...", 404);

  return result.rows[0] || null;
};

export const createUserService = async (data: Partial<USER>) => {
  const query = `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) returning ${fieldsToReturn}`;

  const encryptedPassword = await bcrypt.hash(data.password as string, 10);
  const values = [data.firstname, data.lastname, data.email, encryptedPassword];

  const result = await pool.query<Partial<USER>>(query, values);
  console.log(result);
  if (!result) throw new AppError("Failed to create user...", 500);

  return result.rows[0];
};

export const updateUserService = async (id: string, updateData: Partial<USER>) => {
  const fields = Object.keys(updateData);
  const values = Object.values(updateData);

  const setClauses = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");

  if (setClauses.includes("password")) {
    const passwordIndex = fields.findIndex((field) => field === "password");
    if (passwordIndex !== -1) {
      const encryptedPassword = await bcrypt.hash(values[passwordIndex] as string, 10);
      values[passwordIndex] = encryptedPassword;
    }
  }

  const query = `UPDATE users SET ${setClauses} WHERE id = $${fields.length + 1} RETURNING ${fieldsToReturn}`;

  const result = await pool.query<Partial<USER>>(query, [...values, id]);
  if (!result) throw new AppError("Failed to update user...", 500);

  return result.rows[0];
};
