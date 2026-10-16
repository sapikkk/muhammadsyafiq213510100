"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FilterChipGroup } from "@/components/kokonus/filter-chip-group";
import type {
  MonitorAgregatBaris,
  MonitorKelompokMode,
  MonitorLogBaris,
} from "@/lib/monitor-kolam-types";
import type { MonitorFilterOption } from "@/components/petani-monitor-section";
import { DashboardBentoEmpty } from "@/components/dashboard-bento-empty";
import { DataTable } from "@/components/data-table";
import { EksporLembar } from "@/components/ekspor-lembar";
import { MonitorKolamDiagramView } from "@/components/monitor-kolam-diagram-view";
import { MonitorNilaiTrend } from "@/components/monitor-nilai-trend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  catatanSebelumnyaAgregat,
  catatanSebelumnyaLog,
  hitungMonitorTrend,
} from "@/lib/monitor-trend-index";

const PAGE_SIZE = 12;

type Tampilan = "log" | "rata";
type ModeLihat = "tabel" | "diagram";

type DataMode = "log" | "rata-hari" | "rata-minggu" | "rata-bulan";
type ViewMode = "diagram" | DataMode;
type PresetRentang = "7" | "30" | "90" | "custom";

function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function rentangHari(hari: number): { awal: string; akhir: string } {
  const akhir = new Date();
  const awal = new Date();
  awal.setDate(akhir.getDate() - Math.max(1, hari));
  return { awal: toIsoDate(awal), akhir: toIsoDate(akhir) };
}

function dataModeToState(mode: DataMode): { tampilan: Tampilan; kelompok: MonitorKelompokMode } {
  if (mode === "log") return { tampilan: "log", kelompok: "hari" };
  if (mode === "rata-minggu") return { tampilan: "rata", kelompok: "minggu" };
  if (mode === "rata-bulan") return { tampilan: "rata", kelompok: "bulan" };
  return { tampilan: "rata", kelompok: "hari" };
}

function stateToDataMode(tampilan: Tampilan, kelompok: MonitorKelompokMode): DataMode {
  if (tampilan === "log") return "log";
  if (kelompok === "minggu") return "rata-minggu";
  if (kelompok === "bulan") return "rata-bulan";
  return "rata-hari";
}

function viewModeToState(mode: ViewMode): {
  modeLihat: ModeLihat;
  tampilan: Tampilan;
  kelompok: MonitorKelompokMode;
} {
  if (mode === "diagram") {
    return { modeLihat: "diagram", tampilan: "rata", kelompok: "hari" };
  }
  const st = dataModeToState(mode);
  return { modeLihat: "tabel", ...st };
}

function fmtAngka(n: number): string {
  return n.toLocaleString("id-ID", { maximumFractionDigits: 2 });
}

function buatKolomLog(rows: MonitorLogBaris[]): ColumnDef<MonitorLogBaris>[] {
  const selTrend = (
    index: number,
    field: "ph" | "ppm" | "suhu",
    nilai: number,
    satuan?: string,
  ) => {
    const prev = catatanSebelumnyaLog(rows, index);
    const tren = hitungMonitorTrend(nilai, prev?.[field]);
    return (
      <MonitorNilaiTrend nilai={fmtAngka(nilai)} tren={tren} satuan={satuan} />
    );
  };

  return [
    { accessorKey: "waktuLabel", header: "Waktu" },
    { accessorKey: "greenhouse", header: "Rumah kaca" },
    { accessorKey: "kolam", header: "Kolam" },
    { accessorKey: "siklusLabel", header: "Siklus tanam" },
    {
      accessorKey: "ph",
      header: "pH",
      cell: ({ row }) => selTrend(row.index, "ph", row.original.ph),
    },
    {
      accessorKey: "ppm",
      header: "PPM",
      cell: ({ row }) => selTrend(row.index, "ppm", row.original.ppm),
    },
    {
      accessorKey: "suhu",
      header: "Suhu (°C)",
      cell: ({ row }) => selTrend(row.index, "suhu", row.original.suhu, "°C"),
    },
  ];
}

