"use client";

import { useTasksContext } from "@/contexts/TasksContext";
import { useEffect, useState } from "react";
import TodoState from "./TodoState";
import Loading from "./atoms/Loading";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task as TaskType } from "@/prisma/generated/zod";
import Task from "./Task";
import { actionUpdateTaskStatus } from "@/actions/tasks";

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

  const columnToStatusMap: Record<
    string,
    "BACKLOG" | "IN_PROGRESS" | "COMPLETED"
  > = {
    todo: "BACKLOG",
    doing: "IN_PROGRESS",
    done: "COMPLETED",
  };

  const onDragStart = (event: any) => {
    const { active } = event;
    const task = tasksCollection.find((task) => task.id === active.id);
    if (task) {
      setDraggingTask(task);
    }
  };

  const onDragEnd = async (event: any) => {
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

    const activeColumn = Object.keys(tasks).find((key) =>
      tasks[key as keyof typeof tasks].some((task) => task.id === active.id)
    ) as keyof typeof tasks;

    const overColumn = Object.keys(tasks).find((key) =>
      tasks[key as keyof typeof tasks].some((task) => task.id === over.id)
    ) as keyof typeof tasks;

    if (activeColumn !== overColumn) {
      const newActiveTasks = tasks[activeColumn].filter(
        (task) => task.id !== active.id
      );
      const newOverTasks = [activeTask, ...tasks[overColumn]];

      setTasks({
        ...tasks,
        [activeColumn]: newActiveTasks,
        [overColumn]: newOverTasks,
      });

      const newStatus = columnToStatusMap[overColumn];

      await actionUpdateTaskStatus(activeTask.id, newStatus);
    } else {
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

        <DragOverlay>
          {draggingTask ? (
            <Task task={draggingTask} draggingTask={null} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
