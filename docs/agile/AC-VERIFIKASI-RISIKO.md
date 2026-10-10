# Verifikasi AC — US berisiko (post-close)

Issue US **#2–#38 sudah closed** (2026-10-10). Dokumen ini memetakan US yang perlu **uji ulang AC** sebelum go-live (Sprint 5), karena kompleksitas atau delivery bertahap.

Legenda: **Hijau** = blackbox/notulensi sudah memadai · **Kuning** = sampel uji ada, perlu regresi · **Merah** = wajib sesi uji PO sebelum T5.6 deploy

| US | Issue | Risiko | Bukti ada | Tindakan Sprint 5 |
|----|-------|--------|-----------|-------------------|
| US2.3 HPP | #13 | Banyak komponen biaya + override | PR #68, `lib/hpp.ts`, blackbox panen | T5.4 + skenario approve harvest dengan overhead |
| US2.4 Biaya | #14 | Input manual nutrisi/listrik | `/admin/biaya`, API biaya | T5.2 jurnal + biaya konsisten |
| US2.5 Susut | #15 | Jurnal abnormal | PR #66, klasifikasi susut | Regresi approve + susut abnormal |
| US5.4 Jurnal SO | #32 | Jurnal otomatis DELIVERED | PR #72 | T5.4 debit=kredit pada alur SO |
| US5.5 Invoice/batal | #33 | Packing + reversal | PR #72 | Blackbox batal + stok |
| US6.3 Ekspor | #36 | PDF/xlsx besar | PR #75, `/api/export/*` | Uji file + auth export |
| US6.4 Evaluasi | #37 | BEP / kapasitas idle | PR #76 | T5.3 Owner baca grafik |
| US1.9 User | #10 | Owner reset sandi | PR #78 | Smoke owner pengguna (e2e ada) |
| US3.2 Fase HP | #18 | Usability mobile | § US3.2 blackbox | **T5.1** wajib |

US lain: cukup **smoke e2e** + spot-check blackbox `docs/uji-blackbox.md` kecuali PO menemukan gap.

## Checklist singkat PO (centang per sesi)

- [ ] G1: panen pending → approve → jurnal 1350/5100 + HPP masuk laporan
- [ ] G4: SO → DELIVERED → jurnal pendapatan/HPP packing
- [ ] G5: ekspor neraca/LR + arus kas periode
- [ ] RBAC: Admin / Owner / Petani tanpa bypass (prod tanpa `AUDIT_BYPASS_RBAC`)

Terakhir diperbarui: **2026-10-10**.
