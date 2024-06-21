import { Server as WebsocketServer } from 'ws'
import { Server } from 'http'
import url from 'url'
import { WebSocketInstance, authWsMiddleware } from '@lib/middlewares/auth.ws.middleware';
import { WsManager } from './managers/ws.manager';
import { RequestMessage, RequestTypes, SendMessagePayload } from '@lib/types/ws.types';

export const createWsServer = (server: Server) => {

    const wsManager = new WsManager(server);

    const wsServer = wsManager.getServer();
    
    wsServer.on('connection', async (ws: WebSocketInstance, req) => {
        const query = url.parse(req.url || '', true).query;

        // Verify the user
        await authWsMiddleware(ws, query.token as string);

        // Store Ws Request instance
        await wsManager.addActiveUser(ws.user?.id as number, ws);

        console.log(ws.user?.name, 'connected!');

        ws.on('message', (message) => {
            const requestMessage: RequestMessage = JSON.parse(message.toString());
            console.log(JSON.parse(message.toString()));

            wsManager.handleRequest(requestMessage, ws);
        })

        ws.on('close', () => {
            wsManager.removeClosedUser(ws.user?.id as number);
            console.log(ws.user?.name, 'disconnected!');
        })

        // ws.send("Hello Client");
    })
}