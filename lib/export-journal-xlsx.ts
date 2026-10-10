import "server-only";

import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";
import { parseFilter, type FilterJurnal } from "@/lib/jurnal";

export async function buildJournalXlsxBuffer(filter: FilterJurnal): Promise<Buffer> {
  const jurnals = await prisma.jurnal.findMany({
    where: parseFilter(filter),
    orderBy: [{ tanggal: "asc" }, { id: "asc" }],
    include: {
      baris: { include: { akun: { select: { kode: true, nama: true } } } },
      dibuatOleh: { select: { nama: true } },
    },
  });

  const rows: Record<string, string | number>[] = [];
  for (const j of jurnals) {
    for (const b of j.baris) {
      rows.push({
        "Tanggal": j.tanggal.toISOString().slice(0, 10),
        "No Jurnal": j.id,
        Status: j.status,
        Keterangan: j.keterangan,
        "Kode Akun": b.akun.kode,
        "Nama Akun": b.akun.nama,
        Debit: b.debit.toString(),
        Kredit: b.kredit.toString(),
        "Dibuat oleh": j.dibuatOleh.nama,
      });
    }
    if (j.baris.length === 0) {
      rows.push({
        "Tanggal": j.tanggal.toISOString().slice(0, 10),
        "No Jurnal": j.id,
        Status: j.status,
        Keterangan: j.keterangan,
        "Kode Akun": "",
        "Nama Akun": "",
        Debit: "",
        Kredit: "",
        "Dibuat oleh": j.dibuatOleh.nama,
      });
    }
  }

  const sheet = XLSX.utils.json_to_sheet(rows);
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, "Jurnal");
  return Buffer.from(XLSX.write(book, { type: "buffer", bookType: "xlsx" }));
}
