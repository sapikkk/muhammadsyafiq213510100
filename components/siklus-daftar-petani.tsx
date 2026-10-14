"use client";

import { useMemo, useState } from "react";
import { MonitorKolamForm } from "@/components/monitor-kolam-form";
import {
  SiklusDaftar,
  type SiklusBaris,
} from "@/components/siklus-daftar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siklusBolehMonitorKolam } from "@/lib/monitor-kolam-fase";

export type SiklusBarisPetani = SiklusBaris & {
  kolam_id: number;
  greenhouse_id: number;
};

export function SiklusDaftarPetani({ rows }: { rows: SiklusBarisPetani[] }) {
  const [ghId, setGhId] = useState<string>("all");
  const [kolamId, setKolamId] = useState<string>("all");
  const [monitorOpen, setMonitorOpen] = useState(false);

  const greenhouseOptions = useMemo(() => {
    const map = new Map<number, string>();
    for (const r of rows) {
      map.set(r.greenhouse_id, r.greenhouse_nama);
    }
    return Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1], "id"));
  }, [rows]);

  const kolamOptions = useMemo(() => {
    const map = new Map<number, { nama: string; ghId: number }>();
    for (const r of rows) {
      if (ghId !== "all" && String(r.greenhouse_id) !== ghId) continue;
      map.set(r.kolam_id, { nama: r.kolam_nama, ghId: r.greenhouse_id });
    }
    return Array.from(map.entries()).sort((a, b) =>
      a[1].nama.localeCompare(b[1].nama, "id"),
    );
  }, [rows, ghId]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (ghId !== "all" && String(r.greenhouse_id) !== ghId) return false;
      if (kolamId !== "all" && String(r.kolam_id) !== kolamId) return false;
      return true;
    });
  }, [rows, ghId, kolamId]);

  const targetMonitor = useMemo(() => {
    if (kolamId === "all") return null;
    const id = Number(kolamId);
    const kandidat = rows.filter(
      (r) =>
        r.kolam_id === id &&
        siklusBolehMonitorKolam(r.status) &&
        r.status !== "SELESAI" &&
        r.status !== "GAGAL_TOTAL",
    );
    if (!kandidat.length) return null;
    return kandidat.sort((a, b) => b.id - a.id)[0]!;
  }, [rows, kolamId]);

  const kolamLabel =
    targetMonitor != null
      ? `${targetMonitor.greenhouse_nama} / ${targetMonitor.kolam_nama}`
      : kolamOptions.find(([id]) => String(id) === kolamId)?.[1].nama ?? "";

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-md border p-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="block min-w-[10rem] flex-1 space-y-1 text-sm">
          <span className="font-medium">Rumah kaca</span>
          <Select
            value={ghId}
            onValueChange={(v) => {
              setGhId(v);
              setKolamId("all");
            }}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Semua rumah kaca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua rumah kaca</SelectItem>
              {greenhouseOptions.map(([id, nama]) => (
                <SelectItem key={id} value={String(id)}>
                  {nama}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="block min-w-[10rem] flex-1 space-y-1 text-sm">
          <span className="font-medium">Kolam</span>
          <Select value={kolamId} onValueChange={setKolamId}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Semua kolam" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua kolam</SelectItem>
              {kolamOptions.map(([id, { nama }]) => (
                <SelectItem key={id} value={String(id)}>
                  {nama}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <Button
          type="button"
          className="h-11 shrink-0"
          disabled={!targetMonitor}
          onClick={() => setMonitorOpen(true)}
        >
          Monitor kolam hari ini
        </Button>
      </div>
      {kolamId !== "all" && !targetMonitor ? (
        <p className="text-sm text-muted-foreground">
          Kolam ini belum punya siklus aktif (semai sampai pendewasaan). Pilih kolam lain atau lanjutkan
          fase di detail siklus.
        </p>
      ) : null}
      <SiklusDaftar rows={filtered} />
      <Dialog open={monitorOpen} onOpenChange={setMonitorOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Monitor kolam hari ini</DialogTitle>
          </DialogHeader>
          {targetMonitor ? (
            <MonitorKolamForm
              siklusId={targetMonitor.id}
              kolamId={targetMonitor.kolam_id}
              kolamLabel={kolamLabel}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
