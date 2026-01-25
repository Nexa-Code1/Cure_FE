import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { addPaymentMethod } from "@/api/payment/payment";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/Loader";

function NewCardForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (!stripe || !elements) return;

      const { setupIntent, error } = await stripe.confirmSetup({
        elements,
        confirmParams: {},
        redirect: "if_required", // stay on page
      });

      if (error || !setupIntent) {
        console.error(error.message);
      } else if (setupIntent.status === "succeeded") {
        const res = await addPaymentMethod(
          setupIntent.payment_method as string
        );

        if (res) navigate("/payment-list");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <PaymentElement className="w-full max-w-lg"/>
      <Button
        type="submit"
        className="self-center w-full max-w-lg cursor-pointer mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? <Loader size="sm" /> : "Add Payment Method"}
      </Button>
    </form>
  );
}

export default NewCardForm;
