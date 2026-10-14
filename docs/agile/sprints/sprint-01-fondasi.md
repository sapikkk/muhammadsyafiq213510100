# Sprint 1 — Fondasi & autentikasi

**Tujuan:** Website siap dikembangkan, database sesuai ERD, login aman per peran, dan pengalaman error yang jelas.  
**Iteration:** 2026-10-07 → 2026-10-20 · **Epic:** EPIC-1 · **Status:** Done

Registry: [`../us-registry.md`](../us-registry.md) · Retro: [`../retro/sprint-01-retro.md`](../retro/sprint-01-retro.md)

---

## US1.1 — Fondasi proyek web

| | |
|--|--|
| **Issue** | [#2](https://github.com/sapikkk/muhammadsyafiq213510100/issues/2) · Done · 2026-10-07 |

**User story:** Sebagai **tim pengembang**, saya ingin fondasi Next.js, TypeScript, dan komponen UI dasar rapi, agar fitur berikutnya konsisten dan mudah di-review.

**Acceptance criteria (uji):**

- Struktur folder `app/`, `components/`, `lib/` jelas.
- TypeScript strict, lint, dan dev server tanpa warning mengganggu.
- Komponen dasar (tombol, form, tabel) siap dipakai layar auth.

**Catatan dev:** App Router · shadcn · `package.json`, `components/ui/*`

**Blackbox:** implisit di fondasi.

---

## US1.2 — Schema database (ERD)

| | |
|--|--|
| **Issue** | [#3](https://github.com/sapikkk/muhammadsyafiq213510100/issues/3) · Done |

**User story:** Sebagai **sistem**, saya ingin tabel dan relasi sesuai ERD Kokonus Farm, agar data produksi dan keuangan tidak bentrok.

**Acceptance criteria (uji):**

- Enam belas entitas inti (siklus, panen, inventaris, dll.) terdefinisi.
- Tipe uang dan berat konsisten (DECIMAL).

**Catatan dev:** `prisma/schema.prisma` · PRD §8.1

---

## US1.3 — Database hidup + migrasi

| | |
|--|--|
| **Issue** | [#4](https://github.com/sapikkk/muhammadsyafiq213510100/issues/4) · Done |

**User story:** Sebagai **developer**, saya ingin PostgreSQL terhubung dengan migrasi dan seed, agar demo dan uji bisa diulang.

**Acceptance criteria (uji):**

- `DATABASE_URL` terdokumentasi di `.env.example`.
- Perintah generate/migrate/push berjalan; seed akun login mengikuti US1.4.

**Catatan dev:** `prisma/seed.js`

---

## US1.4 — Masuk & keluar aplikasi

| | |
|--|--|
| **Issue** | [#5](https://github.com/sapikkk/muhammadsyafiq213510100/issues/5) · Done |
| **Blackbox** | [`../../testing/uji-blackbox.md`](../../testing/uji-blackbox.md) § US1.4 |

**User story:** Sebagai **Owner, Admin, atau Petani**, saya ingin masuk dengan email dan sandi lalu diarahkan ke beranda peran saya, agar menu yang tampil sesuai tugas.

**Acceptance criteria (uji):**

- Login gagal menampilkan pesan jelas; login sukses redirect ke `/owner`, `/admin`, atau `/petani`.
- Peran salah rute → halaman akses ditolak, bukan data orang lain.
- Logout kembali ke halaman masuk.

**Catatan dev:** NextAuth credentials · `middleware.ts` · demo `*@kokonus.farm`

---

## US1.5 — Reset sandi lewat Admin

| | |
|--|--|
| **Issue** | [#6](https://github.com/sapikkk/muhammadsyafiq213510100/issues/6) · Done · blackbox US1.5 |

**User story:** Sebagai **pengguna**, saya ingin minta reset sandi dan Admin yang setujui, agar akun aman tanpa link publik sembarangan.

**Acceptance criteria (uji):**

- Alur minta → setujui/tolak → sandi sementara → wajib ganti sandi.
- Bukan OTP email otomatis ke publik.

**Catatan dev:** `/lupa-sandi`, `/ganti-sandi`, antrian Admin

---

## US1.6 — Admin daftarkan petani

| | |
|--|--|
| **Issue** | [#7](https://github.com/sapikkk/muhammadsyafiq213510100/issues/7) · Done · blackbox US1.6 |

**User story:** Sebagai **Admin**, saya ingin mendaftarkan petani dengan email dan sandi awal, agar tidak ada pendaftaran sendiri di internet.

**Acceptance criteria (uji):**

- Hanya Admin yang bisa buat akun petani.
- Email dipakai sebagai username login.

**Catatan dev:** `registerPetani`, `/admin` daftar petani

---

## US1.7 — Profil & hak akses

| | |
|--|--|
| **Issue** | [#8](https://github.com/sapikkk/muhammadsyafiq213510100/issues/8) · Done · blackbox US1.7 |

**User story:** Sebagai **pengguna**, saya ingin ubah nama dan sandi serta melihat matrix peran, agar tahu batas wewenang masing-masing peran.

**Acceptance criteria (uji):**

- Ganti sandi wajib sandi lama benar.
- Admin melihat notifikasi permintaan reset sandi.

**Catatan dev:** `/pengaturan`, matrix RBAC

---

## US1.8 — Loading, error, dan akses ditolak

| | |
|--|--|
| **Issue** | [#9](https://github.com/sapikkk/muhammadsyafiq213510100/issues/9) · Done · blackbox US1.8 |

**User story:** Sebagai **pengguna**, saya ingin feedback jelas saat halaman loading, error, atau akses ditolak, agar tidak mengira aplikasi hang.

**Acceptance criteria (uji):**

- Halaman loading, error (dengan coba lagi), tidak ditemukan, dan 403 tersedia.
- Empty state meaningful di area utama Admin/Owner.

**Catatan dev:** `app/error.tsx`, `app/not-found.tsx`, `/akses-ditolak`

---

## US1.9 — Owner kelola user *(delivered Sprint 4)*

| | |
|--|--|
| **Issue** | [#10](https://github.com/sapikkk/muhammadsyafiq213510100/issues/10) · Done (Sprint 4, PR #78) |

**User story:** Sebagai **Owner**, saya ingin menambah dan mengelola akun tim, agar siapa saja yang akses greenhouse terkendali.

**Acceptance criteria (uji):** CRUD user sesuai PRD/Figma Owner.

**Catatan dev:** Dikerjakan Sprint 4 — lihat [`sprint-04-laporan.md`](sprint-04-laporan.md).

---

## Checklist sprint (arsip)

- [x] Tiga akun demo login
- [x] Middleware RBAC
- [x] Notulensi US1.4–1.8 di blackbox
- [x] Velocity 29 poin (US1.9 dihitung Sprint 4)

Terakhir diperbarui: **2026-10-15**.
