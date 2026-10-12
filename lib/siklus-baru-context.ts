import "server-only";

import { listActivePack } from "@/lib/active-pack";
import { keTanggalIso } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { listVarietas } from "@/lib/varietas";

export async function loadSiklusBaruContext() {
  const [varietasRows, kolamRows, packs] = await Promise.all([
    listVarietas(true),
    prisma.kolam.findMany({
      where: { status: "MENGANGGUR" },
      orderBy: { id: "asc" },
      select: {
        id: true,
        nama: true,
        kapasitas_lubang: true,
        greenhouse: { select: { nama: true } },
      },
    }),
    listActivePack(true),
  ]);

  const varietas = varietasRows
    .filter((v) => v.status === "AKTIF")
    .map((v) => ({
      id: v.id,
      nama: v.nama,
      bijiPerGram: Number(v.biji_per_gram),
    }));

  const packsAktif = packs
    .filter((p) => p.status === "AKTIF")
    .map((p) => ({
      id: p.id,
      kode: p.kode,
      itemKode: p.item.kode,
      itemNama: p.item.nama,
      satuan: p.item.satuan,
      sisaUnit: p.sisaUnit.toString(),
    }));

  return {
    varietas,
    kolam: kolamRows.map((k) => ({
      id: k.id,
      label: `${k.greenhouse.nama} / ${k.nama}`,
      kapasitas: k.kapasitas_lubang,
    })),
    packs: packsAktif,
    tanggalAwal: keTanggalIso(new Date()),
  };
}
