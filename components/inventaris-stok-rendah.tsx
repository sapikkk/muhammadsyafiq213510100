"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";
import { formatQty } from "@/lib/format";
import type { SerializedAlertStok } from "@/lib/inventaris-types";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";

type Props = {
  items: SerializedAlertStok[];
  showRestockHint?: boolean;
};

export function InventarisStokRendah({ items, showRestockHint = false }: Props) {
  const columns = useMemo<ColumnDef<SerializedAlertStok>[]>(
    () => [
      {
        id: "nama",
        header: "Item",
        accessorFn: (row) => `${row.kode} ${row.nama}`,
        cell: ({ row }) => (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">
              {row.original.kode} · {row.original.nama}
            </span>
            <Badge variant="outline" className="border-destructive text-destructive">
              Stok rendah
            </Badge>
          </div>
        ),
      },
      {
        id: "stok",
        header: "Stok",
        cell: ({ row }) => (
          <span className="tabular-nums text-destructive">
            {formatQty(row.original.stokSaatIni)}{" "}
            {satuanInventarisLabel[row.original.satuan]}
          </span>
        ),
      },
      {
        id: "minimum",
        header: "Minimum",
        cell: ({ row }) => (
          <span className="tabular-nums text-muted-foreground">
            {formatQty(row.original.stokMinimum)}{" "}
            {satuanInventarisLabel[row.original.satuan]}
          </span>
        ),
      },
      {
        accessorKey: "kekurangan",
        header: "Kekurangan",
        cell: ({ row }) =>
          row.original.kekurangan !== "0" ? (
            <span className="tabular-nums font-medium">
              {formatQty(row.original.kekurangan)}{" "}
              {satuanInventarisLabel[row.original.satuan]}
            </span>
          ) : (
            "—"
          ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-3">
      <DataTable
        columns={columns}
        data={items}
        pageSize={10}
        searchPlaceholder="Cari kode atau nama item…"
        searchColumnIds={["nama", "kode"]}
        emptyMessage="Semua stok di atas minimum. Tidak ada alert saat ini."
      />
      {showRestockHint && items.length > 0 ? (
        <Link
          href="/admin/inventaris"
          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Catat pembelian di inventaris
        </Link>
      ) : null}
    </div>
  );
}
