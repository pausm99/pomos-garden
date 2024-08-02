'user server';

import { serverCreateTask } from "@/lib/task";

export  async function actionCreateTask(title: string, description: string, userId: string) {
    return await serverCreateTask(title, description, userId);
}