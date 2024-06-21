
export enum RequestTypes {
    SEND = 'SEND'
}

export enum ResponseTypes {
    NEW_MESSAGE = 'NEW_MESSAGE'
}

export enum ErrorTypes {
    UNAUTHORIZED = 'UNAUTHORIZED'
}

export type RequestMessage = {
    type: RequestTypes;
    data: Object;
}

export type SendMessagePayload = {
    roomId: number;
    message: string;
    senderId: number;
    sender: string;
}
