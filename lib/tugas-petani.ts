import { listAlertStokMinimum } from "@/lib/inventaris";
import { prisma } from "@/lib/prisma";
import { faseBerikutnya, faseLabel, isFaseProduksi } from "@/lib/siklus-fase";
import { listSiklusProduksi } from "@/lib/siklus-produksi";

export type TugasPetani = {
  id: string;
  prioritas: "tinggi" | "sedang" | "rendah";
  judul: string;
  deskripsi: string;
  href: string;
};

export async function daftarTugasPetani(): Promise<TugasPetani[]> {
  const [siklus, stokRendah] = await Promise.all([listSiklusProduksi(), listAlertStokMinimum()]);
  const tugas: TugasPetani[] = [];

  for (const row of stokRendah.slice(0, 5)) {
    tugas.push({
      id: `stok-${row.id}`,
      prioritas: "tinggi",
      judul: `Stok rendah: ${row.nama}`,
      deskripsi: `Sisa ${row.stokSaatIni.toString()} ${row.satuan} (min ${row.stokMinimum.toString()})`,
      href: "/petani/stok-rendah",
    });
  }

  for (const s of siklus) {
    if (s.status === "SELESAI") continue;
    const href = `/petani/siklus/${s.id}`;
    const batch = s.kode_batch;

    if (s.status === "PANEN" && !s.laporanPanen) {
      tugas.push({
        id: `panen-${s.id}`,
        prioritas: "tinggi",
        judul: `Kirim laporan panen — ${batch}`,
        deskripsi: "Batch sudah fase panen, laporan belum dikirim.",
        href,
      });
      continue;
    }

    if (isFaseProduksi(s.status)) {
      const berikut = faseBerikutnya(s.status);
      if (berikut && berikut !== "SELESAI") {
        tugas.push({
          id: `fase-${s.id}`,
          prioritas: "sedang",
          judul: `Lanjut fase — ${batch}`,
          deskripsi: `Saat ini ${faseLabel[s.status]} → ${faseLabel[berikut]}`,
          href,
        });
      }
      if (["SPROUT_DAUN", "TAMBAL"].includes(s.status)) {
        tugas.push({
          id: `tambal-${s.id}`,
          prioritas: "sedang",
          judul: `Pantau / tambal — ${batch}`,
          deskripsi: "Catat monitor pertumbuhan atau tambal susulan bila ada gagal.",
          href,
        });
      }
    }
  }

  const order = { tinggi: 0, sedang: 1, rendah: 2 };
  return tugas.sort((a, b) => order[a.prioritas] - order[b.prioritas]);
}

export type HistoriPetaniBaris = {
  waktu: Date;
  jenis: "fase" | "monitor" | "tambal" | "kegagalan";
  ringkasan: string;
  siklus_kode: string;
  href: string;
};

export async function historiAktivitasPetani(limit = 15): Promise<HistoriPetaniBaris[]> {
  const logs = await prisma.log_Produksi.findMany({
    orderBy: { waktu: "desc" },
    take: limit * 2,
    include: {
      siklus: { select: { kode_batch: true, id: true } },
      user: { select: { nama: true } },
    },
  });

  const kegagalan = await prisma.log_Kegagalan.findMany({
    orderBy: { id: "desc" },
    take: limit,
    include: { siklus: { select: { kode_batch: true, id: true } } },
  });

  const baris: HistoriPetaniBaris[] = [];

  for (const log of logs) {
    const catatan = log.catatan ?? "";
    let jenis: HistoriPetaniBaris["jenis"] = "fase";
    let ringkasan = `${log.fase_dari} → ${log.fase_ke}`;
    if (catatan.startsWith("Monitor:")) {
      jenis = "monitor";
      ringkasan = catatan;
    } else if (catatan.startsWith("Tambal:")) {
      jenis = "tambal";
      ringkasan = catatan;
    } else if (log.fase_dari !== log.fase_ke) {
      ringkasan = `${log.fase_dari} → ${log.fase_ke}${catatan ? ` (${catatan})` : ""}`;
    } else if (catatan) {
      ringkasan = catatan;
    }

    baris.push({
      waktu: log.waktu,
      jenis,
      ringkasan,
      siklus_kode: log.siklus.kode_batch,
      href: `/petani/siklus/${log.siklus.id}`,
    });
  }

  for (const k of kegagalan) {
    baris.push({
      waktu: new Date(k.id * 1000),
      jenis: "kegagalan",
      ringkasan: `Kegagalan ${k.tahap}: ${k.jumlah_gagal} — ${k.penyebab.slice(0, 80)}`,
      siklus_kode: k.siklus.kode_batch,
      href: `/petani/siklus/${k.siklus.id}`,
    });
  }

  baris.sort((a, b) => b.waktu.getTime() - a.waktu.getTime());
  return baris.slice(0, limit);
}
