import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import type { IDoctor } from "@/types";
import { getDoctors } from "@/api/doctors/doctors";
import MapDoctorCard from "@/components/common/MapDoctorCard";

import { initializeMap, updateMapView } from "@/api/search/search";
import SelectedDoctorPopup from "@/components/common/SelectedDoctorPopup";

const MapSearch = () => {
    const [doctors, setDoctors] = useState<IDoctor[]>([]);
    const mapRef = useRef<L.Map | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const dataDoctor: IDoctor[] = await getDoctors({});
                setDoctors(dataDoctor);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            doctors.length > 0 &&
            !mapRef.current
        ) {
            const setupMap = async () => {
                const map = await initializeMap(
                    doctors,
                    (doctorWithCoords: IDoctor) => {
                        setSelectedDoctor(doctorWithCoords);
                    }
                );
                mapRef.current = map;
            };

            setupMap();
        }
    }, [doctors]);

    const handleSelectDoctor = async (doctor: IDoctor) => {
        const coords = await updateMapView(mapRef.current, doctor);
        setSelectedDoctor({ ...doctor, ...coords });
    };

    const handleClosePopup = () => {
        setSelectedDoctor(null);
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <div
                className="w-full lg:w-80 xl:w-96 bg-white border-r border-gray-200 flex flex-col shadow-sm
                      h-[40vh] lg:h-full"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                            {doctors.length} Doctors Found
                        </h2>
                        <div className="hidden sm:block w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Doctors List */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                    <div className="divide-y divide-gray-100">
                        {doctors.map((doctor) => (
                            <MapDoctorCard
                                key={doctor.id}
                                doctor={doctor}
                                isSelected={selectedDoctor?.id == doctor.id}
                                onSelect={handleSelectDoctor}
                            />
                        ))}
                    </div>

                    {doctors.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <MapPin className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-sm">
                                No doctors found in this area
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative bg-gray-100 h-[60vh] lg:h-full">
                <div id="map" className="w-full h-full z-0"></div>

                {/* Selected Doctor Popup */}
                {selectedDoctor && (
                    <SelectedDoctorPopup
                        key={selectedDoctor.id}
                        selectedDoctor={selectedDoctor}
                        onClose={handleClosePopup}
                    />
                )}

                {/* Legend */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white rounded-lg shadow-lg p-2 sm:p-3 border border-gray-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm text-gray-600 font-medium">
                            Doctor Locations
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapSearch;
