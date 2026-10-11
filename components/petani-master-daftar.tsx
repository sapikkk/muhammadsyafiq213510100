"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { PetaniMasterFormSheet } from "@/components/petani-master-form";
import { RowActions } from "@/components/row-actions";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/format";

export type PetaniMasterRow = { id: number; nama: string; gaji_bulanan: string };

export function PetaniMasterDaftar({
  rows,
  mode = "admin",
}: {
  rows: PetaniMasterRow[];
  mode?: "admin" | "owner";
}) {
  const columns = useMemo<ColumnDef<PetaniMasterRow>[]>(() => {
    const base: ColumnDef<PetaniMasterRow>[] = [
      { accessorKey: "nama", header: "Nama" },
      {
        accessorKey: "gaji_bulanan",
        header: "Gaji bulanan",
        cell: ({ row }) => (
          <span className="tabular-nums">{formatRupiah(row.original.gaji_bulanan)}</span>
        ),
      },
    ];
    if (mode === "owner") return base;
    return [
      ...base,
      {
        id: "aksi",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <RowActions
            editTrigger={
              <PetaniMasterFormSheet
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
    ];
  }, [mode]);

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
