# Sprint 5 — QA, usability, go-live

**Iteration (target):** selesai target **2026-12-02**  
**Delivery:** PR [#83](https://github.com/sapikkk/muhammadsyafiq213510100/pull/83) merged · production [kokonusfarm.vercel.app](https://kokonusfarm.vercel.app)

## Backlog issue

| ID | Issue | Status | Deliverable repo |
|----|-------|--------|------------------|
| T5.1 | [#39](https://github.com/sapikkk/muhammadsyafiq213510100/issues/39) | Done | UX pindah fase atas halaman; `e2e/sprint5-usability.spec.ts` |
| T5.2 | [#40](https://github.com/sapikkk/muhammadsyafiq213510100/issues/40) | Done | Filter jurnal + ringkasan filter; e2e T5.2 |
| T5.3 | [#41](https://github.com/sapikkk/muhammadsyafiq213510100/issues/41) | Done | Shortcut HP Owner; e2e T5.3 |
| T5.4 | [#42](https://github.com/sapikkk/muhammadsyafiq213510100/issues/42) | Done | `npm run check:jurnal-balance`; CI e2e |
| T5.5 | [#43](https://github.com/sapikkk/muhammadsyafiq213510100/issues/43) | Done | Retry P2024 + jeda di `lib/prisma.ts`; [#50](https://github.com/sapikkk/muhammadsyafiq213510100/issues/50) doc |
| T5.6 | [#44](https://github.com/sapikkk/muhammadsyafiq213510100/issues/44) | Done | [`docs/deployment/vercel-go-live.md`](../../deployment/vercel-go-live.md), [`docs/deployment/vercel.md`](../../deployment/vercel.md), `check:production-env` |
| T5.9 | [#45](https://github.com/sapikkk/muhammadsyafiq213510100/issues/45) | Done* | [`docs/testing/pelatihan-6-pengguna.md`](../../testing/pelatihan-6-pengguna.md) |
| T5.10 | — | Done | UX flow + perf **v1.28.0** — [`UX-FLOW-PERF-REPORT.md`](../UX-FLOW-PERF-REPORT.md), [`FLOW-NAV.md`](../../ux/FLOW-NAV.md) |

\* T5.9: materi pelatihan siap; sesi live 6 pengguna = aktivitas PO (post-merge).

## Urutan eksekusi (selesai)

```text
T5.1 → T5.2 → T5.3 → T5.4 (e2e + audit script)
T5.5 (pool / bugfix temuan)
T5.6 (deploy prod + env hygiene)
T5.9 (materi pelatihan)
```

## Testing

- `docs/testing/README.md`, `docs/uji-blackbox.md` (section Sprint 5)
- Seed demo: `E2E-S5-DEMO` — `prisma/seed-siklus-demo.js`, reset `scripts/reset-e2e-siklus.js`
- Halaman `/`: progress Project #1 — `npm run sync:agile-progress` (PR [#85](https://github.com/sapikkk/muhammadsyafiq213510100/pull/85))

Terakhir diperbarui: **2026-10-10**.
