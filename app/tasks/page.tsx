import Section from "@/components/Section";
import { TagsProvider } from "@/contexts/TagsContext";
import { TasksProvider } from "@/contexts/TasksContext";

export default function Page() {
  return (
    <TasksProvider>
      <TagsProvider>
        <Section section="tasks" name="Task Manager" />
      </TagsProvider>
    </TasksProvider>
  );
}
