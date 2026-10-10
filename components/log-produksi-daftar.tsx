"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { faseLabel, isFaseProduksi } from "@/lib/siklus-fase";

const waktu = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export type LogProduksiBaris = {
  fase_dari: string;
  fase_ke: string;
  catatan: string | null;
  waktu: string;
  user: { nama: string };
};

function labelFase(kode: string) {
  return isFaseProduksi(kode) ? faseLabel[kode] : kode;
}

export function LogProduksiDaftar({ rows }: { rows: LogProduksiBaris[] }) {
  const columns = useMemo<ColumnDef<LogProduksiBaris>[]>(
    () => [
      {
        id: "transisi",
        header: "Fase",
        accessorFn: (row) => `${row.fase_dari} ${row.fase_ke}`,
        cell: ({ row }) => (
          <span className="font-medium">
            {labelFase(row.original.fase_dari)} → {labelFase(row.original.fase_ke)}
          </span>
        ),
      },
      { accessorKey: "user.nama", header: "Oleh" },
      {
        accessorKey: "waktu",
        header: "Waktu",
        cell: ({ row }) => waktu.format(new Date(row.original.waktu)),
      },
      {
        accessorKey: "catatan",
        header: "Catatan",
        cell: ({ row }) => row.original.catatan ?? "—",
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={8}
      searchPlaceholder="Cari fase atau catatan…"
      searchColumnIds={["transisi", "catatan", "user.nama"]}
      emptyMessage="Belum ada log pindah fase."
    />
  );
}
