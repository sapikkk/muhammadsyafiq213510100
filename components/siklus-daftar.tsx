"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";
import { formatTanggal } from "@/lib/format";
import { labelSiklusStatus } from "@/lib/siklus-status-label";
import {
  labelSiklusDaftarUtama,
  partsFromSerializeSiklus,
} from "@/lib/produksi-ui-labels";

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

export function SiklusDaftar({
  rows,
  readOnly = false,
}: {
  rows: SiklusBaris[];
  /** Owner: tabel tanpa navigasi ke petani. */
  readOnly?: boolean;
}) {
  const columns = useMemo<ColumnDef<SiklusBaris>[]>(
    () => [
      {
        id: "produksi",
        header: "Tanaman & lokasi",
        accessorFn: (row) =>
          labelSiklusDaftarUtama(partsFromSerializeSiklus(row)),
        cell: ({ row }) => (
          <span className="font-medium">
            {labelSiklusDaftarUtama(partsFromSerializeSiklus(row.original))}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Fase",
        cell: ({ row }) => (
          <Badge variant="secondary">
            {labelSiklusStatus(row.original.status)}
          </Badge>
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
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={12}
      searchPlaceholder="Cari varietas, lokasi, kode batch…"
      searchColumnIds={["produksi", "kode_batch", "status"]}
      emptyMessage="Belum ada siklus produksi."
      getRowHref={readOnly ? undefined : (row) => `/petani/siklus/${row.id}`}
    />
  );
}
