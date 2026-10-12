import "server-only";

import { Prisma } from "@prisma/client";
import { AKUN_KODE } from "@/lib/akun-kode";
import {
  getInstitusiKeuangan,
  labelInstitusi,
  parentAkunKodeUntukInstitusi,
  type InstitusiJenis,
} from "@/lib/indonesia-institusi-keuangan";
import { prisma, runTransaction } from "@/lib/prisma";
import type { RekeningKasBaris, RekeningKasOption } from "@/lib/rekening-kas-types";

export class RekeningKasError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

function serializeOption(row: {
  nama_rekening: string;
  institusi_kode: string;
  nomor_rekening: string | null;
  akun: { kode: string; saldo: Prisma.Decimal };
}): RekeningKasOption {
  const inst = getInstitusiKeuangan(row.institusi_kode);
  return {
    akunKode: row.akun.kode,
    namaRekening: row.nama_rekening,
    institusiKode: row.institusi_kode,
    institusiNama: inst?.nama ?? labelInstitusi(row.institusi_kode),
    jenis: inst?.jenis ?? "BANK",
    nomorRekening: row.nomor_rekening,
    saldo: row.akun.saldo.toFixed(2),
    logoSlug: inst?.logoSlug,
  };
}

function serializeBaris(row: {
  id: number;
  nama_rekening: string;
  institusi_kode: string;
  nomor_rekening: string | null;
  atas_nama: string | null;
  urutan: number;
  aktif: boolean;
  akun: { kode: string; saldo: Prisma.Decimal };
}): RekeningKasBaris {
  return {
    id: row.id,
    ...serializeOption(row),
    atasNama: row.atas_nama,
    aktif: row.aktif,
    urutan: row.urutan,
  };
}

const rekeningInclude = {
  akun: { select: { kode: true, saldo: true, aktif: true } },
} as const;

export async function listRekeningKasAktif(): Promise<RekeningKasOption[]> {
  const rows = await prisma.rekening_Kas.findMany({
    where: { aktif: true, akun: { aktif: true } },
    orderBy: [{ urutan: "asc" }, { id: "asc" }],
    include: rekeningInclude,
  });
  return rows.map(serializeOption);
}

export async function listRekeningKasSemua(): Promise<RekeningKasBaris[]> {
  const rows = await prisma.rekening_Kas.findMany({
    orderBy: [{ urutan: "asc" }, { id: "asc" }],
    include: rekeningInclude,
  });
  return rows.map(serializeBaris);
}

async function nextChildKode(parentKode: typeof AKUN_KODE.KAS | typeof AKUN_KODE.BANK): Promise<string> {
  const start = parentKode === AKUN_KODE.KAS ? 1101 : 1111;
  const end = parentKode === AKUN_KODE.KAS ? 1199 : 1199;
  const used = new Set(
    (
      await prisma.akun.findMany({
        where: { kode: { startsWith: parentKode.slice(0, 2) } },
        select: { kode: true },
      })
    ).map((a) => a.kode),
  );
  used.add(parentKode);
  for (let n = start; n <= end; n++) {
    const kode = String(n);
    if (!used.has(kode)) return kode;
  }
  throw new RekeningKasError("Kode akun rekening penuh. Hubungi admin COA.", 500);
}

export type RekeningKasInput = {
  namaRekening: string;
  institusiKode: string;
  nomorRekening?: string | null;
  atasNama?: string | null;
  urutan?: number;
};

export function parseRekeningKasInput(raw: Record<string, unknown>): RekeningKasInput {
  const namaRekening = String(raw.namaRekening ?? raw.nama_rekening ?? "").trim();
  const institusiKode = String(raw.institusiKode ?? raw.institusi_kode ?? "").trim().toLowerCase();
  const nomorRekening = String(raw.nomorRekening ?? raw.nomor_rekening ?? "").trim() || null;
  const atasNama = String(raw.atasNama ?? raw.atas_nama ?? "").trim() || null;
  const urutanRaw = raw.urutan;
  const urutan =
    urutanRaw === undefined || urutanRaw === null || urutanRaw === ""
      ? 0
      : Number(urutanRaw);

  if (!namaRekening) throw new RekeningKasError("Isi nama rekening.", 400);
  if (namaRekening.length > 80) throw new RekeningKasError("Nama rekening maksimal 80 karakter.", 400);
  const inst = getInstitusiKeuangan(institusiKode);
  if (!inst) throw new RekeningKasError("Pilih bank atau e-wallet dari daftar.", 400);
  if (nomorRekening && nomorRekening.length > 40) {
    throw new RekeningKasError("Nomor rekening maksimal 40 karakter.", 400);
  }
  if (atasNama && atasNama.length > 100) {
    throw new RekeningKasError("Atas nama maksimal 100 karakter.", 400);
  }
  if (!Number.isInteger(urutan) || urutan < 0) {
    throw new RekeningKasError("Urutan tampil harus angka nol atau lebih.", 400);
  }

  return { namaRekening, institusiKode, nomorRekening, atasNama, urutan };
}

async function resolveParentAkun(jenis: InstitusiJenis) {
  const parentKode = parentAkunKodeUntukInstitusi(jenis);
  const parent = await prisma.akun.findUnique({
    where: { kode: parentKode },
    select: { id: true, aktif: true, tipe: true },
  });
  if (!parent?.aktif || parent.tipe !== "ASET") {
    throw new RekeningKasError(`Akun induk ${parentKode} belum siap.`, 500);
  }
  return { parentKode, parentId: parent.id };
}

