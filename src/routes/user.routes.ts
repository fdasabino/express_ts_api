import { Router } from "express";
import { createUser, getUserById, getUsers, updateUserById } from "../controllers/user.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createUserValidation } from "../models/user.model";

const router = Router();

router.get("/", protect, restrictTo("admin"), getUsers);
router.get("/:id", protect, restrictTo("admin"), getUserById);
router.put("/:id", protect, restrictTo("admin"), updateUserById);
router.post("/", validate(createUserValidation), protect, restrictTo("admin"), createUser);

export default router;
