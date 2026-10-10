/**
 * Data demo alur penjualan & jurnal (idempotent). Butuh seed utama dulu: npm run seed
 */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const DEMO_PELANGGAN = [
  {
    nama: "Pasar Induk Bandung",
    alamat: "Jl. Pasirkoja No. 12, Bandung",
    no_telepon: "081234560001",
    email: "demo.pasar@contoh.local",
  },
  {
    nama: "Resto Green Bowl",
    alamat: "Jl. Dago Atas 88, Bandung",
    no_telepon: "081234560002",
    email: "demo.resto@contoh.local",
  },
  {
    nama: "Koperasi Petani Lembang",
    alamat: "Desa Lembang Wetan, Bandung Barat",
    no_telepon: "081234560003",
    email: "demo.koperasi@contoh.local",
  },
];

const DEMO_JURNAL_KETERANGAN = "Demo DRAFT — beban sewa contoh sidang";

async function akunId(kode) {
  const row = await prisma.akun.findUnique({ where: { kode }, select: { id: true } });
  if (!row) throw new Error(`Akun ${kode} tidak ada — jalankan seed COA.`);
  return row.id;
}

async function main() {
  const admin = await prisma.user.findUnique({
    where: { email: "admin@kokonus.farm" },
    select: { id: true },
  });
  if (!admin) {
    throw new Error("Akun admin@kokonus.farm tidak ada. Jalankan: npx prisma db seed");
  }

  let pelangganBaru = 0;
  for (const p of DEMO_PELANGGAN) {
    const ada = await prisma.pelanggan.findFirst({ where: { email: p.email } });
    if (ada) continue;
    await prisma.pelanggan.create({ data: p });
    pelangganBaru += 1;
  }

  const jurnalAda = await prisma.jurnal.findFirst({
    where: { keterangan: DEMO_JURNAL_KETERANGAN },
  });
  let jurnalBaru = false;
  if (!jurnalAda) {
    const kasId = await akunId("1100");
    const bebanId = await akunId("5230");
    const nominal = 250000;
    await prisma.jurnal.create({
      data: {
        tanggal: new Date(),
        keterangan: DEMO_JURNAL_KETERANGAN,
        status: "DRAFT",
        sumber: "MANUAL",
        dibuatOlehId: admin.id,
        baris: {
          create: [
            { akunId: bebanId, debit: nominal, kredit: 0 },
            { akunId: kasId, debit: 0, kredit: nominal },
          ],
        },
      },
    });
    jurnalBaru = true;
  }

  console.log(
    `Seed demo flow: ${pelangganBaru} pelanggan baru, jurnal draft ${jurnalBaru ? "dibuat" : "sudah ada"}.`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
