---
name: akuntansi-hidroponik
description: >-
  Merancang, memeriksa, dan mengimplementasikan logika akuntansi/logistik UMKM
  hidroponik greenhouse (WIP, lubang, Smart Jurnal, DP, jurnal baku). Aktif saat
  user membahas COA, HPP, panen, SO, blueprint akuntansi, atau debit/kredit.
---

# Skill: Akuntansi Hidroponik Greenhouse

Bantu user (mahasiswa skripsi, sistem digitalisasi tata kelola UMKM hidroponik) merancang, memeriksa, dan mengimplementasikan logika akuntansi dan logistik. Jawab dalam Bahasa Indonesia, ringkas, dan praktis.

**Referensi repo (Kokonus Farm):** `docs/blueprint/akuntansi-logistik-hidroponik.md`, `docs/blueprint/VALIDASI-BACKLOG-PRD.md`, `docs/ucd/increment-v2-akuntansi-logistik.md`, `docs/prd-agile-kokonus-farm.md`, `prisma/seed-akun.js`, `lib/jurnal.ts`, `lib/laporan-panen.ts`, `lib/sales-order-delivery.ts`.

## Prinsip Inti

1. Stok dan biaya hanya berubah setelah dokumen disetujui (APPROVE). Draft/PENDING tidak boleh mengubah stok.
2. Satuan dasar sayur: lubang/batang. Pack dan plastik dihitung saat pesanan.
3. Pendekatan biaya (*cost approach*) dengan Persediaan Dalam Proses (WIP). Nilai stok pakai rata-rata bergerak per varietas.
4. DP adalah kewajiban (Uang Muka Pelanggan), bukan pendapatan. Pendapatan diakui saat DELIVERED.
5. Susut normal diserap ke HPP. Susut abnormal / gagal total masuk akun 5300 Kerugian Susut Abnormal.
6. Akun inti ditandai `is_system` dan tidak boleh dihapus atau diubah kodenya.
7. Jurnal posted tidak diedit. Koreksi lewat jurnal pembalik.

## Pemetaan Jurnal Baku

| Peristiwa | Debit | Kredit |
| --- | --- | --- |
| Pakai benih/nutrisi/media di siklus | WIP | Persediaan terkait |
| Panen APPROVE | Persediaan Sayur | WIP |
| Abort / gagal total | 5300 Kerugian Susut Abnormal | WIP |
| Pack benih ditandai habis | Beban Penyesuaian Persediaan | Persediaan Benih |
| Terima DP | Kas Tunai / Kas Bank | Uang Muka Pelanggan |
| SO DELIVERED | Uang Muka + Piutang Usaha | Pendapatan Penjualan |
| Pengakuan HPP saat kirim | HPP | Persediaan Sayur + Persediaan Plastik |
| Kresek pengiriman | Beban Pengiriman | Persediaan Kresek / Kas |
| Pelunasan | Kas Tunai / Kas Bank | Piutang Usaha |

## Smart Jurnal

Form berbahasa manusia: "Saya ingin mencatat [Tipe] sebesar [Nominal] menggunakan [Sumber Kas]". Sistem memasangkan Debit/Kredit otomatis sehingga selalu balance. Tipe: beban operasional, prive, suntikan modal, pembelian aset, pinjaman, cicilan (pokok + bunga), pembelian bahan tunai/kredit, bayar hutang, penyusutan, transfer antar kas, pendapatan lain, pajak. Tab Jurnal Manual tetap ada sebagai fallback Admin.

## Cara Kerja Saat Dipakai

1. Identifikasi peristiwa bisnis yang ditanyakan.
2. Tentukan akun Debit dan Kredit memakai tabel di atas dan COA proyek. Jika akun belum ada, usulkan akun baru lengkap dengan kode dan flag `is_system`.
3. Cek: total Debit = total Kredit, akun terkunci tidak berubah, status dokumen (PENDING/APPROVED/DELIVERED) benar.
4. Jika user minta kode, berikan skema Prisma/SQL atau fungsi jurnal yang membungkus transaksi dalam satu transaksi database (atomik).
5. Tandai asumsi yang belum pasti dan sarankan validasi ke dosen/akuntan.

## Rumus Penting

- Kapasitas pack (lubang) = berat_pack x biji_per_gram / biji_per_lubang
- HPP per lubang = biaya siklus / lubang layak jual
- HPP pesanan = lubang terpakai x HPP per lubang + pack x harga plastik
- Yield = layak jual / disemai; Susut = 1 - Yield

## Batasan

- Bukan nasihat akuntansi atau pajak resmi. Untuk tarif pajak, standar (PSAK 69 / SAK EMKM), dan regulasi terbaru, rujuk sumber resmi.
- Skema dan perilaku sistem selalu dicocokkan dengan Backlog dan PRD proyek sebelum dianggap final.
- Jangan mengubah stok dari data draft, jangan mengakui pendapatan dari DP, dan jangan mengizinkan penghapusan akun sistem.

**Catatan implementasi:** jika kode `main` belum v2 (WIP, DP, Smart Jurnal), jelaskan selisih singkat vs blueprint — lihat `docs/blueprint/VALIDASI-BACKLOG-PRD.md`.
