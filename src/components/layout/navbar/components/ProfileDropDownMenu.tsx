import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import {
    ChevronRight,
    ClipboardClock,
    CreditCard,
    LogOut,
    Settings,
    Shield,
} from "lucide-react";
import UserInfo from "./UserInfo";

type ProfileDropDownMenuProps = {
    onOpenProfile: Dispatch<SetStateAction<boolean>>;
    onOpenLogoutDialog: Dispatch<SetStateAction<boolean>>;
};

function ProfileDropDownMenu({
    onOpenProfile,
    onOpenLogoutDialog,
}: ProfileDropDownMenuProps) {
    const navigate = useNavigate();

    const closeProfile = () => onOpenProfile(false);

    const go = (path: string) => {
        onOpenProfile(false);
        navigate(path);
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 z-30"
                onClick={closeProfile}
            />
            <div className="fixed top-16 right-4 w-80 bg-[#F5F6F7] rounded-lg shadow-xl z-40 border">
                <div className="p-4">
                    <button
                        onClick={() => go("/profile")}
                        className="w-full flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-50 focus:bg-gray-50 p-2 rounded-md"
                    >
                        <UserInfo />
                    </button>

                    <div className="space-y-1">
                        <button
                            type="button"
                            title="Payment Method"
                            className="w-full cursor-pointer flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg"
                            onClick={() => go("/payment-list")}
                        >
                            <CreditCard className="w-5 h-5 text-gray-600" />
                            <span className="flex-1 text-gray-700">
                                Payment Method
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>

                        <button
                            type="button"
                            title="Payment Method"
                            className="w-full cursor-pointer flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg"
                            onClick={() => go("/appointments")}
                        >
                            <ClipboardClock className="w-5 h-5 text-gray-600" />
                            <span className="flex-1 text-gray-700">
                                My appointments
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>

                        <button
                            type="button"
                            title="Settings"
                            className="w-full flex cursor-pointer items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg"
                            onClick={() => go("/settings")}
                        >
                            <Settings className="w-5 h-5 text-gray-600" />
                            <span className="flex-1 text-gray-700">
                                Settings
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>

                        <button
                            type="button"
                            title="Privacy Policy"
                            className="w-full cursor-pointer flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg"
                            onClick={() => go("/privacy")}
                        >
                            <Shield className="w-5 h-5 text-gray-600" />
                            <span className="flex-1 text-gray-700">
                                Privacy Policy
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>

                        <button
                            type="button"
                            title="Log out"
                            className="w-full flex cursor-pointer items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg"
                            onClick={() => {
                                onOpenProfile(false);
                                onOpenLogoutDialog(true);
                            }}
                        >
                            <LogOut className="w-5 h-5 text-red-600" />
                            <span className="flex-1 text-red-600">Log out</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileDropDownMenu;
