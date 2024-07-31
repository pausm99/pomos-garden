import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateTask1Status = async () => {
  const task1 = await prisma.task.findFirst({
    where: {
      title: "Task 1",
    },
  });

  if (task1) {
    const updatedTask1 = await prisma.task.update({
      where: {
        id: task1.id,
      },
      data: {
        status: "IN_PROGRESS",
        updatedAt: new Date(),
      },
    });

    console.log("Task 1 status updated successfully!", updatedTask1);
  } else {
    console.log("Task 1 not found!");
  }
};

await updateTask1Status();
