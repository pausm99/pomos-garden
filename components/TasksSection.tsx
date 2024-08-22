"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import TaskComponent from "./Task";
import TodoState from "./TodoState";
import { useTasksContext } from "@/contexts/TasksContext";
import { Task } from "@/prisma/generated/zod";

export default function TaskSection() {
  const { tasksCollection, updateTask } = useTasksContext();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState({
    todo: tasksCollection.filter((task) => task.status === "BACKLOG"),
    doing: tasksCollection.filter((task) => task.status === "IN_PROGRESS"),
    done: tasksCollection.filter((task) => task.status === "COMPLETED"),
  });

  const statusMapping: Record<
    keyof typeof tasks,
    "BACKLOG" | "IN_PROGRESS" | "COMPLETED"
  > = {
    todo: "BACKLOG",
    doing: "IN_PROGRESS",
    done: "COMPLETED",
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    setTasks({
      todo: tasksCollection.filter((task) => task.status === "BACKLOG"),
      doing: tasksCollection.filter((task) => task.status === "IN_PROGRESS"),
      done: tasksCollection.filter((task) => task.status === "COMPLETED"),
    });
  }, [tasksCollection]);

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id as string;
    const [section] = getTaskIndex(activeId);
    if (section) {
      const task = tasks[section].find((task) => task.id === activeId) || null;
      setActiveTask(task);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !active) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const [activeSection, activeIndex] = getTaskIndex(activeId);
    const [overSection] = getTaskIndex(overId);

    if (activeSection && overSection && activeSection !== overSection) {
      const updatedTask = {
        ...tasks[activeSection][activeIndex],
        status: statusMapping[overSection],
      };

      await updateTask(updatedTask);

      // Update local state after successful update
      const updatedTasksCollection = tasksCollection.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );

      setTasks({
        todo: updatedTasksCollection.filter((task) => task.status === "BACKLOG"),
        doing: updatedTasksCollection.filter((task) => task.status === "IN_PROGRESS"),
        done: updatedTasksCollection.filter((task) => task.status === "COMPLETED"),
      });

      setActiveTask(null);
    }
  };

  const getTaskIndex = (
    taskId: string
  ): [keyof typeof tasks | null, number] => {
    for (const section in tasks) {
      if (section === taskId) {
        return [section as keyof typeof tasks, -1];
      }
      const index = tasks[section as keyof typeof tasks].findIndex(
        (task) => task.id === taskId
      );
      if (index > -1) {
        return [section as keyof typeof tasks, index];
      }
    }
    return [null, -1];
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="p-5 h-full flex gap-5 overflow-hidden">
        {(["todo", "doing", "done"] as Array<keyof typeof tasks>).map(
          (state) => (
            <div
              key={state}
              className="flex-1 w-[33%] flex flex-col gap-2.5 bg-[#f4f4f5cc]"
            >
              <SortableContext items={tasks[state].map((task) => task.id)}>
                <TodoState
                  state={state}
                  name={state.charAt(0).toUpperCase() + state.slice(1)}
                  tasks={tasks[state]}
                />
              </SortableContext>
            </div>
          )
        )}
      </div>
      <DragOverlay>
        {activeTask && <TaskComponent task={activeTask} />}
      </DragOverlay>
    </DndContext>
  );
}
