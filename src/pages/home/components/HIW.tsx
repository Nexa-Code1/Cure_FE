import image1 from "../../../assets/images/Search.png";
import image2 from "../../../assets/images/Calender.png";
import image3 from "../../../assets/images/Pay.png";
import { Card, CardContent } from "@/components/ui/card";

interface CardProps {
  id: number;
  title: string;
  description: string;
  image: string;
}

const cards: CardProps[] = [
  {
    id: 1,
    title: "Search for a Doctor",
    description:
      "Easily browse by specialty, location, or doctor name to find the right healthcare provider for your needs.",
    image: image1,
  },
  {
    id: 2,
    title: "Choose a Date & Time",
    description:
      "View real-time availability and pick a slot that works best for your schedule.",
    image: image2,
  },
  {
    id: 3,
    title: "Book & Pay Online",
    description:
      "Confirm your appointment and pay securely using various payment options—credit card, mobile wallet.",
    image: image3,
  },
];

export default function HIW() {
  return (
    <>
      <div className="w-full lg:w-[80%] z-40 mx-auto">
        <h1 className="text-2xl font-semibold text-center my-6">
          How it works
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="p-0 rounded-4xl overflow-hidden border border-black/40 z-40"
            >
              <CardContent className="p-0 bg-secondary/10 flex flex-col items-center justify-center">
                <div className="w-72 h-40 flex justify-center pb-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="object-contain"
                  />
                </div>
                <div className="p-4 bg-white rounded-t-xl border-t">
                  <h2 className="text-md font-medium">{card.title}</h2>
                  <p className="text-sm line-clamp-2 text-secondary-400">
                    {card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
