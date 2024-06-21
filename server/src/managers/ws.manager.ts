import { Server as WebsocketServer } from "ws";
import { Server } from 'http'
import { SendMessagePayload } from "@lib/types/ws.types";
import { WebSocketInstance } from "@lib/middlewares/auth.ws.middleware";

export class WsManager {
    private wsServer: WebsocketServer;
    private activeUsers: Map<number, WebSocketInstance>;

    constructor(server: Server) {
        this.wsServer = new WebsocketServer({server});
        this.activeUsers = new Map();
    }

    getServer() {
        return this.wsServer;
    }

    handleSend(data: SendMessagePayload) {

    }

    addActiveUser(userId: number, requestInstance: WebSocketInstance) {
        this.activeUsers.set(userId, requestInstance);
    }

    removeClosedUser(userId: number) {
        this.activeUsers.delete(userId);
    }
}
