import { getAllRooms } from "@controllers/room.controller";
import { authMiddleware } from "@lib/middlewares/auth.middleware";
import { Router } from "express";


export const roomRouter = Router();

roomRouter.get('/', authMiddleware, getAllRooms);