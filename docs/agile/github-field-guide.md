# Panduan GitHub Project #1

URL: https://github.com/users/sapikkk/projects/1

## Kolom

| Field | Arti | Sumber kebenaran |
|-------|------|------------------|
| **Status** | Todo / In progress / Done | Sinkron dengan issue open/closed + partial US |
| **Iteration** | Sprint 1–5 + rentang tanggal | `docs/agile/timeline-registry.md` |
| **Priority** | P0 / P1 / P2 | PRD (HIGHEST → P0) — *belum diisi massal* |
| **Size** | XS–XL | Opsional story points |
| **Labels (issue)** | `sprint-2`, `blackbox-test`, `finding` | Filter di repo |

## Mapping issue → sprint (PRD)

| Label / Milestone | Issue |
|-------------------|-------|
| sprint-1 | #2–#9 |
| sprint-2 | #11–#28, #21–#23 (US2.6 → sprint-4 milestone) |
| sprint-3 | #29–#33 |
| sprint-4 | #34–#38, #10, #16 |
| sprint-5 | #39–#45 |

## Views disarankan

1. **By Iteration** — lihat progres per sprint.  
2. **Board by Status** — daily standup.  
3. **Filter `label:blackbox-test`** — US dengan notulensi uji.

## Repo vs Project

- **Issue** = kartu US + diskusi + close date.  
- **Project** = status + iteration + prioritas visual.  
- **Git `docs/agile/`** = AC/DoD lengkap + audit trail version control.
