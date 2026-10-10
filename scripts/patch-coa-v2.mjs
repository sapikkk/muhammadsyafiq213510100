#!/usr/bin/env node
/**
 * Patch COA v2 di DB existing: akun 1360 + rename 2200.
 *   node --env-file=.env scripts/patch-coa-v2.mjs
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const parent = await prisma.akun.findUnique({ where: { kode: "1000" } });
  if (!parent) throw new Error("Akun induk 1000 tidak ada — jalankan seed-akun dulu.");

  await prisma.akun.upsert({
    where: { kode: "1360" },
    create: {
      kode: "1360",
      nama: "Persediaan Dalam Proses (WIP)",
      tipe: "ASET",
      parentId: parent.id,
      aktif: true,
      isSystem: true,
    },
    update: {
      nama: "Persediaan Dalam Proses (WIP)",
      isSystem: true,
      aktif: true,
    },
  });

  const um = await prisma.akun.updateMany({
    where: { kode: "2200" },
    data: { nama: "Uang Muka Pelanggan", isSystem: true },
  });

  console.log(`patch-coa-v2: 1360 OK, 2200 updated (${um.count} row).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
