import { useState } from "react";
import { Clock, Star } from "lucide-react";

import type { IDoctor } from "@/types";
import imageDoctorPlaceholder from "@/assets/images/doctorPhoto.jpg";

interface SelectedDoctorPopupProps {
    selectedDoctor: IDoctor;
    onClose: () => void;
}

function SelectedDoctorPopup({
    selectedDoctor,
    onClose,
}: SelectedDoctorPopupProps) {
    const [doctorImg, setDoctorImg] = useState(
        selectedDoctor.image || imageDoctorPlaceholder
    );

    return (
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 lg:right-auto lg:max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 backdrop-blur-sm">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                        <img
                            src={doctorImg}
                            onError={() => setDoctorImg(imageDoctorPlaceholder)}
                            alt={selectedDoctor.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                            {selectedDoctor.name}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm">
                            {selectedDoctor.specialty}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    title="Close"
                    onClick={onClose}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <div className="w-4 h-4 relative">
                        <div className="absolute inset-0 w-0.5 h-4 bg-gray-400 rotate-45 left-1/2 transform -translate-x-1/2"></div>
                        <div className="absolute inset-0 w-0.5 h-4 bg-gray-400 -rotate-45 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                </button>
            </div>

            <div className="p-3 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">
                            {Number(selectedDoctor.rate).toFixed(1)}
                        </span>
                        <span className="text-gray-500">Rating</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <div className="flex flex-col sm:flex-row sm:space-x-1">
                            <span className="font-medium">
                                {selectedDoctor.start_time}
                            </span>
                            <span className="hidden sm:inline">-</span>
                            <span className="font-medium">
                                {selectedDoctor.end_time}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                        <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold">$</span>
                        </div>
                        <span className="font-medium">
                            ${selectedDoctor.price}
                        </span>
                        <span className="text-gray-500 text-xs">/hour</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectedDoctorPopup;
