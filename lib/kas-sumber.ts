import { AKUN_KODE } from "@/lib/akun-kode";
import { prisma } from "@/lib/prisma";

export type SumberKasKode = typeof AKUN_KODE.KAS | typeof AKUN_KODE.BANK;

export class KasSumberError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export function parseSumberKasKode(raw: unknown): SumberKasKode {
  const k = String(raw ?? AKUN_KODE.KAS).trim();
  if (k === AKUN_KODE.BANK) return AKUN_KODE.BANK;
  if (k === AKUN_KODE.KAS) return AKUN_KODE.KAS;
  throw new KasSumberError("Sumber kas harus 1100 (tunai) atau 1110 (bank).", 400);
}

type KasTx = Pick<typeof prisma, "akun">;

export async function resolveKasAkunId(tx: KasTx, kode: SumberKasKode): Promise<number> {
  const akun = await tx.akun.findUnique({
    where: { kode },
    select: { id: true, aktif: true, _count: { select: { anak: true } } },
  });
  if (!akun?.aktif || akun._count.anak > 0) {
    throw new KasSumberError(`Akun kas ${kode} tidak siap posting.`, 500);
  }
  return akun.id;
}
