import { Router } from "express";
import { getUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);
// router.get("/:id", getUserById);
// router.put("/:id", updateUserById);
// router.delete("/:id", deleteUserById);
// router.post("/", validate(createUserValidation), createUser);

export default router;
