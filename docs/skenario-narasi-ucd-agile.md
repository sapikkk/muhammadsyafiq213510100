# Skenario narasi UCD & Agile — Kokonus Farm

**Judul penelitian:** Digitalisasi Tata Kelola Biaya Produksi Hidroponik melalui Pengembangan Website Menggunakan Metode Agile (Studi Kasus Kokonus Farm)

Naskah ini menceritakan bagaimana User-Centered Design (UCD) dan Agile Scrum dipakai bersama di Kokonus Farm. Angka, peran, epic, sprint, alur F1–F24, Definition of Done, dan batasan mengikuti `prd-agile-kokonus-farm.md` dan `project-context.md`. Nama layar mengikuti papan Figma; rincian frame ada di `figma-flow-inventory.md`. File format skripsi, workbook kerangka, dan Google Doc tidak diubah.

## 1. Prolog: Excel yang pernah cukup, greenhouse yang tidak mau menunggu

Koko Nuswantoro sudah lama bekerja dengan angka.

Di Adhi Karya, tempat ia bekerja sejak 1992, ia pernah menjadi cost control di departemen keuangan konstruksi. Biaya di situ adalah baris: varians, alokasi, bukti, Excel. Spreadsheet tidak menakutkannya. Yang membuatnya waswas adalah angka yang tidak bisa ditelusur.

Delapan tahun terakhir, setelah pensiun, ia belajar hidroponik dengan berbagai macam instalasi. Proses itu tidak langsung jadi satu rak atau satu metode. Ia akhirnya memilih rakit apung di Pekanbaru: greenhouse, kolam, 1.920 lubang tanam. Peran sistemnya: Owner Kokonus Farm.

Setiap panen, dua kebiasaan itu bertabrakan.

Di konstruksi, cost control menunggu dokumen yang sudah disepakati. Di greenhouse, Marzuki, Darusman, Widi Antoni, dan Hudzaifah Mutahajjid mencatat semai, tambal, pindah kolam, dan gagal di lapangan yang basah. Admin menata jurnal di meja. Koko membuka Excel di rumah untuk kira-kira HPP. Tiga sumber dan tiga waktu menghasilkan pertanyaan yang selalu telat: berapa harga pokok satu pack selada, dan apakah harga jual sudah di atas itu?

Visi produk keluar dari pertanyaan itu. Operasional greenhouse perlu lebih efisien, transparan, dan terdigitalisasi, dari asumsi varietas dan semai sampai laporan laba, supaya pemilik melihat HPP dan laba per siklus tanpa menunggu rekap manual. Kalimat yang mereka masukkan ke backlog: tata kelola biaya produksi hidroponik, satu siklus satu angka.

## 2. Visi, misi, dan janji skripsi

Tim pengembang (mahasiswa, dengan pembimbing sebagai pengarah proses) duduk dengan Koko sebagai Product Owner. Yang dijanjikan adalah website yang:

- men-track siklus rakit apung 1.920 lubang;
- mencatat kegagalan dan susut (normal vs abnormal);
- menjalankan akuntansi double-entry dan HPP berbasis aktivitas (per lubang, per kilogram, per pack);
- mengelola inventaris bahan (benih, media, nutrisi);
- mengikat penjualan, packing, dan pendapatan pada siklus yang sama;
- memberi dashboard dan ekspor laporan untuk Owner dan Admin.

Tujuan skripsi di kerangka Google Doc (isinya tidak diubah) sama dengan janji lapangan: merancang website yang menyatukan data budidaya dan penjualan; menyusun algoritma HPP yang mengalokasikan biaya variabel per rotasi tanam; menyediakan rancangan laporan untuk keputusan harga jual.

Batas janji diucapkan di sprint 0, supaya Koko tidak mengira sensor pH akan menyusul otomatis. Yang masuk skripsi: requirement, design, development, testing. Pemeliharaan jangka panjang tidak. IoT, aplikasi native store, e-commerce publik, payment gateway, multi-cabang, self-registration pelanggan, dan mengubah file format skripsi atau workbook kerangka berada di luar naskah ini.

## 3. Bagaimana UCD bekerja di Kokonus Farm

UCD di skripsi ini tidak disusun sebagai lima tahap waterfall sebelum Scrum. Empathize, define, ideate, prototype, dan test masuk setiap epic dan setiap sprint. Scrum memberi irama: backlog, sprint 1–5, planning, daily, review, retro, DoD. UCD menjaga irama itu tetap tentang Koko, Admin, dan empat petani, termasuk ketika tim tergoda mengukur kemajuan hanya dari kode yang selesai.

