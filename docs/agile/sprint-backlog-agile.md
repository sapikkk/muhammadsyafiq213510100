# Backlog sprint — mirror PRD

Ringkasan perencanaan dari [`../produk/prd-agile-kokonus-farm.md`](../produk/prd-agile-kokonus-farm.md). **Status live** dan user story manusia: [`us-registry.md`](us-registry.md) · board: [Project #1](https://github.com/users/sapikkk/projects/1).

---

## Status proyek v1 (2026-10-15)

| Metrik | Nilai |
|--------|--------|
| User story US1.1–US6.5 | **37 / 37 Done** |
| Sprint 1–5 | Selesai (issue #2–#45) |
| Produksi | [kokonusfarm.vercel.app](https://kokonusfarm.vercel.app) |
| Versi referensi | **1.36.x** (lihat `package.json` / `CHANGELOG.md`) |

Increment **v2** (epic #87–#94) lanjut pasca go-live — bukan sprint v1 terpisah.

---

## Epic — ringkasan

| Epic | Scope | Sprint utama | Status |
|------|--------|--------------|--------|
| EPIC-1 | Auth, RBAC, profil, kelola user | 1, 4 (US1.9) | Done |
| EPIC-2 | COA, jurnal, HPP, biaya, susut | 2, 4 (US2.6) | Done |
| EPIC-3 | Siklus tanam, panen, kegagalan | 2 | Done |
| EPIC-4 | Inventaris, pack, infra, master petani | 2 | Done |
| EPIC-5 | Penjualan, kirim, jurnal pendapatan | 3 | Done |
| EPIC-6 | Beranda Owner, ekspor, evaluasi | 4 | Done |
| QA | Usability, deploy, pelatihan | 5 (T5.x) | Done |

---

## Dependensi antar kelompok (arsip perencanaan)

1. **Panen → HPP → jurnal:** US3.3 → US2.3 → US2.4 / US2.5  
2. **Produksi lapangan:** US3.1–3.7  
3. **Penjualan:** US5.1 → US5.5 (berantai)  
4. **Laporan Owner:** US6.x + US2.6 + US1.9  

---

## Dokumen sprint per iterasi

| Sprint | File |
|--------|------|
| 1 | [`sprints/sprint-01-fondasi.md`](sprints/sprint-01-fondasi.md) |
| 2 | [`sprints/sprint-02-operasi.md`](sprints/sprint-02-operasi.md) |
| 3 | [`sprints/sprint-03-penjualan.md`](sprints/sprint-03-penjualan.md) |
| 4 | [`sprints/sprint-04-laporan.md`](sprints/sprint-04-laporan.md) |
| 5 | [`sprints/sprint-05-qa.md`](sprints/sprint-05-qa.md) |

---

## Testing & agent (repo)

| Sumber | Lokasi |
|--------|--------|
| Blackbox | [`../testing/uji-blackbox.md`](../testing/uji-blackbox.md) |
| Panduan demo / E2E | [`../testing/panduan-uji-dan-demo.md`](../testing/panduan-uji-dan-demo.md) |
| Playwright | `e2e/` |
| Agent Cursor | [`../agent/cursor-agent-stack.md`](../agent/cursor-agent-stack.md), [`AGENTS.md`](../../AGENTS.md) |

Terakhir diperbarui: **2026-10-15**.
