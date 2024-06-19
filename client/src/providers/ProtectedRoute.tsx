import { ReactNode } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps ) => {
    const token = localStorage.getItem('token');

    if (!token) {
        toast.dismiss();
        toast.error('Unauthorized user!');
        return <Navigate to="/login" />
    }

    return children;
}
