# Definition of Done — Kokonus Farm

Sumber: [PRD §10](../prd-agile-kokonus-farm.md#10-definition-of-done).

## Per user story (wajib kecuali bertanda PENTING)

| # | Kriteria | Verifikasi |
|---|----------|------------|
| 1 | Semua AC terpenuhi | Tabel AC di issue / sprint doc = Terpenuhi |
| 2 | Review ≥ 1 developer | PR reviewed atau catatan PO |
| 3 | TypeScript bersih | `npm run typecheck` |
| 4 | ESLint + Prettier bersih | `npm run lint`, `npm run format:check` |
| 5 | Tidak ada `console.error`/`warn` di production | Review diff / CI |
| 6 | API: error handling + status HTTP benar | `docs/api.md` + uji curl |
| 7 | UI responsif 375px dan desktop | Uji browser / notulensi |
| 8 | Migrasi terdokumentasi | `prisma migrate` / catatan push |
| 9 | Seed di-update bila perlu | `prisma/seed*.js` |
| 10 | **(PENTING)** Dokumentasi API | Entri di `docs/api.md` |
| 11 | **(PENTING)** Edge/error state informatif | Empty, 403, validasi form |
| 12 | Tidak ada data bisnis hardcode di UI | Konstanta demo hanya seed/env |

## Per sprint

- Demo ke PO (Sprint Review).
- Retro tercatat (boleh di `audit-log.md`).
- Velocity tercatat di [timeline-registry.md](./timeline-registry.md).
- Staging/demo tanpa crash P1.
- Tidak ada bug P1 terbuka untuk scope sprint.

## Template notulensi

Gunakan [.github/ISSUE_TEMPLATE/notulensi-us.md](../../.github/ISSUE_TEMPLATE/notulensi-us.md) atau issue template **User story (US)**.
