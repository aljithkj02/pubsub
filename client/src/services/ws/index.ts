
const API = import.meta.env.VITE_WS_URL;

class WebSocketManager {
    static instance: WebSocketManager;
    private socket: WebSocket;

    private constructor() {
        const token = localStorage.getItem('token') || '';
        this.socket = new WebSocket(`${API}?token=${token}`);
    }

    static getInstance () {
        if (!WebSocketManager.instance) {
            WebSocketManager.instance = new WebSocketManager();
        }
        return WebSocketManager.instance;
    }

    getSocket() {
        return this.socket;
    }
}

export const websocketManager = WebSocketManager.getInstance();