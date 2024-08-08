"use client";

import { useTasksContext } from "@/contexts/TasksContext";
import TodoState from "./TodoState";

export default function TaskSection() {
  const { tasks } = useTasksContext();

  return (
    <>
      <div className="p-5 grid grid-cols-3 gap-5 overflow-y-scroll">
        <TodoState state="todo" name="To do" tasks={tasks}></TodoState>
        <TodoState state="doing" name="Doing" tasks={[]}></TodoState>
        <TodoState state="done" name="Done" tasks={[]}></TodoState>
      </div>
    </>
  );
}
