import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from '../store/authStore';

export const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // If dont have a token, redirect to /login
    // replace is change browser history (so "back" button not return to the closes page)   
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If authorized, pass out further
    return <Outlet />;
};