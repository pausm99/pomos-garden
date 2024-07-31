import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteTask3 = async () => {
  const task3 = await prisma.task.findFirst({
    where: {
      title: "Task 3",
    },
  });

  if (task3) {
    await prisma.task.delete({
      where: {
        id: task3.id,
      },
    });

    console.log("Task 3 deleted successfully!");
  } else {
    console.log("Task 3 not found!");
  }
};

await deleteTask3();
