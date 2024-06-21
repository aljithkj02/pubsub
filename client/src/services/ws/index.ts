
const API = import.meta.env.VITE_WS_URL;
const API2 = import.meta.env.VITE_WS_URL2;

export class WebSocketManager {
    private socket: WebSocket;

    constructor(flag: boolean) {
        const token = localStorage.getItem('token') || '';
        this.socket = new WebSocket(`${flag ? API: API2}?token=${token}`);
    }

    getSocket() {
        return this.socket;
    }

    closeSocket() {
        this.socket.close();
    }
}