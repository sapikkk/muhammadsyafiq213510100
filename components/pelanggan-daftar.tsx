"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { ubahStatusPelanggan } from "@/app/actions/pelanggan";
import { AktifToggleDialog } from "@/components/aktif-toggle-dialog";
import { PelangganFormSheet } from "@/components/pelanggan-form";
import { RowActions } from "@/components/row-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type PelangganRow = {
  id: number;
  nama: string;
  alamat: string;
  no_telepon: string;
  email: string;
  aktif: boolean;
};

export function PelangganDaftar({ rows }: { rows: PelangganRow[] }) {
  const columns = useMemo<ColumnDef<PelangganRow>[]>(
    () => [
      {
        accessorKey: "nama",
        header: "Nama",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="font-medium">{row.original.nama}</span>
            {!row.original.aktif ? (
              <Badge variant="outline" className="text-xs">
                Nonaktif
              </Badge>
            ) : null}
          </div>
        ),
      },
      { accessorKey: "alamat", header: "Alamat" },
      {
        id: "kontak",
        header: "Kontak",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.no_telepon} · {row.original.email}
          </span>
        ),
      },
      {
        id: "aksi",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <RowActions
            editTrigger={
              <PelangganFormSheet
                initial={row.original}
                trigger={
                  <Button type="button" variant="outline" size="sm" className="h-8 px-2.5 text-xs">
                    Ubah
                  </Button>
                }
              />
            }
            deactivateTrigger={
              <AktifToggleDialog
                id={row.original.id}
                aktif={row.original.aktif}
                idFieldName="pelangganId"
                action={ubahStatusPelanggan}
                label={row.original.nama}
                offDescription="Pelanggan nonaktif tidak muncul saat buat pesanan jual baru."
                onDescription="Pelanggan aktif kembali bisa dipilih saat buat pesanan jual."
              />
            }
          />
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
      searchPlaceholder="Cari pelanggan…"
      searchColumnIds={["nama", "alamat", "email"]}
      emptyMessage="Belum ada pelanggan."
      getRowHref={(row) => `/admin/pelanggan/${row.id}`}
    />
  );
}
