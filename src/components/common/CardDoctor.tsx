import { Star, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useState } from "react";

import type { IDoctor, IFavouriteDoctor } from "../../types";
import doctorPlaceholder from "@/assets/images/doctorPhoto.jpg";

type DoctorCardProps = {
    doctor: IDoctor | IFavouriteDoctor;
    onToggleFavourite?: (id: number) => void;
    isFavourite?: boolean;
};

function CardDoctor({
    doctor,
    onToggleFavourite,
    isFavourite,
}: DoctorCardProps) {
    const [toggleHeart, setToggleHeart] = useState(
        isFavourite || doctor.is_favourite,
    );
    const [doctorImg, setDoctorImg] = useState(
        doctor.image || doctorPlaceholder,
    );

    return (
        <>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 1 }}>
                <div className="border border-gray-300 p-4 rounded-lg text-xs lg:text-base">
                    <div className="flex items-start gap-4 mb-2">
                        <img
                            src={doctorImg}
                            alt={doctor.name}
                            className="w-[97px] h-[88px] rounded-[10px] bg-gray-200 flex-shrink-0 object-cover"
                            onError={() => setDoctorImg(doctorPlaceholder)}
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        {doctor.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 my-2">
                                        {doctor.specialty}
                                    </p>
                                </div>
                                {/* hidden if router is /  */}
                                {location.pathname !== "/" && (
                                    <button
                                        type="button"
                                        title="Heart"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onToggleFavourite?.(doctor.id);
                                            setToggleHeart((prev) => !prev);
                                        }}
                                    >
                                        <Heart
                                            size={30}
                                            className={`${
                                                toggleHeart
                                                    ? "fill-red-500 text-red-500"
                                                    : "text-gray-600"
                                            } cursor-pointer`}
                                        />
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row text-xs gap-2 sm:items-center">
                                <div className="flex items-center gap-1">
                                    <Star
                                        size={14}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                    <span className="font-medium">
                                        {Number(doctor.rate).toFixed(1)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock
                                        size={16}
                                        className="text-gray-400"
                                    />
                                    <span className="font-medium">
                                        <span>
                                            {doctor.start_time} -{" "}
                                            {doctor.end_time}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                        <span className="text-md font-medium text-black">
                            Price
                            <span className="text-sm text-gray-400">/hour</span>
                        </span>
                        <span className="text-md font-semibold text-orange-500">
                            ${doctor.price}
                        </span>
                    </div>

                    <Link to={`/doctors/${doctor.id}`} key={doctor.id}>
                        <button
                            type="button"
                            className="w-full text-white cursor-pointer bg-primary py-2 px-4 rounded-lg hover:bg-primary/80 transition-colors font-medium"
                        >
                            Book appointment
                        </button>
                    </Link>
                </div>
            </motion.div>
        </>
    );
}

export default CardDoctor;
