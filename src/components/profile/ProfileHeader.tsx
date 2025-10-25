import { useEffect, useState } from "react";
import { MapPin, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "@/api/profile/profile";
import type { IUserData } from "../../types";
import { Card } from "../ui/card";
import userImgPlaceholder from "@/assets/images/user-placeholder.png";

export default function ProfileHeader() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<IUserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [profileImg, setProfileImg] = useState(
        profile?.image || userImgPlaceholder
    );

    useEffect(() => {
        (async () => {
            try {
                const res = await getProfile();
                setProfile(res);
            } catch (err) {
                console.error("Failed to load profile:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <Card className="p-4 sm:p-5">
                <div className="h-16 w-full bg-zinc-100 animate-pulse rounded-lg" />
            </Card>
        );
    }

    return (
        <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="relative">
                        <img
                            src={profileImg}
                            onError={() => setProfileImg(userImgPlaceholder)}
                            alt="Avatar"
                            className="h-16 w-16 rounded-full object-cover"
                        />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-lg font-semibold text-zinc-900 truncate">
                            {profile?.fullname || "Loading..."}
                        </h2>

                        {profile?.address && (
                            <p className="mt-0.5 text-sm text-zinc-500 flex items-center gap-1 truncate">
                                <MapPin className="h-4 w-4" />{" "}
                                {profile?.address}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => navigate("/edit-profile")}
                    className="shrink-0 rounded-full p-2 hover:bg-zinc-100 cursor-pointer"
                    aria-label="Go to edit profile"
                >
                    <Edit className="h-5 w-5 text-zinc-600" />
                </button>
            </div>
        </Card>
    );
}
