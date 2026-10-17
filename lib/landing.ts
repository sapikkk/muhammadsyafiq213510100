import type { LandingBagian, Landing_Kartu, Landing_Konten } from "@prisma/client";
import type { LandingBagianId } from "@/lib/landing-bagian";
import { DEFAULT_LANDING_KARTU, DEFAULT_LANDING_KONTEN } from "@/lib/landing-defaults";
import { prisma } from "@/lib/prisma";

export type LandingKartuView = {
  id: number;
  bagian: LandingBagianId;
  urutan: number;
  judul: string;
  meta: string | null;
  teks: string | null;
  label: string | null;
  gambar: string;
  aktif: boolean;
};

export type LandingBundle = {
  konten: Landing_Konten;
  kartu: Record<LandingBagianId, LandingKartuView[]>;
};

function toView(row: Landing_Kartu): LandingKartuView {
  return {
    id: row.id,
    bagian: row.bagian as LandingBagianId,
    urutan: row.urutan,
    judul: row.judul,
    meta: row.meta,
    teks: row.teks,
    label: row.label,
    gambar: row.gambar,
    aktif: row.aktif,
  };
}

function emptyByBagian(): Record<LandingBagianId, LandingKartuView[]> {
  return {
    HERO_STACK: [],
    FACILITIES: [],
    FUNDRAISING: [],
    ROLES: [],
    SPORTS_FEATURE: [],
    ATHLETE: [],
    VERIFICATION: [],
    FOOTER: [],
  };
}

export async function ensureLandingSeeded(): Promise<void> {
  const count = await prisma.landing_Kartu.count();
  if (count > 0) return;

  await prisma.landing_Konten.upsert({
    where: { id: 1 },
    create: { id: 1, ...DEFAULT_LANDING_KONTEN },
    update: DEFAULT_LANDING_KONTEN,
  });

  await prisma.landing_Kartu.createMany({
    data: DEFAULT_LANDING_KARTU.map((k) => ({
      bagian: k.bagian as LandingBagian,
      urutan: k.urutan,
      judul: k.judul,
      meta: k.meta ?? null,
      teks: k.teks ?? null,
      label: k.label ?? null,
      gambar: k.gambar,
    })),
  });
}

function fallbackBundle(): LandingBundle {
  const konten = { id: 1, ...DEFAULT_LANDING_KONTEN } as Landing_Konten;
  const kartu = emptyByBagian();
  DEFAULT_LANDING_KARTU.forEach((k, i) => {
    kartu[k.bagian].push({
      id: -(i + 1),
      bagian: k.bagian,
      urutan: k.urutan,
      judul: k.judul,
      meta: k.meta ?? null,
      teks: k.teks ?? null,
      label: k.label ?? null,
      gambar: k.gambar,
      aktif: true,
    });
  });
  return { konten, kartu };
}

export async function loadLandingBundle(): Promise<LandingBundle> {
  try {
    await ensureLandingSeeded();

    const [konten, rows] = await Promise.all([
      prisma.landing_Konten.findUnique({ where: { id: 1 } }),
      prisma.landing_Kartu.findMany({
        where: { aktif: true },
        orderBy: [{ bagian: "asc" }, { urutan: "asc" }],
      }),
    ]);

    const kontenResolved =
      konten ??
      (await prisma.landing_Konten.create({
        data: { id: 1, ...DEFAULT_LANDING_KONTEN },
      }));

    const kartu = emptyByBagian();
    for (const row of rows) {
      const v = toView(row);
      kartu[v.bagian].push(v);
    }

    return { konten: kontenResolved, kartu };
  } catch {
    return fallbackBundle();
  }
}

export async function listLandingKartuAll(bagian?: LandingBagianId): Promise<LandingKartuView[]> {
  await ensureLandingSeeded();
  const rows = await prisma.landing_Kartu.findMany({
    where: bagian ? { bagian: bagian as LandingBagian } : undefined,
    orderBy: [{ bagian: "asc" }, { urutan: "asc" }],
  });
  return rows.map(toView);
}

export async function getLandingKontenForEdit(): Promise<Landing_Konten> {
  await ensureLandingSeeded();
  const row = await prisma.landing_Konten.findUnique({ where: { id: 1 } });
  if (row) return row;
  return prisma.landing_Konten.create({ data: { id: 1, ...DEFAULT_LANDING_KONTEN } });
}

export function nextUrutan(rows: { urutan: number }[]): number {
  if (rows.length === 0) return 0;
  return Math.max(...rows.map((r) => r.urutan)) + 1;
}
