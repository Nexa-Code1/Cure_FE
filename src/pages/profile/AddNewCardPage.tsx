import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import card from "@/assets/images/blue gradient.png";
import NewCardForm from "./NewCardForm";
import { createSetupIntent } from "@/api/payment/payment";
import { Loader } from "@/components/common/Loader";
import GoBackButton from "@/components/common/GoBackButton";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function AddNewCardPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const options = { clientSecret };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await createSetupIntent();
        setClientSecret(res.clientSecret);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full">
        <div className="flex items-center gap-2 py-3 sm:py-4">
          <GoBackButton />
          <h1 className="mx-auto text-lg sm:text-xl font-semibold text-zinc-900">
            Add New Card
          </h1>
        </div>

        <div className="mt-1 mb-4 max-w-sm mx-auto">
          <img
            src={card}
            alt="Card preview"
            className="w-full rounded-2xl shadow"
          />
        </div>

        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <NewCardForm />
          </Elements>
        )}
      </div>
    </div>
  );
}
