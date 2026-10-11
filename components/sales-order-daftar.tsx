"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/format";
import type { SoRow } from "@/components/sales-order-detail";

export type { SoRow } from "@/components/sales-order-detail";

const listHref = {
  admin: "/admin/penjualan",
  pengiriman: "/petani/pengiriman",
  owner: "/owner/penjualan",
} as const;

export function SalesOrderDaftar({
  rows,
  mode = "admin",
}: {
  rows: SoRow[];
  mode?: keyof typeof listHref;
}) {
  const columns = useMemo<ColumnDef<SoRow>[]>(
    () => [
      { accessorKey: "nomor_so", header: "Nomor SO" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge>,
      },
      { accessorKey: "pelanggan_nama", header: "Pelanggan" },
      {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => (
          <span className="tabular-nums">{formatRupiah(row.original.total)}</span>
        ),
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={10}
      searchPlaceholder="Cari SO, pelanggan, status…"
      searchColumnIds={["nomor_so", "pelanggan_nama", "status"]}
      emptyMessage="Belum ada sales order."
      getRowHref={(row) => `${listHref[mode]}/${row.id}`}
    />
  );
}
