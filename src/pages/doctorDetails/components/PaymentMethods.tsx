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
    );
}

export default PaymentMethods;
