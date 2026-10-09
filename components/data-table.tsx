"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  emptyMessage?: string;
  searchPlaceholder?: string;
  /** Column ids to include in global filter; defaults to all columns. */
  searchColumnIds?: string[];
};

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  emptyMessage = "Belum ada data.",
  searchPlaceholder,
  searchColumnIds,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: searchColumnIds?.length
      ? (row, _columnId, filterValue) => {
          const q = String(filterValue).toLowerCase();
          if (!q) return true;
          const original = row.original as Record<string, unknown>;
          return searchColumnIds.some((id) => {
            const v = original[id] ?? row.getValue(id);
            return String(v ?? "")
              .toLowerCase()
              .includes(q);
          });
        }
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="space-y-3">
      {searchPlaceholder ? (
        <Input
          value={globalFilter}
          onChange={(e) => {
            setGlobalFilter(e.target.value);
            table.setPageIndex(0);
          }}
          placeholder={searchPlaceholder}
          className="h-9 max-w-sm"
          aria-label={searchPlaceholder}
        />
      ) : null}
      <div className="overflow-x-auto border">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id} className="h-9 px-3 text-xs">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-3 py-2 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-20 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>
          {filteredCount} baris
          {table.getPageCount() > 1
            ? ` · halaman ${table.getState().pagination.pageIndex + 1}/${table.getPageCount()}`
            : null}
        </span>
        {table.getPageCount() > 1 ? (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Sebelumnya
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Berikutnya
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
