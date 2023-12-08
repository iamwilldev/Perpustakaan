import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard.jsx";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Buku from "./views/Buku.jsx";
import Users from "./views/Users.jsx";
import Peminjaman from "./views/Peminjaman.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import MainLayout from "./components/MainLayout.jsx";
import BukuView from "./views/BukuView.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Navigate to='/' />
            },
            { 
                path: '/', 
                element: <Dashboard /> 
            },
            {
                path: '/buku',
                element: <Buku />
            },
            {
                path: '/buku/create',
                element: <BukuView />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/peminjaman',
                element: <Peminjaman />
            },
        ]
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
])

export default router;