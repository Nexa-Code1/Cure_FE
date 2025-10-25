import {
<<<<<<< HEAD
    createContext,
    useContext,
    useEffect,
    useState,
    type Dispatch,
    type SetStateAction,
=======
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
>>>>>>> 23e2e2ee391a9ca1041c75b9ae3820bc9df92399
} from "react";
import type { IUserData } from "@/types";
import { getProfile } from "@/api/profile/profile";

type UserContextType = {
<<<<<<< HEAD
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
=======
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
    if (localStorage.getItem("token")) {
      handleGetUser();
    }
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
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
>>>>>>> 23e2e2ee391a9ca1041c75b9ae3820bc9df92399
};
