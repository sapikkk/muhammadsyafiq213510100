"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";

export type OwnerPetaniAkunRow = { id: number; nama: string; email: string };

export function OwnerPetaniAkunDaftar({ rows }: { rows: OwnerPetaniAkunRow[] }) {
  const columns = useMemo<ColumnDef<OwnerPetaniAkunRow>[]>(
    () => [
      { accessorKey: "nama", header: "Nama" },
      { accessorKey: "email", header: "Email" },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={8}
      searchPlaceholder="Cari petani…"
      searchColumnIds={["nama", "email"]}
      emptyMessage="Belum ada akun petani."
    />
  );
}
