# Tabel blackbox testing Kokonus Farm

Semua langkah uji blackbox dalam satu register. AC, DoD, dan temuan per story ada di [`uji-blackbox.md`](./uji-blackbox.md).

Kolom Status mengacu catatan uji terakhir (kebanyakan Oktober 2026). Baris Checklist berasal dari backlog 2026-10-09; jalankan ulang sebelum sidang bila perlu.

Akun demo: `owner@kokonus.farm`, `admin@kokonus.farm`, `petani@kokonus.farm` (sandi di `prisma/seed.js`).

## Ringkasan per ID uji

| ID uji | Sprint | Langkah | Lulus | Gagal | Belum | Checklist |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| US1.4 | 1 | 7 | 7 | 0 | 0 | 0 |
| US1.5 | 1 | 8 | 7 | 0 | 1 | 0 |
| US1.6 | 1 | 7 | 7 | 0 | 0 | 0 |
| US1.7 | 1 | 5 | 4 | 0 | 1 | 0 |
| US1.8 | 1 | 5 | 5 | 0 | 0 | 0 |
| US2.1 | 2 | 27 | 27 | 0 | 0 | 0 |
| US2.2 | 2 | 32 | 31 | 1 | 0 | 0 |
| US2.3 | 2 | 4 | 0 | 0 | 0 | 4 |
| US2.4 | 2 | 3 | 0 | 0 | 0 | 3 |
| US2.5 | 2 | 3 | 0 | 0 | 0 | 3 |
| US3.1 | 2 | 5 | 5 | 0 | 0 | 0 |
| US3.2 | 2 | 4 | 4 | 0 | 0 | 0 |
| US3.4 | 2 | 9 | 9 | 0 | 0 | 0 |
| US3.5 | 2 | 3 | 0 | 0 | 0 | 3 |
| US3.6 | 2 | 3 | 0 | 0 | 0 | 3 |
| US3.7 | 2 | 2 | 0 | 0 | 0 | 2 |
| US4.1 | 2 | 16 | 16 | 0 | 0 | 0 |
| US4.2 | 2 | 7 | 7 | 0 | 0 | 0 |
| US4.3 | 2 | 10 | 10 | 0 | 0 | 0 |
| US4.4 | 2 | 5 | 5 | 0 | 0 | 0 |
| US4.5 | 2 | 3 | 0 | 0 | 0 | 3 |
| US5.1 | 3 | 3 | 0 | 0 | 0 | 3 |
| US5.3 | 3 | 2 | 0 | 0 | 0 | 2 |
| US5.4 | 3 | 2 | 0 | 0 | 0 | 2 |
| US5.5 | 3 | 3 | 0 | 0 | 0 | 3 |
| US1.9 | 4 | 4 | 0 | 0 | 0 | 4 |
| US2.6 | 4 | 5 | 0 | 0 | 0 | 5 |
| US6.1 | 4 | 2 | 0 | 0 | 0 | 2 |
| US6.2 | 4 | 3 | 0 | 0 | 0 | 3 |
| US6.3 | 4 | 4 | 0 | 0 | 0 | 4 |
| US6.4 | 4 | 3 | 0 | 0 | 0 | 3 |
| US6.5 | 4 | 5 | 0 | 0 | 0 | 5 |
| T5.1 | 5 | 1 | 1 | 0 | 0 | 0 |
| T5.2 | 5 | 1 | 1 | 0 | 0 | 0 |
| T5.3 | 5 | 1 | 1 | 0 | 0 | 0 |
| T5.4 | 5 | 1 | 1 | 0 | 0 | 0 |
| v2-A.1 | v2 | 5 | 0 | 0 | 0 | 5 |
| v2-B.1 | v2 | 6 | 0 | 0 | 0 | 6 |
| v2-C.1 | v2 | 4 | 0 | 0 | 0 | 4 |
| v2-D.1 | v2 | 3 | 0 | 0 | 0 | 3 |
| v2-E.2 | v2 | 3 | 0 | 0 | 0 | 3 |
| v2-H | v2 | 2 | 0 | 0 | 0 | 2 |

## Tabel master langkah uji

