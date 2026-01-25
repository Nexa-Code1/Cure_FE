import { Camera, MapPin } from "lucide-react";
import { type ChangeEvent, type RefObject } from "react";
import placeholderImg from "@/assets/images/user-placeholder.png";
import type { IUserData } from "@/types";

interface AvatarSectionProps {
    avatar: string;
    avatarPreview: string | null;
    fullName: string;
    address: string;
    profile: IUserData | null;
    fileInputRef: RefObject<HTMLInputElement | null>;
    handleImageFileChange: (
        e: ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: File | null, shouldValidate?: boolean) => void
    ) => void;
    setFieldValue: (field: string, value: File | null, shouldValidate?: boolean) => void;
    setAvatar: (value: string) => void;
}

export function AvatarSection({
    avatar,
    avatarPreview,
    fullName,
    address,
    profile,
    fileInputRef,
    handleImageFileChange,
    setFieldValue,
    setAvatar,
}: AvatarSectionProps) {
    return (
        <div className="flex flex-col items-center mt-2">
            <div className="relative">
                <img
                    src={avatarPreview || avatar}
                    onError={() => {
                        setAvatar(placeholderImg);
                    }}
                    alt="Avatar"
                    className="h-24 w-24 rounded-full object-cover ring-2 ring-white shadow"
                />

                <button
                    type="button"
                    className="absolute -bottom-1 -right-1 rounded-full border border-zinc-200 bg-white p-1 shadow cursor-pointer transition hover:bg-accent"
                    aria-label="Change avatar"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Camera className="h-4 w-4 text-zinc-700" />
                </button>
            </div>

            <h2 className="mt-3 text-base font-semibold text-zinc-900">
                                {fullName || profile?.fullname || ""}
            </h2>
            {address && (
                <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                    <MapPin className="h-4 w-4" />{" "}
                    {address}
                </p>
            )}

            {/* Hidden file input */}
            <input
                title="Change avatar"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => {
                    handleImageFileChange(e, setFieldValue);
                }}
            />
        </div>
    );
}
