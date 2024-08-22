"use server";

import {
  serverCreateTask,
  serverDeleteTask,
  serverGetAllTasksForUser,
  serverGetOneTask,
  serverUpdateTask,
} from "@/lib/task";
import { Task } from "@/prisma/generated/zod";

// Creating the CRUD actions for tasks

//Create Task Function
export async function actionCreateTask(newTask: {
  title: string;
  description: string;
  userId: string;
}) {
  const { title, description, userId } = newTask;
  return await serverCreateTask(title, description, userId);
}

//Read Task Functions

export async function actionGetOneTask(id: string) {
  return await serverGetOneTask(id);
}

export async function actionGetAllTasksForUser(userId: string) {
  return await serverGetAllTasksForUser(userId);
}

//Update Task Function
export async function actionUpdateTask(updatedTask: Task) {
  const { id, title, description, status } = updatedTask;
  return await serverUpdateTask(id, title, description, status);
}

//Delete Task Function

export async function actionDeleteTask(id: string) {
  return await serverDeleteTask(id);
}
