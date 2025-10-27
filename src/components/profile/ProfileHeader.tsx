import { MapPin, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card } from "../ui/card";
import userImgPlaceholder from "@/assets/images/user-placeholder.png";
import { useUserContext } from "@/context/user-context";

export default function ProfileHeader() {
  const navigate = useNavigate();
  const { user } = useUserContext();

  if (!user) {
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
              src={user?.image || userImgPlaceholder}
              alt="Avatar"
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-zinc-900 truncate">
              {user?.fullname || "Loading..."}
            </h2>

            {user?.address && (
              <p className="mt-0.5 text-sm text-zinc-500 flex items-center gap-1 truncate">
                <MapPin className="h-4 w-4" /> {user?.address}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          title="Edit profile"
          onClick={() => navigate("/edit-profile")}
          className="shrink-0 rounded-full p-2 hover:bg-zinc-100 cursor-pointer"
          aria-label="Edit profile"
        >
          <Edit className="h-5 w-5 text-zinc-600" />
        </button>
      </div>
    </Card>
  );
}
