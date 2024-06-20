import { Router } from "express";
import { authRouter } from "@routers/auth";
import { roomRouter } from "@routers/room";

export const allRouter = Router();

allRouter.use('/auth', authRouter);
allRouter.use('/room', roomRouter);