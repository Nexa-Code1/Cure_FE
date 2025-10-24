import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Wallet = "apple" | "paypal" | null;

type RowProps = {
    logo: React.ReactNode;
    label: string;
    onClick?: () => void;
    showChevron?: boolean;
    rightAdornment?: React.ReactNode;
};

function Row({ logo, label, onClick, showChevron, rightAdornment }: RowProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-3 sm:px-4 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-zinc-200/60 transition-colors"
            aria-label={label}
        >
            <span className="flex items-center gap-3 min-w-0">
                {logo}
                <span className="text-sm sm:text-base text-zinc-800 truncate">{label}</span>
            </span>
            {rightAdornment ? (
                rightAdornment
            ) : showChevron ? (
                <ChevronRight className="h-5 w-5 text-zinc-400 shrink-0" />
            ) : null}
        </button>
    );
}

export default function PaymentMethodPage() {
    const navigate = useNavigate();
    const [selectedWallet, setSelectedWallet] = React.useState<Wallet>(null);

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


                <section className="mt-2">
                    <h2 className="mb-2 sm:mb-3 text-sm sm:text-base font-semibold text-zinc-900">
                        Credit / Debit Card
                    </h2>
                    <div className="space-y-3 sm:space-y-4">
                        <Row
                            logo={<img src="/visa.png" alt="Visa" className="h-8 w-auto" />}
                            label="VISA"
                            showChevron
                            onClick={() => navigate("/payment-list")}
                        />
                        <Row
                            logo={<img src="/mastercard.png" alt="MasterCard" className="h-8 w-auto" />}
                            label="MasterCard"
                            showChevron
                            onClick={() => navigate("/payment-list")}
                        />
                    </div>
                </section>


                <section className="mt-6 sm:mt-8">
                    <h2 className="mb-2 sm:mb-3 text-sm sm:text-base font-semibold text-zinc-900">
                        Mobile Wallets
                    </h2>
                    <div className="space-y-3 sm:space-y-4">
                        <Row
                            logo={<img src="/apple pay.png" alt="Apple Pay" className="h-8 w-auto" />}
                            label="Apple Pay"
                            onClick={() => setSelectedWallet("apple")}
                            rightAdornment={<Radio checked={selectedWallet === "apple"} />}
                        />
                        <Row
                            logo={<img src="/paypal.png" alt="PayPal" className="h-8 w-auto" />}
                            label="PayPal"
                            onClick={() => setSelectedWallet("paypal")}
                            rightAdornment={<Radio checked={selectedWallet === "paypal"} />}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
