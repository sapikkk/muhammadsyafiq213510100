# Panduan GitHub Project #1

URL: https://github.com/users/sapikkk/projects/1

## Kolom

| Field | Arti | Sumber kebenaran |
|-------|------|------------------|
| **Status** | Todo / In progress / Done | Open + `progress-partial` = partial; Done = AC issue selesai atau close dengan catatan partial |
| **Iteration** | Sprint 1–5 + rentang tanggal | `docs/agile/timeline-registry.md` |
| **Priority** | P0 / P1 / P2 | PRD (HIGHEST → P0); **US produk #2–#38 + UX #61 diisi** |
| **Size** | XS–XL | Dipetakan dari Estimate (5→M, 8→L, 13→XL) untuk US Sprint 3–4 |
| **Labels (issue)** | `sprint-1`…`sprint-5`, `progress-partial`, `blackbox-test`, `finding` | Filter di repo |

## Iteration — actual start (PO 2026-10-09)

Sesuaikan **start date** setiap Iteration di Project settings ke [timeline-registry.md](./timeline-registry.md) (Sprint 2 mulai **2026-10-08**, bukan 2026-10-21 PRD lama).

## Mapping issue → sprint (PRD)

| Label / Milestone | Issue |
|-------------------|-------|
| sprint-1 | #2–#9 |
| sprint-2 | #11–#28, #21–#23 (US2.6 → sprint-4 milestone) |
| sprint-3 | #29–#33 |
| sprint-4 | #34–#38, #10, #16 |
| sprint-5 | #39–#45 |

## Views disarankan

1. **By Iteration** — progres per sprint (actual start).  
2. **Board by Status** — daily standup.  
3. **Filter `label:progress-partial`** — US belum 100% AC.  
4. **Filter `label:blackbox-test`** — notulensi uji.

## Repo vs Project

- **Issue** = kartu US + diskusi + close date.  
- **Project** = status + iteration + prioritas visual.  
- **Git `docs/agile/`** = AC/DoD lengkap + audit trail version control.
