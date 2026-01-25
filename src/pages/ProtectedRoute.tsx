import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

type TokenPayload = {
    exp: number;
    iat?: number;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/get-start" replace />;
    }

    try {
        const decoded: TokenPayload = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
            localStorage.removeItem("token");
            return <Navigate to="/get-start" replace />;
        }
    } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        return <Navigate to="/get-start" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;
