"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { OpenDetailSheetLink } from "@/components/open-detail-sheet-link";
import { useRouter } from "next/navigation";
import { Fragment, useMemo, useState, type ReactNode } from "react";
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
import { formatRupiah, formatTanggal } from "@/lib/format";
import { statusJurnalLabel, type StatusJurnalKey } from "@/lib/jurnal-status";
import type { SerializedJurnalListRow } from "@/lib/jurnal-types";
import { cn } from "@/lib/utils";

export type JurnalDaftarRow = SerializedJurnalListRow;

const PAGE_SIZE = 15;

export function JurnalDaftar({
  rows,
  detailPrefix,
  emptyMessage = "Belum ada catatan keuangan.",
  listActions,
}: {
  rows: JurnalDaftarRow[];
  detailPrefix: "/admin/jurnal" | "/owner/jurnal";
  emptyMessage?: string;
  /** Tombol filter / aksi di baris yang sama dengan pencarian. */
  listActions?: ReactNode;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set());

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter(
      (r) =>
        r.keterangan.toLowerCase().includes(needle) ||
        r.dibuatOlehNama.toLowerCase().includes(needle) ||
        r.baris.some((b) => b.akunNama.toLowerCase().includes(needle)),
    );
  }, [rows, q]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(pageIndex, pageCount - 1);
  const pageRows = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  function toggleExpand(id: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const searchRow = (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
      <Input
        className={cn("h-11 min-w-0", listActions ? "flex-1" : "max-w-md")}
        placeholder="Cari keterangan atau nama akun…"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setPageIndex(0);
        }}
        aria-label="Cari jurnal"
      />
      {listActions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{listActions}</div>
      ) : null}
    </div>
  );

  if (rows.length === 0) {
    const needle = q.trim();
    return (
      <div className="space-y-4">
        {searchRow}
        <p className="text-sm text-muted-foreground">
          {needle ? "Tidak ada catatan cocok pencarian." : emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {searchRow}

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Tidak ada catatan cocok pencarian.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10" aria-label="Buka rincian" />
                  <TableHead className="w-[7.5rem]">Tanggal</TableHead>
                  <TableHead>Keterangan</TableHead>
                  <TableHead className="w-[7rem]">Status</TableHead>
                  <TableHead className="text-right w-[8.5rem]">Debit</TableHead>
                  <TableHead className="text-right w-[8.5rem]">Kredit</TableHead>
                  <TableHead className="w-[5rem]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.map((row) => {
                  const open = expanded.has(row.id);
                  return (
                    <Fragment key={row.id}>
                      <TableRow
                        className="cursor-pointer align-top transition-colors hover:bg-muted/30"
                        onClick={(e) => {
                          const target = e.target as HTMLElement | null;
                          if (
                            target?.closest(
                              "button, a, input, [role='button'], [data-prevent-row-click]",
                            )
                          ) {
                            return;
                          }
                          router.push(`${detailPrefix}/${row.id}`, { scroll: false });
                        }}
                        onMouseEnter={() => router.prefetch(`${detailPrefix}/${row.id}`)}
                      >
                        <TableCell>
                          <button
                            type="button"
                            className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border border-transparent hover:bg-muted/60"
                            aria-expanded={open}
                            aria-label={open ? "Tutup rincian baris jurnal" : "Buka rincian baris jurnal"}
                            onClick={() => toggleExpand(row.id)}
                          >
                            {open ? (
                              <ChevronDown className="size-4" aria-hidden />
                            ) : (
                              <ChevronRight className="size-4" aria-hidden />
                            )}
                          </button>
                        </TableCell>
                        <TableCell className="text-sm tabular-nums whitespace-nowrap">
                          {formatTanggal(new Date(row.tanggalIso))}
                        </TableCell>
                        <TableCell className="max-w-[18rem]">
                          <p className={cn("text-sm font-medium", !open && "line-clamp-1")}>
                            {row.keterangan}
                          </p>
                          <p className="text-xs text-muted-foreground">{row.dibuatOlehNama}</p>
                        </TableCell>
                        <TableCell className="text-xs">
                          {statusJurnalLabel[row.status as StatusJurnalKey]}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-sm">
                          {formatRupiah(row.totalDebit)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-sm">
                          {formatRupiah(row.totalKredit)}
                        </TableCell>
                        <TableCell>
                          <OpenDetailSheetLink
                            href={`${detailPrefix}/${row.id}`}
                            className="inline-flex min-h-9 items-center text-xs font-medium text-primary hover:underline"
                          >
                            Detail
                          </OpenDetailSheetLink>
                        </TableCell>
                      </TableRow>
                      {open ? (
                        <TableRow className="bg-muted/20 hover:bg-muted/20">
                          <TableCell colSpan={7} className="p-0">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Akun</TableHead>
                                  <TableHead className="text-right w-[8.5rem]">Debit</TableHead>
                                  <TableHead className="text-right w-[8.5rem]">Kredit</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {row.baris.map((b) => (
                                  <TableRow key={b.id}>
                                    <TableCell className="text-sm">{b.akunNama}</TableCell>
                                    <TableCell className="text-right tabular-nums text-sm">
                                      {b.debit ? formatRupiah(b.debit) : ""}
                                    </TableCell>
                                    <TableCell className="text-right tabular-nums text-sm">
                                      {b.kredit ? formatRupiah(b.kredit) : ""}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <p className="text-muted-foreground">
              {filtered.length} catatan · halaman {safePage + 1} dari {pageCount}
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9"
                disabled={safePage <= 0}
                onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
              >
                Sebelumnya
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9"
                disabled={safePage >= pageCount - 1}
                onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))}
              >
                Berikutnya
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
