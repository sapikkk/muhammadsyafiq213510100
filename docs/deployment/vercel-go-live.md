# Deploy Vercel + Postgres (T5.6) & go-live (T5.9)

Panduan PO/DevOps untuk staging/production Kokonus Farm. **Jangan** set `AUDIT_BYPASS_RBAC=true` di Vercel.

## Prasyarat

- Repo GitHub terhubung ke [Vercel](https://vercel.com).
- Database PostgreSQL managed (Neon, Supabase, Prisma Postgres, atau RDS) dengan **DIRECT_URL** untuk migrate/push.
- Domain production (opsional) dan `NEXTAUTH_URL` sesuai URL publik.

## Langkah deploy (T5.6)

1. **Database**
   - Buat database Postgres (region dekat pengguna, mis. Singapore).
   - Salin **pooled** `DATABASE_URL` dan **direct** `DIRECT_URL` dari panel provider.
   - Untuk Prisma Postgres / serverless: tambahkan parameter pool jika dokumentasi provider menyarankan, mis. `?connection_limit=1` pada URL serverless Vercel (satu instance = satu koneksi).

2. **Schema & seed (sekali)**
   - Dari mesin lokal dengan `.env` production/staging:
     ```bash
     npx prisma db push
     npx prisma db seed
     npm run check:jurnal-balance
     ```
   - Seed membuat akun demo (`prisma/seed.js`); ganti sandi production sebelum go-live nyata.

3. **Vercel — Environment Variables**

   | Variabel | Wajib | Catatan |
   | --- | --- | --- |
   | `DATABASE_URL` | ya | Pooled / connection string runtime |
   | `DIRECT_URL` | ya | Migrasi & Prisma CLI |
   | `NEXTAUTH_URL` | ya | `https://<domain-anda>` |
   | `NEXTAUTH_SECRET` | ya | `openssl rand -base64 32` |
   | `AUDIT_BYPASS_RBAC` | **jangan true** | Hanya dev lokal |

4. **Build**
   - Framework: Next.js (auto).
   - Build command: `npm run build` (default).
   - Install: `npm clean-install` atau default.

5. **Verifikasi pasca-deploy**
   - Login Owner / Admin / Petani (akun seed atau akun production).
   - `npm run check:audit-env` sudah di CI — ulangi mental: tidak ada bypass di env Vercel.
   - Smoke manual: jurnal filter, petani pindah fase, owner dashboard grafik.

## Security checklist (T5.6)

- [ ] HTTPS only (Vercel default).
- [ ] `NEXTAUTH_SECRET` unik per environment.
- [ ] Tidak commit `.env`; rahasia hanya di Vercel.
- [ ] Role RBAC aktif (`middleware.ts`); tanpa audit bypass.
- [ ] Sandi demo diganti atau akun demo dinonaktifkan sebelum sidang production.

## Go-live & pelatihan 6 pengguna (T5.9)

Lihat [`docs/testing/pelatihan-6-pengguna.md`](../testing/pelatihan-6-pengguna.md).

## FINDING-01 (pool DB)

Gejala timeout P2024 pada dev remote DB — mitigasi kode: retry di `lib/prisma.ts`. Runbook lengkap: [`FINDING-01-db-pool.md`](./FINDING-01-db-pool.md). Production: pilih region dekat, batasi `connection_limit` di serverless, atau Postgres lokal untuk demo sidang.

Terakhir diperbarui: 2026-10-10 · Sprint 5.
