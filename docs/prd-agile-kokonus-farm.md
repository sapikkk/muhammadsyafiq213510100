# PRD Agile — Kokonus Farm

**Judul penelitian:** Digitalisasi Tata Kelola Biaya Produksi Hidroponik melalui Pengembangan Website Menggunakan Metode Agile (Studi Kasus Kokonus Farm)

**Jenis dokumen:** Product Requirements Document + Product Backlog (living document)  
**Metodologi:** Agile Scrum + User-Centered Design (UCD)  
**Versi kerangka proses:** diselaraskan ke *Kebun Hijau — Agile & UCD Framework v1.0.0* (bentuk epic/sprint/UCD/DoD/RBAC), isi layar dari Figma, konteks studi kasus dari Google Doc skripsi.

**Prioritas sumber jika bentrok:** (1) workbook kerangka untuk bentuk backlog; (2) Figma untuk layar/alur; (3) Google Doc untuk konteks skripsi. Domain usaha: **Kokonus Farm, rakit apung**, bukan nama contoh workbook.

---

## 1. Visi produk

Menjadikan operasional greenhouse hidroponik Kokonus Farm lebih efisien, transparan, dan terdigitalisasi — dari asumsi varietas dan semai hingga laporan laba — sehingga pemilik melihat HPP dan laba per siklus tanpa menunggu rekap manual.

### Misi

Menyediakan website terintegrasi untuk:

- tracking siklus produksi rakit apung (1.920 lubang tanam);
- pencatatan kegagalan dan susut (normal vs abnormal);
- akuntansi double-entry dan kalkulasi HPP (per lubang, per kg, per pack) berbasis aktivitas;
- manajemen inventaris bahan (benih, media, nutrisi);
- penjualan, packing, dan pendapatan pada siklus yang sama;
- dashboard dan ekspor laporan untuk Owner dan Admin.

### Tagline operasional

Tata kelola biaya produksi hidroponik, satu siklus satu angka.

---

## 2. Tujuan

1. Menyatukan data budidaya dan transaksi penjualan di satu website.
2. Menghitung HPP otomatis dari biaya variabel (nutrisi, benih, media, listrik, air) plus overhead teralokasi, dengan tiga satuan: **per lubang, per kilogram, per pack**.
3. Menyediakan laporan laba rugi, neraca, dan arus kas yang dapat diekspor.
4. Memberi petani antarmuka lapangan (web responsif + HP) dengan tombol besar dan sedikit ketikan.
5. Menyelesaikan pengembangan dalam **5 sprint × 2 minggu** (10 hari kerja/sprint) mengikuti 6 epic kerangka.

### Tujuan skripsi (dari Google Doc, tidak diubah)

- Merancang website yang menyatukan data budidaya dan penjualan.
- Menyusun algoritma HPP yang mengalokasikan biaya variabel per rotasi tanam.
- Menyediakan rancangan laporan untuk keputusan harga jual.

---

## 3. Pengguna dan peran

| ID | Nama nyata | Peran sistem | Analog kerangka | Kebutuhan utama |
| --- | --- | --- | --- | --- |
| P-01 | Koko Nuswantoro | **Owner** | Owner / “Budi” | Laba per siklus, tren, HPP vs harga jual, BEP, kapasitas kolam menganggur, prive, kelola user. Latar: pensiunan BUMN Adhi Karya (bekerja sejak 1992), pernah cost control di keuangan konstruksi, terbiasa Excel, delapan tahun belajar hidroponik berbagai instalasi. Naskah lengkap: `skenario-narasi-ucd-agile.md`. |
| P-02 | Admin pembukuan | **Admin** | Admin / “Siti” | COA, jurnal, approve panen & HPP, SO, pelanggan, ekspor, daftar petani |
| P-03 | Marzuki, Darusman, Widi Antoni, Hudzaifah Mutahajjid | **Petani / Pekerja** | Pekerja / “Agus” | Semai, pindah kolam, panen, gagal, stok, packing/pengiriman di HP |

RBAC ketat di middleware API, bukan hanya UI. Matriks lengkap: bagian 12.

Tidak ada self-signup publik. Admin (atau Owner) yang mendaftarkan petani.

---

## 4. Lingkup

### Dalam lingkup

- Auth: login, logout, lupa sandi + OTP + reset, registrasi karyawan oleh Admin, RBAC Owner/Admin/Petani.
- Master: varietas & asumsi, infrastruktur (lahan, greenhouse, kolam), karyawan/petani.
- Produksi: batch/siklus, fase (semai → sprout/daun → tambal → pindah kolam → dewasa → panen/sortasi), log aktivitas.
- Kegagalan & susut: catat per tahap; susut normal masuk HPP; susut abnormal ke kerugian.
- Biaya & HPP: biaya langsung, overhead, Active Pack, ABC costing, override Admin + justifikasi.
- Inventaris: item, movement IN/OUT/ADJUST, alert stok minimum.
- Penjualan: pelanggan, sales order, packing/distribusi, jurnal pendapatan otomatis (status DELIVERED).
- Laporan: dashboard Owner, pie biaya, laba rugi, neraca, arus kas, ekspor PDF/Excel.
- Evaluasi: margin, BEP, kapasitas menganggur.
- State UI: kosong, loading, error, akses ditolak, validasi form, konfirmasi hapus/aktif.
- Uji Sprint 5: black-box, usability (SUS), bugfix, deploy staging/production, sosialisasi. Bukan pemeliharaan pasca-skripsi.

### Di luar lingkup (nanti / bukan skripsi)

- IoT, sensor pH/EC, otomasi pompa.
- Aplikasi native store (cukup web responsif + layar mobile Figma).
- E-commerce publik, pembayaran gateway, kripto, trading (komponen Figma finance generik).
- Multi-cabang / multi-tenant.
- Pemeliharaan jangka panjang, SLA, helpdesk.
- Self-registration pelanggan akhir.
- Ubah file format skripsi atau workbook kerangka.

---

## 5. Tahap UCD (sumber kebenaran proses)

Dipakai di setiap epic, bukan sprint terpisah.

