# Sprint 5 — QA, usability, go-live

**Iteration (target):** selesai target **2026-12-02**  
**Branch:** `feat/sprint-5-qa` · PR [#83](https://github.com/sapikkk/muhammadsyafiq213510100/pull/83)

## Backlog issue

| ID | Issue | Deliverable repo |
|----|-------|------------------|
| T5.1 | [#39](https://github.com/sapikkk/muhammadsyafiq213510100/issues/39) | UX pindah fase atas halaman; `e2e/sprint5-usability.spec.ts` |
| T5.2 | [#40](https://github.com/sapikkk/muhammadsyafiq213510100/issues/40) | Filter jurnal + ringkasan filter; e2e T5.2 |
| T5.3 | [#41](https://github.com/sapikkk/muhammadsyafiq213510100/issues/41) | Shortcut HP Owner; e2e T5.3 |
| T5.4 | [#42](https://github.com/sapikkk/muhammadsyafiq213510100/issues/42) | `npm run check:jurnal-balance`; CI e2e |
| T5.5 | [#43](https://github.com/sapikkk/muhammadsyafiq213510100/issues/43) | Retry P2024 + jeda di `lib/prisma.ts`; [#50](https://github.com/sapikkk/muhammadsyafiq213510100/issues/50) doc |
| T5.6 | [#44](https://github.com/sapikkk/muhammadsyafiq213510100/issues/44) | [`docs/deployment/vercel-go-live.md`](../../deployment/vercel-go-live.md), `check:production-env` |
| T5.9 | [#45](https://github.com/sapikkk/muhammadsyafiq213510100/issues/45) | [`docs/testing/pelatihan-6-pengguna.md`](../../testing/pelatihan-6-pengguna.md) |

## Urutan eksekusi

```text
T5.1 → T5.2 → T5.3 → T5.4 (e2e + audit script)
T5.5 (pool / bugfix temuan)
T5.6 (deploy doc + env hygiene)
T5.9 (pelatihan + checklist)
```

## Testing

- `docs/testing/README.md`, `docs/uji-blackbox.md` (section Sprint 5)
- Seed demo: `E2E-S5-DEMO` — `prisma/seed-siklus-demo.js`, reset `scripts/reset-e2e-siklus.js`

Terakhir diperbarui: **2026-10-10**.
