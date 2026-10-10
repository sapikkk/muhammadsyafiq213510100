# UCD — Increment v2: Akuntansi & logistik (blueprint)

**Status:** define + ideate (draft) · **Branch:** `ucd/blueprint-v2-akuntansi`  
**Teknis:** `docs/blueprint/akuntansi-logistik-hidroponik.md` · **Gap v1:** `docs/blueprint/VALIDASI-BACKLOG-PRD.md`

---

## Empathize (pain dari lapangan & sidang v1)

| Persona | Pain terkait blueprint |
| --- | --- |
| **Admin** | Takut salah debit/kredit; jurnal manual rumit; stok “loncat” sebelum approve |
| **Petani** | Timbang sayur tidak seragam; perlu input **lubang** + pack, bukan kg di gudang |
| **Owner (Koko)** | Laba vs DP bercampur; kas tunai vs transfer tidak terpisah; susut abnormal tidak jelas di laporan |

Observasi v1 (Sprint 5 T5.1–T5.3): usability HP petani, filter jurnal, grafik owner — **baseline** sebelum v2.

---

## Define

**How might we:** Petani dan Admin mencatat produksi & penjualan **tanpa paham jurnal**, sementara Owner yakin angka **balance** dan HPP per **lubang**?

**Success metrics (usulan):**

- Admin: Smart Jurnal selesai < 2 menit, zero imbalance.
- Petani: pindah fase + packing SO (lubang + pack) < 1 menit per aksi (HP).
- Owner: baca margin/BEP tanpa Excel (lanjut US6.x + KPI §8.7 blueprint).

---

## Ideate (modul v2)

| Modul UCD | Blueprint | Epic draft |
| --- | --- | --- |
| Smart Jurnal | §6 | EPIC-F |
| WIP + panen approve-only + Abort | §1 | EPIC-B |
| Benih/pack lubang | §2 | EPIC-C |
| SO bundling + moving avg | §3 | EPIC-D |
| DP & multi-kas | §4 | EPIC-E |
| COA `is_system` | §5, §7 | EPIC-A |

Affinity: satu **increment v2** dengan 8 fase implementasi (blueprint §9), dipecah issue GitHub.

---

## Prototype (target)

- **Hi-fi:** perluasan Figma (Smart Jurnal form, SO DP, detail siklus Abort) — belum di repo.
- **Lo-fi kode:** setelah fase 1 schema; branch feature per epic, bukan big-bang di `main`.

---

## Test (rencana)

- Regresi: checklist §10 blueprint + `check:jurnal-balance` + simulasi neraca (manual/script).
- Usability: ulang pola Sprint 5 (SUS subset) setelah Smart Jurnal + petani packing lubang.
- Validasi akuntan/dosen: pemetaan COA §7 vs `seed-akun.js`.

---

## Relasi Scrum

| | v1 (selesai di board) | v2 (branch UCD) |
| --- | --- | --- |
| Sprint | 1–5 | **Backlog baru** — milestone “Post go-live / penelitian lanjutan” |
| Epic | EPIC-1…6 | EPIC-A…H (lihat GITHUB-BACKLOG-DRAFT) |
| DoD | `definition-of-done.md` | + simulasi D/K, tidak break `is_system` |

Terakhir: 2026-10-10.
