import { useNavigate } from "react-router-dom";
import type { ProfileItem } from "@/types";
import { ChevronRight } from "lucide-react";

type Props = {
  item: ProfileItem;
};

export default function SettingsRow({ item }: Props) {
  const Icon = item.icon;
  const isDanger = item.tone === "danger";
  const nav = useNavigate();

  return (
    <button
      type="button"
      tabIndex={0}
      className="group w-full text-left cursor-pointer"
      onClick={() => {
        if (item.href) nav(`${item.href}`);
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
          <div className="min-w-0 flex items-center justify-between">
            <div
              className={`text-sm sm:text-base font-medium ${
                isDanger ? "text-rose-600" : "text-zinc-800"
              }`}
            >
              {item.label}
            </div>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-zinc-400" />
      </div>
    </button>
  );
}