### 3.1 Empathize

Observasi di greenhouse: semai rockwool sampai panen-sortasi. Petani memakai HP dengan tangan basah. Fase tidak boleh mundur. Tambal susulan dan pindah kolam adalah gerakan cepat; form panjang tidak dipakai di situ.

Di meja Admin: COA, jurnal, approval panen, SO, pelanggan, ekspor. Jika debit tidak sama dengan kredit, angka Koko tidak boleh naik ke dashboard.

Di meja Owner, Koko membuka Excel seperti dulu di cost control. Ia mencari laba per siklus, tren, HPP vs harga jual, BEP, kolam menganggur, prive, dan siapa yang boleh masuk sistem. Ia tidak ingin menginput jurnal. Ia ingin melihat.

Pain yang dicatat: laba tak terlihat tepat waktu; biaya tak teralokasi ke rotasi; catatan lapangan basah dan terpisah dari jurnal.

### 3.2 Define

How-might-we yang disepakati: satu siklus menghasilkan satu HPP dan satu laba. Tiga persona tetap: P-01 Owner Koko, P-02 Admin pembukuan, P-03 empat petani. Tidak ada self-signup publik. Admin (atau Owner) yang mendaftarkan petani.

### 3.3 Ideate

Affinity dari hierarchy Figma (akses; varietas/logistik; produksi; kegagalan; biaya/HPP; penjualan; evaluasi; pelaporan) dipetakan ke 6 epic kerangka. Sprint UCD terpisah tidak dibuat.

| Epic | Nama kerangka | Nama operasional Kokonus | Sprint | Points |
| --- | --- | --- | --- | --- |
| EPIC-1 | Core Framework & Authentication | Fondasi, schema, auth, RBAC, settings | 1 | 34 (+ US master user) |
| EPIC-2 | Sistem Akuntansi Double-Entry & HPP | COA, jurnal, HPP ABC, biaya, susut | 2 | 21 |
| EPIC-3 | Manajemen Produksi | Siklus rakit apung, fase, harvest, kegagalan | 2 | 21 |
| EPIC-4 | Manajemen Inventaris & Bahan Baku | Stok, Active Pack, alert, infrastruktur | 2 | 13 |
| EPIC-5 | Manajemen Penjualan & Pengiriman | Pelanggan, SO, packing, jurnal otomatis | 3 | 34 |
| EPIC-6 | Dashboard, Visualisasi & Export | Grafik, evaluasi, PDF/Excel, prive | 4 | 21 |

Sprint 5 adalah QA 13 points di luar enam epic (144 pts epic + 13 QA = 157 di roadmap). Status "Selesai" di xlsx contoh bukan status Kokonus: belum dikode.

### 3.4 Prototype

Prototype skripsi ini adalah hi-fi Figma page `Web ` dan `Mobile`, plus Architecture (flowchart, DFD, UML, ERD). Halaman bernama Lo-Fi / Hi-Fi / Wireframes di file Figma kosong; yang dipakai adalah frame `web-*` dan layar HP 390×844. Prototype itu desain, belum kode. Setiap sprint, story baru dicek ulang ke frame itu sebelum DoD UI.

### 3.5 Test

Uji formal ada di Sprint 5: task usability, SUS 10 butir dengan 6 responden, black-box, rubrik Excellent >85 / Good 70–84 / Needs Work <70, plus rentang skripsi 0–100. Ambang go-live kerangka: Good ≥ 70. Di bawah itu, komponen bermasalah di-redesign. Setiap Sprint Review sebelumnya sudah memakai scene pengguna nyata (login, fase, jurnal) sebagai tes mini, jadi UCD tidak menunggu minggu 9.

## 4. Agile: peran, artefak, irama, DoD

### 4.1 Peran di lapangan dan di Scrum

| Orang | Peran sistem | Peran Scrum / UCD |
| --- | --- | --- |
| Koko Nuswantoro | Owner | Product Owner: prioritas backlog, terima/tolak demo, prive, user management, baca laba |
| Admin pembukuan (analog kerangka "Siti") | Admin | Stakeholder operasional: COA, jurnal, approve panen & HPP, SO, ekspor, daftar petani |
| Marzuki, Darusman, Widi Antoni, Hudzaifah Mutahajjid | Petani / Pekerja | Pengguna lapangan; analog kerangka "Agus" |
| Tim pengembang | — | Scrum Team; merancang, mengode, menguji; pembimbing menjaga kesesuaian kerangka Agile & UCD |

