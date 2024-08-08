import TaskSection from "./TasksSection";

type SectionProps = {
  name: string;
  section: string
};

export default function Section({ name, section }: SectionProps) {
  return (
    <div className="h-full">
      <h1 className="py-5 px-7 uppercase">{name}</h1>
      <hr className="border-slate-300" />
      {section === "tasks" && <TaskSection />}
      {/* add the same for all other sections */}
    </div>
  );
}
