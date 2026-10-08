/** @param {import('@prisma/client').PrismaClient} prisma */
async function seedVarietas(prisma) {
  const rows = [
    {
      nama: "Selada Grand Rapids (Cap Panah Merah)",
      harga_benih_per_gram: "2650.00",
      biji_per_gram: "800.00",
      daya_kecambah: "90.00",
      lama_semai: 7,
      lama_di_kolam: 28,
      berat_rata_rata_panen: "175.000",
      berat_per_pack: "250.000",
      harga_jual_curah: "45000.00",
      harga_jual_pack: "12000.00",
      status: "AKTIF",
    },
    {
      nama: "Selada butterhead (demo lama)",
      harga_benih_per_gram: "850.00",
      biji_per_gram: "350.00",
      daya_kecambah: "92.00",
      lama_semai: 7,
      lama_di_kolam: 28,
      berat_rata_rata_panen: "180.000",
      berat_per_pack: "250.000",
      harga_jual_curah: "45000.00",
      harga_jual_pack: "12000.00",
      status: "NONAKTIF",
    },
    {
      nama: "Pakcoy Nauli F1 (Cap Panah Merah)",
      harga_benih_per_gram: "3850.00",
      biji_per_gram: "300.00",
      daya_kecambah: "88.00",
      lama_semai: 6,
      lama_di_kolam: 25,
      berat_rata_rata_panen: "220.000",
      berat_per_pack: "250.000",
      harga_jual_curah: "42000.00",
      harga_jual_pack: "11000.00",
      status: "AKTIF",
    },
    {
      nama: "Kailan Nita (Cap Panah Merah)",
      harga_benih_per_gram: "1630.00",
      biji_per_gram: "275.00",
      daya_kecambah: "87.00",
      lama_semai: 6,
      lama_di_kolam: 30,
      berat_rata_rata_panen: "240.000",
      berat_per_pack: "250.000",
      harga_jual_curah: "40000.00",
      harga_jual_pack: "10500.00",
      status: "AKTIF",
    },
    {
      nama: "Kale Nero Lacinato (Haira Seed)",
      harga_benih_per_gram: "17500.00",
      biji_per_gram: "250.00",
      daya_kecambah: "85.00",
      lama_semai: 8,
      lama_di_kolam: 35,
      berat_rata_rata_panen: "150.000",
      berat_per_pack: "200.000",
      harga_jual_curah: "55000.00",
      harga_jual_pack: "15000.00",
      status: "AKTIF",
    },
    {
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
  ];

  let created = 0;
  let updated = 0;

  for (const data of rows) {
    const existing = await prisma.varietas.findFirst({
      where: { nama: data.nama },
    });
    if (existing) {
      await prisma.varietas.update({
        where: { id: existing.id },
        data,
      });
      updated += 1;
    } else {
      await prisma.varietas.create({ data });
      created += 1;
    }
  }

  const count = await prisma.varietas.count();
  return { count, created, updated, skipped: false };
}

module.exports = { seedVarietas };
