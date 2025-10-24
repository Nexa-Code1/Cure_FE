import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import nothingImg from "@/assets/images/no-cards.png";
import { getPaymentMethods, removePaymentMethod } from "@/api/profile/profile";
import type { PaymentCard } from "@/types";
import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import CancelConfirmationModal from "@/components/common/CancelConfirmationModal";
import type { PaymentMethod } from "@stripe/stripe-js";
import { brandLogoSrc } from "@/lib/utils";

type Props = {
    emptyImageSrc?: string;
    cards?: PaymentCard[];
};

export default function PaymentListPage({ cards: initialCards }: Props) {
    const navigate = useNavigate();
    const [isLoadingMethods, setIsLoadingMethods] = useState(false);
    const [isLoadingDeletingMethod, setIsLoadingDeletingMethod] =
        useState(false);
    const [cards, setCards] = useState<PaymentCard[]>(initialCards ?? []);

    const hasCards = cards.length > 0;

    useEffect(() => {
        (async () => {
            try {
                setIsLoadingMethods(true);
                const res = await getPaymentMethods();
                console.log(res);
                const newData = res.data.map((item: PaymentMethod) => ({
                    id: item.id,
                    brand: item.card?.brand,
                    expMonth: item.card?.exp_month,
                    expYear: item.card?.exp_year,
                    last4: item.card?.last4,
                }));

                setCards(newData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingMethods(false);
            }
        })();
    }, []);

    async function handleDeletePaymentMethod(id: string) {
        try {
            setIsLoadingDeletingMethod(true);
            const res = await removePaymentMethod(id);

            if (res)
                setCards((prevCards) =>
                    prevCards.filter((card) => card.id !== id)
                );
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingDeletingMethod(false);
        }
    }

    if (isLoadingMethods)
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
                        onClick={() => navigate(-1)}
                        aria-label="Back"
                        className="-ml-2 rounded-full p-2 hover:bg-zinc-100"
                    >
                        <ChevronLeft className="h-5 w-5 text-zinc-700" />
                    </button>
                    <h1 className="mx-auto text-lg sm:text-xl font-semibold text-zinc-900">
                        Payment Method
                    </h1>
                    <div className="w-9" />
                </div>

                {!hasCards && (
                    <div className="mt-8 flex flex-col items-center text-center">
                        <img
                            src={nothingImg}
                            alt="No cards"
                            className="h-80 w-auto select-none"
                        />
                    </div>
                )}

                {hasCards && (
                    <div className="mt-2 space-y-3 sm:space-y-4">
                        {cards.map((card) => {
                            return (
                                <div
                                    key={card.id}
                                    className="min-w-0 w-full rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-3 sm:px-4 sm:py-3.5 flex items-center gap-3 hover:bg-zinc-200/60 transition-colors"
                                    aria-label={`${card.brand} ${card.last4}`}
                                >
                                    <img
                                        src={brandLogoSrc(card.brand)}
                                        alt={card.brand}
                                        className="h-8 w-auto"
                                    />
                                    <span className="text-sm truncate text-secondary-500">
                                        Exp. date{" "}
                                        {card.expMonth
                                            .toString()
                                            .padStart(2, "0")}
                                        /{card.expYear}
                                    </span>
                                    <span className="font-semibold flex-1">
                                        •••• {card.last4}
                                    </span>
                                    <CancelConfirmationModal
                                        onConfirm={() =>
                                            handleDeletePaymentMethod(card.id)
                                        }
                                        isCanceling={isLoadingDeletingMethod}
                                        message="This action cannot be undone. This will permanently delete this payment method."
                                    >
                                        <Button
                                            variant="ghost"
                                            className="text-error-500 hover:bg-transparent focus:bg-transparent"
                                            disabled={isLoadingDeletingMethod}
                                        >
                                            {isLoadingDeletingMethod
                                                ? "Deleting..."
                                                : "Delete"}
                                        </Button>
                                    </CancelConfirmationModal>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="sticky bottom-0 left-0 right-0 bg-white/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md mt-20">
                    <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg px-3 sm:px-4 md:px-6 py-3">
                        <button
                            type="button"
                            onClick={() => navigate("/add-card")}
                            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-md hover:bg-blue-700"
                        >
                            + Add Card
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