function buatKolomAgregat(
  mode: MonitorKelompokMode,
  rows: MonitorAgregatBaris[],
): ColumnDef<MonitorAgregatBaris>[] {
  const periodeJudul =
    mode === "hari" ? "Hari" : mode === "minggu" ? "Minggu" : "Bulan";

  const selTrend = (
    index: number,
    field: "phRata" | "ppmRata" | "suhuRata",
    nilai: number,
    satuan?: string,
  ) => {
    const prev = catatanSebelumnyaAgregat(rows, index);
    const tren = hitungMonitorTrend(nilai, prev?.[field]);
    return (
      <MonitorNilaiTrend nilai={fmtAngka(nilai)} tren={tren} satuan={satuan} />
    );
  };

  return [
    { accessorKey: "periodeLabel", header: periodeJudul },
    { accessorKey: "greenhouse", header: "Rumah kaca" },
    { accessorKey: "kolam", header: "Kolam" },
    {
      accessorKey: "jumlah",
      header: "Jumlah catatan",
      cell: ({ row }) => <span className="tabular-nums">{row.original.jumlah}</span>,
    },
    {
      accessorKey: "phRata",
      header: "pH rata-rata",
      cell: ({ row }) => selTrend(row.index, "phRata", row.original.phRata),
    },
    {
      accessorKey: "ppmRata",
      header: "PPM rata-rata",
      cell: ({ row }) => selTrend(row.index, "ppmRata", row.original.ppmRata),
    },
    {
      accessorKey: "suhuRata",
      header: "Suhu rata-rata",
      cell: ({ row }) =>
        selTrend(row.index, "suhuRata", row.original.suhuRata, "°C"),
    },
  ];
}

