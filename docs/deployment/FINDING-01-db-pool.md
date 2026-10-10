# FINDING-01 — Pool DB Prisma / Postgres lambat

Issue: [#50](https://github.com/sapikkk/muhammadsyafiq213510100/issues/50) · Status: **mitigasi kode selesai** · infra production = keputusan PO/hosting.

## Gejala

- Query 10–50 detik pada dev remote (`pooled.db.prisma.io` atau Supabase jauh).
- Error `P2024`: timed out fetching connection from pool (`connection_limit` default kecil).

## Mitigasi di kode (Done)

| Lapisan | File | Perilaku |
| --- | --- | --- |
| Retry global | `lib/prisma.ts` | Satu ulang query pada `P2024` (+ jeda 250 ms, kedua retry 500 ms) |
| Transaksi panen | `lib/siklus-produksi.ts` | Timeout transaksi semai 60s |
| UI | `app/error.tsx` | Tombol **Coba lagi** |
| Registrasi petani | `lib/...` | Pesan ramah jika pool sibuk |

## Connection string (`.env` — tidak di-commit)

Contoh parameter Prisma (sesuaikan provider):

```text
postgresql://USER:PASS@HOST:5432/DB?connection_limit=5&pool_timeout=30
```

- **`pool_timeout`**: detik menunggu koneksi dari pool (dev remote: 30–60).
- **`connection_limit`**: serverless Vercel sering **1** per instance; jangan naikkan tanpa paham limit provider.
- **`DIRECT_URL`**: wajib untuk migrate/push saat pakai pooled URL.

Lihat `.env.example` dan [`vercel-go-live.md`](./vercel-go-live.md).

## Rekomendasi demo sidang

1. **Postgres lokal** + `npm run seed` + `npm run seed:demo` — [`docs/testing/DEMO-DATA.md`](../testing/DEMO-DATA.md).
2. Production: region dekat pengguna, atau **Prisma Accelerate**.
3. UAT: ulang aksi jika 500 pertama; verifikasi hasil di DB/UI.

## Verifikasi

Tidak ada test otomatis latensi jaringan. Smoke CI memakai Postgres service di GitHub Actions (pool lokal, bukan reproduksi FINDING-01).

Terakhir diperbarui: 2026-10-10 · closeout **#50**.
