import Section from "@/components/Section";
import { TasksProvider } from "@/contexts/TasksContext";

export default function Page() {
  return (
    <TasksProvider>
      <Section section="tasks" name="Task Manager" />
    </TasksProvider>
  );
}
