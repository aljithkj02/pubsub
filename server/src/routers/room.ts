import { addRoom, getAllMessages, getAllRooms } from "@controllers/room.controller";
import { authMiddleware } from "@lib/middlewares/auth.middleware";
import { Router } from "express";


export const roomRouter = Router();

roomRouter.get('/', authMiddleware, getAllRooms);
roomRouter.post('/', authMiddleware, addRoom);
roomRouter.get('/:id', authMiddleware, getAllMessages);