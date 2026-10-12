/**
 * Seed demo lengkap (akun demo, inventaris, varietas, siklus, petani).
 * Hanya untuk uji/sidang: npm run seed:demo-lengkap
 * Jangan dipakai jika Anda mengisi data sendiri — pakai npm run seed (fondasi saja).
 */
const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const { seedAkun } = require("./seed-akun");
const { seedInventaris } = require("./seed-inventaris");
const { seedInfrastruktur } = require("./seed-infrastruktur");
const { seedVarietas } = require("./seed-varietas");
const { seedPetani } = require("./seed-petani");
const { seedSiklusDemo } = require("./seed-siklus-demo");

const prisma = new PrismaClient();
const password = "KokonusDemo2026";

const accounts = [
  { nama: "Koko Nuswantoro", email: "owner@kokonus.farm", role: "OWNER" },
  { nama: "Admin pembukuan", email: "admin@kokonus.farm", role: "ADMIN" },
  { nama: "Marzuki", email: "petani@kokonus.farm", role: "PEKERJA" },
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
  const siklusDemo = await seedSiklusDemo(prisma);
  console.log(
    `Seed demo lengkap: ${accounts.length} akun, ${jumlahAkun} COA, ${jumlahItem} inventaris, infrastruktur ${infra.totalLubang ?? "?"} lubang, varietas ${varietas.count}, petani master ${jumlahPetani}, siklus ${siklusDemo.skipped ? "sudah ada" : siklusDemo.kode}.`,
  );
  console.log(`Sandi demo: ${password}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
