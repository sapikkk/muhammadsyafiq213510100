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
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
import { cn } from "@/lib/utils";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  emptyMessage?: string;
  searchPlaceholder?: string;
  /** Column ids to include in global filter; defaults to all columns. */
  searchColumnIds?: string[];
  /** Sync search box to URL query param (e.g. `q`). */
  syncSearchParam?: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 12,
  emptyMessage = "Belum ada data.",
  searchPlaceholder,
  searchColumnIds,
  syncSearchParam,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sorting, setSorting] = useState<SortingState>([]);
  const initialQ = syncSearchParam ? (searchParams.get(syncSearchParam) ?? "") : "";
  const [globalFilter, setGlobalFilter] = useState(initialQ);
  const skipUrlSync = useRef(false);

  useEffect(() => {
    if (!syncSearchParam) return;
    const fromUrl = searchParams.get(syncSearchParam) ?? "";
    if (fromUrl !== globalFilter) {
      skipUrlSync.current = true;
      setGlobalFilter(fromUrl);
    }
  }, [searchParams, syncSearchParam, globalFilter]);

  useEffect(() => {
    if (!syncSearchParam || skipUrlSync.current) {
      skipUrlSync.current = false;
      return;
    }
    const t = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const v = globalFilter.trim();
      if (v) params.set(syncSearchParam, v);
      else params.delete(syncSearchParam);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 300);
    return () => window.clearTimeout(t);
  }, [globalFilter, pathname, router, searchParams, syncSearchParam]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    defaultColumn: { enableSorting: true },
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
      <div className="overflow-x-auto rounded-md border bg-card">
        <Table noContainer>
          <TableHeader className="sticky top-0 z-10 bg-muted/80 backdrop-blur-sm">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="hover:bg-transparent">
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "h-10 whitespace-nowrap px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        canSort && "cursor-pointer select-none",
                      )}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <span className="inline-flex items-center gap-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort ? (
                          sorted === "asc" ? (
                            <ArrowUp className="size-3.5 opacity-70" aria-hidden />
                          ) : sorted === "desc" ? (
                            <ArrowDown className="size-3.5 opacity-70" aria-hidden />
                          ) : (
                            <ChevronsUpDown className="size-3.5 opacity-40" aria-hidden />
                          )
                        ) : null}
                      </span>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={cn(index % 2 === 1 && "bg-muted/20")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-3 py-2.5 text-sm align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm text-muted-foreground"
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
