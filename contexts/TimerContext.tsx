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
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocus, setIsFocus] = useState(true); // Estado inicial como "focus"
  const [currentSession, setCurrentSession] = useState<Session | null>(null); // Sesión actual
  const [hasStarted, setHasStarted] = useState(false);

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
    if (currentSession) {
      const completedSession = await actionUpdateSession(
        currentSession.id!,
        undefined,
        undefined,
        undefined,
        new Date(),
        undefined,
        undefined
      );
    }
    resetTimer();
  };

  const cancelSession = async () => {
    if (currentSession) {
      await actionDeleteSession(currentSession.id!);
    }
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

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
};

export default TimerContext;
