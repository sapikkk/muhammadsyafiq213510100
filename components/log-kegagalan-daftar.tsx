"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { formatRupiah } from "@/lib/format";
import { labelTahap } from "@/lib/kegagalan-labels";
import { labelJenisKerugian, labelKategoriSusut } from "@/lib/susut-labels";

type Row = {
  id: number;
  tahap: string;
  jumlah_gagal: number;
  hari_hidup: number;
  penyebab: string;
  kategori_susut: string;
  jenis_kerugian: string;
  biaya_kerugian: string;
};

export function LogKegagalanDaftar({ rows }: { rows: Row[] }) {
  const columns = useMemo<ColumnDef<Row>[]>(
    () => [
      {
        accessorKey: "tahap",
        header: "Tahap",
        cell: ({ row }) => labelTahap(row.original.tahap),
      },
      {
        accessorKey: "jumlah_gagal",
        header: "Gagal",
        cell: ({ row }) => <span className="tabular-nums">{row.original.jumlah_gagal}</span>,
      },
      {
        accessorKey: "hari_hidup",
        header: "Hari",
        cell: ({ row }) => <span className="tabular-nums">{row.original.hari_hidup}</span>,
      },
      { accessorKey: "penyebab", header: "Penyebab" },
      {
        accessorKey: "kategori_susut",
        header: "Susut",
        cell: ({ row }) => labelKategoriSusut(row.original.kategori_susut),
      },
      {
        id: "kerugian",
        header: "Kerugian",
        cell: ({ row }) =>
          row.original.kategori_susut === "MENUNGGU" ? (
            "—"
          ) : (
            <span className="text-xs text-muted-foreground">
              {labelJenisKerugian(row.original.jenis_kerugian)} ·{" "}
              {formatRupiah(row.original.biaya_kerugian)}
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
      pageSize={8}
      searchPlaceholder="Cari tahap, penyebab…"
      searchColumnIds={["tahap", "penyebab", "kategori_susut"]}
      emptyMessage="Belum ada log kegagalan untuk siklus ini."
    />
  );
}
