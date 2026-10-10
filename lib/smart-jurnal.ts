import { Prisma } from "@prisma/client";
import { createJurnal, JurnalError, type JurnalInput } from "@/lib/jurnal";
import { KasSumberError, parseSumberKasKode } from "@/lib/kas-sumber";
import { assertJurnalTanggalAllowed } from "@/lib/period-lock";
import { prisma } from "@/lib/prisma";

export class SmartJurnalError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export const smartJurnalTipe = ["BEBAN_OPERASIONAL", "PRIVE", "SUNTIKAN_MODAL"] as const;
export type SmartJurnalTipe = (typeof smartJurnalTipe)[number];

const tipeMeta: Record<
  SmartJurnalTipe,
  { label: string; bebanKode?: string; debitKode: string; kreditKode: string }
> = {
  BEBAN_OPERASIONAL: {
    label: "Beban operasional",
    bebanKode: "5230",
    debitKode: "5230",
    kreditKode: "KAS",
  },
  PRIVE: {
    label: "Prive pemilik",
    debitKode: "3200",
    kreditKode: "KAS",
  },
  SUNTIKAN_MODAL: {
    label: "Suntikan modal",
    debitKode: "KAS",
    kreditKode: "3100",
  },
};

function parseNominal(raw: unknown): Prisma.Decimal {
  const text = String(raw ?? "").trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text) || text === "0") {
    throw new SmartJurnalError("Nominal harus angka lebih dari nol.", 400);
  }
  return new Prisma.Decimal(text);
}

function parseTipe(raw: unknown): SmartJurnalTipe {
  const t = String(raw ?? "").trim().toUpperCase();
  if (!smartJurnalTipe.includes(t as SmartJurnalTipe)) {
    throw new SmartJurnalError("Pilih tipe Smart Jurnal.", 400);
  }
  return t as SmartJurnalTipe;
}

async function akunPostingKode(kode: string) {
  const akun = await prisma.akun.findUnique({
    where: { kode },
    select: { id: true, aktif: true, _count: { select: { anak: true } } },
  });
  if (!akun?.aktif || akun._count.anak > 0) {
    throw new SmartJurnalError(`Akun ${kode} tidak siap posting.`, 400);
  }
  return akun.id;
}

export function buildSmartJurnalBaris(
  tipe: SmartJurnalTipe,
  nominal: Prisma.Decimal,
  kasAkunId: number,
  akunIds: { beban?: number; prive?: number; modal?: number },
): JurnalInput["baris"] {
  const meta = tipeMeta[tipe];
  const nol = new Prisma.Decimal(0);
  if (tipe === "SUNTIKAN_MODAL") {
    const modalId = akunIds.modal!;
    return [
      { akunId: kasAkunId, debit: nominal, kredit: nol },
      { akunId: modalId, debit: nol, kredit: nominal },
    ];
  }
  const debitId =
    tipe === "PRIVE" ? akunIds.prive! : akunIds.beban!;
  return [
    { akunId: debitId, debit: nominal, kredit: nol },
    { akunId: kasAkunId, debit: nol, kredit: nominal },
  ];
}

export async function createSmartJurnal(
  raw: Record<string, unknown>,
  userId: number,
  opts?: { adminOverridePeriod?: boolean },
) {
  const tanggalText = String(raw.tanggal ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggalText)) {
    throw new SmartJurnalError("Isi tanggal.", 400);
  }
  const tanggal = new Date(tanggalText);
  await assertJurnalTanggalAllowed(tanggal, { adminOverride: opts?.adminOverridePeriod });

  const tipe = parseTipe(raw.tipe);
  const nominal = parseNominal(raw.nominal);
  let kasKodeVal;
  try {
    kasKodeVal = parseSumberKasKode(raw.sumberKas);
  } catch (error) {
    if (error instanceof KasSumberError) {
      throw new SmartJurnalError(error.message, error.status);
    }
    throw error;
  }
  const statusRaw = String(raw.status ?? "PENDING").trim();
  if (statusRaw !== "DRAFT" && statusRaw !== "PENDING") {
    throw new SmartJurnalError("Status awal hanya DRAFT atau PENDING.", 400);
  }

  const catatan = String(raw.catatan ?? "").trim();
  const label = tipeMeta[tipe].label;
  const keterangan = (catatan ? `${label} — ${catatan}` : label).slice(0, 255);

  const kasId = await akunPostingKode(kasKodeVal);
  const bebanId =
    tipe === "BEBAN_OPERASIONAL" ? await akunPostingKode("5230") : undefined;
  const priveId = tipe === "PRIVE" ? await akunPostingKode("3200") : undefined;
  const modalId = tipe === "SUNTIKAN_MODAL" ? await akunPostingKode("3100") : undefined;

  const baris = buildSmartJurnalBaris(tipe, nominal, kasId, {
    beban: bebanId,
    prive: priveId,
    modal: modalId,
  });

  try {
    return await createJurnal(
      {
        tanggal,
        keterangan,
        status: statusRaw as "DRAFT" | "PENDING",
        baris,
        sumber: "SMART",
      },
      userId,
    );
  } catch (error) {
    if (error instanceof JurnalError) {
      throw new SmartJurnalError(error.message, error.status);
    }
    throw error;
  }
}
