"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { financeModuleIcon } from "@/lib/nav-icons";

export type FinanceModuleRow = {
  id: string;
  label: string;
  hint: string;
  href: string;
  badge?: string;
};

export function FinanceModulesTable({ rows }: { rows: FinanceModuleRow[] }) {
  const columns = useMemo<ColumnDef<FinanceModuleRow>[]>(
    () => [
      {
        accessorKey: "label",
        header: "Modul",
        cell: ({ row }) => {
          const Icon = financeModuleIcon(row.original.id);
          return (
            <span className="inline-flex items-center gap-2 font-medium">
              <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              {row.original.label}
            </span>
          );
        },
      },
      {
        accessorKey: "badge",
        header: "Perhatian",
        cell: ({ row }) => row.original.badge ?? "—",
      },
      {
        id: "aksi",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <Button type="button" variant="outline" size="sm" className="h-8" asChild>
            <Link href={row.original.href}>Buka</Link>
          </Button>
        ),
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      pageSize={20}
      searchPlaceholder="Cari modul…"
      searchColumnIds={["label"]}
      emptyMessage="Tidak ada modul."
      getRowHref={(row) => row.href}
    />
  );
}
