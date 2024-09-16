"use client";

import { actionGetUserByEmail } from "@/actions/users";
import { User } from "@/prisma/generated/zod";
import { getSession, SessionProvider } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useToastContext } from "./ToastsContext";

interface UserContextProps {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { addToast } = useToastContext();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Obtén la sesión del usuario
        const session = await getSession();
        if (session?.user?.email) {
          // Si el usuario está autenticado, obtén los datos del usuario desde la base de datos
          const userData = await actionGetUserByEmail(session.user.email);
          setUser(userData);
        } else {
          // Si no hay sesión, el usuario no está autenticado
          setUser(null);
        }
      } catch (error) {
        // Maneja errores y muestra un mensaje de toast
        addToast({
          description: "Error fetching user information",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Solo ejecuta el efecto una vez al montar el componente

  return (
    <UserContext.Provider value={{ user, loading }}>
      <SessionProvider>{children}</SessionProvider>
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
