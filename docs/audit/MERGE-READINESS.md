# Merge readiness — branch audit

Branch: `chore/global-audit-bw-refactor` → `main`.

## Gate otomatis (harus hijau)

- `check.yml`: lint, typecheck, `check:audit-env`, `check:banned-ui`, `check:legacy-api-json`, build
- `e2e.yml`: Postgres 16, migrate, seed, Playwright smoke

## Sebelum merge (PO / dev)

1. `.env` production/staging: **tanpa** `AUDIT_BYPASS_RBAC=true`.
2. Uji manual singkat: `docs/audit/07-verification.md` + centang `qa.md`.
3. Review breaking API: klien fetch harus expect `{ ok, data }` (lihat `docs/api.md`).
4. Setelah merge: tag release opsional; backlog US lanjut di sprint terpisah.

## Sengaja tidak masuk PR ini

- Sidebar audit di halaman login (public).
- Playwright matrix mobile (manual QA).
- Refactor server actions ke shape `{ code, message }` (follow-up).
