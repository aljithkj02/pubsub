
const API = import.meta.env.VITE_WS_URL;

export class WebSocketManager {
    private socket: WebSocket;

    constructor() {
        const token = localStorage.getItem('token') || '';
        this.socket = new WebSocket(`${API}?token=${token}`);
    }

    getSocket() {
        return this.socket;
    }

    closeSocket() {
        this.socket.close();
    }
}