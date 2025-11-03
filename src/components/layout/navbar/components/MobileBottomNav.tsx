import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Ellipsis, Home, Search } from "lucide-react";

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
          title="Search"
          type="button"
          onClick={() => {
            setActiveTab("search");
            navigate("/search");
          }}
          className={`flex flex-col items-center py-2 px-4 cursor-pointer ${
            activeTab === "search" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <Search className="w-5 h-5 mb-1" />
          <span className="text-xs">Search</span>
        </button>

        <button
          title="Bookings"
          type="button"
          onClick={() => {
            setActiveTab("bookings");
            navigate("/appointments");
          }}
          className={`flex flex-col items-center py-2 px-4 cursor-pointer ${
            activeTab === "bookings" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <Calendar className="w-5 h-5 mb-1" />
          <span className="text-xs">Bookings</span>
        </button>

        <button
          title="More"
          type="button"
          onClick={() => {
            setActiveTab("more");
            navigate("/profile");
          }}
          className={`flex flex-col items-center py-2 px-4 cursor-pointer ${
            activeTab === "more" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <Ellipsis className="w-5 h-5 mb-1" />
          <span className="text-xs">More</span>
        </button>
      </div>
    </nav>
  );
}

export default MobileBottomNav;
