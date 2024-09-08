import * as React from "react";
import { Task as TaskType } from "@/prisma/generated/zod";
import AddTask from "./AddTask";
import Task from "./Task";

type TodoStateType = "todo" | "doing" | "done";

type TodoStateProps = {
  name: string;
  state: TodoStateType;
  tasks: TaskType[];
  draggingTask: TaskType | null;
  onTasksChange: (state: TodoStateType, newTasks: TaskType[]) => void;
};

const stateColor = {
  todo: "bg-zinc-400",
  doing: "bg-amber-500",
  done: "bg-lime-500",
};

export default function TodoState({
  name,
  state,
  tasks,
  draggingTask,
}: TodoStateProps) {
  const dotColor = stateColor[state];

  return (
    <div
      className="flex flex-col gap-2.5 border rounded-xl p-2.5 border-zinc-300"
      style={{
        backgroundColor: "#f4f4f5cc",
        minWidth: "300px",
        height: "100%",
      }}
    >
      <div className="flex gap-2 items-center p-[5px]">
        <span
          className={`flex justify-center items-center rounded-full ${dotColor} h-5 w-5`}
        >
          {tasks.length}
        </span>
        <h2 className="uppercase">{name}</h2>
      </div>
      {state === "todo" && <AddTask />}
      <div className="flex flex-col gap-2.5 flex-grow overflow-y-auto">
        <ul className="list-none p-0 m-0">
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className={`mb-2 ${
                draggingTask?.id === task.id ? "opacity-70" : ""
              }`}
            >
              <Task task={task} draggingTask={null} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
