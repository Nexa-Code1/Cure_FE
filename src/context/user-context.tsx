import {
    createContext,
    useContext,
    useEffect,
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";
import type { IUserData } from "@/types";
import { getProfile } from "@/api/profile/profile";

type UserContextType = {
    user: IUserData | null;
    handleGetUser: () => void;
    setUser: Dispatch<SetStateAction<IUserData | null>>;
};

export const UserContext = createContext<UserContextType>({
    user: null,
    handleGetUser: () => {},
    setUser: () => {},
});

export const UserContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<IUserData | null>(null);

    const handleGetUser = async () => {
        try {
            const res = await getProfile();
            setUser(res);
        } catch (error) {
            console.error("Get user error:", error);
        }
    };

    useEffect(() => {
        handleGetUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, handleGetUser, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error(
            "useUserContext must be used within a UserContextProvider"
        );
    }
    return context;
};
