import TaskType from "@/interfaces/Task";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

type TodoStateType = "todo" | "doing" | "done";

type TodoStateProps = {
  name: string;
  state: TodoStateType;
  tasks: TaskType[];
};

const stateColor = {
  todo: "bg-zinc-400",
  doing: "bg-amber-500",
  done: "bg-lime-500",
};

export default function TodoState({ name, state, tasks }: TodoStateProps) {
  const dotColor = stateColor[state];
  const { setNodeRef } = useDroppable({ id: state });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col gap-2.5 border rounded-xl p-2.5 border-zinc-300"
      style={{
        backgroundColor: "#f4f4f5cc",
        minWidth: "300px",
        minHeight: "600px",
      }}
    >
      <div className="flex gap-2 items-center p-[5px]">
        <span
          className={`flex justify-center items-center rounded-full ${dotColor} h-5 w-5`}
        />
        <h2 className="uppercase">{name}</h2>
      </div>
      <SortableContext items={tasks.map((task) => task.id)}>
        <div className="flex flex-col gap-2.5 flex-grow overflow-y-auto">
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
