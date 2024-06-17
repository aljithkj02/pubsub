import http from 'http'
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import { createWsServer } from './ws';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.get('/', (req: Request, res: Response) => {
    res.json({
        status: true,
        message: "Welcome to my server!"
    })
})

server.listen(8000, async () => {
    createWsServer(server);
    console.log("Server started on Port", 8000);
})


