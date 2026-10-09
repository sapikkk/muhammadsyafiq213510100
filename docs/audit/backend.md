# PHASE 6.2 — Backend / API audit log

| Sev | Endpoint / area | File | Temuan | Fix / status |
|-----|-----------------|------|--------|----------------|
| Medium | `GET /api/reports/*` | `lib/api-response.ts` | Respons ad hoc `{ error }` / raw JSON | **Partial:** `monthly-summary`, `cash-flow`, `cost-breakdown` → `{ ok, data \| error }` |
| Low | Remaining `app/api/*` | various | Kontrak lama `{ error: string }` | **Deferred** — migrasi bertahap |
| Low | Server actions | `app/actions/*` | Return `{ error }` tanpa kode | **Deferred** — selaraskan setelah API stabil |
| Info | RBAC | `lib/rbac.ts` | Bypass dev terpusat | **Done** Phase 1 |

## Verifikasi

- `withApiHandler` menangkap throw → `INTERNAL_ERROR` 500 + `logger.error`
- Domain errors (`CashFlowError`, dll.) → `apiFail` dengan kode spesifik

## Follow-up

- `requireApiRole` + `apiFail` di route CRUD (`accounts`, `inventory`, `transactions`)
- Zod validasi query/body per endpoint (belum ada dependency zod)
