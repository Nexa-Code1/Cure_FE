// src/pages/FAQsPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { handleGetFAQ } from "@/api/FAQ/FAQ";

type FAQ = {
    id: number;
    question: string;
    answer: string;
    order?: number;
    status?: string;
};

export default function FAQsPage() {
    const nav = useNavigate();

    const [faqs, setFaqs] = React.useState<FAQ[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await handleGetFAQ();
            const sorted = Array.isArray(data)
                ? [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                : [];
            setFaqs(sorted);
            setLoading(false);
        })();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div
                className="
          mx-auto w-full
          max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl
          px-3 sm:px-4 md:px-6
        "
            >
                <div className="flex items-center gap-2 py-3 md:py-4">
                    <button
                        type="button"
                        className="-ml-2 rounded-full p-2 hover:bg-zinc-100"
                        aria-label="Back"
                        onClick={() => nav(-1)}
                    >
                        <ChevronLeft className="h-5 w-5 text-zinc-700 sm:h-6 sm:w-6" />
                    </button>

                    <h1
                        className="
              mx-auto font-semibold text-zinc-900
              text-lg sm:text-xl md:text-2xl
            "
                    >
                        FAQs
                    </h1>

                    <div className="w-9 sm:w-10" />
                </div>

                {loading && (
                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-16 sm:h-18 md:h-20 rounded-2xl bg-zinc-100 animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {!loading && faqs.length === 0 && (
                    <p className="text-sm sm:text-base text-zinc-600">
                        No FAQs available right now.
                    </p>
                )}

                {!loading && faqs.length > 0 && (
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
                                <div className="rounded-2xl bg-zinc-100 p-3 sm:p-4 md:p-5 shadow-sm">
                                    <AccordionTrigger
                                        className="
                      flex w-full items-center justify-between
                      p-0 hover:no-underline
                      text-base sm:text-lg font-semibold text-zinc-900
                      [&>svg]:h-5 [&>svg]:w-5 sm:[&>svg]:h-6 sm:[&>svg]:w-6
                      min-h-[44px]
                    "
                                    >
                                        <span className="truncate">
                                            {item.question}
                                        </span>
                                    </AccordionTrigger>

                                    <AccordionContent className="p-0">
                                        <div
                                            className="
                        mt-3 sm:mt-4
                        border-t border-zinc-200
                        pt-3 sm:pt-4
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
                )}
            </div>
        </div>
    );
}
