import { Server as WebsocketServer } from 'ws'
import { Server } from 'http'
import url from 'url'
import { WebSocketInstance, authWsMiddleware } from '@lib/middlewares/auth.ws.middleware';

export const createWsServer = (server: Server) => {

    const wsServer = new WebsocketServer({server});
    
    wsServer.on('connection', async (ws: WebSocketInstance, req) => {
        const query = url.parse(req.url || '', true).query;

        await authWsMiddleware(ws, query.token as string);
        console.log('A new client connected!');

        ws.on('message', (message) => {
            console.log(JSON.parse(message.toString()));
        })

        ws.on('close', () => {
            console.log('Client disconnected!');
        })

        ws.send("Hello Client");
    })
}