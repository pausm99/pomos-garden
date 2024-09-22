import { usePresetsContext } from "@/contexts/PresetsContext";
import { useTimerContext } from "@/contexts/TimerContext";
import Tippy from "@tippyjs/react";
import { CircleStop, Pause, Play } from "lucide-react";
import { Button } from "./ui/button";
import { useUserContext } from "@/contexts/UserContext";

export default function TimerControls() {
  const { user } = useUserContext();
  const {
    isPaused,
    startSession,
    pauseTimer,
    resumeTimer,
    cancelSession,
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
      if (selectedPreset && user) {
        startSession(
          user!.id,
          selectedPreset.focusTime,
          selectedPreset.breakTime
        );
      }
    }
  };

  const handleStopClick = () => {
    cancelSession();
  };

  return (
    <div className="w-full flex items-center justify-between gap-2.5 mt-2">
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
