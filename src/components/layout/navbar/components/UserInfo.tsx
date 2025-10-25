import { useUserContext } from "@/context/user-context";
import UserAvatar from "./UserAvatar";

function UserInfo() {
    const { user } = useUserContext();

    return (
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <UserAvatar image={user?.image} />
            </div>
            <div>
                <h2 className="text-sm font-semibold text-gray-900">
                    Welcome back, {user?.fullname}
                </h2>
                {user?.address && (
                    <p className="text-sm text-gray-500 flex items-center">
                        <span>📍 {user?.address}</span>
                    </p>
                )}
            </div>
        </div>
    );
}

export default UserInfo;
