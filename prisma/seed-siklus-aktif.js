/**
 * Batch produksi masih berjalan + log kegagalan MENUNGGU (demo Owner §2–3).
 * Dipanggil dari seed-kokonus-tahun (prefix FLOW — ikut wipeFlowData).
 */
const { Prisma } = require("@prisma/client");
const { FLOW_PREFIX } = require("./data/kokonus-seed-catalog");

function addDays(d, n) {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}

function dateOnly(d) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

const FASE_CHAIN = ["SEMAI", "SPROUT_DAUN", "TAMBAL", "PINDAH_KOLAM", "PENDEWASAAN"];

/**
 * @param {import('@prisma/client').PrismaClient} prisma
 * @param {{ kolams: { id: number }[], varietasByName: Record<string, { id: number }>, petaniId: number }} ctx
 */
async function seedSiklusAktifDanMenunggu(prisma, ctx) {
  const { kolams, varietasByName, petaniId } = ctx;
  const varietasList = Object.values(varietasByName);
  if (!varietasList.length || !kolams.length) return 0;

  const today = dateOnly(new Date());
  const scenarios = [
    { kolamIdx: 0, status: "SEMAI", daysAgo: 9 },
    { kolamIdx: 1, status: "SPROUT_DAUN", daysAgo: 18 },
    { kolamIdx: 2, status: "TAMBAL", daysAgo: 22 },
    { kolamIdx: 3, status: "PINDAH_KOLAM", daysAgo: 28 },
    { kolamIdx: 4, status: "PENDEWASAAN", daysAgo: 35 },
  ];

  let created = 0;

  for (const sc of scenarios) {
    const kolam = kolams[sc.kolamIdx];
    if (!kolam) continue;

    const kode = `${FLOW_PREFIX}AKTIF-K${sc.kolamIdx + 1}`;
    const existing = await prisma.siklus_Produksi.findUnique({ where: { kode_batch: kode } });
    if (existing) {
      await prisma.log_Kegagalan.deleteMany({ where: { siklus_id: existing.id } });
      await prisma.log_Monitor_Kolam.deleteMany({ where: { siklus_id: existing.id } });
      await prisma.log_Produksi.deleteMany({ where: { siklus_id: existing.id } });
      await prisma.biaya_Langsung.deleteMany({ where: { siklus_id: existing.id } });
      await prisma.siklus_Produksi.delete({ where: { id: existing.id } });
    }

    const varietas = varietasList[sc.kolamIdx % varietasList.length];
    const tanggalSemai = addDays(today, -sc.daysAgo);
    const jumlahDisemai = 280 + sc.kolamIdx * 15;
    const totalSusut = 12 + sc.kolamIdx * 3;

    const needsPindah = FASE_CHAIN.indexOf(sc.status) >= FASE_CHAIN.indexOf("PINDAH_KOLAM");

    const siklus = await prisma.siklus_Produksi.create({
      data: {
        kode_batch: kode,
        varietas_id: varietas.id,
        kolam_id: kolam.id,
        tanggal_semai: tanggalSemai,
        tanggal_pindah_kolam: needsPindah ? addDays(tanggalSemai, 20) : null,
        jumlah_disemai: jumlahDisemai,
        total_susut: totalSusut,
        jumlah_layak_jual: 0,
        status: sc.status,
        biaya_langsung: {
          create: {
            biaya_benih: "42000.00",
            biaya_rockwool: "55000.00",
            biaya_nutrisi: "38000.00",
            biaya_listrik_pompa: "12000.00",
            subtotal: "147000.00",
          },
        },
      },
    });

    const targetIdx = FASE_CHAIN.indexOf(sc.status);
    for (let i = 0; i < targetIdx; i++) {
      await prisma.log_Produksi.create({
        data: {
          siklus_id: siklus.id,
          fase_dari: FASE_CHAIN[i],
          fase_ke: FASE_CHAIN[i + 1],
          catatan: `Demo alur — pindah ke ${FASE_CHAIN[i + 1]}`,
          userId: petaniId,
          waktu: addDays(tanggalSemai, 4 + i * 4),
        },
      });
    }

    for (let d = 0; d < 5; d += 1) {
      await prisma.log_Monitor_Kolam.create({
        data: {
          kolam_id: kolam.id,
          siklus_id: siklus.id,
          ppm: (900 + sc.kolamIdx * 20).toFixed(2),
          ph: "6.10",
          suhu_c: (24 + sc.kolamIdx * 0.3).toFixed(2),
          userId: petaniId,
          waktu: addDays(today, -d),
        },
      });
    }

    await prisma.kolam.update({
      where: { id: kolam.id },
      data: { status: "BERPRODUKSI" },
    });

    if (sc.kolamIdx === 0 || sc.kolamIdx === 2) {
      await prisma.log_Kegagalan.create({
        data: {
          siklus_id: siklus.id,
          tahap: sc.status,
          jumlah_gagal: 10 + sc.kolamIdx,
          hari_hidup: sc.daysAgo,
          penyebab: "Susut perlu diputuskan owner — normal atau tidak normal.",
          kategori_susut: "MENUNGGU",
          jenis_kerugian: "MENUNGGU",
          biaya_kerugian: new Prisma.Decimal(0),
        },
      });
    }

    created += 1;
  }

  return created;
}

module.exports = { seedSiklusAktifDanMenunggu };
