import * as React from "react";
import { List, arrayMove } from "react-movable";
import { Task as TaskType } from "@/prisma/generated/zod";
import AddTask from "./AddTask";
import Task from "./Task";

type TodoStateType = "todo" | "doing" | "done";

type TodoStateProps = {
  name: string;
  state: TodoStateType;
  tasks: TaskType[];
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
  onTasksChange,
}: TodoStateProps) {
  const dotColor = stateColor[state];

  const handleTasksChange = (event: { oldIndex: number; newIndex: number }) => {
    const newTasks = arrayMove(tasks, event.oldIndex, event.newIndex);
    onTasksChange(state, newTasks);
  };

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
        <List
          values={tasks}
          onChange={handleTasksChange}
          renderList={({ children, props }) => (
            <ul {...props} className="list-none p-0 m-0">
              {children}
            </ul>
          )}
          renderItem={({ value, props }) => (
            <li {...props} key={value.id} className="mb-2">
              <Task task={value} />
            </li>
          )}
        />
      </div>
    </div>
  );
}
