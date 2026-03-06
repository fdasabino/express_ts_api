import { Router } from "express";
import { createUser, getUsers } from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserValidation } from "../models/user.model";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", validate(createUserValidation), createUser);

export default userRoutes;
