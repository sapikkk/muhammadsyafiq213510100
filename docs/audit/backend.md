# PHASE 6.2 — Backend / API audit log

| Sev | Endpoint / area | File | Temuan | Fix / status |
|-----|-----------------|------|--------|----------------|
| Medium | Reports + CRUD read | `lib/api-response.ts` | Respons ad hoc | **Partial:** reports + `accounts` + `inventory` GET/POST |
| Medium | `requireApiRole` | `lib/api-auth.ts` | `{ error }` plain | **Fixed:** `apiFail` UNAUTHORIZED/FORBIDDEN |
| Low | Remaining `app/api/*` | various | Kontrak lama | **Deferred** — `transactions`, dll. |
| Low | Server actions | `app/actions/*` | Return `{ error }` tanpa kode | **Deferred** — selaraskan setelah API stabil |
| Info | RBAC | `lib/rbac.ts` | Bypass dev terpusat | **Done** Phase 1 |

## Verifikasi

- `withApiHandler` menangkap throw → `INTERNAL_ERROR` 500 + `logger.error`
- Domain errors (`CashFlowError`, dll.) → `apiFail` dengan kode spesifik

## Follow-up

- `requireApiRole` + `apiFail` di route CRUD (`accounts`, `inventory`, `transactions`)
- Zod validasi query/body per endpoint (belum ada dependency zod)
