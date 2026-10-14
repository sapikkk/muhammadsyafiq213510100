/** Ubah pesan error server menjadi bahasa manusia untuk toast UI. */
export function pesanErrorUntukLayar(raw: string): string {
  let s = raw.trim();
  if (!s) return "Terjadi kesalahan. Coba lagi.";

  const map: [RegExp, string][] = [
    [
      /Active pack benih tidak ditemukan atau nonaktif/gi,
      "Paket benih tidak ditemukan atau sudah tidak aktif",
    ],
    [
      /Active pack media tidak ditemukan atau nonaktif/gi,
      "Paket media tidak ditemukan atau sudah tidak aktif",
    ],
    [/Active pack benih/gi, "Paket benih"],
    [/Active pack media/gi, "Paket media"],
    [/Active pack/gi, "Paket siap pakai"],
    [/Tanggal semai wajib format YYYY-MM-DD/gi, "Tanggal semai tidak valid. Pilih tanggal di kalender."],
    [/YYYY-MM-DD/gi, "tanggal"],
    [/Jumlah disemai/gi, "Jumlah lubang disemai"],
    [/Pack benih dan pack media/gi, "Paket benih dan paket media"],
    [/Pack media tidak mendukung/gi, "Paket media ini tidak cocok untuk perhitungan lubang"],
    [/DEPLETED/gi, "habis"],
    [/Digest/i, ""],
  ];

  for (const [re, rep] of map) {
    s = s.replace(re, rep);
  }

  if (/^Error:|^PrismaClient|^NEXT_/i.test(s)) {
    return "Terjadi kesalahan sistem. Coba lagi atau hubungi admin.";
  }

  return s.replace(/\s{2,}/g, " ").trim();
}
