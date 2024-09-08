"use client";

import {
  actionCreateTask,
  actionDeleteTask,
  actionGetAllTasksForUser,
  actionUpdateTask,
} from "@/actions/tasks";
import { Task } from "@/prisma/generated/zod";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface TasksContextProps {
  tasksCollection: Task[];
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  updateTaskStatus: (
    taskId: string,
    status: "BACKLOG" | "IN_PROGRESS" | "COMPLETED"
  ) => void;
  deleteTask: (taskId: string) => void;
  loading: boolean;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasksCollection, setTasksCollection] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const fetchedTasks = await actionGetAllTasksForUser(
          "66d6edd4f3aeb2c0285644e1"
        );
        setTasksCollection(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task: {
    title: string;
    description: string;
    userId: string;
  }) => {
    const newTask = await actionCreateTask(task);
    setTasksCollection((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = async (updatedTask: Task) => {
    const task = await actionUpdateTask(updatedTask);
    setTasksCollection((prevTasks) =>
      prevTasks.map((prevTask) => (prevTask.id === task.id ? task : prevTask))
    );
  };

  const updateTaskStatus = async (
    taskId: string,
    newStatus: "BACKLOG" | "IN_PROGRESS" | "COMPLETED"
  ) => {
    const taskToUpdate = tasksCollection.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    const updatedTask = { ...taskToUpdate, status: newStatus };
    const task = await actionUpdateTask(updatedTask);
    setTasksCollection((prevTasks) =>
      prevTasks.map((prevTask) => (prevTask.id === task.id ? task : prevTask))
    );
  };

  const deleteTask = async (taskId: string) => {
    await actionDeleteTask(taskId);
    setTasksCollection((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <TasksContext.Provider
      value={{
        tasksCollection,
        addTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
        loading,
      }}
    >
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
