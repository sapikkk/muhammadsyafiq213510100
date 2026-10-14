const { PrismaClient } = require("@prisma/client");
const { seedRekeningKas } = require("./seed-rekening-kas");

const prisma = new PrismaClient();

seedRekeningKas(prisma)
  .then((n) => {
    console.log(`Rekening kas: ${n} baris baru.`);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
