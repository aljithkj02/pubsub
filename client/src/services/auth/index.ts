import { api } from '@services/interceptor'
import { UserInfo } from '@src/components/auth/AuthPage'
import toast from 'react-hot-toast';

interface Response {
    status: boolean;
    message: string;
    token: string;
}

export const signupUser = async ({ name, email, password }: UserInfo) => {
    try {
        const res = await api.post<Response>('/api/auth/signup', {
            name, email, password
        })
    
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

export const loginUser = async ({ email, password }: UserInfo) => {
    try {
        const res = await api.post<Response>('/api/auth/login', {
            email, password
        })
    
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