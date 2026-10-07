/** @param {import('@prisma/client').PrismaClient} prisma */
async function seedVarietas(prisma) {
  const existing = await prisma.varietas.count();
  if (existing > 0) {
    return { count: existing, skipped: true };
  }

  await prisma.varietas.create({
    data: {
      nama: "Selada butterhead",
      harga_benih_per_gram: "850.00",
      biji_per_gram: "350.00",
      daya_kecambah: "92.00",
      lama_semai: 7,
      lama_di_kolam: 28,
      berat_rata_rata_panen: "180.000",
      berat_per_pack: "250.000",
      harga_jual_curah: "45000.00",
      harga_jual_pack: "12000.00",
      status: "AKTIF",
    },
  });

  await prisma.varietas.create({
    data: {
      nama: "Selada romaine (arsip)",
      harga_benih_per_gram: "900.00",
      biji_per_gram: "320.00",
      daya_kecambah: "88.00",
      lama_semai: 8,
      lama_di_kolam: 30,
      berat_rata_rata_panen: "200.000",
      berat_per_pack: "250.000",
      harga_jual_curah: "48000.00",
      harga_jual_pack: "13000.00",
      status: "NONAKTIF",
    },
  });

  return { count: 2, skipped: false };
}

module.exports = { seedVarietas };
