"use client";

import Task from "@/interfaces/Task";
import { useState } from "react";
import TodoState from "./TodoState";

const propTasks: Task[] = [
    {
        id: 1,
        title: "Revisar el informe trimestral de las convocatorias de agosto 2025",
        description:
            "Revisar y corregir errores en el informe financiero del tercer trimestre.",
        tags: [
            {
                label: "Finanzas",
                color: "bg-lime-200",
            },
            {
                label: "Urgente",
                color: "bg-red-200",
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
                color: "bg-sky-200",
            },
        ],
    },
    {
        id: 3,
        title: "Actualizar el blog",
        tags: [
            {
                label: "Marketing",
                color: "bg-yellow-200",
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
                color: "bg-indigo-200",
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
                color: "bg-emerald-200",
            },
        ],
    },
];

export default function TaskSection() {
    const [tasks, setTasks] = useState(propTasks);

    return (
        <div className="flex-1 flex p-5 h-full gap-5 overflow-y-hidden">
            <TodoState state="todo" name="To do" tasks={tasks}></TodoState>
            <TodoState state="doing" name="Doing" tasks={[]}></TodoState>
            <TodoState state="done" name="Done" tasks={[]}></TodoState>
        </div>
    );
}
