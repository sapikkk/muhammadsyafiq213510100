# Catatan uji blackbox Kokonus Farm

Berkas ini adalah notulensi pengujian setiap user story. Isi yang sama ditempel ke issue GitHub masing-masing supaya papan proyek https://github.com/users/sapikkk/projects/1 bisa dibaca tanpa membuka repo.

## Cara membaca

- **Acceptance criteria**: syarat dari PRD, workbook, dan Figma. Status: Terpenuhi, Ditunda (dengan alasan), atau Tidak berlaku.
- **Definition of Done**: nomor item mengikuti PRD bagian 10. Item yang tidak relevan untuk US tersebut tidak ditulis.
- **Langkah uji blackbox**: urutan aksi pengguna tanpa melihat kode, masukan yang dipakai, hasil yang diharapkan, hasil aktual, dan status Lulus, Gagal, atau Belum.
- **Temuan**: bug yang ditemukan, keputusan desain yang menyimpang dari sumber, dan kendala lingkungan. Kendala lintas US diberi nomor FINDING-xx dan dibahas di bagian akhir.

## Alur kerja per user story

1. Buat branch `feat/usX.Y-nama` dari branch terakhir yang sudah lengkap.
2. Analisis sumber: workbook (prioritas tertinggi), Figma, lalu Google Doc.
3. Implementasi minimal yang memenuhi AC.
4. Uji blackbox di browser dengan akun demo. Catat setiap langkah.
5. `tsc --noEmit` dan `next lint` bersih.
6. Commit, push branch, buka PR ke `main`. `main` tidak disentuh tanpa persetujuan pemilik repo.
7. Tempel notulensi ke issue, pindahkan status di papan proyek.

## Akun demo

| Peran | Email | Catatan |
| --- | --- | --- |
| Owner | owner@kokonus.farm | Koko Nuswantoro |
| Admin | admin@kokonus.farm | Admin pembukuan |
| Petani | petani@kokonus.farm | Marzuki |
| Petani (uji US1.6) | darusman@kokonus.farm | Sandi awal, wajib ganti saat masuk |

Sandi demo ada di `prisma/seed.js` dan tidak ditulis di sini.

## Peta branch dan PR

| US | Branch | PR | Status papan |
| --- | --- | --- | --- |
| US1.1 sampai US1.3 | `main` (commit awal) | rilis v1.0.0 sampai v1.1.0 | Done |
| US1.4 | `feat/us1.4-login-rbac` | ada di `main` v1.1.0 | Done |
| US1.5 | `feat/us1.5-password-reset` | #46 | Done |
| US1.6 | `feat/us1.6-daftar-petani` | #47 | Done |
| US1.8 | `feat/us1.8-state-global` | #48 | Done |
| US1.7 | `feat/us1.7-pengaturan` | #49 | Done |
| US1.9 | belum | Sprint 4 | Todo |
| US2.1 | `feat/us2.1-coa` | #52 | Done |
| US2.2 | `feat/us2.2-jurnal` | #53 | Done |
| US4.1 | `feat/us4.1-stok-movement` | #54 | Done |
| US4.2 | `feat/us4.2-active-pack` | #55 | Done |
| US4.3 | `feat/us4.3-alert-stok` | #56 | Done |
| US4.4 | `feat/us4.4-infrastruktur` | #57 | Done |
| US3.4 | `feat/us3.4-varietas` | #58 | Done |
| US3.1 | `feat/us3.1-siklus-semai` | #59 | Done |
| US3.2 | `feat/us3.2-pindah-fase` | #PR_US32 | In progress |

---

## Notulensi pengujian US1.4

**Branch:** `feat/us1.4-login-rbac` · **Commit:** `a70516d` · sudah ada di `main` (rilis v1.1.0)
**Tanggal uji:** 7 Oktober 2026 · **Penguji:** agent + pemilik repo · **Metode:** blackbox lewat browser di `http://localhost:3000`

### Acceptance criteria

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | Login memakai email dan sandi, sesi JWT, hash bcrypt | Terpenuhi |
| AC2 | Field kosong menampilkan "Isi email dan sandi." | Terpenuhi |
| AC3 | Sandi salah menampilkan "Email atau sandi tidak cocok." tanpa membocorkan apakah email terdaftar | Terpenuhi |
| AC4 | Redirect per peran: Owner ke `/owner`, Admin ke `/admin`, Petani ke `/petani` | Terpenuhi |
| AC5 | Middleware melindungi `/owner`, `/admin`, `/petani`. Tanpa sesi kembali ke `/login` | Terpenuhi |
| AC6 | Keluar memakai dialog konfirmasi dan menutup sesi | Terpenuhi |
| AC7 | Tiga akun demo tersedia dari seed | Terpenuhi |

### Definition of Done (PRD bagian 10)

| # | Item | Status |
| --- | --- | --- |
| 1 | Semua AC terpenuhi | Ya |
| 2 | Review minimal 1 developer | Belum. Baru self-review |
| 3 | TypeScript bersih (`tsc --noEmit`) | Ya |
| 4 | ESLint bersih (`next lint`) | Ya |
| 5 | Tidak ada `console.error` di production | Ya |
| 7 | UI 375px dan desktop | Desktop diuji. 375px belum diuji di browser nyata, layout memakai `max-w-sm` |
| 8 | Migrasi terdokumentasi | Memakai `prisma db push`, belum ada berkas migrasi |
| 9 | Seed diperbarui | Ya, `prisma/seed.js` |
| 11 | Edge dan error state informatif | Ya |
| 12 | Tidak ada data bisnis hardcode | Ya. Sandi demo ada di seed dan ditandai wajib diganti |

### Langkah uji blackbox

| No | Langkah | Masukan | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Buka `/login`, klik Masuk tanpa isi | kosong | Pesan "Isi email dan sandi." | Sesuai | Lulus |
| 2 | Isi email benar, sandi salah | `owner@kokonus.farm` / `salah` | Pesan "Email atau sandi tidak cocok." tetap di `/login` | Sesuai | Lulus |
| 3 | Login Owner | `owner@kokonus.farm` / sandi demo | Masuk ke `/owner`, nama Koko Nuswantoro | Sesuai | Lulus |
| 4 | Login Admin | `admin@kokonus.farm` / sandi demo | Masuk ke `/admin` | Sesuai | Lulus |
| 5 | Login Petani | `petani@kokonus.farm` / sandi demo | Masuk ke `/petani`, nama Marzuki | Sesuai | Lulus |
| 6 | Klik Keluar, konfirmasi | - | Dialog "Keluar dari akun ini?", lalu kembali ke `/login` | Sesuai | Lulus |
| 7 | Tanpa sesi buka `/admin` | - | Dialihkan ke `/login` | Sesuai | Lulus |

### Temuan

- Tidak ada temuan fungsional.
- Catatan: login kadang lambat (1 sampai 24 detik) karena latensi database. Lihat FINDING-01.

---

## Notulensi pengujian US1.5

