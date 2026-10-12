# Postgres lokal vs cloud untuk development

Ringkasan praktis: kapan pakai database mana, dan cara ganti tanpa meng-commit rahasia.

## Kenapa dua mode?

| Mode | `DATABASE_URL` | Latensi dev | Cocok untuk |
| --- | --- | --- | --- |
| **Lokal** | `localhost:5432` | Rendah (~1–5 ms) | Coding harian, `npm run dev`, seed, typecheck dengan data |
| **Cloud** (Neon, Supabase, Vercel Postgres, dll.) | Host remote + pool | Tinggi (50–300+ ms per query) | Uji persis seperti production, demo dari laptop ke DB staging |

FINDING-01 (pool timeout / P2024) sering muncul saat **dev memakai URL cloud** tanpa parameter pool. Itu bukan bug aplikasi — jarak jaringan + limit koneksi.

## Setup Postgres lokal (macOS)

```bash
brew install postgresql@16
brew services start postgresql@16
createdb kokonus_farm
```

Salin `.env.example` ke `.env` dan pastikan:

```text
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kokonus_farm"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/kokonus_farm"
```

(Sesuaikan user/sandi jika Postgres Homebrew memakai akun macOS Anda.)

Fondasi schema + COA:

```bash
npx prisma db push
npx prisma db seed
```

Data demo sidang (opsional):

```bash
npm run seed:demo-lengkap
# atau alur satu tahun:
npm run seed:kokonus-tahun
```

## Dev harian vs uji cloud

**Rekomendasi:** satu file `.env` untuk **lokal**, simpan URL cloud di file terpisah yang **gitignore** (mis. `.env.cloud`).

Contoh `.env` (lokal — default):

```text
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kokonus_farm"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/kokonus_farm"
```

Contoh `.env.cloud` (jangan commit):

```text
DATABASE_URL="postgresql://USER:PASS@ep-xxx.region.aws.neon.tech/neondb?sslmode=require&connection_limit=5&pool_timeout=30"
DIRECT_URL="postgresql://USER:PASS@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

Ganti sementara ke cloud (zsh):

```bash
cp .env .env.local-backup
grep -v '^DATABASE_URL\|^DIRECT_URL' .env.local-backup > .env
cat .env.cloud >> .env
npm run dev
```

Kembali ke lokal:

```bash
mv .env.local-backup .env
```

Next.js dan Prisma CLI **hanya** membaca `.env` di root repo (kecuali Anda export variabel di shell).

## Parameter URL cloud (dev remote)

Tambahkan pada **DATABASE_URL** pooled:

```text
?sslmode=require&connection_limit=5&pool_timeout=30
```

- `pool_timeout=30` — tunggu koneksi dari pool (naikkan ke 60 jika masih P2024).
- `connection_limit=5` — cukup untuk satu proses `next dev`; jangan terlalu besar di laptop.

`DIRECT_URL` **tanpa** pool — host direct dari panel provider (migrate / `db push`).

Detail production: [`panduan-deploy-vercel-postgres.md`](./panduan-deploy-vercel-postgres.md).

## Jangan campur data prod dan dev

- Jangan arahkan `.env` lokal ke database **production** Vercel kecuali sengaja maintenance.
- Sebelum `npm run db:reset` atau `seed:kokonus-tahun`, cek host di `DATABASE_URL` (`localhost` vs `neon` / `supabase`).

## Perintah setelah ganti database

```bash
npx prisma db push    # schema selaras
npx prisma db seed    # COA fondasi (idempotent sejauh seed fondasi)
npm run dev:clean     # hapus .next stale jika module chunk error
```

Terakhir diperbarui: 2026-10-13.
