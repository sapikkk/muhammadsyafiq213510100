# Sprint 2 — Akuntansi, produksi, inventaris

**Goal PRD:** COA, jurnal, siklus HP, harvest, inventaris, HPP approve, master data.  
**Iteration:** 2026-10-21 → 2026-11-03 (kerja aktual dimulai overlap 2026-10-07)

Legenda status: **Done** | **Partial** | **Todo**

| US | Issue | Project | Status | PR / branch | Blackbox |
|----|-------|---------|--------|-------------|----------|
| US2.1 COA | [#11](https://github.com/sapikkk/muhammadsyafiq213510100/issues/11) | Done | Done | #52 | § US2.1 |
| US2.2 Jurnal | [#12](https://github.com/sapikkk/muhammadsyafiq213510100/issues/12) | Done | Done | #53 | § US2.2 |
| US2.3 HPP | [#13](https://github.com/sapikkk/muhammadsyafiq213510100/issues/13) | In progress | **Partial** | `feat/ui-redesign` | approve+HPP; ABC/susut/plastik sisa |
| US2.4 Biaya | [#14](https://github.com/sapikkk/muhammadsyafiq213510100/issues/14) | Done | Done | #64 stack | § 2026-10-09 notulensi |
| US2.5 Susut | [#15](https://github.com/sapikkk/muhammadsyafiq213510100/issues/15) | Todo | Todo | — | — |
| US2.6 Owner COA | [#16](https://github.com/sapikkk/muhammadsyafiq213510100/issues/16) | Todo | Todo (S4) | — | — |
| US3.1 Siklus | [#17](https://github.com/sapikkk/muhammadsyafiq213510100/issues/17) | Done | Done | #59 | § US3.1 |
| US3.2 Fase | [#18](https://github.com/sapikkk/muhammadsyafiq213510100/issues/18) | Done | Done | #60 | § US3.2 |
| US3.3 Harvest | [#19](https://github.com/sapikkk/muhammadsyafiq213510100/issues/19) | Done | Done | #62 | § US3.3 |
| US3.4 Varietas | [#20](https://github.com/sapikkk/muhammadsyafiq213510100/issues/20) | Done | Done | #58 | § US3.4 |
| US3.5 Kegagalan | [#21](https://github.com/sapikkk/muhammadsyafiq213510100/issues/21) | Todo | Todo | — | — |
| US3.6 Tambal | [#22](https://github.com/sapikkk/muhammadsyafiq213510100/issues/22) | Todo | Todo | — | — |
| US3.7 RBAC petani | [#23](https://github.com/sapikkk/muhammadsyafiq213510100/issues/23) | Todo | Todo | — | — |
| US4.1 Stok | [#24](https://github.com/sapikkk/muhammadsyafiq213510100/issues/24) | Done | Done | #54 | § US4.1 |
| US4.2 Active pack | [#25](https://github.com/sapikkk/muhammadsyafiq213510100/issues/25) | Done | Done | #55 | § US4.2 |
| US4.3 Alert | [#26](https://github.com/sapikkk/muhammadsyafiq213510100/issues/26) | Done | Done | #56 | § US4.3 |
| US4.4 Infra | [#27](https://github.com/sapikkk/muhammadsyafiq213510100/issues/27) | Done | Done | #57 | § US4.4 |
| US4.5 Petani ERD | [#28](https://github.com/sapikkk/muhammadsyafiq213510100/issues/28) | Done | Done | #64 | § 2026-10-09 |

## US2.3 — detail AC vs implementasi

**AC PRD:** HPP dari benih, rockwool, nutrisi, listrik, overhead; per lubang/kg/pack; override Admin.

| AC | Status | Bukti |
|----|--------|-------|
| Hitung on approve | ✅ | `lib/hpp.ts`, `approveLaporanPanen` |
| Jurnal 1350/5100 | ✅ | `lib/laporan-panen.ts` |
| Biaya langsung penuh | 🟡 | Benih/RW otomatis; nutrisi/listrik via US2.4 |
| Overhead alokasi | 🟡 | `allocateOverheadForSiklus` — proporsi lubang kolam |
| Susut normal/abnormal | ❌ | US2.5 |
| Override + justifikasi | ❌ | Belum UI |

## US2.4 — tech snapshot

- `lib/biaya.ts`, `/admin/biaya`, `/api/biaya/langsung`, `/api/biaya/overhead`
- `docs/api.md` entri biaya

## Temuan terbuka Sprint 2

- [#50 FINDING-01](https://github.com/sapikkk/muhammadsyafiq213510100/issues/50) — pool DB lambat
- [#61](https://github.com/sapikkk/muhammadsyafiq213510100/issues/61) UX siklus — **closed**
- [#63 FINDING-02](https://github.com/sapikkk/muhammadsyafiq213510100/issues/63) dev stale — **closed**

## Berikutnya (urutan)

1. US3.5 → US2.5  
2. US3.6, US3.7  
3. Tutup US2.3 (full AC) setelah susut