RBAC ditegakkan di middleware API. Menu saja tidak cukup. Owner tidak menginput jurnal. Admin tidak menjalankan fase lapangan. Petani tidak membuka `/admin/journal`. Admin boleh create petani dan tidak boleh hapus Owner.

### 4.2 Artefak

- Product backlog bernomor US1.1–US6.5 dan tugas QA T5.1–T5.9, plus alur F1–F24.
- Sprint backlog turunan: Sprint 1 (34 pts inti), Sprint 2 (55 pts), Sprint 3 (34), Sprint 4 (21), Sprint 5 (13 QA).
- DoD user story (wajib kecuali bertanda penting): semua AC; review ≥ 1 developer; TypeScript bersih; ESLint + Prettier bersih; tidak ada `console.error`/`warn` di production; API error handling + status HTTP benar; UI 375px dan desktop; migrasi terdokumentasi; seed di-update; dokumentasi API (penting); edge/error state informatif (penting); tidak ada data bisnis hardcode.
- DoD sprint: demo ke PO; retro tercatat; velocity tercatat; staging tanpa crash; tidak ada bug P1 terbuka.
- Increment tiap review: potongan website yang bisa dijalankan sesuai goal sprint.
- ERD / schema / API sebagai artefak teknis (Prisma, 11 tabel kerangka + entitas skripsi: Varietas, Kolam, Siklus, Greenhouse, Lahan, Log Kegagalan, Biaya Overhead).
- Hi-fi Figma sebagai artefak prototipe UCD.

Cara pakai backlog: kerjakan satu ID (US atau F) sampai DoD, baru pindah. Jangan mulai EPIC-5 sebelum EPIC-1–4 demo-able. Jangan mulai EPIC-6 sebelum ada transaksi dan SO sampel.

### 4.3 Irama lima sprint

Sprint Planning: goal satu kalimat dari PRD. Kapasitas acuan 80 jam / 2 minggu / 10 hari kerja. Story diurai ke tugas harian kerangka.

Daily Scrum: blokir N+1 Prisma, auth, HPP salah, UX HP, debit≠kredit.

Sprint Review: demo ke Koko sebagai PO, dengan scene Figma yang sudah jadi increment. Slide tidak menggantikan demo.

Sprint Retrospective: catat velocity dan satu perbaikan proses. Risiko R-01–R-10 (schema, N+1, auth, HPP, App Router, scope creep, UX HP, jurnal rusak, bump library, lolos lokal gagal production) tidak diabaikan; mitigasinya sudah tertulis di PRD.

UCD di dalam irama itu: planning memakai how-might-we dan persona; daily memakai observasi lapangan jika story petani; review memakai tugas pengguna; retro boleh memutuskan ulang prototipe Figma sebelum menambah scope.

Tech stack yang dipegang kecuali PO memutuskan lain: Next.js 14 App Router, TypeScript strict, Prisma, PostgreSQL, NextAuth, Tailwind v3, shadcn/ui, Recharts, xlsx, jspdf.

## 5. Sprint 0: product backlog yang sudah bernomor

Sebelum hari kerja pertama, backlog sudah bernomor. Item-item ini akan muncul sebagai adegan, bukan kotak kosong.

EPIC-1 (Sprint 1): US1.1 setup Next.js; US1.2 schema Prisma; US1.3 migrate/seed; US1.4 login/logout + redirect peran; US1.5 lupa sandi, OTP, reset; US1.6 register karyawan oleh Admin; US1.7 settings profil, notifikasi, matrix peran; US1.8 state global loading/error/empty/403; US1.9 kelola user Owner (boleh mengendur ke Sprint 4).

EPIC-2 (Sprint 2): US2.1 COA; US2.2 jurnal + approval; US2.3 HPP ABC; US2.4 form biaya langsung & overhead; US2.5 susut normal vs abnormal; US2.6 Owner COA readonly, filter jurnal, prive (Sprint 4).

EPIC-3 (Sprint 2): US3.1 batch semai; US3.2 pindah fase HP; US3.3 harvest report; US3.4 master varietas & asumsi; US3.5 log kegagalan; US3.6 tambal, monitor, timeline; US3.7 alur RBAC petani.

