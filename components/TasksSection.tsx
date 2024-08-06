"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
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
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id;
    const [section] = getTaskIndex(activeId as number);
    if (section) {
      const task =
        tasks[section].find((task) => task.id === (activeId as number)) || null;
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId !== overId) {
      const [activeSection, activeIndex] = getTaskIndex(activeId as number);
      const [overSection, overIndex] = getTaskIndex(overId as number);

      if (activeSection && overSection) {
        const updatedTasks = { ...tasks };

        // quitar la tarea de la sección donde estaba
        const [movedTask] = updatedTasks[activeSection].splice(activeIndex, 1);

        // mover la tarea a la sección nueva
        updatedTasks[overSection].splice(overIndex, 0, movedTask);

        setTasks(updatedTasks);
        setActiveTask(null);
      }
    }
  };

  const getTaskIndex = (taskId: number): [keyof TaskState | null, number] => {
    for (const section in tasks) {
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
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="p-5 h-full flex gap-5 overflow-hidden">
        <div
          className="flex-1 min-w-[300px] flex flex-col gap-2.5 bg-[#f4f4f5cc]"
          style={{ maxWidth: "400px", minHeight: "500px" }}
        >
          <SortableContext items={tasks.todo.map((task) => task.id)}>
            <TodoState state="todo" name="To do" tasks={tasks.todo} />
          </SortableContext>
        </div>
        <div
          className="flex-1 min-w-[300px] flex flex-col gap-2.5 bg-[#f4f4f5cc]"
          style={{ maxWidth: "400px", minHeight: "500px" }}
        >
          <SortableContext items={tasks.doing.map((task) => task.id)}>
            <TodoState state="doing" name="Doing" tasks={tasks.doing} />
          </SortableContext>
        </div>
        <div
          className="flex-1 min-w-[300px] flex flex-col gap-2.5 bg-[#f4f4f5cc]"
          style={{ maxWidth: "400px", minHeight: "500px" }}
        >
          <SortableContext items={tasks.done.map((task) => task.id)}>
            <TodoState state="done" name="Done" tasks={tasks.done} />
          </SortableContext>
        </div>
      </div>
      <DragOverlay>
        {activeTask ? (
          <TaskComponent key={activeTask.id} task={activeTask} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
