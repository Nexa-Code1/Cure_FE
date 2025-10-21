import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="font-bold text-9xl text-primary-100">404</h1>
            <p className="font-medium text-lg text-primary-200">
                Page not found
            </p>
            <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="border-primary-100 text-primary-100 hover:text-primary-100"
            >
                Go Back to home
            </Button>
        </div>
    );
}

export default NotFound;
