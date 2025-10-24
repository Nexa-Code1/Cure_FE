import { ChevronRight } from "lucide-react";
import Toggle from "../ui/Toggle";
import { useNavigate } from "react-router-dom";
import type { ProfileItem } from "@/types";

type Props = {
    item: ProfileItem;
    onToggle: (id: string, next: boolean) => void;
};

export default function SettingsRow({ item, onToggle }: Props) {
    const Icon = item.icon;
    const isDanger = item.tone === "danger";
    const nav = useNavigate();

    return (
        <div
            role="button"
            tabIndex={0}
            className="group w-full text-left cursor-pointer"
            onClick={() => {
                if (item.type === "toggle") return;
                if (item.onClick) item.onClick();
            }}
        >
            <div className="flex items-center justify-between gap-3 py-3 sm:py-4">
                <div className="flex items-center gap-3 min-w-0">
                    <div
                        className={`flex h-10 w-10 items-center justify-center
                        ${isDanger ? "text-rose-500" : "text-zinc-700"}`}
                    >
                        <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                        <div
                            className={`text-sm sm:text-base font-medium ${
                                isDanger ? "text-rose-600" : "text-zinc-800"
                            }`}
                        >
                            {item.label}
                        </div>
                    </div>
                </div>

                {item.type === "toggle" ? (
                    <Toggle
                        checked={!!item.enabled}
                        onChange={(v) => onToggle(item.id, v)}
                    />
                ) : (
                    <ChevronRight
                        className="h-5 w-5 text-zinc-400 group-hover:text-zinc-600"
                        onClick={() => nav(`${item.href}`)}
                    />
                )}
            </div>
        </div>
    );
}
