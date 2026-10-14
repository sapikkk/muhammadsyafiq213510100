"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { BarChart3, Table2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [tampilan, setTampilan] = useState<Tampilan>("rata");
  const [kelompok, setKelompok] = useState<MonitorKelompokMode>("hari");
  const [modeLihat, setModeLihat] = useState<ModeLihat>("tabel");
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
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={modeLihat === "tabel" ? "default" : "outline"}
          className="min-h-11 gap-1.5"
          onClick={() => setModeLihat("tabel")}
        >
          <Table2 className="size-4" aria-hidden />
          Tabel
        </Button>
        <Button
          type="button"
          size="sm"
          variant={modeLihat === "diagram" ? "default" : "outline"}
          className="min-h-11 gap-1.5"
          onClick={() => setModeLihat("diagram")}
        >
          <BarChart3 className="size-4" aria-hidden />
          Diagram
        </Button>
      </div>

      {modeLihat === "tabel" ? (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant={tampilan === "log" ? "default" : "outline"}
            className="min-h-11"
            onClick={() => setTampilan("log")}
          >
            Per catatan
          </Button>
          <Button
            type="button"
            size="sm"
            variant={tampilan === "rata" ? "default" : "outline"}
            className="min-h-11"
            onClick={() => setTampilan("rata")}
          >
            Ringkasan rata-rata
          </Button>
          {tampilan === "rata" ? (
            <>
              {(
                [
                  ["hari", "Per hari"],
                  ["minggu", "Per minggu"],
                  ["bulan", "Per bulan"],
                ] as const
              ).map(([mode, label]) => (
                <Button
                  key={mode}
                  type="button"
                  size="sm"
                  variant={kelompok === mode ? "secondary" : "outline"}
                  className="min-h-11"
                  onClick={() => setKelompok(mode)}
                >
                  {label}
                </Button>
              ))}
            </>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Diagram memakai filter tanggal dan lokasi yang sama dengan tabel.
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
            <Button type="button" variant="outline" className="h-11">
              Ekspor
            </Button>
          }
        />
        {modeLihat === "tabel" && loading ? (
          <p className="text-xs text-muted-foreground">Memuat…</p>
        ) : modeLihat === "tabel" ? (
          <p className="text-xs text-muted-foreground">
            {rowCount} baris · panah = banding catatan sebelumnya (kolam sama)
          </p>
        ) : null}
      </div>

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
