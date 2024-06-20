import prisma from "@lib/db"
import { Request, Response } from "express"

export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await prisma.room.findMany();
        return res.json({
            status: true,
            data: rooms
        })
    } catch (error) {
        res.json({
            status: false,
            message: (error as Error).message
        })
    }
}