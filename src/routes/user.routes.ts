import { Router } from "express";
import { createUser, getUserById, getUsers, updateUserById } from "../controllers/user.controller";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createUserValidation } from "../models/user.model";

const router = Router();

router.get("/", protect, getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.post("/", validate(createUserValidation), createUser);

export default router;
