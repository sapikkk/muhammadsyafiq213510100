# Progress & backlog — Kokonus Farm

**Sumber kebenaran issue:** GitHub [#2–#38](https://github.com/sapikkk/muhammadsyafiq213510100/issues) (status **closed** per 2026-10-10).  
**Board:** [Project #1](https://github.com/users/sapikkk/projects/1) · **Registry:** `docs/agile/` · **Blackbox:** `docs/uji-blackbox.md`

## Ringkasan

| Metrik | Nilai |
|--------|--------|
| US produk (US1.1–US6.5) | **37 / 37** issue closed |
| Sprint fitur (1–4) | **Selesai** (merge stack #65–#78, audit #80 → v1.12.0) |
| Sprint 5 (QA / go-live) | **Belum** — #39–#45 open |
| Temuan terbuka | [#50](https://github.com/sapikkk/muhammadsyafiq213510100/issues/50) FINDING-01 (DB pool) |

Verifikasi AC penuh (bukan sekadar issue closed): [`docs/agile/AC-VERIFIKASI-RISIKO.md`](./agile/AC-VERIFIKASI-RISIKO.md).

---

## Progress per epic (issue closed)

| Epic | US | Status issue |
|------|-----|----------------|
| EPIC-1 Auth | US1.1–1.9 (#2–#10) | Closed |
| EPIC-2 Akuntansi | US2.1–2.6 (#11–#16) | Closed |
| EPIC-3 Produksi | US3.1–3.7 (#17–#23) | Closed |
| EPIC-4 Inventaris | US4.1–4.5 (#24–#28) | Closed |
| EPIC-5 Penjualan | US5.1–5.5 (#29–#33) | Closed |
| EPIC-6 Laporan | US6.1–6.5 (#34–#38) | Closed |

---

## Kelompok alur (referensi integrasi)

### G1 — Panen → HPP → jurnal

US3.3 → approve harvest → US2.3 HPP → US2.2 jurnal → laporan US6.x.  
Implementasi: PR #66–#68, #70; audit API/UI #80.

### G4 — Penjualan

US5.1 → … → US5.5. PR [#69](https://github.com/sapikkk/muhammadsyafiq213510100/pull/69), [#72](https://github.com/sapikkk/muhammadsyafiq213510100/pull/72).

### G5 — Owner & laporan

US2.6, US1.9, US6.1–6.5. PR [#73](https://github.com/sapikkk/muhammadsyafiq213510100/pull/73)–[#78](https://github.com/sapikkk/muhammadsyafiq213510100/pull/78).

### G6 — QA (Sprint 5)

Rencana eksekusi: [`docs/agile/sprints/sprint-05-qa.md`](./agile/sprints/sprint-05-qa.md).

---

## Prioritas sekarang

| P | Item | Issue |
|---|------|-------|
| P0 | Sprint 5 usability + audit debit=kredit | #39–#42 |
| P0 | Bugfix hasil uji | #43 |
| P1 | Deploy staging/prod | #44 |
| P1 | Go-live & pelatihan | #45 |
| P2 | Mitigasi DB pool (uji beban) | #50 |
| P2 | Sinkron Project #1 iteration dates | manual (lihat timeline-registry) |

---

## Refactor audit (bukan US baru)

Global audit merged **2026-10-10** — `docs/audit/SUMMARY.md` (UI B&W partial, DataTable, CI e2e).

---

Terakhir diperbarui: **2026-10-10** (sinkron issue GitHub).
