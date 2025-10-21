import type { ReactNode } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type CancelConfirmationProps = {
    children: ReactNode;
    onCancelAppointment: () => void;
    isDeletingAppointment: boolean;
};

function CancelConfirmation({
    children,
    onCancelAppointment,
    isDeletingAppointment,
}: CancelConfirmationProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent className="z-9999">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this appointment.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeletingAppointment}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onCancelAppointment}
                        disabled={isDeletingAppointment}
                    >
                        {isDeletingAppointment ? "Deleting" : "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default CancelConfirmation;
