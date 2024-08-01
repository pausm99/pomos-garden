import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function AddTask() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Add task" />
      <Button className="addTaskButton" type="button" size="icon">
        <Plus size={14} strokeWidth={3} className="text-zinc-800" />
      </Button>
    </div>
  );
}
