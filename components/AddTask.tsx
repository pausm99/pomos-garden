import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTasksContext } from "@/contexts/TasksContext";
import { useState } from "react";
import Task from "@/interfaces/Task";

export default function AddTask() {
  const [inputTitle, setInputTitle] = useState("");
  const { addTask } = useTasksContext();

  const handleAddTask = () => {
    const task: Task = {
      id: 1234,
      title: inputTitle,
      tags: []
    }
    setInputTitle("")
    addTask(task)
  };

  const handleTextInput = (event: any) => {
    setInputTitle(event.target.value)
  };

  return (
    <form
      action={handleAddTask}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input
        type="text"
        placeholder="Add task"
        value={inputTitle}
        onChange={handleTextInput}
      />
      <Button className="addTaskButton" type="submit" size="icon">
        <Plus size={14} strokeWidth={3} className="text-zinc-800" />
      </Button>
    </form>
  );
}
