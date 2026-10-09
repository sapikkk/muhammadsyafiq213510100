import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const nol = new Prisma.Decimal(0);

export type MonthPoint = {
  bulan: string;
  label: string;
  pendapatan: string;
  pengeluaran: string;
};

export type MonthlySummaryResult = {
  pendapatanBulanIni: string;
  pengeluaranBulanIni: string;
  labaKasarBulanIni: string;
  months: MonthPoint[];
};

function monthKeyFromDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function labelFromKey(key: string): string {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
}

export async function monthlySummary(monthCount = 6): Promise<MonthlySummaryResult> {
  const count = Math.min(12, Math.max(3, monthCount));
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - (count - 1), 1);

  const buckets = new Map<string, { pendapatan: Prisma.Decimal; pengeluaran: Prisma.Decimal }>();
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1);
    buckets.set(monthKeyFromDate(d), { pendapatan: nol, pengeluaran: nol });
  }

  const jurnals = await prisma.jurnal.findMany({
    where: { status: "APPROVED", tanggal: { gte: start } },
    include: { baris: { include: { akun: { select: { tipe: true } } } } },
  });

  for (const j of jurnals) {
    const key = monthKeyFromDate(j.tanggal);
    const bucket = buckets.get(key);
    if (!bucket) continue;
    for (const line of j.baris) {
      if (line.akun.tipe === "PENDAPATAN") {
        bucket.pendapatan = bucket.pendapatan.add(line.kredit.sub(line.debit));
      } else if (line.akun.tipe === "BEBAN") {
        bucket.pengeluaran = bucket.pengeluaran.add(line.debit.sub(line.kredit));
      }
    }
  }

  const months: MonthPoint[] = Array.from(buckets.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([bulan, v]) => ({
      bulan,
      label: labelFromKey(bulan),
      pendapatan: v.pendapatan.toFixed(2),
      pengeluaran: v.pengeluaran.toFixed(2),
    }));

  const curKey = monthKeyFromDate(now);
  const cur = buckets.get(curKey) ?? { pendapatan: nol, pengeluaran: nol };

  return {
    pendapatanBulanIni: cur.pendapatan.toFixed(2),
    pengeluaranBulanIni: cur.pengeluaran.toFixed(2),
    labaKasarBulanIni: cur.pendapatan.sub(cur.pengeluaran).toFixed(2),
    months,
  };
}
