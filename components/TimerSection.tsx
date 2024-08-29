import { useTimerContext } from "@/contexts/TimerContext";
import Timer from "./atoms/Timer";
import TimerProgress from "./atoms/TimerProgress";
import TimerControls from "./TimerControls";
import PresetsSection from "./PresetsSection";

export default function TimerSection() {
  const { progress, timeLeft } = useTimerContext();

  const style = {
    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
  };

  return (
    <div className="p-5 h-full flex gap-5 overflow-hidden">
      <div
        style={style}
        className="flex p-20 flex-col gap-6 flex-1 border rounded-xl bg-white"
      >
        <div className="w-full flex justify-between items-center">
          <span className="rounded-full px-5 py-0.5 uppercase bg-zinc-200 border border-zinc-300">
            Focus time
          </span>
          <span className="rounded-full px-5 py-0.5 uppercase bg-zinc-50 border border-zinc-300">
            O x2
          </span>
        </div>
        <Timer timeLeft={timeLeft} />
        <TimerProgress progress={progress} />
        <TimerControls />
      </div>
      <div style={style} className="w-1/3 border rounded-xl p-5 bg-white">
        <PresetsSection />
      </div>
    </div>
  );
}
