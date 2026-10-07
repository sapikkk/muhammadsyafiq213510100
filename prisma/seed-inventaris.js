/** @param {import('@prisma/client').PrismaClient} prisma */
async function seedInventaris(prisma) {
  const items = [
    {
      kode: "BNH-SLAD",
      nama: "Benih selada butterhead",
      satuan: "GRAM",
      stokSaatIni: "2500.000",
      stokMinimum: "500.000",
    },
    {
      kode: "RW-36",
      nama: "Rockwool cube 36 lubang",
      satuan: "PCS",
      stokSaatIni: "120.000",
      stokMinimum: "24.000",
    },
    {
      kode: "NUT-A-B",
      nama: "Nutrisi AB hidroponik (set A+B)",
      satuan: "LITER",
      stokSaatIni: "80.000",
      stokMinimum: "20.000",
    },
    {
      kode: "MED-KOKO",
      nama: "Media cocopeat block",
      satuan: "PCS",
      stokSaatIni: "45.000",
      stokMinimum: "10.000",
    },
  ];

  for (const row of items) {
    await prisma.itemInventaris.upsert({
      where: { kode: row.kode },
      update: {
        nama: row.nama,
        satuan: row.satuan,
        stokSaatIni: row.stokSaatIni,
        stokMinimum: row.stokMinimum,
        aktif: true,
      },
      create: row,
    });
  }

  return items.length;
}

module.exports = { seedInventaris };