EPIC-4 (Sprint 2): US4.1 stok + movement; US4.2 Active Pack; US4.3 alert min; US4.4 master kolam/greenhouse/lahan; US4.5 master petani.

EPIC-5 (Sprint 3): US5.1 customer + SO; US5.2 item dinamis + cek stok; US5.3 packing petani; US5.4 auto jurnal DELIVERED; US5.5 invoice, batal SO, packing cost.

EPIC-6 (Sprint 4): US6.1 grafik pendapatan vs biaya + KPI; US6.2 pie + drill-down; US6.3 ekspor xlsx/PDF; US6.4 evaluasi margin/BEP/kapasitas; US6.5 arus kas + filter periode.

Tiga journey kerangka yang wajib utuh di akhir skripsi, plus journey Figma:

1. Panen: trigger lapangan, login HP, input berat, HARVEST_PENDING, Admin review HPP, jurnal, Owner lihat aset/laba.
2. Pembelian & inventaris: stok < min, jurnal pembelian, approve, Active Pack.
3. Penjualan: SO, konfirmasi stok, kirim DELIVERED, jurnal pendapatan.
4. Tambahan Figma/skripsi: lupa sandi, master varietas, kegagalan/susut, evaluasi BEP.

## 6. Sprint 1: fondasi dan siapa yang boleh masuk (minggu 1–2)

Goal: Next.js berjalan, schema terpasang, login per peran, middleware RBAC, layar auth Figma.

UCD Sprint 1: empathize pada lupa sandi di HP dan petani yang salah ketik; define "tidak ada signup publik"; ideate dari section Figma `01 — Shared & Authentication Flow`; prototype `web-login`, `login-screen`, `web-auth-invalid-credentials`; test mini di review dengan tiga akun seed.

Hari 1–2. US1.1: App Router, TS strict, ESLint/Prettier, Tailwind botanical, shadcn Button/Card/Input/Badge/Dialog/Table/Select, folder `/app` `/components` `/lib` `/hooks` `/types`, `.env.example`.

Hari 3–4. US1.2: ERD sign-off (mitigasi R-01). Enum Role OWNER/ADMIN/PEKERJA.

Hari 5–6. US1.3: Postgres, seed 3 demo role (email kokonus; analog `password123` wajib diganti sebelum production). `NEXTAUTH_SECRET` baru; `.env` tidak di-commit.

Hari 7–8. US1.4: Credentials + bcrypt + JWT; middleware `/owner` `/admin` `/petani`.

Hari 9–10. US1.8 state global; demo.

### Adegan F1. Login sukses

Pagi di greenhouse, Hudzaifah membuka `/login` (`web-login` / `login-screen`) dengan email dan sandi valid. Session HttpOnly. Ia mendarat di `web-dashboard-petani` / `dashboard-petani`. Di rumah, Koko mendarat di `web-dashboard-Owner`. Admin di `web-dashboard-admin`. Menu mengikuti RBAC.

### Adegan F2. Login gagal

Sandi salah: `web-auth-invalid-credentials`. Pesan jelas, tetap di login. Field kosong divalidasi. Sistem tidak membocorkan apakah email terdaftar. Koko, yang dulu menjaga dokumen proyek, menolak pesan "email not found" yang memudahkan orang luar.

### Adegan F3. Lupa sandi

Marzuki di `web-forgot-password`, lalu OTP `web-otp-verification`, lalu `web-reset-password` (mobile sama). OTP kedaluwarsa ditolak. Sandi baru ter-hash. Jejak audit. Sesuai kerangka skripsi, Admin dapat menerbitkan sandi sementara. Tautan publik tanpa jejak tidak dipakai.

### Adegan F4. Register petani

Tidak ada daftar sendiri. Admin di `web-register-employee` / `web-Petani-form` mengisi nama, username, sandi awal, peran Petani. Owner melihatnya nanti di user management (US1.9 / Figma `web-owner-user-management`).

### Adegan F5. Logout

Di HP, `logout-confirmation`. Session hancur. URL proteksi mengembalikan ke login.

### Adegan F23 (awal). Ditolak dan state jujur

Petani yang mengetik `/admin/journal` mendapat `web-global-access-denied`. Empty/loading/error (`web-global-empty-state`, `web-global-loading-state`, `web-global-error-state`) memakai copy nyata dan retry, tanpa lorem.

