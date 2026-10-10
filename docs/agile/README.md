# Pelacakan Agile — Kokonus Farm

Pusat kontrol progres produk: **timeline sprint**, **issue GitHub**, **AC/DoD**, **partial delivery**, **bukti teknis**, dan **log audit** (version control untuk manajemen proyek).

## Mulai dari sini

| Dokumen | Isi |
|---------|-----|
| [timeline-registry.md](./timeline-registry.md) | 5 sprint: **actual start**, goal, velocity, retro |
| [partial-delivery-policy.md](./partial-delivery-policy.md) | Issue open, catatan partial, filter GitHub |
| [definition-of-done.md](./definition-of-done.md) | DoD story & sprint (PR review **wajib**) |
| [sprints/sprint-01-fondasi.md](./sprints/sprint-01-fondasi.md) | Sprint 1 — detail per US |
| [sprints/sprint-02-operasi.md](./sprints/sprint-02-operasi.md) | Sprint 2 — akuntansi, produksi, inventaris |
| [sprints/sprint-03-penjualan.md](./sprints/sprint-03-penjualan.md) | Sprint 3 — rencana |
| [sprints/sprint-04-laporan.md](./sprints/sprint-04-laporan.md) | Sprint 4 — rencana |
| [sprints/sprint-05-qa.md](./sprints/sprint-05-qa.md) | Sprint 5 — QA & go-live |
| [retro/sprint-01-retro.md](./retro/sprint-01-retro.md) | Retro Sprint 1 |
| [audit-log.md](./audit-log.md) | **Log kronologis** (commit di git) |
| [KONFIRMASI-GAP-GITHUB.md](./KONFIRMASI-GAP-GITHUB.md) | Keputusan PO + gap opsional |
| [github-field-guide.md](./github-field-guide.md) | Project #1: Status, Iteration, filter |

**Board live:** [GitHub Project #1](https://github.com/users/sapikkk/projects/1)  
**PRD:** [docs/prd-agile-kokonus-farm.md](../prd-agile-kokonus-farm.md)  
**Blackbox:** [docs/uji-blackbox.md](../uji-blackbox.md)  
**UCD increment v2 (draft, branch):** [docs/ucd/](../ucd/) · [blueprint](../blueprint/) — akuntansi WIP, Smart Jurnal, DP

## Alur kerja (acuan `sw-agiledevelopment`)

1. **Satu US = satu issue** `#N` + label `sprint-X` + **Iteration** di Project.
2. AC/DoD/tasklist: template issue + baris di `docs/agile/sprints/*`.
3. **Partial:** issue **open** + `progress-partial` sampai AC lengkap; lihat partial-delivery-policy.
4. **Merge:** PR dengan **≥1 approving review** → update sprint doc + `audit-log.md` → Project **Done** jika scope issue selesai.
5. Uji → `docs/uji-blackbox.md`.

## Filter cepat (GitHub)

```bash
gh issue list --repo sapikkk/muhammadsyafiq213510100 --label sprint-2
gh issue list --repo sapikkk/muhammadsyafiq213510100 --label progress-partial
gh project item-list 1 --owner sapikkk --limit 50
```

Setelah ubah kode: `graphify update .` (lihat `AGENTS.md`).
