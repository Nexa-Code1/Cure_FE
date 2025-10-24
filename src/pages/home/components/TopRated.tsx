import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import CardDoctor from "@/components/common/CardDoctor";
import { Loader } from "@/components/common/Loader";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getTopRatedDoctors } from "@/api/doctors/doctors";
import type { IDoctor } from "@/types";

export default function TopRated() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleGetDoctors = async () => {
            try {
                setLoading(true);
                const doctors = await getTopRatedDoctors();
                setDoctors(doctors);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        handleGetDoctors();
    }, []);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1170 },
            items: 3,
            centerMode: true,
            initialSlide: 1,
        },
        tablet: {
            breakpoint: { max: 1170, min: 700 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 700, min: 0 },
            items: 1,
        },
    };

    if (!doctors || !doctors.length) return <></>;

    return (
        <div className="w-full py-10">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto mb-8">
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <h2 className="text-xl md:text-3xl font-semibold text-gray-800">
                        Top-Rated Doctors Chosen by Patients
                    </h2>
                    <p className="w-full md:w-3/4 mt-4 text-gray-600">
                        Explore our highest-rated doctors, trusted by real
                        patients for their expertise, care, and service. Book
                        with confidence today.
                    </p>
                </div>
                <Button
                    onClick={() => navigate("/search")}
                    className="bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-colors duration-200"
                >
                    View all
                </Button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader size="xxl" />
                </div>
            ) : (
                <div className="max-w-6xl mx-auto">
                    <Carousel responsive={responsive} arrows={false}>
                        {doctors.map((doctor: IDoctor) => (
                            <div key={doctor.id} className="px-2 h-full">
                                <CardDoctor doctor={doctor} />
                            </div>
                        ))}
                    </Carousel>
                </div>
            )}
        </div>
    );
}
