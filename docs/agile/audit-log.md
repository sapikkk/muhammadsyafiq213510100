# Audit log — pelacakan progres (append-only)

Format: `YYYY-MM-DD HH:MM UTC+7` · actor · ringkasan · artefak

---

## 2026-10-09 — Keputusan PO (partial, actual start, retro S1)

- **Actor:** PO sapikkk + agent  
- **Keputusan:** partial delivery + filter `progress-partial`; issue open sampai AC lengkap; iteration **actual start** (S2 dari 2026-10-08); retro S1 + velocity 29 pts; **PR review wajib**; tasklist di template US; tone produk (bukan akademik) di registry/README/AGENTS.  
- **Artefak:** `partial-delivery-policy.md`, `retro/sprint-01-retro.md`, timeline milestone due dates diperbarui, label `progress-partial`, #13 dilabel partial.  
- **PR:** [#65](https://github.com/sapikkk/muhammadsyafiq213510100/pull/65)

---

## 2026-10-09 — Registry Agile + sinkron GitHub

- **Actor:** agent (sesi Cursor) + PO sapikkk  
- **Perubahan:**  
  - Menambah `docs/agile/**` (timeline, sprint 1–5, DoD, gap GitHub).  
  - Milestone Sprint 1–5 + label `sprint-1`, `sprint-3`, `sprint-4`, `sprint-5` di repo.  
  - Template issue **User story (US)** dengan blok AC/DoD/tech.  
  - Project #1: Iteration di-assign per US (via script `docs/agile/scripts/assign-project-iterations.sh`).  
- **Artefak git:** branch `chore/agile-project-registry` · commit `1ec2e6b`  
- **PR registry:** [#65](https://github.com/sapikkk/muhammadsyafiq213510100/pull/65)  
- **PR terkait produk:** [#64](https://github.com/sapikkk/muhammadsyafiq213510100/pull/64) (US4.5, US2.4, docs stack)  
- **Milestone:** `assign-milestones.sh` selesai (verifikasi #2 → Sprint 1 — Fondasi)

---

## 2026-10-09 — Sprint 2 delivery (US4.5, US2.4)

- US4.5 #28 closed · US2.4 #14 closed · US3.3 #19 closed  
- Board: US2.3 tetap **In progress** (HPP partial)

---

## 2026-10-07 — Sprint 1 selesai (inti)

- US1.1–US1.8 issues #2–#9 closed  
- Notulensi: `docs/uji-blackbox.md` US1.4–1.8

---

## 2026-10-10 — Sinkron registry ↔ GitHub (37/37 US closed)

- **Actor:** PO + agent  
- **Fakta:** Issue #2–#38 **closed**; Sprint 5 (#39–#45) + #50 masih open; `main` @ v1.12.0 (audit #80 merged).  
- **Artefak:** `progress-backlog.md`, `timeline-registry.md`, `sprint-02-operasi.md`, `sprint-05-qa.md` (urutan T5), `AC-VERIFIKASI-RISIKO.md`, `docs/audit/SUMMARY.md`.  
- **Branch docs:** _(PR docs/agile-sync)_  

---

<!-- Entri baru: salin blok di atas, jangan edit history lama kecuali typo faktual. -->
