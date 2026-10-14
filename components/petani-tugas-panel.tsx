"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import type { TugasPetani } from "@/lib/tugas-petani-types";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";

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
  const tugasColumns = useMemo<ColumnDef<TugasPetani>[]>(
    () => [
      {
        accessorKey: "prioritas",
        header: "Prioritas",
        cell: ({ row }) => (
          <Badge variant={prioritasVariant(row.original.prioritas)}>
            {prioritasLabel[row.original.prioritas]}
          </Badge>
        ),
      },
      { accessorKey: "judul", header: "Tugas" },
      {
        accessorKey: "deskripsi",
        header: "Detail",
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.original.deskripsi}</span>
        ),
      },
      {
        id: "aksi",
        header: "",
        cell: ({ row }) => (
          <Link
            href={row.original.href}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Buka
          </Link>
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
        cell: ({ row }) => row.original.siklus_lokasi,
      },
      { accessorKey: "ringkasan", header: "Ringkasan" },
      { accessorKey: "jenis", header: "Jenis" },
      {
        accessorKey: "waktu",
        header: "Waktu",
        cell: ({ row }) => waktu.format(new Date(row.original.waktu)),
      },
      {
        id: "link",
        header: "",
        cell: ({ row }) => (
          <Link href={row.original.href} className="text-primary underline-offset-4 hover:underline">
            Detail
          </Link>
        ),
      },
    ],
    [],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="space-y-3" aria-label="Daftar tugas">
        <p className="text-sm font-medium text-muted-foreground">Tugas</p>
        <DataTable
          columns={tugasColumns}
          data={tugas}
          pageSize={8}
          searchPlaceholder="Cari tugas…"
          searchColumnIds={["judul", "deskripsi", "prioritas"]}
          emptyMessage="Tidak ada tugas terbuka."
        />
      </section>

      <section className="space-y-3" aria-label="Histori aktivitas">
        <p className="text-sm font-medium text-muted-foreground">Histori</p>
        <DataTable
          columns={historiColumns}
          data={histori}
          pageSize={8}
          searchPlaceholder="Cari lokasi atau ringkasan…"
          searchColumnIds={["siklus", "ringkasan", "jenis"]}
          emptyMessage="Belum ada log produksi."
        />
      </section>
    </div>
  );
}
