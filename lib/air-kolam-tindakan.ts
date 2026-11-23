/** Ambang NFT rakit apung (selada/pakcoy). Bukan lab; petunjuk lapangan. */

export type BacaanAir = {
  ph: number;
  ppm: number;
  suhuC: number;
};

export type TindakanAir = {
  tingkat: "aman" | "waspada" | "bahaya";
  ringkas: string;
  langkah: string[];
};

function angka(n: number): boolean {
  return Number.isFinite(n);
}

export function tindakanDariBacaanAir(b: BacaanAir): TindakanAir {
  const langkah: string[] = [];
  let tingkat: TindakanAir["tingkat"] = "aman";

  if (!angka(b.ph) || !angka(b.ppm) || !angka(b.suhuC)) {
    return {
      tingkat: "waspada",
      ringkas: "Angka belum lengkap.",
      langkah: ["Catat pH, PPM, dan suhu sekali lagi."],
    };
  }

  if (b.ph < 5.4) {
    tingkat = "bahaya";
    langkah.push("pH rendah. Tambah pH naik sedikit, aduk, ukur ulang 15 menit.");
  } else if (b.ph > 6.8) {
    tingkat = "bahaya";
    langkah.push("pH tinggi. Tambah pH turun sedikit, aduk, ukur ulang 15 menit.");
  } else if (b.ph < 5.6 || b.ph > 6.5) {
    if (tingkat === "aman") tingkat = "waspada";
    langkah.push("pH di tepi. Cek ulang besok pagi sebelum ubah nutrisi.");
  }

  if (b.ppm < 500) {
    tingkat = "bahaya";
    langkah.push("PPM rendah. Tambah nutrisi A+B setara, jangan sendirian.");
  } else if (b.ppm > 1400) {
    tingkat = "bahaya";
    langkah.push("PPM tinggi. Encer dengan air tandon, lalu ukur ulang.");
  } else if (b.ppm < 700 || b.ppm > 1200) {
    if (tingkat === "aman") tingkat = "waspada";
    langkah.push("PPM di tepi. Sesuaikan nutrisi pelan, jangan lompat besar.");
  }

  if (b.suhuC < 18) {
    if (tingkat === "aman") tingkat = "waspada";
    langkah.push("Air dingin. Tutup tandon, kurangi aerasi malam.");
  } else if (b.suhuC > 30) {
    tingkat = "bahaya";
    langkah.push("Air panas. Naungi tandon, ganti sebagian air, cek akar.");
  } else if (b.suhuC > 28) {
    if (tingkat === "aman") tingkat = "waspada";
    langkah.push("Suhu naik. Naungi tandon sore ini.");
  }

  if (langkah.length === 0) {
    return {
      tingkat: "aman",
      ringkas: "Air dalam kisaran. Tidak perlu ubah hari ini.",
      langkah: ["Cek ulang besok. Catat jika daun pucat atau busuk."],
    };
  }

  const ringkas =
    tingkat === "bahaya" ? "Perlu tindakan hari ini." : "Perlu perhatian, jangan panik.";

  return { tingkat, ringkas, langkah };
}
