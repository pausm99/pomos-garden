const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Fetch user with tasks
  const userWithTasks = await prisma.user.findUnique({
    where: {
      id: '66ad4ed0ce2de7dcd49d2716',
    },
    include: {
      tasks: true,
    },
  });

  console.log(userWithTasks);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
