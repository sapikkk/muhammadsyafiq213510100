import "server-only";

import type { ExportDocument } from "@/lib/export-document-types";
import { formatRupiah } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { parseFilter, type FilterJurnal } from "@/lib/jurnal";
import { statusJurnalLabel, type StatusJurnalKey } from "@/lib/jurnal-status";

export async function buildJournalExportDocument(filter: FilterJurnal): Promise<ExportDocument> {
  const jurnals = await prisma.jurnal.findMany({
    where: parseFilter(filter),
    orderBy: [{ tanggal: "asc" }, { id: "asc" }],
    take: 500,
    include: {
      baris: { include: { akun: { select: { nama: true } } } },
      dibuatOleh: { select: { nama: true } },
    },
  });

  const rows: string[][] = [];
  for (const j of jurnals) {
    const status =
      statusJurnalLabel[j.status as StatusJurnalKey] ?? j.status;
    for (const b of j.baris) {
      rows.push([
        j.tanggal.toISOString().slice(0, 10),
        status,
        j.keterangan.slice(0, 80),
        b.akun.nama,
        b.debit.gt(0) ? formatRupiah(b.debit.toString()) : "—",
        b.kredit.gt(0) ? formatRupiah(b.kredit.toString()) : "—",
        j.dibuatOleh.nama,
      ]);
    }
  }

  return {
    title: "Jurnal — Kokonus Farm",
    subtitleLines: ["Maks. 500 baris jurnal sesuai filter."],
    sections: [
      {
        headers: ["Tanggal", "Status", "Keterangan", "Akun", "Debit", "Kredit", "Dibuat oleh"],
        rows,
      },
    ],
  };
}
