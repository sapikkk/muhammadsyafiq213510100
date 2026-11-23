import "server-only";

import { prisma } from "@/lib/prisma";
import { tindakanDariBacaanAir } from "@/lib/air-kolam-tindakan";
import { siklusBolehMonitorKolam } from "@/lib/monitor-kolam-fase";
import { faseLabel, isFaseProduksi } from "@/lib/siklus-fase";
import { SEKTOR_PAPAN, type SektorKolamPapan, type TitikRiwayatKolam } from "@/lib/petani-kolam-papan-types";

export type { SektorKolamPapan, TitikRiwayatKolam };
export { SEKTOR_PAPAN };

export async function loadPapanKolamPetani(): Promise<SektorKolamPapan[]> {
  const kolam = await prisma.kolam.findMany({
    orderBy: { id: "asc" },
    take: SEKTOR_PAPAN,
    include: {
      greenhouse: { select: { nama: true } },
      siklus: {
        where: { status: { notIn: ["SELESAI", "GAGAL_TOTAL"] } },
        orderBy: { id: "desc" },
        take: 1,
        include: {
          varietas: { select: { nama: true } },
          logMonitorKolam: {
            orderBy: { waktu: "asc" },
            take: 24,
            select: { waktu: true, ph: true, ppm: true, suhu_c: true },
          },
        },
      },
    },
  });

  const slots: SektorKolamPapan[] = [];
  for (let i = 0; i < SEKTOR_PAPAN; i++) {
    const k = kolam[i];
    if (!k) {
      slots.push({
        slot: i + 1,
        kolamId: null,
        nama: `Sektor ${i + 1}`,
        greenhouse: "",
        kapasitas: 0,
        kosong: true,
        siklus: null,
        bacaanTerakhir: null,
        tindakan: null,
        riwayat: [],
      });
      continue;
    }

    const aktif = k.siklus[0] ?? null;
    const riwayat: TitikRiwayatKolam[] =
      aktif?.logMonitorKolam.map((r) => ({
        waktu: r.waktu.toISOString(),
        ph: Number(r.ph),
        ppm: Number(r.ppm),
        suhu: Number(r.suhu_c),
      })) ?? [];
    const last = riwayat[riwayat.length - 1] ?? null;
    const faseOk = aktif ? isFaseProduksi(aktif.status) : false;

    slots.push({
      slot: i + 1,
      kolamId: k.id,
      nama: k.nama,
      greenhouse: k.greenhouse.nama,
      kapasitas: k.kapasitas_lubang,
      kosong: !aktif,
      siklus: aktif
        ? {
            id: aktif.id,
            sayur: aktif.varietas.nama,
            fase: isFaseProduksi(aktif.status) ? faseLabel[aktif.status] : aktif.status,
            jumlahDisemai: aktif.jumlah_disemai,
            totalSusut: aktif.total_susut,
            bolehMonitor: siklusBolehMonitorKolam(aktif.status),
            bolehGagal: faseOk && aktif.status !== "SELESAI",
          }
        : null,
      bacaanTerakhir: last
        ? { ph: last.ph, ppm: last.ppm, suhu: last.suhu, waktu: last.waktu }
        : null,
      tindakan: last
        ? tindakanDariBacaanAir({ ph: last.ph, ppm: last.ppm, suhuC: last.suhu })
        : null,
      riwayat,
    });
  }

  return slots;
}
