"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { formatRupiah } from "@/lib/format";

export type EvaluasiMarginRow = {
  kodeBatch: string;
  lokasiLabel: string;
  varietas: string;
  hppPerKg: string;
  hargaCurah: string;
  marginCurahPerKg: string;
  marginCurahPct: string;
};

export function EvaluasiMarginDaftar({ rows }: { rows: EvaluasiMarginRow[] }) {
  const columns = useMemo<ColumnDef<EvaluasiMarginRow>[]>(
    () => [
      {
        id: "produksi",
        header: "Lokasi tanam",
        accessorFn: (row) => `${row.lokasiLabel} ${row.kodeBatch} ${row.varietas}`,
        cell: ({ row }) => (
          <span className="font-medium">{row.original.lokasiLabel}</span>
        ),
      },
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
      searchPlaceholder="Cari lokasi, varietas, kode batch…"
      searchColumnIds={["produksi", "kodeBatch", "varietas"]}
      emptyMessage="Belum ada data untung. Setujui laporan panen dan HPP di Admin dulu."
    />
  );
}
