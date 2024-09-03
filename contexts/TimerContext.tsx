"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

interface Session {
  userId: string;
  focusDuration: number;
  breakDuration: number;
}

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
        // Cambiar a modo "break" cuando termina el "focus"
        startBreakTimer(currentSession.breakDuration);
      } else {
        // Finalizar la sesión cuando termina el "break"
        completeSession();
        setHasStarted(false);
      }
      return;
    }

    if (isPaused) return;

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
  }, [timeLeft, totalDuration, isPaused, isFocus, currentSession]);

  const startSession = (
    userId: string,
    focusDuration: number,
    breakDuration: number
  ) => {
    const newSession: Session = {
      userId,
      focusDuration,
      breakDuration,
    };
    setCurrentSession(newSession);
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
    setIsFocus(false); // Modo "break"
  };

  const resetTimer = () => {
    setTimeLeft(0);
    setProgress(0);
    setIsPaused(true);
    setIsFocus(true);
    setCurrentSession(null);
    setHasStarted(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const completeSession = () => {
    if (currentSession) {
      const completedSession = { ...currentSession, completed: true };
      console.log("Sesión completada:", completedSession);
    }
    resetTimer();
  };

  const cancelSession = () => {
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
        hasStarted
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
