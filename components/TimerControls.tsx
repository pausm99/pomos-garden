import { Pause, Play } from "lucide-react";
import { Button } from "./ui/button";
import { useTimerContext } from "@/contexts/TimerContext";
import { useEffect, useState } from "react";

export default function TimerControls() {
  const { timeLeft, startTimer, pauseTimer, resumeTimer } = useTimerContext();
  const [hasStarted, setHasStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(true); // Assume initially paused

  useEffect(() => {
    if (timeLeft <= 0) {
      setHasStarted(false);
      setIsPaused(false);
    }
  }, [timeLeft]);

  const handlePlay = () => {
    if (!hasStarted) {
      startTimer(300); // Start timer with 300 seconds
      setHasStarted(true);
    } else {
      resumeTimer();
    }
    setIsPaused(false);
  };

  const handlePause = () => {
    pauseTimer();
    setIsPaused(true);
  };

  return (
    <div className="flex items-center justify-between gap-2.5">
      <Button
        onClick={handlePause}
        disabled={isPaused || timeLeft <= 0} // Disable if already paused or timer is finished
        className="w-[50%] rounded-xl"
      >
        <Pause color="#ffffff" />
      </Button>
      <Button
        onClick={handlePlay}
        disabled={timeLeft <= 0 && hasStarted} // Disable if timer is finished and has started
        className="w-[50%] rounded-xl"
      >
        <Play color="#ffffff" />
      </Button>
    </div>
  );
}
