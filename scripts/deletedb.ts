import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteData = async () => {
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();
};

console.log("Data deleted successfully.");

await deleteData();
