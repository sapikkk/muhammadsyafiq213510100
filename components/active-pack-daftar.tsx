"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";
import { formatQty, formatRupiah } from "@/lib/format";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import type { ActivePackListRow } from "@/lib/active-pack-types";

export type { ActivePackListRow } from "@/lib/active-pack-types";

const basePath = {
  admin: "/admin/active-pack",
  petani: "/petani/active-pack",
} as const;

export function ActivePackDaftar({
  rows,
  mode,
}: {
  rows: ActivePackListRow[];
  mode: keyof typeof basePath;
}) {
  const columns = useMemo<ColumnDef<ActivePackListRow>[]>(
    () => [
      {
        id: "paket",
        header: "Paket",
        accessorFn: (row) =>
          `${row.item.nama} ${row.item.kode} ${row.kode}`,
        cell: ({ row }) => (
          <span className="font-medium">{row.original.item.nama}</span>
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
      searchPlaceholder="Cari nama barang…"
      searchColumnIds={["paket", "kode", "dibuatOleh.nama"]}
      emptyMessage="Belum ada paket siap pakai."
      getRowHref={(row) => `${basePath[mode]}/${row.id}`}
    />
  );
}