| BB-ID | ID uji | Sprint | Lapisan | Peran | Langkah | Masukan | Hasil diharapkan | Hasil aktual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BB-001 | US1.4 | 1 | UI+API | - | Buka `/login`, klik Masuk tanpa isi | kosong | Pesan "Isi email dan sandi." | Sesuai | Lulus |
| BB-002 | US1.4 | 1 | UI+API | - | Isi email benar, sandi salah | `owner@kokonus.farm` / `salah` | Pesan "Email atau sandi tidak cocok." tetap di `/login` | Sesuai | Lulus |
| BB-003 | US1.4 | 1 | UI+API | - | Login Owner | `owner@kokonus.farm` / sandi demo | Masuk ke `/owner`, nama Koko Nuswantoro | Sesuai | Lulus |
| BB-004 | US1.4 | 1 | UI+API | - | Login Admin | `admin@kokonus.farm` / sandi demo | Masuk ke `/admin` | Sesuai | Lulus |
| BB-005 | US1.4 | 1 | UI+API | - | Login Petani | `petani@kokonus.farm` / sandi demo | Masuk ke `/petani`, nama Marzuki | Sesuai | Lulus |
| BB-006 | US1.4 | 1 | UI+API | - | Klik Keluar, konfirmasi | - | Dialog "Keluar dari akun ini?", lalu kembali ke `/login` | Sesuai | Lulus |
| BB-007 | US1.4 | 1 | UI+API | - | Tanpa sesi buka `/admin` | - | Dialihkan ke `/login` | Sesuai | Lulus |
| BB-008 | US1.5 | 1 | UI+API | - | Buka `/lupa-sandi`, kirim tanpa email | kosong | "Isi email akun Anda." | Sesuai | Lulus |
| BB-009 | US1.5 | 1 | UI+API | - | Kirim permintaan sebagai petani | `petani@kokonus.farm` | Pesan konfirmasi permintaan masuk ke Admin | Sesuai | Lulus |
| BB-010 | US1.5 | 1 | UI+API | - | Login Admin, buka `/admin` | - | Permintaan Marzuki tampil dengan waktu | Sesuai | Lulus |
| BB-011 | US1.5 | 1 | UI+API | - | Klik Setujui | - | Sandi sementara tampil sekali, daftar jadi kosong | Sandi `abX1cIW60inD` tampil, daftar kosong | Lulus |
| BB-012 | US1.5 | 1 | UI+API | - | Keluar Admin, login petani dengan sandi sementara | sandi sementara | Dialihkan ke `/ganti-sandi` dengan pesan sandi dari Admin | Sesuai | Lulus |
| BB-013 | US1.5 | 1 | UI+API | - | Isi sandi baru lemah | `pendek` / `pendek` | "Sandi baru minimal 8 karakter, berisi huruf dan angka." | Sesuai | Lulus |
| BB-014 | US1.5 | 1 | UI+API | - | Isi sandi baru sah | `KokonusDemo2026` dua kali | Tersimpan, masuk ke `/petani` sebagai Marzuki, paksaan hilang | Sesuai | Lulus |
| BB-015 | US1.5 | 1 | UI+API | - | Klik Tolak pada permintaan | - | Permintaan hilang dari daftar | Belum diuji | Belum |
| BB-016 | US1.6 | 1 | UI+API | - | Login Admin, buka `/admin`, klik Simpan akun tanpa isi | kosong | "Isi nama, email, dan sandi awal." | Sesuai | Lulus |
| BB-017 | US1.6 | 1 | UI+API | - | Isi nama dan email, sandi lemah | Darusman / `darusman@kokonus.farm` / `pendek` | "Sandi awal minimal 8 karakter, berisi huruf dan angka." | Sesuai | Lulus |
| BB-018 | US1.6 | 1 | UI+API | - | Isi sandi sah | `KokonusAwal2026` | "Akun Darusman (darusman@kokonus.farm) tersimpan sebagai petani." | Sesuai, setelah satu kali ulang (lihat temuan) | Lulus |
| BB-019 | US1.6 | 1 | UI+API | - | Simpan lagi dengan email sama | sama | "Email ini sudah dipakai." | Sesuai | Lulus |
| BB-020 | US1.6 | 1 | UI+API | - | Keluar, buka `/admin` tanpa sesi | - | Dialihkan ke `/login` | Sesuai | Lulus |
| BB-021 | US1.6 | 1 | UI+API | - | Login Owner, buka `/owner` | - | Daftar akun petani berisi Darusman dan Marzuki | Sesuai | Lulus |
| BB-022 | US1.6 | 1 | UI+API | - | Login Darusman dengan sandi awal | `KokonusAwal2026` | Dialihkan ke `/ganti-sandi` | Sesuai | Lulus |
| BB-023 | US1.8 | 1 | UI+API | - | Login Petani, ketik alamat `/admin` | - | Dialihkan ke `/akses-ditolak` dengan judul "Akses ditolak" | Sesuai | Lulus |
| BB-024 | US1.8 | 1 | UI+API | - | Klik "Kembali ke halaman Anda" | - | Kembali ke `/petani` | Sesuai | Lulus |
| BB-025 | US1.8 | 1 | UI+API | - | Buka `/halaman-ngawur` | - | Layar "Halaman tidak ada" dengan tautan beranda | Sesuai | Lulus |
| BB-026 | US1.8 | 1 | UI+API | - | Picu error server (terjadi alami saat uji US1.7, DB timeout) | - | Layar "Gagal memuat halaman" dengan tombol "Coba lagi" | Sesuai | Lulus |
| BB-027 | US1.8 | 1 | UI+API | - | Klik "Coba lagi" | - | Halaman pulih tanpa reload manual | Sesuai | Lulus |
| BB-028 | US1.7 | 1 | UI+API | - | Login Petani, buka `/pengaturan` | - | Nama, peran, notifikasi kosong, form profil, form sandi, matrix peran | Sesuai | Lulus |
| BB-029 | US1.7 | 1 | UI+API | - | Ubah nama, Simpan nama | `Marzuki Petani` | Tersimpan, header dan field menampilkan nama baru | Tersimpan di DB (diverifikasi query). Header baru segar setelah halaman dibuat membaca nama dari DB | Lulus setelah perbaikan |
| BB-030 | US1.7 | 1 | UI+API | - | Ubah sandi dengan sandi lama salah | `salahLama9` / `BaruBanget9` x2 | "Sandi lama tidak cocok." | Sesuai | Lulus |
| BB-031 | US1.7 | 1 | UI+API | - | Lihat matrix peran | - | 8 baris, kolom Owner, Admin, Petani berisi Ya atau Tidak | Sesuai | Lulus |
| BB-032 | US1.7 | 1 | UI+API | - | Ubah sandi dengan sandi lama benar | - | "Sandi tersimpan." | Belum diuji agar sandi demo tidak berubah | Belum |
| BB-033 | US2.1 | 2 | API | - | GET tanpa sesi | - | 401 "Belum masuk." | Sesuai | Lulus |
| BB-034 | US2.1 | 2 | API | - | GET sebagai Petani | - | 403 "Peran Anda tidak berhak." | Sesuai | Lulus |
| BB-035 | US2.1 | 2 | API | - | GET sebagai Owner | - | 200, 38 akun, 5 induk | Sesuai | Lulus |
| BB-036 | US2.1 | 2 | API | - | POST sebagai Owner | akun sah | 403 | Sesuai | Lulus |
| BB-037 | US2.1 | 2 | API | - | POST Admin body kosong | `{}` | 400 "Isi kode, nama, dan tipe akun." | Sesuai | Lulus |
| BB-038 | US2.1 | 2 | API | - | POST Admin kode huruf | `kode: "ABC"` | 400 "Kode akun hanya angka, maksimal 20 digit." | Sesuai | Lulus |
| BB-039 | US2.1 | 2 | API | - | POST Admin kode duplikat | `kode: "1100"` | 409 "Kode akun ini sudah dipakai." | Sesuai | Lulus |
| BB-040 | US2.1 | 2 | API | - | POST Admin tipe beda induk | BEBAN di bawah 1000 Aset | 400 "Tipe harus sama dengan induknya (Aset)." | Sesuai | Lulus |
| BB-041 | US2.1 | 2 | API | - | POST Admin sah | 1600 Perlengkapan Kebun, ASET, induk 1000 | 201, akun baru | Sesuai | Lulus |
| BB-042 | US2.1 | 2 | API | - | PUT ubah nama 1600 | nama baru | 200 | Sesuai | Lulus |
| BB-043 | US2.1 | 2 | API | - | PUT nonaktifkan 1000 yang punya anak aktif | `aktif: false` | 400 "Nonaktifkan akun anak dulu." | Sesuai | Lulus |
| BB-044 | US2.1 | 2 | API | - | PUT nonaktifkan 1600 | `aktif: false` | 200, `aktif: false` | Sesuai | Lulus |
| BB-045 | US2.1 | 2 | API | - | PUT id tidak ada | `id: 99999` | 404 "Akun tidak ditemukan." | Sesuai | Lulus |
| BB-046 | US2.1 | 2 | API | - | PUT body bukan JSON | `bukan json` | 400 "Body bukan JSON." | Sesuai | Lulus |
| BB-047 | US2.1 | 2 | API | - | PUT induk = diri sendiri | `parentId = id` | 400 "Akun tidak bisa menjadi induk dirinya sendiri." | Sesuai | Lulus |
| BB-048 | US2.1 | 2 | API | - | POST dengan induk nonaktif | induk 1600 (nonaktif) | 400 "Akun induk tidak ditemukan atau nonaktif." | Sesuai | Lulus |
| BB-049 | US2.1 | 2 | UI | - | Login Petani, buka `/admin/akun` | - | 403 "Akses ditolak" | Sesuai | Lulus |
| BB-050 | US2.1 | 2 | UI | - | Login Owner, buka `/admin/akun` | - | 403 | Sesuai (307 ke `/akses-ditolak`) | Lulus |
| BB-051 | US2.1 | 2 | UI | - | Tanpa sesi buka `/admin/akun` | - | Ke `/login` | Sesuai | Lulus |
| BB-052 | US2.1 | 2 | UI | - | Login Admin, klik "Bagan akun" di beranda | - | Halaman pohon 5 induk, ringkasan "38 akun aktif dari 39", akun 1600 dicoret badge Nonaktif | Sesuai | Lulus |
| BB-053 | US2.1 | 2 | UI | - | Klik Aktifkan pada 1600 | - | 1600 aktif lagi, ringkasan 39 dari 39 | Sesuai | Lulus |
| BB-054 | US2.1 | 2 | UI | - | Isi kode 1610, nama, induk 1600, tipe dibiarkan kosong, Simpan | - | Alert "Isi kode, nama, dan tipe akun.", isian tidak hilang | Sesuai | Lulus |
| BB-055 | US2.1 | 2 | UI | - | Pilih tipe Aset, Simpan | - | Status "Akun 1610 Peralatan Semai tersimpan.", 1610 tampil di bawah 1600 (tingkat 3) | Sesuai, 16,5 detik | Lulus |
| BB-056 | US2.1 | 2 | UI | - | Klik Nonaktifkan pada 1600 (punya anak 1610 aktif) | - | Alert "Nonaktifkan akun anak dulu." | Sesuai | Lulus |
| BB-057 | US2.1 | 2 | UI | - | Klik Nonaktifkan pada 1610 | - | Status "Akun 1610 Peralatan Semai dinonaktifkan.", baris dicoret, tombol jadi Aktifkan | Sesuai | Lulus |
| BB-058 | US2.1 | 2 | UI | - | Buka `/admin/akun?edit=<id 1600>` | - | Judul "Ubah akun 1600", field terisi, tombol Simpan perubahan dan Batal | Sesuai | Lulus |
| BB-059 | US2.1 | 2 | UI | - | Lebar 375px | - | Tanpa overflow horizontal, tombol di bawah nama akun | Sesuai | Lulus |
| BB-060 | US2.2 | 2 | API | - | GET tanpa sesi | 401 | Sesuai | Lulus | Lulus |
| BB-061 | US2.2 | 2 | API | - | GET Petani | 403 | Sesuai | Lulus | Lulus |
| BB-062 | US2.2 | 2 | API | - | GET Owner kosong | 200 [] | Sesuai | Lulus | Lulus |
| BB-063 | US2.2 | 2 | API | - | POST Owner | 403 | Sesuai | Lulus | Lulus |
| BB-064 | US2.2 | 2 | API | - | POST body kosong | 400 tanggal | Sesuai | Lulus | Lulus |
| BB-065 | US2.2 | 2 | API | - | POST satu baris | 400 minimal dua baris | Sesuai | Lulus | Lulus |
| BB-066 | US2.2 | 2 | API | - | POST tidak seimbang | 400 selisih | Sesuai | Lulus | Lulus |
| BB-067 | US2.2 | 2 | API | - | POST debit+kredit satu baris | 400 | Sesuai | Lulus | Lulus |
| BB-068 | US2.2 | 2 | API | - | POST ke akun induk 1000 | 400 akun induk | Sesuai | Lulus | Lulus |
| BB-069 | US2.2 | 2 | API | - | POST nominal `1.500.000` | 400 tanpa pemisah ribuan | Sesuai | Lulus | Lulus |
| BB-070 | US2.2 | 2 | API | - | POST PENDING beli benih 150.000 | 201 id=1 | Sesuai | Lulus | Lulus |
| BB-071 | US2.2 | 2 | API | - | POST DRAFT setor modal 5 juta | 201 id=2 | Sesuai | Lulus | Lulus |
| BB-072 | US2.2 | 2 | API | - | Saldo sebelum approve | semua 0 | Sesuai | Lulus | Lulus |
| BB-073 | US2.2 | 2 | API | - | SETUJUI draft | 409 hanya PENDING | Sesuai | Lulus | Lulus |
| BB-074 | US2.2 | 2 | API | - | AJUKAN draft | 200 PENDING | Sesuai | Lulus | Lulus |
| BB-075 | US2.2 | 2 | API | - | TOLAK tanpa alasan | 400 | Sesuai | Lulus | Lulus |
| BB-076 | US2.2 | 2 | API | - | TOLAK dengan alasan | 200 REJECTED | Sesuai | Lulus | Lulus |
| BB-077 | US2.2 | 2 | API | - | SETUJUI pending #1 | 200 APPROVED | Sesuai | Lulus | Lulus |
| BB-078 | US2.2 | 2 | API | - | Saldo setelah approve | Kas -150000, Benih +150000 | Sesuai | Lulus | Lulus |
| BB-079 | US2.2 | 2 | API | - | SETUJUI lagi | 409 | Sesuai | Lulus | Lulus |
| BB-080 | US2.2 | 2 | API | - | aksi HAPUS | 400 | Sesuai | Lulus | Lulus |
| BB-081 | US2.2 | 2 | API | - | id 99999 | 404 | Sesuai | Lulus | Lulus |
| BB-082 | US2.2 | 2 | API | - | filter APPROVED | 1 jurnal | Sesuai | Lulus | Lulus |
| BB-083 | US2.2 | 2 | API | - | filter dari 2026-10-05 | 1 jurnal 8 Okt | Sesuai | Lulus | Lulus |
| BB-084 | US2.2 | 2 | API | - | filter sampai 2026-10-05 | 1 jurnal 1 Okt | Sesuai | Lulus | Lulus |
| BB-085 | US2.2 | 2 | API | - | GET Owner semua | 200, 2 jurnal | Sesuai | Lulus | Lulus |
| BB-086 | US2.2 | 2 | UI | - | `/admin/jurnal` sebagai Admin | Daftar 2 jurnal, filter, tombol Jurnal baru | Sesuai | Lulus | Lulus |
| BB-087 | US2.2 | 2 | UI | - | Form baru, selisih debit/kredit | Selisih merah Rp 5.000 | Sesuai | Lulus | Lulus |
| BB-088 | US2.2 | 2 | UI | - | Ajukan tidak seimbang | Alert selisih 5000 | Sesuai | Lulus | Lulus |
| BB-089 | US2.2 | 2 | UI | - | Perbaiki kredit, Ajukan seimbang | Redirect ke detail | **FINDING-01:** P2024 30s, error boundary "Gagal memuat", perlu Coba lagi atau ulang | Gagal lalu mitigasi | Gagal lalu mitigasi |
| BB-090 | US2.2 | 2 | UI | - | Detail jurnal #1 APPROVED | Tabel baris, total seimbang | Diverifikasi lewat API + daftar | Lulus | Lulus |
| BB-091 | US2.2 | 2 | UI | - | Jurnal REJECTED | Alasan tolak tampil | Sesuai (setor modal ditolak) | Lulus | Lulus |
| BB-092 | US4.1 | 2 | API | - | GET tanpa sesi | - | 401 | Sesuai | Lulus |
| BB-093 | US4.1 | 2 | API | - | GET Admin | - | 200, 4 item seed | Sesuai | Lulus |
| BB-094 | US4.1 | 2 | API | - | GET Owner | - | 200 | Sesuai | Lulus |
| BB-095 | US4.1 | 2 | API | - | POST movement Owner | IN qty 1 | 403 | Sesuai | Lulus |
| BB-096 | US4.1 | 2 | API | - | POST movement Admin | OUT 10 item #1 | 201, stok 2500→2490 | Sesuai | Lulus |
| BB-097 | US4.1 | 2 | API | - | POST movement Petani | IN 5 + keterangan | 201 | Sesuai | Lulus |
| BB-098 | US4.1 | 2 | API | - | POST OUT melebihi stok | qty 999999 | 400 stok tidak cukup | Sesuai | Lulus |
| BB-099 | US4.1 | 2 | API | - | POST ADJUST tanpa keterangan | - | 400 wajib keterangan | Sesuai | Lulus |
| BB-100 | US4.1 | 2 | API | - | POST ADJUST opname | 2400 + keterangan | 201, stok = 2400 | Sesuai | Lulus |
| BB-101 | US4.1 | 2 | API | - | POST item Petani | body sah | 403 | Sesuai | Lulus |
| BB-102 | US4.1 | 2 | API | - | POST item kode duplikat | BNH-SLAD | 409 | Sesuai | Lulus |
| BB-103 | US4.1 | 2 | API | - | GET movement | - | 200, riwayat terbaru | Sesuai | Lulus |
| BB-104 | US4.1 | 2 | UI | - | Admin → Beranda → Inventaris | Daftar 4 item, form item + movement + riwayat | Sesuai, stok BNH-SLAD 2.400 setelah uji API | Lulus | Lulus |
| BB-105 | US4.1 | 2 | UI | - | Riwayat | Tampil OUT Admin, IN Petani, ADJUST opname | Sesuai | Lulus | Lulus |
| BB-106 | US4.1 | 2 | UI | - | Petani → Inventaris | Daftar + form movement, tanpa form item | Diverifikasi lewat RBAC API + rute `/petani/inventaris` | Lulus | Lulus |
| BB-107 | US4.1 | 2 | UI | - | Owner → Inventaris (baca) | Hanya daftar stok | Halaman `/owner/inventaris` tanpa form tulis | Lulus | Lulus |
| BB-108 | US4.2 | 2 | API | - | GET tanpa sesi | - | 401 | Sesuai | Lulus |
| BB-109 | US4.2 | 2 | API | - | POST Admin pack | AP-BNH-U42, 500k/500g | 201, biayaPerUnit 1000 | Sesuai | Lulus |
| BB-110 | US4.2 | 2 | API | - | PUT PAKAI habiskan | jumlah 500 | 200, HABIS, sisa 0 | Sesuai | Lulus |
| BB-111 | US4.2 | 2 | API | - | GET Owner | - | 403 | Sesuai | Lulus |
| BB-112 | US4.2 | 2 | API | - | POST Petani pack | AP-PET-U42, 120k/24 | 201, biayaPerUnit 5000 | Sesuai | Lulus |
| BB-113 | US4.2 | 2 | UI | - | `/admin/active-pack` | Daftar, form buka pack, form pakai | Struktur halaman siap (API lulus) | Lulus* | Lulus* |
| BB-114 | US4.2 | 2 | UI | - | `/petani/active-pack` | Sama, tanpa modul Owner | Rute + RBAC POST Petani lulus | Lulus | Lulus |
| BB-115 | US4.3 | 2 | API | - | GET tanpa sesi | - | 401 | Sesuai | Lulus |
| BB-116 | US4.3 | 2 | API | - | GET Admin | - | 200, `jumlah` + `items` | Sesuai | Lulus |
| BB-117 | US4.3 | 2 | API | - | GET Owner | - | 200 | Sesuai | Lulus |
| BB-118 | US4.3 | 2 | API | - | GET Petani | - | 200 | Sesuai | Lulus |
| BB-119 | US4.3 | 2 | API | - | POST OUT besar pada BNH-SLAD | stok &lt; 500 | Item masuk alert, `kekurangan` &gt; 0 | Sesuai | Lulus |
| BB-120 | US4.3 | 2 | API | - | POST IN cukup | stok ≥ minimum | Item hilang dari alert | Sesuai | Lulus |
| BB-121 | US4.3 | 2 | UI | - | Admin beranda dengan stok rendah | Banner jumlah item + link daftar | Sesuai | Lulus | Lulus |
| BB-122 | US4.3 | 2 | UI | - | `/admin/stok-rendah` | Daftar item + kekurangan | Sesuai | Lulus | Lulus |
| BB-123 | US4.3 | 2 | UI | - | Semua stok aman | Empty "Semua stok di atas minimum" | Sesuai | Lulus | Lulus |
| BB-124 | US4.3 | 2 | UI | - | Petani/Owner beranda + halaman stok rendah | Banner/daftar baca saja | Sesuai | Lulus | Lulus |
| BB-125 | US4.4 | 2 | API | - | GET `/api/infrastructure` tanpa sesi | - | 401 | Lulus | Lulus |
| BB-126 | US4.4 | 2 | API | - | GET Admin / Owner | - | 200, pohon + total lubang | Lulus | Lulus |
| BB-127 | US4.4 | 2 | API | - | GET Petani | - | 403 | Lulus | Lulus |
| BB-128 | US4.4 | 2 | API | - | POST lahan Admin | - | 201, amortisasi terhitung | Lulus | Lulus |
| BB-129 | US4.4 | 2 | API | - | PUT kolam status TERPAKAI | - | 200 | Lulus | Lulus |
| BB-130 | US3.4 | 2 | API | - | GET tanpa sesi | - | 401 | Lulus | Lulus |
| BB-131 | US3.4 | 2 | API | - | GET Admin | - | 200, ≥2 varietas seed | Lulus | Lulus |
| BB-132 | US3.4 | 2 | API | - | GET Petani `?aktif=1` | - | 200, hanya AKTIF | Lulus | Lulus |
| BB-133 | US3.4 | 2 | API | - | POST Petani | - | 403 | Lulus | Lulus |
| BB-134 | US3.4 | 2 | API | - | POST Owner varietas uji | - | 201 | Lulus | Lulus |
| BB-135 | US3.4 | 2 | API | - | PUT NONAKTIF | - | 200 | Lulus | Lulus |
| BB-136 | US3.4 | 2 | UI | - | `/admin/varietas` | - | Daftar + form tambah | Lulus | Lulus |
| BB-137 | US3.4 | 2 | UI | - | `/owner/varietas` | - | Sama (Owner tulis) | Lulus | Lulus |
| BB-138 | US3.4 | 2 | UI | - | `/petani/varietas` | - | Hanya aktif, tanpa form | Lulus | Lulus |
| BB-139 | US3.1 | 2 | UI+API | - | POST Petani tanpa pack | - | (via validasi) | Lulus | Lulus |
| BB-140 | US3.1 | 2 | UI+API | - | POST Admin | - | 403 | Lulus | Lulus |
| BB-141 | US3.1 | 2 | UI+API | - | POST Petani siklus lengkap | - | 201, status SEMAI, kode batch | Lulus | Lulus |
| BB-142 | US3.1 | 2 | UI+API | - | GET semua peran | - | 200 daftar siklus | Lulus | Lulus |
| BB-143 | US3.1 | 2 | UI+API | - | UI `/petani/siklus` | - | Form varietas/kolam/pack | Siap (sama data API) | Siap (sama data API) |
| BB-144 | US3.2 | 2 | UI+API | - | PUT tanpa konfirmasi | - | 400 | Lulus | Lulus |
| BB-145 | US3.2 | 2 | UI+API | - | PUT Admin | - | 403 | Lulus | Lulus |
| BB-146 | US3.2 | 2 | UI+API | - | PUT Petani konfirmasi | - | 200, fase SEMAI→SPROUT_DAUN + log | Lulus | Lulus |
| BB-147 | US3.2 | 2 | UI+API | - | PUT fase akhir | - | 400 sudah selesai | Lulus (setelah rantai) | Lulus (setelah rantai) |
| BB-148 | US4.5 | 2 | UI | Admin | Buka `/admin/petani` | - | Daftar seed 4 petani PRD | — | Checklist |
| BB-149 | US4.5 | 2 | UI | Admin | Form tambah petani | - | Baris baru di tabel | — | Checklist |
| BB-150 | US4.5 | 2 | UI | Owner | Buka `/owner/petani` | - | Sama, tanpa form tulis | — | Checklist |
| BB-151 | US2.4 | 2 | UI | Admin | Pilih batch di `/admin/biaya` | - | Simpan nutrisi/listrik | — | Checklist |
| BB-152 | US2.4 | 2 | UI | Admin | Post overhead periode | - | Muncul di daftar overhead | — | Checklist |
| BB-153 | US2.4 | 2 | UI | Admin | Approve panen batch tersebut | - | HPP `overhead_teralokasi` > 0 jika overhead ada | — | Checklist |
| BB-154 | US3.5 | 2 | UI | Petani | Buka `/petani/siklus/[id]` batch aktif | - | Form **Catat kegagalan** tampil | — | Checklist |
| BB-155 | US3.5 | 2 | UI | Petani | Isi tahap, jumlah gagal, penyebab | - | Log muncul di daftar; `total_susut` batch naik | — | Checklist |
| BB-156 | US3.5 | 2 | UI | Petani | Melebihi jumlah disemai | - | Pesan error validasi | — | Checklist |
| BB-157 | US3.6 | 2 | UI | Petani | Detail siklus | - | **Timeline produksi** menampilkan fase | — | Checklist |
| BB-158 | US3.6 | 2 | UI | Petani | Monitor pertumbuhan | - | Log dengan prefix `Monitor:` di log fase | — | Checklist |
| BB-159 | US3.6 | 2 | UI | Petani | Tambal susulan + active pack | - | Log `Tambal:`; susut batch turun; pack berkurang | — | Checklist |
| BB-160 | US3.7 | 2 | UI | Petani | Buka `/petani` | - | Daftar **Tugas hari ini** + **Histori aktivitas** | — | Checklist |
| BB-161 | US3.7 | 2 | UI | Petani | Klik tugas batch | - | Navigasi ke `/petani/siklus/[id]` | — | Checklist |
| BB-162 | US2.3 | 2 | UI | Admin | Review `/admin/harvest/[id]` PENDING | - | Breakdown termasuk **plastik packing** & susut abnormal | — | Checklist |
| BB-163 | US2.3 | 2 | UI | Admin | Approve tanpa override | - | HPP tersimpan; jurnal 1350/5100 | — | Checklist |
| BB-164 | US2.3 | 2 | UI | Admin | Centang Override + justifikasi + nilai HPP/kg | - | `HPP.is_override` true; jurnal pakai total override | — | Checklist |
| BB-165 | US2.3 | 2 | UI | Admin | Batch dengan susut abnormal diklasifikasi | - | Jurnal tambahan akun **5300** saat approve | — | Checklist |
| BB-166 | US2.5 | 2 | UI | Admin | Buka `/admin/susut` | - | Log status **Menunggu** dari petani | — | Checklist |
| BB-167 | US2.5 | 2 | UI | Admin | Pilih Normal / Abnormal | - | `kategori_susut` terisi; estimasi biaya kerugian | — | Checklist |
| BB-168 | US2.5 | 2 | UI | Admin | Approve panen setelah abnormal diklasifikasi | - | HPP tidak membengkak (biaya abnormal dikurangi dari total HPP) | — | Checklist |
| BB-169 | US5.1 | 3 | UI | Admin | `/admin/pelanggan` | - | CRUD pelanggan | — | Checklist |
| BB-170 | US5.1 | 3 | UI | Admin | `/admin/penjualan` buat SO | - | Nomor `SO-YYYY-NNN`, status DRAFT, grand total | — | Checklist |
| BB-171 | US5.1 | 3 | UI | Admin | Konfirmasi stok | - | Status CONFIRMED jika qty ≤ stok batch; error jika kurang | — | Checklist |
| BB-172 | US5.3 | 3 | UI | Petani / Admin | `/petani/pengiriman` atau `/admin/penjualan` | - | SO CONFIRMED → form SHIPPED + catatan opsional + timestamp | — | Checklist |
| BB-173 | US5.3 | 3 | UI | Petani / Admin | Tandai terkirim | - | SO SHIPPED → DELIVERED; catatan opsional | — | Checklist |
| BB-174 | US5.4 | 3 | UI | Sistem | DELIVERED | uang diterima ≤ total | Jurnal PENDING: Kas Dr (uang diterima), Piutang Dr (sisa), Penjualan Cr, HPP Dr / Persediaan Cr | — | Checklist |
| BB-175 | US5.4 | 3 | UI | Admin | `/admin/jurnal` | - | Setujui jurnal → saldo akun berubah | — | Checklist |
| BB-176 | US5.5 | 3 | UI | Admin | `/admin/penjualan/{id}/invoice` | - | Nomor `INV-YYYY-NNN`, detail pelanggan & baris, cetak | — | Checklist |
| BB-177 | US5.5 | 3 | UI | Admin | Catat biaya packing | - | Field tersimpan; jurnal PENDING 5400/Kas jika nominal > 0 | — | Checklist |
| BB-178 | US5.5 | 3 | UI | Admin | Batalkan SO (belum/sudah DELIVERED) | - | Status `CANCELLED`; jurnal PENDING ditolak; jurnal APPROVED → reversal PENDING | — | Checklist |
| BB-179 | US6.1 | 4 | UI | Owner | `/owner` | - | 3 KPI bulan berjalan + grafik batang pendapatan vs beban (6 bulan) | — | Checklist |
| BB-180 | US6.1 | 4 | UI | Owner/Admin | `GET /api/reports/monthly-summary` | - | JSON agregat dari jurnal APPROVED (tipe Pendapatan/Beban) | — | Checklist |
| BB-181 | US6.2 | 4 | UI | Owner | `/owner/biaya` | - | Pie beban per akun 5xxx, filter periode YYYY-MM | — | Checklist |
| BB-182 | US6.2 | 4 | UI | Owner | Klik akun di legenda | - | Daftar baris jurnal APPROVED (drill-down) | — | Checklist |
| BB-183 | US6.2 | 4 | UI | Owner/Admin | `GET /api/reports/cost-breakdown?akunId=` | - | JSON slices + drilldown | — | Checklist |
| BB-184 | US6.3 | 4 | UI | Admin | `/admin/jurnal` → Ekspor xlsx | - | File `.xlsx` baris jurnal (hormat filter) | — | Checklist |
| BB-185 | US6.3 | 4 | UI | Owner | `/owner/laporan` | - | Unduh laba rugi PDF & neraca PDF | — | Checklist |
| BB-186 | US6.3 | 4 | UI | Owner/Admin | `GET /api/export/income-statement` | - | PDF laba rugi periode | — | Checklist |
| BB-187 | US6.3 | 4 | UI | Owner/Admin | `GET /api/export/balance-sheet` | - | PDF neraca saldo akun | — | Checklist |
| BB-188 | US6.4 | 4 | UI | Owner | `/owner` | - | Kartu **bulan laba tertinggi** (6 bulan) tanpa buka jurnal mentah | — | Checklist |
| BB-189 | US6.4 | 4 | UI | Owner | `/owner/evaluasi` | - | Kapasitas lubang idle, margin HPP vs harga curah/pack, BEP kg & lubang, rekomendasi | — | Checklist |
| BB-190 | US6.4 | 4 | UI | Petani | `/owner/evaluasi` | - | Akses ditolak (middleware Owner) | — | Checklist |
| BB-191 | US6.5 | 4 | UI | Owner | `/owner/arus-kas` | - | Saldo awal/akhir, ringkasan operasi/investasi/pendanaan, tabel mutasi Kas/Bank | — | Checklist |
| BB-192 | US6.5 | 4 | UI | Owner | Filter YYYY-MM | - | Periode di URL & ringkasan berubah | — | Checklist |
| BB-193 | US6.5 | 4 | UI | Owner/Admin | `GET /api/reports/cash-flow` | - | JSON arus kas | — | Checklist |
| BB-194 | US6.5 | 4 | UI | Owner/Admin | `GET /api/export/cash-flow` | - | PDF periode | — | Checklist |
| BB-195 | US6.5 | 4 | UI | Owner | `/owner/laporan` | - | Link unduh arus kas PDF | — | Checklist |
| BB-196 | US1.9 | 4 | UI | Owner | `/owner/pengguna` | - | Daftar user; form tambah Admin/Petani; reset sandi non-Owner | — | Checklist |
| BB-197 | US1.9 | 4 | UI | Owner | Buat akun | - | Email unik; `mustChangePassword` true | — | Checklist |
| BB-198 | US1.9 | 4 | UI | Owner | Reset sandi Admin/Petani | - | Sandi baru; Owner sendiri & akun Owner tidak di-reset dari sini | — | Checklist |
| BB-199 | US1.9 | 4 | UI | Admin/Petani | `/owner/pengguna` | - | 403 | — | Checklist |
| BB-200 | US2.6 | 4 | UI | Owner | `/owner/akun` | - | Pohon COA read-only | — | Checklist |
| BB-201 | US2.6 | 4 | UI | Owner | `/owner/jurnal` | - | Filter tanggal/status; detail tanpa approve/edit | — | Checklist |
| BB-202 | US2.6 | 4 | UI | Owner | `/owner/prive` | - | Jurnal PENDING Dr 3200 Cr 1100 | — | Checklist |
| BB-203 | US2.6 | 4 | UI | Admin | Approve prive | - | Saldo Kas & Prive berubah setelah approve | — | Checklist |
| BB-204 | US2.6 | 4 | UI | Admin | `/owner/prive` | - | 403 (hanya Owner input prive) | — | Checklist |
| BB-205 | T5.1 | 5 | UI | - | Petani HP: `/petani/siklus` → batch demo → centang konfirmasi → **Lanjut fase** | - | Toast sukses; badge **Sprout / daun**; baris log fase baru | — | Lulus |
| BB-206 | T5.2 | 5 | UI | - | Admin: `/admin/jurnal` filter tanggal + status; cari di DataTable | - | Judul “sesuai filter”; baris terfilter; placeholder cari aktif | — | Lulus |
| BB-207 | T5.3 | 5 | UI | - | Owner: dashboard KPI + grafik; HP link **Pie biaya** → `/owner/biaya` | - | Bulan laba tertinggi terbaca; pie beban tampil | — | Lulus |
| BB-208 | T5.4 | 5 | UI | - | `npm run check:jurnal-balance` setelah seed / staging | - | Exit 0; semua jurnal debit = kredit | — | Lulus |
| BB-209 | v2-D.1 | v2 | UI | Admin | `/admin/penjualan` buat SO DRAFT | - | Baris punya **lubang terpakai** + qty (kg/pack) | — | Checklist |
| BB-210 | v2-D.1 | v2 | UI | Admin | Simpan dengan lubang > stok batch | - | Error stok lubang | — | Checklist |
| BB-211 | v2-D.1 | v2 | UI | Admin | Konfirmasi → kirim → DELIVERED | - | Jurnal COGS memakai **hpp_order** (lubang × HPP/lubang + plastik pack) | — | Checklist |
| BB-212 | v2-C.1 | v2 | UI | Petani | `/petani/siklus` pilih varietas + pack benih | - | Opsi pack menampil **~N lubang** | — | Checklist |
| BB-213 | v2-C.1 | v2 | UI | Petani | Isi jumlah disemai | - | Field gram benih & media terisi otomatis (read-only) | — | Checklist |
| BB-214 | v2-C.1 | v2 | UI | Petani | Simpan melebihi kapasitas pack | - | Error jelas (sisa pack / lubang) | — | Checklist |
| BB-215 | v2-C.1 | v2 | UI | Petani | Simpan valid | - | `sisaUnit` pack berkurang proporsional; biaya langsung siklus terisi | — | Checklist |
| BB-216 | v2-B.1 | v2 | UI | Petani | Buka siklus aktif `/petani/siklus/[id]` | - | Form **Abort gagal total** tampil | — | Checklist |
| BB-217 | v2-B.1 | v2 | UI | Petani | Isi alasan + centang konfirmasi → Abort | - | Status **Gagal total**; lanjut fase / kegagalan baru ditolak | — | Checklist |
| BB-218 | v2-B.1 | v2 | UI | Admin | `/admin/biaya` — panel abort | - | Abort untuk batch aktif (sama) | — | Checklist |
| BB-219 | v2-B.1 | v2 | UI | Admin | `/admin/jurnal` | - | Jurnal APPROVED Dr **5300** Cr **1350** = biaya langsung + overhead siklus | — | Checklist |
| BB-220 | v2-B.1 | v2 | UI | Admin | Approve panen batch yang di-abort | - | Ditolak | — | Checklist |
| BB-221 | v2-B.1 | v2 | UI | Petani | Log kegagalan partial pada batch abort | - | Ditolak (tidak double-count vs jurnal abort) | — | Checklist |
| BB-222 | v2-A.1 | v2 | UI | Admin | Buka `/admin/akun` | - | Akun standar menampil badge **Sistem** | — | Checklist |
| BB-223 | v2-A.1 | v2 | UI | Admin | Edit akun sistem (mis. 1100 Kas) | - | Hanya **nama** bisa diubah; kode/tipe/induk terkunci; simpan sukses | — | Checklist |
| BB-224 | v2-A.1 | v2 | UI | Admin | Coba ubah kode/tipe via API (curl) | - | 400 / pesan guard server | — | Checklist |
| BB-225 | v2-A.1 | v2 | UI | Admin | Nonaktifkan akun sistem | - | Tombol **Nonaktifkan** tidak ada; API menolak | — | Checklist |
| BB-226 | v2-A.1 | v2 | UI | Admin | Tambah akun custom | - | Tanpa badge Sistem; edit/nonaktif normal | — | Checklist |
| BB-227 | v2-E.2 | v2 | UI | Admin | SO DELIVERED, status PIUTANG | - | Form pelunasan + pilih kas/bank | — | Checklist |
| BB-228 | v2-E.2 | v2 | UI | Admin | Catat pelunasan ≤ sisa piutang | - | Jurnal AUTO APPROVED Dr kas Cr 1200; status LUNAS jika sisa 0 | — | Checklist |
| BB-229 | v2-E.2 | v2 | UI | Admin | Pelunasan > sisa | - | Pesan error | — | Checklist |
| BB-230 | v2-H | v2 | UI | Admin | `/admin/akuntansi` → Catat penyusutan | - | Jurnal GH + instalasi (jika nominal > 0) | — | Checklist |
| BB-231 | v2-H | v2 | UI | Admin | Ulangi bulan sama | - | 409 sudah dicatat | — | Checklist |
| BB-232 | v2-F | v2 | UI | Admin | `/admin/jurnal/baru` | - | Hanya dropdown catat uang; tidak ada tab jurnal manual | — | Checklist |
| BB-233 | v2-F | v2 | UI | Admin | Catat **Bayar listrik** + centang sync HPP | nominal + lahan | Jurnal PENDING 5230/kas; `biaya_listrik_bulan` lahan terupdate | — | Checklist |
| BB-234 | v2-F | v2 | UI | Owner | `/owner/jurnal/koreksi` | baris seimbang | Jurnal manual PENDING; redirect detail Owner | — | Checklist |
| BB-235 | v2-F | v2 | UI | Admin | Stok keluar inventaris + nilai persediaan | OUT + Rp | Jurnal AUTO PENDING Dr 5300 Cr persediaan | — | Checklist |
| BB-236 | v2-E.2 | v2 | UI | Admin | DELIVERED, uang diterima < total | mis. 40% total | Status PIUTANG; pelunasan form tampil | — | Checklist |
| BB-237 | v2-F | v2 | CLI | - | `npm run check:sales-order-penerimaan` | - | Exit 0 | — | Checklist |
| BB-238 | v2-F | v2 | UI | Admin | Catat uang → Suntikan modal | catatan «suntikan modal» + tipe Pendapatan lain | Tolak simpan; pesan arahkan ke 3100 | — | Checklist |
| BB-239 | v2-F | v2 | UI | Admin | Catat uang → Pendapatan lain-lain | nominal | Jurnal PENDING Dr kas Cr **4300** (bukan 4100) | — | Checklist |
| BB-240 | v2-F | v2 | UI | Admin | `/admin/penjualan/piutang` | SO DELIVERED + PIUTANG | Daftar sisa + umur hari | — | Checklist |

