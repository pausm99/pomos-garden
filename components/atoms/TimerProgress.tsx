import { Progress } from "@/components/ui/progress";

interface TimerProgressProps {
  progress: number;
}

const TimerProgress = ({ progress }: TimerProgressProps) => {
  return <Progress height="h-[30%]" rounded="rounded-lg" indicatorColor="bg-lime-400" value={progress} className="w-full bg-zinc-100" />;
};

export default TimerProgress;
