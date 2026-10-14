"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { EksporLembar } from "@/components/ekspor-lembar";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/format";
import { labelSalesOrderStatus } from "@/lib/sales-order-status";

export type PelangganRiwayatRow = {
  id: number;
  nomor_so: string;
  nomor_invoice: string | null;
  status: string;
  dibuat_pada: string;
  omzet: string;
  hpp_total: string;
  margin: string;
  baris: {
    id: number;
    produksi: string;
    jumlah: string;
    harga_satuan: string;
    subtotal: string;
    hpp_order: string;
  }[];
};

export function PelangganRiwayatPanel({
  pelangganId,
  rows,
}: {
  pelangganId: number;
  rows: PelangganRiwayatRow[];
}) {
  const fmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" });

  const columns = useMemo<ColumnDef<PelangganRiwayatRow>[]>(
    () => [
      {
        accessorKey: "nomor_so",
        header: "Pesanan jual",
        cell: ({ row }) => <span className="font-medium">{row.original.nomor_so}</span>,
      },
      {
        id: "tanggal",
        header: "Tanggal",
        cell: ({ row }) => fmt.format(new Date(row.original.dibuat_pada)),
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => labelSalesOrderStatus(row.original.status),
      },
      {
        id: "omzet",
        header: "Omzet",
        cell: ({ row }) => formatRupiah(row.original.omzet),
      },
      {
        id: "hpp",
        header: "HPP (internal)",
        cell: ({ row }) => (
          <span className="text-muted-foreground">{formatRupiah(row.original.hpp_total)}</span>
        ),
      },
      {
        id: "margin",
        header: "Margin",
        cell: ({ row }) => formatRupiah(row.original.margin),
      },
    ],
    [fmt],
  );

  return (
    <div className="space-y-4">
      <EksporLembar
        judulTombol="Ekspor riwayat"
        unduhPath={`/api/export/pelanggan/${pelangganId}`}
        pratinjauPath={`/api/export/preview?jenis=pelanggan-riwayat&pelangganId=${pelangganId}`}
        rentang="tanggal"
        defaultDari={new Date().toISOString().slice(0, 10)}
        defaultSampai={new Date().toISOString().slice(0, 10)}
        sembunyikanRentang
        trigger={
          <Button type="button" variant="outline" className="h-11">
            Ekspor riwayat
          </Button>
        }
      />
      <DataTable
        columns={columns}
        data={rows}
        pageSize={10}
        searchPlaceholder="Cari pesanan…"
        searchColumnIds={["nomor_so"]}
        emptyMessage="Belum ada pesanan untuk pelanggan ini."
        getRowHref={(row) => `/admin/penjualan/${row.id}`}
      />
    </div>
  );
}
