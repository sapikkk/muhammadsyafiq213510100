"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { formatRupiah } from "@/lib/format";

export type CashFlowMutasiRow = {
  id: string;
  tanggal: string;
  jurnalId: number;
  kategori: string;
  keterangan: string;
  masuk: string;
  keluar: string;
};

export function CashFlowMutasiDaftar({ rows }: { rows: CashFlowMutasiRow[] }) {
  const columns = useMemo<ColumnDef<CashFlowMutasiRow>[]>(
    () => [
      { accessorKey: "tanggal", header: "Tanggal" },
      {
        accessorKey: "jurnalId",
        header: "Jurnal",
        cell: ({ row }) => (
          <Link
            href={`/owner/jurnal/${row.original.jurnalId}`}
            className="tabular-nums text-primary hover:underline"
          >
            #{row.original.jurnalId}
          </Link>
        ),
      },
      { accessorKey: "kategori", header: "Kategori" },
      {
        accessorKey: "keterangan",
        header: "Keterangan",
        cell: ({ row }) => (
          <span className="max-w-xs truncate block" title={row.original.keterangan}>
            {row.original.keterangan || "—"}
          </span>
        ),
      },
      {
        id: "masuk",
        header: () => <span className="block w-full text-right">Masuk</span>,
        cell: ({ row }) => (
          <span className="block text-right tabular-nums">
            {Number(row.original.masuk) > 0 ? formatRupiah(row.original.masuk) : "—"}
          </span>
        ),
      },
      {
        id: "keluar",
        header: () => <span className="block w-full text-right">Keluar</span>,
        cell: ({ row }) => (
          <span className="block text-right tabular-nums">
            {Number(row.original.keluar) > 0 ? formatRupiah(row.original.keluar) : "—"}
          </span>
        ),
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={12}
      searchPlaceholder="Cari keterangan, kategori, jurnal…"
      searchColumnIds={["keterangan", "kategori", "jurnalId", "tanggal"]}
      emptyMessage="Belum ada mutasi kas pada periode ini."
    />
  );
}
