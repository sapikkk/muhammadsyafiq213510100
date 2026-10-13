import "server-only";

import { prisma } from "@/lib/prisma";
import type { ExportDocument } from "@/lib/export-document-types";
import { ringkasanSiklusUntukTeks } from "@/lib/produksi-ui-labels";

export type MonitorExportFilter = {
  start: Date;
  end: Date;
  kolamId?: number;
  siklusId?: number;
  greenhouseId?: number;
  lahanId?: number;
  phMin?: number;
  phMax?: number;
  ppmMin?: number;
  ppmMax?: number;
  suhuMin?: number;
  suhuMax?: number;
};

function parseOptionalNum(raw: string | null): number | undefined {
  if (raw == null || raw.trim() === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export function parseMonitorExportFilter(url: URL, start: Date, end: Date): MonitorExportFilter {
  return {
    start,
    end,
    kolamId: parseOptionalNum(url.searchParams.get("kolamId")),
    siklusId: parseOptionalNum(url.searchParams.get("siklusId")),
    greenhouseId: parseOptionalNum(url.searchParams.get("greenhouseId")),
    lahanId: parseOptionalNum(url.searchParams.get("lahanId")),
    phMin: parseOptionalNum(url.searchParams.get("phMin")),
    phMax: parseOptionalNum(url.searchParams.get("phMax")),
    ppmMin: parseOptionalNum(url.searchParams.get("ppmMin")),
    ppmMax: parseOptionalNum(url.searchParams.get("ppmMax")),
    suhuMin: parseOptionalNum(url.searchParams.get("suhuMin")),
    suhuMax: parseOptionalNum(url.searchParams.get("suhuMax")),
  };
}

export async function listMonitorRows(filter: MonitorExportFilter) {
  const rows = await prisma.log_Monitor_Kolam.findMany({
    where: {
      waktu: { gte: filter.start, lte: filter.end },
      ...(filter.kolamId ? { kolam_id: filter.kolamId } : {}),
      ...(filter.siklusId ? { siklus_id: filter.siklusId } : {}),
      ...(filter.greenhouseId || filter.lahanId
        ? {
            kolam: {
              ...(filter.greenhouseId ? { greenhouse_id: filter.greenhouseId } : {}),
              ...(filter.lahanId ? { greenhouse: { lahan_id: filter.lahanId } } : {}),
            },
          }
        : {}),
    },
    orderBy: { waktu: "asc" },
    include: {
      kolam: {
        select: {
          nama: true,
          greenhouse: { select: { nama: true, lahan_id: true } },
        },
      },
      siklus: {
        select: {
          kode_batch: true,
          varietas: { select: { nama: true } },
          kolam: { select: { nama: true, greenhouse: { select: { nama: true } } } },
        },
      },
    },
  });

  return rows.filter((r) => {
    const ph = Number(r.ph);
    const ppm = Number(r.ppm);
    const suhu = Number(r.suhu_c);
    if (filter.phMin != null && ph < filter.phMin) return false;
    if (filter.phMax != null && ph > filter.phMax) return false;
    if (filter.ppmMin != null && ppm < filter.ppmMin) return false;
    if (filter.ppmMax != null && ppm > filter.ppmMax) return false;
    if (filter.suhuMin != null && suhu < filter.suhuMin) return false;
    if (filter.suhuMax != null && suhu > filter.suhuMax) return false;
    return true;
  });
}

export async function buildMonitorKolamDocument(
  filter: MonitorExportFilter,
  tglAwal: string,
  tglAkhir: string,
): Promise<ExportDocument> {
  const rows = await listMonitorRows(filter);
  const fmt = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return {
    title: "Monitor kolam — Kokonus Farm",
    subtitleLines: [`Rentang: ${tglAwal} s/d ${tglAkhir}`, `${rows.length} baris`],
    sections: [
      {
        headers: [
          "Waktu",
          "Siklus",
          "Greenhouse",
          "Kolam",
          "pH",
          "PPM",
          "Suhu (°C)",
        ],
        rows: rows.map((r) => {
          const gh = r.kolam.greenhouse?.nama ?? "—";
          const siklus = ringkasanSiklusUntukTeks({
            kode_batch: r.siklus.kode_batch,
            varietas: r.siklus.varietas,
            kolam: r.siklus.kolam,
          });
          return [
            fmt.format(r.waktu),
            siklus,
            gh,
            r.kolam.nama,
            String(Number(r.ph)),
            String(Number(r.ppm)),
            String(Number(r.suhu_c)),
          ];
        }),
      },
    ],
  };
}

export async function listMonitorFilterOptions() {
  const [lahan, greenhouse, kolam, siklus] = await Promise.all([
    prisma.lahan.findMany({ select: { id: true }, orderBy: { id: "asc" } }),
    prisma.greenhouse.findMany({
      select: { id: true, nama: true, lahan_id: true },
      orderBy: { nama: "asc" },
    }),
    prisma.kolam.findMany({
      select: { id: true, nama: true, greenhouse_id: true },
      orderBy: { nama: "asc" },
    }),
    prisma.siklus_Produksi.findMany({
      where: { status: { notIn: ["SELESAI", "GAGAL_TOTAL"] } },
      select: {
        id: true,
        kode_batch: true,
        varietas: { select: { nama: true } },
      },
      orderBy: { id: "desc" },
      take: 50,
    }),
  ]);
  return {
    lahan: lahan.map((l) => ({ id: l.id, label: `Lahan ${l.id}` })),
    greenhouse: greenhouse.map((g) => ({ id: g.id, label: g.nama, lahanId: g.lahan_id })),
    kolam: kolam.map((k) => ({
      id: k.id,
      label: k.nama,
      greenhouseId: k.greenhouse_id,
    })),
    siklus: siklus.map((s) => ({
      id: s.id,
      label: `${s.varietas.nama} · ${s.kode_batch}`,
    })),
  };
}
