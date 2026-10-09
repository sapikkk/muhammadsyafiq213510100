# Global audit — ringkasan (draft)

| Fase | Status | Catatan |
|------|--------|---------|
| 0 Inventory & baseline | **Done** | `00-inventory.md`, `01-baseline.md` |
| 1 RBAC audit bypass | **Done** | `rbac.md`, `lib/rbac.ts`, CI env guard |
| 2 Flat B&W UI | **Partial** | Token + `ui/*`; `SessionShell` on pengaturan/ganti-sandi/404/loading |
| 3 DataTable / CRUD | **Partial** | `@tanstack/react-table` + `DataTable`; pilot `/owner/pengguna` |
| 4 Performance | **Partial** | Session ~300ms setelah warm; belum `perf-before-after.md` |
| 5 Errors / toaster | **Partial** | Sonner + `useActionToast` on jurnal/akun/pengaturan/prive |
| 6 Dept audits | **Partial** | `frontend.md`, `backend.md`; qa/security pending |
| 7 Verification | **Partial** | typecheck/lint/build OK on branch |

## Rekomendasi merge

Setelah Phase 2 sidebar + minimal toaster wiring + 1 e2e smoke: buka PR dari `chore/global-audit-bw-refactor`.

## Network Cursor

Proxy yang mem-buffer streaming dapat gagal **Agent/Chat** di diagnostics; tidak menghalangi audit kode lokal.