export async function createRekeningKas(input: RekeningKasInput) {
  const inst = getInstitusiKeuangan(input.institusiKode)!;
  const { parentKode, parentId } = await resolveParentAkun(inst.jenis);

  return runTransaction(async (tx) => {
    const existingLink = await tx.rekening_Kas.findFirst({
      where: {
        institusi_kode: input.institusiKode,
        nomor_rekening: input.nomorRekening,
        nama_rekening: input.namaRekening,
      },
    });
    if (existingLink) {
      throw new RekeningKasError("Rekening dengan nama dan nomor yang sama sudah ada.", 409);
    }

    let akunKode: string;
    let akunId: number;

    if (inst.jenis === "TUNAI") {
      const kasInduk = await tx.akun.findUnique({
        where: { kode: AKUN_KODE.KAS },
        select: { id: true, aktif: true, _count: { select: { anak: true } } },
      });
      if (!kasInduk?.aktif) throw new RekeningKasError("Akun kas 1100 tidak aktif.", 500);
      if (kasInduk._count.anak === 0) {
        akunKode = AKUN_KODE.KAS;
        akunId = kasInduk.id;
      } else {
        akunKode = await nextChildKode(AKUN_KODE.KAS);
        const akun = await tx.akun.create({
          data: {
            kode: akunKode,
            nama: input.namaRekening.slice(0, 100),
            tipe: "ASET",
            parentId: kasInduk.id,
          },
        });
        akunId = akun.id;
      }
    } else {
      const bankInduk = await tx.akun.findUnique({
        where: { kode: AKUN_KODE.BANK },
        select: { id: true, aktif: true, _count: { select: { anak: true } } },
      });
      if (!bankInduk?.aktif) throw new RekeningKasError("Akun bank 1110 tidak aktif.", 500);
      if (bankInduk._count.anak === 0) {
        const linked = await tx.rekening_Kas.findFirst({ where: { akun_id: bankInduk.id } });
        if (!linked) {
          akunKode = AKUN_KODE.BANK;
          akunId = bankInduk.id;
        } else {
          akunKode = await nextChildKode(AKUN_KODE.BANK);
          const akun = await tx.akun.create({
            data: {
              kode: akunKode,
              nama: `${inst.nama} — ${input.namaRekening}`.slice(0, 100),
              tipe: "ASET",
              parentId: bankInduk.id,
            },
          });
          akunId = akun.id;
        }
      } else {
        akunKode = await nextChildKode(AKUN_KODE.BANK);
        const akun = await tx.akun.create({
          data: {
            kode: akunKode,
            nama: `${inst.nama} — ${input.namaRekening}`.slice(0, 100),
            tipe: "ASET",
            parentId: bankInduk.id,
          },
        });
        akunId = akun.id;
      }
    }

    const dupAkun = await tx.rekening_Kas.findUnique({ where: { akun_id: akunId } });
    if (dupAkun) {
      throw new RekeningKasError("Akun kas ini sudah punya rekening.", 409);
    }

    const row = await tx.rekening_Kas.create({
      data: {
        nama_rekening: input.namaRekening,
        institusi_kode: input.institusiKode,
        nomor_rekening: input.nomorRekening,
        atas_nama: input.atasNama,
        akun_id: akunId,
        urutan: input.urutan ?? 0,
      },
      include: rekeningInclude,
    });

    void parentKode;
    return serializeBaris(row);
  });
}

export async function updateRekeningKas(id: number, input: Partial<RekeningKasInput> & { aktif?: boolean }) {
  const existing = await prisma.rekening_Kas.findUnique({
    where: { id },
    include: { akun: true },
  });
  if (!existing) throw new RekeningKasError("Rekening tidak ditemukan.", 404);

  const institusiKode = input.institusiKode ?? existing.institusi_kode;
  const inst = getInstitusiKeuangan(institusiKode);
  if (!inst) throw new RekeningKasError("Institusi tidak dikenal.", 400);

  const row = await prisma.rekening_Kas.update({
    where: { id },
    data: {
      nama_rekening: input.namaRekening ?? existing.nama_rekening,
      institusi_kode: institusiKode,
      nomor_rekening:
        input.nomorRekening !== undefined ? input.nomorRekening : existing.nomor_rekening,
      atas_nama: input.atasNama !== undefined ? input.atasNama : existing.atas_nama,
      urutan: input.urutan ?? existing.urutan,
      aktif: input.aktif ?? existing.aktif,
    },
    include: rekeningInclude,
  });

  if (input.namaRekening && input.namaRekening !== existing.nama_rekening) {
    await prisma.akun.update({
      where: { id: existing.akun_id },
      data: { nama: input.namaRekening.slice(0, 100) },
    });
  }

  return serializeBaris(row);
}

/** Rekening bawaan dari COA 1100/1110 jika belum ada baris Rekening_Kas. */
export async function ensureRekeningKasDefaults(): Promise<void> {
  const pairs: { kode: typeof AKUN_KODE.KAS | typeof AKUN_KODE.BANK; inst: string; nama: string }[] = [
    { kode: AKUN_KODE.KAS, inst: "tunai", nama: "Kas tunai" },
    { kode: AKUN_KODE.BANK, inst: "bank_lain", nama: "Rekening bank" },
  ];
  for (const p of pairs) {
    const akun = await prisma.akun.findUnique({ where: { kode: p.kode } });
    if (!akun?.aktif) continue;
    const linked = await prisma.rekening_Kas.findUnique({ where: { akun_id: akun.id } });
    if (linked) continue;
    await prisma.rekening_Kas.create({
      data: {
        nama_rekening: p.nama,
        institusi_kode: p.inst,
        akun_id: akun.id,
        urutan: p.kode === AKUN_KODE.KAS ? 0 : 1,
      },
    });
  }
}
