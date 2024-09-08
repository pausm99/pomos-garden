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
  const { tasksCollection, updateTaskStatus, loading } = useTasksContext();
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

    const activeTask = tasksCollection.find((task) => task.id === active.id);
    const overTask = tasksCollection.find((task) => task.id === over.id);

    if (!activeTask || !overTask) {
      setDraggingTask(null);
      return;
    }

    // Check if the task is dropped in a different column (state)
    const activeColumn = Object.keys(tasks).find((key) =>
      tasks[key as keyof typeof tasks].some((task) => task.id === active.id)
    ) as keyof typeof tasks;

    const overColumn = Object.keys(tasks).find((key) =>
      tasks[key as keyof typeof tasks].some((task) => task.id === over.id)
    ) as keyof typeof tasks;

    // Handle task moving between columns
    if (activeColumn !== overColumn) {
      const newActiveTasks = tasks[activeColumn].filter(
        (task) => task.id !== active.id
      );
      const newOverTasks = [...tasks[overColumn], activeTask];

      // Update task status (based on the new column it's dropped into)
      updateTaskStatus(
        activeTask.id,
        overColumn === "todo"
          ? "BACKLOG"
          : overColumn === "doing"
          ? "IN_PROGRESS"
          : "COMPLETED"
      );

      setTasks({
        ...tasks,
        [activeColumn]: newActiveTasks,
        [overColumn]: newOverTasks,
      });
    } else {
      // Handle reordering within the same column
      const oldIndex = tasks[activeColumn].findIndex(
        (task) => task.id === active.id
      );
      const newIndex = tasks[activeColumn].findIndex(
        (task) => task.id === over.id
      );
      handleTasksChange(
        activeColumn,
        arrayMove(tasks[activeColumn], oldIndex, newIndex)
      );
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
