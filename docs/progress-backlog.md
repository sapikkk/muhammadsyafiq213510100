# Progress & backlog — Kokonus Farm

**Board live:** [GitHub Project #1](https://github.com/users/sapikkk/projects/1) · **Registry:** `docs/agile/` · **Blackbox:** `docs/uji-blackbox.md`  
**Sinkron board:** `npm run sync:project-board` · **Dashboard `/`:** `npm run sync:agile-progress`

## Ringkasan (2026-10-10)

| Metrik | Nilai |
|--------|--------|
| US v1 (US1.1–US6.5) | **37 / 37** closed (#2–#38) |
| Sprint 5 / go-live v1 | **Selesai** · prod **kokonusfarm.vercel.app** · tag **v1.13.0** |
| Increment v2 starter | **#95–#102** done + lanjutan **v1.14.0 → v1.24.0** (A/E/F/H) |
| Epic v2 inti | **A, E (kode), F (9 tipe), G, H (lock + penyusutan + reversal UI)** — review PO |
| Defer post-MVP | Edge **#88–#90** · Smart tipe 11–17 · laporan §8 penuh · **#50** · **#81** |

Verifikasi AC: [`docs/agile/AC-VERIFIKASI-RISIKO.md`](./agile/AC-VERIFIKASI-RISIKO.md) · UAT v2: [`docs/uji-blackbox.md`](./uji-blackbox.md) (pelunasan, penyusutan).

---

## v2 — deliverable merged (2026-10-10)

| Item | Rilis / PR |
|------|------------|
| v2-A.1 is_system | #95 · v1.14.0 |
| v2-A.2 COA WIP + pelunasan COA | #112 · v1.20.0 |
| v2-A.3 panen Dr 1350 Cr WIP | #114 · v1.21.0 |
| v2-A.4 kas split 1100/1110 | #116 · v1.22.0 |
| v2-E.1/E.2 DP + pelunasan SO | #108 · #112 |
| v2-F.1 Smart MVP | #109 · v1.19.0 |
| v2-F.2 Smart 9–10 tipe | #117 · v1.23.0 |
| v2-G.1 KPI Owner | #109–#110 |
| v2-H.1 period lock | #109 |
| v2-H.2 reversal UI + penyusutan otomatis | #112 · **v1.24.0** (penyusutan) |

---

## v2 — epic open (PO / UAT)

| P | Board | Epic | Issue | Catatan |
|---|-------|------|-------|---------|
| P1 | Review | A COA/WIP/kas | [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87) | Starter selesai — tutup setelah UAT |
| P1 | UAT | E pelunasan | [#91](https://github.com/sapikkk/muhammadsyafiq213510100/issues/91) | Blackbox § v2-E.2 |
| P2 | In progress | F Smart penuh | [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92) | 10/17 tipe |
| P2 | Todo | G laporan §8 | [#93](https://github.com/sapikkk/muhammadsyafiq213510100/issues/93) | Export LR/CF ada; perluas KPI |
| P2 | In progress | H tutup buku | [#94](https://github.com/sapikkk/muhammadsyafiq213510100/issues/94) | Lock + reversal + penyusutan bulan |
| P1 | Todo | B/C/D edge | [#88](https://github.com/sapikkk/muhammadsyafiq213510100/issues/88)–[#90](https://github.com/sapikkk/muhammadsyafiq213510100/issues/90) | Moving avg, pack habis, … |
| P2 | Todo | Ops | [#50](https://github.com/sapikkk/muhammadsyafiq213510100/issues/50) · [#81](https://github.com/sapikkk/muhammadsyafiq213510100/issues/81) | Pool DB · demo seed |

Story **#95–#102** tetap Done di Project #1.

---

Terakhir diperbarui: **2026-10-10** (increment v2 closeout coding).