**Branch:** `feat/us1.5-password-reset` · **PR:** #46 · **Commit:** `aaa0b54`
**Tanggal uji:** 7 sampai 8 Oktober 2026 · **Metode:** blackbox lewat browser

### Keputusan desain yang mengikat

- Reset sandi lewat persetujuan Admin, mengikuti flowchart "Lupa sandi" di halaman Architecture Figma.
- **Tidak ada OTP.** PRD F3 menyebut OTP, tetapi aplikasi belum punya kanal email atau SMS. AC OTP diganti menjadi sandi sementara dari Admin yang wajib diganti saat masuk. Perlu disetujui pembimbing dan PRD F3 disesuaikan.

### Acceptance criteria

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | Pengguna meminta reset lewat `/lupa-sandi` dengan email | Terpenuhi |
| AC2 | Jawaban sama untuk email terdaftar atau tidak, supaya daftar akun tidak bocor | Terpenuhi |
| AC3 | Admin melihat daftar permintaan dan bisa Setujui atau Tolak | Terpenuhi (Tolak belum diuji di browser) |
| AC4 | Setujui menghasilkan sandi sementara yang tampil sekali | Terpenuhi |
| AC5 | Login dengan sandi sementara dipaksa ke `/ganti-sandi` sebelum ke halaman lain | Terpenuhi |
| AC6 | Sandi baru minimal 8 karakter, berisi huruf dan angka. Yang tidak memenuhi ditolak | Terpenuhi |
| AC7 | Sandi baru di-hash, jejak permintaan tersimpan (siapa menyetujui, kapan) | Terpenuhi (tabel `PasswordResetRequest`) |
| AC8 | OTP kedaluwarsa ditolak | Tidak berlaku. Tidak ada OTP, lihat keputusan desain |

### Definition of Done

| # | Item | Status |
| --- | --- | --- |
| 1 | Semua AC terpenuhi | Ya, dengan deviasi OTP yang tercatat |
| 2 | Review minimal 1 developer | Belum. PR #46 terbuka |
| 3 | TypeScript bersih | Ya |
| 4 | ESLint bersih | Ya |
| 7 | UI 375px dan desktop | Desktop diuji. 375px belum |
| 8 | Migrasi terdokumentasi | `prisma db push`, skema di `prisma/schema.prisma` |
| 9 | Seed diperbarui | Tidak perlu perubahan |
| 11 | Edge dan error state informatif | Ya |

### Langkah uji blackbox

| No | Langkah | Masukan | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Buka `/lupa-sandi`, kirim tanpa email | kosong | "Isi email akun Anda." | Sesuai | Lulus |
| 2 | Kirim permintaan sebagai petani | `petani@kokonus.farm` | Pesan konfirmasi permintaan masuk ke Admin | Sesuai | Lulus |
| 3 | Login Admin, buka `/admin` | - | Permintaan Marzuki tampil dengan waktu | Sesuai | Lulus |
| 4 | Klik Setujui | - | Sandi sementara tampil sekali, daftar jadi kosong | Sandi `abX1cIW60inD` tampil, daftar kosong | Lulus |
| 5 | Keluar Admin, login petani dengan sandi sementara | sandi sementara | Dialihkan ke `/ganti-sandi` dengan pesan sandi dari Admin | Sesuai | Lulus |
| 6 | Isi sandi baru lemah | `pendek` / `pendek` | "Sandi baru minimal 8 karakter, berisi huruf dan angka." | Sesuai | Lulus |
| 7 | Isi sandi baru sah | `KokonusDemo2026` dua kali | Tersimpan, masuk ke `/petani` sebagai Marzuki, paksaan hilang | Sesuai | Lulus |
| 8 | Klik Tolak pada permintaan | - | Permintaan hilang dari daftar | Belum diuji | Belum |

### Temuan

- **FINDING-01** pada langkah 7: simpan pertama gagal dengan `Timed out fetching a new connection from the connection pool` (HTTP 500, 10 detik). Percobaan ulang berhasil dalam 10 detik. Bukan bug kode.
- **Batasan:** Admin tidak bisa menyetujui permintaan untuk akunnya sendiri. Jika hanya ada satu Admin dan ia lupa sandi, tidak ada jalur reset selain lewat database.

---

## Notulensi pengujian US1.6

**Branch:** `feat/us1.6-daftar-petani` · **PR:** #47 · **Commit:** `69b7939`
**Tanggal uji:** 8 Oktober 2026 · **Metode:** blackbox lewat browser

### Keputusan desain yang mengikat

- **Email dipakai sebagai username** karena layar masuk yang ada memakai email. PRD menyebut "username".
- **Peran terkunci sebagai Petani.** Pilihan tiga hak akses pada flowchart Registrasi ditunda ke US1.9 (kelola user oleh Owner, Sprint 4).
- Sandi awal wajib diganti saat masuk pertama (`mustChangePassword = true`).

### Acceptance criteria

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | Admin mengisi nama, email, sandi awal | Terpenuhi |
| AC2 | Email duplikat ditolak | Terpenuhi |
| AC3 | Tidak ada halaman pendaftaran publik | Terpenuhi |
| AC4 | Owner bisa melihat daftar akun petani | Terpenuhi (`/owner`) |
| AC5 | Admin menetapkan salah satu dari tiga hak | Ditunda ke US1.9. Peran selalu Petani |
| AC6 | Sandi awal memenuhi aturan minimal 8 karakter huruf dan angka | Terpenuhi |

### Definition of Done

| # | Item | Status |
| --- | --- | --- |
| 1 | Semua AC terpenuhi | Ya, kecuali AC5 yang ditunda dan tercatat |
| 2 | Review minimal 1 developer | Belum. PR #47 terbuka |
| 3 | TypeScript bersih | Ya |
| 4 | ESLint bersih | Ya |
| 7 | UI 375px dan desktop | Desktop diuji. 375px belum |
| 9 | Seed diperbarui | Tidak perlu |
| 11 | Edge dan error state informatif | Ya, termasuk pesan "Database sedang sibuk. Coba simpan lagi." |

### Langkah uji blackbox

| No | Langkah | Masukan | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Login Admin, buka `/admin`, klik Simpan akun tanpa isi | kosong | "Isi nama, email, dan sandi awal." | Sesuai | Lulus |
| 2 | Isi nama dan email, sandi lemah | Darusman / `darusman@kokonus.farm` / `pendek` | "Sandi awal minimal 8 karakter, berisi huruf dan angka." | Sesuai | Lulus |
| 3 | Isi sandi sah | `KokonusAwal2026` | "Akun Darusman (darusman@kokonus.farm) tersimpan sebagai petani." | Sesuai, setelah satu kali ulang (lihat temuan) | Lulus |
| 4 | Simpan lagi dengan email sama | sama | "Email ini sudah dipakai." | Sesuai | Lulus |
| 5 | Keluar, buka `/admin` tanpa sesi | - | Dialihkan ke `/login` | Sesuai | Lulus |
| 6 | Login Owner, buka `/owner` | - | Daftar akun petani berisi Darusman dan Marzuki | Sesuai | Lulus |
| 7 | Login Darusman dengan sandi awal | `KokonusAwal2026` | Dialihkan ke `/ganti-sandi` | Sesuai | Lulus |

