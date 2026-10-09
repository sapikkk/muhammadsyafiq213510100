/** @param {import('@prisma/client').PrismaClient} prisma */
async function seedPetani(prisma) {
  const rows = [
    { nama: "Marzuki", gaji_bulanan: 3200000 },
    { nama: "Darusman", gaji_bulanan: 3000000 },
    { nama: "Widi Antoni", gaji_bulanan: 3000000 },
    { nama: "Hudzaifah Mutahajjid", gaji_bulanan: 2800000 },
  ];
  for (const row of rows) {
    const existing = await prisma.petani.findFirst({ where: { nama: row.nama } });
    if (existing) {
      await prisma.petani.update({
        where: { id: existing.id },
        data: { gaji_bulanan: row.gaji_bulanan },
      });
    } else {
      await prisma.petani.create({ data: row });
    }
  }
  return rows.length;
}

module.exports = { seedPetani };
