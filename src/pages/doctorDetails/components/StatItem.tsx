import type { LucideIcon } from "lucide-react";

type StatItemProps = {
    Icon: LucideIcon;
    value: string | number;
    label: string;
};

function StatItem({ Icon, value, label }: StatItemProps) {
    return (
        <div className="flex flex-col items-center gap-1">
            <Icon
                className="fill-primary-200 text-white mb-2 rounded-full bg-white p-2"
                size={40}
                strokeWidth={1.2}
            />
            <p className="text-secondary-600 font-semibold text-sm sm:text-base">
                {value}
            </p>
            <p className="text-secondary-400 text-sm sm:text-base">{label}</p>
        </div>
    );
}

export default StatItem;
