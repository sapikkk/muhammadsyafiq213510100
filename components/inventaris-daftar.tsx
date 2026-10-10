"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { formatQty } from "@/lib/format";
import type { SerializedItemInventaris } from "@/lib/inventaris-types";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";

export function InventarisDaftar({ items }: { items: SerializedItemInventaris[] }) {
  const columns = useMemo<ColumnDef<SerializedItemInventaris>[]>(
    () => [
      {
        accessorKey: "kode",
        header: "Kode",
        cell: ({ row }) => (
          <span className="font-medium">
            {row.original.kode} · {row.original.nama}
          </span>
        ),
      },
      {
        id: "stok",
        header: "Stok",
        cell: ({ row }) => (
          <span>
            {formatQty(row.original.stokSaatIni)}{" "}
            {satuanInventarisLabel[row.original.satuan]}
          </span>
        ),
      },
      {
        id: "minimum",
        header: "Minimum",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {formatQty(row.original.stokMinimum)}{" "}
            {satuanInventarisLabel[row.original.satuan]}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) =>
          row.original.diBawahMinimum ? (
            <span className="border border-foreground px-1.5 py-0.5 text-xs">Di bawah minimum</span>
          ) : (
            <span className="text-xs text-muted-foreground">OK</span>
          ),
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={items}
      pageSize={12}
      searchPlaceholder="Cari kode atau nama…"
      searchColumnIds={["kode", "nama"]}
      emptyMessage="Belum ada item inventaris."
    />
  );
}
