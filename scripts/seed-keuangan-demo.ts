/**
 * Backfill jurnal penjualan + penyusutan dari data seed operasi.
 * npm run seed:keuangan
 * Setelah: npm run seed:kokonus-tahun (atau SO DELIVERED lain dari demo).
 */
import { backfillKeuanganDariSeed } from "../lib/seed-keuangan-backfill";
import { prisma } from "../lib/prisma";

async function main() {
  const hasil = await backfillKeuanganDariSeed();
  console.log(
    `Seed keuangan: ${hasil.barisHppDiperbarui} baris HPP diperbarui, ${hasil.jurnalPenjualan} jurnal penjualan, ${hasil.jurnalPenyusutan} jurnal penyusutan.`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
