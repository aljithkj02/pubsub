import prisma from "@lib/db";
import { WebSocketInstance } from "@lib/middlewares/auth.ws.middleware";
import { createClient } from "redis";
import { Server as WebSocketServer } from "ws";
import { Server } from 'http'
import { RequestMessage, RequestTypes, ResponseTypes, SendMessagePayload } from "@lib/types/ws.types";
import { Message } from "@prisma/client";

export class PubSubManager {
    private wsServer: WebSocketServer;
    private subscriber: ReturnType<typeof createClient>;
    private publisher: ReturnType<typeof createClient>;
    private roomsRegister: Map<number, number[]>;
    private activeUsers: Map<number, WebSocketInstance>;

    constructor (server: Server) {
        this.wsServer = new WebSocketServer({server});
        this.subscriber = createClient();
        this.publisher = createClient();
        this.roomsRegister = new Map();
        this.activeUsers = new Map();
        

        this.publisher.on('error', (err) => {
            console.error('Publisher error', err);
        })

        this.subscriber.on('error', (err) => {
            console.error('Subscriber error', err);
        })

        this.publisher.connect().then(() => {
            console.log('Published connected to redis!');
        })

        this.subscriber.connect().then(() => {
            console.log("Subscriber connected to redis!");
        })

        this.subscriber.on('message', (arg) => {
            console.log("args", arg);
        })
    }

    async getServer() {
        await this.subscribeAll();
        return this.wsServer;
    }

    async subscribeAll() {
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

        rooms.forEach(async ({id}) => {
            await this.subscriber.subscribe(id.toString(), (message: string) => {
                this.handleSubscribedMessage(JSON.parse(message));
            })
        })
    }

    async publish(roomId: number, message: Message & { sender: string }) {
        await this.publisher.publish(roomId.toString(), JSON.stringify(message));
    }

    addActiveUser(userId: number, requestInstance: WebSocketInstance) {
        this.activeUsers.set(userId, requestInstance);
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

    async handleSend({ senderId, message, roomId, sender }: SendMessagePayload) {
        const messageEntity = await prisma.message.create({
            data: {
                senderId,
                text: message,
                roomId
            }
        })
        await this.publish(roomId, { sender , ...messageEntity });
    }

    handleSubscribedMessage(messageEntity: Message & { sender: string }) {
        this.roomsRegister.get(messageEntity.roomId)?.map((userId) => {
            if (this.activeUsers.has(userId)) {
                this.activeUsers.get(userId)?.send(JSON.stringify({
                    type: ResponseTypes.NEW_MESSAGE,
                    data: {
                        ...messageEntity,
                        me: messageEntity.senderId === userId
                    }
                }))
            }
        })
    }
}