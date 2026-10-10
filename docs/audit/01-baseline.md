# Baseline — before global audit (PHASE 0)

Recorded: 2026-10-09 · Node/npm from dev machine · Branch `chore/global-audit-bw-refactor` at `main` + docs merge (`ae8663a`).

## Commands

| Command | Result |
|---------|--------|
| `npm ci` | OK (audit advisories — not blocking) |
| `npm run typecheck` | **PASS** |
| `npm run lint` | **PASS** (ESLint clean) |
| `npm run build` | **FAIL** first run (`PageNotFoundError: /_document`) with stale `.next` |
| `npm run build` (after `rm -rf .next`) | **PASS** |
| `npm run test:e2e` | **Not run** in PHASE 0 (requires dev server; single smoke spec exists) |

## CI (`.github/workflows/check.yml`)

Runs: `npm clean-install`, `lint`, `typecheck`. **Does not run `build` or e2e** — local build failure mode above would not catch in CI.

## Pre-existing gaps (input to later phases)

- No `global-error.tsx`; root `error.tsx` / `not-found.tsx` outside sidebar shell.
- No centralized API error contract or toaster (`sonner` not in dependencies).
- RBAC on API is handler-by-handler; inventory needed per route (Phase 6.4).
- UI uses shadcn defaults (radius, shadow, destructive red).
- Master prompt requires TanStack Table + zod + RHF — not all installed yet.

## Bundle note

After clean build: shared First Load JS ~87.5 kB; heaviest app routes include `/petani/siklus/[id]` (~125 kB), Recharts on owner routes.

---

Re-run this file after major phases for regression comparison (`perf-before-after.md` in Phase 4).
