import "server-only";

import { AKUN_KODE } from "@/lib/akun-kode";
import { prisma } from "@/lib/prisma";

/** Kode akun daun yang boleh diposting sebagai sumber/tujuan kas. */
export type SumberKasKode = string;

export class KasSumberError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

const KAS_PREFIX = AKUN_KODE.KAS.slice(0, 2);

function looksLikeKasKode(k: string): boolean {
  if (k === AKUN_KODE.KAS || k === AKUN_KODE.BANK) return true;
  if (!/^\d{4,20}$/.test(k)) return false;
  return k.startsWith(KAS_PREFIX);
}

export function parseSumberKasKode(raw: unknown): SumberKasKode {
  const k = String(raw ?? AKUN_KODE.KAS).trim();
  if (!looksLikeKasKode(k)) {
    throw new KasSumberError("Pilih rekening kas atau bank yang valid.", 400);
  }
  return k;
}

type KasTx = Pick<typeof prisma, "akun">;

async function isUnderKasTree(
  tx: KasTx,
  akun: { id: number; kode: string; parentId: number | null },
): Promise<boolean> {
  if (akun.kode === AKUN_KODE.KAS || akun.kode === AKUN_KODE.BANK) return true;
  let cur: { id: number; kode: string; parentId: number | null } | null = akun;
  for (let depth = 0; depth < 8 && cur; depth++) {
    if (cur.kode === AKUN_KODE.KAS || cur.kode === AKUN_KODE.BANK) return true;
    if (!cur.parentId) return false;
    cur = await tx.akun.findUnique({
      where: { id: cur.parentId },
      select: { id: true, kode: true, parentId: true },
    });
  }
  return false;
}

export async function resolveKasAkunId(tx: KasTx, kode: SumberKasKode): Promise<number> {
  const akun = await tx.akun.findUnique({
    where: { kode },
    select: {
      id: true,
      kode: true,
      parentId: true,
      aktif: true,
      tipe: true,
      _count: { select: { anak: true } },
    },
  });
  if (!akun?.aktif || akun.tipe !== "ASET") {
    throw new KasSumberError(`Akun kas ${kode} tidak siap posting.`, 500);
  }
  if (akun._count.anak > 0) {
    throw new KasSumberError(
      `Akun ${kode} punya sub-akun. Pilih rekening spesifik.`,
      400,
    );
  }
  if (!(await isUnderKasTree(tx, akun))) {
    throw new KasSumberError("Akun bukan bagian kas/bank (1100/1110).", 400);
  }
  return akun.id;
}
