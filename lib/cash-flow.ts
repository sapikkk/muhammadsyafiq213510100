import "server-only";

import { Prisma, type TipeAkun } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const nol = new Prisma.Decimal(0);
const KAS_KODE = new Set(["1100", "1110"]);
const INVEST_KODE = new Set(["1500", "1510", "1520", "1530"]);

export class CashFlowError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export type CashFlowCategory = "OPERASI" | "INVESTASI" | "PENDANAAN";

export type CashFlowMovement = {
  tanggal: string;
  jurnalId: number;
  kategori: CashFlowCategory;
  keterangan: string;
  masuk: string;
  keluar: string;
};

export type CashFlowSection = {
  kategori: CashFlowCategory;
  label: string;
  masuk: string;
  keluar: string;
  net: string;
};

export type CashFlowResult = {
  dari: string;
  sampai: string;
  saldoAwal: string;
  saldoAkhir: string;
  netChange: string;
  sections: CashFlowSection[];
  movements: CashFlowMovement[];
};

const KATEGORI_LABEL: Record<CashFlowCategory, string> = {
  OPERASI: "Aktivitas operasi",
  INVESTASI: "Aktivitas investasi",
  PENDANAAN: "Aktivitas pendanaan",
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

function classifyJournal(
  otherLines: { akun: { kode: string; tipe: TipeAkun } }[],
): CashFlowCategory {
  if (otherLines.some((l) => INVEST_KODE.has(l.akun.kode))) {
    return "INVESTASI";
  }
  if (otherLines.some((l) => l.akun.tipe === "MODAL" || l.akun.tipe === "KEWAJIBAN")) {
    return "PENDANAAN";
  }
  return "OPERASI";
}

function netKasOnLines(
  lines: { akun: { kode: string }; debit: Prisma.Decimal; kredit: Prisma.Decimal }[],
): Prisma.Decimal {
  let net = nol;
  for (const line of lines) {
    if (!KAS_KODE.has(line.akun.kode)) continue;
    net = net.add(line.debit.sub(line.kredit));
  }
  return net;
}

async function saldoKasSebelum(tanggal: Date, kasIds: number[]): Promise<Prisma.Decimal> {
  if (kasIds.length === 0) return nol;
  const baris = await prisma.jurnalBaris.findMany({
    where: {
      akunId: { in: kasIds },
      jurnal: { status: "APPROVED", tanggal: { lt: tanggal } },
    },
    select: { debit: true, kredit: true },
  });
  return baris.reduce((s, b) => s.add(b.debit.sub(b.kredit)), nol);
}

export async function buildCashFlow(params: {
  dari?: string | null;
  sampai?: string | null;
}): Promise<CashFlowResult> {
  const start = parseMonthParam(params.dari ?? null, "dari");
  const end = parseMonthParam(params.sampai ?? null, "sampai");
  if (start > end) {
    throw new CashFlowError("Periode tidak valid: dari harus sebelum sampai.", 400);
  }

  const dari = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}`;
  const sampai = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}`;

  const kasAkun = await prisma.akun.findMany({
    where: { kode: { in: Array.from(KAS_KODE) }, aktif: true },
    select: { id: true },
  });
  const kasIds = kasAkun.map((a) => a.id);

  const saldoAwal = await saldoKasSebelum(start, kasIds);

  const jurnals = await prisma.jurnal.findMany({
    where: { status: "APPROVED", tanggal: { gte: start, lte: end } },
    include: {
      baris: { include: { akun: { select: { kode: true, tipe: true } } } },
    },
    orderBy: [{ tanggal: "asc" }, { id: "asc" }],
  });

  const bucket = new Map<CashFlowCategory, { masuk: Prisma.Decimal; keluar: Prisma.Decimal }>();
  for (const k of ["OPERASI", "INVESTASI", "PENDANAAN"] as CashFlowCategory[]) {
    bucket.set(k, { masuk: nol, keluar: nol });
  }

  const movements: CashFlowMovement[] = [];
  let netChange = nol;

  for (const j of jurnals) {
    const net = netKasOnLines(j.baris);
    if (net.eq(0)) continue;

    const other = j.baris.filter((l) => !KAS_KODE.has(l.akun.kode));
    const kategori = classifyJournal(other);
    const b = bucket.get(kategori)!;
    const masuk = net.gt(0) ? net : nol;
    const keluar = net.lt(0) ? net.abs() : nol;
    b.masuk = b.masuk.add(masuk);
    b.keluar = b.keluar.add(keluar);
    netChange = netChange.add(net);

    movements.push({
      tanggal: j.tanggal.toISOString().slice(0, 10),
      jurnalId: j.id,
      kategori,
      keterangan: j.keterangan ?? "",
      masuk: masuk.toFixed(2),
      keluar: keluar.toFixed(2),
    });
  }

  const saldoAkhir = saldoAwal.add(netChange);

  const sections: CashFlowSection[] = (["OPERASI", "INVESTASI", "PENDANAAN"] as CashFlowCategory[]).map(
    (kategori) => {
      const b = bucket.get(kategori)!;
      return {
        kategori,
        label: KATEGORI_LABEL[kategori],
        masuk: b.masuk.toFixed(2),
        keluar: b.keluar.toFixed(2),
        net: b.masuk.sub(b.keluar).toFixed(2),
      };
    },
  );

  return {
    dari,
    sampai,
    saldoAwal: saldoAwal.toFixed(2),
    saldoAkhir: saldoAkhir.toFixed(2),
    netChange: netChange.toFixed(2),
    sections,
    movements: movements.reverse(),
  };
}
