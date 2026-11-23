import "server-only";

import { Prisma } from "@prisma/client";
import { keTanggalIso } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { gramBenihUntukLubang, mediaUnitUntukLubang } from "@/lib/pack-kapasitas-lubang";
import {
  catatanSemaiSingkat,
  lubangDariSemaiSingkat,
  parseBaki,
  parseKisaranSemai,
} from "@/lib/petani-semai-angka";
import { isItemBenih, isItemMedia } from "@/lib/siklus-pack";
import { SiklusError, buatSiklusSemai } from "@/lib/siklus-produksi";

function normalNama(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function mulaiSemaiPetaniSingkat(
  raw: Record<string, unknown>,
  userId: number,
) {
  const kolamId = Number(raw.kolamId);
  if (!Number.isInteger(kolamId) || kolamId <= 0) {
    throw new SiklusError("Pilih kolam di papan.", 400);
  }
  const namaSayur = String(raw.namaSayur ?? "").trim();
  if (namaSayur.length < 2) {
    throw new SiklusError("Isi nama sayur.", 400);
  }

  const baki = (() => {
    try {
      return parseBaki(raw.jumlahBaki);
    } catch (e) {
      throw new SiklusError(e instanceof Error ? e.message : "Baki tidak valid.", 400);
    }
  })();

  const kisaranAsli = String(raw.kisaranSemai ?? "").trim();
  const kisaran = (() => {
    try {
      return parseKisaranSemai(kisaranAsli);
    } catch (e) {
      throw new SiklusError(e instanceof Error ? e.message : "Kisaran tidak valid.", 400);
    }
  })();

  const kolam = await prisma.kolam.findUnique({
    where: { id: kolamId },
    select: { id: true, status: true, kapasitas_lubang: true, nama: true },
  });
  if (!kolam) throw new SiklusError("Kolam tidak ditemukan.", 404);
  if (kolam.status !== "MENGANGGUR") {
    throw new SiklusError("Kolam ini sedang dipakai. Pilih sektor kosong.", 400);
  }

  const jumlahDisemai = (() => {
    try {
      return lubangDariSemaiSingkat({
        baki,
        kisaranTengah: kisaran.tengah,
        kapasitasKolam: kolam.kapasitas_lubang,
      });
    } catch (e) {
      throw new SiklusError(e instanceof Error ? e.message : "Jumlah semai tidak valid.", 400);
    }
  })();

  const cari = normalNama(namaSayur);
  const varietasRows = await prisma.varietas.findMany({
    where: { status: "AKTIF" },
    select: { id: true, nama: true, biji_per_gram: true },
  });
  const varietas =
    varietasRows.find((v) => normalNama(v.nama) === cari) ??
    varietasRows.find((v) => normalNama(v.nama).includes(cari) || cari.includes(normalNama(v.nama)));
  if (!varietas) {
    throw new SiklusError(
      `Sayur «${namaSayur}» belum ada di daftar varietas. Minta admin menambahkannya.`,
      400,
    );
  }

  const packs = await prisma.activePack.findMany({
    where: { status: "AKTIF" },
    include: { item: { select: { kode: true, nama: true } } },
  });

  const gramPerlu = gramBenihUntukLubang(jumlahDisemai, varietas.biji_per_gram);
  const packBenih = packs.find(
    (p) => isItemBenih(p.item.kode) && p.sisaUnit.gte(gramPerlu),
  );
  if (!packBenih) {
    throw new SiklusError("Paket benih tidak cukup atau belum ada. Isi stok dulu.", 400);
  }

  const mediaPerlu = mediaUnitUntukLubang(jumlahDisemai);
  const packMedia = packs.find(
    (p) => isItemMedia(p.item.kode) && p.id !== packBenih.id && p.sisaUnit.gte(mediaPerlu),
  );

  const siklus = await buatSiklusSemai(
    {
      varietasId: varietas.id,
      kolamId: kolam.id,
      tanggalSemai: new Date(`${keTanggalIso(new Date())}T12:00:00.000Z`),
      jumlahDisemai,
      activePackBenihId: packBenih.id,
      jumlahBenihPakai: gramPerlu,
      activePackMediaId: packMedia?.id ?? null,
      jumlahMediaPakai: packMedia ? mediaPerlu : null,
    },
    userId,
  );

  await prisma.log_Produksi.create({
    data: {
      siklus_id: siklus.id,
      fase_dari: "SEMAI",
      fase_ke: "SEMAI",
      catatan: catatanSemaiSingkat(baki, kisaranAsli),
      userId,
    },
  });

  return siklus;
}
