import { Alert, AlertTitle } from "../ui/alert";
import errorIcon from "@/assets/images/error.svg";

type AlertMsgProps = {
    message: string;
    className?: string;
};

function AlertMsg({ message, className }: AlertMsgProps) {
    return (
        <Alert
            variant="destructive"
            className={`min-h-screen border-0 p-0 text-error-500 flex flex-col items-center justify-center gap-4 ${className}`}
        >
            <img src={errorIcon} alt="error icon" className="w-12 h-12" />
            <AlertTitle className="text-4xl font-bold">Opps..</AlertTitle>
            <p className="text-lg font-semibold">{message}</p>
        </Alert>
    );
}

export default AlertMsg;
