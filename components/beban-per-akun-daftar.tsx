"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import type { CostSlice, DrilldownRow } from "@/lib/cost-breakdown-types";
import { formatRupiah } from "@/lib/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function BebanPerAkunDaftar({
  slices,
  baseQuery,
}: {
  slices: CostSlice[];
  baseQuery: string;
}) {
  const columns = useMemo<ColumnDef<CostSlice>[]>(
    () => [
      {
        accessorKey: "nama",
        header: "Akun beban",
        cell: ({ row }) => (
          <span className="block max-w-[14rem] truncate text-sm sm:max-w-md" title={row.original.nama}>
            {row.original.nama}
          </span>
        ),
      },
      {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => (
          <span className="tabular-nums font-medium">{formatRupiah(row.original.total)}</span>
        ),
      },
      {
        accessorKey: "persen",
        header: "Bagian",
        cell: ({ row }) => (
          <span className="tabular-nums">{row.original.persen.toFixed(1)}%</span>
        ),
      },
      {
        id: "aksi",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <Link
            href={`/owner/biaya?${baseQuery}&akunId=${row.original.akunId}`}
            className="text-sm text-primary hover:underline"
          >
            Rincian
          </Link>
        ),
      },
    ],
    [baseQuery],
  );

  if (slices.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Belum ada beban tercatat di catatan keuangan sudah disetujui untuk periode ini.
      </p>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={slices}
      pageSize={15}
      searchPlaceholder="Cari kode atau nama akun…"
      searchColumnIds={["kode", "nama"]}
      emptyMessage="Tidak ada beban."
      getRowHref={(row) => `/owner/biaya?${baseQuery}&akunId=${row.akunId}`}
    />
  );
}

export function BebanDrilldownDaftar({
  rows,
  tutupHref,
}: {
  rows: DrilldownRow[];
  tutupHref: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <Link href={tutupHref} className="text-xs text-primary hover:underline">
          Tutup rincian
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Jurnal</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Keterangan</TableHead>
            <TableHead className="text-right">Nominal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={`${row.jurnalId}-${i}`}>
              <TableCell>
                <Link href={`/owner/jurnal/${row.jurnalId}`} className="text-primary hover:underline">
                  Buka catatan
                </Link>
              </TableCell>
              <TableCell>{row.tanggal}</TableCell>
              <TableCell className="max-w-md truncate text-muted-foreground">{row.keterangan}</TableCell>
              <TableCell className="text-right tabular-nums">{formatRupiah(row.nominal)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
