import { db } from "@/db/db";
import { ObjectId } from "mongodb";
import { TaskUncheckedCreateInputSchema } from "@/prisma/generated/zod";

export async function serverCreateTask(title: string, description: string, userId: string) {
    const userid = new ObjectId(userId);
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
        return newTask;
    } catch (error) {
        throw new Error(`Failed to create task: ${error}`);
    }
}

serverCreateTask("Task 17", "testing now the unchecked ", "76ad4d886e715361ebba40e3").then();
