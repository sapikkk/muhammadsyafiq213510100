const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const { seedAkun } = require("./seed-akun");
const { seedInventaris } = require("./seed-inventaris");
const { seedInfrastruktur } = require("./seed-infrastruktur");
const { seedVarietas } = require("./seed-varietas");
const { seedPetani } = require("./seed-petani");
const { seedDemoFlow } = require("./seed-demo-flow");

const prisma = new PrismaClient();
const password = "KokonusDemo2026";

const accounts = [
  {
    nama: "Koko Nuswantoro",
    email: "owner@kokonus.farm",
    role: "OWNER",
  },
  {
    nama: "Admin pembukuan",
    email: "admin@kokonus.farm",
    role: "ADMIN",
  },
  {
    nama: "Marzuki",
    email: "petani@kokonus.farm",
    role: "PEKERJA",
  },
];

async function main() {
  const passwordHash = await hash(password, 10);
  for (const account of accounts) {
    await prisma.user.upsert({
      where: { email: account.email },
      update: { nama: account.nama, role: account.role, passwordHash },
      create: { ...account, passwordHash },
    });
  }
  const jumlahAkun = await seedAkun(prisma);
  const jumlahItem = await seedInventaris(prisma);
  const infra = await seedInfrastruktur(prisma);
  const varietas = await seedVarietas(prisma);
  const jumlahPetani = await seedPetani(prisma);
  const demo = await seedDemoFlow(prisma);
  console.log(
    `Seed selesai: ${accounts.length} akun login, ${jumlahAkun} akun COA, ${jumlahItem} item inventaris, infrastruktur ${infra.totalLubang ?? "?"} lubang, ${varietas.count} varietas (${varietas.created ?? 0} baru, ${varietas.updated ?? 0} diperbarui), ${jumlahPetani} petani master, demo ${demo.pelanggan} pelanggan + ${demo.jurnal} jurnal.`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
