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
import { createDoctorAppointment } from "@/api/appointments/appointments";
import PaymentMethods from "./PaymentMethods";
import { useNavigate } from "react-router-dom";

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
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            if (!stripe || !elements) return;

            setIsLoading(true);
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: "if_required",
            });

            if (error) {
                toast.error(error.message as string);
            } else {
                const res = await createDoctorAppointment(
                    appointmentData,
                    paymentIntent.id
                );
                console.log(res);
                formik.resetForm();
                onMsgDialogOpenChange(true);
                navigate("/appointments");
            }
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
            onCheckoutOpenChange(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentMethods />
            <Button
                className="w-full border-1 border-dashed border-primary-100 text-primary-100 cursor-pointer hover:text-primary-100 mb-4"
                variant="outline"
                type="button"
                onClick={() => setIsAddingNewCard((prev) => !prev)}
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
                disabled={isLoading}
            >
                {isLoading ? "loading..." : "Pay"}
            </Button>
        </form>
    );
}

export default CheckoutForm;
