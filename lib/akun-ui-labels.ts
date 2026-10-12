/** Teks akun di layar — nama dulu, kode untuk pencarian. */

export function labelAkunDropdown(akun: { kode: string; nama: string }): string {
  return akun.nama;
}

/** Gabungan untuk filter tabel (nama + kode). */
export function labelAkunCari(akun: { kode: string; nama: string }): string {
  return `${akun.nama} ${akun.kode}`;
}
