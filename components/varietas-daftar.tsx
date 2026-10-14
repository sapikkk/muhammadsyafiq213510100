"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { varietasStatusLabel, type VarietasStatus } from "@/lib/varietas-status";
import type { SerializedVarietas } from "@/lib/varietas-types";

type Row = SerializedVarietas & { rataHppPerLubang?: string | null };

const basePath = {
  admin: "/admin/varietas",
  owner: "/owner/varietas",
  petani: "/petani/varietas",
} as const;

export function VarietasDaftar({
  rows,
  mode,
}: {
  rows: Row[];
  mode: keyof typeof basePath;
}) {
  const columns = useMemo<ColumnDef<Row>[]>(() => {
    const cols: ColumnDef<Row>[] = [
      { accessorKey: "nama", header: "Nama" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span className="text-sm">
            {varietasStatusLabel[row.original.status as VarietasStatus] ?? row.original.status}
          </span>
        ),
      },
    ];
    if (mode !== "petani") {
      cols.push(
        {
          id: "harga",
          header: "Harga",
          cell: ({ row }) => (
            <span className="text-muted-foreground">
              Benih {row.original.hargaBenihPerGram}/g · curah {row.original.hargaJualCurah} · pack{" "}
              {row.original.hargaJualPack}
            </span>
          ),
        },
        {
          id: "rataHpp",
          header: "HPP rata/lubang",
          cell: ({ row }) => (
            <span className="text-muted-foreground">
              {"rataHppPerLubang" in row.original && row.original.rataHppPerLubang
                ? `Rp ${row.original.rataHppPerLubang}`
                : "—"}
            </span>
          ),
        },
      );
    }
    cols.push({
      id: "siklus",
      header: "Siklus",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.jumlahSiklus > 0 ? row.original.jumlahSiklus : "—"}
        </span>
      ),
    });
    return cols;
  }, [mode]);

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={10}
      searchPlaceholder="Cari varietas…"
      searchColumnIds={["nama"]}
      emptyMessage="Belum ada varietas."
      getRowHref={(row) => `${basePath[mode]}/${row.id}`}
    />
  );
}
