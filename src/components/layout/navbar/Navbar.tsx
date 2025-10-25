import { useState } from "react";

import MobileBottomNav from "./components/MobileBottomNav";
import LogoutDialog from "./components/LogoutDialog";
import ProfileDropDownMenu from "./components/ProfileDropDownMenu";
import MobileHeader from "./components/MobileHeader";
import DesktopHeader from "./components/DesktopHeader";

const Navbar = () => {
    const [isLogoutOpen, setLogoutOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div className="bg-gray-50 flex flex-col sticky top-0 z-50">
            <DesktopHeader onOpenProfile={setIsProfileOpen} />

            {isProfileOpen && (
                <ProfileDropDownMenu
                    onOpenProfile={setIsProfileOpen}
                    onOpenLogoutDialog={setLogoutOpen}
                />
            )}

            <MobileHeader />
            <MobileBottomNav />

            <LogoutDialog
                isLogoutOpen={isLogoutOpen}
                onOpenLogoutDialog={setLogoutOpen}
            />
        </div>
    );
};

export default Navbar;
