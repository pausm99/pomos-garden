"use client";

import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Task from "@/interfaces/Task";
import TodoState from "./TodoState";
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
      id: 3,
      title: "Actualizar el blog",
      tags: [{ label: "Marketing", color: "#DBEAFE" }],
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
      id: 4,
      title: "Leer artículo sobre inteligencia artificial",
      description:
        "Explorar nuevas tendencias en IA y su aplicación en nuestro proyecto.",
      tags: [{ label: "Investigación", color: "#EDE9FE" }],
    },
  ],
};

export default function TaskSection() {
  const [tasks] = useState<TaskState>(initialTasks);
  const [activeTask] = useState<Task | null>(null);

  return (
    <DndContext>
      <div className="p-5 h-full flex gap-5 overflow-hidden">
        <div className="flex-1 min-w-[300px] max-w-[400px] h-[100%] flex flex-col gap-2.5 bg-[#f4f4f5cc]">
          <SortableContext items={tasks.todo.map((task) => task.id)}>
            <TodoState state="todo" name="To do" tasks={tasks.todo} />
          </SortableContext>
        </div>
        <div className="flex-1 min-w-[300px] max-w-[400px] h-[100%] flex flex-col gap-2.5 bg-[#f4f4f5cc]">
          <SortableContext items={tasks.doing.map((task) => task.id)}>
            <TodoState state="doing" name="Doing" tasks={tasks.doing} />
          </SortableContext>
        </div>
        <div className="flex-1 min-w-[300px] max-w-[400px] h-[100%] flex flex-col gap-2.5 bg-[#f4f4f5cc]">
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
