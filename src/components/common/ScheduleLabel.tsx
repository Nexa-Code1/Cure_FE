import { Calendar1Icon } from "lucide-react";
import type { ReactNode } from "react";

type ScheduleLabelProps = {
    children: ReactNode;
    iconStyle?: string;
    textStyle?: string;
};

function ScheduleLabel({
    children,
    iconStyle = "text-primary-100",
    textStyle = "text-sm text-secondary-500",
}: ScheduleLabelProps) {
    return (
        <div className="flex items-center gap-1">
            <Calendar1Icon className={iconStyle} size={18} />
            <p className={`flex-1 ${textStyle}`}>{children}</p>
        </div>
    );
}

export default ScheduleLabel;
