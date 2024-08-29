"use client";

import { useTasksContext } from "@/contexts/TasksContext";
import { useEffect, useState } from "react";
import TodoState from "./TodoState";
import Loading from "./atoms/Loading";
import { Task as TaskType } from "@/prisma/generated/zod";

export default function TaskSection() {
  const { tasksCollection, loading } = useTasksContext();

  const [tasks, setTasks] = useState({
    todo: tasksCollection.filter((task) => task.status === "BACKLOG"),
    doing: tasksCollection.filter((task) => task.status === "IN_PROGRESS"),
    done: tasksCollection.filter((task) => task.status === "COMPLETED"),
  });

  useEffect(() => {
    setTasks({
      todo: tasksCollection.filter((task) => task.status === "BACKLOG"),
      doing: tasksCollection.filter((task) => task.status === "IN_PROGRESS"),
      done: tasksCollection.filter((task) => task.status === "COMPLETED"),
    });
  }, [tasksCollection]);

  const handleTasksChange = (
    state: "todo" | "doing" | "done",
    newTasks: TaskType[]
  ) => {
    setTasks((prevTasks) => ({ ...prevTasks, [state]: newTasks }));
  };

  return (
    <>
      <Loading isOpen={loading} />
      <div className="p-5 h-full flex gap-5 overflow-hidden">
        {(["todo", "doing", "done"] as Array<keyof typeof tasks>).map(
          (state) => (
            <div key={state} className="flex-1 w-[33%] flex flex-col gap-2.5">
              <TodoState
                state={state}
                name={state.charAt(0).toUpperCase() + state.slice(1)}
                tasks={tasks[state]}
                onTasksChange={handleTasksChange}
              />
            </div>
          )
        )}
      </div>
    </>
  );
}
