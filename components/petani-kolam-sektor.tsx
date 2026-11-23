"use client";

import { useState } from "react";
import { MonitorKolamForm } from "@/components/monitor-kolam-form";
import { KegagalanForm } from "@/components/kegagalan-form";
import { KolamRiwayatSpark } from "@/components/kolam-riwayat-spark";
import { PetaniSemaiSingkatForm } from "@/components/petani-semai-singkat-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SektorKolamPapan } from "@/lib/petani-kolam-papan-types";
import { cn } from "@/lib/utils";

type Mode = "semai" | "air" | "gagal" | null;

export function PetaniKolamSektor({ sektor }: { sektor: SektorKolamPapan }) {
  const [mode, setMode] = useState<Mode>(null);
  const t = sektor.tindakan;

  return (
    <article className="flex flex-col gap-3 rounded-md border border-border p-3">
      <header>
        <h2 className="text-lg font-semibold">{sektor.nama}</h2>
        {sektor.greenhouse ? (
          <p className="text-sm text-muted-foreground">{sektor.greenhouse}</p>
        ) : null}
      </header>

      {sektor.kosong ? (
        <p className="text-sm">Kosong. Siap semai.</p>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-sm">
            {sektor.siklus?.sayur} · {sektor.siklus?.fase}
          </p>
          {sektor.bacaanTerakhir ? (
            <p className="text-sm tabular-nums">
              pH {sektor.bacaanTerakhir.ph.toFixed(2)} · PPM{" "}
              {Math.round(sektor.bacaanTerakhir.ppm)} · {sektor.bacaanTerakhir.suhu.toFixed(1)} °C
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Belum catat air.</p>
          )}
          {t ? (
            <div
              className={cn(
                "rounded-md border px-3 py-2 text-sm",
                t.tingkat === "bahaya" && "border-destructive",
              )}
            >
              <p className="font-medium">{t.ringkas}</p>
              <ul className="mt-1 list-disc pl-4">
                {t.langkah.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <KolamRiwayatSpark riwayat={sektor.riwayat} />
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2">
        {sektor.kosong && sektor.kolamId ? (
          <Button type="button" className="h-11" onClick={() => setMode("semai")}>
            Semai
          </Button>
        ) : null}
        {!sektor.kosong && sektor.siklus?.bolehMonitor && sektor.kolamId ? (
          <Button type="button" className="h-11" onClick={() => setMode("air")}>
            Catat air
          </Button>
        ) : null}
        {!sektor.kosong && sektor.siklus?.bolehGagal ? (
          <Button type="button" variant="outline" className="h-11" onClick={() => setMode("gagal")}>
            Gagal panen
          </Button>
        ) : null}
        {!sektor.kolamId ? (
          <p className="text-sm text-muted-foreground">Kolam belum didaftar. Minta admin.</p>
        ) : null}
      </div>

      <Dialog open={mode !== null} onOpenChange={(open) => !open && setMode(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {mode === "semai" && "Semai di kolam ini"}
              {mode === "air" && "Catat air kolam"}
              {mode === "gagal" && "Lapor gagal panen"}
            </DialogTitle>
          </DialogHeader>
          {mode === "semai" && sektor.kolamId ? (
            <PetaniSemaiSingkatForm kolamId={sektor.kolamId} kolamNama={sektor.nama} />
          ) : null}
          {mode === "air" && sektor.kolamId && sektor.siklus ? (
            <MonitorKolamForm
              siklusId={sektor.siklus.id}
              kolamId={sektor.kolamId}
              kolamLabel={sektor.nama}
            />
          ) : null}
          {mode === "gagal" && sektor.siklus ? (
            <KegagalanForm
              siklusId={sektor.siklus.id}
              jumlahDisemai={sektor.siklus.jumlahDisemai}
              totalSusut={sektor.siklus.totalSusut}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </article>
  );
}
