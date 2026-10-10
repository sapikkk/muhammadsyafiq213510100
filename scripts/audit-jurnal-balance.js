/**
 * T5.4 — pastikan setiap jurnal: total debit = total kredit.
 * Jalankan setelah seed / sebelum deploy: node --env-file=.env scripts/audit-jurnal-balance.js
 */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const jurnal = await prisma.jurnal.findMany({
    include: { baris: { select: { debit: true, kredit: true } } },
    orderBy: { id: "asc" },
  });

  const failures = [];
  for (const j of jurnal) {
    let debit = 0;
    let kredit = 0;
    for (const b of j.baris) {
      debit += Number(b.debit);
      kredit += Number(b.kredit);
    }
    if (Math.abs(debit - kredit) > 0.001) {
      failures.push({
        id: j.id,
        keterangan: j.keterangan,
        status: j.status,
        debit,
        kredit,
        selisih: debit - kredit,
      });
    }
  }

  if (failures.length > 0) {
    console.error(`Audit gagal: ${failures.length} jurnal tidak seimbang.`);
    for (const f of failures) {
      console.error(
        `  #${f.id} [${f.status}] ${f.keterangan} — debit ${f.debit} kredit ${f.kredit} selisih ${f.selisih}`,
      );
    }
    process.exit(1);
  }

  console.log(`Audit OK: ${jurnal.length} jurnal, semua debit = kredit.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