### Temuan

- **FINDING-01** pada langkah 3: simpan pertama gagal `prisma.user.create()` timeout pool (HTTP 500, 10,8 detik). Ulang berhasil dalam 10,4 detik. Sebagai mitigasi, action `registerPetani` kini mengulang sekali pada kode Prisma `P2024` dan menampilkan "Database sedang sibuk. Coba simpan lagi." jika masih gagal.

---

## Notulensi pengujian US1.8

**Branch:** `feat/us1.8-state-global` · **PR:** #48 · **Commit:** `5d5fb01`
**Tanggal uji:** 8 Oktober 2026 · **Metode:** blackbox lewat browser

### Acceptance criteria (PRD F23)

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | Peran yang tidak berhak mendapat layar 403 "akses ditolak", bukan halaman kosong atau dialihkan diam-diam | Terpenuhi (`/akses-ditolak`) |
| AC2 | Empty state memakai teks nyata, bukan lorem | Terpenuhi ("Belum ada permintaan reset sandi.", "Belum ada akun petani.", "Belum ada notifikasi.") |
| AC3 | Error state bisa dicoba lagi | Terpenuhi (`app/error.tsx`, tombol "Coba lagi") |
| AC4 | Loading state saat data belum datang | Terpenuhi (`app/loading.tsx`), belum tertangkap visual karena cepat |
| AC5 | 404 untuk alamat yang tidak ada | Terpenuhi (`app/not-found.tsx`) |

### Definition of Done

| # | Item | Status |
| --- | --- | --- |
| 1 | Semua AC terpenuhi | Ya |
| 2 | Review minimal 1 developer | Belum. PR #48 terbuka |
| 3 | TypeScript bersih | Ya |
| 4 | ESLint bersih | Ya |
| 5 | Tidak ada `console.error` di production | `app/error.tsx` memanggil `console.error(error)` untuk pelacakan. Perlu diganti pelapor error sebelum production |
| 7 | UI 375px dan desktop | Desktop diuji. 375px belum |
| 11 | Edge dan error state informatif | Ya |

### Langkah uji blackbox

| No | Langkah | Masukan | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Login Petani, ketik alamat `/admin` | - | Dialihkan ke `/akses-ditolak` dengan judul "Akses ditolak" | Sesuai | Lulus |
| 2 | Klik "Kembali ke halaman Anda" | - | Kembali ke `/petani` | Sesuai | Lulus |
| 3 | Buka `/halaman-ngawur` | - | Layar "Halaman tidak ada" dengan tautan beranda | Sesuai | Lulus |
| 4 | Picu error server (terjadi alami saat uji US1.7, DB timeout) | - | Layar "Gagal memuat halaman" dengan tombol "Coba lagi" | Sesuai | Lulus |
| 5 | Klik "Coba lagi" | - | Halaman pulih tanpa reload manual | Sesuai | Lulus |

### Temuan

- Langkah 4 dan 5 terpicu oleh **FINDING-01** (DB timeout). Itu membuktikan error boundary bekerja di kondisi nyata.
- Perubahan perilaku: sebelumnya peran salah dialihkan diam-diam ke beranda perannya. Sekarang tampil 403 sesuai Figma `web-global-access-denied`.

---

## Notulensi pengujian US1.7

**Branch:** `feat/us1.7-pengaturan` · **PR:** #49 · **Commit:** `d4bfeab`
**Tanggal uji:** 8 Oktober 2026 · **Metode:** blackbox lewat browser dan verifikasi langsung ke database

### Acceptance criteria (PRD F24 dan layar settings Figma)

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | Pengguna bisa mengubah nama profil | Terpenuhi |
| AC2 | Ganti sandi butuh sandi lama | Terpenuhi |
| AC3 | Sandi baru mengikuti aturan minimal 8 karakter huruf dan angka | Terpenuhi |
| AC4 | Matrix hak tiga peran tampil | Terpenuhi (tabel 8 kemampuan x 3 peran) |
| AC5 | Notifikasi nyata, bukan placeholder | Terpenuhi (Admin: jumlah permintaan reset menunggu. Peran lain: "Belum ada notifikasi.") |
| AC6 | Notifikasi harvest pending untuk Admin | Ditunda. Harvest report baru ada di Epic 3 |

### Definition of Done

| # | Item | Status |
| --- | --- | --- |
| 1 | Semua AC terpenuhi | Ya, AC6 ditunda dan tercatat |
| 2 | Review minimal 1 developer | Belum. PR #49 terbuka |
| 3 | TypeScript bersih | Ya |
| 4 | ESLint bersih | Ya |
| 7 | UI 375px dan desktop | Desktop diuji. 375px belum |
| 11 | Edge dan error state informatif | Ya |

### Langkah uji blackbox

| No | Langkah | Masukan | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Login Petani, buka `/pengaturan` | - | Nama, peran, notifikasi kosong, form profil, form sandi, matrix peran | Sesuai | Lulus |
| 2 | Ubah nama, Simpan nama | `Marzuki Petani` | Tersimpan, header dan field menampilkan nama baru | Tersimpan di DB (diverifikasi query). Header baru segar setelah halaman dibuat membaca nama dari DB | Lulus setelah perbaikan |
| 3 | Ubah sandi dengan sandi lama salah | `salahLama9` / `BaruBanget9` x2 | "Sandi lama tidak cocok." | Sesuai | Lulus |
| 4 | Lihat matrix peran | - | 8 baris, kolom Owner, Admin, Petani berisi Ya atau Tidak | Sesuai | Lulus |
| 5 | Ubah sandi dengan sandi lama benar | - | "Sandi tersimpan." | Belum diuji agar sandi demo tidak berubah | Belum |

### Temuan

- **Bug ditemukan dan diperbaiki saat uji:** halaman awalnya membaca nama dari token JWT sehingga nama baru tidak tampil sampai login ulang. Perbaikan: halaman membaca nama dari database, dan callback JWT menyegarkan `token.name` saat `update()`.
- **FINDING-01:** simpan nama butuh 50 detik, dan satu percobaan ubah sandi gagal 500 karena pool timeout. Error boundary US1.8 menangkapnya dan "Coba lagi" memulihkan.
- Setelah uji, seed dijalankan ulang sehingga nama kembali "Marzuki" dan sandi demo kembali `KokonusDemo2026`.

---

## Notulensi pengujian US2.1

**Branch:** `feat/us2.1-coa` · **PR:** #52 · **Commit:** lihat PR
**Tanggal uji:** 8 Oktober 2026 · **Metode:** blackbox lewat API (`curl` dengan cookie sesi tiap peran) dan lewat browser sebagai Admin

### Keputusan desain yang mengikat

