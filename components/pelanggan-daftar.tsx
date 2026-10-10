"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";

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
