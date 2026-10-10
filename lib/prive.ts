import { Prisma } from "@prisma/client";
import { createJurnal, JurnalError } from "@/lib/jurnal";
import { KasSumberError, parseSumberKasKode, resolveKasAkunId } from "@/lib/kas-sumber";
import { prisma } from "@/lib/prisma";

export class PriveError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

function parseMoney(raw: unknown): Prisma.Decimal {
  const text = String(raw ?? "").trim().replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(text) || text === "0" || text === "0.00") {
    throw new PriveError("Nominal prive harus angka lebih dari nol.", 400);
  }
  return new Prisma.Decimal(text);
}

export async function createPriveJurnal(
  raw: Record<string, unknown>,
  ownerUserId: number,
) {
  const tanggalText = String(raw.tanggal ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggalText)) {
    throw new PriveError("Isi tanggal prive.", 400);
  }
  const nominal = parseMoney(raw.nominal);
  const catatan = String(raw.catatan ?? "").trim();
  const keterangan =
    catatan.length > 0
      ? `Prive Owner — ${catatan}`.slice(0, 255)
      : "Prive Owner";

  let kasKode;
  try {
    kasKode = parseSumberKasKode(raw.sumberKas);
  } catch (error) {
    if (error instanceof KasSumberError) {
      throw new PriveError(error.message, error.status);
    }
    throw error;
  }

  const akunPrive = await prisma.akun.findUnique({ where: { kode: "3200" } });
  if (!akunPrive?.aktif) {
    throw new PriveError("Akun Prive (3200) belum siap.", 400);
  }
  let kasId: number;
  try {
    kasId = await resolveKasAkunId(prisma, kasKode);
  } catch (error) {
    if (error instanceof KasSumberError) {
      throw new PriveError(error.message, error.status);
    }
    throw error;
  }

  try {
    return await createJurnal(
      {
        tanggal: new Date(tanggalText),
        keterangan,
        status: "PENDING",
        baris: [
          { akunId: akunPrive.id, debit: nominal, kredit: new Prisma.Decimal(0) },
          { akunId: kasId, debit: new Prisma.Decimal(0), kredit: nominal },
        ],
      },
      ownerUserId,
    );
  } catch (error) {
    if (error instanceof JurnalError) {
      throw new PriveError(error.message, error.status);
    }
    throw error;
  }
}
