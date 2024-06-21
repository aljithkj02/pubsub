import { Server as WebSocketServer } from "ws";
import { Server } from 'http'
import { RequestMessage, RequestTypes, ResponseTypes, SendMessagePayload } from "@lib/types/ws.types";
import { WebSocketInstance } from "@lib/middlewares/auth.ws.middleware";
import { User } from "@prisma/client";
import prisma from "@lib/db";

export class WsManager {
    private wsServer: WebSocketServer;
    private activeUsers: Map<number, WebSocketInstance>;
    private roomsRegister: Map<number, number[]>;

    constructor(server: Server) {
        this.wsServer = new WebSocketServer({server});
        this.activeUsers = new Map();
        this.roomsRegister = new Map();
    }

    async getServer() {
        const rooms = await prisma.room.findMany({
            select: {
                id: true
            }
        })
        const users = await prisma.user.findMany({
            select: {
                id: true
            }
        })
        const userIds = users.map(({id}) => id);
        
        rooms.map(({id}) => {
            this.roomsRegister.set(id, userIds);
        })
        
        return this.wsServer;
    }

    async handleSend({ senderId, message, roomId, sender }: SendMessagePayload) {
        const messageEntity = await prisma.message.create({
            data: {
                senderId,
                text: message,
                roomId
            }
        })

        this.roomsRegister.get(roomId)?.map((userId) => {
            if (this.activeUsers.has(userId)) {
                this.activeUsers.get(userId)?.send(JSON.stringify({
                    type: ResponseTypes.NEW_MESSAGE,
                    data: {
                        ...messageEntity,
                        sender,
                        me: senderId === userId
                    }
                }))
            }
        })
    }

    async addActiveUser(userId: number, requestInstance: WebSocketInstance) {
        this.activeUsers.set(userId, requestInstance);
        const rooms  = requestInstance.user?.joinedRooms || [];
        const user = requestInstance.user as User;

        rooms.map((roomId) => {
            if (this.roomsRegister.has(roomId)) {
                if (!this.roomsRegister.get(roomId)?.includes(user.id)) {
                    this.roomsRegister.get(roomId)?.push(user.id);
                }
            } else {
                this.roomsRegister.set(roomId, [user.id]);
            }
        })
    }

    removeClosedUser(userId: number) {
        this.activeUsers.delete(userId);
    }

    handleRequest(requestMessage: RequestMessage, ws: WebSocketInstance) {
        switch (requestMessage.type) {
            case RequestTypes.SEND: 
                this.handleSend({
                    ...requestMessage.data,
                    senderId: ws.user?.id,
                    sender: ws.user?.name
                } as SendMessagePayload)
                break;
        
            default:
                console.log('Sorry None of the types matched.')
                break;
        }
    }
}
