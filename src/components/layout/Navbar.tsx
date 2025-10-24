import {
    Bell,
    Calendar,
    ChevronRight,
    ClipboardClock,
    CreditCard,
    Heart,
    Home,
    LogOut,
    Menu,
    Search,
    Settings,
    Shield,
    User,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import CureIcon from "../common/CureIcon";
import { handleLogout } from "@/api/auth/auth";
import { useUserContext } from "@/context/user-context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import placeholderImg from "@/assets/images/user-placeholder.png";

const Navbar = () => {
    const [logoutOpen, setLogoutOpen] = React.useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("home");

    const toggleProfile = () => setIsProfileOpen((v) => !v);
    const closeProfile = () => setIsProfileOpen(false);

    const go = (path: string) => {
        setIsProfileOpen(false);
        navigate(path);
    };

    const logout = async () => {
        await handleLogout();
        setUser(null);
        navigate("/sign-in");
        setLogoutOpen(false);
    };

    return (
        <div className="bg-gray-50 flex flex-col sticky top-0 z-50">
            {/* Header */}
            <header className="bg-white hidden md:flex shadow-sm px-4 py-3  items-center justify-between relative z-20 ">
                <div className="flex items-center ml-10">
                    <div
                        className="w-8 h-8  rounded-lg flex items-center justify-center cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <CureIcon color="primary" />
                    </div>
                </div>

                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            onClick={() => navigate("/search")}
                            type="text"
                            placeholder="Search doctors, speciality, clinics"
                            className="w-full pl-10 pr-4 py-2 bg-[#F5F6F7] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4 mr-10">
                    {/* Mobile Menu */}
                    <button
                        type="button"
                        title="Menu"
                        className="md:hidden p-2 cursor-pointer"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
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
                        title="Notification"
                        type="button"
                        className="hidden md:block p-2 hover:bg-gray-100 rounded-lg relative cursor-pointer"
                        onClick={() => navigate("/notifications")}
                    >
                        <Bell className="w-5 h-5 text-gray-600" />
                        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    </button>

                    {/* Profile Photo */}
                    <button
                        title="Profile"
                        type="button"
                        onClick={toggleProfile}
                        className="relative cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200">
                            {user?.image ? (
                                <img
                                    src={`${user?.image}`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    onError={() =>
                                        (user.image = placeholderImg)
                                    }
                                />
                            ) : (
                                <Avatar className="w-full h-full">
                                    <AvatarImage src={placeholderImg} />
                                </Avatar>
                            )}
                        </div>
                    </button>
                </div>
            </header>

            <div className="md:hidden bg-white px-4 py-3 border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            {user?.image ? (
                                <img
                                    src={`${user?.image}`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    onError={() =>
                                        (user.image = placeholderImg)
                                    }
                                />
                            ) : (
                                <Avatar className="w-full h-full">
                                    <AvatarImage src={placeholderImg} />
                                </Avatar>
                            )}
                        </div>
                        <div>
                            <h2 className="text-sm md:text-xl font-semibold text-gray-900">
                                Welcome back, {user?.fullname}
                            </h2>
                            {user?.address && (
                                <p className="text-sm text-gray-500 flex items-center">
                                    <span>📍 {user?.address}</span>
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            title="Favourite"
                            type="button"
                            className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                        >
                            <Heart
                                className="w-5 h-5 text-gray-600"
                                onClick={() => navigate("/favourite")}
                            />
                        </button>
                        <button
                            title="Notification"
                            type="button"
                            className="p-2 hover:bg-gray-100 rounded-lg relative cursor-pointer"
                            onClick={() => navigate("/notifications")}
                        >
                            <Bell className="w-5 h-5 text-gray-600" />
                            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                        </button>
                    </div>
                </div>
                <div className="flex flex-1 mt-4">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            onClick={() => navigate("/search")}
                            type="text"
                            placeholder="Search doctors, speciality, clinics"
                            className="w-full pl-10 pr-4 py-2 bg-[#F5F6F7] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {isProfileOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 z-30"
                        onClick={closeProfile}
                    ></div>
                    <div className="fixed top-16 right-4 w-80 bg-[#F5F6F7] rounded-lg shadow-xl z-40 border">
                        <div className="p-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    {user?.image ? (
                                        <img
                                            src={`${user?.image}`}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                            onError={() =>
                                                (user.image = placeholderImg)
                                            }
                                        />
                                    ) : (
                                        <Avatar className="w-full h-full">
                                            <AvatarImage src={placeholderImg} />
                                        </Avatar>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">
                                        {user?.fullname}
                                    </h3>
                                    {user?.address && (
                                        <p className="text-sm text-gray-500">
                                            📍 {user?.address}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    title="Settings"
                                    className="p-1 cursor-pointer hover:bg-gray-100 rounded"
                                    onClick={() => go("/edit-profile")}
                                >
                                    <Settings className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>

                            <div className="space-y-1">
                                <button
                                    type="button"
                                    title="Payment Method"
                                    className="w-full cursor-pointer flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg"
                                    onClick={() => go("/payment-management")}
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
                                        setIsProfileOpen(false);
                                        setLogoutOpen(true);
                                    }}
                                >
                                    <LogOut className="w-5 h-5 text-red-600" />
                                    <span className="flex-1 text-red-600">
                                        Log out
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-2 md:hidden z-50">
                <div className="flex justify-around">
                    <button
                        title="Home"
                        type="button"
                        onClick={() => {
                            setActiveTab("home");
                            navigate("/");
                        }}
                        className={`flex flex-col items-center py-2 px-4 cursor-pointer ${
                            activeTab === "home"
                                ? "text-blue-600"
                                : "text-gray-600"
                        }`}
                    >
                        <Home className="w-5 h-5 mb-1" />
                        <span className="text-xs">Home</span>
                    </button>

                    <button
                        title="Bookings"
                        type="button"
                        onClick={() => {
                            setActiveTab("bookings");
                            navigate("/appointments");
                        }}
                        className={`flex flex-col items-center py-2 px-4 cursor-pointer ${
                            activeTab === "bookings"
                                ? "text-blue-600"
                                : "text-gray-600"
                        }`}
                    >
                        <Calendar className="w-5 h-5 mb-1" />
                        <span className="text-xs">Bookings</span>
                    </button>

                    <button
                        title="Profile"
                        type="button"
                        onClick={() => {
                            setActiveTab("profile");
                            navigate("/profile");
                        }}
                        className={`flex flex-col items-center py-2 px-4 cursor-pointer ${
                            activeTab === "profile"
                                ? "text-blue-600"
                                : "text-gray-600"
                        }`}
                    >
                        <User className="w-5 h-5 mb-1" />
                        <span className="text-xs">Profile</span>
                    </button>
                </div>
            </nav>

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
                                onClick={logout}
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
};

export default Navbar;
