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
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        type="submit"
        className="w-full mt-4 py-6 rounded-xl"
        disabled={isLoading}
      >
        {isLoading ? <Loader size="sm" /> : "Add Payment Method"}
      </Button>
    </form>
  );
}

export default NewCardForm;