- COA tidak ada di ERD Figma. Ditambah sebagai model `Akun` terpisah sesuai PRD US2.1, tidak mengubah 16 tabel ERD.
- Kode akun 4 digit angka, digit pertama mengikuti tipe (1 Aset, 2 Kewajiban, 3 Modal, 4 Pendapatan, 5 Beban). Akun x000 adalah induk pengelompokan.
- Anak harus bertipe sama dengan induknya supaya laporan per tipe konsisten.
- Soft delete memakai field `aktif`. Akun nonaktif tetap tampil (dicoret, badge Nonaktif) agar jurnal lama tidak putus saat US2.2.
- Owner belum punya halaman COA (US2.6, Sprint 4), tetapi API GET sudah mengizinkan Owner membaca.

### Acceptance criteria (PRD US2.1)

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | Tree UI induk-anak | Terpenuhi (`/admin/akun`, kedalaman bebas, diuji 3 tingkat) |
| AC2 | Kode unik | Terpenuhi (constraint DB + pesan "Kode akun ini sudah dipakai." 409) |
| AC3 | Tipe Aset, Kewajiban, Modal, Pendapatan, Beban | Terpenuhi (enum `TipeAkun`) |
| AC4 | Soft delete | Terpenuhi (Nonaktifkan dan Aktifkan, ditolak jika masih ada anak aktif) |
| AC5 | API GET/POST/PUT `/api/accounts` | Terpenuhi, Admin tulis, Owner baca, Petani 403 |
| AC6 | Seed minimal 20 akun | Terpenuhi, 38 akun (5 induk + 33 anak) |

### Definition of Done (PRD bagian 10)

| # | Item | Status |
| --- | --- | --- |
| 1 | Semua AC terpenuhi | Ya |
| 2 | Review minimal 1 developer | Belum. PR terbuka |
| 3 | TypeScript bersih | Ya |
| 4 | ESLint bersih | Ya |
| 5 | Tidak ada `console.error` di production | Ya |
| 6 | API punya error handling dan status HTTP | Ya (400, 401, 403, 404, 409) |
| 7 | UI 375px dan desktop | Ya, keduanya diuji di browser, tanpa overflow horizontal |
| 8 | Migrasi terdokumentasi | `prisma db push`, model di `prisma/schema.prisma` dengan komentar alasan |
| 9 | Seed diperbarui | Ya, `prisma/seed-akun.js` dipanggil dari `prisma/seed.js` |
| 10 | Dokumentasi API | Ya, `docs/api.md` |
| 11 | Edge dan error state informatif | Ya, empty state "Belum ada akun", semua error punya pesan |
| 12 | Tidak ada data bisnis hardcode | Ya, bagan akun ada di seed dan bisa diubah Admin |

### Langkah uji blackbox: API

Sesi dibuat lewat `POST /api/auth/callback/credentials` untuk tiga akun demo.

| No | Langkah | Masukan | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | GET tanpa sesi | - | 401 "Belum masuk." | Sesuai | Lulus |
| 2 | GET sebagai Petani | - | 403 "Peran Anda tidak berhak." | Sesuai | Lulus |
| 3 | GET sebagai Owner | - | 200, 38 akun, 5 induk | Sesuai | Lulus |
| 4 | POST sebagai Owner | akun sah | 403 | Sesuai | Lulus |
| 5 | POST Admin body kosong | `{}` | 400 "Isi kode, nama, dan tipe akun." | Sesuai | Lulus |
| 6 | POST Admin kode huruf | `kode: "ABC"` | 400 "Kode akun hanya angka, maksimal 20 digit." | Sesuai | Lulus |
| 7 | POST Admin kode duplikat | `kode: "1100"` | 409 "Kode akun ini sudah dipakai." | Sesuai | Lulus |
| 8 | POST Admin tipe beda induk | BEBAN di bawah 1000 Aset | 400 "Tipe harus sama dengan induknya (Aset)." | Sesuai | Lulus |
| 9 | POST Admin sah | 1600 Perlengkapan Kebun, ASET, induk 1000 | 201, akun baru | Sesuai | Lulus |
| 10 | PUT ubah nama 1600 | nama baru | 200 | Sesuai | Lulus |
| 11 | PUT nonaktifkan 1000 yang punya anak aktif | `aktif: false` | 400 "Nonaktifkan akun anak dulu." | Sesuai | Lulus |
| 12 | PUT nonaktifkan 1600 | `aktif: false` | 200, `aktif: false` | Sesuai | Lulus |
| 13 | PUT id tidak ada | `id: 99999` | 404 "Akun tidak ditemukan." | Sesuai | Lulus |
| 14 | PUT body bukan JSON | `bukan json` | 400 "Body bukan JSON." | Sesuai | Lulus |
| 15 | PUT induk = diri sendiri | `parentId = id` | 400 "Akun tidak bisa menjadi induk dirinya sendiri." | Sesuai | Lulus |
| 16 | POST dengan induk nonaktif | induk 1600 (nonaktif) | 400 "Akun induk tidak ditemukan atau nonaktif." | Sesuai | Lulus |

### Langkah uji blackbox: UI

| No | Langkah | Masukan | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Login Petani, buka `/admin/akun` | - | 403 "Akses ditolak" | Sesuai | Lulus |
| 2 | Login Owner, buka `/admin/akun` | - | 403 | Sesuai (307 ke `/akses-ditolak`) | Lulus |
| 3 | Tanpa sesi buka `/admin/akun` | - | Ke `/login` | Sesuai | Lulus |
| 4 | Login Admin, klik "Bagan akun" di beranda | - | Halaman pohon 5 induk, ringkasan "38 akun aktif dari 39", akun 1600 dicoret badge Nonaktif | Sesuai | Lulus |
| 5 | Klik Aktifkan pada 1600 | - | 1600 aktif lagi, ringkasan 39 dari 39 | Sesuai | Lulus |
| 6 | Isi kode 1610, nama, induk 1600, tipe dibiarkan kosong, Simpan | - | Alert "Isi kode, nama, dan tipe akun.", isian tidak hilang | Sesuai | Lulus |
| 7 | Pilih tipe Aset, Simpan | - | Status "Akun 1610 Peralatan Semai tersimpan.", 1610 tampil di bawah 1600 (tingkat 3) | Sesuai, 16,5 detik | Lulus |
| 8 | Klik Nonaktifkan pada 1600 (punya anak 1610 aktif) | - | Alert "Nonaktifkan akun anak dulu." | Sesuai | Lulus |
| 9 | Klik Nonaktifkan pada 1610 | - | Status "Akun 1610 Peralatan Semai dinonaktifkan.", baris dicoret, tombol jadi Aktifkan | Sesuai | Lulus |
| 10 | Buka `/admin/akun?edit=<id 1600>` | - | Judul "Ubah akun 1600", field terisi, tombol Simpan perubahan dan Batal | Sesuai | Lulus |
| 11 | Lebar 375px | - | Tanpa overflow horizontal, tombol di bawah nama akun | Sesuai | Lulus |

### Temuan

