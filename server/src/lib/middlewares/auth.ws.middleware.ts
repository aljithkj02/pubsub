import prisma from "@lib/db";
import { ErrorTypes } from "@lib/types/ws.types";
import { verifyToken } from "@lib/utils/jwt.util";
import { User } from "@prisma/client";
import { WebSocket } from "ws";

export interface WebSocketInstance extends WebSocket {
    user?: User
}

export const authWsMiddleware = async (ws: WebSocketInstance, token: string) => {
    try {
        if (!token) {
            ws.send(JSON.stringify({
                type: ErrorTypes.UNAUTHORIZED
            }))
            return ws.terminate();
        }
        
        const isVerified = verifyToken(token);
        
        const user = await prisma.user.findUnique({ where: { id: isVerified.id }});

        if (!user) {
            ws.send(JSON.stringify({
                type: ErrorTypes.UNAUTHORIZED
            }))
            return ws.terminate();
        }

        ws.user = user;

    } catch (error) {
        ws.send(JSON.stringify({
            type: ErrorTypes.UNAUTHORIZED
        }))
        return ws.terminate();
    }
}