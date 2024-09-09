"use client";

import { useToast } from "@/hooks/use-toast";
import { createContext, ReactNode, useContext } from "react";


interface ToastContextProps {
  addToast: (message: { title?: string; description?: string }) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProviderContext = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();

  const addToast = (message: { title?: string; description?: string }) => {
    toast({
      title: message.title,
      description: message.description,
    });
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProviderContext");
  }
  return context;
};