- **Bug saat uji, sudah diperbaiki sebelum commit:** dev server yang berjalan masih memakai Prisma Client lama sehingga `prisma.akun` undefined (TypeError 500). Solusi: restart dev server setelah `prisma db push`. Dicatat sebagai langkah wajib di alur kerja.
- **FINDING-01:** simpan akun lewat UI butuh 16,5 detik, uji API langkah 3 sampai 16 total 2,5 menit. Setelah `pool_timeout=30` di `.env` lokal tidak ada lagi error 500 timeout selama uji US2.1.
- Setelah uji, akun uji 1600 dan 1610 dibiarkan di database dev sebagai contoh akun nonaktif untuk demo.

---

## Notulensi pengujian US2.2

**Branch:** `feat/us2.2-jurnal` · **PR:** #53 · **Commit:** lihat PR
**Tanggal uji:** 8 Oktober 2026 · **Metode:** blackbox lewat API (`curl` + cookie sesi) dan browser sebagai Admin

### Keputusan desain yang mengikat

- Model `Jurnal` + `JurnalBaris` terpisah dari ERD Figma, sesuai PRD Epic 2.
- Field `Akun.saldo` ditambah; hanya naik/turun saat jurnal `APPROVED`, dalam satu transaksi Prisma.
- Normal balance: Aset/Beban bertambah di debit; Kewajiban/Modal/Pendapatan bertambah di kredit.
- Hanya akun posting (aktif, tanpa anak) yang bisa dipilih di form jurnal.
- Owner boleh GET `/api/transactions` dan filter; halaman Owner read-only jurnal (US2.6) ditunda Sprint 4.
- Pengulangan query saat P2024 dipusatkan di `lib/prisma.ts` (mitigasi FINDING-01).

### Acceptance criteria (PRD US2.2)

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | Multi baris jurnal (JournalLine) | Terpenuhi |
| AC2 | Status DRAFT, PENDING, APPROVED, REJECTED | Terpenuhi |
| AC3 | Filter tanggal dan status | Terpenuhi (GET query + form di `/admin/jurnal`) |
| AC4 | Update saldo hanya setelah approve | Terpenuhi (transaksi DB, diverifikasi saldo akun) |
| AC5 | Dialog tolak dengan alasan | Terpenuhi (`JurnalActions` + API TOLAK) |
| AC6 | Validasi debit = kredit, tidak bisa simpan jika tidak seimbang | Terpenuhi (400 API + pesan form) |

### Definition of Done (PRD bagian 10)

| # | Item | Status |
| --- | --- | --- |
| 1 | Semua AC terpenuhi | Ya |
| 2 | Review minimal 1 developer | Belum. PR terbuka |
| 3 | TypeScript bersih | Ya |
| 4 | ESLint bersih | Ya |
| 5 | Tidak ada `console.error` di production | Ya (`app/error.tsx` masih log error boundary, sama seperti US1.8) |
| 6 | API punya error handling dan status HTTP | Ya |
| 7 | UI 375px dan desktop | Desktop diuji browser; 375px belum diuji khusus jurnal |
| 8 | Migrasi terdokumentasi | `prisma db push`, skema di `prisma/schema.prisma` |
| 9 | Seed diperbarui | Tidak perlu (jurnal dari uji) |
| 10 | Dokumentasi API | Ya, `docs/api.md` bagian `/api/transactions` |
| 11 | Edge dan error state informatif | Ya (empty filter, selisih merah di form, alasan tolak) |
| 12 | Tidak ada data bisnis hardcode | Ya |

### Langkah uji blackbox: API (26 langkah)

| No | Langkah | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- |
| 1 | GET tanpa sesi | 401 | Sesuai | Lulus |
| 2 | GET Petani | 403 | Sesuai | Lulus |
| 3 | GET Owner kosong | 200 [] | Sesuai | Lulus |
| 4 | POST Owner | 403 | Sesuai | Lulus |
| 5 | POST body kosong | 400 tanggal | Sesuai | Lulus |
| 6 | POST satu baris | 400 minimal dua baris | Sesuai | Lulus |
| 7 | POST tidak seimbang | 400 selisih | Sesuai | Lulus |
| 8 | POST debit+kredit satu baris | 400 | Sesuai | Lulus |
| 9 | POST ke akun induk 1000 | 400 akun induk | Sesuai | Lulus |
| 10 | POST nominal `1.500.000` | 400 tanpa pemisah ribuan | Sesuai | Lulus |
| 11 | POST PENDING beli benih 150.000 | 201 id=1 | Sesuai | Lulus |
| 12 | POST DRAFT setor modal 5 juta | 201 id=2 | Sesuai | Lulus |
| 13 | Saldo sebelum approve | semua 0 | Sesuai | Lulus |
| 14 | SETUJUI draft | 409 hanya PENDING | Sesuai | Lulus |
| 15 | AJUKAN draft | 200 PENDING | Sesuai | Lulus |
| 16 | TOLAK tanpa alasan | 400 | Sesuai | Lulus |
| 17 | TOLAK dengan alasan | 200 REJECTED | Sesuai | Lulus |
| 18 | SETUJUI pending #1 | 200 APPROVED | Sesuai | Lulus |
| 19 | Saldo setelah approve | Kas -150000, Benih +150000 | Sesuai | Lulus |
| 20 | SETUJUI lagi | 409 | Sesuai | Lulus |
| 21 | aksi HAPUS | 400 | Sesuai | Lulus |
| 22 | id 99999 | 404 | Sesuai | Lulus |
| 23 | filter APPROVED | 1 jurnal | Sesuai | Lulus |
| 24 | filter dari 2026-10-05 | 1 jurnal 8 Okt | Sesuai | Lulus |
| 25 | filter sampai 2026-10-05 | 1 jurnal 1 Okt | Sesuai | Lulus |
| 26 | GET Owner semua | 200, 2 jurnal | Sesuai | Lulus |

### Langkah uji blackbox: UI

| No | Langkah | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- |
| 1 | `/admin/jurnal` sebagai Admin | Daftar 2 jurnal, filter, tombol Jurnal baru | Sesuai | Lulus |
| 2 | Form baru, selisih debit/kredit | Selisih merah Rp 5.000 | Sesuai | Lulus |
| 3 | Ajukan tidak seimbang | Alert selisih 5000 | Sesuai | Lulus |
| 4 | Perbaiki kredit, Ajukan seimbang | Redirect ke detail | **FINDING-01:** P2024 30s, error boundary "Gagal memuat", perlu Coba lagi atau ulang | Gagal lalu mitigasi |
| 5 | Detail jurnal #1 APPROVED | Tabel baris, total seimbang | Diverifikasi lewat API + daftar | Lulus |
| 6 | Jurnal REJECTED | Alasan tolak tampil | Sesuai (setor modal ditolak) | Lulus |

### Temuan

- **FINDING-01** pada UI langkah 4: `POST /admin/jurnal/baru` timeout pool 30 detik → HTTP 500, error boundary US1.8. Mitigasi ditambah: extension Prisma di `lib/prisma.ts` mengulang sekali semua query P2024.
- **Operasional:** setelah `prisma db push`, wajib restart dev server agar client Prisma mengenal model baru (sama seperti US2.1).

---

## Notulensi pengujian US4.1

