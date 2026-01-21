import { Router } from "express";
import { AnyZodObject } from "zod/v3";
import { createUser, getUserById, getUsers, updateUserById } from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserValidation } from "../models/user.model";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.post("/", validate(createUserValidation as unknown as AnyZodObject), createUser);

export default router;
