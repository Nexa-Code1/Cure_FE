import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { PaymentMethod } from "@stripe/stripe-js";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { PaymentCard } from "@/types";
import { getPaymentMethods } from "@/api/payment/payment";
import { brandLogoSrc } from "@/lib/utils";
import { Loader } from "@/components/common/Loader";

type PaymentMethodsProps = {
  selectedCardId: string;
  onSelectCard: Dispatch<SetStateAction<string>>;
  isAddingNewCard: boolean;
};

function PaymentMethods({
  selectedCardId,
  onSelectCard,
  isAddingNewCard,
}: PaymentMethodsProps) {
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
      <h2 className="font-medium text-lg text-primary-200">Payment Method</h2>
      <RadioGroup
        name="paymentMethod"
        className="my-4"
        value={selectedCardId}
        onValueChange={(value) => onSelectCard(value)}
        disabled={isAddingNewCard}
      >
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
                Exp. date {card.expMonth.toString().padStart(2, "0")}/
                {card.expYear}
              </span>
              <span className="font-semibold flex-1">•••• {card.last4}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default PaymentMethods;
