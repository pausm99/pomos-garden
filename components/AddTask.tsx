import { useTasksContext } from "@/contexts/TasksContext";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useUserContext } from "@/contexts/UserContext";

export default function AddTask() {
  const { user } = useUserContext();
  const [inputTitle, setInputTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { addTask } = useTasksContext();

  const handleAddTask = () => {
    if (inputTitle !== "" && user) {
      const newTask: any = {
        title: inputTitle,
        userId: user!.id,
        description: "",
      };
      setErrorMessage("")
      setInputTitle("");
      addTask(newTask);
    } else {
      setErrorMessage("Enter task title");
    }
  };

  const handleTextInput = (event: any) => {
    setErrorMessage("")
    setInputTitle(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <form
        action={handleAddTask}
        className="flex w-full max-w-sm items-center gap-2"
      >
        <Input
        className="rounded-lg"
          type="text"
          placeholder="Add task"
          value={inputTitle}
          onChange={handleTextInput}
        />
        <Button className="addTaskButton aspect-square rounded-lg" type="submit" size="icon">
          <Plus size={14} strokeWidth={3} className="text-zinc-800" />
        </Button>
      </form>
      {errorMessage && <span className="ml-1 text-red-500">{errorMessage}</span>}
    </div>
  );
}
