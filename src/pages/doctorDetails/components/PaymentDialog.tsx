import type { Dispatch, ReactNode, SetStateAction } from "react";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import DoctorHeader from "./DoctorHeader";
import type { IDoctorDetails } from "@/types";
import { Button } from "@/components/ui/button";
import ScheduleLabel from "../../../components/common/ScheduleLabel";
import DoctorPricing from "./DoctorPricing";
import PaymentMethods from "./PaymentMethods";

type PaymentDialogProps = {
    doctorDetails: IDoctorDetails;
    schedule: string | null;
    children: ReactNode;
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
};

function PaymentDialog({
    doctorDetails,
    schedule,
    children,
    open,
    onOpenChange,
}: PaymentDialogProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            {/* children is sheet triger button */}
            {children}

            <SheetContent
                className="w-[400px] max-w-full sm:w-[540px] z-[9999]"
                aria-describedby="Paying form for an appointment"
            >
                <SheetHeader>
                    <SheetTitle className="mt-4">
                        <DoctorHeader doctor={doctorDetails} />
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-1 flex-col gap-4 px-4 pb-4">
                    <div className="flex items-center gap-6">
                        <ScheduleLabel>{schedule}</ScheduleLabel>
                        <SheetClose asChild>
                            <Button
                                variant="ghost"
                                className="text-primary-100 cursor-pointer hover:bg-transparent p-0"
                            >
                                Reschedule
                            </Button>
                        </SheetClose>
                    </div>

                    <div className="flex-1">
                        <h2 className="font-medium text-lg text-primary-200">
                            Payment Method
                        </h2>
                        <PaymentMethods />
                    </div>

                    <DoctorPricing
                        pricePerHour={doctorDetails.price}
                        buttonLabel="Pay"
                    />

                    <Button
                        className="w-full cursor-pointer"
                        type="submit"
                        form="appointmentForm"
                    >
                        Pay
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default PaymentDialog;
