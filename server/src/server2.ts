import http from 'http'
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import { createWsServer } from '@src/ws';
import cors from 'cors'

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.json({
        status: true,
        message: "Welcome to my WS Server!"
    })
})

server.listen(8001, async () => {
    createWsServer(server);
    console.log("Server started on Port", 8001);
})