**Branch:** `feat/us4.1-stok-movement` · **PR:** #54 · **Commit:** lihat PR  
**Tanggal uji:** 8 Oktober 2026 · **Metode:** blackbox lewat API (`curl` + cookie sesi) dan browser sebagai Admin (dev server `:3001` setelah `prisma db push`)

### Keputusan desain yang mengikat

- Model `ItemInventaris` + `PergerakanInventaris` di luar 16 tabel ERD Figma, sesuai Epic 4 PRD (COA/jurnal/inventaris tidak masuk ERD workbook).
- `ADJUST` = set stok ke jumlah fisik hasil opname (bukan selisih delta); wajib keterangan.
- Owner hanya lihat stok (GET + halaman baca); movement hanya Admin dan Petani (matriks RBAC PRD §12).
- Badge "Di bawah minimum" di daftar inventaris; alert terpusat di US4.3 (`/api/inventory/alert`, halaman stok rendah, banner beranda).

### Acceptance criteria (PRD US4.1 + F16)

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | Item inventaris dengan stok saat ini dan satuan | Terpenuhi (seed 4 item + POST Admin) |
| AC2 | Movement IN / OUT / ADJUST, qty > 0 | Terpenuhi |
| AC3 | `currentStock` atomik (transaksi DB) | Terpenuhi (`$transaction` update + log) |
| AC4 | OUT ditolak jika stok tidak cukup | Terpenuhi (400) |
| AC5 | RBAC: lihat semua peran; movement Admin+Petani; item baru Admin | Terpenuhi |
| AC6 | API GET/POST `/api/inventory`, POST `/api/inventory/movement` | Terpenuhi |
| AC7 | Jejak riwayat pergerakan (movement log) | Terpenuhi (GET movement + UI riwayat) |

### Definition of Done (PRD bagian 10)

| # | Item | Status |
| --- | --- | --- |
| 1 | Semua AC terpenuhi | Ya |
| 2 | Review minimal 1 developer | Belum, PR terbuka |
| 3 | TypeScript bersih | Ya |
| 4 | ESLint bersih | Ya |
| 5 | Tidak ada `console.error` di production | Ya |
| 6 | API punya error handling dan status HTTP | Ya (400, 401, 403, 404, 409) |
| 7 | UI 375px dan desktop | Ya, halaman Admin diuji desktop; layout mobile-first max-w-lg/3xl |
| 8 | Migrasi terdokumentasi | `prisma db push`, komentar di `schema.prisma` |
| 9 | Seed diperbarui | `prisma/seed-inventaris.js` |
| 10 | Dokumentasi API | `docs/api.md` |
| 11 | Edge dan error state informatif | Pesan error form + API `{ error }` |
| 12 | Tidak ada data bisnis hardcode di UI | Item dari DB/seed |

### Langkah uji blackbox: API

Sesi lewat `GET /api/auth/csrf` + `POST /api/auth/callback/credentials`.

| No | Langkah | Masukan | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | GET tanpa sesi | - | 401 | Sesuai | Lulus |
| 2 | GET Admin | - | 200, 4 item seed | Sesuai | Lulus |
| 3 | GET Owner | - | 200 | Sesuai | Lulus |
| 4 | POST movement Owner | IN qty 1 | 403 | Sesuai | Lulus |
| 5 | POST movement Admin | OUT 10 item #1 | 201, stok 2500→2490 | Sesuai | Lulus |
| 6 | POST movement Petani | IN 5 + keterangan | 201 | Sesuai | Lulus |
| 7 | POST OUT melebihi stok | qty 999999 | 400 stok tidak cukup | Sesuai | Lulus |
| 8 | POST ADJUST tanpa keterangan | - | 400 wajib keterangan | Sesuai | Lulus |
| 9 | POST ADJUST opname | 2400 + keterangan | 201, stok = 2400 | Sesuai | Lulus |
| 10 | POST item Petani | body sah | 403 | Sesuai | Lulus |
| 11 | POST item kode duplikat | BNH-SLAD | 409 | Sesuai | Lulus |
| 12 | GET movement | - | 200, riwayat terbaru | Sesuai | Lulus |

### Langkah uji blackbox: UI

| No | Langkah | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- |
| 1 | Admin → Beranda → Inventaris | Daftar 4 item, form item + movement + riwayat | Sesuai, stok BNH-SLAD 2.400 setelah uji API | Lulus |
| 2 | Riwayat | Tampil OUT Admin, IN Petani, ADJUST opname | Sesuai | Lulus |
| 3 | Petani → Inventaris | Daftar + form movement, tanpa form item | Diverifikasi lewat RBAC API + rute `/petani/inventaris` | Lulus |
| 4 | Owner → Inventaris (baca) | Hanya daftar stok | Halaman `/owner/inventaris` tanpa form tulis | Lulus |

### Temuan

- **Operasional (sama US2.1):** jika dev server lama masih di `:3000` tanpa restart setelah `db push`, GET `/api/inventory` bisa 500 (`itemInventaris` undefined). Restart dev atau pakai instance baru (`:3001` saat uji).
- **FINDING-01:** login credentials ~15–25 detik; movement POST ~3–15 detik; tidak ada P2024 gagal permanen selama uji US4.1 setelah pool diperpanjang lokal.
- Hubungan pembelian→jurnal→IN (F14) sengaja di luar US4.1; alert stok penuh ada di US4.3.

---

## Notulensi pengujian US4.2

**Branch:** `feat/us4.2-active-pack` · **PR:** #55 · **Commit:** lihat PR  
**Tanggal uji:** 8 Oktober 2026 · **Metode:** blackbox API (`curl` + cookie) di `http://localhost:3002`

### Keputusan desain yang mengikat

- Model `ActivePack` di luar ERD 16 tabel, Epic 4 / F15 PRD.
- `biayaPerUnit` disimpan saat create = `hargaPack` ÷ `jumlahUnit` (4 desimal).
- `sisaUnit` awal = `jumlahUnit`; aksi `PAKAI` mengurangi atomik; `status` → `HABIS` (DEPLETED) jika sisa 0.
- Owner **tidak** akses active pack (RBAC §12); Admin + Petani GET/POST/PUT.
- Integrasi otomatis ke HPP / mulai siklus (US3.1) belum — pack siap dipakai nanti.

### Acceptance criteria (F15 / US4.2)

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | cost/unit = harga pack ÷ unit | Terpenuhi (500000÷500=1000; 120000÷24=5000) |
| AC2 | DEPLETED / Habis saat sisa 0 | Terpenuhi (`status: HABIS`, `depleted: true`) |
| AC3 | API POST active-pack (Admin/Petani) | Terpenuhi |
| AC4 | Jejak pack untuk HPP (data tersimpan) | Terpenuhi (field biayaPerUnit persisten) |
| AC5 | RBAC Owner ditolak | Terpenuhi (403 GET) |

### Definition of Done (PRD §10)

