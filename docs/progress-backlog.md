# Progress & backlog — Kokonus Farm

**Board live:** [GitHub Project #1](https://github.com/users/sapikkk/projects/1) · **Registry:** `docs/agile/` · **Blackbox:** `docs/uji-blackbox.md`  
**Sinkron board:** `npm run sync:project-board` · **Dashboard `/`:** `npm run sync:agile-progress`

## Ringkasan (2026-10-10)

| Metrik | Nilai |
|--------|--------|
| US v1 (US1.1–US6.5) | **37 / 37** closed (#2–#38) |
| Sprint 1–4 fitur | **Selesai** (release **v1.12.0**) |
| Sprint 5 QA / go-live | **Selesai** — #39–#45 closed · prod **kokonusfarm.vercel.app** · tag **v1.13.0** → **v1.14.0** (v2-A.1) |
| Increment v2 | Story **#95–#102** done · Epic **#87–#94** sisa (COA/WIP, pelunasan, Smart penuh, …) |
| Temuan terbuka | [#50](https://github.com/sapikkk/muhammadsyafiq213510100/issues/50) FINDING-01 (DB pool) — Todo P2 |
| Backlog opsional | [#81](https://github.com/sapikkk/muhammadsyafiq213510100/issues/81) demo seed + skills docs — Todo P2 |

Verifikasi AC penuh: [`docs/agile/AC-VERIFIKASI-RISIKO.md`](./agile/AC-VERIFIKASI-RISIKO.md).

---

## v1 — selesai

| Epic | US | Status |
|------|-----|--------|
| EPIC-1 Auth | US1.1–1.9 (#2–#10) | Closed |
| EPIC-2 Akuntansi | US2.1–2.6 (#11–#16) | Closed |
| EPIC-3 Produksi | US3.1–3.7 (#17–#23) | Closed |
| EPIC-4 Inventaris | US4.1–4.5 (#24–#28) | Closed |
| EPIC-5 Penjualan | US5.1–5.5 (#29–#33) | Closed |
| EPIC-6 Laporan | US6.1–6.5 (#34–#38) | Closed |
| Sprint 5 | T5.1–T5.9 (#39–#45) | Closed |

---

## v2 — backlog aktif (Project iteration: **Increment v2 · Post go-live**)

Urutan coding PO: **A → B → C → D → E → F → G → H** — detail issue: [`docs/blueprint/GITHUB-BACKLOG-DRAFT.md`](./blueprint/GITHUB-BACKLOG-DRAFT.md).

| P | Status board | Item | Issue |
|---|--------------|------|-------|
| — | Done | v2-A.1 `Akun.is_system` + guard COA | [#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95) · PR #104 · **v1.14.0** |
| P1 | In progress | Epic A (sisa: WIP, uang muka, kas split) | [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87) |
| — | Done | v2-B.1 Abort → jurnal 5300 | [#96](https://github.com/sapikkk/muhammadsyafiq213510100/issues/96) · PR #105 |
| — | Done | v2-C.1 kapasitas lubang / pack | [#97](https://github.com/sapikkk/muhammadsyafiq213510100/issues/97) · PR #106 |
| — | Done | v2-D.1 SO lubang + HPP order | [#98](https://github.com/sapikkk/muhammadsyafiq213510100/issues/98) · PR #107 |
| — | Done | v2-E.1 schema DP SO + posting uang muka | [#99](https://github.com/sapikkk/muhammadsyafiq213510100/issues/99) · **v1.18.0** |
| — | Done | v2-F.1 Smart Jurnal MVP (3 tipe) | [#100](https://github.com/sapikkk/muhammadsyafiq213510100/issues/100) · **v1.19.0** |
| — | Done | v2-G.1 KPI Owner HPP/lubang + yield | [#101](https://github.com/sapikkk/muhammadsyafiq213510100/issues/101) |
| — | Done | v2-H.1 period lock + tolak backdate | [#102](https://github.com/sapikkk/muhammadsyafiq213510100/issues/102) |
| P1 | Todo | Epic B/C/D sisa (edge) | [#88](https://github.com/sapikkk/muhammadsyafiq213510100/issues/88)–[#90](https://github.com/sapikkk/muhammadsyafiq213510100/issues/90) |
| P1 | In progress | Epic E pelunasan + COA A.2 | [#91](https://github.com/sapikkk/muhammadsyafiq213510100/issues/91) · [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87) |
| P2 | Todo | Epic F/G/H sisa (tipe Smart penuh, laporan, depresiasi) | [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92)–[#94](https://github.com/sapikkk/muhammadsyafiq213510100/issues/94) |

---

## Project #1 — views

| View | Isi |
|------|-----|
| **Board / Status** | v1 US → Done; backlog v2 + #50 + #81 di Todo / In progress |
| **Current iteration** | Pilih **Increment v2 · Post go-live** untuk sprint v2 |
| **Roadmap** | Sprint 1–5 (historis v1) + bar v2 dari 2026-10-10 |
| **Prioritas** | P0 = #96; P1 = epic/story inti A–E; P2 = F–H, #50, #81 |

---

## Refactor audit (bukan US baru)

Global audit merged **2026-10-10** — `docs/audit/SUMMARY.md`.

Terakhir diperbarui: **2026-10-10** (sinkron GitHub issue + Project #1).
