# Testing — Kokonus Farm

Referensi dan alat uji proyek. Skill agent ada di `.agents/` (lokal, tidak di-push).

## Playwright (E2E)

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

Spec awal: `e2e/smoke.spec.ts` (login, dashboard admin, jurnal, stok rendah).

CI: workflow `e2e.yml` (Postgres service, migrate, seed, `next start` + Playwright).

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
