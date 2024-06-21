import { Server as WebsocketServer } from "ws";
import { Server } from 'http'
import { RequestMessage, RequestTypes, SendMessagePayload } from "@lib/types/ws.types";
import { WebSocketInstance } from "@lib/middlewares/auth.ws.middleware";
import { User } from "@prisma/client";

export class WsManager {
    private wsServer: WebsocketServer;
    private activeUsers: Map<number, WebSocketInstance>;
    private roomsRegister: Map<number, number[]>;

    constructor(server: Server) {
        this.wsServer = new WebsocketServer({server});
        this.activeUsers = new Map();
        this.roomsRegister = new Map();
    }

    getServer() {
        return this.wsServer;
    }

    handleSend(data: SendMessagePayload) {

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
                    senderId: ws.user?.id
                } as SendMessagePayload)
                break;
        
            default:
                console.log('Sorry None of the types matched.')
                break;
        }
    }
}
