
export enum RequestTypes {
    SEND
}

export enum ErrorTypes {
    UNAUTHORIZED
}

export type RequestMessage = {
    type: RequestTypes;
    data: Object;
}

export type SendMessagePayload = {
    roomId: number;
    message: string;
    senderId: number;
}
