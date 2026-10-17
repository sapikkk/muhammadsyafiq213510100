# Panduan deploy Vercel dan PostgreSQL

Production: [kokonusfarm.vercel.app](https://kokonusfarm.vercel.app)

Panduan PO/DevOps untuk staging dan production Kokonus Farm (T5.6 go-live, T5.9 pelatihan). Jangan set `AUDIT_BYPASS_RBAC=true` di Vercel.

## Prasyarat

- Repo GitHub terhubung ke [Vercel](https://vercel.com).
- PostgreSQL managed (Neon, Supabase, Prisma Postgres, atau RDS) dengan `DIRECT_URL` untuk migrate/push.
- Domain production (opsional) dan `NEXTAUTH_URL` mengikuti URL publik.

## Perintah cepat (CLI lokal)

```bash
cp scripts/env.vercel.example .env.vercel   # isi URL cloud, jangan commit
bash scripts/vercel-go-live.sh            # env → db push → seed → deploy
vercel deploy --prod --yes --archive=tgz  # deploy ulang tanpa seed
```

Upload CLI untuk repo besar: pakai `--archive=tgz` dan `.vercelignore`.

Build di Vercel: `npx prisma generate && npm run build` (`vercel.json`).

Env wajib: `DATABASE_URL` (pooled), `DIRECT_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` — lihat `.env.example`.

## Langkah deploy (T5.6)

1. Database
   - Buat Postgres (region dekat pengguna, misalnya Singapore).
   - Salin pooled `DATABASE_URL` dan direct `DIRECT_URL` dari panel provider.
   - Pada Prisma Postgres atau runtime serverless, tambahkan parameter pool jika provider menyarankan, misalnya `?connection_limit=1` per instance Vercel.

2. Schema dan seed (sekali)
   - Dari mesin lokal dengan `.env` staging/production:
     ```bash
     npx prisma db push
     npx prisma db seed
     npm run check:jurnal-balance
     ```
   - Seed membuat akun demo (`prisma/seed.js`); ganti sandi sebelum go-live nyata.

3. Vercel — environment variables

   | Variabel | Wajib | Catatan |
   | --- | --- | --- |
   | `DATABASE_URL` | ya | Pooled / connection string runtime |
   | `DIRECT_URL` | ya | Migrasi dan Prisma CLI |
   | `NEXTAUTH_URL` | ya | `https://<domain-anda>` |
   | `NEXTAUTH_SECRET` | ya | `openssl rand -base64 32` |
   | `AUDIT_BYPASS_RBAC` | jangan true | Hanya dev lokal |
   | `KOKONUS_PRELAUNCH_RBAC` | opsional `true` | Pre-launch: semua role boleh `/owner/*`; **matikan sebelum go-live** |

4. Build
   - Framework: Next.js (auto).
   - Build command: `npm run build` (default).
   - Install: `npm clean-install` atau default.

5. Verifikasi pasca-deploy
   - Login Owner, Admin, dan Petani (akun seed atau production).
   - Pastikan env Vercel tidak memakai bypass RBAC (`npm run check:audit-env` sudah di CI).
   - Smoke manual: filter jurnal, petani pindah fase, grafik dashboard Owner.

## Checklist keamanan (T5.6)

- [ ] HTTPS only (default Vercel).
- [ ] `NEXTAUTH_SECRET` unik per environment.
- [ ] Tidak commit `.env`; rahasia hanya di Vercel.
- [ ] RBAC aktif (`middleware.ts`); tanpa audit bypass.
- [ ] Sandi demo diganti atau akun demo dinonaktifkan sebelum sidang production.

## Pelatihan enam pengguna (T5.9)

Agenda dan checklist go-live: [`docs/testing/panduan-uji-dan-demo.md`](../testing/panduan-uji-dan-demo.md#pelatihan-go-live-t59).

## FINDING-01 — pool DB lambat (issue [#50](https://github.com/sapikkk/muhammadsyafiq213510100/issues/50))

Status: mitigasi kode selesai; hosting production tetap keputusan PO.

### Gejala

- Query 10–50 detik pada dev remote (`pooled.db.prisma.io` atau Supabase jauh).
- Error `P2024`: timed out fetching connection from pool (`connection_limit` default kecil).

### Mitigasi di kode

| Lapisan | File | Perilaku |
| --- | --- | --- |
| Retry global | `lib/prisma.ts` | Satu ulang query pada `P2024` (+ jeda 250 ms, retry kedua 500 ms) |
| Transaksi panen | `lib/siklus-produksi.ts` | Timeout transaksi semai 60s |
| UI | `app/error.tsx` | Tombol Coba lagi |
| Registrasi petani | `lib/...` | Pesan ramah jika pool sibuk |

### Connection string (`.env`, tidak di-commit)

Contoh parameter Prisma (sesuaikan provider):

```text
postgresql://USER:PASS@HOST:5432/DB?connection_limit=5&pool_timeout=30
```

- `pool_timeout`: detik menunggu koneksi dari pool (dev remote: 30–60).
- `connection_limit`: serverless Vercel sering 1 per instance; naikkan hanya jika limit provider jelas.
- `DIRECT_URL`: wajib untuk migrate/push saat runtime memakai pooled URL.

### Rekomendasi demo sidang

1. Postgres lokal + `npm run seed` + `npm run seed:demo` — [`docs/testing/panduan-uji-dan-demo.md`](../testing/panduan-uji-dan-demo.md#data-demo-sidang).
2. Production: region dekat pengguna, atau Prisma Accelerate.
3. UAT: ulang aksi jika respons 500 pertama; cek hasil di DB/UI.

Tidak ada test otomatis latensi jaringan. Smoke CI memakai Postgres service di GitHub Actions (pool lokal, bukan reproduksi FINDING-01).

Terakhir diperbarui: 2026-10-12 · Sprint 5 closeout.
