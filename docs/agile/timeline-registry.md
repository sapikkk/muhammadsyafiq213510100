# Timeline sprint — registry

Durasi: **2 minggu / sprint · 10 hari kerja**.  
**Actual start** = kapan sprint benar-benar dimulai di repo (bukan jadwal PRD awal).

| Sprint | Iteration (Project #1) | Actual start | Target selesai | Scope | Progress (issue) |
|--------|------------------------|--------------|----------------|-------|------------------|
| **1** | Sprint 1 · Fondasi & autentikasi | 2026-10-07 | 2026-10-20 | US1.1–1.8 | **Done** (#2–#9) |
| **2** | Sprint 2 · Akuntansi, produksi, inventaris | 2026-10-08 | 2026-10-21 | US2.1–2.5, US3.1–3.7, US4.1–4.5 | **Done** (#11–#28) |
| **3** | Sprint 3 · Penjualan & pengiriman | 2026-10-09* | 2026-11-04 | US5.1–5.5 | **Done** (#29–#33) |
| **4** | Sprint 4 · Dashboard & ekspor | 2026-10-09* | 2026-11-18 | US6.1–6.5, US1.9, US2.6 | **Done** (#10, #16, #34–#38) |
| **5** | Sprint 5 · QA & go-live | 2026-10-10 | 2026-12-02 | T5.1–T5.6, T5.9 | **Done** (#39–#45, PR #83) |

\* Delivery merge stack **2026-10-09** (PR #69–#78); iteration Project bisa diset overlap S2→S4.

> **Project #1:** sesuaikan rentang tanggal Iteration ke kolom *Actual start* / *Target selesai* (API terbatas — edit UI).

## Velocity & retro

| Sprint | Points rencana (kerangka) | Points selesai | Retro |
|--------|---------------------------|----------------|-------|
| 1 | 34 | **29** (US1.1–1.8) | [sprint-01-retro.md](./retro/sprint-01-retro.md) |
| 2 | 55 | **55** (US scope S2) | _isi setelah retro formal_ |
| 3 | 34 | **34** | _—_ |
| 4 | 21 | **21** | _—_ |
| 5 | 13 QA | **13** (T5.x merged) | _—_ |

## Milestone GitHub

| Milestone | Due (target) | Issue |
|-----------|--------------|-------|
| Sprint 1 — Fondasi | 2026-10-20 | #2–#9 |
| Sprint 2 — Operasi | 2026-10-21 | #11–#28 |
| Sprint 3 — Penjualan | 2026-11-04 | #29–#33 |
| Sprint 4 — Laporan | 2026-11-18 | #10, #16, #34–#38 |
| Sprint 5 — QA | 2026-12-02 | #39–#45 |

## Rilis produk

| Tag | Tanggal | Catatan |
|-----|---------|---------|
| v1.12.0 | 2026-10-10 | Audit global (#80) + Sprint 5 QA (#83) + home progress (#85) |
| prod | 2026-10-10 | [kokonusfarm.vercel.app](https://kokonusfarm.vercel.app) |
| v1.8–v1.11 | 2026-10-09 | US5–US6, US1.9, US2.6 |

Terakhir diperbarui: **2026-10-10** — [audit-log.md](./audit-log.md).
