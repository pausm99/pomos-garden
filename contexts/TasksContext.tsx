"use client";

import Task from "@/interfaces/Task";
import React, { createContext, useState, ReactNode, useContext } from "react";

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

interface TasksContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(propTasks);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }
  return context;
};

export default TasksContext;