export function DashboardMonitorKolam({
  totalLogs,
  lahan,
  greenhouse,
  kolam,
  siklus,
  defaultTglAwal,
  defaultTglAkhir,
  emptyAction,
}: {
  totalLogs: number;
  lahan: MonitorFilterOption[];
  greenhouse: MonitorFilterOption[];
  kolam: MonitorFilterOption[];
  siklus: MonitorFilterOption[];
  defaultTglAwal: string;
  defaultTglAkhir: string;
  emptyAction: { message: string; actionLabel: string; href: string };
}) {
  const [tglAwal, setTglAwal] = useState(defaultTglAwal);
  const [tglAkhir, setTglAkhir] = useState(defaultTglAkhir);
  const [lahanId, setLahanId] = useState("");
  const [greenhouseId, setGreenhouseId] = useState("");
  const [kolamId, setKolamId] = useState("");
  const [siklusId, setSiklusId] = useState("");
  const [rentangPreset, setRentangPreset] = useState<PresetRentang>("90");
  const [opsiLanjutOpen, setOpsiLanjutOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("rata-hari");
  const { modeLihat, tampilan, kelompok } = useMemo(() => viewModeToState(viewMode), [viewMode]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logRows, setLogRows] = useState<MonitorLogBaris[]>([]);
  const [agregatRows, setAgregatRows] = useState<MonitorAgregatBaris[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const filterQuery = useMemo(() => {
    const p = new URLSearchParams({ tglAwal, tglAkhir });
    if (lahanId) p.set("lahanId", lahanId);
    if (greenhouseId) p.set("greenhouseId", greenhouseId);
    if (kolamId) p.set("kolamId", kolamId);
    if (siklusId) p.set("siklusId", siklusId);
    return p.toString();
  }, [tglAwal, tglAkhir, lahanId, greenhouseId, kolamId, siklusId]);

  const queryString = useMemo(() => {
    const p = new URLSearchParams({
      tglAwal,
      tglAkhir,
      page: String(pageIndex + 1),
      pageSize: String(PAGE_SIZE),
      tampilan,
      kelompok,
    });
    if (lahanId) p.set("lahanId", lahanId);
    if (greenhouseId) p.set("greenhouseId", greenhouseId);
    if (kolamId) p.set("kolamId", kolamId);
    if (siklusId) p.set("siklusId", siklusId);
    return p.toString();
  }, [
    tglAwal,
    tglAkhir,
    pageIndex,
    tampilan,
    kelompok,
    lahanId,
    greenhouseId,
    kolamId,
    siklusId,
  ]);

  const muat = useCallback(async () => {
    if (modeLihat === "diagram") return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/monitor-kolam?${queryString}`);
      if (!res.ok) throw new Error("Gagal memuat");
      const json = (await res.json()) as {
        tampilan: Tampilan;
        rows: MonitorLogBaris[] | MonitorAgregatBaris[];
        total: number;
      };
      setRowCount(json.total);
      if (json.tampilan === "log") {
        setLogRows(json.rows as MonitorLogBaris[]);
        setAgregatRows([]);
      } else {
        setAgregatRows(json.rows as MonitorAgregatBaris[]);
        setLogRows([]);
      }
    } catch {
      setError("Data monitor tidak bisa dimuat. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [queryString, modeLihat]);

  useEffect(() => {
    void muat();
  }, [muat]);

  useEffect(() => {
    setPageIndex(0);
  }, [tglAwal, tglAkhir, lahanId, greenhouseId, kolamId, siklusId, tampilan, kelompok]);

  const extraParams = useMemo(() => {
    const p: Record<string, string> = {};
    if (lahanId) p.lahanId = lahanId;
    if (greenhouseId) p.greenhouseId = greenhouseId;
    if (kolamId) p.kolamId = kolamId;
    if (siklusId) p.siklusId = siklusId;
    return p;
  }, [lahanId, greenhouseId, kolamId, siklusId]);

  const ghFiltered = greenhouse.filter((g) => !lahanId || g.lahanId === Number(lahanId));
  const kolamFiltered = kolam.filter(
    (k) => !greenhouseId || k.greenhouseId === Number(greenhouseId),
  );

  const ringkasanLokasi = useMemo(() => {
    const parts: string[] = [];
    if (lahanId) {
      const l = lahan.find((x) => String(x.id) === lahanId);
      if (l) parts.push(l.label);
    }
    if (greenhouseId) {
      const g = greenhouse.find((x) => String(x.id) === greenhouseId);
      if (g) parts.push(g.label);
    }
    if (kolamId) {
      const k = kolam.find((x) => String(x.id) === kolamId);
      if (k) parts.push(k.label);
    }
    if (siklusId) {
      const s = siklus.find((x) => String(x.id) === siklusId);
      if (s) parts.push(s.label);
    }
    return parts.length ? parts.join(" · ") : "Semua lokasi";
  }, [lahanId, greenhouseId, kolamId, siklusId, lahan, greenhouse, kolam, siklus]);

  const adaFilterLokasi = Boolean(lahanId || greenhouseId || kolamId || siklusId);

  function terapkanPreset(hari: 7 | 30 | 90) {
    const { awal, akhir } = rentangHari(hari);
    setRentangPreset(String(hari) as PresetRentang);
    setTglAwal(awal);
    setTglAkhir(akhir);
  }

  function resetFilterLokasi() {
    setLahanId("");
    setGreenhouseId("");
    setKolamId("");
    setSiklusId("");
  }

  const kolomLog = useMemo(() => buatKolomLog(logRows), [logRows]);
  const kolomAgregatMemo = useMemo(
    () => buatKolomAgregat(kelompok, agregatRows),
    [kelompok, agregatRows],
  );

  if (totalLogs === 0) {
    return (
      <DashboardBentoEmpty
        message={emptyAction.message}
        actionLabel={emptyAction.actionLabel}
        href={emptyAction.href}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_min(18rem,100%)] lg:items-end">
        <FilterChipGroup
          label="Rentang waktu"
          options={[
            { value: "7", label: "7 hari" },
            { value: "30", label: "30 hari" },
            { value: "90", label: "90 hari" },
            { value: "custom", label: "Tanggal lain" },
          ]}
          value={rentangPreset}
          onChange={(v) => {
            setRentangPreset(v);
            if (v === "7") terapkanPreset(7);
            else if (v === "30") terapkanPreset(30);
            else if (v === "90") terapkanPreset(90);
          }}
        />
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Tampilan</span>
          <select
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as ViewMode)}
          >
            <option value="rata-hari">Tabel — rata-rata per hari</option>
            <option value="rata-minggu">Tabel — rata-rata per minggu</option>
            <option value="rata-bulan">Tabel — rata-rata per bulan</option>
            <option value="log">Tabel — setiap catatan</option>
            <option value="diagram">Diagram pH, PPM, suhu</option>
          </select>
        </label>
      </div>

      {rentangPreset === "custom" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1 text-sm">
            <span className="text-muted-foreground">Dari tanggal</span>
            <Input
              className="h-11"
              type="date"
              value={tglAwal}
              onChange={(e) => setTglAwal(e.target.value)}
            />
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-muted-foreground">Sampai tanggal</span>
            <Input
              className="h-11"
              type="date"
              value={tglAkhir}
              onChange={(e) => setTglAkhir(e.target.value)}
            />
          </label>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground tabular-nums">
          Periode: {tglAwal} — {tglAkhir} · Lokasi: {ringkasanLokasi}
        </p>
      )}

      <details
        className="rounded-md border border-border bg-muted/10 px-3 py-2"
        open={opsiLanjutOpen}
        onToggle={(e) => setOpsiLanjutOpen((e.target as HTMLDetailsElement).open)}
      >
        <summary className="cursor-pointer list-none text-sm font-medium [&::-webkit-details-marker]:hidden">
          Opsi lanjutan (lokasi, ekspor)
        </summary>
        <div className="mt-3 space-y-3 border-t border-border/80 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            {adaFilterLokasi ? (
              <Button type="button" size="sm" variant="ghost" className="min-h-11" onClick={resetFilterLokasi}>
                Reset lokasi
              </Button>
            ) : null}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
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
              <span className="text-muted-foreground">Rumah kaca</span>
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
              <span className="text-muted-foreground">Siklus tanam</span>
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
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <EksporLembar
              judulTombol="Ekspor"
              unduhPath="/api/export/monitor-kolam"
              pratinjauPath="/api/export/preview?jenis=monitor-kolam"
              rentang="tanggal"
              defaultDari={tglAwal}
              defaultSampai={tglAkhir}
              extraParams={extraParams}
              trigger={
                <Button type="button" variant="outline" className="min-h-11">
                  Ekspor lembar
                </Button>
              }
            />
          </div>
        </div>
      </details>

      {modeLihat === "tabel" && loading ? (
        <p className="text-sm text-muted-foreground">Memuat data…</p>
      ) : modeLihat === "tabel" ? (
        <p className="text-xs text-muted-foreground">
          {rowCount} baris · panah = banding catatan sebelumnya (kolam sama)
        </p>
      ) : null}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {modeLihat === "diagram" ? (
        <MonitorKolamDiagramView
          filterQuery={filterQuery}
          emptyHref={emptyAction.href}
          compact
        />
      ) : rowCount === 0 && !loading ? (
        <DashboardBentoEmpty
          message="Tidak ada catatan pada rentang dan filter ini."
          actionLabel={emptyAction.actionLabel}
          href={emptyAction.href}
        />
      ) : tampilan === "log" ? (
        <DataTable
          columns={kolomLog}
          data={logRows}
          pageSize={PAGE_SIZE}
          manualPagination
          rowCount={rowCount}
          pageIndex={pageIndex}
          onPageIndexChange={setPageIndex}
          emptyMessage="Tidak ada baris."
        />
      ) : (
        <DataTable
          columns={kolomAgregatMemo}
          data={agregatRows}
          pageSize={PAGE_SIZE}
          manualPagination
          rowCount={rowCount}
          pageIndex={pageIndex}
          onPageIndexChange={setPageIndex}
          emptyMessage="Tidak ada baris ringkasan."
        />
      )}
    </div>
  );
}