| Tahap | Kegiatan Kokonus Farm | Bukti |
| --- | --- | --- |
| **Empathize** | Observasi greenhouse (semai–panen); wawancara Owner, Admin, empat petani | Pain: laba tak terlihat; biaya tak teralokasi; catatan lapangan basah/terpisah |
| **Define** | How-might-we: satu siklus → satu HPP + satu laba | Tiga persona di atas |
| **Ideate** | Delapan modul hierarchy Figma: akses, varietas/logistik, produksi, kegagalan, biaya/HPP, penjualan, evaluasi, pelaporan | Affinity = 6 epic kerangka |
| **Prototype** | Hi-fi Figma page Web + Mobile; Architecture (flowchart, DFD, UML, ERD) | Bukan kode |
| **Test** | Sprint 5: task usability + SUS 10 butir, 6 responden; black-box | Rubrik Excellent >85 / Good 70–84 / Needs Work <70 (kerangka) + rentang skripsi 0–100 |

Journey kerangka yang wajib didukung end-to-end:

1. **Panen** — trigger lapangan → login HP → input berat → HARVEST_PENDING → Admin review HPP → jurnal → Owner lihat aset/laba.
2. **Pembelian & inventaris** — stok < min → jurnal pembelian → approve → Active Pack.
3. **Penjualan** — SO → konfirmasi stok → kirim DELIVERED → jurnal pendapatan.

Ditambah journey Figma/skripsi: **lupa sandi**, **master varietas**, **kegagalan/susut**, **evaluasi BEP**.

---

## 6. Ringkasan epic (semua: 6)

| ID | Nama (kerangka) | Nama operasional Kokonus | Sprint | Points kerangka |
| --- | --- | --- | --- | --- |
| EPIC-1 | Core Framework & Authentication | Fondasi, schema, auth, RBAC, settings | 1 | 34 (+ US tambahan master user) |
| EPIC-2 | Sistem Akuntansi Double-Entry & HPP | COA, jurnal, HPP ABC, biaya, susut | 2 | 21 |
| EPIC-3 | Manajemen Produksi | Siklus rakit apung, fase, harvest report, kegagalan | 2 | 21 |
| EPIC-4 | Manajemen Inventaris & Bahan Baku | Stok, Active Pack, alert, infrastruktur fisik | 2 | 13 |
| EPIC-5 | Manajemen Penjualan & Pengiriman | Pelanggan, SO, packing, jurnal otomatis | 3 | 34 |
| EPIC-6 | Dashboard, Visualisasi & Export | Grafik, evaluasi, PDF/Excel, prive | 4 | 21 |

Sprint 5 = QA 13 points di luar enam epic (kerangka: 144 pts epic + 13 QA = 157 di roadmap).

**Tech stack kerangka (wajib kecuali diputuskan PO):** Next.js 14 App Router, TypeScript strict, Prisma, PostgreSQL, NextAuth, Tailwind v3, shadcn/ui, Recharts, xlsx, jspdf.

---

## 7. Rencana sprint

Durasi tiap sprint: **2 minggu / 10 hari kerja**. Kapasitas acuan kerangka: 80 jam/sprint. Status “Selesai” di xlsx **tidak** disalin — status Kokonus Farm: belum dikode.

### Sprint 1 — Fondasi & autentikasi (Minggu 1–2) · 34 pts inti

**Goal:** Next.js berjalan, schema terpasang, login per peran, middleware RBAC, layar auth Figma (login, sandi salah, lupa, OTP, reset, register karyawan).

- Day 1–2: create-next-app, TS strict, ESLint/Prettier, Tailwind botanical, shadcn dasar.
- Day 3–4: ERD sign-off. Sumbernya Entity Relation Diagram di Figma (halaman Architecture, bagian UML) plus kamus data di bagian 8.1. Bukan 11 tabel kerangka buku besar.
- Day 5–6: Prisma + seed 3 demo role (ganti email ke kokonus; password demo wajib diganti sebelum production).
- Day 7–8: NextAuth credentials, bcrypt, `/login`, middleware `/owner` `/admin` `/petani`.
- Day 9–10: state global (loading/error/denied), demo Sprint Review.

### Sprint 2 — Akuntansi, produksi, inventaris (Minggu 3–4) · 55 pts

**Goal:** Petani input siklus & gagal di HP; Admin kelola COA/jurnal, approve panen + HPP; stok + Active Pack; master varietas & infrastruktur.

Urutan hari kerangka: COA → jurnal → inventaris/Active Pack → produksi UI → HPP + harvest approval. Sisipkan master varietas/infrastruktur di day 1–4 agar batch punya asumsi.

### Sprint 3 — Penjualan & pengiriman (Minggu 5–6) · 34 pts

**Goal:** SO pelanggan, packing/kirim oleh petani, jurnal pendapatan otomatis saat DELIVERED.

Task kerangka T3.1–T3.8 (schema Customer/SO, API, UI admin, delivery petani, autoJournal, E2E).

### Sprint 4 — Dashboard & ekspor (Minggu 7–8) · 21 pts

**Goal:** Grafik pendapatan vs biaya, pie biaya, evaluasi BEP/kapasitas, ekspor jurnal xlsx + neraca/laba-rugi PDF.

Task T4.1–T4.7.

### Sprint 5 — QA, usability, go-live (Minggu 9–10) · 13 pts QA

**Goal:** Uji pengguna nyata, audit debit=kredit, bugfix, security, deploy, pelatihan 3 peran.

Task T5.1–T5.9 kerangka, disesuaikan responden skripsi (6 orang). Black-box: login, siklus, HPP, pesanan, laporan.

---

## 8. Product backlog bernomor

Format: *Sebagai …, saya ingin …, agar …*  
Poin = kerangka jika ada. AC ringkas; AC alur penuh di bagian 9.  
Kerangka menuliskan 34+ story tetapi hanya menguraikan **20** (US1.1–US6.3). Story bertanda **[Figma/skripsi]** adalah pemetaan layar yang wajib agar backlog bisa dikerjakan satu per satu tanpa meninggalkan Figma.

### EPIC-1 — Core Framework & Authentication

| ID | Judul | P | Pts | Sprint | Persona |
| --- | --- | --- | --- | --- | --- |
| US1.1 | Setup Next.js 14 + TypeScript + Tailwind + shadcn | HIGHEST | 8 | 1 | Dev |
| US1.2 | Schema Prisma (tabel kerangka + entitas Figma/skripsi) | HIGHEST | 13 | 1 | DB |
| US1.3 | PostgreSQL + Prisma migrate/seed | HIGHEST | 8 | 1 | Dev |
| US1.4 | NextAuth login/logout + redirect per peran | HIGHEST | 5 | 1 | Semua |
| US1.5 | **[Figma]** Lupa sandi → OTP → reset | HIGH | 5 | 1 | Semua |
| US1.6 | **[Figma]** Register karyawan/petani oleh Admin | HIGH | 5 | 1 | Admin |
| US1.7 | **[Figma]** Settings profil, notifikasi, matrix peran | MED | 5 | 1–4 | Owner/Admin |
| US1.8 | **[Figma]** State global: loading, error, empty, 403 | HIGH | 3 | 1 | Semua |
| US1.9 | **[Figma]** Kelola user (Owner) | MED | 5 | 4 | Owner |

