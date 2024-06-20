import prisma from "@lib/db";
import { verifyToken } from "@lib/utils/jwt.util";
import { User } from "@prisma/client";
import { WebSocket } from "ws";

export interface WebSocketInstance extends WebSocket {
    user?: User
}

export const authWsMiddleware = async (ws: WebSocketInstance, token: string) => {
    try {
        if (!token) {
            return ws.close(401, 'Unauthorized!');
        }

        const isVerified = verifyToken(token);
        
        const user = await prisma.user.findUnique({ where: { id: isVerified.id }});

        if (!user) {
            return ws.close(401, 'Unauthorized!');
        }

        ws.user = user;

    } catch (error) {
        return ws.close(401, (error as Error).message);
    }
}