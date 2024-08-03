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

        const updatedUser = await db.user.update({
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
        return updatedUser;
    } catch (error) {
        throw new Error(`Failed to create task: ${error}`);
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