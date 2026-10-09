# Global audit — ringkasan (draft)

| Fase | Status | Catatan |
|------|--------|---------|
| 0 Inventory & baseline | **Done** | `00-inventory.md`, `01-baseline.md` |
| 1 RBAC audit bypass | **Done** | `rbac.md`, `lib/rbac.ts`, CI env guard |
| 2 Flat B&W UI | **Partial** | Token + `ui/*` + chart grayscale; sidebar global & error shell belum |
| 3 DataTable / CRUD | **Blocked** | TanStack Table belum dipasang |
| 4 Performance | **Partial** | Session ~300ms setelah warm; belum `perf-before-after.md` |
| 5 Errors / toaster | **Partial** | Sonner + `lib/notify`; belum wire semua form; `logger.ts` server only |
| 6 Dept audits | **Partial** | `frontend.md` started; backend/qa/security pending |
| 7 Verification | **Partial** | typecheck/lint/build OK on branch |

## Rekomendasi merge

Setelah Phase 2 sidebar + minimal toaster wiring + 1 e2e smoke: buka PR dari `chore/global-audit-bw-refactor`.

## Network Cursor

Proxy yang mem-buffer streaming dapat gagal **Agent/Chat** di diagnostics; tidak menghalangi audit kode lokal.
