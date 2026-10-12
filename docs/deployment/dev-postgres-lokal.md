# Database dev (cloud / Prisma)

Tim dev **cukup satu `.env`** dengan Postgres **cloud** (Prisma Data Platform, Neon, Supabase, dll.) — tidak wajib Postgres lokal.

## Default: cloud + pool

| Item | Catatan |
| --- | --- |
| `DATABASE_URL` | URL **pooled** dari provider |
| `DIRECT_URL` | URL direct (migrate / `db push`) |
| Parameter | `pool_timeout=30` (naik ke 60 jika P2024); lihat FINDING-01 |

FINDING-01 (pool timeout / P2024) muncul jika URL cloud **tanpa** `pool_timeout` / limit koneksi wajar. Bukan bug aplikasi.

Contoh lengkap production: [`panduan-deploy-vercel-postgres.md`](./panduan-deploy-vercel-postgres.md).

## Opsional: Postgres lokal

Hanya jika Anda sengaja ingin DB di laptop (latency lebih rendah). **Bukan requirement** proyek ini.

## Setup Postgres lokal (macOS, opsional)

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

Satu file **`.env`** saja (gitignore). Untuk coding harian, isi `DATABASE_URL` dan `DIRECT_URL` ke **localhost** (contoh di atas). Kalau perlu uji ke DB staging cloud, **edit langsung** kedua baris itu di `.env`, simpan, restart `npm run dev`. Jangan commit `.env`.

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
