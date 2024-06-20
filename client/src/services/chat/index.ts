import { api } from '@services/interceptor'
import toast from 'react-hot-toast';
import { GetAllRoomsResponse, GetMessagesResponse, NormalResponse } from '@services/types'



export const getAllRooms = async () => {
    try {
        const res = await api.get<GetAllRoomsResponse>('/api/room');
        
        toast.dismiss();
        if (res.data.status) {
            return res.data.data;
        } else {
            return [];
        }
    } catch (error) {
        console.log((error as Error).message);
        return [];
    }
}

export const getMessages = async (id: number) => {
    try {
        const res = await api.get<GetMessagesResponse>(`/api/room/${id}`);
        
        toast.dismiss();
        if (res.data.status) {
            return res.data.data;
        } else {
            return [];
        }
    } catch (error) {
        console.log((error as Error).message);
        return [];
    }
}

export const createRoom = async ({ name }: { name: string }) => {
    try {
        const res = await api.post<NormalResponse>('/api/room', { name });
        
        toast.dismiss();
        if (res.data.status) {
            toast.success(res.data.message);
            return true;
        } else {
            toast.error(res.data.message);
            return false;
        }
    } catch (error) {
        console.log((error as Error).message);
        return false;
    }
}