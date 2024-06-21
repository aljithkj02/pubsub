export enum ResponseTypes {
    NEW_MESSAGE = 'NEW_MESSAGE'
}

export enum RequestTypes {
    SEND = 'SEND'
}

export type Room = {
    id: number;
    name: string;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
}

export type Message = {
    id: number;
    roomId: number;
    senderId: number;
    createdAt: string;
    text: string;
    sender: string;
    me: boolean;
}

export type NormalResponse = {
    status: boolean;
    message: string;
}

export type GetAllRoomsResponse = {
    status: boolean;
    data: Room[];
}

export type GetMessagesResponse = {
    status: boolean;
    data: Message[]
}