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
import { useToastContext } from "./ToastsContext";

interface TasksContextProps {
  tasksCollection: Task[];
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
  loading: boolean;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const { addToast } = useToastContext();

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
    addToast({
      description: "Task created",
    });
    setTasksCollection((prevTasks) => [newTask, ...prevTasks]);
  };

  const updateTask = async (updatedTask: Task) => {
    const task = await actionUpdateTask(updatedTask);
    addToast({
      description: "Task updated",
    });
    setTasksCollection((prevTasks) =>
      prevTasks.map((prevTask) => (prevTask.id === task.id ? task : prevTask))
    );
  };

  const deleteTask = async (taskId: string) => {
    await actionDeleteTask(taskId);
    addToast({
      description: "Task deleted",
    });
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
