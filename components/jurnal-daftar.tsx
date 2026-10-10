"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { statusJurnalLabel, type StatusJurnalKey } from "@/lib/jurnal-status";
import type { SerializedJurnalListRow } from "@/lib/jurnal";

export type JurnalDaftarRow = SerializedJurnalListRow;

export function JurnalDaftar({
  rows,
  detailPrefix,
  emptyMessage = "Belum ada jurnal.",
}: {
  rows: JurnalDaftarRow[];
  detailPrefix: "/admin/jurnal" | "/owner/jurnal";
  emptyMessage?: string;
}) {
  const columns = useMemo<ColumnDef<JurnalDaftarRow>[]>(
    () => [
      {
        accessorKey: "keterangan",
        header: "Keterangan",
        cell: ({ row }) => (
          <Link
            href={`${detailPrefix}/${row.original.id}`}
            className="font-medium underline-offset-4 hover:underline"
          >
            {row.original.keterangan}
          </Link>
        ),
      },
      {
        id: "tanggal",
        header: "Tanggal",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {formatTanggal(new Date(row.original.tanggalIso))}
          </span>
        ),
      },
      {
        accessorKey: "dibuatOlehNama",
        header: "Oleh",
      },
      {
        accessorKey: "totalDebit",
        header: "Total",
        cell: ({ row }) => (
          <span className="tabular-nums">{formatRupiah(row.original.totalDebit)}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span className="text-sm">
            {statusJurnalLabel[row.original.status as StatusJurnalKey]}
          </span>
        ),
      },
    ],
    [detailPrefix],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={15}
      searchPlaceholder="Cari keterangan atau pembuat…"
      searchColumnIds={["keterangan", "dibuatOlehNama"]}
      syncSearchParam="q"
      emptyMessage={emptyMessage}
    />
  );
}
