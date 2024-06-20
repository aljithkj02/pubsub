
export type Room = {
    id: number;
    name: string;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
}

export type GetAllRoomsResponse = {
    status: boolean;
    data: Room[];
}

export type NormalResponse = {
    status: boolean;
    message: string;
}