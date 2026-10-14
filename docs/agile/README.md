# Pelacakan Agile — Kokonus Farm

Dokumen ini melacak **aplikasi** Kokonus Farm (bukan pekerjaan fisik di greenhouse).  
Konteks lapangan: [konteks-lapangan-dan-aplikasi.md](./konteks-lapangan-dan-aplikasi.md) (13 Mei – 14 Agu greenhouse; dari 15 Agu belajar Agile/UCD + kode).

**Board:** [GitHub Project #1](https://github.com/users/sapikkk/projects/1) · teks deskripsi siap salin: [ringkasan-untuk-github-project.md](./ringkasan-untuk-github-project.md)

**Peta semua dokumen:** [docs/README.md](../README.md) · gaya penulisan: [standards/gaya-dokumen.md](../standards/gaya-dokumen.md)

## Mulai dari sini

| Dokumen | Isi |
|---------|-----|
| [us-registry.md](./us-registry.md) | **Registry US** — judul manusia, issue, sprint, status |
| [panduan-user-story.md](./panduan-user-story.md) | Format US bahasa manusia (issue & sprint) |
| [konteks-lapangan-dan-aplikasi.md](./konteks-lapangan-dan-aplikasi.md) | Timeline greenhouse vs fase software |
| [commit-kategori-main.md](./commit-kategori-main.md) | Audit commit `main` per peran (PM, dev, QA, release) |
| [panduan-pesan-commit.md](./panduan-pesan-commit.md) | Judul commit bahasa manusia |
| [github-sync-us.md](./github-sync-us.md) | Sinkron body issue GitHub dari registry |
| [timeline-registry.md](./timeline-registry.md) | 5 sprint: **actual start**, goal, velocity, retro |
| [AC-VERIFIKASI-RISIKO.md](./AC-VERIFIKASI-RISIKO.md) | US closed — yang perlu uji AC ulang (Sprint 5) |
| [partial-delivery-policy.md](./partial-delivery-policy.md) | Issue open, catatan partial, filter GitHub |
| [definition-of-done.md](./definition-of-done.md) | DoD story & sprint (PR review **wajib**) |
| [sprints/sprint-01-fondasi.md](./sprints/sprint-01-fondasi.md) | Sprint 1 — detail per US |
| [sprints/sprint-02-operasi.md](./sprints/sprint-02-operasi.md) | Sprint 2 — akuntansi, produksi, inventaris |
| [sprints/sprint-03-penjualan.md](./sprints/sprint-03-penjualan.md) | Sprint 3 — rencana |
| [sprints/sprint-04-laporan.md](./sprints/sprint-04-laporan.md) | Sprint 4 — rencana |
| [sprints/sprint-05-qa.md](./sprints/sprint-05-qa.md) | Sprint 5 — QA & go-live |
| [retro/sprint-01-retro.md](./retro/sprint-01-retro.md) | Retro Sprint 1 |
| [audit-log.md](./audit-log.md) | **Log kronologis** (commit di git) |
| [UX-FLOW-PERF-REPORT.md](./UX-FLOW-PERF-REPORT.md) | Closeout UX flow + perf **v1.28.0** (sudah / belum) |
| [KONFIRMASI-GAP-GITHUB.md](./KONFIRMASI-GAP-GITHUB.md) | Keputusan PO + gap opsional |
| [github-field-guide.md](./github-field-guide.md) | Project #1: Status, Iteration, filter |

**Board live:** [GitHub Project #1](https://github.com/users/sapikkk/projects/1)  
**PRD:** [docs/produk/prd-agile-kokonus-farm.md](../produk/prd-agile-kokonus-farm.md)  
**Blackbox:** [docs/testing/uji-blackbox.md](../testing/uji-blackbox.md)  
**Backlog ringkas:** [progress-backlog.md](./progress-backlog.md)  
**UCD increment v2 (post go-live):** [docs/ucd/](../ucd/) · [blueprint](../blueprint/) — WIP, Smart Jurnal, DP

## Alur kerja (ringkas)

1. Satu fitur = **satu issue** GitHub + label sprint.
2. Selesai kode → PR direview → issue **Done** di [Project #1](https://github.com/users/sapikkk/projects/1).
3. Catat di `docs/agile/sprints/*` dan `audit-log.md` bila merge besar.
4. Uji: `docs/testing/uji-blackbox.md`.
5. Commit baru: [panduan-pesan-commit.md](./panduan-pesan-commit.md) (tanpa trailer Cursor).

## Filter cepat (GitHub)

```bash
gh issue list --repo sapikkk/muhammadsyafiq213510100 --label sprint-2
gh issue list --repo sapikkk/muhammadsyafiq213510100 --label progress-partial
gh project item-list 1 --owner sapikkk --limit 50
npm run sync:agile-progress   # → data/agile-progress.json (halaman depan /)
npm run sync:project-board    # Status / Iteration / Priority Project #1
```

Setelah ubah kode: `graphify update .` (lihat `AGENTS.md`).
