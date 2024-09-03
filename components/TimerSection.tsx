import { useTimerContext } from "@/contexts/TimerContext";
import Timer from "./atoms/Timer";
import TimerProgress from "./atoms/TimerProgress";
import TimerControls from "./TimerControls";
import PresetsSection from "./PresetsSection";
import { usePresetsContext } from "@/contexts/PresetsContext";

export default function TimerSection() {
  const { progress, timeLeft, isFocus } = useTimerContext();
  const { selectedPreset } = usePresetsContext();

  const style = {
    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
  };

  return (
    <div className="p-5 h-full w-full flex gap-5">
      <div
        style={style}
        className="flex flex-col items-center justify-between gap-6 w-[calc(66.666%-0.625rem)] flex-grow-0 flex-shrink-0 p-20 border rounded-xl bg-white"
      >
        <div className="w-full flex justify-between items-center">
          <span className="rounded-full px-5 py-0.5 uppercase bg-zinc-200 border border-zinc-300">
            {isFocus ? "FOCUS" : "BREAK"} TIME
          </span>
          {selectedPreset ? (
            <span className="rounded-full px-5 py-0.5 uppercase bg-lime-200 border border-zinc-300">
              {selectedPreset?.name}
            </span>
          ) : (
            <span className="rounded-full px-5 py-0.5 uppercase bg-red-200 border border-zinc-300">
              Select time preset
            </span>
          )}
          <span className="rounded-full px-5 py-0.5 uppercase bg-zinc-50 border border-zinc-300">
            O x2
          </span>
        </div>
        <Timer timeLeft={timeLeft} />
        <TimerProgress progress={progress} />
        <TimerControls />
      </div>
      <div
        style={style}
        className="w-[calc(33.333%-0.625rem)] flex-grow-0 flex-shrink-0 border rounded-xl p-5 bg-white"
      >
        <PresetsSection />
      </div>
    </div>
  );
}
