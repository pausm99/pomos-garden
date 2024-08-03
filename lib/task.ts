import { db } from "@/db/db";
import { TaskUncheckedCreateInputSchema} from "@/prisma/generated/zod";
import { taskStatus } from "@prisma/client";

export async function serverCreateTask(title: string, description: string, userId: string) {
    const data = {
        title,
        description,
        userId,
    };
    try {
        TaskUncheckedCreateInputSchema.parse(data);
    } catch (error) {
        throw new Error(`Failed to parse task data: ${error}`);
    }
    try {
        const newTask = await db.task.create({
            data,
        });

        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                tasks: {
                    connect: {
                        id: newTask.id,
                    },
                },
            },
        });
        return newTask;
    } catch (error) {
        throw new Error(`Failed to create task: ${error}`);
    }
}

export async function serverGetOneTask(id: string) {
    try {
        const task = await db.task.findUnique({
            where: {
                id,
            },
        });
        return task;
    } catch (error) {
        throw new Error(`Failed to get task: ${error}`);
    }
}

export async function serverGetAllTasksForUser(userId: string) {
    try {
        const tasks = await db.task.findMany({
            where: {
                userId: userId,
            },
        });
        return tasks;
    } catch (error) {
        throw new Error(`Failed to get tasks: ${error}`);
    }
}

export async function serverUpdateTask(id: string, title?: string, description?: string, status?: taskStatus ) {
    const data = {
        title,
        description,
        status,
    };
    try {
        TaskUncheckedCreateInputSchema.parse(data);
    } catch (error) {
        throw new Error(`Failed to parse task data: ${error}`);
    }
    try {
        const updatedTask = await db.task.update({
            where: {
                id,
            },
            data,
        });
        return updatedTask;
    } catch (error) {
        throw new Error(`Failed to update task: ${error}`);
    }
}

export async function serverDeleteTask(id: string) {
    try {
        const deletedTask = await db.task.delete({
            where: {
                id,
            },
        });
        return deletedTask;
    } catch (error) {
        throw new Error(`Failed to delete task: ${error}`);
    }
}