Review Sprint 1: Koko sebagai PO melihat tiga peran masuk pintu yang benar. Retro: knowledge sharing App Router (R-05). Increment: auth + schema. HPP belum ada.

## 7. Sprint 2: Excel bertemu kolam (minggu 3–4)

Goal: petani input siklus dan gagal di HP; Admin kelola COA/jurnal, approve panen + HPP; stok + Active Pack; master varietas dan infrastruktur. 55 pts. Urutan kerangka: COA, jurnal, inventaris/Active Pack, produksi UI, HPP + harvest approval. Master varietas/infrastruktur disisipkan hari 1–4 agar batch punya asumsi.

UCD Sprint 2: observasi fase hanya maju; define HPP tiga satuan; ideate modul 3–5 Figma; prototype `web-mulai-siklus`, `pindah-kolam`, `web-hpp`. Tes sarung tangan belum formal (itu T5.1), tetapi tombol besar sudah syarat AC.

### 7.1 Master, seperti bill of quantity

F6, master varietas. Daftar, tambah, validasi, detail, edit, nonaktif/aktif, hapus (diblokir jika terpakai siklus), empty, cari kosong. Layar `web-varietas-*`, `web-1-*`, `01 · … 13 · Peta flow`. Parameter: harga benih/gram, daya kecambah, lama semai, berat panen rata-rata. Hanya varietas aktif untuk mulai siklus.

F7, master infrastruktur. `web-kolam-*`, `web-greenhouse-form`, `web-lahan-form`, `web-infrastruktur`. Kapasitas lubang mengunci ke 1.920. Kolam terpakai vs menganggur, dalam bahasa cost control: kapasitas idle.

F8, master petani. `web-Petani-*`, `05 Master karyawan`. CRUD Admin/Owner. Petani tidak kelola user lain.

### 7.2 Siklus sebagai proyek mini

Kode batch analog `GH-A1-YYMMDD-NNN`. Fase: persiapan semai, semai rockwool, sprout/daun, tambal susulan, pindah kolam, pendewasaan, panen dan sortasi (layak vs tidak layak). Urutan hanya maju.

F9, mulai siklus dan semai. Petani di `web-mulai-siklus`, `web-siklus-semai`, mobile `mulai-siklus`/`semai-benih`. Varietas aktif, greenhouse/kolam, Active Pack benih+media; stok pack berkurang atomik; fase SEMAI; rollback jika gagal.

F10, pindah fase di HP. `pindah-kolam`, `monitor-pertumbuhan`, `tambal-susulan`. Tombol besar, konfirmasi, ProductionLog waktu+user, durasi fase. Uji T5.1 menuntut selesai < 1 menit.

F11, catat kegagalan. `web-kegagalan-form`, `catat-kegagalan`. Tahap, jumlah gagal, biaya terkait; satu log per kejadian.

F12, panen. Berat layak dan tidak layak (`web-siklus-panen`, `panen-sortasi`) menjadi HarvestReport PENDING, lalu badge Admin (`web-admin-harvest-report-*`), review HPP, approve/reject/override. Satu report aktif per batch. Layak jual = tanam − total susut. Jurnal persediaan setelah approve. Owner melihat update aset/laba. Ini Journey Panen.

### 7.3 HPP: cost control 1992 dalam rumus greenhouse

F13. Setelah log produksi dan gagal ada: `web-hpp`, `hpp-summary`, `klasifikasi-susut`, `alokasi-overhead`. Langsung = benih + rockwool + nutrisi. Overhead = listrik, air, dan sejenisnya, teralokasi (ABC, cost driver Active Pack + durasi instalasi). Tiga satuan: per lubang, per kg, per pack. Override Admin plus justifikasi. Susut normal masuk HPP; abnormal ke akun kerugian, tidak menggelembungkan HPP (US2.5). Unit test kalkulator (R-04).

F14, jurnal pembelian dan COA. Alert `web-admin-low-stock-list`, jurnal `web-admin-journal-form` debit=kredit, PENDING, approve, saldo COA + InventoryLog IN. Tidak bisa save jika tidak seimbang. Owner hanya lihat `web-owner-journal-list-filter`. Ini Journey pembelian.

F15, Active Pack. `web-admin-active-pack-*` / `web-petani-active-pack-*`. cost/unit = harga/pack ÷ unit; DEPLETED di sisa 0; terpakai di HPP.

F16, movement. IN/OUT/ADJUST; qty > 0; currentStock atomik; RBAC petani vs admin.

