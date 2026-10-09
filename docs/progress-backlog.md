# Progress & backlog terkelompok — Kokonus Farm

**Sumber:** [Project #1](https://github.com/users/sapikkk/projects/1), `docs/prd-agile-kokonus-farm.md`, `docs/notes.md`, audit kode `feat/ui-redesign` (2026-10-09).

**Total US produk (US1.1–US6.5):** 37 story · **20 selesai penuh** · **1 selesai MVP (US2.3)** · **16 belum**  
**Persentase:** ~54% (20/37) jika US2.3 dihitung done; ~51% jika US2.3 masih “MVP / lanjutan di 2.4–2.5”.

---

## Progress per epic

| Epic | Done | MVP / partial | Todo | % (done/ total) |
|------|------|---------------|------|-----------------|
| EPIC-1 Auth | 8 | 0 | 1 (US1.9 Sprint 4) | 89% (8/9) |
| EPIC-2 Akuntansi & HPP | 2 | 1 (US2.3) | 3 | 33%→50% dengan MVP 2.3 |
| EPIC-3 Produksi | 4 | 0 | 3 | 57% (4/7) |
| EPIC-4 Inventaris | 4 | 0 | 1 | 80% (4/5) |
| EPIC-5 Penjualan | 0 | 0 | 5 | 0% |
| EPIC-6 Dashboard & ekspor | 0 | 0 | 5 | 0% |

**Sprint 2 (EPIC 2+3+4):** fondasi produksi + inventaris kuat; sisa = biaya/HPP lengkap, kegagalan, master petani.

---

## Yang sudah selesai (ringkas)

| US | Bukti kode / catatan |
|----|----------------------|
| US1.1–US1.8 | Sprint 1, issues #2–#9 Done di board |
| US2.1–US2.2 | COA + jurnal approval |
| US2.3 | `lib/hpp.ts`, plastik, override + justifikasi, jurnal 5300 susut abnormal |
| F12 (alur PRD) | `POST` approve/reject, `/admin/harvest/[id]` — bagian dari journey panen |
| US3.1–US3.4 | Siklus, fase, harvest submit, varietas |
| US4.1–US4.4 | Stok, active pack, alert, infrastruktur |
| UX #61 | Form siklus BNH vs RW (#62) |
| UI sidebar | `feat/ui-redesign` |

---

## Kelompok kerja (relasi antar US)

### G1 — **Journey panen → HPP → jurnal** (EPIC-2 + EPIC-3)

**Relasi:** US3.3 (input petani) → F12 approve → US2.3 (hitung HPP) → US2.2 (jurnal) → US6.x (laporan).

| Status | Item | Keterangan |
|--------|------|------------|
| ✅ | US3.3 Submit harvest | Form PANEN, `Laporan_Panen` PENDING |
| ✅ | F12 Approve/reject | API + UI admin detail |
| ✅ | US2.3 HPP ABC | Approve + override + plastik + overhead (US2.4) |
| ⬜ | US2.4 Biaya langsung & overhead | **Blok berikutnya** — isi `Biaya_Langsung` pasca-semai + `Biaya_Overhead` + alokasi ke `calculateHPP` |
| ✅ | US2.5 Susut normal vs abnormal | Klasifikasi + jurnal 5300 on approve |
| ✅ | US3.5 Log kegagalan | Form petani + `lib/log-kegagalan.ts` |

**Urutan disarankan:** US2.4 → US3.5 → US2.5 → black-box ulang G1 di `uji-blackbox.md`.

---

### G2 — **Produksi lapangan & timeline** (EPIC-3)

**Relasi:** US3.1–3.2 (dasar) → US3.6 (tambal/monitor) → US3.7 (tugas/histori); bergantung US4.5 untuk assign petani ke batch (opsional PRD).

| Status | Item |
|--------|------|
| ✅ | US3.1, US3.2, US3.4 |
| ✅ | US3.6 Tambal susulan, timeline | Timeline + tambal + monitor di detail siklus |
| ✅ | US3.7 Dashboard tugas petani | `/petani` tugas + histori |

**Urutan:** US3.5 (kegagalan) sebelum atau paralel US3.6; US3.7 mengikat semua log.

---

### G3 — **Master data operasional** (EPIC-1 + EPIC-4)

**Relasi:** US1.6 (User login petani) ≠ US4.5 (entitas `Petani` ERD); US4.5 dipakai penjualan/packing nanti.

| Status | Item |
|--------|------|
| ✅ | US1.6 register User petani |
| ⬜ | **US4.5** CRUD `Petani` + link ke User (jika perlu) |

**Urutan:** US4.5 sebelum Sprint 3 jika SO perlu petani/packer named.

---

### G4 — **Penjualan end-to-end** (EPIC-5) — Sprint 3

**Relasi berantai (wajib berurutan):**

```
US5.1 Pelanggan + SO
  → US5.2 Item dinamis + cek stok (US4.1)
    → US5.3 Packing/kirim petani
      → US5.4 Jurnal saat DELIVERED (US2.2)
        → US5.5 Invoice, batal, biaya packing (US2.3/US2.4)
```

Semua ⬜ · butuh siklus **SELESAI** + stok hasil panen (G1 minimal MVP).

---

### G5 — **Owner visibility & laporan** (EPIC-2 + EPIC-6) — Sprint 4

**Relasi:**

| Cluster | US | Depends on |
|---------|-----|------------|
| Baca keuangan Owner | US2.6 COA readonly, filter jurnal, prive | US2.1, US2.2 |
| Dashboard | US6.1 KPI, US6.2 pie biaya | US2.2, US2.3, US5.4 |
| Ekspor | US6.3 xlsx/PDF | US2.2, neraca/laba logic |
| Evaluasi | US6.4 margin, BEP, idle | US2.3, US4.4 kapasitas, US3.4 harga jual |
| Arus kas | US6.5 | US2.2, US5.4 |
| Admin users | US1.9 | US1.4 |

---

### G6 — **QA & go-live** (Sprint 5)

T5.1–T5.6, T5.9 — bergantung fitur Sprint 2–4 selesai. T5.4 audit debit=kredit relevan setiap approve jurnal (G1, G4).

**Findings:** #50 FINDING-01 (DB pool) — In progress; #63 FINDING-02 — mitigasi `npm run dev:clean`.

---

## Daftar kerja prioritas (what to do next)

| P | Kelompok | US / task | Alasan |
|---|----------|-----------|--------|
| P0 | G1 | **US2.4** | HPP PRD tidak lengkap tanpa overhead & edit biaya langsung |
| P0 | G1 | Verifikasi F12 + jurnal | Commit `9868c5a`; perbaiki copy UI `/admin/harvest` (masih “US berikutnya”) |
| P1 | G1 | **US2.5** (lanjut) | Override HPP + jurnal kerugian abnormal opsional |
| P2 | G2 | **US3.6**, **US3.7** | Lengkapi Sprint 2 produksi |
| P1 | G3 | **US4.5** | Backlog `notes.md` |
| P1 | G1 | **US2.3** (override HPP) | AC penuh Sprint 2 |
| P2 | — | Merge/push `feat/ui-redesign` | US2.3+F12 + submodule belum di origin |
| P3 | G4 | US5.1→5.5 | Setelah G1 stabil |
| P4 | G5 | US2.6, US6.x, US1.9 | Sprint 4 |

---

## Sinkronisasi GitHub Project

Board diperbarui 2026-10-09:

- **Done:** US3.3 (#19), UX #61, FINDING-02 #63
- **Done (G1):** US2.3 (#13), US2.5 (#15) — PR stack #68

Issue GitHub (#19, #61, #63) ditutup jika status board Done dan bukti ada di repo/PR.
