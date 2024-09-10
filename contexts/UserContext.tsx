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

  interface UserContextProps {
    user: User | null;
    loading: boolean;
  }

  const UserContext = createContext<UserContextProps | undefined>(undefined);

  export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { addToast } = useToastContext();
    const [user, setUser] = useState<User | null>({
      "id": "66d6edd4f3aeb2c0285644e1",
      "userClerkId": "user_2lXf9bqtwCwQyArr639xtZOCNxw",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "createdAt": new Date('2024-09-03T11:07:00.153Z'),
      "updatedAt": new Date('2024-09-03T11:07:00.153Z')
  });
    const [loading, setLoading] = useState(false);

    return (
      <UserContext.Provider
        value={{
          user,
          loading
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
