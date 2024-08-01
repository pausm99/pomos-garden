"use client";

import Task from "@/interfaces/Task";
import { useState } from "react";
import TodoState from "./TodoState";

const propTasks: Task[] = [
  {
    id: 1,
    title: "Revisar el informe trimestral",
    description:
      "Revisar y corregir errores en el informe financiero del tercer trimestre.",
    tags: [
      {
        label: "Finanzas",
        color: "#FEE2E2",
      },
      {
        label: "Urgente",
        color: "#FEE2E2",
      },
    ],
  },
  {
    id: 2,
    title: "Reunión con el equipo de desarrollo",
    description: "Planificar las tareas para el próximo sprint.",
    tags: [
      {
        label: "Desarrollo",
        color: "#ECFCCB",
      },
    ],
  },
  {
    id: 3,
    title: "Actualizar el blog",
    tags: [
      {
        label: "Marketing",
        color: "#DBEAFE",
      },
    ],
  },
  {
    id: 4,
    title: "Leer artículo sobre inteligencia artificial",
    description:
      "Explorar nuevas tendencias en IA y su aplicación en nuestro proyecto.",
    tags: [
      {
        label: "Investigación",
        color: "#EDE9FE",
      },
    ],
  },
  {
    id: 5,
    title: "Organizar evento de networking",
    description:
      "Coordinar los detalles del evento y confirmar la asistencia de los invitados.",
    tags: [
      {
        label: "Eventos",
        color: "#FAFAFA",
      },
    ],
  },
];

export default function TaskSection() {
  const [tasks, setTasks] = useState(propTasks)

  return (
    <>
      <div className="p-5 h-full flex gap-5 flex-nowrap overflow-y-hidden">
        <TodoState state="todo" name="To do" tasks={tasks}></TodoState>
        <TodoState state="doing" name="Doing" tasks={[]}></TodoState>
        <TodoState state="done" name="Done" tasks={[]}></TodoState>
      </div>
    </>
  );
}
