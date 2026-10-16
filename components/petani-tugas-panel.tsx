"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import type { TugasPetani } from "@/lib/tugas-petani-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { OpenDetailSheetLink } from "@/components/open-detail-sheet-link";

const waktu = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

const prioritasLabel: Record<TugasPetani["prioritas"], string> = {
  tinggi: "Penting",
  sedang: "Biasa",
  rendah: "Nanti",
};

function prioritasVariant(p: TugasPetani["prioritas"]) {
  if (p === "tinggi") return "default" as const;
  if (p === "sedang") return "secondary" as const;
  return "outline" as const;
}

export type HistoriPetaniBarisClient = {
  waktu: string;
  jenis: "fase" | "monitor" | "tambal" | "kegagalan";
  ringkasan: string;
  siklus_lokasi: string;
  siklus_kode: string;
  href: string;
};

export function PetaniTugasPanel({
  tugas,
  histori,
}: {
  tugas: TugasPetani[];
  histori: HistoriPetaniBarisClient[];
}) {
  const [historiOpen, setHistoriOpen] = useState(false);

  const tugasColumns = useMemo<ColumnDef<TugasPetani>[]>(
    () => [
      {
        accessorKey: "prioritas",
        header: "Prioritas",
        cell: ({ row }) => (
          <Badge variant={prioritasVariant(row.original.prioritas)} className="text-[10px] sm:text-xs">
            {prioritasLabel[row.original.prioritas]}
          </Badge>
        ),
      },
      {
        accessorKey: "judul",
        header: "Tugas",
        cell: ({ row }) => (
          <div className="min-w-0">
            <p className="truncate font-medium">{row.original.judul}</p>
            <p className="truncate text-xs text-muted-foreground sm:hidden">
              {row.original.deskripsi}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "deskripsi",
        header: "Detail",
        meta: { className: "hidden sm:table-cell" },
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.original.deskripsi}</span>
        ),
      },
      {
        id: "aksi",
        header: "",
        cell: ({ row }) => (
          <OpenDetailSheetLink
            href={row.original.href}
            className="text-xs font-medium text-primary underline-offset-4 hover:underline sm:text-sm"
          >
            Buka
          </OpenDetailSheetLink>
        ),
      },
    ],
    [],
  );

  const historiColumns = useMemo<ColumnDef<HistoriPetaniBarisClient>[]>(
    () => [
      {
        id: "siklus",
        header: "Lokasi",
        accessorFn: (row) => `${row.siklus_lokasi} ${row.siklus_kode}`,
        cell: ({ row }) => (
          <span className="block max-w-[7rem] truncate sm:max-w-none">{row.original.siklus_lokasi}</span>
        ),
      },
      {
        accessorKey: "ringkasan",
        header: "Ringkasan",
        cell: ({ row }) => (
          <span className="line-clamp-2 max-w-[10rem] text-sm sm:line-clamp-none sm:max-w-none">
            {row.original.ringkasan}
          </span>
        ),
      },
      {
        accessorKey: "jenis",
        header: "Jenis",
        meta: { className: "hidden md:table-cell" },
      },
      {
        accessorKey: "waktu",
        header: "Waktu",
        meta: { className: "hidden sm:table-cell" },
        cell: ({ row }) => waktu.format(new Date(row.original.waktu)),
      },
      {
        id: "link",
        header: "",
        cell: ({ row }) => (
          <OpenDetailSheetLink
            href={row.original.href}
            className="text-xs text-primary underline-offset-4 hover:underline sm:text-sm"
          >
            Detail
          </OpenDetailSheetLink>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-3 sm:space-y-4">
      <section className="space-y-2 sm:space-y-3" aria-label="Daftar tugas">
        <p className="text-sm font-medium text-muted-foreground">Tugas</p>
        <DataTable
          columns={tugasColumns}
          data={tugas}
          pageSize={3}
          hideSearchOnMobile
          searchPlaceholder="Cari tugas…"
          searchColumnIds={["judul", "deskripsi", "prioritas"]}
          emptyMessage="Tidak ada tugas terbuka."
          getRowHref={(row) => row.href}
        />
      </section>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-11 min-h-11"
          aria-expanded={historiOpen}
          onClick={() => setHistoriOpen((v) => !v)}
        >
          {historiOpen ? "Sembunyikan histori" : `Lihat histori aktivitas (${histori.length})`}
        </Button>
      </div>

      {historiOpen ? (
        <section className="space-y-2 sm:space-y-3" aria-label="Histori aktivitas">
          <DataTable
            columns={historiColumns}
            data={histori}
            pageSize={6}
            hideSearchOnMobile
            searchPlaceholder="Cari lokasi atau ringkasan…"
            searchColumnIds={["siklus", "ringkasan", "jenis"]}
            emptyMessage="Belum ada log produksi."
            getRowHref={(row) => row.href}
          />
        </section>
      ) : null}
    </div>
  );
}
