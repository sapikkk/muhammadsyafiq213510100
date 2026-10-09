# Rencana Sprint & Backlog Agile — Kokonus Farm

Ringkasan dari `docs/prd-agile-kokonus-farm.md`, [Project #1](https://github.com/users/sapikkk/projects/1), dan `docs/progress-backlog.md`.

Pelacakan detail: `docs/agile/README.md` · uji: `docs/uji-blackbox.md`.

---

## 1. Status keseluruhan proyek

| Epic | Ringkasan | Progress |
|------|-----------|----------|
| EPIC-1 Core & auth | US1.1–1.9 | **100%** |
| EPIC-2 Akuntansi & HPP | COA, jurnal, HPP, biaya, susut, Owner read-only | **100%** |
| EPIC-3 Produksi | Siklus, fase, panen, varietas, kegagalan, dashboard petani | **100%** |
| EPIC-4 Inventaris | Stok, pack, alert, infra, master petani | **100%** |
| EPIC-5 Penjualan | SO end-to-end | **100%** |
| EPIC-6 Dashboard & ekspor | KPI, pie, ekspor, evaluasi, arus kas | **100%** |

**Total US produk (US1.1–US6.5):** 37 · **selesai 37** · Sprint 5 (QA T5.x) belum.

---

## 2. Backlog tersisa (Sprint 5)

- [ ] **T5.1** Usability petani (#39)
- [ ] **T5.2** Usability Admin jurnal (#40)
- [ ] **T5.3** Usability Owner grafik (#41)
- [ ] **T5.4** Audit debit=kredit (#42)
- [ ] **T5.5** Bugfix uji (#43)
- [ ] **T5.6** Deploy staging (#44)
- [ ] **T5.9** Go-live & pelatihan (#45)
- [ ] **FINDING-01** (#50) pool DB — In progress

---

## 3. Sprint 1–4 (arsip)

Semua user story produk **Done** di Project #1 (kolom Status, Priority, Size, Estimate, Start/Target date diisi untuk US Sprint 3–4 via `docs/agile/scripts/sync-project-sprint3-4-done.sh`).

---

## 4. Eksekusi berikutnya

1. Sprint 5 QA + deploy  
2. Perluas `e2e/smoke.spec.ts`  
3. Tutup FINDING-01 setelah mitigasi pool/production DB
