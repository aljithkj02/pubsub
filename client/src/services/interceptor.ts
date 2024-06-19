import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    if (['/api/auth/signup', '/api/auth/login'].includes(config.url || '')) {
        return config;
    }
    const token = localStorage.getItem('token');
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

api.interceptors.response.use((res) => {
    if (res.data.token) {
        localStorage.setItem('token', res.data.token);
    }
    return res;
})