import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "date-fns";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import congratulationImg from "@/assets/images/congratulation.png";

type MessageDialogProps = {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    appointmentData: { doctorName: string; date: string; time: string };
};

function MessageDialog({
    open,
    onOpenChange,
    appointmentData,
}: MessageDialogProps) {
    const navigate = useNavigate();
    const { doctorName, date, time } = appointmentData;

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="w-80 max-w-full rounded-4xl z-[99999]">
                <AlertDialogHeader className="flex flex-col items-center">
                    <img
                        src={congratulationImg}
                        alt="congratulation"
                        className="w-30"
                    />
                    <AlertDialogTitle>Congratulations!</AlertDialogTitle>
                    <AlertDialogDescription className="text-center">{`Your appointment with Dr. ${doctorName} is confirmed for ${formatDate(
                        new Date(date),
                        "EEEE, MMMM dd"
                    )} at ${time}`}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        className="bg-primary-200 text-secondary-100 rounded-full px-8 mx-auto cursor-pointer"
                        onClick={() => navigate("/appointments")}
                    >
                        Done
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default MessageDialog;
