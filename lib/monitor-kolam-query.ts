import "server-only";

import { Prisma } from "@prisma/client";
import type {
  MonitorAgregatBaris,
  MonitorKelompokMode,
  MonitorLogBaris,
} from "@/lib/monitor-kolam-types";
import { labelPeriode } from "@/lib/monitor-kolam-agregat";
import { prisma } from "@/lib/prisma";
import { ringkasanSiklusUntukTeks } from "@/lib/produksi-ui-labels";

export type MonitorQueryFilter = {
  start: Date;
  end: Date;
  kolamId?: number;
  siklusId?: number;
  greenhouseId?: number;
  lahanId?: number;
};

export type MonitorPaginated<T> = {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

const monitorInclude = {
  kolam: {
    select: {
      id: true,
      nama: true,
      greenhouse_id: true,
      greenhouse: { select: { nama: true, lahan_id: true } },
    },
  },
  siklus: {
    select: {
      id: true,
      kode_batch: true,
      varietas: { select: { nama: true } },
    },
  },
} as const;

function whereMonitor(filter: MonitorQueryFilter): Prisma.Log_Monitor_KolamWhereInput {
  return {
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
  };
}

function toLogBaris(r: {
  waktu: Date;
  ppm: Prisma.Decimal;
  ph: Prisma.Decimal;
  suhu_c: Prisma.Decimal;
  kolam: {
    id: number;
    nama: string;
    greenhouse: { nama: string };
  };
  siklus: {
    kode_batch: string;
    varietas: { nama: string };
    kolam: { nama: string; greenhouse: { nama: string } };
  };
}): MonitorLogBaris {
  const fmt = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "short",
    timeStyle: "short",
  });
  const gh = r.kolam.greenhouse?.nama ?? "Greenhouse";
  return {
    id: `${r.kolam.id}-${r.waktu.toISOString()}`,
    waktu: r.waktu.toISOString(),
    waktuLabel: fmt.format(r.waktu),
    greenhouse: gh,
    kolam: r.kolam.nama,
    kolamId: r.kolam.id,
    siklusLabel: ringkasanSiklusUntukTeks({
      kode_batch: r.siklus.kode_batch,
      varietas: r.siklus.varietas,
      kolam: r.siklus.kolam,
    }),
    ph: Number(r.ph),
    ppm: Number(r.ppm),
    suhu: Number(r.suhu_c),
  };
}

export async function countMonitorLogs(filter: MonitorQueryFilter): Promise<number> {
  return prisma.log_Monitor_Kolam.count({ where: whereMonitor(filter) });
}

export async function paginateMonitorLogs(
  filter: MonitorQueryFilter,
  page: number,
  pageSize: number,
): Promise<MonitorPaginated<MonitorLogBaris>> {
  const safePage = Math.max(1, page);
  const safeSize = Math.min(100, Math.max(5, pageSize));
  const where = whereMonitor(filter);
  const [total, rows] = await Promise.all([
    prisma.log_Monitor_Kolam.count({ where }),
    prisma.log_Monitor_Kolam.findMany({
      where,
      orderBy: { waktu: "desc" },
      skip: (safePage - 1) * safeSize,
      take: safeSize,
      include: monitorInclude,
    }),
  ]);
  return {
    rows: rows.map((r) =>
      toLogBaris({
        waktu: r.waktu,
        ppm: r.ppm,
        ph: r.ph,
        suhu_c: r.suhu_c,
        kolam: r.kolam,
        siklus: { ...r.siklus, kolam: r.kolam },
      }),
    ),
    total,
    page: safePage,
    pageSize: safeSize,
    totalPages: Math.max(1, Math.ceil(total / safeSize)),
  };
}

function truncSql(mode: MonitorKelompokMode): "day" | "week" | "month" {
  if (mode === "bulan") return "month";
  if (mode === "minggu") return "week";
  return "day";
}

/** Literal SQL — jangan pakai parameter Prisma untuk argumen date_trunc (GROUP BY harus identik). */
function sqlDateTruncJakarta(mode: MonitorKelompokMode): Prisma.Sql {
  const unit = truncSql(mode);
  return Prisma.raw(`date_trunc('${unit}', l.waktu AT TIME ZONE 'Asia/Jakarta')`);
}

type AgregatRow = {
  period_key: string;
  kolam_id: number;
  kolam_nama: string;
  greenhouse_nama: string;
  greenhouse_id: number;
  jumlah: bigint;
  ph_avg: number;
  ppm_avg: number;
  suhu_avg: number;
};

