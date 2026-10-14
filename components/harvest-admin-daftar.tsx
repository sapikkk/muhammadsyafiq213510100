"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";
import { labelLaporanPanenStatus } from "@/lib/laporan-panen-status";
import {
  labelBarisProduksiUtama,
  partsFromSerializeSiklus,
} from "@/lib/produksi-ui-labels";

type Row = {
  id: number;
  kode_batch: string;
  varietas_nama: string;
  greenhouse_nama: string;
  kolam_nama: string;
  status: string;
  jumlah_layak: number;
  jumlah_tidak_layak: number;
  petani_nama: string;
};

export function HarvestAdminDaftar({ rows }: { rows: Row[] }) {
  const columns = useMemo<ColumnDef<Row>[]>(
    () => [
      {
        id: "lokasi_panen",
        header: "Lokasi panen",
        accessorFn: (row) =>
          labelBarisProduksiUtama(partsFromSerializeSiklus(row)),
        cell: ({ row }) => (
          <span className="font-medium">
            {labelBarisProduksiUtama(partsFromSerializeSiklus(row.original))}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={row.original.status === "PENDING" ? "default" : "secondary"}>
            {labelLaporanPanenStatus(row.original.status)}
          </Badge>
        ),
      },
      {
        id: "layak",
        header: "Layak",
        accessorKey: "jumlah_layak",
        cell: ({ row }) => <span className="tabular-nums">{row.original.jumlah_layak}</span>,
      },
      {
        id: "tidak_layak",
        header: "Tidak layak",
        accessorKey: "jumlah_tidak_layak",
        cell: ({ row }) => (
          <span className="tabular-nums">{row.original.jumlah_tidak_layak}</span>
        ),
      },
      { accessorKey: "petani_nama", header: "Petani" },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={12}
      searchPlaceholder="Cari lokasi, varietas, petani, kode batch…"
      searchColumnIds={["lokasi_panen", "kode_batch", "petani_nama", "status"]}
      emptyMessage="Belum ada laporan panen."
      getRowHref={(row) => `/admin/harvest/${row.id}`}
    />
  );
}
