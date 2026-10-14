/** @param {import('@prisma/client').PrismaClient} prisma */
async function seedRekeningKas(prisma) {
  const pairs = [
    { kode: "1100", inst: "tunai", nama: "Kas tunai operasional", urutan: 0 },
    { kode: "1110", inst: "bank_lain", nama: "Rekening bank BCA", urutan: 1 },
  ];
  let created = 0;
  for (const p of pairs) {
    const akun = await prisma.akun.findUnique({ where: { kode: p.kode } });
    if (!akun) continue;
    const exists = await prisma.rekening_Kas.findUnique({ where: { akun_id: akun.id } });
    if (exists) continue;
    await prisma.rekening_Kas.create({
      data: {
        nama_rekening: p.nama,
        institusi_kode: p.inst,
        akun_id: akun.id,
        urutan: p.urutan,
      },
    });
    created += 1;
  }
  return created;
}

module.exports = { seedRekeningKas };
