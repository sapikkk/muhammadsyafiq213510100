"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";
import { formatQty, formatRupiah } from "@/lib/format";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import type { ActivePackListRow } from "@/lib/active-pack";

export type { ActivePackListRow };

export function ActivePackDaftar({ rows }: { rows: ActivePackListRow[] }) {
  const columns = useMemo<ColumnDef<ActivePackListRow>[]>(
    () => [
      { accessorKey: "kode", header: "Kode" },
      {
        id: "item",
        header: "Item",
        accessorFn: (row) => `${row.item.kode} ${row.item.nama}`,
        cell: ({ row }) => (
          <span>
            {row.original.item.kode} {row.original.item.nama}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) =>
          row.original.status === "HABIS" ? (
            <Badge variant="outline" className="border-muted-foreground">
              Habis
            </Badge>
          ) : (
            <Badge variant="secondary">Aktif</Badge>
          ),
      },
      {
        accessorKey: "biayaPerUnit",
        header: "Biaya/unit",
        cell: ({ row }) => (
          <span className="tabular-nums">{formatRupiah(row.original.biayaPerUnit)}</span>
        ),
      },
      {
        accessorKey: "hargaPack",
        header: "Harga pack",
        cell: ({ row }) => (
          <span className="tabular-nums">{formatRupiah(row.original.hargaPack)}</span>
        ),
      },
      {
        id: "sisa",
        header: "Sisa",
        accessorFn: (row) => `${row.sisaUnit} ${row.item.satuan}`,
        cell: ({ row }) => (
          <span className="tabular-nums">
            {formatQty(row.original.sisaUnit)} / {formatQty(row.original.jumlahUnit)}{" "}
            {satuanInventarisLabel[row.original.item.satuan]}
          </span>
        ),
      },
      {
        accessorKey: "dibuatOleh.nama",
        header: "Dibuat oleh",
        cell: ({ row }) => row.original.dibuatOleh.nama,
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={10}
      searchPlaceholder="Cari pack atau item…"
      searchColumnIds={["kode", "item", "dibuatOleh.nama"]}
      emptyMessage="Belum ada active pack."
    />
  );
}
