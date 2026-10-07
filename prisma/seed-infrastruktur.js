/** @param {import('@prisma/client').PrismaClient} prisma */
async function seedInfrastruktur(prisma) {
  const existing = await prisma.lahan.count();
  if (existing > 0) {
    const total = await prisma.kolam.aggregate({ _sum: { kapasitas_lubang: true } });
    return { lahan: existing, totalLubang: total._sum.kapasitas_lubang ?? 0, skipped: true };
  }

  const lahan = await prisma.lahan.create({
    data: {
      nilai_sewa: "120000000.00",
      masa_sewa: 60,
      amortisasi_per_bulan: "2000000.00",
    },
  });

  const gh = await prisma.greenhouse.create({
    data: {
      lahan_id: lahan.id,
      nama: "Greenhouse Utama Kokonus",
      nilai_investasi: "960000000.00",
      umur_ekonomis: 120,
      depresiasi_per_bulan: "8000000.00",
    },
  });

  const kolamNames = ["Kolam A1", "Kolam A2", "Kolam A3", "Kolam A4"];
  for (const nama of kolamNames) {
    await prisma.kolam.create({
      data: {
        greenhouse_id: gh.id,
        nama,
        kapasitas_lubang: 480,
        status: "MENGANGGUR",
      },
    });
  }

  return { lahan: 1, greenhouse: 1, kolam: kolamNames.length, totalLubang: 1920, skipped: false };
}

module.exports = { seedInfrastruktur };