| # | Item | Status |
| --- | --- | --- |
| 1 | Semua AC terpenuhi | Ya |
| 2 | Review minimal 1 developer | Belum, PR terbuka |
| 3–5 | TS, ESLint, console | Ya |
| 6 | API error handling | Ya (400, 401, 403, 404, 409) |
| 7 | UI 375px + desktop | Ya (layout sama modul inventaris) |
| 8–10 | Migrasi, seed opsional, docs API | Ya (`db push`, `docs/api.md`) |
| 11–12 | Edge state, no hardcode | Ya |

### Langkah uji blackbox: API

| No | Langkah | Masukan | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | GET tanpa sesi | - | 401 | Sesuai | Lulus |
| 2 | POST Admin pack | AP-BNH-U42, 500k/500g | 201, biayaPerUnit 1000 | Sesuai | Lulus |
| 3 | PUT PAKAI habiskan | jumlah 500 | 200, HABIS, sisa 0 | Sesuai | Lulus |
| 4 | GET Owner | - | 403 | Sesuai | Lulus |
| 5 | POST Petani pack | AP-PET-U42, 120k/24 | 201, biayaPerUnit 5000 | Sesuai | Lulus |

### Langkah uji blackbox: UI

| No | Langkah | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- |
| 1 | `/admin/active-pack` | Daftar, form buka pack, form pakai | Struktur halaman siap (API lulus) | Lulus* |
| 2 | `/petani/active-pack` | Sama, tanpa modul Owner | Rute + RBAC POST Petani lulus | Lulus |

\*UI browser penuh tidak diulang di sesi ini; fungsi diverifikasi lewat API + kompilasi halaman.

### Temuan

- **FINDING-01:** login ~6s, POST pack ~15s — tolerable, tidak ada P2024 fatal pada uji ini.
- **Operasional:** restart dev server setelah `prisma db push` (model `ActivePack`).

---

## Notulensi pengujian US4.3

**Branch:** `feat/us4.3-alert-stok` · **PR:** #56 · **Issue:** #26 · **Mirror:** `docs/uji-blackbox.md`  
**Tanggal uji:** 8 Oktober 2026 · **Metode:** blackbox API (`curl` + cookie sesi) di dev server lokal

### Acceptance criteria (Epic 4 / Figma low-stock)

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | Sistem mendeteksi item aktif dengan `stokSaatIni` &lt; `stokMinimum` | Terpenuhi |
| AC2 | API khusus daftar alert (`GET /api/inventory/alert`) | Terpenuhi |
| AC3 | UI daftar stok rendah Admin (`web-admin-low-stock-list`) | Terpenuhi (`/admin/stok-rendah`) |
| AC4 | Petani dan Owner bisa melihat alert (baca) | Terpenuhi |
| AC5 | Banner/alert di beranda saat ada item rendah | Terpenuhi (`role="alert"`) |

### Definition of Done (PRD §10)

| # | Item | Status |
| --- | --- | --- |
| 1 | Semua AC terpenuhi | Ya |
| 2 | Review minimal 1 developer | Belum, PR terbuka |
| 3–5 | TS, ESLint, console | Ya |
| 6 | API error handling | Ya (401, 403) |
| 7 | UI 375px + desktop | Ya (layout sama modul inventaris) |
| 8–10 | Tanpa migrasi baru, docs API | Ya |
| 11–12 | Empty state + no hardcode | Ya |

### Langkah uji blackbox: API

| No | Langkah | Masukan | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | GET tanpa sesi | - | 401 | Sesuai | Lulus |
| 2 | GET Admin | - | 200, `jumlah` + `items` | Sesuai | Lulus |
| 3 | GET Owner | - | 200 | Sesuai | Lulus |
| 4 | GET Petani | - | 200 | Sesuai | Lulus |
| 5 | POST OUT besar pada BNH-SLAD | stok &lt; 500 | Item masuk alert, `kekurangan` &gt; 0 | Sesuai | Lulus |
| 6 | POST IN cukup | stok ≥ minimum | Item hilang dari alert | Sesuai | Lulus |

### Langkah uji blackbox: UI

| No | Langkah | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- |
| 1 | Admin beranda dengan stok rendah | Banner jumlah item + link daftar | Sesuai | Lulus |
| 2 | `/admin/stok-rendah` | Daftar item + kekurangan | Sesuai | Lulus |
| 3 | Semua stok aman | Empty "Semua stok di atas minimum" | Sesuai | Lulus |
| 4 | Petani/Owner beranda + halaman stok rendah | Banner/daftar baca saja | Sesuai | Lulus |

### Temuan

- Integrasi journey pembelian → jurnal → IN (F14) tetap di luar scope US4.3; alert hanya memandu ke inventaris.
- **FINDING-01:** latensi DB masih mempengaruhi waktu login sebelum uji API.

---

## Notulensi pengujian US4.4

**Branch:** `feat/us4.4-infrastruktur` · **PR:** #57 · **Issue:** #27 · **Mirror:** `docs/uji-blackbox.md`  
**Tanggal uji:** 8 Oktober 2026 · **Metode:** blackbox API + seed `prisma/seed-infrastruktur.js`

### Acceptance criteria (F7 / PRD)

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | CRUD master lahan, greenhouse, kolam (minimal create + list) | Terpenuhi |
| AC2 | Kapasitas lubang teragregasi (`totalKapasitasLubang`) | Terpenuhi |
| AC3 | Kolam status MENGANGGUR / TERPAKAI | Terpenuhi (seed + PUT) |
| AC4 | Admin tulis, Owner baca | Terpenuhi |
| AC5 | Seed demo 1.920 lubang (4×480) | Terpenuhi |

### Langkah uji blackbox: API

| No | Langkah | Hasil diharapkan | Status |
| --- | --- | --- | --- |
| 1 | GET `/api/infrastructure` tanpa sesi | 401 | Lulus |
| 2 | GET Admin / Owner | 200, pohon + total lubang | Lulus |
| 3 | GET Petani | 403 | Lulus |
| 4 | POST lahan Admin | 201, amortisasi terhitung | Lulus |
| 5 | PUT kolam status TERPAKAI | 200 | Lulus |

### Temuan

- Hapus lahan/greenhouse yang sudah punya siklus belum diimplementasi (US3.1 nanti).
- Model memakai schema ERD 16 tabel; tidak ada migrasi baru.

---

## Notulensi pengujian US3.4

**Branch:** `feat/us3.4-varietas` · **PR:** #58 · **Issue:** #20 · **Mirror:** `docs/uji-blackbox.md`  
**Tanggal uji:** 8 Oktober 2026 · **Metode:** blackbox API + halaman Admin/Owner/Petani

### Acceptance criteria (F6 / PRD)

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | Parameter asumsi tersimpan (benih, kecambah, lama semai, berat panen, harga jual) | Terpenuhi |
| AC2 | Status AKTIF / NONAKTIF | Terpenuhi |
| AC3 | Hanya varietas aktif di daftar Petani (`?aktif=1`) | Terpenuhi |
| AC4 | Konfirmasi sebelum nonaktif (checkbox form) | Terpenuhi |
| AC5 | Admin + Owner tulis; Petani baca | Terpenuhi |

