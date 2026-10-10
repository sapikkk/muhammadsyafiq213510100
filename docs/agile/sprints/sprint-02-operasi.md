# Sprint 2 — Akuntansi, produksi, inventaris

**Goal PRD:** COA, jurnal, siklus HP, harvest, inventaris, HPP approve, master data.  
**Iteration:** 2026-10-08 → 2026-10-21 · **Status sprint:** **Done** (issue #11–#28 closed, 2026-10-09)

| US | Issue | Status | PR / bukti | Blackbox |
|----|-------|--------|------------|----------|
| US2.1 COA | [#11](https://github.com/sapikkk/muhammadsyafiq213510100/issues/11) | Done | #52 | § US2.1 |
| US2.2 Jurnal | [#12](https://github.com/sapikkk/muhammadsyafiq213510100/issues/12) | Done | #53 | § US2.2 |
| US2.3 HPP | [#13](https://github.com/sapikkk/muhammadsyafiq213510100/issues/13) | Done | #68 | approve + override + plastik |
| US2.4 Biaya | [#14](https://github.com/sapikkk/muhammadsyafiq213510100/issues/14) | Done | #64 | notulensi 2026-10-09 |
| US2.5 Susut | [#15](https://github.com/sapikkk/muhammadsyafiq213510100/issues/15) | Done | #66 | klasifikasi + jurnal |
| US2.6 Owner COA | [#16](https://github.com/sapikkk/muhammadsyafiq213510100/issues/16) | Done (S4) | #78 | § Owner jurnal |
| US3.1 Siklus | [#17](https://github.com/sapikkk/muhammadsyafiq213510100/issues/17) | Done | #59 | § US3.1 |
| US3.2 Fase | [#18](https://github.com/sapikkk/muhammadsyafiq213510100/issues/18) | Done | #60 | § US3.2 |
| US3.3 Harvest | [#19](https://github.com/sapikkk/muhammadsyafiq213510100/issues/19) | Done | #62 | § US3.3 |
| US3.4 Varietas | [#20](https://github.com/sapikkk/muhammadsyafiq213510100/issues/20) | Done | #58 | § US3.4 |
| US3.5 Kegagalan | [#21](https://github.com/sapikkk/muhammadsyafiq213510100/issues/21) | Done | #66 | log kegagalan |
| US3.6 Tambal | [#22](https://github.com/sapikkk/muhammadsyafiq213510100/issues/22) | Done | #67 | timeline siklus |
| US3.7 Tugas petani | [#23](https://github.com/sapikkk/muhammadsyafiq213510100/issues/23) | Done | #67 | `/petani` panel |
| US4.1 Stok | [#24](https://github.com/sapikkk/muhammadsyafiq213510100/issues/24) | Done | #54 | § US4.1 |
| US4.2 Active pack | [#25](https://github.com/sapikkk/muhammadsyafiq213510100/issues/25) | Done | #55 | § US4.2 |
| US4.3 Alert | [#26](https://github.com/sapikkk/muhammadsyafiq213510100/issues/26) | Done | #56 | § US4.3 |
| US4.4 Infra | [#27](https://github.com/sapikkk/muhammadsyafiq213510100/issues/27) | Done | #57 | § US4.4 |
| US4.5 Petani ERD | [#28](https://github.com/sapikkk/muhammadsyafiq213510100/issues/28) | Done | #64 | master petani |

## US2.3 — AC vs implementasi (arsip)

| AC | Status | Bukti |
|----|--------|-------|
| Hitung on approve | ✅ | `lib/hpp.ts`, `approveLaporanPanen` |
| Jurnal 1350/5100 | ✅ | `lib/laporan-panen.ts` |
| Biaya langsung + overhead | ✅ | US2.4 + alokasi di HPP |
| Susut normal/abnormal | ✅ | US2.5 |
| Override + justifikasi | ✅ | PR #68 |

Regresi AC: lihat [AC-VERIFIKASI-RISIKO.md](../AC-VERIFIKASI-RISIKO.md).

## Temuan

- [#50 FINDING-01](https://github.com/sapikkk/muhammadsyafiq213510100/issues/50) — DB pool (open, Sprint 5)
- [#63 FINDING-02](https://github.com/sapikkk/muhammadsyafiq213510100/issues/63) — closed
