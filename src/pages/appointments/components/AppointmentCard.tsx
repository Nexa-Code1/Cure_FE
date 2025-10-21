import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "date-fns";
import toast from "react-hot-toast";
import { Pin } from "lucide-react";

import ScheduleLabel from "@/components/common/ScheduleLabel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import type { IAppointment, IDoctorDetails } from "@/types";
import doctorPlaceholderImg from "@/assets/images/doctorPhoto.jpg";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cancelAppointment } from "@/api/appointments/appointments";
import CancelConfirmation from "./CancelConfirmation";
import { getDoctorDetails } from "@/api/doctors/doctors";
import { useUserContext } from "@/context/user-context";
import { Loader } from "@/components/common/Loader";

type AppointmentCardProps = {
    appointment: IAppointment;
    isDeletingAppointment: boolean;
    setIsDeletingAppointment: Dispatch<SetStateAction<boolean>>;
};

function AppointmentCard({
    appointment,
    isDeletingAppointment,
    setIsDeletingAppointment,
}: AppointmentCardProps) {
    const { day, slot, doctor, status } = appointment;
    const navigate = useNavigate();
    const { user } = useUserContext();
    const [doctorDetails, setDoctorDetails] = useState<IDoctorDetails | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [doctorImg, setDoctorImg] = useState(
        doctor.image || doctorPlaceholderImg
    );

    const hasReview = doctorDetails?.reviews.some(
        (review) => review.user_id === user?.id
    );

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await getDoctorDetails(doctor.id.toString());
                setDoctorDetails(res);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    async function handleCancelAppointment() {
        try {
            setIsDeletingAppointment(true);
            const res = await cancelAppointment(appointment.id);
            toast.success(res.message);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Cannot cancel appointment.");
        } finally {
            setIsDeletingAppointment(false);
        }
    }

    return (
        <Card className="w-full max-w-sm gap-2">
            <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                    <ScheduleLabel
                        iconStyle="text-secondary-300"
                        textStyle="text-secondary-300 font-normal text-xs"
                    >
                        {formatDate(day, "EEEE, MMMM dd")} - {slot}
                    </ScheduleLabel>
                    <p
                        className={`text-sm font-medium ${
                            status === "completed"
                                ? "text-success-500"
                                : status === "upcoming"
                                ? "text-primary-100"
                                : "text-error-500"
                        }`}
                    >
                        {status}
                    </p>
                </CardTitle>
            </CardHeader>

            <hr />

            <CardContent>
                <div className="flex items-center gap-2">
                    <Avatar className="w-14 h-14 border-1 border-secondary-200">
                        <AvatarImage
                            src={doctorImg}
                            onError={() => setDoctorImg(doctorPlaceholderImg)}
                            alt={doctor.name + "'s image"}
                            className="object-cover"
                        />
                        <AvatarFallback>
                            {getInitials(doctor.name)}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <h2 className="text-primary-200 font-medium text-base">
                            {doctor.name}
                        </h2>

                        <p className="text-secondary-400 text-base">
                            {doctor.specialty}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-sm mt-2">
                    <Pin className="text-secondary-300" size={18} />
                    <span className="text-secondary-400">hospital 57375</span>
                </div>
            </CardContent>

            <CardFooter className="flex items-center gap-4 mt-2">
                {status === "upcoming" ? (
                    <>
                        <CancelConfirmation
                            onCancelAppointment={handleCancelAppointment}
                            isDeletingAppointment={isDeletingAppointment}
                        >
                            <Button variant="outline" className="flex-1">
                                Cancel
                            </Button>
                        </CancelConfirmation>
                        <Button
                            className="flex-1"
                            onClick={() => navigate(`/doctors/${doctor.id}`)}
                        >
                            Reschedule
                        </Button>
                    </>
                ) : status === "completed" ? (
                    <>
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => navigate(`/doctors/${doctor.id}`)}
                        >
                            Book again
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={() =>
                                navigate(`/doctors/${doctor.id}/review`)
                            }
                            disabled={!!hasReview || isLoading}
                        >
                            {isLoading ? <Loader /> : "Feedback"}
                        </Button>
                    </>
                ) : (
                    <Button
                        className="flex-1"
                        onClick={() => navigate(`/doctors/${doctor.id}`)}
                    >
                        Book again
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

export default AppointmentCard;
