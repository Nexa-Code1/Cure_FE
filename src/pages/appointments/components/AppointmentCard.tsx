import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { getDoctorDetails } from "@/api/doctors/doctors";
import { useUserContext } from "@/context/user-context";
import { Loader } from "@/components/common/Loader";
import UpdateAppointmentModal from "./UpdateAppointmentModal";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useAddress } from "@/hooks/useAddress";

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
  const { day, slot, doctor_id, status } = appointment;

  const { address, isLoading: isLoadingAddress } = useAddress(doctor_id.address.x, doctor_id.address.y);

  const navigate = useNavigate();
  const { user } = useUserContext();
  const [doctorDetails, setDoctorDetails] = useState<IDoctorDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [doctorImg, setDoctorImg] = useState(
    doctor_id.image || doctorPlaceholderImg
  );
  const [displayedAppointment, setDisplayedAppointment] = useState({
    day,
    slot,
  });

  const hasReview = doctorDetails?.reviews.some(
    (review) => review.user_id === user?.id
  );

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await getDoctorDetails(doctor_id._id);
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
    <Card className="w-full gap-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <ScheduleLabel
            iconStyle="text-secondary-300"
            textStyle="text-secondary-300 font-normal text-xs"
          >
            {formatDate(displayedAppointment.day, "EEEE, MMMM dd")} -{" "}
            {displayedAppointment.slot}
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

      <CardContent className="mt-2">
        <Link to={`/doctors/${doctor_id._id}`} className="flex items-center gap-2">
          <Avatar className="w-14 h-14 border-1 border-secondary-200">
            <AvatarImage
              src={doctorImg}
              onError={() => setDoctorImg(doctorPlaceholderImg)}
              alt={doctor_id.name + "'s image"}
              className="object-cover"
            />
            <AvatarFallback>{getInitials(doctor_id.name)}</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-primary-200 font-medium text-base">
              {doctor_id.name}
            </h2>

            <p className="text-secondary-400 text-base">{doctor_id.specialty}</p>
          </div>
        </Link>
        <div className="flex items-center gap-1 text-sm mt-2">
          <Pin className="text-secondary-300" size={18} />
          {isLoadingAddress ? <p>Loading address...</p> :
            <span className="text-secondary-400">{address?.display_name}</span>
          }
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-4 mt-2">
        {status === "upcoming" ? (
          <>
            <ConfirmationModal
              onConfirm={handleCancelAppointment}
              isLoading={isDeletingAppointment}
              message="This action cannot be undone. This will permanently
                        delete this appointment."
            >
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            </ConfirmationModal>

            <UpdateAppointmentModal
              doctorId={appointment.doctor_id._id}
              appointmentId={appointment.id}
              onUpdateAppointment={setDisplayedAppointment}
            />
          </>
        ) : status === "completed" ? (
          <>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate(`/doctors/${doctor_id._id}`)}
            >
              Book again
            </Button>
            <Button
              className="flex-1"
              onClick={() => navigate(`/doctors/${doctor_id._id}/review`)}
              disabled={!!hasReview || isLoading}
            >
              {isLoading ? <Loader /> : "Feedback"}
            </Button>
          </>
        ) : (
          <Button
            className="flex-1"
            onClick={() => navigate(`/doctors/${doctor_id._id}`)}
          >
            Book again
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default AppointmentCard;
