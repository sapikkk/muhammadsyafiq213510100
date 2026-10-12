#!/usr/bin/env node
/** Tambah akun COA baru ke DB yang sudah pernah di-seed (idempotent). */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const BARU = [
  { kode: "4300", nama: "Pendapatan Lain-lain", induk: "4000" },
];

async function main() {
  for (const row of BARU) {
    const exists = await prisma.akun.findUnique({ where: { kode: row.kode } });
    if (exists) {
      console.log(`skip ${row.kode} (sudah ada)`);
      continue;
    }
    const parent = await prisma.akun.findUnique({ where: { kode: row.induk } });
    if (!parent) {
      console.error(`induk ${row.induk} tidak ada — jalankan seed akun penuh dulu`);
      process.exit(1);
    }
    await prisma.akun.create({
      data: {
        kode: row.kode,
        nama: row.nama,
        tipe: parent.tipe,
        parentId: parent.id,
        isSystem: true,
        aktif: true,
      },
    });
    console.log(`created ${row.kode} ${row.nama}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
