"use client";

import { useTasksContext } from "@/contexts/TasksContext";
import { useEffect, useState } from "react";
import TodoState from "./TodoState";
import Loading from "./atoms/Loading";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task as TaskType } from "@/prisma/generated/zod";

export default function TaskSection() {
  const { tasksCollection, loading } = useTasksContext();
  const [tasks, setTasks] = useState({
    todo: tasksCollection.filter((task) => task.status === "BACKLOG"),
    doing: tasksCollection.filter((task) => task.status === "IN_PROGRESS"),
    done: tasksCollection.filter((task) => task.status === "COMPLETED"),
  });

  const [draggingTask, setDraggingTask] = useState<TaskType | null>(null);

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

  const onDragStart = (event: any) => {
    const { active } = event;
    const task = tasksCollection.find((task) => task.id === active.id);
    if (task) {
      setDraggingTask(task);
    }
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) {
      setDraggingTask(null);
      return;
    }

    if (active.id !== over.id) {
      const state = Object.keys(tasks).find((state) =>
        tasks[state as keyof typeof tasks].find((task) => task.id === active.id)
      ) as keyof typeof tasks;

      const oldIndex = tasks[state].findIndex((task) => task.id === active.id);
      const newIndex = tasks[state].findIndex((task) => task.id === over.id);

      handleTasksChange(state, arrayMove(tasks[state], oldIndex, newIndex));
    }

    setDraggingTask(null);
  };

  return (
    <>
      <Loading isOpen={loading} />
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="p-5 h-full flex gap-5 overflow-hidden">
          {(["todo", "doing", "done"] as Array<keyof typeof tasks>).map(
            (state) => (
              <div key={state} className="flex-1 w-[33%] flex flex-col gap-2.5">
                <SortableContext
                  items={tasks[state].map((task) => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <TodoState
                    state={state}
                    name={state.charAt(0).toUpperCase() + state.slice(1)}
                    tasks={tasks[state]}
                    draggingTask={draggingTask}
                    onTasksChange={handleTasksChange}
                  />
                </SortableContext>
              </div>
            )
          )}
        </div>
      </DndContext>
    </>
  );
}
