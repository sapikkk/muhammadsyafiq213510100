"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { labelUmurPiutang, type PiutangPenjualanRow } from "@/lib/piutang-penjualan-types";

export function PiutangPenjualanDaftar({ rows }: { rows: PiutangPenjualanRow[] }) {
  const columns = useMemo<ColumnDef<PiutangPenjualanRow>[]>(
    () => [
      { accessorKey: "nomor_so", header: "Pesanan" },
      { accessorKey: "pelanggan_nama", header: "Pelanggan" },
      {
        accessorKey: "sisa_piutang",
        header: "Sisa piutang",
        cell: ({ row }) => (
          <span className="tabular-nums font-medium">{formatRupiah(row.original.sisa_piutang)}</span>
        ),
      },
      {
        accessorKey: "hari_tertunggak",
        header: "Hari",
        cell: ({ row }) => (
          <span className="tabular-nums">{row.original.hari_tertunggak}</span>
        ),
      },
      {
        accessorKey: "umur",
        header: "Umur",
        cell: ({ row }) => (
          <Badge
            variant="secondary"
            className={row.original.umur === "90plus" ? "border-destructive/50 text-destructive" : undefined}
          >
            {labelUmurPiutang[row.original.umur]}
          </Badge>
        ),
      },
      {
        id: "terkirim",
        header: "Terkirim",
        cell: ({ row }) =>
          row.original.terkirim_pada ? formatTanggal(new Date(row.original.terkirim_pada)) : "—",
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={10}
      searchPlaceholder="Cari pesanan atau pelanggan…"
      searchColumnIds={["nomor_so", "pelanggan_nama"]}
      emptyMessage="Tidak ada pesanan dengan sisa piutang."
      getRowHref={(row) => `/admin/penjualan/${row.id}`}
    />
  );
}

export { PiutangRingkasanPanel as PiutangRingkasanUmur } from "@/components/piutang-umur-chart";
