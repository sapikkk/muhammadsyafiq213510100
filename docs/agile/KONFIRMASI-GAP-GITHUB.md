# Keputusan PO — pelacakan GitHub

Tercatat: **2026-10-09** · sumber kebenaran proses: `docs/agile/`

## Keputusan (final)

| # | Topik | Keputusan PO |
|---|--------|----------------|
| 1 | Partial & keterbacaan | Semua US **boleh partial**; baca lengkap di `docs/agile/sprints/*` + filter Project (Iteration, label `sprint-X`, `progress-partial`) |
| 2 | Issue open/close | **Tetap open** sampai AC selesai; tutup dengan **catatan partial** jika ada sisa scope (lihat [partial-delivery-policy.md](./partial-delivery-policy.md)) |
| 3 | Tanggal iteration | **Actual start** (bukan tanggal PRD lama) — lihat [timeline-registry.md](./timeline-registry.md) |
| 4 | Retro & velocity | **Agent isi** retro + velocity; Sprint 1 → [retro/sprint-01-retro.md](./retro/sprint-01-retro.md) |
| 5 | DoD review | **Wajib** ≥1 approving review GitHub pada setiap PR US |
| 6 | Tasklist | **Ya** — template [user-story.md](../../.github/ISSUE_TEMPLATE/user-story.md) memakai tasklist AC + DoD |
| 7 | Konteks proyek | Pembahasan operasional **profesional produk**; hindari framing akademik/sidang di registry agile, README, AGENTS, notulensi uji |

## Infrastruktur GitHub (status)

- [x] Project #1: Status, Iteration, Priority, Size
- [x] Milestone Sprint 1–5 + label `sprint-1` … `sprint-5`
- [x] Label `progress-partial`
- [x] Skrip milestone & iteration assign
- [ ] **Iteration dates di Project UI** — sesuaikan manual ke kolom *Actual start* di timeline-registry (API Project terbatas)

## Backlog opsional (belum diputuskan massal)

| Gap | Catatan |
|-----|---------|
| Body issue #2–#45 kosong | AC/DoD lengkap di git; backfill issue **per US saat dikerjakan** (tasklist dari template) |

## Cara memantau

1. Selesai / partial: update sprint doc + `audit-log.md` + issue tasklist/label.  
2. Filter: `is:issue label:sprint-2 label:progress-partial` atau view **By Iteration** di Project #1.  
3. Merge US: PR review wajib → merge → board Done hanya jika scope issue selesai.

Terakhir diperbarui: **2026-10-09**.
