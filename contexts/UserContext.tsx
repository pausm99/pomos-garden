"use client";

import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { User } from "@/prisma/generated/zod";
import { useToastContext } from "./ToastsContext";
import { actionGetUserById, actionGetUserIdByClerkId } from "@/actions/users";
import { useUser } from "@clerk/nextjs"; // Import the useUser hook from Clerk

interface UserContextProps {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { addToast } = useToastContext();
  const { user: clerkUser, isSignedIn } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (isSignedIn && clerkUser) {
        try {
          setLoading(true);
          // Fetch user ID by Clerk ID
          const userId = await actionGetUserIdByClerkId(clerkUser.id);
          // Fetch user data by user ID
          const userData = await actionGetUserById(userId);
          // Set user data in the state
          setUser(userData);
        } catch (error) {
          // Handle errors and add a toast message
          addToast({
            description: "Error fetching user information",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [clerkUser, isSignedIn]); // Trigger effect when Clerk's user or sign-in status changes

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
