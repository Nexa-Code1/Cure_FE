import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import type { FormikProps } from "formik";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import DoctorHeader from "./DoctorHeader";
import type {
    IAppointmentData,
    IAppointmentValues,
    IDoctorDetails,
} from "@/types";
import { Button } from "@/components/ui/button";
import ScheduleLabel from "../../../components/common/ScheduleLabel";
import { createBookingIntent } from "@/api/appointments/appointments";
import { Loader } from "@/components/common/Loader";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

type PaymentDialogProps = {
    doctorDetails: IDoctorDetails;
    schedule: string | null;
    open: boolean;
    onCheckoutOpenChange: Dispatch<SetStateAction<boolean>>;
    onMsgDialogOpenChange: Dispatch<SetStateAction<boolean>>;
    appointmentData: IAppointmentData;
    formik: FormikProps<IAppointmentValues>;
};

function PaymentDialog({
    doctorDetails,
    schedule,
    open,
    onCheckoutOpenChange,
    onMsgDialogOpenChange,
    appointmentData,
    formik,
}: PaymentDialogProps) {
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await createBookingIntent(doctorDetails.id, {
                    amount: Math.round(doctorDetails.price * 100),
                    currency: "egp",
                    automatic_payment_methods: {
                        enabled: true,
                    },
                });
                setClientSecret(res.paymentIntent.client_secret);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    if (!clientSecret) return;

    const options = { clientSecret };

    return (
        <Sheet open={open} onOpenChange={onCheckoutOpenChange}>
            <SheetContent
                className="w-[400px] max-w-full sm:w-[540px] z-9999 overflow-y-auto"
                aria-describedby="Paying form for an appointment"
            >
                <SheetHeader>
                    <SheetTitle className="mt-4">
                        <DoctorHeader doctor={doctorDetails} />
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-1 flex-col gap-4 px-4 pb-4">
                    <div className="flex items-center gap-6">
                        <ScheduleLabel>{schedule}</ScheduleLabel>
                        <SheetClose asChild>
                            <Button
                                variant="ghost"
                                className="text-primary-100 cursor-pointer hover:bg-transparent p-0"
                            >
                                Reschedule
                            </Button>
                        </SheetClose>
                    </div>

                    {isLoading ? (
                        <Loader />
                    ) : (
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm
                                appointmentData={appointmentData}
                                onCheckoutOpenChange={onCheckoutOpenChange}
                                onMsgDialogOpenChange={onMsgDialogOpenChange}
                                formik={formik}
                            />
                        </Elements>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default PaymentDialog;
