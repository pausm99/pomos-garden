import TaskType from "@/interfaces/Task";
import Task from "./Task";
import AddTask from "./AddTask";

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
  const dotColor = stateColor[state] || "";

  return (
    <div
      className="flex-1 flex flex-col gap-2.5 border rounded-xl p-2.5 border-zinc-300"
      style={{ backgroundColor: "#f4f4f5cc" }}
    >
      <div className="flex gap-2 p-[5px]">
        <span
          className={`flex justify-center items-center rounded-full ${dotColor} h-5 w-5`}
        >
          2
        </span>
        <h2 className="uppercase">{name}</h2>
      </div>
      {state === "todo" && <AddTask />}
      <div className="flex flex-col gap-2.5 overflow-y-scroll">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
