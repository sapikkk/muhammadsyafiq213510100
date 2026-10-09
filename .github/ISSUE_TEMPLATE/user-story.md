---
name: User story (US)
about: Backlog US dengan AC, DoD, tasklist, dan jejak teknis — Kokonus Farm
title: "[USx.y] "
labels: []
---

## Sprint · Epic

- **Sprint:** (1–5)
- **Epic:** EPIC-
- **PRD:** [docs/prd-agile-kokonus-farm.md](../docs/prd-agile-kokonus-farm.md)
- **Sprint doc:** [docs/agile/sprints/](../docs/agile/sprints/)
- **Progress partial:** [docs/agile/partial-delivery-policy.md](../docs/agile/partial-delivery-policy.md)

## User story

Sebagai …, saya ingin …, agar …

## Progress

- **Status:** Todo / In progress / Done
- **Persen AC:** _0%_ (_0_/_N_ AC)
- **Label:** tambahkan `progress-partial` jika belum 100%

## Acceptance criteria (tasklist)

- [ ] AC1
- [ ] AC2
- [ ] AC3

## Definition of Done

Lihat [definition-of-done.md](../docs/agile/definition-of-done.md).

### DoD checklist (tasklist)

- [ ] Semua AC terpenuhi **atau** catatan partial + sisa scope
- [ ] PR dengan **≥1 approving review** (wajib)
- [ ] `npm run typecheck` + lint
- [ ] Notulensi / `docs/uji-blackbox.md` bila ada uji
- [ ] `docs/api.md` jika ada API baru
- [ ] Seed / migrasi terdokumentasi

## Rencana teknis

| Area | Path / endpoint |
|------|-----------------|
| UI | |
| API | |
| Lib | |

**Branch:** `feat/usx.y-nama` · **PR:** #

## Penutupan issue

- [ ] Project #1 → Done (hanya jika scope issue selesai)
- [ ] Baris di `docs/agile/sprints/sprint-XX-*.md`
- [ ] Entri `docs/agile/audit-log.md`

### Catatan partial (isi jika menutup sebelum 100% AC)

```markdown
## Status partial — YYYY-MM-DD
- Progress: …
- Selesai: …
- Sisa: … (#issue atau US lanjutan)
- Bukti: PR #…
```
