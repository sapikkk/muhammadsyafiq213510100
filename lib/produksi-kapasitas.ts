import "server-only";

import { prisma } from "@/lib/prisma";
import { STATUS_GAGAL_TOTAL } from "@/lib/siklus-abort-status";
import { faseLabel, isFaseProduksi, type FaseProduksi } from "@/lib/siklus-fase";
/** Selaras stok pesanan aktif di lib/sales-order.ts */
const STATUS_PESANAN_STOK = ["CONFIRMED", "SHIPPED", "DELIVERED"] as const;

import type {
  FaseMetrikBaris,
  KapasitasKolamRingkas,
  KolamIsiBaris,
  ProduksiRingkasan,
} from "@/lib/produksi-kapasitas-types";

export type {
  FaseMetrikBaris,
  KapasitasKolamRingkas,
  KolamIsiBaris,
  ProduksiRingkasan,
} from "@/lib/produksi-kapasitas-types";

export const FASE_METRIK_TAMPIL: FaseProduksi[] = [
  "SEMAI",
  "SPROUT_DAUN",
  "TAMBAL",
  "PENDEWASAAN",
];

export function kolamSedangProduksi(status: string) {
  return status.trim().toUpperCase() !== "MENGANGGUR";
}

function pct(part: number, whole: number) {
  if (whole <= 0) return 0;
  return Math.round((part / whole) * 1000) / 10;
}

function tanamAktif(jumlahDisemai: number, totalSusut: number) {
  return Math.max(0, jumlahDisemai - totalSusut);
}

export async function loadProduksiRingkasan(): Promise<ProduksiRingkasan> {
  const [kolams, siklusAktif, siapJualRows] = await Promise.all([
    prisma.kolam.findMany({
      select: { id: true, kapasitas_lubang: true, status: true },
      orderBy: { id: "asc" },
    }),
    prisma.siklus_Produksi.findMany({
      where: {
        status: { notIn: ["SELESAI", STATUS_GAGAL_TOTAL] },
      },
      select: {
        id: true,
        kolam_id: true,
        status: true,
        jumlah_disemai: true,
        total_susut: true,
      },
      orderBy: { id: "desc" },
    }),
    prisma.siklus_Produksi.findMany({
      where: {
        status: "SELESAI",
        laporanPanen: { status: "APPROVED" },
      },
      select: {
        id: true,
        laporanPanen: { select: { jumlah_layak: true } },
      },
    }),
  ]);

  const siklusPerKolam = new Map<number, (typeof siklusAktif)[number]>();
  for (const s of siklusAktif) {
    if (!siklusPerKolam.has(s.kolam_id)) siklusPerKolam.set(s.kolam_id, s);
  }

  let totalLubang = 0;
  let lubangTerisi = 0;
  let kolamProduksi = 0;
  let kolamKosong = 0;
  const kolamIsi: KolamIsiBaris[] = [];

  for (const k of kolams) {
    totalLubang += k.kapasitas_lubang;
    const s = siklusPerKolam.get(k.id);
    const terisi = s ? tanamAktif(s.jumlah_disemai, s.total_susut) : 0;
    lubangTerisi += terisi;
    if (kolamSedangProduksi(k.status) || s) {
      kolamProduksi += 1;
    } else {
      kolamKosong += 1;
    }
    kolamIsi.push({
      kolamId: k.id,
      kapasitas: k.kapasitas_lubang,
      terisi,
      pctTerisi: pct(terisi, k.kapasitas_lubang),
      pctKosong: pct(Math.max(0, k.kapasitas_lubang - terisi), k.kapasitas_lubang),
      fase: s && isFaseProduksi(s.status) ? s.status : null,
    });
  }

  const lubangKosong = Math.max(0, totalLubang - lubangTerisi);

  const faseMap = new Map<FaseProduksi, { batch: number; lubang: number }>();
  for (const f of FASE_METRIK_TAMPIL) {
    faseMap.set(f, { batch: 0, lubang: 0 });
  }
  for (const s of siklusAktif) {
    if (!isFaseProduksi(s.status) || !FASE_METRIK_TAMPIL.includes(s.status as FaseProduksi)) {
      continue;
    }
    const f = s.status as FaseProduksi;
    const row = faseMap.get(f)!;
    row.batch += 1;
    row.lubang += tanamAktif(s.jumlah_disemai, s.total_susut);
  }

  const fase: FaseMetrikBaris[] = FASE_METRIK_TAMPIL.map((f) => {
    const row = faseMap.get(f)!;
    return {
      fase: f,
      label: faseLabel[f],
      jumlahBatch: row.batch,
      lubang: row.lubang,
    };
  });

  const siapIds = siapJualRows.map((r) => r.id);
  const dipesanRows =
    siapIds.length > 0
      ? await prisma.sales_Order_Baris.groupBy({
          by: ["siklus_id"],
          where: {
            siklus_id: { in: siapIds },
            sales_order: { status: { in: [...STATUS_PESANAN_STOK] } },
          },
          _sum: { lubang_terpakai: true },
        })
      : [];
  const dipesanMap = new Map(
    dipesanRows.map((r) => [r.siklus_id, r._sum.lubang_terpakai ?? 0]),
  );
  let siapJualLubang = 0;
  for (const row of siapJualRows) {
    const layak = row.laporanPanen?.jumlah_layak ?? 0;
    const dipesan = dipesanMap.get(row.id) ?? 0;
    siapJualLubang += Math.max(0, layak - dipesan);
  }

  return {
    kapasitas: {
      totalLubang,
      lubangTerisi,
      lubangKosong,
      pctTerisi: pct(lubangTerisi, totalLubang),
      pctKosong: pct(lubangKosong, totalLubang),
      kolamProduksi,
      kolamKosong,
    },
    fase,
    siapJualLubang,
    kolamIsi,
  };
}

export function kolamIsiMap(kolamIsi: KolamIsiBaris[]) {
  return new Map(kolamIsi.map((k) => [k.kolamId, k]));
}
