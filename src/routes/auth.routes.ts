import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { loginUserValidation, registerUserValidation } from "../models/user.model";

const router = Router();

router.post("/register", validate(registerUserValidation), register);
router.post("/login", validate(loginUserValidation), login);

export default router;
