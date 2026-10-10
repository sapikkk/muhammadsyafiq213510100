/** Batch + active pack untuk uji Sprint 5 (T5.1 e2e, demo petani). */
const DEMO_BATCH = "E2E-S5-DEMO";

/** @param {import('@prisma/client').PrismaClient} prisma */
async function seedSiklusDemo(prisma) {
  const existing = await prisma.siklus_Produksi.findUnique({
    where: { kode_batch: DEMO_BATCH },
  });
  if (existing) {
    await prisma.log_Produksi.deleteMany({ where: { siklus_id: existing.id } });
    await prisma.siklus_Produksi.update({
      where: { id: existing.id },
      data: {
        status: "SEMAI",
        tanggal_pindah_kolam: null,
        tanggal_panen: null,
      },
    });
    return { skipped: true, reset: true, siklusId: existing.id };
  }

  const admin = await prisma.user.findUnique({ where: { email: "admin@kokonus.farm" } });
  if (!admin) throw new Error("seed-siklus-demo: admin@kokonus.farm tidak ada");

  const benih = await prisma.itemInventaris.findUnique({ where: { kode: "BNH-SLAD" } });
  const rockwool = await prisma.itemInventaris.findUnique({ where: { kode: "RW-SLAB" } });
  if (!benih || !rockwool) {
    throw new Error("seed-siklus-demo: item inventaris demo belum di-seed");
  }

  await prisma.activePack.upsert({
    where: { kode: "PACK-E2E-BNH" },
    update: { sisaUnit: "95.000", status: "AKTIF" },
    create: {
      kode: "PACK-E2E-BNH",
      itemId: benih.id,
      hargaPack: "500000.00",
      jumlahUnit: "100.000",
      sisaUnit: "95.000",
      biayaPerUnit: "5000.0000",
      status: "AKTIF",
      keterangan: "Pack demo Sprint 5 / e2e",
      dibuatOlehId: admin.id,
    },
  });

  await prisma.activePack.upsert({
    where: { kode: "PACK-E2E-RW" },
    update: { sisaUnit: "31.000", status: "AKTIF" },
    create: {
      kode: "PACK-E2E-RW",
      itemId: rockwool.id,
      hargaPack: "320000.00",
      jumlahUnit: "32.000",
      sisaUnit: "31.000",
      biayaPerUnit: "10000.0000",
      status: "AKTIF",
      keterangan: "Pack demo Sprint 5 / e2e",
      dibuatOlehId: admin.id,
    },
  });

  const varietas = await prisma.varietas.findFirst({
    where: { status: "AKTIF" },
    orderBy: { id: "asc" },
  });
  const kolam = await prisma.kolam.findFirst({
    where: { nama: "Kolam A1" },
  });
  if (!varietas || !kolam) {
    throw new Error("seed-siklus-demo: varietas aktif atau Kolam A1 tidak ada");
  }

  const siklus = await prisma.siklus_Produksi.create({
    data: {
      kode_batch: DEMO_BATCH,
      varietas_id: varietas.id,
      kolam_id: kolam.id,
      tanggal_semai: new Date("2026-10-01T12:00:00.000Z"),
      jumlah_disemai: 120,
      status: "SEMAI",
      biaya_langsung: {
        create: {
          biaya_benih: "50000.00",
          biaya_rockwool: "10000.00",
          biaya_nutrisi: "0.00",
          biaya_listrik_pompa: "0.00",
          subtotal: "60000.00",
        },
      },
    },
  });

  if (kolam.status === "MENGANGGUR") {
    await prisma.kolam.update({
      where: { id: kolam.id },
      data: { status: "BERPRODUKSI" },
    });
  }

  return { skipped: false, siklusId: siklus.id, kode: DEMO_BATCH };
}

module.exports = { seedSiklusDemo, DEMO_BATCH };
