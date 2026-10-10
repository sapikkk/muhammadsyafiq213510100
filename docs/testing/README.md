# Testing — Kokonus Farm

Referensi dan alat uji proyek. Skill agent ada di `.agents/` (lokal, tidak di-push).

**Data demo sidang:** [`DEMO-DATA.md`](./DEMO-DATA.md) (`npm run seed` + `npm run seed:demo`).

## Playwright (E2E)

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

Spec: `e2e/smoke.spec.ts` — login, jurnal/stok rendah, DataTable cari, 404 + shell, menu mobile.  
Sprint 5: `e2e/sprint5-usability.spec.ts` (T5.1–T5.3); `globalSetup` reset batch `E2E-S5-DEMO`.

Opsional (lokal, **bukan CI**): `AUDIT_BYPASS_RBAC=true npm run test:e2e -- e2e/audit-nav.spec.ts` — crawl Menu (audit).

CI: workflow `e2e.yml` (Postgres service, `prisma db push`, seed, `next start` + Playwright).

## TestCafe (opsional)

```bash
npm run test:testcafe
```

## Submodule referensi

```bash
git submodule update --init --recursive vendor/testing
```

- `vendor/testing/javascript-testing-best-practices` — pola uji JS/TS
- `vendor/testing/test-automation-skills-agents` — panduan otomasi untuk agent

Repo upstream Playwright/TestCafe dipasang lewat npm (bukan clone penuh ke repo).

## Sprint 5

Black-box manual: `docs/uji-blackbox.md`. Audit debit=kredit: T5.4 setelah alur jurnal stabil.
