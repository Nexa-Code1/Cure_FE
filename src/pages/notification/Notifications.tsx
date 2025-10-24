import React from "react";
import nothingImg from "@/assets/images/nothing.png";
import type { INotification } from "@/types";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    CheckCircle,
    XCircle,
    MessageCircle,
    FileText,
    CalendarClock,
} from "lucide-react";
import { getNotification } from "@/api/notification/notification";

const getIcon = (name: string) => {
    switch (name) {
        case "check-circle":
            return CheckCircle;
        case "x-circle":
            return XCircle;
        case "message-circle":
            return MessageCircle;
        case "file-text":
            return FileText;
        default:
            return CalendarClock;
    }
};

const getRingCls = (color: string) => {
    switch (color) {
        case "blue":
            return "bg-blue-50 ring-blue-100 text-blue-600";
        case "green":
            return "bg-green-50 ring-green-100 text-green-600";
        case "red":
            return "bg-red-50 ring-red-100 text-red-600";
        case "purple":
            return "bg-purple-50 ring-purple-100 text-purple-600";
        default:
            return "bg-zinc-50 ring-zinc-100 text-zinc-600";
    }
};

const Notifications = () => {
    const nav = useNavigate();

    const [notifications, setNotifications] = React.useState<INotification[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await getNotification();
                setNotifications(res || []);
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-md sm:max-w-lg md:max-w-xl px-4 py-4">
                <div className="flex items-center gap-2 pb-4">
                    <button
                        type="button"
                        className="-ml-2 rounded-full p-2 hover:bg-zinc-100"
                        aria-label="Back"
                    >
                        <ChevronLeft
                            className="h-5 w-5 text-zinc-700"
                            onClick={() => nav(-1)}
                        />
                    </button>
                    <h1 className="mx-auto text-lg font-semibold text-zinc-900">
                        Notifications
                    </h1>
                    <div className="w-9" />
                </div>

                {loading ? (
                    <div className="flex min-h-[60vh] items-center justify-center">
                        <p className="text-sm text-zinc-500">Loading...</p>
                    </div>
                ) : !notifications.length ? (
                    <div className="flex min-h-[60vh] items-center justify-center">
                        <img
                            src={nothingImg}
                            alt="nothing"
                            className="h-80 w-80 object-contain opacity-80"
                        />
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="overflow-hidden ">
                            {notifications.map((n, i) => {
                                const Icon = getIcon(n.icon);
                                const ring = getRingCls(n.color);
                                return (
                                    <div
                                        key={n.id}
                                        className={`flex items-start gap-3 bg-white px-4 py-3 ${i !== notifications.length - 1
                                            ? "border-b border-zinc-200"
                                            : ""
                                            } hover:bg-gray-100`}
                                    >
                                        <div
                                            className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ring-8 ${ring}`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="truncate text-sm font-semibold text-zinc-900">
                                                    {n.title}
                                                </h3>
                                                <span className="shrink-0 text-xs text-zinc-400">
                                                    {n.created_at_formatted || "—"}
                                                </span>
                                            </div>
                                            <p className="mt-0.5 line-clamp-2 text-sm text-zinc-600">
                                                {n.message}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
