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

function prioritasVariant(p: TugasPetani["prioritas"]) {
  if (p === "tinggi") return "default" as const;
  if (p === "sedang") return "secondary" as const;
  return "outline" as const;
}

export type HistoriPetaniBarisClient = {
  waktu: string;
  jenis: "fase" | "monitor" | "tambal" | "kegagalan";
  ringkasan: string;
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
            {row.original.prioritas}
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
      { accessorKey: "siklus_kode", header: "Batch" },
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
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tugas hari ini</h2>
        <DataTable
          columns={tugasColumns}
          data={tugas}
          pageSize={8}
          searchPlaceholder="Cari tugas…"
          searchColumnIds={["judul", "deskripsi", "prioritas"]}
          emptyMessage="Tidak ada tugas terbuka. Batch aktif sudah up to date."
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Histori aktivitas</h2>
        <DataTable
          columns={historiColumns}
          data={histori}
          pageSize={8}
          searchPlaceholder="Cari batch atau ringkasan…"
          searchColumnIds={["siklus_kode", "ringkasan", "jenis"]}
          emptyMessage="Belum ada log produksi."
        />
      </section>
    </div>
  );
}
