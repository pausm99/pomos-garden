import { usePresetsContext } from "@/contexts/PresetsContext";
import { useTimerContext } from "@/contexts/TimerContext";
import Tippy from "@tippyjs/react";
import { CircleStop, Pause, Play } from "lucide-react";
import { Button } from "./ui/button";

export default function TimerControls() {
  const {
    isPaused,
    startSession,
    pauseTimer,
    resumeTimer,
    resetTimer,
    hasStarted,
    timeLeft,
  } = useTimerContext();

  const { selectedPreset } = usePresetsContext();

  const handlePlayPauseClick = () => {
    if (hasStarted) {
      if (isPaused) {
        resumeTimer();
      } else {
        pauseTimer();
      }
    } else {
      if (selectedPreset) {
        startSession(
          "userId",
          selectedPreset.focusTime,
          selectedPreset.breakTime
        );
      }
    }
  };

  const handleStopClick = () => {
    resetTimer();
  };

  return (
    <div className="flex items-center justify-between gap-2.5">
      <Tippy
        content={isPaused ? "Play" : "Pause"}
        placement="top"
        theme="light"
        arrow={false}
        className={"uppercase pt-[2px]"}
      >
        <Button
          disabled={!selectedPreset}
          onClick={handlePlayPauseClick}
          className="w-[50%] rounded-xl"
        >
          {hasStarted ? (
            isPaused ? (
              <Play color="#ffffff" />
            ) : (
              <Pause color="#ffffff" />
            )
          ) : (
            <Play color="#ffffff" />
          )}
        </Button>
      </Tippy>
      <Tippy
        content="Stop & restart"
        placement="top"
        theme="light"
        arrow={false}
        className={"uppercase pt-[2px]"}
      >
        <Button
          onClick={handleStopClick}
          disabled={!hasStarted || timeLeft <= 0}
          className="w-[50%] rounded-xl"
        >
          <CircleStop color="#ffffff" />
        </Button>
      </Tippy>
    </div>
  );
}
