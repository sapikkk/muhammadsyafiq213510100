# Registry user story — Kokonus Farm

Indeks resmi **US v1**, tugas **Sprint 5 (QA)**, dan **increment v2**. ID dan nomor issue GitHub tidak berubah; kolom *User story* untuk PO, skripsi, dan board.

Format issue baru: [`panduan-user-story.md`](panduan-user-story.md) · PRD lengkap: [`../produk/prd-agile-kokonus-farm.md`](../produk/prd-agile-kokonus-farm.md) · Uji: [`../testing/uji-blackbox.md`](../testing/uji-blackbox.md)

---

## EPIC-1 — Fondasi & autentikasi (Sprint 1 + US1.9 di Sprint 4)

| ID | Judul teknis (arsip) | User story (bahasa manusia) | Issue | Sprint | Status |
|----|----------------------|-----------------------------|-------|--------|--------|
| US1.1 | Setup Next.js + TS + shadcn | Sebagai **tim pengembang**, saya ingin fondasi website rapi dan seragam, agar fitur berikutnya cepat dan konsisten. | [#2](https://github.com/sapikkk/muhammadsyafiq213510100/issues/2) | 1 | Done |
| US1.2 | Schema Prisma ERD | Sebagai **sistem**, saya ingin struktur data sesuai ERD Kokonus Farm, agar produksi dan keuangan tidak bentrok di database. | [#3](https://github.com/sapikkk/muhammadsyafiq213510100/issues/3) | 1 | Done |
| US1.3 | PostgreSQL migrate/seed | Sebagai **developer**, saya ingin database hidup dengan migrasi dan seed, agar uji dan demo bisa diulang. | [#4](https://github.com/sapikkk/muhammadsyafiq213510100/issues/4) | 1 | Done |
| US1.4 | NextAuth login/logout | Sebagai **Owner, Admin, atau Petani**, saya ingin masuk dengan email dan sandi lalu diarahkan ke beranda peran saya, agar tidak bingung menu. | [#5](https://github.com/sapikkk/muhammadsyafiq213510100/issues/5) | 1 | Done |
| US1.5 | Lupa sandi via Admin | Sebagai **pengguna**, saya ingin minta reset sandi lewat Admin (bukan link publik), agar akun tetap aman. | [#6](https://github.com/sapikkk/muhammadsyafiq213510100/issues/6) | 1 | Done |
| US1.6 | Register petani | Sebagai **Admin**, saya ingin mendaftarkan petani dengan sandi awal, agar tidak ada pendaftaran liar di internet. | [#7](https://github.com/sapikkk/muhammadsyafiq213510100/issues/7) | 1 | Done |
| US1.7 | Settings & matrix peran | Sebagai **pengguna**, saya ingin ubah profil dan melihat hak akses per peran, agar tahu batas wewenang. | [#8](https://github.com/sapikkk/muhammadsyafiq213510100/issues/8) | 1 | Done |
| US1.8 | State loading/error/403 | Sebagai **pengguna**, saya ingin pesan jelas saat loading, error, atau akses ditolak, agar tidak mengira aplikasi mati. | [#9](https://github.com/sapikkk/muhammadsyafiq213510100/issues/9) | 1 | Done |
| US1.9 | Kelola user (Owner) | Sebagai **Owner**, saya ingin menambah dan mengelola akun tim, agar akses greenhouse terkendali. | [#10](https://github.com/sapikkk/muhammadsyafiq213510100/issues/10) | 4 | Done |

Detail sprint: [`sprints/sprint-01-fondasi.md`](sprints/sprint-01-fondasi.md)

---

## EPIC-2 — Akuntansi & HPP (Sprint 2 + US2.6 di Sprint 4)

| ID | Judul teknis | User story (bahasa manusia) | Issue | Sprint | Status |
|----|--------------|-----------------------------|-------|--------|--------|
| US2.1 | COA hierarki | Sebagai **Admin**, saya ingin bagan akun standar UMKM hidroponik, agar jurnal rapi dari awal. | [#11](https://github.com/sapikkk/muhammadsyafiq213510100/issues/11) | 2 | Done |
| US2.2 | Jurnal double-entry | Sebagai **Admin**, saya ingin jurnal dengan debit = kredit dan persetujuan, agar buku tidak salah arah. | [#12](https://github.com/sapikkk/muhammadsyafiq213510100/issues/12) | 2 | Done |
| US2.3 | HPP otomatis ABC | Sebagai **Admin**, saya ingin HPP dihitung saat panen disetujui, agar biaya per siklus otomatis masuk laporan. | [#13](https://github.com/sapikkk/muhammadsyafiq213510100/issues/13) | 2 | Done |
| US2.4 | Form biaya langsung & overhead | Sebagai **Admin**, saya ingin catat biaya langsung dan overhead per siklus, agar HPP lengkap. | [#14](https://github.com/sapikkk/muhammadsyafiq213510100/issues/14) | 2 | Done |
| US2.5 | Susut normal vs abnormal | Sebagai **Admin**, saya ingin susut dinilai normal (masuk HPP) atau abnormal (kerugian), agar angka laba jujur. | [#15](https://github.com/sapikkk/muhammadsyafiq213510100/issues/15) | 2 | Done |
| US2.6 | Owner: COA readonly, jurnal | Sebagai **Owner**, saya ingin melihat COA dan jurnal tanpa mengubah sembarangan, agar pembukuan tetap di Admin. | [#16](https://github.com/sapikkk/muhammadsyafiq213510100/issues/16) | 4 | Done |

---

## EPIC-3 — Produksi (Sprint 2)

| ID | Judul teknis | User story (bahasa manusia) | Issue | Sprint | Status |
|----|--------------|-----------------------------|-------|--------|--------|
| US3.1 | Batch/siklus semai | Sebagai **Petani**, saya ingin mulai siklus semai dan stok media berkurang otomatis, agar catatan lapangan sama dengan gudang. | [#17](https://github.com/sapikkk/muhammadsyafiq213510100/issues/17) | 2 | Done |
| US3.2 | Pindah fase di HP | Sebagai **Petani**, saya ingin maju fase tanam dari HP dengan tombol besar, agar update cepat di rakit apung. | [#18](https://github.com/sapikkk/muhammadsyafiq213510100/issues/18) | 2 | Done |
| US3.3 | Submit harvest report | Sebagai **Petani**, saya ingin laporkan hasil panen per siklus, agar Admin bisa setujui dan hitung HPP. | [#19](https://github.com/sapikkk/muhammadsyafiq213510100/issues/19) | 2 | Done |
| US3.4 | Master varietas | Sebagai **Owner/Admin**, saya ingin kelola varietas dan asumsi tanam, agar perhitungan benih dan jadwal konsisten. | [#20](https://github.com/sapikkk/muhammadsyafiq213510100/issues/20) | 2 | Done |
| US3.5 | Log kegagalan | Sebagai **Petani**, saya ingin catat kegagalan per tahap, agar Owner tahu penyebab susut bukan hanya angka. | [#21](https://github.com/sapikkk/muhammadsyafiq213510100/issues/21) | 2 | Done |
| US3.6 | Tambal & timeline | Sebagai **Petani**, saya ingin tambal susulan dan lihat timeline siklus, agar lubang kosong terisi dan terlacak. | [#22](https://github.com/sapikkk/muhammadsyafiq213510100/issues/22) | 2 | Done |
| US3.7 | Tugas & histori petani | Sebagai **Petani**, saya ingin daftar tugas dan riwayat kerja saya, agar fokus harian jelas. | [#23](https://github.com/sapikkk/muhammadsyafiq213510100/issues/23) | 2 | Done |

Ringkas sprint 2: [`sprints/sprint-02-operasi.md`](sprints/sprint-02-operasi.md)

---

## EPIC-4 — Inventaris (Sprint 2)

| ID | Judul teknis | User story (bahasa manusia) | Issue | Sprint | Status |
|----|--------------|-----------------------------|-------|--------|--------|
| US4.1 | Stok + movement | Sebagai **Admin/Petani**, saya ingin stok bahan masuk/keluar tercatat, agar tidak kehabisan di semai. | [#24](https://github.com/sapikkk/muhammadsyafiq213510100/issues/24) | 2 | Done |
| US4.2 | Active Pack | Sebagai **Petani**, saya ingin pakai pack benih/media aktif dengan biaya per unit jelas, agar HPP benih akurat. | [#25](https://github.com/sapikkk/muhammadsyafiq213510100/issues/25) | 2 | Done |
| US4.3 | Alert stok minimum | Sebagai **Owner/Admin**, saya ingin peringatan stok rendah, agar pesan ulang sebelum produksi stop. | [#26](https://github.com/sapikkk/muhammadsyafiq213510100/issues/26) | 2 | Done |
| US4.4 | Master infrastruktur | Sebagai **Admin**, saya ingin data lahan, greenhouse, dan kolam (1.920 lubang), agar kapasitas produksi terukur. | [#27](https://github.com/sapikkk/muhammadsyafiq213510100/issues/27) | 2 | Done |
| US4.5 | Master petani (ERD) | Sebagai **Admin**, saya ingin data petani lapangan terpisah dari akun login, agar HR dan akses tidak campur. | [#28](https://github.com/sapikkk/muhammadsyafiq213510100/issues/28) | 2 | Done |

---

## EPIC-5 — Penjualan (Sprint 3)

| ID | Judul teknis | User story (bahasa manusia) | Issue | Sprint | Status |
|----|--------------|-----------------------------|-------|--------|--------|
| US5.1 | Pelanggan + SO | Sebagai **Admin**, saya ingin buat pesanan jual ke pelanggan, agar penjualan terhubung ke siklus yang sama. | [#29](https://github.com/sapikkk/muhammadsyafiq213510100/issues/29) | 3 | Done |
| US5.2 | Item SO + cek stok | Sebagai **Admin**, saya ingin baris pesanan dinamis dengan cek stok, agar tidak janji barang yang tidak ada. | [#30](https://github.com/sapikkk/muhammadsyafiq213510100/issues/30) | 3 | Done |
| US5.3 | Packing & kirim (petani) | Sebagai **Petani**, saya ingin update status packing dan kirim dari HP, agar gudang dan lapangan selaras. | [#31](https://github.com/sapikkk/muhammadsyafiq213510100/issues/31) | 3 | Done |
| US5.4 | Jurnal saat DELIVERED | Sebagai **sistem**, saya ingin jurnal pendapatan otomatis saat barang terkirim, agar Admin tidak input ulang. | [#32](https://github.com/sapikkk/muhammadsyafiq213510100/issues/32) | 3 | Done |
| US5.5 | Invoice & batal SO | Sebagai **Admin**, saya ingin invoice dan pembatalan pesanan terkendali, agar piutang dan stok tetap benar. | [#33](https://github.com/sapikkk/muhammadsyafiq213510100/issues/33) | 3 | Done |

Detail: [`sprints/sprint-03-penjualan.md`](sprints/sprint-03-penjualan.md)

---

## EPIC-6 — Laporan Owner (Sprint 4)

| ID | Judul teknis | User story (bahasa manusia) | Issue | Sprint | Status |
|----|--------------|-----------------------------|-------|--------|--------|
| US6.1 | KPI grafik | Sebagai **Owner**, saya ingin grafik pendapatan vs pengeluaran di beranda, agar kesehatan usaha terlihat sekilas. | [#34](https://github.com/sapikkk/muhammadsyafiq213510100/issues/34) | 4 | Done |
| US6.2 | Pie biaya | Sebagai **Owner**, saya ingin breakdown biaya per jenis, agar tahu pos mana yang boros. | [#35](https://github.com/sapikkk/muhammadsyafiq213510100/issues/35) | 4 | Done |
| US6.3 | Ekspor PDF/xlsx | Sebagai **Owner/Admin**, saya ingin unduh laporan keuangan, agar bisa dibawa ke sidang atau bank. | [#36](https://github.com/sapikkk/muhammadsyafiq213510100/issues/36) | 4 | Done |
| US6.4 | BEP & kapasitas | Sebagai **Owner**, saya ingin evaluasi margin, titik impas, dan kolam menganggur, agar keputusan tanam dan harga jual data-driven. | [#37](https://github.com/sapikkk/muhammadsyafiq213510100/issues/37) | 4 | Done |
| US6.5 | Arus kas | Sebagai **Owner**, saya ingin laporan arus kas per periode, agar likuiditas harian terpantau. | [#38](https://github.com/sapikkk/muhammadsyafiq213510100/issues/38) | 4 | Done |

Detail: [`sprints/sprint-04-laporan.md`](sprints/sprint-04-laporan.md)

---

## Sprint 5 — QA & go-live (bukan US produk)

| ID | Ringkasan manusia | Issue | Status |
|----|-------------------|-------|--------|
| T5.1 | UX pindah fase di atas fold (petani) | [#39](https://github.com/sapikkk/muhammadsyafiq213510100/issues/39) | Done |
| T5.2 | Filter jurnal lebih mudah (Admin) | [#40](https://github.com/sapikkk/muhammadsyafiq213510100/issues/40) | Done |
| T5.3 | Shortcut beranda Owner di HP | [#41](https://github.com/sapikkk/muhammadsyafiq213510100/issues/41) | Done |
| T5.4 | Audit debit = kredit otomatis | [#42](https://github.com/sapikkk/muhammadsyafiq213510100/issues/42) | Done |
| T5.5 | Ketahanan koneksi database (pool) | [#43](https://github.com/sapikkk/muhammadsyafiq213510100/issues/43) | Done |
| T5.6 | Deploy produksi Vercel + Postgres | [#44](https://github.com/sapikkk/muhammadsyafiq213510100/issues/44) | Done |
| T5.9 | Materi pelatihan 6 pengguna | [#45](https://github.com/sapikkk/muhammadsyafiq213510100/issues/45) | Done |

Detail: [`sprints/sprint-05-qa.md`](sprints/sprint-05-qa.md)

---

## Increment v2 (post go-live)

Epic dan story starter: [`../blueprint/GITHUB-BACKLOG-DRAFT.md`](../blueprint/GITHUB-BACKLOG-DRAFT.md) · UCD: [`../ucd/increment-v2-akuntansi-logistik.md`](../ucd/increment-v2-akuntansi-logistik.md)

| Epic | Judul manusia | Issue induk |
|------|---------------|-------------|
| A | Bagan akun sistem, WIP panen, kas terpisah | [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87) |
| B | Stok hanya lewat approve; siklus gagal total | [#88](https://github.com/sapikkk/muhammadsyafiq213510100/issues/88) |
| C | Benih & pack: kapasitas lubang, proporsional | [#89](https://github.com/sapikkk/muhammadsyafiq213510100/issues/89) |
| D | Pesanan bundling + HPP per lubang | [#90](https://github.com/sapikkk/muhammadsyafiq213510100/issues/90) |
| E | Uang muka & pelunasan pesanan | [#91](https://github.com/sapikkk/muhammadsyafiq213510100/issues/91) |
| F | Jurnal otomatis (Smart Jurnal) | [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92) |
| G | KPI keuangan hidroponik | [#93](https://github.com/sapikkk/muhammadsyafiq213510100/issues/93) |
| H | Tutup periode & jurnal pembalik | [#94](https://github.com/sapikkk/muhammadsyafiq213510100/issues/94) |

---

**Ringkasan v1:** 37 user story produk · **37 Done** · QA Sprint 5 selesai · produksi [`kokonusfarm.vercel.app`](https://kokonusfarm.vercel.app).

Terakhir diperbarui: **2026-10-15**.
