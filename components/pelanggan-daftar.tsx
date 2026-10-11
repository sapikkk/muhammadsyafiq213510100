"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { PelangganFormSheet } from "@/components/pelanggan-form";
import { RowActions } from "@/components/row-actions";
import { Button } from "@/components/ui/button";

export type PelangganRow = {
  id: number;
  nama: string;
  alamat: string;
  no_telepon: string;
  email: string;
};

export function PelangganDaftar({ rows }: { rows: PelangganRow[] }) {
  const columns = useMemo<ColumnDef<PelangganRow>[]>(
    () => [
      { accessorKey: "nama", header: "Nama" },
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
    />
  );
}
