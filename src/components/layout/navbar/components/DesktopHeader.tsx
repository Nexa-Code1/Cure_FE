import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Search } from "lucide-react";

import { useUserContext } from "@/context/user-context";
import LogoLink from "./LogoLink";
import UserAvatar from "./UserAvatar";

type DesktopHeaderProps = {
  onOpenProfile: Dispatch<SetStateAction<boolean>>;
};

function DesktopHeader({ onOpenProfile }: DesktopHeaderProps) {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const toggleProfile = () => onOpenProfile((v) => !v);

  return (
    <header className="bg-white hidden md:flex shadow-sm px-10 py-3 items-center justify-between relative z-20">
      <LogoLink />

      <div className="flex items-center space-x-4">
        <button
          title="Search"
          type="button"
          className="hidden md:block p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          onClick={() => navigate("/search")}
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>

        <button
          title="Favourite"
          type="button"
          className="hidden md:block p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          onClick={() => navigate("/favourite")}
        >
          <Heart className="w-5 h-5 text-gray-600" />
        </button>

        <button
          title="Profile"
          type="button"
          onClick={toggleProfile}
          className="relative cursor-pointer w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200"
        >
          <UserAvatar image={user?.image} />
        </button>
      </div>
    </header>
  );
}

export default DesktopHeader;