**US1.1** Sebagai developer, saya ingin struktur Next.js 14 terorganisir agar tim seragam.  
AC: App Router; TS strict; ESLint+Prettier bersih; folder `/app` `/components` `/lib` `/hooks` `/types`; `.env.example`; shadcn Button, Card, Input, Badge, Dialog, Table, Select; dev server tanpa warning.

**US1.2** Sebagai sistem, saya ingin schema relasi sesuai ERD Kokonus Farm.  
AC: 16 tabel di bagian 8.1; `lahan_id` dan `pelanggan_id` wajib (`NOT NULL`); `Biaya_Langsung.siklus_id` dan `HPP.siklus_id` unik; nama entitas orang adalah **Petani**, bukan Karyawan; uang `DECIMAL(18,2)`; berat dan kuantitas jual `DECIMAL(12,3)`. COA, jurnal, dan Active Pack tidak masuk schema ini (Epic 2, tidak ada di ERD). Tabel login `User` menyusul di US1.4 dan bukan entitas ERD.

### 8.1 Kamus data operasional (sign-off ERD)

Sumber gambar: Figma file `vHP9l3QZucVlldDiDtk5RE`, halaman Architecture, frame Entity Relation Diagram. Tipe data dan panjang tidak tertulis di ERD. Angka di bawah adalah spesifikasi yang dipakai untuk schema Prisma. Satuan yang masih terbuka dicatat di akhir bagian ini.

Keputusan yang mengikat:

- `Greenhouse.lahan_id` ditambahkan karena garis `memiliki` sudah ada, tetapi field-nya tidak tertulis. Wajib diisi. Satu lahan, banyak greenhouse.
- `Penjualan.pelanggan_id` ditambahkan karena garis `membeli` sudah ada. **Wajib diisi.** Satu pelanggan, banyak penjualan. Satu penjualan, satu pelanggan. Penjualan curah tetap punya baris pelanggan.
- Entitas di ERD bernama **Petani** (`id`, `nama`, `gaji_bulanan`). Jangan dinamai Karyawan. `Biaya_Overhead.gaji_karyawan` adalah jumlah uang, bukan foreign key.
- `Biaya_Langsung` dan `HPP` satu baris per siklus (`UNIQUE` pada `siklus_id`). `Log_Kegagalan` dan `Penjualan` memang banyak baris per siklus.
- `laba ditahan` dan `beban bunga` pada gambar adalah nama garis antar laporan, bukan kolom dan bukan foreign key.
- `Neraca.id` dan `Arus_Kas.id` bertanda PK di ERD. Primary key tabel lain adalah `id` yang diusulkan (PK*).
- Bentuk tanpa nama di ERD tidak dijadikan tabel atau field.

Uang memakai `DECIMAL(18,2)`. Berat dan kuantitas jual memakai `DECIMAL(12,3)`. `daya_kecambah` memakai `DECIMAL(5,2)`. `bunga_persen` memakai `DECIMAL(7,4)`.

| Tabel | Field |
| --- | --- |
| Lahan | `id` PK, `nilai_sewa` DECIMAL(18,2), `masa_sewa` INT, `amortisasi_per_bulan` DECIMAL(18,2) |
| Greenhouse | `id` PK, `lahan_id` FK NOT NULL, `nama` VARCHAR(100), `nilai_investasi` DECIMAL(18,2), `umur_ekonomis` INT, `depresiasi_per_bulan` DECIMAL(18,2) |
| Kolam | `id` PK, `greenhouse_id` FK NOT NULL, `nama` VARCHAR(100), `kapasitas_lubang` INT, `status` VARCHAR(30) |
| Varietas | `id` PK, `nama` VARCHAR(100), `harga_benih_per_gram` DECIMAL(18,2), `biji_per_gram` DECIMAL(10,2), `daya_kecambah` DECIMAL(5,2), `lama_semai` INT, `lama_di_kolam` INT, `berat_rata_rata_panen` DECIMAL(12,3), `berat_per_pack` DECIMAL(12,3), `harga_jual_curah` DECIMAL(18,2), `harga_jual_pack` DECIMAL(18,2), `status` VARCHAR(30) |
| Siklus_Produksi | `id` PK, `varietas_id` FK NOT NULL, `kolam_id` FK NOT NULL, `tanggal_semai` DATE, `tanggal_pindah_kolam` DATE, `tanggal_panen` DATE, `jumlah_disemai` INT, `jumlah_layak_jual` INT, `total_susut` INT, `status` VARCHAR(30) |
| Biaya_Langsung | `id` PK, `siklus_id` FK NOT NULL UNIQUE, `biaya_benih` DECIMAL(18,2), `biaya_rockwool` DECIMAL(18,2), `biaya_nutrisi` DECIMAL(18,2), `biaya_listrik_pompa` DECIMAL(18,2), `subtotal` DECIMAL(18,2) |
| Petani | `id` PK, `nama` VARCHAR(100), `gaji_bulanan` DECIMAL(18,2) |
| Biaya_Overhead | `id` PK, `periode` DATE, `depresiasi_greenhouse` DECIMAL(18,2), `depresiasi_listrik` DECIMAL(18,2), `sewa_lahan` DECIMAL(18,2), `gaji_karyawan` DECIMAL(18,2), `subtotal` DECIMAL(18,2) |
| Log_Kegagalan | `id` PK, `siklus_id` FK NOT NULL, `tahap` VARCHAR(50), `jumlah_gagal` INT, `hari_hidup` INT, `penyebab` TEXT, `kategori_susut` VARCHAR(50), `jenis_kerugian` VARCHAR(50), `biaya_kerugian` DECIMAL(18,2) |
| HPP | `id` PK, `siklus_id` FK NOT NULL UNIQUE, `biaya_langsung_total` DECIMAL(18,2), `overhead_teralokasi` DECIMAL(18,2), `biaya_plastik_packing` DECIMAL(18,2), `total_biaya` DECIMAL(18,2), `hpp_per_lubang` DECIMAL(18,2), `hpp_per_kg` DECIMAL(18,2), `hpp_per_pack` DECIMAL(18,2) |
| Penjualan | `id` PK, `siklus_id` FK NOT NULL, `pelanggan_id` FK NOT NULL, `jenis` VARCHAR(30), `jumlah` DECIMAL(12,3), `harga_satuan` DECIMAL(18,2), `total_pendapatan` DECIMAL(18,2) |
| Pelanggan | `id` PK, `nama` VARCHAR(100), `alamat` TEXT, `no_telepon` VARCHAR(25), `email` VARCHAR(254) |
| Laporan_LabaRugi | `id` PK, `periode` DATE, `pendapatan` DECIMAL(18,2), `hpp` DECIMAL(18,2), `laba_kotor` DECIMAL(18,2), `kerugian_operasional` DECIMAL(18,2), `beban_penjualan` DECIMAL(18,2), `beban_ops_nonproduksi` DECIMAL(18,2), `laba_usaha_ebit` DECIMAL(18,2), `beban_bunga` DECIMAL(18,2), `laba_rugi_bersih` DECIMAL(18,2) |
| Neraca | `id` PK, `periode` DATE, `total_aset` DECIMAL(18,2), `total_liabilitas` DECIMAL(18,2), `total_ekuitas` DECIMAL(18,2) |
| Pinjaman_Modal | `id` PK, `pokok` DECIMAL(18,2), `bunga_persen` DECIMAL(7,4), `tenor` INT, `sisa_pokok` DECIMAL(18,2), `cicilan_per_bulan` DECIMAL(18,2), `beban_bunga_per_bulan` DECIMAL(18,2) |
| Arus_Kas | `id` PK, `periode` DATE, `kas_operasi` DECIMAL(18,2), `kas_investasi` DECIMAL(18,2), `kas_pendanaan` DECIMAL(18,2), `perubahan_kas_bersih` DECIMAL(18,2) |

