// context/TimerContext.tsx
"use client";

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface TimerContextProps {
  progress: number;
  timeLeft: number;
  startTimer: (duration: number) => void;
  resetTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  isPaused: boolean
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
      setProgress(((totalDuration - timeLeft + 1) / totalDuration) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, totalDuration, isPaused]);

  const startTimer = (duration: number) => {
    setTotalDuration(duration);
    setTimeLeft(duration);
    setProgress(0);
    setIsPaused(false);
  };

  const resetTimer = () => {
    setTimeLeft(totalDuration);
    setProgress(0);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  return (
    <TimerContext.Provider value={{ progress, timeLeft, startTimer, resetTimer, pauseTimer, resumeTimer, isPaused }}>
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
