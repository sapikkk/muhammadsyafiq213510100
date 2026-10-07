import { Prisma, type Akun, type TipeAkun } from "@prisma/client";
import { tipeAkunLabel, tipeAkunList } from "@/lib/akun-tipe";
import { prisma } from "@/lib/prisma";

export class AkunError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export type AkunInput = {
  kode: string;
  nama: string;
  tipe: TipeAkun;
  parentId: number | null;
};

function isTipe(value: string): value is TipeAkun {
  return (tipeAkunList as string[]).includes(value);
}

function parseParentId(raw: unknown): number | null {
  if (raw === null || raw === undefined || raw === "") return null;
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AkunError("Akun induk tidak dikenal.", 400);
  }
  return id;
}

export function parseAkunInput(raw: Record<string, unknown>): AkunInput {
  const kode = String(raw.kode ?? "").trim();
  const nama = String(raw.nama ?? "").trim();
  const tipe = String(raw.tipe ?? "").trim();

  if (!kode || !nama || !tipe) {
    throw new AkunError("Isi kode, nama, dan tipe akun.", 400);
  }
  if (!/^[0-9]{1,20}$/.test(kode)) {
    throw new AkunError("Kode akun hanya angka, maksimal 20 digit.", 400);
  }
  if (nama.length > 100) {
    throw new AkunError("Nama akun maksimal 100 karakter.", 400);
  }
  if (!isTipe(tipe)) {
    throw new AkunError("Tipe akun tidak dikenal.", 400);
  }
  return { kode, nama, tipe, parentId: parseParentId(raw.parentId) };
}

async function assertParent(parentId: number | null, tipe: TipeAkun) {
  if (parentId === null) return;
  const parent = await prisma.akun.findUnique({ where: { id: parentId } });
  if (!parent || !parent.aktif) {
    throw new AkunError("Akun induk tidak ditemukan atau nonaktif.", 400);
  }
  if (parent.tipe !== tipe) {
    throw new AkunError(
      `Tipe harus sama dengan induknya (${tipeAkunLabel[parent.tipe]}).`,
      400,
    );
  }
}

function translatePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      throw new AkunError("Kode akun ini sudah dipakai.", 409);
    }
    if (error.code === "P2025") {
      throw new AkunError("Akun tidak ditemukan.", 404);
    }
  }
  throw error;
}

export async function createAkun(input: AkunInput): Promise<Akun> {
  await assertParent(input.parentId, input.tipe);
  return prisma.akun.create({ data: input }).catch(translatePrismaError);
}

export async function updateAkun(id: number, input: AkunInput): Promise<Akun> {
  if (input.parentId === id) {
    throw new AkunError("Akun tidak bisa menjadi induk dirinya sendiri.", 400);
  }
  await assertParent(input.parentId, input.tipe);
  const anakBedaTipe = await prisma.akun.count({
    where: { parentId: id, tipe: { not: input.tipe } },
  });
  if (anakBedaTipe > 0) {
    throw new AkunError("Ubah tipe akun anak dulu agar tetap seragam.", 400);
  }
  return prisma.akun
    .update({ where: { id }, data: input })
    .catch(translatePrismaError);
}

// Soft delete. Baris tetap ada agar jurnal lama (US2.2) tetap merujuk akun ini.
export async function setAkunAktif(id: number, aktif: boolean): Promise<Akun> {
  if (!aktif) {
    const anakAktif = await prisma.akun.count({
      where: { parentId: id, aktif: true },
    });
    if (anakAktif > 0) {
      throw new AkunError("Nonaktifkan akun anak dulu.", 400);
    }
  }
  return prisma.akun
    .update({ where: { id }, data: { aktif } })
    .catch(translatePrismaError);
}

export type AkunNode = Akun & { anak: AkunNode[] };

export function buildTree(rows: Akun[]): AkunNode[] {
  const nodes = new Map<number, AkunNode>(
    rows.map((row) => [row.id, { ...row, anak: [] }]),
  );
  const roots: AkunNode[] = [];
  for (const node of Array.from(nodes.values())) {
    const parent = node.parentId ? nodes.get(node.parentId) : undefined;
    (parent ? parent.anak : roots).push(node);
  }
  return roots;
}

export function listAkun() {
  return prisma.akun.findMany({ orderBy: { kode: "asc" } });
}
