import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
    {
        id: 1,
        question: "Is it safe to book online?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
        id: 2,
        question: "Is the app free to use?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
        id: 3,
        question: "How can I find a doctor?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
        id: 4,
        question: "Can I cancel my appointment?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
        id: 5,
        question: "What payment are supported?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
        id: 6,
        question: "How do I edit my profile?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
];

export default function FAQ() {
    return (
        <>
            <div className="w-full md:w-[60%] mx-auto mb-10">
                <div className="text-sm md:text-lg py-1 px-5 text-primary bg-primary/10 rounded-full w-fit mx-auto">
                    Frequently Asked Questions
                </div>
                <h2 className="md:text-3xl text-xl font-semibold text-center mt-4 mb-10">
                    Got Questions ? We’ve got Answers!
                </h2>

                <Accordion type="single" collapsible>
                    {faqData.map((item) => (
                        <AccordionItem
                            value={`item-${item.id}`}
                            key={item.id}
                            className="bg-secondary-100 mb-2 px-5 border-none rounded-md"
                        >
                            <AccordionTrigger className="text-sm md:text-lg font-medium cursor-pointer">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm cursor-pointer">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </>
    );
}
