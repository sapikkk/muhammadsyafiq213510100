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
| v2-A.1 | [#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95) | A |
| v2-B.1 | [#96](https://github.com/sapikkk/muhammadsyafiq213510100/issues/96) | B |
| v2-C.1 | [#97](https://github.com/sapikkk/muhammadsyafiq213510100/issues/97) | C |
| v2-D.1 | [#98](https://github.com/sapikkk/muhammadsyafiq213510100/issues/98) | D |
| v2-E.1 | [#99](https://github.com/sapikkk/muhammadsyafiq213510100/issues/99) | E |
| v2-F.1 | [#100](https://github.com/sapikkk/muhammadsyafiq213510100/issues/100) | F |
| v2-G.1 | [#101](https://github.com/sapikkk/muhammadsyafiq213510100/issues/101) | G |
| v2-H.1 | [#102](https://github.com/sapikkk/muhammadsyafiq213510100/issues/102) | H |

---

## Urutan coding (PO)

1. **Epic A** (#87 / #95) — COA + `is_system`  
2. **Epic B** (#88 / #96) — WIP + abort (butuh A)  
3. **C → D → E** — operasi & SO  
4. **F** — Smart Jurnal  
5. **G → H** — laporan & tutup buku  

**Skill:** `docs/skills/akuntansi-hidroponik/SKILL.md`  
**Board:** tambahkan kartu ke [Project #1](https://github.com/users/sapikkk/projects/1) (iteration v2 opsional).

Terakhir diperbarui: **2026-10-10**.
