# PHASE 6.4 — Security & integrity (draft)

| Sev | Area | Temuan | Status |
|-----|------|--------|--------|
| Info | `AUDIT_BYPASS_RBAC` | Hanya dev + `NODE_ENV !== production` | **Done** + CI `check:audit-env` |
| Info | API RBAC | `isRoleAllowed` / `requireApiRole` | **Done** Phase 1 |
| Medium | API errors | Kontrak `{ ok, error.code }` | **Done** — semua `app/api/*` JSON error; CI `check:legacy-api-json` |
| Low | IDOR | Belum diaudit sistematis per entity | **Todo** — uji akses id lintas user |
| Low | Rate limit | Tidak ada on login/reset | **Deferred** |

## Produksi

Pastikan `.env` production **tanpa** `AUDIT_BYPASS_RBAC=true`. Middleware dan API harus ditest dengan bypass **off** sebelum merge PR audit.
