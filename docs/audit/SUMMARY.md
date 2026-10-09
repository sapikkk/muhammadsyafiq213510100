# Global audit — ringkasan (draft)

| Fase | Status | Catatan |
|------|--------|---------|
| 0 Inventory & baseline | **Done** | `00-inventory.md`, `01-baseline.md` |
| 1 RBAC audit bypass | **Done** | `rbac.md`, `lib/rbac.ts`, CI env guard |
| 2 Flat B&W UI | **Partial** | Token + `ui/*`; `SessionShell` on pengaturan/ganti-sandi/404/loading |
| 3 DataTable / CRUD | **Partial** | + stok rendah, tugas/histori petani, reset sandi; SO ringkas + panel detail |
| 4 Performance | **Partial** | `perf-before-after.md`; session warm ~300ms |
| 5 Errors / toaster | **Partial** | + form admin utama (SO, pelanggan, varietas, infra, biaya, login) |
| 6 Dept audits | **Partial** | + `07-verification.md`; qa/security diperbarui |
| 7 Verification | **Partial** | CI + `check:legacy-api-json`; export auth JSON; e2e belum di CI |

## Rekomendasi merge

Setelah Phase 2 sidebar + minimal toaster wiring + 1 e2e smoke: buka PR dari `chore/global-audit-bw-refactor`.

## Network Cursor

Proxy yang mem-buffer streaming dapat gagal **Agent/Chat** di diagnostics; tidak menghalangi audit kode lokal.