Relasi: Lahan → Greenhouse, Greenhouse → Kolam, Varietas → Siklus_Produksi, Kolam → Siklus_Produksi, Siklus_Produksi → Biaya_Langsung, Siklus_Produksi → Log_Kegagalan, Siklus_Produksi → HPP, Siklus_Produksi → Penjualan, Pelanggan → Penjualan.

Satuan yang masih perlu dikonfirmasi sebelum seed: `masa_sewa`, `umur_ekonomis`, `berat_rata_rata_panen`, `berat_per_pack`, dasar `harga_jual_curah`, dan apakah `bunga_persen` per bulan atau per tahun. `daya_kecambah` dipakai sebagai persen. `lama_semai`, `lama_di_kolam`, `hari_hidup`, dan `tenor` dipakai dalam hari atau bulan sesuai nama field (`tenor` dalam bulan).

### 8.2 Arsitektur (halaman Architecture)

Sumber: Figma file `vHP9l3QZucVlldDiDtk5RE`, halaman Architecture. Judul papan: Digitalisasi Tata Kelola Produksi Hidroponik Berbasis Web Menggunakan Metode Agile (Studi Kasus Kokonus Farm Pekanbaru). Empat bagian di halaman itu: Flow Chart, Data Flow Diagram, UML, dan ERD. ERD dirinci di bagian 8.1.

**Context diagram (level 0).** Satu proses. Tiga pihak luar: Owner, Admin, Petani.

- Owner mengirim login, pengaturan sistem, kelola pengguna, hak akses, dan permintaan laporan keuangan, produksi, serta panen. Sistem mengembalikan dashboard, statistik, dan laporan itu.
- Admin mengirim login, data produk, inventaris, distribusi, dan laporan produksi. Sistem mengembalikan info produk, inventaris, distribusi, dan laporan produksi.
- Petani mengirim login, penanaman, perawatan, nutrisi dan pH, serta panen. Sistem mengembalikan info penanaman, jadwal perawatan, nutrisi dan pH, serta hasil panen. Nutrisi dan pH di sini adalah catatan, bukan sensor. IoT tetap di luar lingkup.

**Hierarki proses.**

| Kode | Modul | Isi |
| --- | --- | --- |
| 1.0 | Manajemen varietas dan asumsi | Parameter varietas, parameter infrastruktur, aktivasi atau nonaktif |
| 2.0 | Manajemen produksi dan siklus | Persiapan semai, semai di rockwool, monitoring sprout, pindah kolam, pendewasaan, panen dan sortasi, tambal susulan |
| 3.0 | Pencatatan kegagalan dan susut | Catat gagal per tahap, total susut, klasifikasi normal vs abnormal, jumlah layak jual, tidak layak jual saat panen |
| 4.0 | Perhitungan biaya dan HPP | Biaya langsung, overhead, alokasi, total biaya per kolam per siklus, HPP per kg, per lubang, per pack |
| 5.0 | Penjualan dan pemasaran | Terima pesanan, packing dan distribusi, catat pendapatan |
| 6.0 | Evaluasi dan keputusan | Margin HPP vs harga jual, BEP, idle capacity, keputusan strategis |
| 7.0 | Pelaporan keuangan | Klasifikasi pos, laba rugi, neraca, arus kas |

**DFD.** Level 1.0 adalah sistem utama dengan tujuh proses di atas. Penyimpanan: D1 Data Varietas, D2 Data Kolam dan Greenhouse, D3 Log Produksi, D4 Log Kegagalan, D5 Data Biaya dan HPP, D6 Data Penjualan, D7 Data Keuangan. Aktor pada DFD 1.0: Owner, Admin, Petani, Pelanggan.

Level 1.2 produksi: 2.1 persiapan semai, 2.2 semai di rockwool, 2.3 monitoring sprout dan daun, 2.4 pindah ke kolam, 2.5 pendewasaan, 2.6 panen dan sortasi, 2.7 tambal susulan.

Level 1.4 biaya: 4.1 biaya langsung per siklus, 4.2 overhead, 4.3 alokasi ke kapasitas penuh, 4.4 total biaya per kolam per siklus, 4.5 total berat layak jual, 4.6 HPP per lubang, 4.7 HPP per kg, 4.8 HPP per pack.

