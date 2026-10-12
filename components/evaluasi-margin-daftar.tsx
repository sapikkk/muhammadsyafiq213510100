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
        header: "Untung/kg",
        cell: ({ row }) => (
          <span className="tabular-nums">{formatRupiah(row.original.marginCurahPerKg)}</span>
        ),
      },
      {
        accessorKey: "marginCurahPct",
        header: "Untung %",
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
      emptyMessage="Belum ada data untung. Setujui laporan panen dan HPP di Admin dulu."
    />
  );
}
