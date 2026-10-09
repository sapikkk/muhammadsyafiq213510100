/** @param {import('@prisma/client').PrismaClient} prisma */
async function seedInventaris(prisma) {
  const items = [
    {
      kode: "BNH-SLAD",
      nama: "Benih selada Grand Rapids",
      satuan: "GRAM",
      stokSaatIni: "2500.000",
      stokMinimum: "500.000",
    },
    {
      kode: "BNH-PKCY",
      nama: "Benih pakcoy Nauli F1",
      satuan: "GRAM",
      stokSaatIni: "800.000",
      stokMinimum: "200.000",
    },
    {
      kode: "BNH-KLN",
      nama: "Benih kailan Nita",
      satuan: "GRAM",
      stokSaatIni: "1200.000",
      stokMinimum: "300.000",
    },
    {
      kode: "BNH-KALE",
      nama: "Benih kale Nero Lacinato",
      satuan: "GRAM",
      stokSaatIni: "120.000",
      stokMinimum: "25.000",
    },
    {
      kode: "RW-SLAB",
      nama: "Rockwool slab ~100×15×7,5 cm (720 dadu 2,5³ cm)",
      satuan: "PCS",
      stokSaatIni: "32.000",
      stokMinimum: "8.000",
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