Level 2.4 detail HPP: gabungkan biaya langsung dan overhead per kolam, kalikan dengan jumlah kolam aktif, ambil jumlah layak jual dari log produksi, ambil berat rata-rata dari varietas, hitung total berat kg, lalu HPP per lubang, per kg, dan per pack (berat per pack ditambah biaya plastik), lalu bandingkan dengan harga jual.

Level 1.5 penjualan: 5.1 terima pesanan, 5.2 packing dan distribusi, 5.3 catat pendapatan.

Level 1.6 evaluasi: 6.1 HPP vs harga jual, 6.2 BEP, 6.3 idle capacity cost, 6.4 keputusan ekspansi, kurangi biaya, atau sesuaikan harga.

Level 1.7 pelaporan: 7.1 klasifikasi pos akuntansi, 7.2 laba rugi, 7.3 neraca, 7.4 arus kas.

**Flowchart.** Satu diagram per modul 1.0–7.0, ditambah login, registrasi petani, dan lupa sandi.

- 1.0: Owner mengisi parameter varietas (harga benih per gram, daya kecambah, lama semai, berat panen rata-rata). Admin mengisi infrastruktur (kolam, greenhouse, pompa, listrik, lahan, gaji). Varietas bisa diaktifkan atau dinonaktifkan. Simpan ke D1 dan D2.
- 2.0: Ambil varietas aktif dan kolam tersedia. Semai di rockwool. Jika sprout gagal, tambal susulan. Jika belum daun ke-4, catat gagal. Pindah kolam; gagal pindah dicatat. Pendewasaan; gagal di kolam dicatat. Panen dan sortasi memisahkan layak jual dan tidak layak jual.
- 3.0: Kegagalan dicatat per tahap (semai awal, sprout sampai daun ke-4, pindah kolam, di kolam, tidak layak jual saat panen), masing-masing dengan biaya yang menempel. Total susut digabung. Susut normal masuk HPP. Susut abnormal masuk kerugian operasional. Layak jual = total ditanam dikurangi total susut.
- 4.0: Berhenti jika data varietas atau log produksi belum lengkap, atau tidak ada kolam aktif. Jika lengkap, hitung biaya langsung, overhead bulanan dari nilai greenhouse dan umur ekonomis, alokasi ke kapasitas penuh, total biaya per kolam, berat layak jual, lalu HPP per lubang, per kg, dan per pack. Simpan ketiga HPP.
- 5.0: Pelanggan memesan curah atau pack. Jika stok tidak ada, kabari pelanggan. Jika ada, packing, distribusi, catat biaya packing dan pendapatan.
- 6.0: Bandingkan HPP dengan harga jual. Margin positif atau negatif. Hitung BEP dalam kg dan lubang minimum. Hitung idle capacity dari kapasitas terpakai vs total. Rekomendasi ke Owner: ekspansi, kurangi biaya, atau sesuaikan harga.
- 7.0: Ambil HPP, biaya, pendapatan, dan kerugian susut abnormal. Susun laba rugi, neraca (aset tetap, persediaan, liabilitas, laba atau rugi bersih, perubahan kas), dan arus kas. Serahkan ke Owner.
- Login: username dan password. Salah, tampilkan pesan. Benar, cek peran. Tiga hak: akses penuh semua modul; manajemen user, reset sandi, RBAC, dan data master; modul produksi dan pencatatan. Dashboard mengikuti peran.
- Registrasi: Admin menerima permintaan petani baru, mengisi nama, username, dan sandi awal. Username duplikat ditolak. Admin menetapkan salah satu dari tiga hak di atas, menyimpan akun, lalu memberikan username dan sandi awal ke petani.
- Lupa sandi: pengguna meminta reset ke Admin. Jika ditolak, pengguna diberi tahu. Jika disetujui, Admin membuat sandi sementara. Pengguna login lalu mengganti sandi. Sandi baru yang tidak memenuhi syarat ditolak.

**Use case.** Aktor: Petani, Admin, Owner. Kasus pada diagram mengikuti modul hierarki: kelola varietas, parameter infrastruktur, aktivasi varietas, mulai siklus, semai, monitor, pindah kolam, panen dan sortasi, tambal susulan, catat kegagalan, hitung layak jual, biaya langsung, overhead, HPP tiga satuan, terima pesanan, packing, catat pendapatan, analisis margin, BEP, idle capacity, laba rugi, neraca, arus kas, dan kelola pinjaman usaha.

**Activity.** Urutan kerja yang sama, dengan keputusan: gagal semai, semaian tersedia untuk tambal, dan keputusan strategis sebelum laporan. Admin menerima laporan kegagalan, hasil panen, serta HPP dan pendapatan. Owner menerima laporan keuangan.

**Sequence.** Lifeline: Pemilik Usaha, Admin, Petani, Sistem. Pesan mengikuti urutan yang sama: instruksi kelola varietas, simpan parameter, aktivasi, mulai siklus, persiapan semai, semai, monitoring, catat kegagalan, total susut, pindah kolam, pendewasaan, panen, layak jual, biaya langsung, overhead, HPP, pesanan, packing, pendapatan, margin, BEP, idle capacity, laba rugi, neraca, arus kas, serah laporan, dan instruksi ubah strategi varietas.

**US1.3** Sebagai developer, saya ingin DB dan seed.  
AC: Postgres; `DATABASE_URL`; prisma generate/push sesuai bagian 8.1; Prisma Studio. Seed akun login menyusul di US1.4. COA tidak di-seed di story ini.

**US1.4** Sebagai pengguna, saya ingin login email+password lalu dashboard sesuai peran.  
AC: Credentials + bcrypt + JWT; `/login` mobile-first; error kredensial spesifik (layar `web-auth-invalid-credentials`); middleware proteksi; logout.

**US1.5–US1.9** AC mengikuti layar Figma bernama sama + “Admin yang mereset sandi produksi, bukan tautan publik tanpa jejak”.

### EPIC-2 — Akuntansi Double-Entry & HPP

| ID | Judul | P | Pts | Sprint | Persona |
| --- | --- | --- | --- | --- | --- |
| US2.1 | COA hierarki | HIGHEST | 8 | 2 | Admin |
| US2.2 | Jurnal double-entry + approval | HIGHEST | 8 | 2 | Admin |
| US2.3 | HPP otomatis ABC | HIGHEST | 5 | 2 | Admin/Sistem |
| US2.4 | **[Figma]** Form biaya langsung & overhead | HIGH | 5 | 2 | Admin |
| US2.5 | **[Figma]** Klasifikasi susut normal vs abnormal | HIGHEST | 5 | 2 | Admin/Sistem |
| US2.6 | **[Figma]** Owner: COA readonly, filter jurnal, prive | MED | 5 | 4 | Owner |

