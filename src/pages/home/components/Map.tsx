import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import map from "@/assets/images/map.png";

export default function Map() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row items-center justify-center relative py-10 md:pt-20">
            <div className="p-6">
                <h2 className="text-2xl font-semibold lg:w-1/2">
                    Find Care Near You in Seconds
                </h2>
                <p className="my-4 text-secondary-300 w-full lg:w-2/3">
                    Allow location access or choose your city to instantly
                    discover trusted doctors and clinics around you—quick, easy,
                    and local.
                </p>
                <Button
                    onClick={() => {
                        navigate("/search-map");
                    }}
                    className="bg-white text-primary border border-primary hover:bg-primary hover:text-white"
                >
                    <Search />
                    Search by location
                </Button>
            </div>
            <div className="w-full md:w-1/2">
                <img src={map} alt="map" className="w-full h-full" />
            </div>
        </div>
    );
}
