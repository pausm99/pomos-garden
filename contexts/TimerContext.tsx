"use client";

import {
  actionCreateSession,
  actionDeleteSession,
  actionUpdateSession,
} from "@/actions/sessions";
import { SessionUncheckedCreateInputSchema } from "@/prisma/generated/zod";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { z } from "zod";
import { useToastContext } from "./ToastsContext";

type Session = z.infer<typeof SessionUncheckedCreateInputSchema>;

interface TimerContextProps {
  progress: number;
  timeLeft: number;
  startSession: (
    userId: string,
    focusDuration: number,
    breakDuration: number
  ) => void;
  resetTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  cancelSession: () => void;
  isPaused: boolean;
  isFocus: boolean;
  currentSession: Session | null;
  hasStarted: boolean;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const { addToast } = useToastContext();
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocus, setIsFocus] = useState(true); // Estado inicial como "focus"
  const [currentSession, setCurrentSession] = useState<Session | null>(null); // Sesión actual
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (isFocus && currentSession) {
        startBreakTimer(currentSession.breakDuration);
      } else if (!isFocus) {
        completeSession();
        setHasStarted(false);
      }
      return;
    }

    if (isPaused || !hasStarted) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
      setProgress(((totalDuration - timeLeft + 1) / totalDuration) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, totalDuration, isPaused, isFocus, currentSession, hasStarted]);

  const startSession = async (
    userId: string,
    focusDuration: number,
    breakDuration: number
  ) => {
    const newSession: Session = {
      userId,
      focusDuration,
      breakDuration,
      rounds: 0,
      endTime: "",
    };
    const createdSession = await actionCreateSession(
      newSession.userId,
      newSession.focusDuration,
      newSession.breakDuration,
      newSession.rounds
    );
    setCurrentSession(createdSession);
    startFocusTimer(focusDuration);
    setHasStarted(true);
    const formattedDuration = convertSeconds(focusDuration);
    addToast({
      title: "Session started",
      description: `Focus for ${formattedDuration}!`,
    });
  };

  const startFocusTimer = (duration: number) => {
    setTotalDuration(duration);
    setTimeLeft(duration);
    setProgress(0);
    setIsPaused(false);
    setIsFocus(true); // Modo "focus"
  };

  const startBreakTimer = (duration: number) => {
    setTotalDuration(duration);
    setTimeLeft(duration);
    setProgress(0);
    setIsPaused(false);
    setIsFocus(false);
    const formattedDuration = convertSeconds(duration);
    addToast({
      title: "Break time!",
      description: `Relax for ${formattedDuration}!`,
    });
  };

  const resetTimer = async () => {
    setTimeLeft(0);
    setProgress(0);
    setIsPaused(true);
    setIsFocus(true);
    setHasStarted(false);
    setCurrentSession(null);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const completeSession = async () => {
    if (isCompleting) return;
    setIsCompleting(true);

    if (currentSession) {
      try {
        const completedSession = await actionUpdateSession(
          currentSession.id!,
          undefined,
          undefined,
          undefined,
          new Date(),
          undefined,
          undefined
        );
        addToast({
          title: "Session completed",
          description: "Good job! You’ve completed your session.",
        });
      } catch (error) {
        console.error("Error completing session", error);
      }
    }

    resetTimer();
    setIsCompleting(false);
  };

  const cancelSession = async () => {
    if (currentSession) {
      await actionDeleteSession(currentSession.id!);
    }
    addToast({
      title: "Session cancelled",
      description: "The session has been cancelled manually.",
    });
    resetTimer();
  };

  return (
    <TimerContext.Provider
      value={{
        progress,
        timeLeft,
        startSession,
        resetTimer,
        pauseTimer,
        resumeTimer,
        cancelSession,
        isPaused,
        isFocus,
        currentSession,
        hasStarted,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

const convertSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hoursStr = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
  const minutesStr =
    minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";
  const secondsStr =
    remainingSeconds > 0
      ? `${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`
      : "";

  // Filtra los componentes no vacíos
  const timeComponents = [hoursStr, minutesStr, secondsStr].filter(Boolean);

  // Si solo hay un componente, lo retornamos tal cual
  if (timeComponents.length === 1) {
    return timeComponents[0];
  }

  // Si hay más de un componente, unimos todos excepto el último con ", "
  // y el último lo unimos con " and "
  return (
    timeComponents.slice(0, -1).join(", ") +
    (timeComponents.length > 1 ? " and " : "") +
    timeComponents.slice(-1)
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
};

export default TimerContext;