**US2.1** Sebagai Admin, saya ingin COA parent-child standar UMKM.  
AC: tree UI; kode unik; tipe Aset/Kewajiban/Modal/Pendapatan/Beban; soft delete; API GET/POST/PUT `/api/accounts`; seed ≥20 akun.

**US2.2** Sebagai Admin, saya ingin jurnal dengan validasi debit=kredit.  
AC: multi JournalLine; DRAFT/PENDING/APPROVED/REJECTED; filter tanggal/status; update saldo hanya setelah approve; dialog reject.

**US2.3** Sebagai sistem, saya ingin HPP dari benih, rockwool, nutrisi, listrik, air, overhead per siklus.  
AC: cost driver dari Active Pack + durasi instalasi; HPP/unit = total / yield; tampil **per lubang, per kg, per pack**; override + justifikasi; simpan di HarvestReport.

**US2.5** Susut normal masuk HPP; abnormal ke akun kerugian, bukan HPP.

### EPIC-3 — Produksi

| ID | Judul | P | Pts | Sprint | Persona |
| --- | --- | --- | --- | --- | --- |
| US3.1 | Buat batch/siklus semai | HIGHEST | 8 | 2 | Petani |
| US3.2 | Pindah fase di HP | HIGHEST | 8 | 2 | Petani |
| US3.3 | Submit harvest report | HIGH | 5 | 2 | Petani |
| US3.4 | **[Figma]** Master varietas & asumsi (parameter, aktivasi) | HIGHEST | 8 | 2 | Owner/Admin |
| US3.5 | **[Figma]** Log kegagalan per tahap | HIGHEST | 5 | 2 | Petani |
| US3.6 | **[Figma]** Tambal susulan, monitor pertumbuhan, timeline | HIGH | 5 | 2 | Petani |
| US3.7 | **[Figma]** Alur RBAC petani (tugas, log, histori) | MED | 5 | 2 | Petani |

Fase Figma/skripsi (bukan hanya Semai→Bibit→Tanam→Panen kerangka): persiapan semai → semai rockwool → sprout/daun → tambal susulan → pindah kolam → pendewasaan → panen & sortasi (layak vs tidak layak). Urutan hanya maju.

Kode batch unik analog kerangka `GH-A1-YYMMDD-NNN`.

### EPIC-4 — Inventaris & infrastruktur

| ID | Judul | P | Pts | Sprint | Persona |
| --- | --- | --- | --- | --- | --- |
| US4.1 | Stok + movement log | HIGHEST | 5 | 2 | Admin/Petani |
| US4.2 | Active Pack cost/unit | HIGH | 5 | 2 | Petani/Admin |
| US4.3 | Alert stok minimum | MED | 3 | 2 | Sistem |
| US4.4 | **[Figma]** Master kolam, greenhouse, lahan | HIGHEST | 8 | 2 | Admin/Owner |
| US4.5 | **[Figma]** Master petani/karyawan | HIGH | 5 | 2 | Admin |

### EPIC-5 — Penjualan & pengiriman

| ID | Judul | P | Pts | Sprint | Persona |
| --- | --- | --- | --- | --- | --- |
| US5.1 | Customer + Sales Order | HIGHEST | 13 | 3 | Admin |
| US5.2 | Item SO dinamis + cek stok | HIGH | 5 | 3 | Admin |
| US5.3 | Status pengiriman/packing petani | HIGH | 8 | 3 | Petani |
| US5.4 | Auto jurnal saat DELIVERED | HIGHEST | 8 | 3 | Sistem |
| US5.5 | **[Figma]** Invoice, batal SO, catat packing cost | MED | 5 | 3 | Admin |

Status SO: DRAFT → CONFIRMED → SHIPPED → DELIVERED / CANCELLED. Nomor `SO-YYYY-NNN`.

### EPIC-6 — Dashboard, visualisasi, ekspor

| ID | Judul | P | Pts | Sprint | Persona |
| --- | --- | --- | --- | --- | --- |
| US6.1 | Grafik pendapatan vs pengeluaran + KPI | HIGH | 8 | 4 | Owner |
| US6.2 | Pie breakdown biaya + drill-down | MED | 5 | 4 | Owner |
| US6.3 | Ekspor jurnal xlsx, neraca & laba-rugi PDF | HIGH | 8 | 4 | Owner/Admin |
| US6.4 | **[Figma]** Evaluasi margin, BEP, kapasitas menganggur | HIGHEST | 8 | 4 | Owner |
| US6.5 | **[Figma]** Arus kas + filter periode laporan | HIGH | 5 | 4 | Owner/Admin |

### Sprint 5 — QA (bukan epic fitur)

| ID | Judul | Pts |
| --- | --- | --- |
| T5.1 | Usability petani (HP + sarung tangan): pindah fase | 4 |
| T5.2 | Usability Admin: filter jurnal | 2 |
| T5.3 | Usability Owner: baca laba dari grafik | 2 |
| T5.4 | Audit debit = kredit | 4 |
| T5.5 | Bugfix hasil uji | 8 |
| T5.6–T5.8 | Vercel + Postgres cloud + security | 8 |
| T5.9 | Go-live + pelatihan 6 pengguna | 3 |

---

## 9. Alur pengguna end-to-end dan kriteria penerimaan

Setiap alur: aktor, langkah, layar Figma, AC. Kerjakan satu alur sebagai slice tes.

### F1 — Login sukses per peran

1. Buka `/login` (`web-login` / `login-screen`).
2. Isi email+sandi valid.
3. Sistem cek credentials; buat session.
4. Redirect: Owner → dashboard Owner; Admin → dashboard Admin; Petani → dashboard Petani.

**AC:** Tiga akun seed berhasil; session cookie HttpOnly; refresh tetap terautentikasi; UI sesuai peran (menu RBAC).

### F2 — Login gagal

Layar `web-auth-invalid-credentials`.  
**AC:** Sandi salah → pesan jelas, tetap di login; field kosong → validasi wajib; tidak membocorkan apakah email terdaftar.

### F3 — Lupa sandi

`web-forgot-password` → `web-otp-verification` → `web-reset-password` (mobile sama).  
**AC:** OTP kedaluwarsa ditolak; sandi baru ter-hash; jejak di audit; sesuai Doc: Admin dapat menerbitkan sandi sementara.

