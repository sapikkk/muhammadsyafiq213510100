"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { formatQty } from "@/lib/format";
import type { SerializedPergerakan } from "@/lib/inventaris";
import { satuanInventarisLabel } from "@/lib/inventaris-satuan";
import { tipePergerakanLabel } from "@/lib/inventaris-pergerakan";

const waktu = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export function InventarisRiwayat({ rows }: { rows: SerializedPergerakan[] }) {
  const columns = useMemo<ColumnDef<SerializedPergerakan>[]>(
    () => [
      {
        accessorKey: "tipe",
        header: "Tipe",
        cell: ({ row }) => tipePergerakanLabel[row.original.tipe],
      },
      {
        id: "item",
        header: "Item",
        accessorFn: (row) => `${row.item.kode} ${row.item.nama}`,
      },
      {
        id: "jumlah",
        header: "Jumlah",
        cell: ({ row }) => (
          <span className="tabular-nums">
            {formatQty(row.original.jumlah)}{" "}
            {satuanInventarisLabel[row.original.item.satuan]}
          </span>
        ),
      },
      {
        id: "stok",
        header: "Stok",
        cell: ({ row }) => (
          <span className="tabular-nums text-muted-foreground">
            {formatQty(row.original.stokSebelum)} → {formatQty(row.original.stokSesudah)}
          </span>
        ),
      },
      { accessorKey: "user.nama", header: "Oleh" },
      {
        accessorKey: "dibuatPada",
        header: "Waktu",
        cell: ({ row }) => waktu.format(new Date(row.original.dibuatPada)),
      },
      {
        accessorKey: "keterangan",
        header: "Keterangan",
        cell: ({ row }) => row.original.keterangan ?? "—",
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={10}
      searchPlaceholder="Cari item, user, keterangan…"
      searchColumnIds={["item", "user.nama", "keterangan", "tipe"]}
      emptyMessage="Belum ada pergerakan stok."
    />
  );
}
