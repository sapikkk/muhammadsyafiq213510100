/**
 * Satu perintah: operasi 1 tahun + siklus aktif + jurnal keuangan + rekening kas.
 * npm run seed:owner-alur
 *
 * Setelah seed, login owner@kokonus.farm / KokonusDemo2026 — ikuti checklist di konsol.
 */
const { execSync } = require("node:child_process");

function run(label, cmd) {
  console.log(`\n— ${label} —`);
  execSync(cmd, { stdio: "inherit", env: process.env });
}

function printAlurOwner() {
  console.log(`
Alur demo Owner (data saling terhubung):

  1. Varietas & lahan     → /owner/infrastruktur  (Greenhouse Kokonus, Kolam 1–6, katalog varietas)
  2. Produksi             → /owner/produksi         (batch selesai + 5 batch aktif di berbagai fase)
  3. Kegagalan & susut    → /owner/kegagalan-susut (?bagian=… — ada log MENUNGGU)
  4. Biaya & HPP          → /owner/biaya            (biaya langsung + HPP per siklus panen)
  5. Penjualan            → /owner/penjualan        (pesanan DELIVERED dari panen)
  6. Evaluasi             → /owner/evaluasi
  7. Laporan keuangan     → /owner/laporan?laporan=laba-rugi  (jurnal penjualan + penyusutan)
                          → /owner/jurnal           (debit/kredit lengkap)
                          → /owner/rekening         (kas/bank terhubung COA 1100/1110)

Filter laporan: bulan berjalan (YYYY-MM) — pastikan ada penjualan & penyusutan di bulan itu setelah seed.
`);
}

function main() {
  run("Operasi + panen + penjualan", "npm run seed:kokonus-tahun");
  run("Jurnal penjualan & penyusutan", "npm run seed:keuangan");
  run("Rekening kas", "node --env-file=.env prisma/seed-rekening-kas-standalone.js");
  printAlurOwner();
}

main();