API Sprint 2 yang ikut hidup: `/api/accounts`, `/api/transactions`, `/api/production`, `/api/production/[id]/phase`, `/api/harvest`, `/api/harvest/[id]/approve`, `/api/inventory`, movement, active-pack, plus implementasi Figma `/api/varieties`, `/api/infrastructure`, `/api/failures`.

Review Sprint 2: Koko membandingkan HPP layar dengan intuisi Excel-nya. Jika beda, yang diubah rumus plus justifikasi. Retro: transaksi DB + backup (R-08).

## 8. Sprint 3: dari kolam ke pelanggan (minggu 5–6)

Goal: SO, packing/kirim oleh petani, jurnal pendapatan otomatis saat DELIVERED. 34 pts. T3.1–T3.8. Staging mulai (R-10).

UCD: packing di HP satu tangan; define status SO yang Koko bisa lihat tanpa mengedit; prototipe `web-penjualan-*`, `packing-distribusi`; tes mini konfirmasi stok.

Status SO: DRAFT → CONFIRMED → SHIPPED → DELIVERED / CANCELLED. Nomor `SO-YYYY-NNN`.

F17, sales order. Admin plus item `web-penjualan-*`, `web-pelanggan-*`. Stok cukup; warning jika qty > stok; grand total realtime. Konfirmasi mengurangi stok.

F18, packing dan kirim. Petani `packing-distribusi` / `web-petani-delivery-*`. Timestamp, user, catatan. Admin/Owner lihat status dan tidak menjalankan fase tanam.

F19, jurnal pendapatan otomatis. Saat DELIVERED: Kas/Piutang Dr, Pendapatan Cr; HPP Dr, Persediaan Cr; jurnal PENDING untuk Admin; cancel memicu reversal; nomor SO di deskripsi. Ini Journey penjualan.

F24 (sebagian). `notification-center`: harvest pending untuk Admin. `profile-settings`, `change-password` (butuh sandi lama).

US5.5: invoice, batal SO, catat packing cost. Itu cerita Admin. E-commerce publik out of scope.

Review: satu SO sampel menembus DELIVERED dan muncul di filter jurnal Owner. Tanpa itu, EPIC-6 dilarang dimulai.

## 9. Sprint 4: dashboard menggantikan malam Excel (minggu 7–8)

Goal: grafik pendapatan vs biaya, pie, evaluasi BEP/kapasitas, ekspor jurnal xlsx plus neraca/laba-rugi PDF. 21 pts. T4.1–T4.7.

Di sini latar belakang Koko paling terasa. Ia bisa Excel. Ia tidak mau lagi menjadi operator rekap. Ia ingin membaca keputusan.

F20, evaluasi. `web-evaluasi-*`. HPP vs harga jual, margin, BEP, kolam menganggur. Uji T5.3: < 30 detik untuk "bulan laba tertinggi" tanpa tabel mentah.

F21, laporan dan ekspor. Laba rugi (`web-laporan-laba-rugi`: pendapatan, HPP, laba kotor, bunga, laba bersih), neraca, arus kas, filter periode, PDF/Excel (`web-laporan-export`, `web-owner-export-report-dialog`). Background export; nama file bermakna; Owner dan Admin; Petani tidak.

F22, prive. `web-owner-prive-form`. Hanya Owner; jurnal modal/prive seimbang. Dalam bahasa konstruksi: pengambilan pemilik tidak boleh menyamar sebagai beban produksi.

US1.9 kelola user dan US2.6 COA readonly/filter jurnal menutup hak Owner yang sudah dijanjikan di Sprint 1 tanpa membebani fondasi.

US6.1–US6.2: Recharts, KPI, pie, drill-down `web-owner-cost-breakdown-drilldown`. API `/api/reports/monthly-summary`, `cost-breakdown`, `/api/export/journal`, `balance-sheet`, `income-statement`.

Review: Koko sebagai PO mengekspor satu periode. Jika angka tidak seimbang, increment gagal DoD meskipun grafiknya indah.

## 10. Sprint 5: uji UCD (minggu 9–10)

Goal: uji pengguna nyata, audit debit=kredit, bugfix, security, deploy, pelatihan 3 peran. 13 pts QA. Pemeliharaan pasca-skripsi tidak termasuk.

