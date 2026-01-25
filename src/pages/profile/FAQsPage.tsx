import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GoBackButton from "@/components/common/GoBackButton";

type FAQ = {
  id: number;
  question: string;
  answer: string;
  order?: number;
  status?: string;
};

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How do I book an appointment?",
    answer: "Log in, search for a doctor, pick an available slot, and confirm.",
    order: 1,
    status: "active",
  },
  {
    id: 2,
    question: "Can I cancel or reschedule?",
    answer:
      "Yes. From My Appointments you can cancel or reschedule within policy limits.",
    order: 2,
    status: "active",
  },
  {
    id: 3,
    question: "What payment methods are supported?",
    answer:
      "We support secure online payments via trusted gateways. Details appear before confirmation.",
    order: 3,
    status: "active",
  },
  {
    id: 4,
    question: "Is my data secure?",
    answer:
      "Yes. We follow industry best practices and our Privacy Policy to protect your data.",
    order: 4,
    status: "active",
  },
];

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full">
        <div className="flex items-center gap-2 py-3 md:py-4">
          <GoBackButton />
          <h1 className="mx-auto font-semibold text-zinc-900 text-xl">FAQs</h1>
        </div>

        <Accordion
          type="single"
          collapsible
          className="space-y-3 sm:space-y-4 md:space-y-5"
        >
          {faqs.map((item) => (
            <AccordionItem
              key={item.id}
              value={`faq-${item.id}`}
              className="border-0"
            >
              <div className="rounded-2xl bg-zinc-100 p-3 sm:p-4 md:p-6 shadow-sm">
                <AccordionTrigger
                  className="
                      flex cursor-pointer w-full items-center justify-between
                      p-0 hover:no-underline
                      text-base sm:text-lg text-zinc-900
                      [&>svg]:h-5 [&>svg]:w-5 sm:[&>svg]:h-6 sm:[&>svg]:w-6
                      min-h-[44px]
                    "
                >
                  <span className="truncate">{item.question}</span>
                </AccordionTrigger>

                <AccordionContent className="p-0">
                  <div
                    className="
                        mt-3 sm:mt-4 md:mt-6
                        border-t border-zinc-200
                        pt-3 sm:pt-4 md:pt-6
                        text-sm sm:text-[15px] md:text-base
                        leading-6 sm:leading-7 text-zinc-600
                      "
                  >
                    {item.answer}
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