function buildAgregatSql(
  filter: MonitorQueryFilter,
  mode: MonitorKelompokMode,
  limit: number,
  offset: number,
  countOnly: boolean,
): Prisma.Sql {
  const dt = sqlDateTruncJakarta(mode);
  const conditions: Prisma.Sql[] = [
    Prisma.sql`l.waktu >= ${filter.start}`,
    Prisma.sql`l.waktu <= ${filter.end}`,
  ];
  if (filter.kolamId) conditions.push(Prisma.sql`l.kolam_id = ${filter.kolamId}`);
  if (filter.siklusId) conditions.push(Prisma.sql`l.siklus_id = ${filter.siklusId}`);
  if (filter.greenhouseId) conditions.push(Prisma.sql`k.greenhouse_id = ${filter.greenhouseId}`);
  if (filter.lahanId) conditions.push(Prisma.sql`g.lahan_id = ${filter.lahanId}`);

  const whereSql = Prisma.join(conditions, " AND ");

  if (countOnly) {
    return Prisma.sql`
      SELECT COUNT(*)::bigint AS c FROM (
        SELECT 1
        FROM "Log_Monitor_Kolam" l
        INNER JOIN "Kolam" k ON k.id = l.kolam_id
        INNER JOIN "Greenhouse" g ON g.id = k.greenhouse_id
        WHERE ${whereSql}
        GROUP BY ${dt}, l.kolam_id, k.nama, g.nama, g.id
      ) sub
    `;
  }

  return Prisma.sql`
    SELECT
      to_char(${dt}, 'YYYY-MM-DD') AS period_key,
      l.kolam_id,
      k.nama AS kolam_nama,
      g.nama AS greenhouse_nama,
      g.id AS greenhouse_id,
      COUNT(*)::bigint AS jumlah,
      AVG(l.ph::float) AS ph_avg,
      AVG(l.ppm::float) AS ppm_avg,
      AVG(l.suhu_c::float) AS suhu_avg
    FROM "Log_Monitor_Kolam" l
    INNER JOIN "Kolam" k ON k.id = l.kolam_id
    INNER JOIN "Greenhouse" g ON g.id = k.greenhouse_id
    WHERE ${whereSql}
    GROUP BY ${dt}, l.kolam_id, k.nama, g.nama, g.id
    ORDER BY period_key DESC, g.nama ASC, k.nama ASC
    LIMIT ${limit} OFFSET ${offset}
  `;
}

export async function paginateMonitorAgregat(
  filter: MonitorQueryFilter,
  mode: MonitorKelompokMode,
  page: number,
  pageSize: number,
): Promise<MonitorPaginated<MonitorAgregatBaris>> {
  const safePage = Math.max(1, page);
  const safeSize = Math.min(100, Math.max(5, pageSize));
  const offset = (safePage - 1) * safeSize;

  const [countRow, rows] = await Promise.all([
    prisma.$queryRaw<{ c: bigint }[]>(buildAgregatSql(filter, mode, 0, 0, true)),
    prisma.$queryRaw<AgregatRow[]>(buildAgregatSql(filter, mode, safeSize, offset, false)),
  ]);

  const total = Number(countRow[0]?.c ?? 0);
  const mapped: MonitorAgregatBaris[] = rows.map((r) => {
    const periodeKey =
      mode === "bulan" ? r.period_key.slice(0, 7) : r.period_key.slice(0, 10);
    return {
      id: `${periodeKey}|${r.kolam_id}`,
      periodeLabel: labelPeriode(periodeKey, mode),
      periodeSort: periodeKey,
      greenhouse: r.greenhouse_nama,
      kolam: r.kolam_nama,
      kolamId: r.kolam_id,
      greenhouseId: r.greenhouse_id,
      jumlah: Number(r.jumlah),
      phRata: Math.round(Number(r.ph_avg ?? 0) * 100) / 100,
      ppmRata: Math.round(Number(r.ppm_avg ?? 0) * 100) / 100,
      suhuRata: Math.round(Number(r.suhu_avg ?? 0) * 100) / 100,
    };
  });

  return {
    rows: mapped,
    total,
    page: safePage,
    pageSize: safeSize,
    totalPages: Math.max(1, Math.ceil(total / safeSize)),
  };
}

export type MonitorChartTitik = {
  label: string;
  ppm: number;
  ph: number;
  suhu: number;
};

