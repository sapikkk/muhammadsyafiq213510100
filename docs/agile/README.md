# Pelacakan Agile — Kokonus Farm

Pusat kontrol progres skripsi: **timeline sprint**, **issue GitHub**, **AC/DoD**, **bukti teknis**, dan **log audit** (seperti version control untuk manajemen proyek).

## Mulai dari sini

| Dokumen | Isi |
|---------|-----|
| [timeline-registry.md](./timeline-registry.md) | 5 sprint: tanggal, goal, velocity, link board |
| [definition-of-done.md](./definition-of-done.md) | DoD story & sprint (PRD §10) |
| [sprints/sprint-01-fondasi.md](./sprints/sprint-01-fondasi.md) | Sprint 1 — detail per US |
| [sprints/sprint-02-operasi.md](./sprints/sprint-02-operasi.md) | Sprint 2 — akuntansi, produksi, inventaris |
| [sprints/sprint-03-penjualan.md](./sprints/sprint-03-penjualan.md) | Sprint 3 — rencana |
| [sprints/sprint-04-laporan.md](./sprints/sprint-04-laporan.md) | Sprint 4 — rencana |
| [sprints/sprint-05-qa.md](./sprints/sprint-05-qa.md) | Sprint 5 — QA & go-live |
| [audit-log.md](./audit-log.md) | **Log kronologis** setiap perubahan status (commit di git) |
| [KONFIRMASI-GAP-GITHUB.md](./KONFIRMASI-GAP-GITHUB.md) | Yang belum lengkap di GitHub — **butuh konfirmasi PO** |
| [github-field-guide.md](./github-field-guide.md) | Cara baca Project #1 (Status, Iteration, Priority) |

**Board live:** [GitHub Project #1 — kerangka kerja sapik](https://github.com/users/sapikkk/projects/1)  
**PRD:** [docs/prd-agile-kokonus-farm.md](../prd-agile-kokonus-farm.md)  
**Blackbox:** [docs/uji-blackbox.md](../uji-blackbox.md)

## Alur kerja (acuan `sw-agiledevelopment`)

1. **Satu US = satu issue** `#N` + label `sprint-X` + field **Iteration** di Project.
2. Sebelum merge: isi **AC** dan **DoD** (template issue / notulensi).
3. Setelah merge: update `audit-log.md`, baris US di file sprint, tutup issue, Project → **Done**.
4. Uji blackbox → salin ke `uji-blackbox.md` atau issue notulensi.

Skill lokal (tidak di-commit): `.agents/skills/sw-agiledevelopment/`, `PMOSkills`.

## Perintah cepat

```bash
gh issue list --repo sapikkk/muhammadsyafiq213510100 --label sprint-1
gh project item-list 1 --owner sapikkk --limit 50
```

Setelah ubah kode: `graphify update .` (lihat `AGENTS.md`).
