import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { formatDate } from "date-fns";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AppointmentDate from "@/pages/doctorDetails/components/AppointmentDate";
import type { IAppointmentValues, IDoctorDetails } from "@/types";
import { getDoctorDetails } from "@/api/doctors/doctors";
import AppointmentTime from "@/pages/doctorDetails/components/AppointmentTime";
import { updateDoctorAppointment } from "@/api/appointments/appointments";

type UpdateAppointmentModalProps = {
    doctorId: string;
    appointmentId: string;
    onUpdateAppointment: Dispatch<
        SetStateAction<{ day: string; slot: string }>
    >;
};

function UpdateAppointmentModal({
    doctorId,
    appointmentId,
    onUpdateAppointment,
}: UpdateAppointmentModalProps) {
    const [doctor, setDoctor] = useState<IDoctorDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await getDoctorDetails(doctorId.toString());
                setDoctor(res);
            } catch {
                toast.error(
                    "Something went wrong. Cannot get doctor available appointments"
                );
            }
        })();
    }, [isLoading]);

    const formik = useFormik({
        // INITIAL VALUES
        initialValues: {
            date: "",
            time: "",
            doctor_id: doctorId,
        },

        // YUP VALIDATION
        validationSchema: Yup.object({
            date: Yup.string().required("Required"),
            time: Yup.string().required("Required"),
        }),

        // SUBMIT APPOINTMENT FORM
        onSubmit: async (values: IAppointmentValues) => {
            try {
                setIsLoading(true);
                await updateDoctorAppointment(
                    {
                        date: formatDate(values.date, "yyyy-MM-dd"),
                        time: values.time,
                        doctor_id: doctorId,
                    },
                    appointmentId
                );
                toast.success("Appointment updated successfully");
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong. Cannot update appointment");
            } finally {
                setIsLoading(false);
                setIsDialogOpen(false);
                formik.resetForm();
                onUpdateAppointment({ day: values.date, slot: values.time });
            }
        },
    });

    if (!doctor) return;

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="flex-1">Reschedule</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-10/12">
                <form onSubmit={formik.handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Update appointment</DialogTitle>
                        <DialogDescription>
                            Make changes to your appointment date & time here.
                            Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 mb-6">
                        <AppointmentDate
                            formik={formik}
                            availableSlots={doctor?.available_slots}
                        />

                        <AppointmentTime
                            formik={formik}
                            availableSlots={doctor?.available_slots}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={
                                !formik.values.date ||
                                !formik.values.time ||
                                isLoading
                            }
                        >
                            {isLoading ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateAppointmentModal;
