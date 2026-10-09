"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { formatRupiah } from "@/lib/format";

type Row = { id: number; nama: string; gaji_bulanan: string };

export function PetaniMasterDaftar({ rows }: { rows: Row[] }) {
  const columns = useMemo<ColumnDef<Row>[]>(
    () => [
      { accessorKey: "nama", header: "Nama" },
      {
        accessorKey: "gaji_bulanan",
        header: "Gaji bulanan",
        cell: ({ row }) => (
          <span className="tabular-nums">{formatRupiah(row.original.gaji_bulanan)}</span>
        ),
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={12}
      searchPlaceholder="Cari petani…"
      searchColumnIds={["nama"]}
      emptyMessage="Belum ada data petani (ERD)."
    />
  );
}
