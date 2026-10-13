"use client";

import { useMemo, useState } from "react";
import type { MonitorGrafikTitik } from "@/lib/monitor-kolam-types";
import { PetaniMonitorChart } from "@/components/petani-monitor-chart";
import { EksporLembar } from "@/components/ekspor-lembar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type MonitorFilterOption = {
  id: number;
  label: string;
  lahanId?: number;
  greenhouseId?: number;
};

type Props = {
  points: MonitorGrafikTitik[];
  lahan: MonitorFilterOption[];
  greenhouse: MonitorFilterOption[];
  kolam: MonitorFilterOption[];
  siklus: MonitorFilterOption[];
  defaultTglAwal: string;
  defaultTglAkhir: string;
};

export function PetaniMonitorSection({
  points,
  lahan,
  greenhouse,
  kolam,
  siklus,
  defaultTglAwal,
  defaultTglAkhir,
}: Props) {
  const [tglAwal, setTglAwal] = useState(defaultTglAwal);
  const [tglAkhir, setTglAkhir] = useState(defaultTglAkhir);
  const [lahanId, setLahanId] = useState("");
  const [greenhouseId, setGreenhouseId] = useState("");
  const [kolamId, setKolamId] = useState("");
  const [siklusId, setSiklusId] = useState("");
  const [phMin, setPhMin] = useState("");
  const [phMax, setPhMax] = useState("");
  const [ppmMin, setPpmMin] = useState("");
  const [ppmMax, setPpmMax] = useState("");
  const [suhuMin, setSuhuMin] = useState("");
  const [suhuMax, setSuhuMax] = useState("");

  const filtered = useMemo(() => {
    return points.filter((p) => {
      const t = new Date(p.waktu).getTime();
      const aw = new Date(`${tglAwal}T00:00:00`).getTime();
      const ak = new Date(`${tglAkhir}T23:59:59`).getTime();
      if (t < aw || t > ak) return false;
      if (phMin && p.ph < Number(phMin)) return false;
      if (phMax && p.ph > Number(phMax)) return false;
      if (ppmMin && p.ppm < Number(ppmMin)) return false;
      if (ppmMax && p.ppm > Number(ppmMax)) return false;
      if (suhuMin && p.suhu < Number(suhuMin)) return false;
      if (suhuMax && p.suhu > Number(suhuMax)) return false;
      if (lahanId && p.lahanId !== Number(lahanId)) return false;
      if (greenhouseId && p.greenhouseId !== Number(greenhouseId)) return false;
      if (kolamId && p.kolamId !== Number(kolamId)) return false;
      if (siklusId && p.siklusId !== Number(siklusId)) return false;
      return true;
    });
  }, [
    points,
    tglAwal,
    tglAkhir,
    phMin,
    phMax,
    ppmMin,
    ppmMax,
    suhuMin,
    suhuMax,
    lahanId,
    greenhouseId,
    kolamId,
    siklusId,
  ]);

  const extraParams = useMemo(() => {
    const p: Record<string, string> = {};
    if (lahanId) p.lahanId = lahanId;
    if (greenhouseId) p.greenhouseId = greenhouseId;
    if (kolamId) p.kolamId = kolamId;
    if (siklusId) p.siklusId = siklusId;
    if (phMin) p.phMin = phMin;
    if (phMax) p.phMax = phMax;
    if (ppmMin) p.ppmMin = ppmMin;
    if (ppmMax) p.ppmMax = ppmMax;
    if (suhuMin) p.suhuMin = suhuMin;
    if (suhuMax) p.suhuMax = suhuMax;
    return p;
  }, [
    lahanId,
    greenhouseId,
    kolamId,
    siklusId,
    phMin,
    phMax,
    ppmMin,
    ppmMax,
    suhuMin,
    suhuMax,
  ]);

  const ghFiltered = greenhouse.filter((g) => !lahanId || g.lahanId === Number(lahanId));
  const kolamFiltered = kolam.filter(
    (k) => !greenhouseId || k.greenhouseId === Number(greenhouseId),
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Dari tanggal</span>
          <Input className="h-11" type="date" value={tglAwal} onChange={(e) => setTglAwal(e.target.value)} />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Sampai tanggal</span>
          <Input className="h-11" type="date" value={tglAkhir} onChange={(e) => setTglAkhir(e.target.value)} />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Lahan</span>
          <select
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            value={lahanId}
            onChange={(e) => {
              setLahanId(e.target.value);
              setGreenhouseId("");
              setKolamId("");
            }}
          >
            <option value="">Semua</option>
            {lahan.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Greenhouse</span>
          <select
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            value={greenhouseId}
            onChange={(e) => {
              setGreenhouseId(e.target.value);
              setKolamId("");
            }}
          >
            <option value="">Semua</option>
            {ghFiltered.map((g) => (
              <option key={g.id} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Kolam</span>
          <select
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            value={kolamId}
            onChange={(e) => setKolamId(e.target.value)}
          >
            <option value="">Semua</option>
            {kolamFiltered.map((k) => (
              <option key={k.id} value={k.id}>
                {k.label}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Siklus</span>
          <select
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            value={siklusId}
            onChange={(e) => setSiklusId(e.target.value)}
          >
            <option value="">Semua</option>
            {siklus.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">pH min – max</span>
          <div className="flex gap-2">
            <Input className="h-11" placeholder="Min" value={phMin} onChange={(e) => setPhMin(e.target.value)} />
            <Input className="h-11" placeholder="Max" value={phMax} onChange={(e) => setPhMax(e.target.value)} />
          </div>
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">PPM min – max</span>
          <div className="flex gap-2">
            <Input className="h-11" placeholder="Min" value={ppmMin} onChange={(e) => setPpmMin(e.target.value)} />
            <Input className="h-11" placeholder="Max" value={ppmMax} onChange={(e) => setPpmMax(e.target.value)} />
          </div>
        </label>
        <label className="space-y-1 text-sm sm:col-span-2">
          <span className="text-muted-foreground">Suhu (°C) min – max</span>
          <div className="flex gap-2">
            <Input className="h-11" placeholder="Min" value={suhuMin} onChange={(e) => setSuhuMin(e.target.value)} />
            <Input className="h-11" placeholder="Max" value={suhuMax} onChange={(e) => setSuhuMax(e.target.value)} />
          </div>
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <EksporLembar
          judulTombol="Ekspor monitor"
          unduhPath="/api/export/monitor-kolam"
          pratinjauPath="/api/export/preview?jenis=monitor-kolam"
          rentang="tanggal"
          defaultDari={tglAwal}
          defaultSampai={tglAkhir}
          extraParams={extraParams}
          trigger={
            <Button type="button" variant="outline" className="h-11">
              Ekspor monitor
            </Button>
          }
        />
      </div>

      <PetaniMonitorChart points={filtered} />
      <p className="text-xs text-muted-foreground">
        Grafik menampilkan {filtered.length} titik setelah filter. Unduhan memakai filter yang sama.
      </p>
    </div>
  );
}
