"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import TodoState from "./TodoState";
import Task from "@/interfaces/Task";
import TaskComponent from "./Task";

type TaskState = {
  todo: Task[];
  doing: Task[];
  done: Task[];
};

const initialTasks: TaskState = {
  todo: [
    {
      id: 1,
      title: "Revisar el informe trimestral",
      description:
        "Revisar y corregir errores en el informe financiero del tercer trimestre.",
      tags: [
        { label: "Finanzas", color: "#FEE2E2" },
        { label: "Urgente", color: "#FEE2E2" },
      ],
    },
    {
      id: 4,
      title: "Leer artículo sobre inteligencia artificial",
      description:
        "Explorar nuevas tendencias en IA y su aplicación en nuestro proyecto.",
      tags: [{ label: "Investigación", color: "#EDE9FE" }],
    },
    {
      id: 5,
      title: "Organizar evento de networking",
      description:
        "Coordinar los detalles del evento y confirmar la asistencia de los invitados.",
      tags: [{ label: "Eventos", color: "#FAFAFA" }],
    },
  ],
  doing: [
    {
      id: 2,
      title: "Reunión con el equipo de desarrollo",
      description: "Planificar las tareas para el próximo sprint.",
      tags: [{ label: "Desarrollo", color: "#ECFCCB" }],
    },
  ],
  done: [
    {
      id: 3,
      title: "Actualizar el blog",
      tags: [{ label: "Marketing", color: "#DBEAFE" }],
    },
  ],
};

export default function TaskSection() {
  const [tasks, setTasks] = useState<TaskState>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id as number;
    const [section] = getTaskIndex(activeId);
    if (section) {
      const task = tasks[section].find((task) => task.id === activeId) || null;
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !active) return;

    const activeId = active.id as number;
    const overId = over.id as string;

    const [activeSection, activeIndex] = getTaskIndex(activeId);
    const [overSection, overIndex] = getTaskIndex(overId);

    if (activeSection && overSection) {
      const updatedTasks = { ...tasks };
      const [movedTask] = updatedTasks[activeSection].splice(activeIndex, 1);
      const targetIndex =
        overIndex === -1 ? updatedTasks[overSection].length : overIndex;
      updatedTasks[overSection].splice(targetIndex, 0, movedTask);

      setTasks(updatedTasks);
      setActiveTask(null);
    }
  };

  //This method must remain unchaged, if removed we can't move tasks between columns
  const getTaskIndex = (
    taskId: number | string
  ): [keyof TaskState | null, number] => {
    for (const section in tasks) {
      if (section === taskId) {
        return [section as keyof TaskState, -1];
      }
      const index = tasks[section as keyof TaskState].findIndex(
        (task) => task.id === taskId
      );
      if (index > -1) {
        return [section as keyof TaskState, index];
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
        {(["todo", "doing", "done"] as Array<keyof TaskState>).map((state) => (
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
        ))}
      </div>
      <DragOverlay>
        {activeTask && <TaskComponent task={activeTask} />}
      </DragOverlay>
    </DndContext>
  );
}
