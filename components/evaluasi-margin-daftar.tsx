"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { formatRupiah } from "@/lib/format";
export type EvaluasiMarginRow = {
  kodeBatch: string;
  varietas: string;
  hppPerKg: string;
  hargaCurah: string;
  marginCurahPerKg: string;
  marginCurahPct: string;
};

export function EvaluasiMarginDaftar({ rows }: { rows: EvaluasiMarginRow[] }) {
  const columns = useMemo<ColumnDef<EvaluasiMarginRow>[]>(
    () => [
      { accessorKey: "kodeBatch", header: "Batch" },
      { accessorKey: "varietas", header: "Varietas" },
      {
        accessorKey: "hppPerKg",
        header: "HPP/kg",
        cell: ({ row }) => (
          <span className="tabular-nums">{formatRupiah(row.original.hppPerKg)}</span>
        ),
      },
      {
        accessorKey: "hargaCurah",
        header: "Harga curah",
        cell: ({ row }) => (
          <span className="tabular-nums">{formatRupiah(row.original.hargaCurah)}</span>
        ),
      },
      {
        accessorKey: "marginCurahPerKg",
        header: "Margin/kg",
        cell: ({ row }) => (
          <span className="tabular-nums">{formatRupiah(row.original.marginCurahPerKg)}</span>
        ),
      },
      {
        accessorKey: "marginCurahPct",
        header: "Margin %",
        cell: ({ row }) => (
          <span className="tabular-nums">{row.original.marginCurahPct}%</span>
        ),
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={8}
      searchPlaceholder="Cari batch atau varietas…"
      searchColumnIds={["kodeBatch", "varietas"]}
      emptyMessage="Belum ada baris margin — approve panen & HPP di Admin."
    />
  );
}
