import { Router } from "express";
import { createUser, getUserById, getUsers, updateUserById } from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.post("/", createUser);

export default router;
