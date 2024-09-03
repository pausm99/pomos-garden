"use client";

import { PresetsProvider } from "@/contexts/PresetsContext";
import TaskSection from "./TasksSection";
import TimerSection from "./TimerSection";

type SectionProps = {
  name: string;
  section: string;
};

export default function Section({ name, section }: SectionProps) {
  return (
    <div className="h-[75dvh]">
      <h1 className="py-5 px-7 uppercase">{name}</h1>
      <hr className="border-slate-300" />
      {section === "tasks" && <TaskSection />}
      <PresetsProvider>
        {section === "pomodoro" && <TimerSection />}
      </PresetsProvider>
    </div>
  );
}
