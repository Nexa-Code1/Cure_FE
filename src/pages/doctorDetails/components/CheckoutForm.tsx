import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import {
    useState,
    type Dispatch,
    type FormEvent,
    type SetStateAction,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import type { FormikProps } from "formik";

import DoctorPricing from "./DoctorPricing";
import { Button } from "@/components/ui/button";
import type { IAppointmentData, IAppointmentValues } from "@/types";
import {
    createBookingIntent,
    createDoctorAppointment,
} from "@/api/appointments/appointments";
import PaymentMethods from "./PaymentMethods";
import { useUserContext } from "@/context/user-context";

type CheckoutFormProps = {
    appointmentData: IAppointmentData;
    onCheckoutOpenChange: Dispatch<SetStateAction<boolean>>;
    onMsgDialogOpenChange: Dispatch<SetStateAction<boolean>>;
    formik: FormikProps<IAppointmentValues>;
};

function CheckoutForm({
    appointmentData,
    onCheckoutOpenChange,
    onMsgDialogOpenChange,
    formik,
}: CheckoutFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isAddingNewCard, setIsAddingNewCard] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<string>("");
    const { user } = useUserContext();
    const stripe = useStripe();
    const elements = useElements();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            if (!stripe || !elements) return;

            setIsLoading(true);
            // if user selected saved card
            if (!isAddingNewCard && !selectedCardId) {
                throw new Error("Please select payment method or add new one.");
            } else if (selectedCardId) {
                const res = await createBookingIntent(
                    appointmentData.doctor_id,
                    {
                        amount: Math.round(appointmentData.price * 100),
                        currency: "egp",
                        customer: user?.customer_id,
                        payment_method: selectedCardId,
                        off_session: true,
                        confirm: true,
                    }
                );
                await createDoctorAppointment(
                    appointmentData,
                    res.paymentIntent.id
                );
            } else {
                const { error, paymentIntent } = await stripe.confirmPayment({
                    elements,
                    redirect: "if_required",
                });
                if (error) {
                    return toast.error(error.message as string);
                } else
                    await createDoctorAppointment(
                        appointmentData,
                        paymentIntent.id
                    );
            }

            formik.resetForm();
            onMsgDialogOpenChange(true);
            onCheckoutOpenChange(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(
                    "An unexpected error occurred. Cannot make an appointment."
                );
            }
        } finally {
            setIsLoading(false);
        }
    }

    function handleAddNewCard() {
        setIsAddingNewCard((prev) => {
            if (!prev) setSelectedCardId("");
            return !prev;
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentMethods
                selectedCardId={selectedCardId}
                onSelectCard={setSelectedCardId}
                isAddingNewCard={isAddingNewCard}
            />
            <Button
                className="w-full border-dashed border-primary-100 text-primary-100 cursor-pointer hover:text-primary-100 mb-4"
                variant="outline"
                type="button"
                onClick={handleAddNewCard}
            >
                {isAddingNewCard ? "Cancel" : "+ Add new card"}
            </Button>

            {isAddingNewCard && <PaymentElement />}

            <DoctorPricing
                pricePerHour={appointmentData.price}
                buttonLabel="Pay"
            />
            <Button
                className="w-full cursor-pointer"
                type="submit"
                disabled={isLoading || (!isAddingNewCard && !selectedCardId)}
            >
                {isLoading ? "loading..." : "Pay"}
            </Button>
        </form>
    );
}

export default CheckoutForm;
