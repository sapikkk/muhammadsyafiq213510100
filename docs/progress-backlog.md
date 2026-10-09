# Progress & backlog terkelompok — Kokonus Farm

**Sumber:** [Project #1](https://github.com/users/sapikkk/projects/1), `docs/prd-agile-kokonus-farm.md`, `docs/uji-blackbox.md`, `main` (2026-10-09).

**Total US produk (US1.1–US6.5):** 37 story · **37 selesai** · **0 partial terbuka** · **100%**  
**Sprint produk (1–4):** selesai. **Sprint 5 (QA T5.x):** belum dimulai.

---

## Progress per epic

| Epic | Done | Todo | % |
|------|------|------|---|
| EPIC-1 Auth | 9/9 | — | **100%** |
| EPIC-2 Akuntansi & HPP | 6/6 | — | **100%** |
| EPIC-3 Produksi | 7/7 | — | **100%** |
| EPIC-4 Inventaris | 5/5 | — | **100%** |
| EPIC-5 Penjualan | 5/5 | — | **100%** |
| EPIC-6 Dashboard & ekspor | 5/5 | — | **100%** |

---

## Bukti merge (US terakhir)

| US | PR | Halaman / modul utama |
|----|-----|------------------------|
| US5.1–5.5 | [#72](https://github.com/sapikkk/muhammadsyafiq213510100/pull/72), [#69](https://github.com/sapikkk/muhammadsyafiq213510100/pull/69) | Penjualan, pengiriman, jurnal, invoice |
| US6.1 | [#73](https://github.com/sapikkk/muhammadsyafiq213510100/pull/73) | `/owner` KPI + grafik |
| US6.2 | [#74](https://github.com/sapikkk/muhammadsyafiq213510100/pull/74) | `/owner/biaya` |
| US6.3 | [#75](https://github.com/sapikkk/muhammadsyafiq213510100/pull/75) | Ekspor xlsx/PDF |
| US6.4 | [#76](https://github.com/sapikkk/muhammadsyafiq213510100/pull/76) | `/owner/evaluasi` |
| US6.5 | [#77](https://github.com/sapikkk/muhammadsyafiq213510100/pull/77) | `/owner/arus-kas` |
| US1.9 + US2.6 | [#78](https://github.com/sapikkk/muhammadsyafiq213510100/pull/78) | `/owner/pengguna`, `/owner/akun`, `/owner/jurnal`, `/owner/prive` |

---

## Kelompok kerja — status akhir

### G1 — Panen → HPP → jurnal

Semua ✅ (US2.3–2.5, US3.3, F12, biaya langsung/overhead US2.4).

### G2 — Produksi lapangan

Semua ✅ (US3.1–3.7).

### G3 — Master data

Semua ✅ (US1.6, US4.5 entitas Petani + register login).

### G4 — Penjualan end-to-end

Semua ✅ (US5.1–5.5).

### G5 — Owner visibility & laporan

Semua ✅ (US2.6, US6.1–6.5, US1.9).

### G6 — QA & go-live (Sprint 5)

| Item | Issue | Status Project #1 |
|------|-------|-------------------|
| T5.1–T5.6, T5.9 | #39–#45 | Todo (kolom Priority/Estimate diisi) |
| FINDING-01 pool DB | #50 | In progress |
| FINDING-02 dev stale | #63 | Done |

---

## Prioritas berikutnya

| P | Task |
|---|------|
| P0 | Sprint 5: T5.4 audit debit=kredit, T5.6 deploy staging |
| P1 | T5.1–T5.3 usability + SUS |
| P1 | FINDING-01 mitigasi pool / Neon |
| P2 | `npm run test:e2e` perluasan smoke → alur SO + Owner dashboard |

---

## Sinkronisasi GitHub Project (2026-10-09)

- **Done:** issue #2–#38 (US1.1–US6.5), #1, #61, #63, UX #61.
- **Todo:** #39–#45 (QA Sprint 5), **In progress:** #50.
- Skrip: `docs/agile/scripts/sync-project-sprint3-4-done.sh` (Status, Priority, Size, Estimate, Start/Target date).
- Issue #10, #16, #30–#38 ditutup dengan komentar bukti uji.

Board: https://github.com/users/sapikkk/projects/1
