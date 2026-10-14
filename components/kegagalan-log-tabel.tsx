"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
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
import type { OwnerKegagalanLogRow } from "@/lib/owner-kegagalan-susut";

const PAGE_SIZE = 12;

export function KegagalanLogTabel({
  rows,
  showKategori = false,
  emptyMessage = "Belum ada catatan.",
}: {
  rows: OwnerKegagalanLogRow[];
  showKategori?: boolean;
  emptyMessage?: string;
}) {
  const [q, setQ] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set());

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter(
      (r) =>
        r.merk.toLowerCase().includes(needle) ||
        r.varietas.toLowerCase().includes(needle) ||
        r.penyebab.toLowerCase().includes(needle) ||
        r.kodeBatch.toLowerCase().includes(needle),
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

  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-4">
      <Input
        className="h-11 max-w-md"
        placeholder="Cari merk, varietas, penyebab…"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setPageIndex(0);
        }}
        aria-label="Cari catatan kegagalan"
      />
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Tidak ada baris cocok pencarian.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10" />
                  <TableHead>Merk</TableHead>
                  <TableHead>Varietas</TableHead>
                  <TableHead className="text-right w-[5rem]">Susut</TableHead>
                  <TableHead>Penyebab</TableHead>
                  <TableHead className="w-[7rem]">Tanggal</TableHead>
                  {showKategori ? <TableHead>Klasifikasi</TableHead> : null}
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.map((row) => {
                  const open = expanded.has(row.id);
                  return (
                    <Fragment key={row.id}>
                      <TableRow className="align-top">
                        <TableCell>
                          <button
                            type="button"
                            className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md hover:bg-muted/60"
                            aria-expanded={open}
                            aria-label={open ? "Tutup detail lokasi" : "Buka detail lokasi"}
                            onClick={() => toggleExpand(row.id)}
                          >
                            {open ? (
                              <ChevronDown className="size-4" aria-hidden />
                            ) : (
                              <ChevronRight className="size-4" aria-hidden />
                            )}
                          </button>
                        </TableCell>
                        <TableCell className="text-sm font-medium">{row.merk}</TableCell>
                        <TableCell className="text-sm">{row.varietas}</TableCell>
                        <TableCell className="text-right tabular-nums text-sm">{row.susut}</TableCell>
                        <TableCell className="max-w-[14rem] text-sm text-muted-foreground">
                          <span className={open ? "" : "line-clamp-1"}>{row.penyebab}</span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm tabular-nums">
                          {row.tanggalLabel}
                        </TableCell>
                        {showKategori ? (
                          <TableCell className="text-sm">{row.kategori}</TableCell>
                        ) : null}
                      </TableRow>
                      {open ? (
                        <TableRow className="bg-muted/20 hover:bg-muted/20">
                          <TableCell colSpan={showKategori ? 7 : 6} className="text-sm">
                            <dl className="grid gap-1 sm:grid-cols-2">
                              <div>
                                <dt className="text-muted-foreground">Kolam</dt>
                                <dd className="font-medium">{row.kolam}</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Greenhouse</dt>
                                <dd className="font-medium">{row.greenhouse}</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Lahan</dt>
                                <dd className="font-medium">{row.lahan}</dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">Batch / tahap</dt>
                                <dd className="font-medium">
                                  {row.kodeBatch} · {row.tahapLabel}
                                </dd>
                              </div>
                            </dl>
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
