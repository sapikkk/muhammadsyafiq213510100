import "server-only";

import type { ExportDocument } from "@/lib/export-document-types";
import { prisma } from "@/lib/prisma";
import { parseFilter, type FilterJurnal } from "@/lib/jurnal";

export async function buildJournalExportDocument(filter: FilterJurnal): Promise<ExportDocument> {
  const jurnals = await prisma.jurnal.findMany({
    where: parseFilter(filter),
    orderBy: [{ tanggal: "asc" }, { id: "asc" }],
    take: 500,
    include: {
      baris: { include: { akun: { select: { kode: true, nama: true } } } },
      dibuatOleh: { select: { nama: true } },
    },
  });

  const rows: string[][] = [];
  for (const j of jurnals) {
    for (const b of j.baris) {
      rows.push([
        j.tanggal.toISOString().slice(0, 10),
        String(j.id),
        j.status,
        j.keterangan.slice(0, 60),
        b.akun.kode,
        b.akun.nama,
        b.debit.toString(),
        b.kredit.toString(),
        j.dibuatOleh.nama,
      ]);
    }
  }

  return {
    title: "Jurnal — Kokonus Farm",
    subtitleLines: ["Maks. 500 baris jurnal sesuai filter."],
    sections: [
      {
        headers: [
          "Tanggal",
          "No.",
          "Status",
          "Keterangan",
          "Kode akun",
          "Nama akun",
          "Debit",
          "Kredit",
          "Dibuat oleh",
        ],
        rows,
      },
    ],
  };
}
