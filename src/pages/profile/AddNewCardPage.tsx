import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import card from "@/assets/images/blue gradient.png";
import NewCardForm from "./NewCardForm";
import { createSetupIntent } from "@/api/profile/profile";
import { Loader } from "@/components/common/Loader";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function AddNewCardPage() {
    const nav = useNavigate();
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
            <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg px-3 sm:px-4 md:px-6">
                <div className="flex items-center gap-2 py-3 sm:py-4">
                    <button
                        type="button"
                        onClick={() => nav(-1)}
                        aria-label="Back"
                        className="-ml-2 rounded-full p-2 hover:bg-zinc-100"
                    >
                        <ChevronLeft className="h-5 w-5 text-zinc-700" />
                    </button>
                    <h1 className="mx-auto text-lg sm:text-xl font-semibold text-zinc-900">
                        Add New Card
                    </h1>
                    <div className="w-9" />
                </div>

                <div className="mt-1 mb-4">
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
