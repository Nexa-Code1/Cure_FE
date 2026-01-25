import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { formatDate } from "date-fns";

import AppointmentDate from "./AppointmentDate";
import AppointmentTime from "./AppointmentTime";
import type {
    IAppointmentData,
    IAppointmentValues,
    IAvailableSlot,
    IDoctorDetails,
} from "@/types";
import PaymentDialog from "./PaymentDialog";
import ScheduleLabel from "@/components/common/ScheduleLabel";
import MessageDialog from "@/components/common/MessageDialog";

type AppointmentProps = {
    availableSlots: IAvailableSlot[];
    doctorDetails: IDoctorDetails;
};

function Appointment({ availableSlots, doctorDetails }: AppointmentProps) {
    // Controlling open/close state for appointment payment dialog
    const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] =
        useState(false);
    // Controlling open/close state for final message dialog
    const [isMsgDialogOpen, setIsMsgDialogOpen] = useState(false);
    const [appointmentData, setAppointmentData] =
        useState<IAppointmentData | null>(null);

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
            const appointmentData = {
                ...values,
                doctor_id: doctorDetails.id,
                date: formatDate(values.date, "yyyy-MM-dd"),
                doctor_name: doctorDetails.name,
                price: doctorDetails.price,
            };

            setAppointmentData(appointmentData);
            setIsAppointmentDialogOpen(true);
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
                <button
                    className="cursor-pointer text-primary-100 border-1 rounded-sm py-2 px-6 border-primary-100 hover:text-white hover:bg-primary-100 transition-all disabled:text-secondary-300 disabled:border-secondary-300 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                    disabled={!schedule}
                    type="submit"
                >
                    Book
                </button>

                {isAppointmentDialogOpen && appointmentData && (
                    <PaymentDialog
                        doctorDetails={doctorDetails}
                        schedule={schedule}
                        open={isAppointmentDialogOpen}
                        onCheckoutOpenChange={setIsAppointmentDialogOpen}
                        onMsgDialogOpenChange={setIsMsgDialogOpen}
                        appointmentData={appointmentData}
                        formik={formik}
                    />
                )}
                {/* END PAYMENT DIALOG */}
            </div>

            {/* Message dialog appears when appointment is successed */}
            {isMsgDialogOpen && appointmentData && (
                <MessageDialog
                    open={isMsgDialogOpen}
                    onOpenChange={setIsMsgDialogOpen}
                    appointmentData={{
                        doctorName: appointmentData.doctor_name,
                        date: appointmentData.date,
                        time: appointmentData.time,
                    }}
                />
            )}
        </form>
    );
}

export default Appointment;