/** Rata-rata harian (semua kolam) untuk grafik beranda. */
export async function monitorChartHarian(
  filter: MonitorQueryFilter,
  maxHari = 21,
): Promise<MonitorChartTitik[]> {
  const conditions: Prisma.Sql[] = [
    Prisma.sql`l.waktu >= ${filter.start}`,
    Prisma.sql`l.waktu <= ${filter.end}`,
  ];
  if (filter.kolamId) conditions.push(Prisma.sql`l.kolam_id = ${filter.kolamId}`);
  if (filter.siklusId) conditions.push(Prisma.sql`l.siklus_id = ${filter.siklusId}`);
  if (filter.greenhouseId) conditions.push(Prisma.sql`k.greenhouse_id = ${filter.greenhouseId}`);
  if (filter.lahanId) conditions.push(Prisma.sql`g.lahan_id = ${filter.lahanId}`);
  const whereSql = Prisma.join(conditions, " AND ");

  const rows = await prisma.$queryRaw<
    { period_key: string; ph_avg: number; ppm_avg: number; suhu_avg: number }[]
  >(Prisma.sql`
    SELECT
      to_char(date_trunc('day', l.waktu AT TIME ZONE 'Asia/Jakarta'), 'YYYY-MM-DD') AS period_key,
      AVG(l.ph::float) AS ph_avg,
      AVG(l.ppm::float) AS ppm_avg,
      AVG(l.suhu_c::float) AS suhu_avg
    FROM "Log_Monitor_Kolam" l
    INNER JOIN "Kolam" k ON k.id = l.kolam_id
    INNER JOIN "Greenhouse" g ON g.id = k.greenhouse_id
    WHERE ${whereSql}
    GROUP BY 1
    ORDER BY period_key ASC
    LIMIT ${maxHari}
  `);

  return rows.map((r) => {
    const d = new Date(`${r.period_key}T12:00:00`);
    return {
      label: d.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
      ph: Math.round(Number(r.ph_avg) * 100) / 100,
      ppm: Math.round(Number(r.ppm_avg) * 100) / 100,
      suhu: Math.round(Number(r.suhu_avg) * 100) / 100,
    };
  });
}

export type MonitorKolamBandingBaris = {
  kolam: string;
  greenhouse: string;
  ppm: number;
  ph: number;
  suhu: number;
  jumlah: number;
};

/** Rata-rata per kolam (banding greenhouse) untuk grafik batang. */
export async function monitorBandingKolam(
  filter: MonitorQueryFilter,
  limit = 12,
): Promise<MonitorKolamBandingBaris[]> {
  const conditions: Prisma.Sql[] = [
    Prisma.sql`l.waktu >= ${filter.start}`,
    Prisma.sql`l.waktu <= ${filter.end}`,
  ];
  if (filter.kolamId) conditions.push(Prisma.sql`l.kolam_id = ${filter.kolamId}`);
  if (filter.siklusId) conditions.push(Prisma.sql`l.siklus_id = ${filter.siklusId}`);
  if (filter.greenhouseId) conditions.push(Prisma.sql`k.greenhouse_id = ${filter.greenhouseId}`);
  if (filter.lahanId) conditions.push(Prisma.sql`g.lahan_id = ${filter.lahanId}`);
  const whereSql = Prisma.join(conditions, " AND ");

  const rows = await prisma.$queryRaw<
    {
      kolam_nama: string;
      greenhouse_nama: string;
      jumlah: bigint;
      ph_avg: number;
      ppm_avg: number;
      suhu_avg: number;
    }[]
  >(Prisma.sql`
    SELECT
      k.nama AS kolam_nama,
      g.nama AS greenhouse_nama,
      COUNT(*)::bigint AS jumlah,
      AVG(l.ph::float) AS ph_avg,
      AVG(l.ppm::float) AS ppm_avg,
      AVG(l.suhu_c::float) AS suhu_avg
    FROM "Log_Monitor_Kolam" l
    INNER JOIN "Kolam" k ON k.id = l.kolam_id
    INNER JOIN "Greenhouse" g ON g.id = k.greenhouse_id
    WHERE ${whereSql}
    GROUP BY k.nama, g.nama
    ORDER BY jumlah DESC
    LIMIT ${limit}
  `);

  return rows.map((r) => ({
    kolam: r.kolam_nama,
    greenhouse: r.greenhouse_nama,
    jumlah: Number(r.jumlah),
    ph: Math.round(Number(r.ph_avg) * 100) / 100,
    ppm: Math.round(Number(r.ppm_avg) * 100) / 100,
    suhu: Math.round(Number(r.suhu_avg) * 100) / 100,
  }));
}

export function parseMonitorQueryFromSearchParams(
  params: URLSearchParams,
  defaultStart: string,
  defaultEnd: string,
): MonitorQueryFilter {
  const start = new Date(`${params.get("tglAwal") || defaultStart}T00:00:00`);
  const end = new Date(`${params.get("tglAkhir") || defaultEnd}T23:59:59`);
  const num = (key: string) => {
    const v = params.get(key);
    if (!v) return undefined;
    const n = Number(v);
    return Number.isInteger(n) && n > 0 ? n : undefined;
  };
  return {
    start,
    end,
    lahanId: num("lahanId"),
    greenhouseId: num("greenhouseId"),
    kolamId: num("kolamId"),
    siklusId: num("siklusId"),
  };
}
