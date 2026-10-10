# PHASE 6.3 — QA & reliability (draft)

## Manual (audit mode ON)

- [ ] Semua link sidebar audit → 200, tanpa white screen
- [ ] Mobile menu buka/tutup + navigasi menutup drawer
- [x] Toast: form utama (jurnal, inventaris, produksi petani, prive, harvest approve)
- [ ] DataTable: search + pagination di pengguna, pelanggan, inventaris, varietas
- [ ] 404 logged-in → sidebar + tombol dashboard

## Automated

- [ ] `npm run typecheck` / `lint` / `check:banned-ui` / `check:audit-env` / `check:legacy-api-json`
- [ ] `npm run build` (clean `.next`)
- [x] `e2e/smoke.spec.ts` — login admin + jurnal + stok rendah (butuh DB seed & dev server)
- [x] `npm run test:e2e` di CI — workflow `.github/workflows/e2e.yml`

## Failure paths (todo)

Network offline banner, API 403/500 → toast; dokumentasi hasil di baris bawah file ini.
