"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { formatRupiah } from "@/lib/format";

export type JurnalBarisRow = {
  id: number;
  akunLabel: string;
  debit: string;
  kredit: string;
};

export function JurnalBalanceDaftar({
  rows,
  totalDebit,
  totalKredit,
}: {
  rows: JurnalBarisRow[];
  totalDebit: string;
  totalKredit: string;
}) {
  const columns = useMemo<ColumnDef<JurnalBarisRow>[]>(
    () => [
      { accessorKey: "akunLabel", header: "Akun" },
      {
        accessorKey: "debit",
        header: () => <span className="block w-full text-right">Debit</span>,
        cell: ({ row }) => (
          <span className="block text-right tabular-nums">
            {row.original.debit ? formatRupiah(row.original.debit) : ""}
          </span>
        ),
      },
      {
        accessorKey: "kredit",
        header: () => <span className="block w-full text-right">Kredit</span>,
        cell: ({ row }) => (
          <span className="block text-right tabular-nums">
            {row.original.kredit ? formatRupiah(row.original.kredit) : ""}
          </span>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-3">
      <DataTable
        columns={columns}
        data={rows}
        pageSize={20}
        searchPlaceholder="Cari kode atau nama akun…"
        searchColumnIds={["akunLabel"]}
        emptyMessage="Tidak ada baris."
      />
      <div className="flex justify-end gap-8 border-t pt-3 text-sm font-medium">
        <p>
          Total debit{" "}
          <span className="tabular-nums">{formatRupiah(totalDebit)}</span>
        </p>
        <p>
          Total kredit{" "}
          <span className="tabular-nums">{formatRupiah(totalKredit)}</span>
        </p>
      </div>
    </div>
  );
}
