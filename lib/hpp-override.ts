import { Prisma } from "@prisma/client";
import { HarvestError } from "@/lib/laporan-panen";

/** Estimasi biaya plastik per pack (US2.3 / PRD). */
export const BIAYA_PLASTIK_PER_PACK = new Prisma.Decimal(500);

export type HppCalcResult = {
  biaya_langsung_total: Prisma.Decimal;
  overhead_teralokasi: Prisma.Decimal;
  biaya_plastik_packing: Prisma.Decimal;
  total_biaya: Prisma.Decimal;
  hpp_per_lubang: Prisma.Decimal;
  hpp_per_kg: Prisma.Decimal;
  hpp_per_pack: Prisma.Decimal;
};

export type HppOverrideInput = {
  hppPerLubang?: Prisma.Decimal;
  hppPerKg?: Prisma.Decimal;
  hppPerPack?: Prisma.Decimal;
  justifikasi: string;
};

function parseOverrideMoney(raw: unknown, label: string): Prisma.Decimal | undefined {
  if (raw === null || raw === undefined || raw === "") return undefined;
  const text = String(raw).trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text)) {
    throw new HarvestError(`${label} harus angka valid.`, 400);
  }
  return new Prisma.Decimal(text);
}

export function parseHppOverride(raw: Record<string, unknown>): HppOverrideInput | null {
  const useOverride =
    raw.useOverride === true ||
    raw.useOverride === "true" ||
    raw.useOverride === "on";
  if (!useOverride) return null;

  const justifikasi = String(raw.justifikasi ?? "").trim();
  if (justifikasi.length < 10) {
    throw new HarvestError("Justifikasi override minimal 10 karakter.", 400);
  }

  const hppPerLubang = parseOverrideMoney(raw.hppPerLubang, "HPP per lubang");
  const hppPerKg = parseOverrideMoney(raw.hppPerKg, "HPP per kg");
  const hppPerPack = parseOverrideMoney(raw.hppPerPack, "HPP per pack");

  if (!hppPerLubang && !hppPerKg && !hppPerPack) {
    throw new HarvestError("Isi minimal satu nilai HPP override.", 400);
  }

  return { hppPerLubang, hppPerKg, hppPerPack, justifikasi };
}

/** Terapkan override Admin — prioritas: kg → lubang → pack untuk total biaya. */
export function applyHppOverride(
  calc: HppCalcResult,
  yieldCtx: {
    jumlahLayak: Prisma.Decimal;
    beratKg: Prisma.Decimal;
    totalPack: Prisma.Decimal;
  },
  override: HppOverrideInput,
): HppCalcResult {
  let total_biaya = calc.total_biaya;
  let hpp_per_lubang = calc.hpp_per_lubang;
  let hpp_per_kg = calc.hpp_per_kg;
  let hpp_per_pack = calc.hpp_per_pack;

  if (override.hppPerKg) {
    hpp_per_kg = override.hppPerKg;
    total_biaya = yieldCtx.beratKg.gt(0)
      ? hpp_per_kg.mul(yieldCtx.beratKg)
      : hpp_per_kg;
  } else if (override.hppPerLubang) {
    hpp_per_lubang = override.hppPerLubang;
    total_biaya = hpp_per_lubang.mul(yieldCtx.jumlahLayak);
  } else if (override.hppPerPack) {
    hpp_per_pack = override.hppPerPack;
    total_biaya = hpp_per_pack.mul(yieldCtx.totalPack);
  }

  if (override.hppPerKg && yieldCtx.jumlahLayak.gt(0)) {
    hpp_per_lubang = total_biaya.div(yieldCtx.jumlahLayak);
  }
  if (override.hppPerKg && yieldCtx.totalPack.gt(0)) {
    hpp_per_pack = total_biaya.div(yieldCtx.totalPack);
  }
  if (override.hppPerLubang && yieldCtx.beratKg.gt(0)) {
    hpp_per_kg = total_biaya.div(yieldCtx.beratKg);
  }
  if (override.hppPerLubang && yieldCtx.totalPack.gt(0)) {
    hpp_per_pack = total_biaya.div(yieldCtx.totalPack);
  }
  if (override.hppPerPack && yieldCtx.jumlahLayak.gt(0)) {
    hpp_per_lubang = total_biaya.div(yieldCtx.jumlahLayak);
  }
  if (override.hppPerPack && yieldCtx.beratKg.gt(0)) {
    hpp_per_kg = total_biaya.div(yieldCtx.beratKg);
  }

  if (override.hppPerLubang) hpp_per_lubang = override.hppPerLubang;
  if (override.hppPerKg) hpp_per_kg = override.hppPerKg;
  if (override.hppPerPack) hpp_per_pack = override.hppPerPack;

  return {
    ...calc,
    total_biaya,
    hpp_per_lubang,
    hpp_per_kg,
    hpp_per_pack,
  };
}
