import { loginUser, signupUser } from "@controllers/auth.controller";
import { Router } from "express";

export const authRouter = Router();

authRouter.post('/signup', signupUser);
authRouter.post('/login', loginUser);