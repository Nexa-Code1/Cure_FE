import type { Dispatch, SetStateAction } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar1Icon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

type AppointmentCalenderProps = {
    dates: Date[] | undefined;
    setDates: Dispatch<SetStateAction<Date[] | undefined>>;
};

function AppointmentCalender({ dates, setDates }: AppointmentCalenderProps) {
    return (
        <Accordion type="single" collapsible className="absolute right-0 top-0">
            <AccordionItem value="item-1" className="flex flex-col">
                <div className="self-end flex items-center gap-2 border-1 border-secondary-200 rounded-lg px-2 md:px-4 py-1 md:py-2">
                    <Calendar1Icon className="text-secondary-300" />
                    <AccordionTrigger className="flex items-center justify-between gap-1 p-0 w-fit md:w-56">
                        <p className="text-xs md:text-sm hidden md:block">
                            Select date
                        </p>
                    </AccordionTrigger>
                </div>

                <AccordionContent className="mt-4">
                    <Calendar
                        mode="multiple"
                        selected={dates}
                        onSelect={setDates}
                        className="rounded-lg border md:w-72 overflow-y-auto shadow-xl z-10"
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default AppointmentCalender;
