"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";

export type LaporanExportRow = {
  id: string;
  judul: string;
  deskripsi: string;
  href: string;
};

export function LaporanExportDaftar({ rows }: { rows: LaporanExportRow[] }) {
  const showDeskripsi = rows.some((r) => r.deskripsi.trim());
  const columns = useMemo<ColumnDef<LaporanExportRow>[]>(
    () => [
      { accessorKey: "judul", header: "Laporan" },
      ...(showDeskripsi
        ? [
            {
              accessorKey: "deskripsi" as const,
              header: "Deskripsi",
              cell: ({ row }: { row: { original: LaporanExportRow } }) => (
                <span className="text-muted-foreground">{row.original.deskripsi}</span>
              ),
            },
          ]
        : []),
      {
        id: "aksi",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <Button type="button" variant="outline" size="sm" className="h-8" asChild>
            <Link href={row.original.href}>Unduh PDF</Link>
          </Button>
        ),
      },
    ],
    [showDeskripsi],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={10}
      searchPlaceholder="Cari jenis laporan…"
      searchColumnIds={["judul", "deskripsi"]}
      emptyMessage="Tidak ada laporan."
    />
  );
}
