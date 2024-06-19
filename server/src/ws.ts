import { Server as WebsocketServer, WebSocket } from 'ws'
import { Server } from 'http'

export const createWsServer = (server: Server) => {

    const wsServer = new WebsocketServer({server});
    
    wsServer.on('connection', (ws: WebSocket) => {
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