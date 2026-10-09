# Performance — catatan before/after (audit branch)

Baseline lengkap: `01-baseline.md`. Ringkasan tambahan setelah refactor UI.

## `/api/auth/session`

| Kondisi | Latensi (observasi lokal) |
|---------|---------------------------|
| Cold / pertama setelah `next dev` | ~8–11 s (Prisma + compile route) |
| Warm, navigasi berikutnya | ~250–400 ms |

**Rekomendasi:** ukur di production build (`next start`); jangan pakai cold dev sebagai SLA.

## Halaman daftar (DataTable client)

| Halaman | Perubahan | Dampak |
|---------|-----------|--------|
| Jurnal, inventaris, pelanggan, dll. | TanStack table + filter client | Payload RSC tetap; interaksi filter/pagination tanpa round-trip |
| Active pack, harvest admin, siklus | Migrasi `<ul>` → DataTable | Bundle client sedikit naik; hindari Decimal di client (serialize) |

## Build CI

`npm run build` ditambahkan di workflow audit — waktu ~2–4 menit di runner GitHub (tergantung cache).

## Belum diukur

- Lighthouse / Web Vitals production
- Query N+1 pada laporan owner (reports API)
- Export XLSX/PDF under load
