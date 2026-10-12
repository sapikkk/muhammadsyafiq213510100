/**
 * Seed fondasi — bagan akun (COA) + opsional satu Owner dari .env.
 * Tidak mengisi inventaris, varietas, siklus, atau akun demo.
 *
 * Kosongkan DB lalu fondasi: npm run db:reset
 * Demo sidang/uji: npm run seed:demo-lengkap
 */
const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const { seedAkun } = require("./seed-akun");

const prisma = new PrismaClient();

async function seedOwnerFromEnv() {
  const email = process.env.SEED_OWNER_EMAIL?.trim()?.toLowerCase();
  const password = process.env.SEED_OWNER_PASSWORD;
  const nama = process.env.SEED_OWNER_NAMA?.trim() || "Owner";

  if (!email || !password) {
    console.log(
      "Akun login: tidak dibuat. Isi SEED_OWNER_EMAIL dan SEED_OWNER_PASSWORD di .env, atau buat user lewat Owner → Kelola akun setelah ada Owner pertama.",
    );
    return 0;
  }

  if (password.length < 8) {
    throw new Error("SEED_OWNER_PASSWORD minimal 8 karakter.");
  }

  const passwordHash = await hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { nama, role: "OWNER", passwordHash, aktif: true },
    create: { nama, email, role: "OWNER", passwordHash, aktif: true },
  });
  console.log(`Owner fondasi: ${email} (sandi dari SEED_OWNER_PASSWORD).`);
  return 1;
}

async function main() {
  const jumlahAkun = await seedAkun(prisma);
  const jumlahUser = await seedOwnerFromEnv();
  console.log(
    `Seed fondasi selesai: ${jumlahAkun} akun COA, ${jumlahUser} user login. Isi varietas, inventaris, dan operasi lewat aplikasi.`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