| ID | Adegan uji | Pts |
| --- | --- | --- |
| T5.1 | Usability petani (HP + sarung tangan): pindah fase | 4 |
| T5.2 | Usability Admin: filter jurnal | 2 |
| T5.3 | Usability Owner: baca laba dari grafik | 2 |
| T5.4 | Audit debit = kredit | 4 |
| T5.5 | Bugfix hasil uji | 8 |
| T5.6–T5.8 | Vercel + Postgres cloud + security | 8 |
| T5.9 | Go-live + pelatihan 6 pengguna | 3 |

Enam responden SUS (10 butir standar) selaras T5.9: Koko, Admin, empat petani. Tugas: Owner baca laba; Admin cek alokasi HPP; petani catat fase.

Black-box diisi hasilnya setelah sistem ada. Daftarnya sudah lengkap: login 3 peran, gagal, kosong; mulai siklus; catat gagal; pindah kolam; panen sortasi; HPP 3 satuan; pisah susut; terima pesanan; packing+pendapatan; validasi pesanan kosong; laba rugi; neraca+arus kas; unduh laporan.

Go-live: staging/production, sosialisasi, seed demo diganti. SLA helpdesk tidak masuk.

Jika SUS < 70: redesign komponen bermasalah, masuk T5.5. IoT tidak ditambah sebagai solusi "lebih modern".

## 11. Dua puluh empat alur sebagai satu cerita

Urutan baca untuk penguji skripsi: masuk (F1–F5, F23, F24), siapkan master (F6–F8), tanam (F9–F11), panen dan HPP (F12–F13), beli bahan (F14–F16), jual (F17–F19), putuskan (F20–F22).

UCD yang terlihat adalah journey pengguna. Modul tidak dianggap selesai hanya karena sprintnya ditutup. Agile yang terlihat: F1–F5 di increment Sprint 1; F6–F16 di Sprint 2; F17–F19 di Sprint 3; F20–F22 di Sprint 4; seluruhnya diuji ulang Sprint 5.

## 12. Matriks: siapa pegang pena

Owner: dashboard finansial penuh, grafik tren, COA lihat, jurnal lihat/filter, stok lihat, neraca dan laba-rugi, export, user management, prive, varietas/parameter, kegagalan lihat, evaluasi BEP. Owner tidak input/approve jurnal, tidak approve harvest sebagai operator, tidak buat SO, tidak jalankan fase lapangan.

Admin: COA CRUD, jurnal penuh, approve harvest/HPP, SO buat/konfirmasi, status kirim, stok dan movement/Active Pack, laporan dan export, create petani, bantu hitung BEP. Admin tidak menjalankan fase lapangan, tidak hapus Owner, tidak prive.

Petani: status kirim, batch semai/fase/harvest submit, stok lihat, movement dan Active Pack, input kegagalan, layar tugas/log/histori. Petani tidak punya dashboard finansial, COA/jurnal, evaluasi BEP, atau export.

## 13. Out of scope

Sensor pH/EC dan otomasi pompa tidak menyusul di "sprint 6 skripsi". Aplikasi native store tidak mengganti web responsif plus layar mobile Figma. Tidak ada toko publik, gateway pembayaran, kripto, atau trading dari komponen finance generik Figma. Tidak ada multi-cabang. Tidak ada pemeliharaan jangka panjang, SLA, helpdesk. Tidak ada self-registration pelanggan akhir. File `FORMAT_SKRIPSI_SAPIK.docx`, workbook `Kebun-Hijau-Agile-UCD-Framework-v1.0.0.xlsx`, dan Google Doc kerangka hanya dibaca.

Antrian pasca-skripsi yang boleh disebut di bab penutup, dan tidak dikerjakan di sini: native app, IoT, payment gateway, multi-farm, self-serve pelanggan, pemeliharaan.

## 14. Epilog

Koko tetap orang Excel, pensiunan Adhi Karya yang tahu cost control, dan pembelajar hidroponik delapan tahun dengan banyak instalasi di belakangnya. Yang berubah adalah tempat angka itu hidup: di siklus rakit apung yang sama dengan tangan Marzuki di kolam, jurnal Admin yang debitnya wajib sama dengan kredit, dan dashboard yang menjawab HPP per lubang, per kilogram, per pack sebelum harga jual diketuk.

UCD menjawab untuk siapa sistem ini dan bagaimana rasanya di greenhouse. Agile Scrum menjawab kapan increment itu ada: lima sprint, enam epic, DoD, review ke PO. Keduanya satu penelitian pada studi kasus Kokonus Farm.
