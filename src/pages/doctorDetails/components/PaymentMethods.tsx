<<<<<<< HEAD
import { useEffect, useState } from "react";
import type { PaymentMethod } from "@stripe/stripe-js";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { PaymentCard } from "@/types";
import { getPaymentMethods } from "@/api/profile/profile";
import { brandLogoSrc } from "@/lib/utils";
import { Loader } from "@/components/common/Loader";

function PaymentMethods() {
    const [cards, setCards] = useState<PaymentCard[]>([]);
    const [isLoadingMethods, setIsLoadingMethods] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoadingMethods(true);
                const res = await getPaymentMethods();
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

    if (isLoadingMethods) return <Loader />;

    return (
        <div className="flex-1">
            <h2 className="font-medium text-lg text-primary-200">
                Payment Method
            </h2>
            <RadioGroup name="paymentMethod" className="my-4">
                {cards.map((card) => (
                    <div className="flex items-center gap-2" key={card.id}>
                        <RadioGroupItem value={card.id} id={card.id} />
                        <Label htmlFor={card.id} className="flex-1">
                            <img
                                src={brandLogoSrc(card.brand)}
                                alt={card.brand}
                                className="h-8 w-auto"
                            />
                            <span className="text-sm truncate text-secondary-500">
                                Exp. date{" "}
                                {card.expMonth.toString().padStart(2, "0")}/
                                {card.expYear}
                            </span>
                            <span className="font-semibold flex-1">
                                •••• {card.last4}
                            </span>
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
=======
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import creditCardImg from "@/assets/images/credit-card.png";
import payPalImg from "@/assets/images/pay-pal.png";
import applePayImg from "@/assets/images/apple-pay.png";
import { Button } from "@/components/ui/button";

const paymentMethods = [
    {
        id: "credit-card",
        title: "Credit Cart",
        imgSrc: creditCardImg,
    },
    {
        id: "pay-pal",
        title: "PayPal",
        imgSrc: payPalImg,
    },
    {
        id: "apple-pay",
        title: "Apple Pay",
        imgSrc: applePayImg,
    },
];

function PaymentMethods() {
    return (
        <>
            <RadioGroup name="paymentMethod" className="my-4">
                {paymentMethods.map((method) => (
                    <div className="flex items-center gap-2" key={method.id}>
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id} className="flex-1">
                            {method.title}
                        </Label>
                        <img
                            src={method.imgSrc}
                            alt={method.title}
                            className="w-8"
                        />
                    </div>
                ))}
            </RadioGroup>

            <Button
                className="w-full border-1 border-dashed border-primary-100 text-primary-100 cursor-pointer hover:text-primary-100"
                variant="outline"
            >
                + Add new card
            </Button>
        </>
>>>>>>> 23e2e2ee391a9ca1041c75b9ae3820bc9df92399
    );
}

export default PaymentMethods;
