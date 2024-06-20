import prisma from "@lib/db"
import { handleValidationError } from "@lib/exceptions";
import { validateCreateRoomPayload } from "@lib/validators/room.validator";
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

export const addRoom = async (req: Request, res: Response) => {
    try {
        const validateResult = validateCreateRoomPayload(req.body);

        if (!validateResult.success) {
            return handleValidationError(res, validateResult.error);
        }

        const isRoomExist = await prisma.room.findUnique({ where: { name : validateResult.data.name }});

        if (isRoomExist) {
            return res.json({
                status: false,
                message: 'Room with this name already available!'
            })
        }

        await prisma.room.create({
            data: {
                name: validateResult.data.name,
                ownerId: req.user.id
            }
        })

        return res.json({
            status: true,
            message: 'Room has successfully created!'
        })
    } catch (error) {
        res.json({
            status: false,
            message: (error as Error).message
        })
    }
}

export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const roomId = req.params.id;

        const room = await prisma.room.findUnique({ where: { id: Number(roomId) }});
        if (!room) {
            return res.json({
                status: false,
                message: "No such room exist!"
            })
        }
        
        const messages = await prisma.message.findMany({
            where: {
                roomId: Number(roomId)
            },
            include: {
                sender: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return res.json({
            status: true,
            data: messages.map(({ id, createdAt, roomId, senderId, text, sender}) => ({
                id, roomId, senderId, createdAt, text,
                sender: sender.name,
                me: senderId === req.user.id
            }))
        })
    } catch (error) {
        res.json({
            status: false,
            message: (error as Error).message
        })
    }
}