"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";
import { formatTanggal } from "@/lib/format";
import { faseLabel, isFaseProduksi } from "@/lib/siklus-fase";

export type SiklusBaris = {
  id: number;
  kode_batch: string;
  varietas_nama: string;
  kolam_nama: string;
  greenhouse_nama: string;
  tanggal_semai: string;
  jumlah_disemai: number;
  status: string;
};

export function SiklusDaftar({ rows }: { rows: SiklusBaris[] }) {
  const columns = useMemo<ColumnDef<SiklusBaris>[]>(
    () => [
      { accessorKey: "kode_batch", header: "Batch" },
      {
        accessorKey: "status",
        header: "Fase",
        cell: ({ row }) => (
          <Badge variant="secondary">
            {isFaseProduksi(row.original.status)
              ? faseLabel[row.original.status]
              : row.original.status}
          </Badge>
        ),
      },
      { accessorKey: "varietas_nama", header: "Varietas" },
      {
        id: "lokasi",
        header: "Lokasi",
        accessorFn: (row) => `${row.greenhouse_nama} ${row.kolam_nama}`,
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.greenhouse_nama} / {row.original.kolam_nama}
          </span>
        ),
      },
      {
        id: "semai",
        header: "Semai",
        accessorFn: (row) => row.tanggal_semai,
        cell: ({ row }) =>
          formatTanggal(new Date(`${row.original.tanggal_semai}T12:00:00.000Z`)),
      },
      {
        accessorKey: "jumlah_disemai",
        header: "Bibit",
        cell: ({ row }) => (
          <span className="tabular-nums">{row.original.jumlah_disemai}</span>
        ),
      },
      {
        id: "aksi",
        header: "",
        cell: ({ row }) => (
          <Link
            href={`/petani/siklus/${row.original.id}`}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Pindah fase
          </Link>
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
      searchPlaceholder="Cari batch, varietas, lokasi…"
      searchColumnIds={["kode_batch", "varietas_nama", "lokasi", "status"]}
      emptyMessage="Belum ada siklus produksi."
    />
  );
}
