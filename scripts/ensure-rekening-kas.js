/**
 * Buat baris Rekening_Kas untuk COA 1100/1110 bila belum ada.
 * Jalankan: node --env-file=.env scripts/ensure-rekening-kas.js
 */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const pairs = [
    { kode: "1100", inst: "tunai", nama: "Kas tunai", urutan: 0 },
    { kode: "1110", inst: "bank_lain", nama: "Rekening bank", urutan: 1 },
  ];
  for (const p of pairs) {
    const akun = await prisma.akun.findUnique({ where: { kode: p.kode } });
    if (!akun) {
      console.warn(`Lewati ${p.kode} — akun tidak ada`);
      continue;
    }
    const exists = await prisma.rekening_Kas.findUnique({ where: { akun_id: akun.id } });
    if (exists) {
      console.log(`OK ${p.kode} sudah punya rekening`);
      continue;
    }
    await prisma.rekening_Kas.create({
      data: {
        nama_rekening: p.nama,
        institusi_kode: p.inst,
        akun_id: akun.id,
        urutan: p.urutan,
      },
    });
    console.log(`Buat rekening untuk ${p.kode}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
