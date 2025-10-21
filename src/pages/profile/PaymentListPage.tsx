import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import nothingImg from "@/assets/images/no-cards.png";

type CardBrand = "visa" | "mastercard";

type PaymentCard = {
    id: string;
    brand: CardBrand;
    label: string;
    last4: string;
    masked?: string;
    isDefault?: boolean;
};

type Props = {
    emptyImageSrc?: string;
    cards?: PaymentCard[];
};

const brandLogoSrc = (brand: CardBrand) => {
    switch (brand) {
        case "visa":
            return "/visa.png";
        case "mastercard":
            return "/mastercard.png";
    }
};

const mask = (label: string, last4: string) => {
    return `${label} •••• ${last4}`;
};

export default function PaymentListPage({
    cards: initialCards,
}: Props) {
    const navigate = useNavigate();

    const [cards, setCards] = React.useState<PaymentCard[]>(
        initialCards ?? [
        ]
    );

    const [selected, setSelected] = React.useState<string | null>(
        cards.find((c) => c.isDefault)?.id ?? null
    );

    const Radio = ({ checked }: { checked: boolean }) => (
        <span
            className={`h-5 w-5 rounded-full border grid place-items-center ${checked ? "border-blue-600" : "border-zinc-300"
                }`}
            aria-hidden
        >
            <span
                className={`h-2.5 w-2.5 rounded-full ${checked ? "bg-blue-600" : "bg-transparent"
                    }`}
            />
        </span>
    );

    const hasCards = cards.length > 0;
    React.useEffect(() => {
        const raw = localStorage.getItem("payment_cards");
        const arr: any[] = raw ? JSON.parse(raw) : [];
        setCards(arr);
        setSelected(arr.find((c) => c.isDefault)?.id ?? arr[0]?.id ?? null);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg px-3 sm:px-4 md:px-6">

                <div className="flex items-center gap-2 py-3 sm:py-4">
                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
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
                            const isChecked = selected === card.id;
                            return (
                                <button
                                    key={card.id}
                                    type="button"
                                    onClick={() => setSelected(card.id)}
                                    className="w-full rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-3 sm:px-4 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-zinc-200/60 transition-colors"
                                    aria-label={`${card.label} ${card.last4}`}
                                >
                                    <span className="flex items-center gap-3 min-w-0">
                                        <img
                                            src={brandLogoSrc(card.brand)}
                                            alt={card.brand}
                                            className="h-8 w-auto"
                                        />
                                        <span className="text-sm sm:text-base text-zinc-800 truncate">
                                            {card.masked ?? mask(card.label, card.last4)}
                                        </span>
                                    </span>
                                    <Radio checked={isChecked} />
                                </button>
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
