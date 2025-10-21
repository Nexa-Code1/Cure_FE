import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, KeyRound, UserX, Eye, EyeOff } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { deleteAccount } from "@/api/profile/profile";

type RowProps = {
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
    tone?: "default" | "danger";
};

function SettingsRow({ icon: Icon, label, onClick, tone = "default" }: RowProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "w-full rounded-xl border border-zinc-200 bg-zinc-100",
                "px-3 py-3 sm:px-4 sm:py-3.5",
                "flex items-center justify-between gap-3",
                "hover:bg-zinc-200/60 transition-colors",
                tone === "danger" ? "text-rose-600" : "text-zinc-800",
            ].join(" ")}
            aria-label={label}
        >
            <span className="flex items-center gap-3 min-w-0">
                <Icon className={`h-5 w-5 ${tone === "danger" ? "text-rose-600" : "text-zinc-700"}`} />
                <span className="text-sm sm:text-base truncate">{label}</span>
            </span>
            <ChevronRight className="h-5 w-5 text-zinc-400 shrink-0" />
        </button>
    );
}

export default function SettingsPage() {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);
    const [err, setErr] = React.useState<string | null>(null);

    const resetDialog = () => {
        setPassword("");
        setShow(false);
        setErr(null);
        setSubmitting(false);
    };

    async function handleDelete() {

        if (!password || password.length < 6) {
            setErr("Password is required (min 6 characters).");
            return;
        }
        try {
            setSubmitting(true);
            setErr(null);

            await deleteAccount(password)
            localStorage.removeItem("token");
            setOpen(false);
            resetDialog();
            navigate("/sign-in", { replace: true });
        } catch (e) {
            console.error(e);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl px-3 sm:px-4 md:px-6">

                <div className="flex items-center gap-2 py-3 sm:py-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        aria-label="Back"
                        className="-ml-2 rounded-full p-2 hover:bg-zinc-100"
                    >
                        <ChevronLeft className="h-5 w-5 text-zinc-700" />
                    </button>
                    <h1 className="mx-auto text-lg sm:text-xl font-semibold text-zinc-900">Settings</h1>
                    <div className="w-9" />
                </div>


                <div className="space-y-3 sm:space-y-4 mt-1">
                    <SettingsRow
                        icon={KeyRound}
                        label="Password Management"
                        onClick={() => navigate("/password-management")}
                    />

                    <SettingsRow
                        icon={UserX}
                        label="Delete Account"
                        onClick={() => setOpen(true)}
                    />
                </div>
            </div>

            <Dialog
                open={open}
                onOpenChange={(v) => {
                    setOpen(v);
                    if (!v) resetDialog();
                }}
            >
                <DialogContent className="rounded-2xl p-0 sm:max-w-md">
                    <DialogHeader className="px-4 pt-4 pb-2 sm:px-6">
                        <DialogTitle className="text-center text-lg font-semibold">
                            Delete account
                        </DialogTitle>
                    </DialogHeader>


                    <div className="mx-4 sm:mx-6 h-px bg-zinc-200" />

                    <DialogDescription className="px-4 pt-4 text-center text-[15px] text-zinc-600 sm:px-6">
                        Are you sure you want to delete your account?
                    </DialogDescription>


                    <div className="px-4 sm:px-6 pt-2">
                        <label className="mb-1 block text-sm font-medium text-zinc-900">
                            Confirm with password
                        </label>
                        <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-100 px-3">
                            <input
                                type={show ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-400"
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShow((s) => !s)}
                                className="ml-2 text-zinc-500 hover:text-zinc-700"
                                aria-label={show ? "Hide password" : "Show password"}
                            >
                                {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {err && <p className="mt-1 text-xs text-rose-600">{err}</p>}
                    </div>


                    <div className="px-4 pb-4 sm:px-6 pt-3">
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
                                onClick={handleDelete}
                                disabled={submitting}
                                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {submitting ? "Deleting..." : "Yes, delete"}
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
