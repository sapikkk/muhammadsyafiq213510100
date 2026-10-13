"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { EksporLembar } from "@/components/ekspor-lembar";
import { Button } from "@/components/ui/button";

export type LaporanExportRow = {
  id: string;
  judul: string;
  jenisPratinjau: string;
  unduhPath: string;
};

export function LaporanExportDaftar({
  rows,
  dari,
  sampai,
}: {
  rows: LaporanExportRow[];
  dari: string;
  sampai: string;
}) {
  const columns = useMemo<ColumnDef<LaporanExportRow>[]>(
    () => [
      { accessorKey: "judul", header: "Laporan" },
      {
        id: "aksi",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <EksporLembar
            judulTombol="Ekspor"
            unduhPath={row.original.unduhPath}
            pratinjauPath={`/api/export/preview?jenis=${encodeURIComponent(row.original.jenisPratinjau)}`}
            rentang="bulan"
            defaultDari={dari}
            defaultSampai={sampai}
            trigger={
              <Button type="button" variant="outline" size="sm" className="h-8">
                Ekspor
              </Button>
            }
          />
        ),
      },
    ],
    [dari, sampai],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={10}
      searchPlaceholder="Cari jenis laporan…"
      searchColumnIds={["judul"]}
      emptyMessage="Tidak ada laporan."
    />
  );
}
