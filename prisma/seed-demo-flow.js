/** Data demo alur bisnis: pelanggan + jurnal contoh (idempotent). */
async function seedDemoFlow(prisma) {
  const admin = await prisma.user.findUnique({
    where: { email: "admin@kokonus.farm" },
  });
  if (!admin) {
    console.warn("seed-demo-flow: admin tidak ada, lewati.");
    return { pelanggan: 0, jurnal: 0 };
  }

  const pelangganRows = [
    {
      nama: "CV Fresh Mart Bogor",
      alamat: "Jl. Raya Pajajaran No. 12, Bogor",
      no_telepon: "0251-5550101",
      email: "procurement@freshmart-demo.id",
    },
    {
      nama: "Resto Sayur Hijau",
      alamat: "Kompleks Pasar Modern Blok B-3, Depok",
      no_telepon: "021-77889900",
      email: "chef@sayurhijau-demo.id",
    },
    {
      nama: "Toko Tani Online",
      alamat: "Perumahan Melati Indah RT 05, Bekasi",
      no_telepon: "0812-9000-1234",
      email: "order@tokotani-demo.id",
    },
  ];

  let pelangganCount = 0;
  for (const row of pelangganRows) {
    const found = await prisma.pelanggan.findFirst({ where: { email: row.email } });
    if (found) {
      await prisma.pelanggan.update({ where: { id: found.id }, data: row });
    } else {
      await prisma.pelanggan.create({ data: row });
    }
    pelangganCount += 1;
  }

  const kas = await prisma.akun.findFirst({ where: { kode: "1100" } });
  const bank = await prisma.akun.findFirst({ where: { kode: "1110" } });
  if (!kas || !bank) {
    return { pelanggan: pelangganCount, jurnal: 0 };
  }

  const keterangan = "Setor kas ke rekening operasional (demo seed)";
  const existing = await prisma.jurnal.findFirst({
    where: { keterangan, dibuatOlehId: admin.id },
  });
  if (!existing) {
    await prisma.jurnal.create({
      data: {
        tanggal: new Date("2026-10-01"),
        keterangan,
        status: "DRAFT",
        dibuatOlehId: admin.id,
        baris: {
          create: [
            { akunId: bank.id, debit: 500000, kredit: 0 },
            { akunId: kas.id, debit: 0, kredit: 500000 },
          ],
        },
      },
    });
  }

  return { pelanggan: pelangganCount, jurnal: existing ? 0 : 1 };
}

module.exports = { seedDemoFlow };
