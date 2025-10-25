import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Home, User } from "lucide-react";

function MobileBottomNav() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("home");

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-2 md:hidden z-50">
            <div className="flex justify-around">
                <button
                    title="Home"
                    type="button"
                    onClick={() => {
                        setActiveTab("home");
                        navigate("/");
                    }}
                    className={`flex flex-col items-center py-2 px-4 cursor-pointer ${
                        activeTab === "home" ? "text-blue-600" : "text-gray-600"
                    }`}
                >
                    <Home className="w-5 h-5 mb-1" />
                    <span className="text-xs">Home</span>
                </button>

                <button
                    title="Bookings"
                    type="button"
                    onClick={() => {
                        setActiveTab("bookings");
                        navigate("/appointments");
                    }}
                    className={`flex flex-col items-center py-2 px-4 cursor-pointer ${
                        activeTab === "bookings"
                            ? "text-blue-600"
                            : "text-gray-600"
                    }`}
                >
                    <Calendar className="w-5 h-5 mb-1" />
                    <span className="text-xs">Bookings</span>
                </button>

                <button
                    title="Profile"
                    type="button"
                    onClick={() => {
                        setActiveTab("profile");
                        navigate("/profile");
                    }}
                    className={`flex flex-col items-center py-2 px-4 cursor-pointer ${
                        activeTab === "profile"
                            ? "text-blue-600"
                            : "text-gray-600"
                    }`}
                >
                    <User className="w-5 h-5 mb-1" />
                    <span className="text-xs">Profile</span>
                </button>
            </div>
        </nav>
    );
}

export default MobileBottomNav;
