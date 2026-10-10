# Pelatihan 6 pengguna — go-live (T5.9)

Sesi singkat (~45 menit) untuk Owner, Admin, dan Petani sebelum operasi harian. Sandi awal demo: lihat `prisma/seed.js` (jangan tulis di slide publik).

## Peserta (6 orang)

| # | Peran | Akun seed | Fokus latihan |
| --- | --- | --- | --- |
| 1 | Owner | owner@kokonus.farm | KPI, pie biaya, evaluasi margin/BEP, ekspor laporan |
| 2 | Admin | admin@kokonus.farm | Jurnal, filter, approve, stok, panen, SO |
| 3 | Petani | petani@kokonus.farm | Siklus, pindah fase HP, panen, stok rendah |
| 4–6 | Petani tambahan | darusman@… / akun dari Owner | Login, ganti sandi wajib, satu alur siklus |

(Tambah akun Petani lewat **Owner → Kelola user** jika perlu sampai 6 login unik.)

## Agenda

1. **Login & sandi** (10 m) — semua peran; Petani baru lewat `/ganti-sandi` jika `mustChangePassword`.
2. **Petani** (10 m) — daftar siklus → detail → centang konfirmasi → **Lanjut fase**; lihat log fase.
3. **Admin** (10 m) — alert stok → jurnal → filter tanggal → cari DataTable → approve contoh.
4. **Owner** (10 m) — dashboard “bulan laba tertinggi” → **Pie biaya** → evaluasi BEP (tanpa Excel).
5. **Q&A & checklist** (5 m) — [`docs/uji-blackbox.md`](../uji-blackbox.md) section Sprint 5.

## Checklist go-live

- [ ] URL production + `NEXTAUTH_URL` benar
- [ ] Enam user bisa login tanpa error 500 berulang
- [ ] Satu jurnal manual debit = kredit disetujui
- [ ] Satu pindah fase petani tercatat di log
- [ ] Owner membaca tren laba < 30 detik (T5.3 AC)

## Setelah pelatihan

- PO menutup issue T5.9; temuan baru masuk T5.5 / issue terpisah.
- Dokumentasi deploy: [`docs/deployment/vercel-go-live.md`](../deployment/vercel-go-live.md).
