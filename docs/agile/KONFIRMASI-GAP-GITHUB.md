# Konfirmasi gap — GitHub vs kebutuhan pelacakan

Dokumen ini untuk **Anda (PO)** menandai setuju / minta ubah. Centang di issue atau balas di chat.

## Sudah ada di GitHub Project #1

- [x] Kolom **Status** (Todo / In progress / Done)
- [x] Kolom **Iteration** (Sprint 1–5 + tanggal)
- [x] Kolom Priority, Size, Estimate (kosong kebanyakan issue)
- [x] Issue #1–#45 + findings #50, #61, #63

## Baru ditambahkan (2026-10-09)

- [x] **Milestone** repo: Sprint 1–5 (due date selaras iteration)
- [x] **Label** `sprint-1`, `sprint-3`, `sprint-4`, `sprint-5` ( `sprint-2` sudah ada)
- [x] **Registry git** `docs/agile/` — AC/DoD/timeline/blackbox link
- [x] Template issue **user-story.md**

## Masih kurang / perlu konfirmasi Anda

| # | Gap | Rekomendasi | Konfirmasi PO |
|---|-----|-------------|---------------|
| 1 | **Body issue #2–#45** kebanyakan kosong (tanpa AC/DoD) | Backfill dari `docs/agile/sprints/*` per US, atau cukup puas dengan docs git saja? | ☐ Docs git cukup ☐ Isi ulang setiap issue |
| 2 | **Milestone di issue** belum terpasang otomatis di semua # | Script `assign-milestones.sh` — jalankan setelah Anda setuju mapping | ☐ Setuju jalankan ☐ Manual |
| 3 | **Iteration di Project** — belum semua item ter-assign | Jalankan `assign-project-iterations.sh` | ☐ Setuju ☐ Manual di UI |
| 4 | **Velocity & retro** Sprint 1 kosong | Isi tanggal demo + points di `timeline-registry.md` | ☐ PO isi sendiri ☐ Agent isi setelah demo |
| 5 | **US2.3** — issue open, board In progress, AC penuh belum | Tutup issue hanya setelah US2.5 + override? | ☐ Tetap open ☐ Close dengan catatan partial |
| 6 | **Review developer (DoD #2)** | Formal PR review di GitHub untuk setiap US? | ☐ Ya ☐ Cukup self-review skripsi |
| 7 | **Start date Sprint 2** iteration 2026-10-21 vs kode mulai 2026-10-07 | Sesuaikan iteration ke **actual start**? | ☐ Biarkan PRD ☐ Geser tanggal |
| 8 | **Issue US1.9 & US2.6** di Sprint 4 PRD tapi milestone Sprint 4 — OK? | | ☐ OK |
| 9 | **Sub-issues / checklist** di GitHub Tasks | Aktifkan tasklists di template US? | ☐ Ya ☐ Tidak |

## Cara memantau ke depan

1. Setiap selesai US: commit → update baris di `docs/agile/sprints/sprint-XX.md` + baris baru `audit-log.md`.  
2. Tutup issue + Project **Done**.  
3. Snapshot mingguan: `git log --oneline --since=1.week` + board screenshot (opsional).

Terakhir diperbarui: **2026-10-09**.
