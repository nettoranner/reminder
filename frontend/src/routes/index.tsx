import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { DashboardPage } from '../pages/DashboardPage';

export const router = createBrowserRouter([
  // Public routes (everyone have access)
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <RegisterPage /> },

  // Privete routes (closes ProtectedRoute)
  {
    element: <ProtectedRoute />, // Auth checker
    children: [
      { path: '/', element: <DashboardPage /> }, // Render page <Outlet /> in ProtectedRoute
      //  Write here other protetcted pages
      // { path: '/profile', element: <ProfilePage /> }
    ],
  },
]);