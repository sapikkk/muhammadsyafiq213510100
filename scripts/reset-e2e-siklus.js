/** Reset batch E2E-S5-DEMO ke fase SEMAI (Playwright T5.1). */
const { PrismaClient } = require("@prisma/client");
const { seedSiklusDemo } = require("../prisma/seed-siklus-demo");

async function main() {
  const prisma = new PrismaClient();
  try {
    const result = await seedSiklusDemo(prisma);
    const row = await prisma.siklus_Produksi.findUnique({
      where: { kode_batch: "E2E-S5-DEMO" },
    });
    if (!row) throw new Error("E2E-S5-DEMO tidak ada setelah seed");
    process.stdout.write(String(row.id));
    if (process.env.RESET_E2E_VERBOSE === "1") {
      console.error("\nreset-e2e-siklus:", result);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
