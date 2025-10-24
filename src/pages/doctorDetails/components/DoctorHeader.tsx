import { BadgeCheck, Pin } from "lucide-react";
import { useState } from "react";
import { useAddress } from "@/hooks/useAddress";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import doctorPlaceholderImg from "@/assets/images/doctorPhoto.jpg";
import type { IDoctorDetails } from "@/types";
import { Loader } from "@/components/common/Loader";

type DoctorHeaderProps = {
    doctor: IDoctorDetails;
    className?: string;
};

function DoctorHeader({ doctor, className }: DoctorHeaderProps) {
    const [doctorImg, setDoctorImg] = useState(
        doctor.image || doctorPlaceholderImg
    );
    const { address, isLoading } = useAddress(
        doctor.address.x,
        doctor.address.y
    );

    return (
        <section className={`flex items-center gap-x-3 gap-y-2 ${className}`}>
            <section className="relative">
                <Avatar className="w-24 h-24 shadow-[3px_3px_0px_0px] shadow-primary-100">
                    <AvatarImage
                        src={doctorImg}
                        className="object-cover"
                        onError={() => setDoctorImg(doctorPlaceholderImg)}
                    />
                    <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
                </Avatar>
                <BadgeCheck className="fill-primary-100 text-[#ffffffc5] absolute bottom-0 right-0" />
            </section>

            <div className="flex flex-col gap-2">
                <h2 className="font-medium text-lg">Dr. {doctor.name}</h2>
                <p className="text-secondary-400 font-normal text-sm">
                    {doctor.specialty}
                </p>
                {isLoading ? (
                    <Loader />
                ) : (
                    address && (
                        <div className="flex items-center gap-2 text-secondary-400 font-normal text-sm">
                            <Pin className="text-primary-100" size={20} />
                            <span>{address.display_name}</span>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}

export default DoctorHeader;
