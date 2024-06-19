import { loginUser, signupUser } from "@controllers/auth.controller";
import { Router } from "express";

export const authRouter = Router();

authRouter.post('/auth/signup', signupUser);
authRouter.post('/auth/login', loginUser);