# Inventaris proyek — docs, US, GitHub, skrip

Daftar tunggal untuk PO, skripsi, dan agent. **Pembaruan:** 2026-10-15.

---

## 1. Peta folder `docs/`

| Folder | Isi |
|--------|-----|
| [`README.md`](README.md) | Hub utama |
| [`INVENTARIS-PROYEK.md`](INVENTARIS-PROYEK.md) | File ini |
| [`produk/`](produk/) | PRD, project-context, asumsi domain |
| [`agile/`](agile/) | Sprint, registry US, commit audit, Project #1 |
| [`ucd/`](ucd/) | Narasi UCD, increment v2 |
| [`desain/`](desain/) | Figma, FLOW-NAV |
| [`blueprint/`](blueprint/) | Epic v2 teknis, COA, Smart Jurnal |
| [`testing/`](testing/) | Blackbox, panduan demo, E2E |
| [`deployment/`](deployment/) | Vercel, Postgres |
| [`audit/`](audit/) | RBAC, perf, keamanan, UI |
| [`agent/`](agent/) | Cursor stack, vendor agents |
| [`referensi/`](referensi/) | API |
| [`skills/`](skills/) | Skill domain & Kokonus |
| [`arsip/`](arsip/) | Notulensi, catatan progres lama |
| [`standards/`](standards/) | Gaya dokumen, rencana refine |

**Root repo (bukan `docs/`):** `README.md`, `AGENTS.md`, `CHANGELOG.md` + kode aplikasi.

**Stub redirect:** file tipis di `docs/*.md` (path lama → folder baru).

---

## 2. User story v1 (37) + QA (7)

Sumber kebenaran: [`agile/us-registry.md`](agile/us-registry.md).

| Epic | US | Issue GitHub |
|------|-----|--------------|
| EPIC-1 Auth | US1.1–US1.9 | #2–#10 |
| EPIC-2 Keuangan | US2.1–US2.6 | #11–#16 |
| EPIC-3 Produksi | US3.1–US3.7 | #17–#23 |
| EPIC-4 Inventaris | US4.1–US4.5 | #24–#28 |
| EPIC-5 Penjualan | US5.1–US5.5 | #29–#33 |
| EPIC-6 Laporan | US6.1–US6.5 | #34–#38 |
| Sprint 5 QA | T5.1–T5.6, T5.9 | #39–#45 |

**Status v1:** 37/37 Done · QA Done · [Project #1](https://github.com/users/sapikkk/projects/1)

---

## 3. Increment v2 (epic)

| Epic | Issue | Judul singkat |
|------|-------|----------------|
| A | #87 | COA sistem, WIP, kas |
| B | #88 | Approve stok, abort siklus |
| C | #89 | Benih & pack lubang |
| D | #90 | SO bundling, HPP/lubang |
| E | #91 | DP & pelunasan |
| F | #92 | Smart Jurnal |
| G | #93 | KPI keuangan |
| H | #94 | Period lock |

Detail: [`blueprint/GITHUB-BACKLOG-DRAFT.md`](blueprint/GITHUB-BACKLOG-DRAFT.md)

**Issue body** (52 total) disinkron dari registry: `npm run sync:github-us-issues:apply` · artefak: [`agile/issue-bodies/`](agile/issue-bodies/)

---

## 4. Skrip npm (dokumen & board)

| Perintah | Fungsi |
|----------|--------|
| `npm run sync:github-us-issues` | Generate body issue lokal |
| `npm run sync:github-us-issues:apply` | Push title/body ke GitHub |
| `npm run sync:project-board` | Status/Iteration Project #1 |
| `npm run sync:agile-progress` | JSON progress untuk beranda `/` |
| `npm run audit:commit-kategori` | `agile/commit-kategori-main.md` |
| `npm run graphify:update` | Graf kode setelah edit TS |

---

## 5. Timeline bisnis vs software

[`agile/konteks-lapangan-dan-aplikasi.md`](agile/konteks-lapangan-dan-aplikasi.md)

- **13 Mei – 14 Agu 2025:** greenhouse lapangan  
- **15 Agu 2025 – sekarang:** Agile, UCD, aplikasi  
- **Produksi:** [kokonusfarm.vercel.app](https://kokonusfarm.vercel.app)

---

## 6. Rencana refine dokumen

[`standards/rencana-refine-dokumen.md`](standards/rencana-refine-dokumen.md)

| Fase | Status |
|------|--------|
| 0 Struktur folder | Selesai |
| 1 Registry + GitHub issue | Selesai |
| 2 PRD / narasi UCD | Berjalan |
| 3 Uji & audit format | Header audit inti + format temuan |
| 4 Agent docs | Selesai |
| 5 Verifikasi path + graphify | Selesai (2026-10-15) |

---

## 7. Peran tim (commit & board)

[`agile/konteks-lapangan-dan-aplikasi.md`](agile/konteks-lapangan-dan-aplikasi.md) — Owner, PM, dev, **desain/UI**, QA, release, CI.

---

## 8. Slash Cursor

| Perintah | Efek |
|----------|------|
| `/kokonus` atau `/all` | Sesi penuh — [`skills/kokonus-sesi-penuh.md`](skills/kokonus-sesi-penuh.md) |

Terakhir diperbarui: **2026-10-15**.
