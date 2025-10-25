import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function SearchNavbar() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full flex flex-1 mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
                onClick={() => navigate("/search")}
                type="text"
                placeholder="Search doctors, speciality, clinics"
                className="w-full pl-10 pr-4 py-2 bg-[#F5F6F7] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
}

export default SearchNavbar;
