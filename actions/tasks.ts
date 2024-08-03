'user server';

import { serverCreateTask, serverDeleteTask, serverGetAllTasksForUser, serverGetOneTask, serverUpdateTask } from "@/lib/task";
import { taskStatus } from "@prisma/client";

// Creating the CRUD actions for tasks


//Create Task Function
export  async function actionCreateTask(title: string, description: string, userId: string) {
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
export async function actionUpdateTask(id: string, title?: string, description?: string, status?: taskStatus) {
    return await serverUpdateTask(id, title, description, status);
}

//Delete Task Function

export async function actionDeleteTask(id: string) {
    return await serverDeleteTask(id);
}