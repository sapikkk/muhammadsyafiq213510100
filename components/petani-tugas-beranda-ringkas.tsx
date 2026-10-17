"use client";

import Link from "next/link";
import { useState } from "react";
import type { TugasPetani } from "@/lib/tugas-petani-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HistoriPetaniBarisClient } from "@/components/petani-tugas-panel";
import { OpenDetailSheetLink } from "@/components/open-detail-sheet-link";

const waktu = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});

const prioritasLabel: Record<TugasPetani["prioritas"], string> = {
  tinggi: "Penting",
  sedang: "Biasa",
  rendah: "Nanti",
};

const MAX_BARIS = 3;

export function PetaniTugasBerandaRingkas({
  tugas,
  histori,
}: {
  tugas: TugasPetani[];
  histori: HistoriPetaniBarisClient[];
}) {
  const [historiOpen, setHistoriOpen] = useState(false);
  const tugasTampil = tugas.slice(0, MAX_BARIS);
  const historiTampil = histori.slice(0, MAX_BARIS);

  return (
    <div className="flex min-h-0 flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">Tugas hari ini</p>
      <ul className="space-y-1" aria-label="Tugas teratas">
        {tugasTampil.length === 0 ? (
          <li className="text-xs text-muted-foreground">Tidak ada tugas terbuka.</li>
        ) : (
          tugasTampil.map((t) => (
            <li key={t.id}>
              <OpenDetailSheetLink
                href={t.href}
                className="flex items-start gap-2 rounded-md border border-border/80 px-2 py-1.5 text-xs hover:bg-muted/40"
              >
                <Badge variant="secondary" className="shrink-0 text-[10px]">
                  {prioritasLabel[t.prioritas]}
                </Badge>
                <span className="min-w-0 flex-1 font-medium leading-snug line-clamp-2">{t.judul}</span>
              </OpenDetailSheetLink>
            </li>
          ))
        )}
      </ul>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9 w-full text-xs"
        aria-expanded={historiOpen}
        onClick={() => setHistoriOpen((v) => !v)}
      >
        {historiOpen ? "Sembunyikan histori" : `Lihat histori (${histori.length})`}
      </Button>

      {historiOpen ? (
        <ul className="space-y-1" aria-label="Histori terbaru">
          {historiTampil.length === 0 ? (
            <li className="text-xs text-muted-foreground">Belum ada log produksi.</li>
          ) : (
            historiTampil.map((h, i) => (
              <li key={`${h.waktu}-${i}`}>
                <OpenDetailSheetLink
                  href={h.href}
                  className="block rounded-md border border-border/80 px-2 py-1.5 text-xs hover:bg-muted/40"
                >
                  <p className="font-medium leading-snug line-clamp-1">{h.ringkasan}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {h.siklus_lokasi} · {waktu.format(new Date(h.waktu))}
                  </p>
                </OpenDetailSheetLink>
              </li>
            ))
          )}
        </ul>
      ) : null}

      <div className="mt-auto flex justify-end pt-0.5">
        <Link
          href="/petani/siklus"
          scroll={false}
          className="text-xs font-medium text-primary underline-offset-4 hover:underline"
        >
          {tugas.length > MAX_BARIS
            ? "Lihat semua tugas"
            : historiOpen && histori.length > MAX_BARIS
              ? "Histori lengkap"
              : "Buka siklus tanam"}
        </Link>
      </div>
    </div>
  );
}
