"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";

type Row = {
  id: number;
  kode_batch: string;
  varietas_nama: string;
  status: string;
  jumlah_layak: number;
  jumlah_tidak_layak: number;
  petani_nama: string;
};

export function HarvestAdminDaftar({ rows }: { rows: Row[] }) {
  const columns = useMemo<ColumnDef<Row>[]>(
    () => [
      {
        accessorKey: "kode_batch",
        header: "Batch",
        cell: ({ row }) => (
          <Link
            href={`/admin/harvest/${row.original.id}`}
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            {row.original.kode_batch}
          </Link>
        ),
      },
      { accessorKey: "varietas_nama", header: "Varietas" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={row.original.status === "PENDING" ? "default" : "secondary"}>
            {row.original.status}
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
      searchPlaceholder="Cari batch, varietas, petani…"
      searchColumnIds={["kode_batch", "varietas_nama", "petani_nama", "status"]}
      emptyMessage="Belum ada laporan panen."
    />
  );
}
