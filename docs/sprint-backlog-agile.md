# Rencana Sprint & Backlog Agile — Kokonus Farm

Dokumen ini merangkum perencanaan dari `docs/prd-agile-kokonus-farm.md`, pelacakan `docs/notes.md`, dan audit kode + [GitHub Project #1](https://github.com/users/sapikkk/projects/1). Pemetaan dependensi US ada di `docs/progress-backlog.md`.

**Catatan agent:** folder `.agents/skills` hanya lokal (tidak di-commit). Workflow agent: `AGENTS.md` (Graphify, Superpowers, Ponytail, Humanizer).

---

## 1. Status keseluruhan proyek

| Epic | Ringkasan | Progress |
|------|-----------|----------|
| EPIC-1 Core & auth | US1.1–1.8 selesai | 89% (US1.9 Sprint 4) |
| EPIC-2 Akuntansi & HPP | COA, jurnal, approve panen + HPP, **US2.4** | ~67% (2.5–2.6 sisa) |
| EPIC-3 Produksi | Siklus, fase, panen, varietas | 57% (3.5–3.7 sisa) |
| EPIC-4 Inventaris | Stok, pack, alert, infra, **US4.5** | ~100% master petani |
| EPIC-5 Penjualan | Belum dimulai | 0% |
| EPIC-6 Dashboard & ekspor | Belum dimulai | 0% |

**Total US produk:** 37 · selesai penuh **22** (termasuk US2.4, US4.5) · partial **US2.3** (plastik/susut) · todo **14**.

---

## 2. Backlog belum selesai

### Sprint 2 (sisa)
- [ ] **US2.5** Klasifikasi susut normal vs abnormal
- [ ] **US3.5** Log kegagalan per tahap
- [ ] **US3.6** Tambal susulan, monitor, timeline
- [ ] **US3.7** Alur RBAC petani (tugas, log, histori)
- [ ] **US2.6** Owner: COA readonly, filter jurnal, prive (Sprint 4)
- [ ] **US1.9** Kelola user Owner (Sprint 4)

### Sprint 3 (EPIC-5)
- [ ] US5.1–US5.5 (berantai: pelanggan/SO → stok → kirim → jurnal → invoice)

### Sprint 4 (EPIC-6)
- [ ] US6.1–US6.5

### Sprint 5 (QA)
- [ ] T5.1–T5.9 · FINDING-01 (#50) DB pool

---

## 3. Kelompok kerja (relasi)

1. **G1 Panen → HPP → jurnal:** US3.3, F12, US2.4 ✅ → US3.5 → US2.5 → lengkapi US2.3
2. **G2 Produksi lapangan:** US3.6, US3.7
3. **G3 Master:** US4.5 ✅ (ERD Petani ≠ User login)
4. **G4 Penjualan:** US5.x berurutan
5. **G5 Laporan Owner:** US2.6, US6.x, US1.9

---

## 4. Eksekusi berikutnya (prioritas)

1. US3.5 + US2.5 (kegagalan & susut)
2. US3.6, US3.7
3. Sprint 3 US5.1
4. Black-box + Playwright smoke (`docs/testing/README.md`)

---

## 5. Testing & referensi (repo, bukan `.agents`)

| Sumber | Lokasi / paket |
|--------|----------------|
| [javascript-testing-best-practices](https://github.com/goldbergyoni/javascript-testing-best-practices) | `vendor/testing/javascript-testing-best-practices` (submodule) |
| [Playwright](https://github.com/microsoft/playwright) | npm `@playwright/test`, folder `e2e/` |
| [TestCafe](https://github.com/DevExpress/testcafe) | npm `testcafe` (opsional) |
| [test-automation-skills-agents](https://github.com/fugazi/test-automation-skills-agents) | `vendor/testing/test-automation-skills-agents` (submodule) |

Graphify: `graphify-out/` · perbarui dengan `graphify update .` setelah ubah kode.
