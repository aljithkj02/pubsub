import prisma from "@lib/db";
import { verifyToken } from "@lib/utils/jwt.util";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const json = {
        status: false,
        message: 'Unauthorized user!'
    }

    try {
        const token = req.headers?.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json(json);
        }

        const isVerified = verifyToken(token);
        
        const user = await prisma.user.findUnique({ where: { id: isVerified.id }});

        if (!user) {
            return res.status(201).json(json);
        }

        req.user = user;

        next();
    } catch (error) {
        return res.json({
            status: false,
            message: (error as Error).message
        })
    }
}