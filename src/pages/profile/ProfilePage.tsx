import { useEffect, useMemo, useState } from "react";
import {
    ClipboardClock,
    CreditCard,
    Heart,
    HelpCircle,
    LogOut,
    Settings as SettingsIcon,
    Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProfileHeader from "../../components/profile/ProfileHeader";
import SettingsRow from "../../components/profile/SettingsRow";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { handleLogout } from "@/api/auth/auth";
import type { ProfileItem } from "@/types";
import { useUserContext } from "@/context/user-context";

export default function ProfileScreen() {
    const navigate = useNavigate();
    const { setUser } = useUserContext();
    const [logoutOpen, setLogoutOpen] = useState(false);
    const [data, setData] = useState<ProfileItem[]>([]);

    const handleToggle = (id: string, next: boolean) => {
        setData((prev) =>
            prev.map((it) => (it.id === id ? { ...it, enabled: next } : it))
        );
    };

    const logoutHandler = async () => {
        try {
            await handleLogout();
            setUser(null);
            navigate("/sign-in");
        } catch (e) {
            console.error(e);
        } finally {
            localStorage.removeItem("token");
            navigate("/sign-in", { replace: true });
        }
    };

    const items = useMemo<ProfileItem[]>(
        () => [
            {
                id: "payment",
                label: "Payment Method",
                icon: CreditCard,
                type: "link",
                href: "/payment-list",
            },
            {
                id: "appointments",
                label: "My appointments",
                icon: ClipboardClock,
                type: "link",
                href: "/appointments",
            },
            {
                id: "favorites",
                label: "Favorite",
                icon: Heart,
                type: "link",
                href: "/favourite",
            },
            {
                id: "settings",
                label: "Settings",
                icon: SettingsIcon,
                type: "link",
                href: "/settings",
            },
            {
                id: "faqs",
                label: "FAQs",
                icon: HelpCircle,
                type: "link",
                href: "/faqs",
            },
            {
                id: "privacy",
                label: "Privacy Policy",
                icon: Shield,
                type: "link",
                href: "/privacy",
            },
            {
                id: "logout",
                label: "Log out",
                icon: LogOut,
                type: "link",
                tone: "danger",
                onClick: () => setLogoutOpen(true),
                href: "",
            },
        ],
        []
    );

    useEffect(() => setData(items), [items]);

    return (
        <div className="min-h-screen bg-zinc-50 py-4 sm:py-8">
            <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-4 px-3 sm:px-6 lg:grid-cols-3 lg:gap-6">
                <div className="lg:col-span-1">
                    <ProfileHeader />
                </div>

                <div className="lg:col-span-2">
                    <ul className="mx-auto px-3 space-y-3">
                        {data.map((item) => (
                            <li
                                key={item.id}
                                className="rounded-2xl bg-zinc-100 px-4 py-3"
                            >
                                <SettingsRow
                                    item={item}
                                    onToggle={handleToggle}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
                <DialogContent className="rounded-2xl p-0 sm:max-w-md">
                    <DialogHeader className="px-4 pt-4 pb-2 sm:px-6">
                        <DialogTitle className="text-center text-lg font-semibold">
                            Logout
                        </DialogTitle>
                    </DialogHeader>

                    <div className="mx-4 sm:mx-6 h-px bg-zinc-200" />

                    <DialogDescription className="px-4 py-4 text-center text-[15px] text-zinc-600 sm:px-6">
                        Are you sure you want to log out?
                    </DialogDescription>

                    <div className="px-4 pb-4 sm:px-6">
                        <div className="grid grid-cols-2 gap-3">
                            <DialogClose asChild>
                                <button
                                    type="button"
                                    className="w-full rounded-xl bg-zinc-200 px-4 py-3 text-sm font-medium text-zinc-800 hover:bg-zinc-300"
                                >
                                    Cancel
                                </button>
                            </DialogClose>

                            <button
                                type="button"
                                onClick={logoutHandler}
                                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
