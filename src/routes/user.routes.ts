import { Router } from "express";
import {
  createUserController,
  deleteUserContoller,
  getUserByIdController,
  getUsersController,
} from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserValidation } from "../models/user.model";

const userRoutes = Router();

userRoutes.get("/", getUsersController);
userRoutes.get("/:id", getUserByIdController);
userRoutes.delete("/:id", deleteUserContoller);
userRoutes.post("/", validate(createUserValidation), createUserController);

export default userRoutes;
