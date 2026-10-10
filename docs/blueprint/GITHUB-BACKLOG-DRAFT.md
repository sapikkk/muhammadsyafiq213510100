# Backlog GitHub — increment v2 (UCD + blueprint)

**Label:** `ucd-v2`, `epic-v2`, `research`  
**Milestone:** [Increment v2 — Post go-live](https://github.com/sapikkk/muhammadsyafiq213510100/milestone/6)  
**Script ulang (idempotent):** `bash scripts/create-v2-epic-issues.sh`

---

## Epic (parent issues)

| Epic | Issue | Judul |
| --- | --- | --- |
| A | [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87) | Schema COA: is_system, WIP, uang muka, kas split |
| B | [#88](https://github.com/sapikkk/muhammadsyafiq213510100/issues/88) | Siklus & panen: approve-only stok, Abort gagal total |
| C | [#89](https://github.com/sapikkk/muhammadsyafiq213510100/issues/89) | Benih: kapasitas lubang pack, potong proporsional, pack habis |
| D | [#90](https://github.com/sapikkk/muhammadsyafiq213510100/issues/90) | SO dynamic bundling + HPP per lubang + moving average |
| E | [#91](https://github.com/sapikkk/muhammadsyafiq213510100/issues/91) | DP, pelunasan, status pembayaran SO |
| F | [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92) | Smart Jurnal (tipe 1–17) + sumber SMART/AUTO |
| G | [#93](https://github.com/sapikkk/muhammadsyafiq213510100/issues/93) | Laporan keuangan + KPI dashboard hidroponik |
| H | [#94](https://github.com/sapikkk/muhammadsyafiq213510100/issues/94) | Penyusutan otomatis, period lock, jurnal pembalik |

---

## Story starter (child — urutan disarankan A → H)

| ID | Issue | Epic |
| --- | --- | --- |
| v2-A.1 ✅ | [#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95) **closed** · v1.14.0 | A |
| v2-B.1 ✅ | [#96](https://github.com/sapikkk/muhammadsyafiq213510100/issues/96) **closed** | B |
| v2-C.1 ✅ | [#97](https://github.com/sapikkk/muhammadsyafiq213510100/issues/97) **closed** | C |
| v2-D.1 ✅ | [#98](https://github.com/sapikkk/muhammadsyafiq213510100/issues/98) **closed** | D |
| v2-E.1 ✅ | [#99](https://github.com/sapikkk/muhammadsyafiq213510100/issues/99) **closed** · v1.18.0 | E |
| v2-F.1 ✅ | [#100](https://github.com/sapikkk/muhammadsyafiq213510100/issues/100) **closed** · v1.19.x | F |
| v2-G.1 ✅ | [#101](https://github.com/sapikkk/muhammadsyafiq213510100/issues/101) **closed** | G |
| v2-H.1 ✅ | [#102](https://github.com/sapikkk/muhammadsyafiq213510100/issues/102) **closed** | H |
| v2-A.2 / E.2 | branch `feat/v2-a2-e2-coa-pelunasan` | A · E |

---

## Urutan coding (PO)

1. **Story #95–#102** — **selesai** (starter increment v2)  
2. **Epic A/E lanjutan** — branch `feat/v2-a2-e2-coa-pelunasan` (WIP 1360, uang muka, pelunasan)  
3. **Epic #87–#94** — masih open (Smart tipe 4–17, moving avg, depresiasi otomatis, …)  
4. **#50 / #81** — P2 ops  

**Skill:** `docs/skills/akuntansi-hidroponik/SKILL.md`  
**Board:** tambahkan kartu ke [Project #1](https://github.com/users/sapikkk/projects/1) (iteration v2 opsional).

**Versi npm/tag:** increment v2 = epic produk; rilis Git tetap **1.14+** (bukan 2.0.0) — lihat `AGENTS.md`.

Terakhir diperbarui: **2026-10-10**.
