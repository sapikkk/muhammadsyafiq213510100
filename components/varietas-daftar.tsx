"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { varietasStatusLabel, type VarietasStatus } from "@/lib/varietas-status";
import type { serializeVarietas } from "@/lib/varietas";

type Row = ReturnType<typeof serializeVarietas>;

export function VarietasDaftar({ rows }: { rows: Row[] }) {
  const columns = useMemo<ColumnDef<Row>[]>(
    () => [
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
        id: "siklus",
        header: "Siklus",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.jumlahSiklus > 0 ? row.original.jumlahSiklus : "—"}
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
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={10}
      searchPlaceholder="Cari varietas…"
      searchColumnIds={["nama"]}
      emptyMessage="Belum ada varietas."
    />
  );
}