### F4 — Register petani

Admin: `web-register-employee` / `web-Petani-form`.  
**AC:** Nama, username, sandi awal, peran Petani; tidak ada signup publik; Owner bisa lihat di user management.

### F5 — Logout

Mobile `logout-confirmation`.  
**AC:** Session hancur; akses URL proteksi → login.

### F6 — Master varietas

Daftar → tambah → validasi → detail → edit → nonaktif/aktif → hapus (diblokir jika terpakai siklus) → empty state → cari kosong.  
Layar: `web-varietas-*`, `web-1-*`, `01 · … 13 · Peta flow`.  
**AC:** Parameter asumsi (harga benih/gram, daya kecambah, lama semai, berat panen rata-rata) tersimpan; hanya varietas aktif bisa dipilih di mulai siklus; konfirmasi sebelum hapus/nonaktif.

### F7 — Master infrastruktur

Kolam, greenhouse, lahan: list/form (`web-kolam-*`, `web-greenhouse-form`, `web-lahan-form`, `web-infrastruktur`).  
**AC:** Kapasitas lubang terhubung ke 1.920 total; kolam punya status terpakai/menganggur untuk evaluasi.

### F8 — Master petani/karyawan

`web-Petani-*`, `05 Master karyawan`.  
**AC:** CRUD terbatas Admin/Owner; Petani tidak kelola user lain.

### F9 — Mulai siklus & semai

Petani: `web-mulai-siklus`, `web-siklus-semai`, mobile `mulai-siklus`/`semai-benih`.  
**AC:** Pilih varietas aktif, greenhouse/kolam, Active Pack benih+media; stok pack berkurang atomik; kode batch unik; fase awal SEMAI; rollback jika gagal.

### F10 — Pindah fase (HP)

`US3.2` + `pindah-kolam`, `monitor-pertumbuhan`, `tambal-susulan`.  
**AC:** Tombol besar; konfirmasi; hanya maju; ProductionLog (waktu+user); durasi fase tercatat; selesai < 1 menit pada uji T5.1.

### F11 — Catat kegagalan

`web-kegagalan-form`, mobile `catat-kegagalan`.  
**AC:** Tahap, jumlah gagal, biaya terkait; satu log per kejadian; tampil di detail siklus.

### F12 — Panen & harvest report

Petani input berat layak & tidak layak (`web-siklus-panen`, `panen-sortasi`) → HarvestReport PENDING → badge Admin (`web-admin-harvest-report-*`) → review breakdown HPP → approve/reject/override.  
**AC:** Satu report aktif per batch; layak jual = tanam − total susut; jurnal persediaan otomatis setelah approve (Journey 1 kerangka); Owner melihat update.

### F13 — HPP & susut

Sistem hitung setelah log produksi+gagal ada (`web-hpp`, `hpp-summary`, `klasifikasi-susut`, `alokasi-overhead`).  
**AC:** Langsung = benih+rockwool+nutrisi; overhead = listrik/air/dll teralokasi; 3 satuan HPP; susut abnormal tidak menggelembungkan HPP.

### F14 — Jurnal pembelian & COA

Alert stok (`web-admin-low-stock-list`) → jurnal (`web-admin-journal-form`) debit=kredit → PENDING → approve → saldo COA + InventoryLog IN.  
**AC:** Tidak bisa save jika debit ≠ kredit; Owner hanya lihat (`web-owner-journal-list-filter`).

### F15 — Active Pack

`web-admin-active-pack-*` / `web-petani-active-pack-*`.  
**AC:** cost/unit = harga/pack ÷ unit; DEPLETED di sisa 0; terpakai di HPP.

### F16 — Movement stok

IN/OUT/ADJUST + riwayat.  
**AC:** qty > 0; currentStock atomik; petani & admin sesuai RBAC.

### F17 — Sales order

Admin buat SO + item (`web-penjualan-*`, `web-pelanggan-*`) → konfirmasi kurangi stok.  
**AC:** stok cukup; warning jika qty > stok; grand total realtime.

### F18 — Packing & kirim

Petani `packing-distribusi` / `web-petani-delivery-*` CONFIRMED → SHIPPED → DELIVERED.  
**AC:** timestamp+user+catatan; Admin/Owner lihat status.

### F19 — Jurnal pendapatan otomatis

Saat DELIVERED: Kas/Piutang Dr, Pendapatan Cr; HPP Dr, Persediaan Cr; status jurnal PENDING untuk Admin; cancel → reversal.  
**AC:** nomor SO di deskripsi jurnal.

### F20 — Evaluasi Owner

`web-evaluasi-*`, `US6.4`.  
**AC:** HPP vs harga jual, margin, BEP, kolam menganggur; tanpa buka tabel mentah (uji T5.3 < 30 detik untuk “bulan laba tertinggi”).

### F21 — Laporan & ekspor

Laba rugi (`web-laporan-laba-rugi`: pendapatan, HPP, laba kotor, bunga, laba bersih), neraca, arus kas, filter periode, PDF/Excel (`web-laporan-export`, `web-owner-export-report-dialog`).  
**AC:** background export; nama file bermakna; Owner+Admin; Petani tidak.

### F22 — Prive

`web-owner-prive-form`.  
**AC:** hanya Owner; jurnal modal/prive seimbang.

### F23 — Akses ditolak & empty/loading/error

**AC:** Petani tidak membuka `/admin/journal` (403 `web-global-access-denied`); empty copy nyata bukan lorem; error bisa retry.

### F24 — Notifikasi & profil (mobile)

`notification-center`, `profile-settings`, `change-password`.  
**AC:** ganti sandi butuh sandi lama; notifikasi harvest pending untuk Admin.

---

## 10. Definition of Done

### User story (semua WAJIB kecuali yang bertanda PENTING)

1. Semua AC terpenuhi.  
2. Review ≥ 1 developer.  
3. TypeScript bersih.  
4. ESLint + Prettier bersih.  
5. Tidak ada `console.error`/`warn` di production.  
6. API punya error handling + status HTTP benar.  
7. UI 375px dan desktop.  
8. Migrasi terdokumentasi.  
9. Seed di-update.  
10. (PENTING) Dokumentasi API.  
11. (PENTING) Edge/error state informatif.  
12. Tidak ada data bisnis hardcode.

### Sprint

