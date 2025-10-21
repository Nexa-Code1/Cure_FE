import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formatDate } from "date-fns";
import toast from "react-hot-toast";
import axios from "axios";

import AppointmentDate from "./AppointmentDate";
import AppointmentTime from "./AppointmentTime";
import type {
    IAppointmentValues,
    IAvailableSlot,
    IDoctorDetails,
} from "@/types";
import PaymentDialog from "./PaymentDialog";
import ScheduleLabel from "@/components/common/ScheduleLabel";
import { SheetTrigger } from "@/components/ui/sheet";
import MessageDialog from "@/components/common/MessageDialog";
import { createDoctorAppointment } from "@/api/appointments/appointments";

type AppointmentProps = {
    availableSlots: IAvailableSlot[];
    doctorDetails: IDoctorDetails;
};

function Appointment({ availableSlots, doctorDetails }: AppointmentProps) {
    // Controlling open/close state for appointment payment dialog && final message dialog
    const [isMsgDialogOpen, setIsMsgDialogOpen] = useState(false);
    const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] =
        useState(false);

    const formik = useFormik({
        // INITIAL VALUES
        initialValues: {
            date: "",
            time: "",
            doctor_id: doctorDetails.id,
        },

        // YUP VALIDATION
        validationSchema: Yup.object({
            date: Yup.string().required("Required"),
            time: Yup.string().required("Required"),
        }),

        // SUBMIT APPOINTMENT FORM
        onSubmit: async (values: IAppointmentValues) => {
            try {
                const appointmentData = {
                    ...values,
                    doctor_id: doctorDetails.id,
                    date: formatDate(values.date, "yyyy-M-d"),
                };

                await createDoctorAppointment(appointmentData);
                setIsMsgDialogOpen(true);
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    toast(error.response?.data?.message);
                } else {
                    toast(
                        "An unexpected error occurred. Cannot make an appointment."
                    );
                }
            } finally {
                setIsAppointmentDialogOpen(false);
            }
        },
    });

    const schedule =
        !formik.values.date || !formik.values.time
            ? null
            : `${formatDate(formik.values.date, "EEEE, MMMM dd")} - ${
                  formik.values.time
              }`;

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 border-1 rounded-xl p-4"
            id="appointmentForm"
        >
            <AppointmentDate formik={formik} availableSlots={availableSlots} />
            <AppointmentTime formik={formik} availableSlots={availableSlots} />

            <div className="flex items-center justify-between gap-2 mt-4 text-sm">
                <ScheduleLabel>
                    {schedule || "Please select a data and a time"}
                </ScheduleLabel>

                {/* START PAYMENT DIALOG */}
                <PaymentDialog
                    doctorDetails={doctorDetails}
                    schedule={schedule}
                    open={isAppointmentDialogOpen}
                    onOpenChange={setIsAppointmentDialogOpen}
                >
                    <SheetTrigger
                        className="cursor-pointer text-primary-100 border-1 rounded-sm py-2 px-6 border-primary-100 hover:text-white hover:bg-primary-100 transition-all disabled:text-secondary-300 disabled:border-secondary-300 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                        disabled={!schedule}
                        onClick={() =>
                            setIsAppointmentDialogOpen((isOpen) => !isOpen)
                        }
                    >
                        Book
                    </SheetTrigger>
                </PaymentDialog>
                {/* END PAYMENT DIALOG */}

                {/* Message dialog appears when appointment is successed */}
                {isMsgDialogOpen && (
                    <MessageDialog
                        open={isMsgDialogOpen}
                        onOpenChange={setIsMsgDialogOpen}
                        appointmentData={{
                            doctorName: doctorDetails.name,
                            date: formik.values.date,
                            time: formik.values.time,
                        }}
                    />
                )}
            </div>
        </form>
    );
}

export default Appointment;
