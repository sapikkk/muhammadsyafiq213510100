# Merge stack ke `main`

Panduan urutan menggabungkan rantai PR Sprint 2–3 tanpa merge “loncat” yang meninggalkan base branch.

## Status (2026-10-09)

| Step | PR | Hasil |
| --- | --- | --- |
| 1 | [#65](https://github.com/sapikkk/muhammadsyafiq213510100/pull/65) | Merged |
| 2 | [#70](https://github.com/sapikkk/muhammadsyafiq213510100/pull/70) `feat/ui-redesign` | Merged |
| 3 | [#64](https://github.com/sapikkk/muhammadsyafiq213510100/pull/64) | Closed (sudah termasuk di #70) |
| 4–7 | [#66](https://github.com/sapikkk/muhammadsyafiq213510100/pull/66) → [#69](https://github.com/sapikkk/muhammadsyafiq213510100/pull/69) | Merged ke `main` |

**Lanjutan:** US5.3/5.4 → PR `feat/us5.3-us5.4-delivery-jurnal` (setelah merge stack).

## Diagram stack (head → base)

```
main
├── #65 chore/agile-project-registry          (docs, paralel)
└── feat/ui-redesign                          (fondasi ~33 commit, PR ke main)
      └── #64 chore/testing-references
            └── #66 feat/us3.5-us2.5-susut-kegagalan
                  └── #67 feat/us3.6-us3.7-timeline-tugas
                        └── #68 feat/us2.3-hpp-override
                              └── #69 feat/us5.1-pelanggan-sales-order
                                    └── feat/us5.3-us5.4-delivery-jurnal (PR setelah #69)
```

## Urutan merge ke `main` (bottom-up)

| Step | PR / branch | Isi ringkas |
| --- | --- | --- |
| 1 | **#65** → `main` | Registry agile, timeline, skrip milestone |
| 2 | **feat/ui-redesign** → `main` | UI sidebar, US1.5–1.8, modul dasar, US3.3, dll. |
| 3 | **#64** → `main` (base di-retarget ke `main`) | US4.5, US2.4, testing stack |
| 4 | **#66** → `main` | US3.5 kegagalan, US2.5 susut |
| 5 | **#67** → `main` | US3.6 timeline/tambal, US3.7 dashboard petani |
| 6 | **#68** → `main` | US2.3 HPP override, plastik, jurnal 5300 |
| 7 | **#69** → `main` | US5.1 pelanggan + SO + konfirmasi stok |

Setelah step 2: `gh pr edit <N> --base main` untuk #64–#69, lalu merge saat CI hijau.

## PR paralel ke `main` (#46–#62)

Sebagian besar sudah termasuk di `feat/ui-redesign`. Setelah stack masuk `main`, tutup PR duplikat (*superseded by merge stack*).

## Setelah merge

```bash
git checkout main && git pull
npx prisma db push
npm run typecheck && npm run build
```
