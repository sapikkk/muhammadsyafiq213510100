import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const nol = new Prisma.Decimal(0);

export class CostBreakdownError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export type CostSlice = {
  akunId: number;
  kode: string;
  nama: string;
  total: string;
  persen: number;
};

export type DrilldownRow = {
  jurnalId: number;
  tanggal: string;
  keterangan: string;
  nominal: string;
};

export type CostBreakdownResult = {
  dari: string;
  sampai: string;
  totalBeban: string;
  slices: CostSlice[];
  drilldown: DrilldownRow[] | null;
};

function parseMonthParam(raw: string | null, label: string): Date {
  const text = String(raw ?? "").trim();
  const now = new Date();
  const fallback = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const use = /^\d{4}-\d{2}$/.test(text) ? text : fallback;
  const [y, m] = use.split("-").map(Number);
  if (label === "sampai") {
    return new Date(y, m, 0);
  }
  return new Date(y, m - 1, 1);
}

export async function costBreakdown(params: {
  dari?: string | null;
  sampai?: string | null;
  akunId?: number | null;
}): Promise<CostBreakdownResult> {
  const start = parseMonthParam(params.dari ?? null, "dari");
  const end = parseMonthParam(params.sampai ?? null, "sampai");
  if (start > end) {
    throw new CostBreakdownError("Periode tidak valid: dari harus sebelum sampai.", 400);
  }

  const dari = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}`;
  const sampai = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}`;

  const jurnals = await prisma.jurnal.findMany({
    where: {
      status: "APPROVED",
      tanggal: { gte: start, lte: end },
    },
    include: {
      baris: {
        include: { akun: { select: { id: true, kode: true, nama: true, tipe: true } } },
      },
    },
    orderBy: [{ tanggal: "desc" }, { id: "desc" }],
  });

  const byAkun = new Map<number, { kode: string; nama: string; total: Prisma.Decimal }>();

  for (const j of jurnals) {
    for (const line of j.baris) {
      if (line.akun.tipe !== "BEBAN") continue;
      const delta = line.debit.sub(line.kredit);
      if (delta.lte(nol)) continue;
      const cur = byAkun.get(line.akun.id) ?? {
        kode: line.akun.kode,
        nama: line.akun.nama,
        total: nol,
      };
      cur.total = cur.total.add(delta);
      byAkun.set(line.akun.id, cur);
    }
  }

  let totalBeban = nol;
  for (const v of Array.from(byAkun.values())) totalBeban = totalBeban.add(v.total);

  const slices: CostSlice[] = Array.from(byAkun.entries())
    .map(([akunId, v]) => ({
      akunId,
      kode: v.kode,
      nama: v.nama,
      total: v.total.toFixed(2),
      persen: totalBeban.gt(nol) ? v.total.div(totalBeban).mul(100).toNumber() : 0,
    }))
    .sort((a, b) => Number(b.total) - Number(a.total));

  let drilldown: DrilldownRow[] | null = null;
  const focusId = params.akunId;
  if (focusId != null && Number.isInteger(focusId) && focusId > 0) {
    drilldown = [];
    for (const j of jurnals) {
      for (const line of j.baris) {
        if (line.akunId !== focusId) continue;
        const delta = line.debit.sub(line.kredit);
        if (delta.lte(nol)) continue;
        drilldown.push({
          jurnalId: j.id,
          tanggal: j.tanggal.toISOString().slice(0, 10),
          keterangan: j.keterangan,
          nominal: delta.toFixed(2),
        });
      }
    }
  }

  return {
    dari,
    sampai,
    totalBeban: totalBeban.toFixed(2),
    slices,
    drilldown,
  };
}