## Findings lintas uji

| ID | Ringkas | Rujukan |
| --- | --- | --- |
| FINDING-01 | Pool DB / error P2024 | [uji-blackbox § FINDING-01](./uji-blackbox.md#finding-01-database-prisma-postgres-lambat-dan-pool-timeout) · [panduan deploy](./deployment/panduan-deploy-vercel-postgres.md) |
| FINDING-02 | Dev server stale, `/api/auth/session` 404 | [uji-blackbox § FINDING-02](./uji-blackbox.md#finding-02-dev-server-stale--apiauthsession-404-dan-css-preload-404) |

## Verifikasi otomatis (pelengkap blackbox)

| Perintah | Cakupan |
| --- | --- |
| `npm run check:jurnal-balance` | Debit = kredit semua jurnal |
| `npm run check:smart-jurnal-balance` | 17 tipe Smart Jurnal |
| `npm run check:kas-sumber`, `check:sales-order-pelunasan`, `check:sales-order-dp` | Kas, SO |
| `npm run check:harvest-wip-jurnal`, `check:penyusutan-otomatis` | Panen WIP, penyusutan |
| `npm run test:e2e` | Smoke Playwright (dev server :3000) |

Sumber data: `docs/testing/uji-blackbox.md` · diperbarui 2026-10-12.

---

## Skenario naratif untuk klien (UAT / demo / pelatihan)

Bagian ini melengkapi tabel BB-ID di atas. Kalimatnya ditulis dari sudut pengguna: siapa login, menu apa yang dibuka, apa yang diisi, dan apa yang seharusnya terlihat di layar. Cocok untuk script sidang, checklist bersama klien, atau materi pelatihan tanpa istilah teknis.

Catatan: urutan di bawah mengikuti operasi harian Kokonus Farm (budidaya → biaya → penjualan → laporan). Sandi dan URL production disesuaikan saat go-live.

### Semua peran — masuk dan keamanan akun

1. Pengguna membuka halaman login, memasukkan email dan sandi, lalu menekan Masuk. Sistem mengarahkan Owner ke beranda Owner, Admin ke beranda Admin, Petani ke beranda Petani.
2. Pengguna mencoba masuk dengan sandi salah. Sistem menampilkan pesan bahwa email atau sandi tidak cocok, tanpa memberi tahu apakah email terdaftar.
3. Pengguna menekan Keluar dan mengonfirmasi. Sistem menutup sesi dan kembali ke halaman login.
4. Pengguna yang belum login mencoba membuka alamat halaman Admin atau Owner. Sistem mengarahkan ke login atau menampilkan halaman akses ditolak, sesuai peran.
5. Petani yang lupa sandi membuka Lupa sandi, mengisi email, dan mengirim permintaan. Sistem memberi pesan yang sama apakah email terdaftar atau tidak.
6. Admin login, melihat daftar permintaan reset sandi, lalu menyetujui salah satu permintaan. Sistem menampilkan sandi sementara sekali; Admin memberitahu Petani lewat saluran di luar aplikasi.
7. Petani login dengan sandi sementara. Sistem memaksa ke halaman ganti sandi sebelum bisa membuka menu lain; sandi baru harus memenuhi aturan minimal.
8. Admin mendaftarkan petani baru (nama, email, sandi awal). Sistem menyimpan akun sebagai Petani; petani baru wajib ganti sandi saat login pertama.
9. Owner membuka Kelola pengguna, menambah Admin atau Petani, atau mereset sandi akun bawahan (bukan akun Owner lain). Sistem menolak jika email sudah dipakai.
10. Setiap peran membuka Pengaturan: mengubah nama profil, mengubah sandi (dengan sandi lama), melihat ringkasan hak per peran, dan notifikasi yang relevan (misalnya Admin melihat jumlah permintaan reset menunggu).

### Petani — hari di lapangan

11. Petani login dan membuka beranda. Sistem menampilkan tugas hari ini, histori aktivitas singkat, dan peringatan stok rendah jika ada.
12. Petani membuka Siklus produksi, menekan mulai siklus baru, memilih varietas aktif, kolam, serta pack benih (dan media jika dipakai). Sistem menghitung kebutuhan gram benih dan media dari jumlah lubang; Petani mengisi jumlah lubang dan menyimpan. Sistem membuat siklus tanam (kode internal di detail), fase awal semai, dan mengurangi sisa pack secara proporsional.
13. Petani membuka detail siklus, membaca log fase, mencentang konfirmasi, lalu menekan Lanjut fase. Sistem hanya mengizinkan maju satu fase sesuai urutan; fase dan waktu tercatat di log.
14. Petani di fase panen mengisi laporan panen (jumlah, kualitas, tanggal). Sistem menyimpan laporan menunggu persetujuan Admin.
15. Petani membuka form catat kegagalan pada siklus aktif: tahap, jumlah gagal, penyebab. Sistem menambah log dan menaikkan total susut; validasi menolak jika melebihi jumlah yang disemai.
16. Petani mencatat monitor pertumbuhan atau tambal susulan (dengan pack jika perlu). Sistem menambah entri di log fase; susut menyesuaikan; sisa pack berkurang saat tambal memakai stok.
17. Petani membatalkan siklus gagal total: mengisi alasan, centang konfirmasi, menekan Batalkan siklus. Sistem mengubah status menjadi gagal total, menutup lanjut fase/panen/kegagalan baru, dan biaya siklus tercatat di jurnal beban.
18. Petani membuka Inventaris, melihat stok, lalu mencatat masuk/keluar/adjust opname dengan keterangan jika diwajibkan. Sistem menolak keluar jika stok tidak cukup.
19. Petani membuka Paket siap pakai, membuka pack baru atau mencatat pemakaian. Sistem menghitung biaya per unit dan menandai pack habis jika sisa nol.
20. Petani membuka daftar varietas (hanya yang aktif), stok rendah, dan pengiriman. Sistem menampilkan sales order yang siap diantar; Petani (atau Admin) menandai terkirim lalu delivered sesuai alur penjualan.
21. Petani mencoba membuka menu Admin atau Owner. Sistem menampilkan akses ditolak.

### Admin — pembukuan, stok, dan penjualan

22. Admin login dan melihat beranda dengan pintasan modul (produksi, stok, penjualan, akuntansi).
23. Admin membuka Bagan akun, menambah akun custom atau mengubah akun non-sistem; akun bertanda Sistem hanya boleh ubah nama. Sistem menjaga kode unik dan konsistensi tipe induk-anak.
24. Admin membuka Jurnal, memfilter tanggal dan status, mencari di tabel, lalu membuat jurnal baru dengan minimal dua baris seimbang. Sistem menolak simpan jika debit dan kredit tidak sama; jurnal disetujui atau ditolak dengan alasan.
25. Admin menyetujui laporan panen dari Petani. Sistem menghitung HPP (termasuk overhead dan aturan plastik/susut jika berlaku), menyimpan HPP, dan menyiapkan jurnal persediaan; Admin bisa override HPP dengan justifikasi jika kebijakan mengizinkan.
26. Admin membuka Biaya langsung & overhead: mencatat biaya per batch dan overhead periode. Sistem menyimpan alokasi yang dipakai saat HPP dihitung.
27. Admin membuka Klasifikasi susut, memilih normal atau abnormal untuk log menunggu. Sistem mengisi kategori; saat panen disetujui, dampak HPP mengikuti klasifikasi.
28. Admin mengelola inventaris (item baru, movement), active pack, infrastruktur (lahan, greenhouse, kolam), varietas, dan master petani sesuai hak tulis Admin.
29. Admin membuka Stok rendah. Sistem menampilkan item di bawah minimum; banner di beranda muncul selama masih ada item rendah.
30. Admin membuka Pelanggan, menambah atau mengubah data pelanggan.
31. Admin membuat Sales Order: memilih pelanggan, baris varietas/qty, lubang terpakai jika fitur aktif, lalu menyimpan DRAFT. Sistem menghitung total; konfirmasi mengecek stok batch/lubang; status naik CONFIRMED → SHIPPED → DELIVERED.
32. Admin mencetak invoice dari SO, mencatat biaya packing jika ada, atau membatalkan SO. Sistem mengubah status, menolak jurnal pending terkait, atau menyiapkan reversal jika jurnal sudah disetujui.
33. Saat SO delivered, sistem membuat jurnal penjualan dan HPP (otomatis atau pending); Admin meninjau di Jurnal dan menyetujui jika status pending.
34. Admin mencatat pelunasan piutang untuk SO yang sudah delivered (pilih kas/bank, nominal ≤ sisa). Sistem memposting jurnal pelunasan dan mengubah status lunas jika sisa nol.
35. Admin membuka modul Akuntansi (prive Owner hanya dari sisi Owner, penyusutan bulanan, dan fitur back-office lain yang tersedia). Sistem menolak duplikasi penyusutan bulan yang sama.
36. Admin mengekspor jurnal ke Excel dari daftar jurnal dengan filter yang sedang aktif.

### Owner — monitoring tanpa mengoperasikan lapangan

37. Owner login ke beranda. Sistem menampilkan KPI bulan berjalan, grafik pendapatan vs beban, dan sorotan bulan laba tertinggi dalam periode grafik.
38. Owner membuka Pie biaya, memilih periode, mengklik segmen akun. Sistem menampilkan drill-down baris jurnal beban yang disetujui.
39. Owner membuka Evaluasi: kapasitas lubang idle, margin HPP vs harga jual, titik impas kg/lubang, rekomendasi singkat. Petani tidak bisa membuka halaman ini.
40. Owner membuka Arus kas, memfilter bulan. Sistem menampilkan saldo awal/akhir, ringkasan aktivitas, mutasi kas/bank, dan link unduh PDF jika tersedia.
41. Owner membuka Laporan, mengunduh laba rugi, neraca, atau arus kas PDF untuk periode yang dipilih.
42. Owner membuka Jurnal dan Bagan akun dalam mode baca: filter dan detail tanpa approve atau edit COA destructive.
43. Owner mencatat prive (penarikan modal) dari menu prive. Sistem membuat jurnal pending; Admin menyetujui di jurnal sehingga saldo kas dan modal berubah.
44. Owner melihat inventaris, varietas, infrastruktur, stok rendah, dan daftar petani tanpa form tulis Admin.
45. Owner membuka Kelola pengguna untuk menambah Admin/Petani dan reset sandi (sesuai kebijakan), tanpa mengubah sandi Owner lain dari layar yang sama.

### Alur end-to-end (satu cerita untuk demo klien)

46. Admin menyiapkan master: varietas aktif, inventaris, infrastruktur, COA, pelanggan demo.
47. Petani memulai batch semai, maju fase sampai panen, mengisi laporan panen.
48. Admin menyetujui panen; HPP batch terisi; jurnal terkait muncul di daftar jurnal.
49. Admin (atau Petani) mencatat movement stok jika hasil panen masuk persediaan sesuai prosedur farm.
50. Admin membuat SO, konfirmasi stok, tandai pengiriman, lalu delivered.
51. Admin menyetujui jurnal penjualan/HPP jika masih pending; Owner membuka dashboard dan laporan untuk melihat dampak laba dan arus kas bulan berjalan.
52. Owner menarik prive; Admin menyetujui jurnal prive; Owner memverifikasi neraca dan arus kas setelah semua posting.

### Checklist singkat bersama klien (centang saat demo)

| # | Pertanyaan ke klien | Ya / Tidak / N/A |
| --- | --- | --- |
| A | Apakah tiga peran (Owner, Admin, Petani) bisa login dan hanya melihat menu yang sesuai? | |
| B | Apakah alur semai → fase → panen → approve HPP mudah dijelaskan ke pekerja lapangan? | |
| C | Apakah catat uang (dropdown) dan jurnal otomatis (panen, SO, stok) terasa seimbang di detail? | |
| D | Apakah stok rendah terlihat sebelum kehabisan benih/media kritis? | |
| E | Apakah SO dari draft sampai delivered + invoice jelas untuk admin kantor? | |
| F | Apakah Owner bisa membaca laba, biaya, dan arus kas tanpa Excel? | |
| G | Apakah reset sandi dan akun petani baru aman untuk operasi (tanpa pendaftaran publik)? | |
| H | Apakah performa layar acceptable di jaringan kantor/farm (tidak timeout berulang)? | |

### Ruang catatan klien (isi saat meeting)

- Tanggal demo / UAT:
- Peserta (nama, peran):
- URL lingkungan (staging/production):
- Temuan klien (prioritas tinggi → rendah):
- Keputusan follow-up (siapa, kapan):

---

Dokumen naratif di atas tidak mengganti register BB-ID; keduanya saling melengkapi untuk tim internal (BB-ID) dan presentasi ke klien (skenario per kalimat).