Demo ke PO; retro tercatat; velocity tercatat; staging tanpa crash; tidak ada bug P1 terbuka.

---

## 11. API (kerangka, target sprint)

Semua JSON, session NextAuth, middleware peran.

| Method | Endpoint | Peran | Sprint |
| --- | --- | --- | --- |
| POST | `/api/auth/signin` | All | 1 |
| GET | `/api/auth/session` | All | 1 |
| GET/POST/PUT | `/api/accounts` | Admin tulis; Owner baca | 2 |
| GET/POST/PUT | `/api/transactions` | Admin; Owner GET | 2 |
| GET/POST | `/api/production` | Petani POST; All GET | 2 |
| PUT | `/api/production/[id]/phase` | Petani | 2 |
| POST/GET | `/api/harvest` | Petani POST; Admin GET | 2 |
| PUT | `/api/harvest/[id]/approve` | Admin | 2 |
| GET/POST | `/api/inventory` | All GET; Admin POST item | 2 |
| POST | `/api/inventory/movement` | Petani, Admin | 2 |
| POST | `/api/inventory/active-pack` | Petani, Admin | 2 |
| GET/POST | `/api/customers` | Admin | 3 |
| GET/POST | `/api/sales-orders` | Admin tulis; Owner GET | 3 |
| PUT | `/api/sales-orders/[id]/confirm` | Admin | 3 |
| PUT | `/api/sales-orders/[id]/deliver` | Petani, Admin | 3 |
| GET | `/api/reports/monthly-summary` | Owner, Admin | 4 |
| GET | `/api/reports/cost-breakdown` | Owner, Admin | 4 |
| GET | `/api/export/journal` | Admin | 4 |
| GET | `/api/export/balance-sheet` | Owner, Admin | 4 |
| GET | `/api/export/income-statement` | Owner, Admin | 4 |

Tambahan implementasi (Figma, belum di sheet API): `/api/varieties`, `/api/infrastructure`, `/api/failures`, `/api/users`, `/api/auth/forgot`, `/api/evaluations`. Sama-sama proteksi peran.

---

## 12. Matriks RBAC (kerangka, nama peran Kokonus)

| Modul | Owner | Admin | Petani |
| --- | --- | --- | --- |
| Dashboard finansial | Penuh | Sebagian | Tidak |
| Grafik tren | Penuh | Tidak | Tidak |
| COA | Lihat | CRUD | Tidak |
| Jurnal input/approve | Tidak | Penuh | Tidak |
| Jurnal lihat/filter | Penuh | Penuh | Tidak |
| Approve harvest / HPP | Tidak | Penuh | Tidak |
| SO buat/konfirmasi | Tidak | Penuh | Tidak |
| Status kirim | Tidak | Penuh | Penuh |
| Batch semai / fase / harvest submit | Tidak | Tidak* | Penuh |
| Stok lihat | Penuh | Penuh | Penuh |
| Movement & Active Pack | Tidak | Penuh | Penuh |
| Neraca & laba-rugi | Penuh | Penuh | Tidak |
| Export | Penuh | Penuh | Tidak |
| User management | Penuh | Tidak** | Tidak |
| Prive | Penuh | Tidak | Tidak |
| Varietas & infrastruktur (Figma) | Penuh/parameter | CRUD operasional | Lihat yang perlu tugas |
| Kegagalan | Lihat | Lihat+koreksi | Input |
| Evaluasi BEP | Penuh | Bantu hitung | Tidak |

\*Admin tidak menjalankan fase lapangan. \*\*Doc: Admin mendaftarkan petani — izinkan **create petani** saja, bukan hapus Owner.

---

## 13. Risiko (dari register kerangka, konteks Kokonus)

| ID | Risiko | Mitigasi |
| --- | --- | --- |
| R-01 | Schema 16 tabel ERD + HPP berubah | Pakai kamus bagian 8.1; satuan yang masih terbuka dikunci sebelum seed |
| R-02 | Prisma N+1 | `select`/`include` selektif |
| R-03 | Celah auth | Review senior, HTTPS |
| R-04 | HPP salah → keputusan harga salah | Unit test kalkulator; validasi rumus dengan Admin |
| R-05 | Tim belum akrab App Router | Knowledge sharing sprint 1 |
| R-06 | Scope creep | Fitur baru ke backlog, bukan sprint aktif |
| R-07 | UX HP petani buruk | Mobile-first; uji sarung tangan Sprint 5 |
| R-08 | Data jurnal rusak | Transaksi DB + backup harian |
| R-09 | Major bump library | Lock versi |
| R-10 | Lolos lokal gagal production | Staging dari Sprint 3; checklist deploy |

---

## 14. Uji kesiapan (Sprint 5)

**Black-box (isi hasil setelah sistem ada):** login 3 peran + gagal + kosong; mulai siklus; catat gagal; pindah kolam; panen sortasi; HPP 3 satuan; pisah susut; terima pesanan; packing+pendapatan; validasi pesanan kosong; laba rugi; neraca+arus kas; unduh laporan.

**SUS:** 10 butir standar; 6 responden; tugas per peran (Owner baca laba; Admin cek alokasi HPP; petani catat fase). Ambang go-live kerangka: Good ≥ 70; jika < 70 redesign komponen bermasalah.

**Demo seed (ganti sebelum production):** analog `owner@` / `admin@` / `worker@` + `password123` — **wajib diganti**. `NEXTAUTH_SECRET` baru; jangan commit `.env`.

---

## 15. Glosarium singkat

DWC pada workbook = analog metode hidroponik; implementasi Kokonus = **rakit apung**. Double-entry, HPP, ABC, COA, Active Pack, ProductionCycle, HarvestReport, SO, DoD, middleware: sama dengan tab GLOSARIUM kerangka.

---

## 16. Out of scope / later (ulang operasional)

Lihat bagian 4. Antrian eksplisit pasca-skripsi: native app, IoT, payment gateway, multi-farm, self-serve pelanggan, pemeliharaan.

---

## 17. Cara pakai backlog

Kerjakan **satu ID** (US atau F) sampai DoD, baru pindah. Jangan mulai EPIC-5 sebelum EPIC-1–4 demo-able. Jangan mulai EPIC-6 sebelum ada transaksi dan SO sampel. Jangan anggap status “Selesai” di xlsx contoh sebagai status repo ini.

Sumber layar rinci: `figma-flow-inventory.md`. Konteks tahan lama: `project-context.md`.
