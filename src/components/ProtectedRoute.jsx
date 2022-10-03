import { UseAppContext } from "../context/Context";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function ProtectedRoute({ children }) {
    const { userSessionData, loading } = UseAppContext();

    if (loading) return <Spinner />;

    if (!userSessionData) {
        return <Navigate to="/login" />;
    }

    return children;
}