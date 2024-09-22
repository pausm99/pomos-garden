import { useTimerContext } from "@/contexts/TimerContext";
import Timer from "./atoms/Timer";
import TimerProgress from "./atoms/TimerProgress";
import TimerControls from "./TimerControls";
import PresetsSection from "./PresetsSection";
import { usePresetsContext } from "@/contexts/PresetsContext";
import Image from "next/image";

export default function TimerSection() {
  const { progress, timeLeft, isFocus } = useTimerContext();
  const { selectedPreset } = usePresetsContext();

  const style = {
    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
  };

  return (
    <div className="p-5 h-full w-full flex flex-col lg:flex-row gap-5 overflow-y-auto">
      <div
        style={style}
        className="flex flex-col items-center justify-between gap-6 flex-grow-0 flex-shrink-0 p-5 md:p-10 lg:p-20 border rounded-xl bg-white w-full lg:w-[calc(66.666%-0.625rem)]"
      >
        <div className="w-full flex flex-wrap gap-2.5 justify-center md:justify-between items-center text-sm md:text-base">
          <span className="text-center whitespace-nowrap rounded-full px-3 py-1 uppercase bg-zinc-200 border border-zinc-300">
            {isFocus ? "FOCUS" : "BREAK"} TIME
          </span>
          {selectedPreset ? (
            <span className="rounded-full px-3 py-1 uppercase bg-lime-200 border border-zinc-300">
              {selectedPreset?.name}
            </span>
          ) : (
            <span className="text-center rounded-full px-3 py-1 uppercase bg-red-200 border border-zinc-300">
              Select time preset
            </span>
          )}
          <div className="flex items-center gap-2.5 rounded-full px-3 py-1 uppercase bg-zinc-50 border border-zinc-300">
            <Image
              src="/assets/images/tomato_3d.png"
              alt="Pomo's Garden logo"
              width={20}
              height={20}
            />
            <span>x2</span>
          </div>
        </div>
        <Timer timeLeft={timeLeft} />
        <TimerProgress progress={progress} />
        <TimerControls />
      </div>
      <div
        style={style}
        className="h-full w-full lg:w-[calc(33.333%-0.625rem)] flex-grow-0 flex-shrink-0 border rounded-xl p-5 bg-white"
      >
        <PresetsSection />
      </div>
    </div>
  );
}
