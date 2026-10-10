# PHASE 6.3 — QA & reliability (draft)

## Manual (audit mode ON)

- [x] Semua link sidebar audit → 200, tanpa white screen — 35 route, lokal 2026-10-10 (`AUDIT_BYPASS_RBAC=true`; opsional `e2e/audit-nav.spec.ts`)
- [x] Mobile menu buka/tutup + navigasi menutup drawer — `e2e/smoke.spec.ts` (CI)
- [x] Toast: form utama (jurnal, inventaris, produksi petani, prive, harvest approve)
- [x] DataTable: cari di pelanggan, inventaris, varietas, owner pengguna — e2e (CI); pagination multi-halaman — uji PO jika data > pageSize
- [x] 404 logged-in → sidebar + tombol dashboard — e2e (CI)

## Automated

- [x] `npm run typecheck` / `lint` / `check:banned-ui` / `check:audit-env` / `check:legacy-api-json` (lokal 2026-10-10)
- [x] `npm run build`
- [x] `e2e/smoke.spec.ts` — login admin + jurnal + stok rendah (butuh DB seed & dev server)
- [x] `npm run test:e2e` di CI — workflow `.github/workflows/e2e.yml` (hijau run 38010555738)

## Failure paths (todo)

Network offline banner, API 403/500 → toast; dokumentasi hasil di baris bawah file ini.
