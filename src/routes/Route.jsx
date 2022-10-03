import { Routes, Route } from 'react-router-dom';
import { ContextProvider } from '../context/Context';
import ProtectedRoute from '../components/ProtectedRoute';

import Home from '../views/Home'
import Login from '../views/Login'
import NotFound from '../views/NotFound'

export default function Router() {
    return (
        <ContextProvider>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ContextProvider>
    )
}