import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a User
  const user = await prisma.user.create({
    data: {
      userId: "user123",
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create Tasks
  const task1 = await prisma.task.create({
    data: {
      userId: user.id,
      title: "Task 1",
      description: "This is the first task",
      status: "BACKLOG",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const task2 = await prisma.task.create({
    data: {
      userId: user.id,
      title: "Task 2",
      description: "This is the second task",
      status: "IN_PROGRESS",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const task3 = await prisma.task.create({
    data: {
      userId: user.id,
      title: "Task 3",
      description: "This is the third task",
      status: "COMPLETED",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log({ user, task1, task2, task3 });
}
await main();
