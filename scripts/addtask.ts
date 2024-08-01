import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addTask4 = async () => {
  const user = await prisma.user.findUnique({
    where: { email: "john.doe@example.com" },
  });

  if (!user) {
    console.log("User not found!");
    return;
  }

  const task4 = await prisma.task.create({
    data: {
      userId: user.id,
      title: "Task 4",
      description: "This is the fourth task",
      status: "BACKLOG",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log("Task 4 added successfully!", task4);
};

await addTask4();
