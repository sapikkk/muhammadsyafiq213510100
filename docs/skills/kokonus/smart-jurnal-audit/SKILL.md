---
name: smart-jurnal-audit
description: >
  Audit pemetaan Smart Jurnal ke COA Kokonus — cegah modal masuk penjualan sayur (4100).
---

# Audit Smart Jurnal

## Aturan emas
1. **4100 / 4200** hanya dari jurnal otomatis **pesanan jual** (DELIVERED).
2. **3100 Modal Pemilik** untuk suntikan/setoran modal pemilik atau investor (ekuitas).
3. **4300 Pendapatan Lain-lain** untuk uang masuk operasional di luar jual sayur (bunga, jasa kecil, dll.).
4. Catatan (`catatan`) tidak mengubah akun — **tipe dropdown** yang menentukan Dr/Cr.

## Gejala salah pilih tipe
- Keterangan: `Pendapatan lain … — suntikan modal` + kredit **4100** → user pilih PENDAPATAN_LAIN padahal maksud SUNTIKAN_MODAL.
- Penolakan «tidak sesuai» = reviewer melihat mismatch bisnis vs akun.

## File sumber kebenaran
- `lib/smart-jurnal.ts` — `AKUN_BY_TIPE`
- `prisma/seed-akun.js` — COA
- `lib/akun-kode.ts` — konstanta kode

## Saat audit diminta
1. Baca `keterangan` jurnal + baris akun.
2. Cocokkan dengan tabel skill `akuntansi-hidroponik`.
3. Jika REJECTED/APPROVED: hanya APPROVED masuk laporan (`lib/income-statement.ts`).
