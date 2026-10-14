"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { statusJurnalLabel, type StatusJurnalKey } from "@/lib/jurnal-status";
import type { SerializedJurnalListRow } from "@/lib/jurnal-types";

export type JurnalDaftarRow = SerializedJurnalListRow;

export function JurnalDaftar({
  rows,
  detailPrefix,
  emptyMessage = "Belum ada catatan keuangan.",
}: {
  rows: JurnalDaftarRow[];
  detailPrefix: "/admin/jurnal" | "/owner/jurnal";
  emptyMessage?: string;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter(
      (r) =>
        r.keterangan.toLowerCase().includes(needle) ||
        r.dibuatOlehNama.toLowerCase().includes(needle) ||
        r.baris.some((b) => b.akunNama.toLowerCase().includes(needle)),
    );
  }, [rows, q]);

  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-4">
      <Input
        className="h-11 max-w-md"
        placeholder="Cari keterangan atau nama akun…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Cari jurnal"
      />

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Tidak ada catatan cocok pencarian.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((row) => (
            <li key={row.id} className="rounded-md border bg-card">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b bg-muted/20 px-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`${detailPrefix}/${row.id}`}
                    scroll={false}
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {row.keterangan}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {formatTanggal(new Date(row.tanggalIso))} · {row.dibuatOlehNama} ·{" "}
                    {statusJurnalLabel[row.status as StatusJurnalKey]}
                  </p>
                </div>
                <Link
                  href={`${detailPrefix}/${row.id}`}
                  scroll={false}
                  className="shrink-0 text-xs text-muted-foreground underline-offset-4 hover:underline"
                >
                  Detail
                </Link>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Akun</TableHead>
                    <TableHead className="text-right w-[8.5rem]">Debit</TableHead>
                    <TableHead className="text-right w-[8.5rem]">Kredit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {row.baris.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="text-sm">{b.akunNama}</TableCell>
                      <TableCell className="text-right tabular-nums text-sm">
                        {b.debit ? formatRupiah(b.debit) : ""}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-sm">
                        {b.kredit ? formatRupiah(b.kredit) : ""}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30 font-medium">
                    <TableCell>Jumlah</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatRupiah(row.totalDebit)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatRupiah(row.totalKredit)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