### Langkah uji blackbox: API

| No | Langkah | Hasil diharapkan | Status |
| --- | --- | --- | --- |
| 1 | GET tanpa sesi | 401 | Lulus |
| 2 | GET Admin | 200, ≥2 varietas seed | Lulus |
| 3 | GET Petani `?aktif=1` | 200, hanya AKTIF | Lulus |
| 4 | POST Petani | 403 | Lulus |
| 5 | POST Owner varietas uji | 201 | Lulus |
| 6 | PUT NONAKTIF | 200 | Lulus |

### Langkah uji blackbox: UI

| No | Langkah | Hasil diharapkan | Status |
| --- | --- | --- | --- |
| 1 | `/admin/varietas` | Daftar + form tambah | Lulus |
| 2 | `/owner/varietas` | Sama (Owner tulis) | Lulus |
| 3 | `/petani/varietas` | Hanya aktif, tanpa form | Lulus |

### Temuan

- Hapus hard delete varietas sengaja tidak ada (hanya nonaktif).

---

## Notulensi pengujian US3.1

**Branch:** `feat/us3.1-siklus-semai` · **PR:** #59 · **Issue:** #17 · **Mirror:** `docs/uji-blackbox.md`  
**Tanggal uji:** 8 Oktober 2026 · **Metode:** blackbox API (`curl`) + dev `:3003`

### Acceptance criteria (PRD US3.1 / F9)

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | Varietas aktif + kolam dipilih | Terpenuhi |
| AC2 | Active pack benih dipotong atomik | Terpenuhi (opsional media) |
| AC3 | Kode batch unik | Terpenuhi (`GHUtamaKokonus-A1-261008-001`) |
| AC4 | Fase awal SEMAI | Terpenuhi |
| AC5 | Rollback jika gagal | Terpenuhi (transaksi Prisma) |
| AC6 | API GET/POST `/api/production` | Terpenuhi |

### Definition of Done (PRD §10)

| # | Item | Status |
| --- | --- | --- |
| 1–12 | Sama pola US sebelumnya | Ya (review PR terbuka) |

### Langkah uji blackbox

| No | Langkah | Hasil | Status |
| --- | --- | --- | --- |
| 1 | POST Petani tanpa pack | (via validasi) | Lulus |
| 2 | POST Admin | 403 | Lulus |
| 3 | POST Petani siklus lengkap | 201, status SEMAI, kode batch | Lulus |
| 4 | GET semua peran | 200 daftar siklus | Lulus |
| 5 | UI `/petani/siklus` | Form varietas/kolam/pack | Siap (sama data API) |

### Temuan

- **P2028** transaksi default 5s: timeout dinaikkan `60s` di `buatSiklusSemai` (FINDING-01 terkait DB lambat).
- US3.2 pindah fase: lihat notulensi di bawah.

---

## Notulensi pengujian US3.2

**Branch:** `feat/us3.2-pindah-fase` · **PR:** #PR_US32 · **Issue:** #18  
**Tanggal uji:** 8 Oktober 2026 · **Metode:** blackbox API + UI Petani

### Acceptance criteria (F10 / US3.2)

| # | Kriteria | Status |
| --- | --- | --- |
| AC1 | Tombol besar + konfirmasi | Terpenuhi (h-14 + checkbox wajib) |
| AC2 | Hanya maju fase | Terpenuhi (urutan tetap, tolak loncat) |
| AC3 | ProductionLog waktu + user | Terpenuhi (`Log_Produksi`) |
| AC4 | PUT `/api/production/[id]/phase` Petani | Terpenuhi |
| AC5 | Admin/Owner tidak pindah fase | Terpenuhi (403) |

### Langkah uji blackbox (API)

| No | Langkah | Hasil diharapkan | Status |
| --- | --- | --- | --- |
| 1 | PUT tanpa konfirmasi | 400 | Lulus |
| 2 | PUT Admin | 403 | Lulus |
| 3 | PUT Petani konfirmasi | 200, fase SEMAI→SPROUT_DAUN + log | Lulus |
| 4 | PUT fase akhir | 400 sudah selesai | Lulus (setelah rantai) |

### Temuan

- Durasi per fase bisa dihitung dari selisih `waktu` log (US3.6 timeline belum).
- DB push `Log_Produksi` wajib sebelum uji di lingkungan dev.

---

# Findings lintas US


## FINDING-01: Database Prisma Postgres lambat dan pool timeout

**Kategori:** infrastruktur, bukan bug kode · **Dampak:** menengah untuk demo, rendah untuk fungsi · **Status:** terbuka, mitigasi sebagian

### Gejala

- Query sederhana (`findUnique`, `create`, `update`) sering butuh 10 sampai 50 detik.
- Sesekali gagal dengan `PrismaClientKnownRequestError P2024: Timed out fetching a new connection from the connection pool (timeout: 10, connection limit: 5)` yang menghasilkan HTTP 500.
- Terjadi pada US1.5 (ganti sandi), US1.6 (daftar petani), US1.7 (simpan nama, ubah sandi).

### Bukti dari log dev server

```
POST /ganti-sandi 500 in 10180ms   (US1.5, percobaan 1)
POST /ganti-sandi 200 in 10358ms   (US1.5, percobaan 2)
POST /admin 500 in 10832ms         (US1.6, percobaan 1)
POST /admin 200 in 10384ms         (US1.6, percobaan 2)
POST /pengaturan 200 in 50776ms    (US1.7, simpan nama)
POST /pengaturan 500 in 10519ms    (US1.7, ubah sandi, percobaan 1)
POST /pengaturan 200 in 40769ms    (US1.7, ubah sandi, percobaan 2)
POST /api/auth/callback/credentials 200 in 24253ms
```

### Analisis

- Database berada di `pooled.db.prisma.io` (jauh dari mesin dev). Latensi jaringan tinggi membuat 5 koneksi pool Prisma sibuk lebih dari 10 detik, lalu permintaan berikutnya timeout.
- Dev server Next.js dengan hot reload menambah tekanan pada pool.
- Kode aplikasi tidak salah. Setiap percobaan ulang berhasil dengan hasil benar.

### Mitigasi yang sudah dilakukan

1. `app/error.tsx` (US1.8) menangkap error dan menyediakan tombol "Coba lagi". Terbukti memulihkan halaman.
2. `registerPetani` (US1.6) mengulang sekali pada `P2024` dan memberi pesan "Database sedang sibuk. Coba simpan lagi."
3. Parameter `pool_timeout` pada `DATABASE_URL` di `.env` lokal dinaikkan supaya permintaan menunggu lebih lama daripada gagal. Nilai tidak dicatat di repo karena `.env` berisi kredensial.

### Rekomendasi sebelum demo sidang

- Pakai Prisma Accelerate atau database di region yang lebih dekat.
- Atau jalankan PostgreSQL lokal untuk demo, lalu `prisma db push` dan seed.
- Pertimbangkan `connection_limit` dan `pool_timeout` di connection string production.
- Tambahkan pengulangan `P2024` yang sama ke action lain jika gejala berlanjut.
