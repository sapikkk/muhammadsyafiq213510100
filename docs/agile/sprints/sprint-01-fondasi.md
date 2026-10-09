# Sprint 1 — Fondasi & autentikasi

**Goal PRD:** Next.js, schema, login per peran, middleware RBAC, layar auth, state global.  
**Iteration:** 2026-10-07 → 2026-10-20 · **Epic:** EPIC-1

---

## US1.1 — Setup Next.js 14 + TS + Tailwind + shadcn

| Field | Nilai |
|-------|--------|
| Issue | [#2](https://github.com/sapikkk/muhammadsyafiq213510100/issues/2) |
| Project | Done |
| Selesai | 2026-10-07 |

**Acceptance criteria (PRD):** App Router; TS strict; ESLint+Prettier; folder `/app` `/components` `/lib`; `.env.example`; shadcn dasar (Button, Card, Input, Badge, Dialog, Table, Select); dev tanpa warning.

**DoD (ringkas):** ✅ typecheck/lint · ✅ struktur repo · ✅ komponen dasar

**Tech:** `package.json`, `tailwind.config.ts`, `components/ui/*`, `README.md`

**Blackbox:** implisit di fondasi; tidak ada section terpisah di `uji-blackbox.md`.

---

## US1.2 — Schema Prisma ERD

| Field | Nilai |
|-------|--------|
| Issue | [#3](https://github.com/sapikkk/muhammadsyafiq213510100/issues/3) |
| Project | Done |
| Selesai | 2026-10-07 |

**AC:** 16 tabel kamus §8.1; relasi Petani, Siklus, HPP, dll.; DECIMAL uang/berat.

**Tech:** `prisma/schema.prisma`, `docs/prd-agile-kokonus-farm.md` §8.1

---

## US1.3 — PostgreSQL + migrate/seed

| Field | Nilai |
|-------|--------|
| Issue | [#4](https://github.com/sapikkk/muhammadsyafiq213510100/issues/4) |
| Project | Done |
| Selesai | 2026-10-07 |

**AC:** `DATABASE_URL`; prisma generate/push; seed menyusul US1.4 untuk akun login.

**Tech:** `prisma/seed.js`, `.env.example`

---

## US1.4 — NextAuth login/logout

| Field | Nilai |
|-------|--------|
| Issue | [#5](https://github.com/sapikkk/muhammadsyafiq213510100/issues/5) |
| Project | Done |
| Selesai | 2026-10-07 |
| Blackbox | `uji-blackbox.md` — US1.4 |

**AC:** Credentials + bcrypt; `/login`; redirect per role; middleware `/owner` `/admin` `/petani`; logout.

**Tech:** `lib/auth.ts`, `middleware.ts`, `app/login/page.tsx`, demo `*@kokonus.farm`

**DoD:** ✅ API session · ✅ 403 salah peran · ✅ notulensi blackbox

---

## US1.5 — Lupa sandi via Admin

| Issue | [#6](https://github.com/sapikkk/muhammadsyafiq213510100/issues/6) · Done · blackbox US1.5 |
| **AC** | Admin setujui/tolak reset; sandi sementara; wajib ganti; **bukan** OTP publik |
| **Tech** | `PasswordResetRequest`, `/lupa-sandi`, `/ganti-sandi`, `/admin` reset queue |

---

## US1.6 — Register petani (User login)

| Issue | [#7](https://github.com/sapikkk/muhammadsyafiq213510100/issues/7) · Done · blackbox US1.6 |
| **AC** | Admin daftar petani; email = username; tanpa signup publik |
| **Tech** | `registerPetani`, `components/register-petani.tsx` |

---

## US1.7 — Settings profil & matrix peran

| Issue | [#8](https://github.com/sapikkk/muhammadsyafiq213510100/issues/8) · Done · blackbox US1.7 |
| **AC** | Ubah nama/sandi; matrix RBAC; notifikasi reset untuk Admin |
| **Tech** | `/pengaturan`, `components/role-matrix.tsx` |

---

## US1.8 — State global loading/error/403

| Issue | [#9](https://github.com/sapikkk/muhammadsyafiq213510100/issues/9) · Done · blackbox US1.8 |
| **AC** | `loading.tsx`, `error.tsx`, `not-found.tsx`, `/akses-ditolak` |
| **Tech** | `app/error.tsx`, `app/not-found.tsx`, middleware 403 |

---

## US1.9 — Kelola user (Owner) — **Done (Sprint 4)**

| Issue | [#10](https://github.com/sapikkk/muhammadsyafiq213510100/issues/10) · Project: Done |
| **AC** | Owner tambah Admin/Petani, reset sandi non-Owner |
| **Tech** | `/owner/pengguna`, `lib/owner-users.ts` · PR [#78](https://github.com/sapikkk/muhammadsyafiq213510100/pull/78) |

---

## Sprint 1 — checklist demo

- [x] Tiga akun demo login
- [x] Middleware RBAC
- [x] Notulensi US1.4–1.8 di `uji-blackbox.md`
- [x] Retro Sprint 1 → [retro/sprint-01-retro.md](../retro/sprint-01-retro.md)
- [x] Velocity points di `timeline-registry.md` (29 pts selesai)
