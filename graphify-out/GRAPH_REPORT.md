# Graph Report - muhammadsyafiq213510100  (2026-10-09)

## Corpus Check
- 204 files · ~62,325 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .example 1, .css 1)

## Summary
- 1286 nodes · 3232 edges · 70 communities (63 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 74 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `765aa66f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- laporan-panen.ts
- siklus-produksi.ts
- next-auth
- foundation-panel.tsx
- lib/varietas.ts
- PageHeader
- Kelompok kerja (relasi antar US)
- next
- Input
- lib/biaya.ts
- lib/inventaris.ts
- Rencana Sprint & Backlog Agile — Kokonus Farm
- FINDING-01: Database Prisma Postgres lambat dan pool timeout
- lib/jurnal.ts
- Skenario narasi UCD & Agile — Kokonus Farm
- lib/akun.ts
- Notulensi — 2026-10-09
- Kokonus Farm — panduan agent
- lib/active-pack.ts
- Testing — Kokonus Farm
- package.json
- notes.md
- 9. Alur pengguna end-to-end dan kriteria penerimaan
- @playwright/test
- Notulensi pengujian US4.3
- 8. Product backlog bernomor
- seed.js
- Notulensi pengujian US4.2
- Notulensi pengujian US4.4
- seed-akun.js
- components.json
- Layar web (frame 1920×1080, nama `web-*` / `petani-*`)
- compilerOptions
- devDependencies
- Notulensi 2026-10-09 — backlog, Graphify, US4.5, US2.4
- dependencies
- PRD Agile — Kokonus Farm
- prisma.ts
- Catatan uji blackbox Kokonus Farm
- Dokumentasi API
- Varietas & harga retail (kisaran)
- scripts
- CHANGELOG.md
- Konteks proyek — KOKONUS FARM
- Notulensi pengujian US2.1
- Notulensi pengujian US2.2
- Notulensi pengujian US4.1
- Notulensi pengujian USX.Y
- Superpowers (Cursor Agent)
- 7. Rencana sprint
- Notulensi pengujian US1.5
- Notulensi pengujian US1.6
- Notulensi pengujian US3.4
- Notulensi pengujian US1.8
- Notulensi pengujian US1.7
- Notulensi pengujian US3.1
- extends
- .prettierrc.json
- Kokonus Farm
- tailwind.config.ts
- 10. Definition of Done
- 1. Visi produk
- 4. Lingkup
- next.config.mjs
- repository
- engines
- prisma

## God Nodes (most connected - your core abstractions)
1. `next` - 74 edges
2. `Input` - 50 edges
3. `next-auth` - 50 edges
4. `SubmitButton()` - 46 edges
5. `authOptions` - 41 edges
6. `cn()` - 36 edges
7. `@prisma/client` - 32 edges
8. `Badge()` - 31 edges
9. `Button` - 27 edges
10. `prisma` - 26 edges

## Surprising Connections (you probably didn't know these)
- `Mitigasi yang sudah dilakukan` --references--> `registerPetani()`  [INFERRED]
  docs/uji-blackbox.md → app/actions/register.ts
- `Temuan` --references--> `registerPetani()`  [INFERRED]
  docs/uji-blackbox.md → app/actions/register.ts
- `Acceptance criteria (PRD US2.2)` --references--> `JurnalActions()`  [INFERRED]
  docs/uji-blackbox.md → components/jurnal-actions.tsx
- `G1 — **Journey panen → HPP → jurnal** (EPIC-2 + EPIC-3)` --references--> `calculateHPP()`  [INFERRED]
  docs/progress-backlog.md → lib/hpp.ts
- `Temuan` --references--> `buatSiklusSemai()`  [INFERRED]
  docs/uji-blackbox.md → lib/siklus-produksi.ts

## Import Cycles
- 3-file cycle: `lib/hpp-override.ts -> lib/laporan-panen.ts -> lib/hpp.ts -> lib/hpp-override.ts`

## Communities (70 total, 7 thin omitted)

### Community 0 - "laporan-panen.ts"
Cohesion: 0.09
Nodes (38): FormState, submitHarvestReport(), dynamic, HarvestDetailAdminPage(), AdminHarvestPage(), dynamic, handleError(), POST() (+30 more)

### Community 1 - "siklus-produksi.ts"
Cohesion: 0.10
Nodes (42): FormState, mulaiSiklusSemai(), pindahFaseSiklus(), GET(), handleError(), PUT(), GET(), handleError() (+34 more)

### Community 2 - "next-auth"
Cohesion: 0.07
Nodes (67): FormState, requireAdmin(), revalidate(), simpanGreenhouse(), simpanKolam(), simpanLahan(), toState(), ubahStatusKolam() (+59 more)

### Community 3 - "foundation-panel.tsx"
Cohesion: 0.09
Nodes (53): ClientApproval(), AdminPage(), dynamic, formatter, LoginPage(), dynamic, OwnerPage(), HomePage() (+45 more)

### Community 4 - "lib/varietas.ts"
Cohesion: 0.11
Nodes (41): FormState, requireWrite(), revalidate(), simpanVarietas(), toState(), ubahStatusVarietas(), AdminVarietasPage(), dynamic (+33 more)

### Community 5 - "PageHeader"
Cohesion: 0.14
Nodes (26): simpanPetaniMaster(), AdminPetaniPage(), dynamic, AdminSusutPage(), dynamic, GET(), handleError(), POST() (+18 more)

### Community 6 - "Kelompok kerja (relasi antar US)"
Cohesion: 0.15
Nodes (12): Daftar kerja prioritas (what to do next), G1 — **Journey panen → HPP → jurnal** (EPIC-2 + EPIC-3), G2 — **Produksi lapangan & timeline** (EPIC-3), G3 — **Master data operasional** (EPIC-1 + EPIC-4), G4 — **Penjualan end-to-end** (EPIC-5) — Sprint 3, G5 — **Owner visibility & laporan** (EPIC-2 + EPIC-6) — Sprint 4, G6 — **QA & go-live** (Sprint 5), Kelompok kerja (relasi antar US) (+4 more)

### Community 7 - "next"
Cohesion: 0.05
Nodes (52): AdminLayout(), AdminStokRendahPage(), dynamic, AksesDitolakPage(), Error(), inter, metadata, RootLayout() (+44 more)

### Community 8 - "Input"
Cohesion: 0.05
Nodes (75): FormState, submitMonitorPertumbuhan(), approvePasswordReset(), ApproveState, changePassword(), ChangeState, rejectPasswordReset(), requestPasswordReset() (+67 more)

### Community 9 - "lib/biaya.ts"
Cohesion: 0.18
Nodes (22): assertAdmin(), simpanBiayaLangsung(), simpanOverhead(), AdminBiayaPage(), dynamic, GET(), PUT(), requireAdmin() (+14 more)

### Community 10 - "lib/inventaris.ts"
Cohesion: 0.08
Nodes (48): catatPergerakanAdmin(), catatPergerakanForm(), catatPergerakanPetani(), FormState, requireAdmin(), requireMovement(), simpanItemInventaris(), toState() (+40 more)

### Community 11 - "Rencana Sprint & Backlog Agile — Kokonus Farm"
Cohesion: 0.18
Nodes (10): 1. Status keseluruhan proyek, 2. Backlog belum selesai, 3. Kelompok kerja (relasi), 4. Eksekusi berikutnya (prioritas), 5. Testing & referensi (repo, bukan `.agents`), Rencana Sprint & Backlog Agile — Kokonus Farm, Sprint 2 (sisa), Sprint 3 (EPIC-5) (+2 more)

### Community 12 - "FINDING-01: Database Prisma Postgres lambat dan pool timeout"
Cohesion: 0.33
Nodes (6): Analisis, Bukti dari log dev server, FINDING-01: Database Prisma Postgres lambat dan pool timeout, Gejala, Mitigasi yang sudah dilakukan, Rekomendasi sebelum demo sidang

### Community 13 - "lib/jurnal.ts"
Cohesion: 0.08
Nodes (44): adminId(), ajukanJurnalAction(), barisDariForm(), bukanAdmin, JurnalFormState, putuskan(), setujuiJurnalAction(), simpanJurnal() (+36 more)

### Community 15 - "Skenario narasi UCD & Agile — Kokonus Farm"
Cohesion: 0.06
Nodes (32): 10. Sprint 5: uji UCD (minggu 9–10), 11. Dua puluh empat alur sebagai satu cerita, 12. Matriks: siapa pegang pena, 13. Out of scope, 14. Epilog, 1. Prolog: Excel yang pernah cukup, greenhouse yang tidak mau menunggu, 2. Visi, misi, dan janji skripsi, 3.1 Empathize (+24 more)

### Community 16 - "lib/akun.ts"
Cohesion: 0.12
Nodes (34): AkunFormState, formToRecord(), requireAdmin(), saveAkun(), toggleAkun(), AkunPage(), dynamic, GET() (+26 more)

### Community 17 - "Notulensi — 2026-10-09"
Cohesion: 0.25
Nodes (7): Berikutnya, Branch, GitHub Project, Notulensi — 2026-10-09, Pull request, Ringkasan sesi, Uji disarankan

### Community 18 - "Kokonus Farm — panduan agent"
Cohesion: 0.29
Nodes (6): Backlog, Graphify (wajib untuk eksplorasi kode), Humanizer (prosa), Kokonus Farm — panduan agent, Ponytail (implementasi), Superpowers (proses)

### Community 21 - "lib/active-pack.ts"
Cohesion: 0.12
Nodes (33): FormState, pakaiActivePackAdmin(), pakaiActivePackForm(), pakaiActivePackPetani(), requirePack(), simpanActivePack(), simpanActivePackAdmin(), simpanActivePackPetani() (+25 more)

### Community 23 - "Testing — Kokonus Farm"
Cohesion: 0.33
Nodes (5): Playwright (E2E), Sprint 5, Submodule referensi, TestCafe (opsional), Testing — Kokonus Farm

### Community 25 - "package.json"
Cohesion: 0.08
Nodes (25): description, prettier, name, private, version, autoprefixer, clsx, eslint (+17 more)

### Community 26 - "notes.md"
Cohesion: 0.20
Nodes (5): FINDING-02: Dev server stale — `/api/auth/session` 404 dan CSS preload 404, Findings lintas US, Gejala, Mitigasi, Penyebab

### Community 29 - "9. Alur pengguna end-to-end dan kriteria penerimaan"
Cohesion: 0.08
Nodes (25): 9. Alur pengguna end-to-end dan kriteria penerimaan, F10 — Pindah fase (HP), F11 — Catat kegagalan, F12 — Panen & harvest report, F13 — HPP & susut, F14 — Jurnal pembelian & COA, F15 — Active Pack, F16 — Movement stok (+17 more)

### Community 34 - "Notulensi pengujian US4.3"
Cohesion: 0.22
Nodes (9): jumlah(), `/api/inventory/movement` (US4.1, log pergerakan), 8.1 Kamus data operasional (sign-off ERD), Acceptance criteria (Epic 4 / Figma low-stock), Definition of Done (PRD §10), Langkah uji blackbox: API, Langkah uji blackbox: UI, Notulensi pengujian US4.3 (+1 more)

### Community 35 - "8. Product backlog bernomor"
Cohesion: 0.25
Nodes (8): 8.2 Arsitektur (halaman Architecture), 8. Product backlog bernomor, EPIC-2 — Akuntansi Double-Entry & HPP, EPIC-3 — Produksi, EPIC-4 — Inventaris & infrastruktur, EPIC-5 — Penjualan & pengiriman, EPIC-6 — Dashboard, visualisasi, ekspor, Sprint 5 — QA (bukan epic fitur)

### Community 36 - "seed.js"
Cohesion: 0.15
Nodes (13): accounts, { hash }, seedInfrastruktur(), seedInventaris(), seedPetani(), prisma, { PrismaClient }, { seedAkun } (+5 more)

### Community 38 - "Notulensi pengujian US4.2"
Cohesion: 0.29
Nodes (7): Acceptance criteria (F15 / US4.2), Definition of Done (PRD §10), Keputusan desain yang mengikat, Langkah uji blackbox: API, Langkah uji blackbox: UI, Notulensi pengujian US4.2, Temuan

### Community 40 - "Notulensi pengujian US4.4"
Cohesion: 0.50
Nodes (4): Acceptance criteria (F7 / PRD), Langkah uji blackbox: API, Notulensi pengujian US4.4, Temuan

### Community 41 - "seed-akun.js"
Cohesion: 0.50
Nodes (3): akunAnak, akunInduk, seedAkun()

### Community 46 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 49 - "Layar web (frame 1920×1080, nama `web-*` / `petani-*`)"
Cohesion: 0.11
Nodes (17): Admin (akuntansi / inventaris / harvest / SO), Architecture & Diagram, Auth & global, Celah / gap, Dashboard, Evaluasi & laporan, Halaman (35), Inventaris Figma — KOKONUS FARM (+9 more)

### Community 50 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+9 more)

### Community 54 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, autoprefixer, eslint, eslint-config-next, eslint-config-prettier, @playwright/test, postcss, prettier (+11 more)

### Community 74 - "Notulensi 2026-10-09 — backlog, Graphify, US4.5, US2.4"
Cohesion: 0.22
Nodes (9): Notulensi 2026-10-09 — backlog, Graphify, US4.5, US2.4, Otomatisasi, US2.3 Override HPP & plastik, US2.4 Biaya langsung & overhead, US2.5 Klasifikasi susut, US3.5 Log kegagalan, US3.6 Tambal, monitor, timeline, US3.7 Dashboard petani (+1 more)

### Community 75 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, bcryptjs, class-variance-authority, clsx, lucide-react, next, next-auth, @prisma/client (+7 more)

### Community 93 - "PRD Agile — Kokonus Farm"
Cohesion: 0.15
Nodes (13): 11. API (kerangka, target sprint), 12. Matriks RBAC (kerangka, nama peran Kokonus), 13. Risiko (dari register kerangka, konteks Kokonus), 14. Uji kesiapan (Sprint 5), 15. Glosarium singkat, 16. Out of scope / later (ulang operasional), 17. Cara pakai backlog, 2. Tujuan (+5 more)

### Community 94 - "prisma.ts"
Cohesion: 0.09
Nodes (34): FormState, submitLogKegagalan(), FormState, klasifikasiSusut(), labelKategori(), LogKegagalanDaftar(), Row, KlasifikasiBaris() (+26 more)

### Community 95 - "Catatan uji blackbox Kokonus Farm"
Cohesion: 0.15
Nodes (15): Acceptance criteria, Acceptance criteria (F10 / US3.2), Akun demo, Alur kerja per user story, Cara membaca, Catatan uji blackbox Kokonus Farm, Definition of Done (PRD bagian 10), Langkah uji blackbox (+7 more)

### Community 115 - "Dokumentasi API"
Cohesion: 0.15
Nodes (13): `/api/accounts` (US2.1, bagan akun), `/api/biaya/langsung` · `/api/biaya/overhead` (US2.4), `/api/harvest` (US3.3, laporan panen), `/api/infrastructure/lahan` · `/greenhouse` · `/kolam`, `/api/infrastructure` (US4.4, pohon lahan → greenhouse → kolam), `/api/inventory/active-pack` (US4.2), `/api/inventory/alert` (US4.3, stok di bawah minimum), `/api/inventory` (US4.1, stok bahan) (+5 more)

### Community 134 - "Varietas & harga retail (kisaran)"
Cohesion: 0.22
Nodes (8): Asumsi benih & media semai (hidroponik), Estimasi biji per gram, Kailan, Kale, Pakcoy, Rockwool, Selada, Varietas & harga retail (kisaran)

### Community 136 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, dev, dev:clean, format, format:check, lint, start (+3 more)

### Community 137 - "CHANGELOG.md"
Cohesion: 0.25
Nodes (7): 1.0.0 (2026-10-07), [1.1.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.0.0...v1.1.0) (2026-10-07), [1.2.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.1.0...v1.2.0) (2026-10-07), Bug Fixes, Features, Features, Features

### Community 149 - "Konteks proyek — KOKONUS FARM"
Cohesion: 0.25
Nodes (7): Batasan, Deliverable terkait, Hierarki sumber jika bentrok, Konteks proyek — KOKONUS FARM, Persona Owner (fakta, bukan naskah), Sumber (read-only), Tujuan yang bertahan

### Community 166 - "Notulensi pengujian US2.1"
Cohesion: 0.29
Nodes (7): Acceptance criteria (PRD US2.1), Definition of Done (PRD bagian 10), Keputusan desain yang mengikat, Langkah uji blackbox: API, Langkah uji blackbox: UI, Notulensi pengujian US2.1, Temuan

### Community 167 - "Notulensi pengujian US2.2"
Cohesion: 0.29
Nodes (7): Acceptance criteria (PRD US2.2), Definition of Done (PRD bagian 10), Keputusan desain yang mengikat, Langkah uji blackbox: API (26 langkah), Langkah uji blackbox: UI, Notulensi pengujian US2.2, Temuan

### Community 168 - "Notulensi pengujian US4.1"
Cohesion: 0.29
Nodes (7): Acceptance criteria (PRD US4.1 + F16), Definition of Done (PRD bagian 10), Keputusan desain yang mengikat, Langkah uji blackbox: API, Langkah uji blackbox: UI, Notulensi pengujian US4.1, Temuan

### Community 169 - "Notulensi pengujian USX.Y"
Cohesion: 0.29
Nodes (6): Acceptance criteria, Definition of Done (PRD bagian 10), Keputusan desain yang mengikat, Langkah uji blackbox, Notulensi pengujian USX.Y, Temuan

### Community 183 - "Superpowers (Cursor Agent)"
Cohesion: 0.33
Nodes (5): Aktifkan di Cursor, Catatan, Perbarui versi, Setelah clone, Superpowers (Cursor Agent)

### Community 184 - "7. Rencana sprint"
Cohesion: 0.33
Nodes (6): 7. Rencana sprint, Sprint 1 — Fondasi & autentikasi (Minggu 1–2) · 34 pts inti, Sprint 2 — Akuntansi, produksi, inventaris (Minggu 3–4) · 55 pts, Sprint 3 — Penjualan & pengiriman (Minggu 5–6) · 34 pts, Sprint 4 — Dashboard & ekspor (Minggu 7–8) · 21 pts, Sprint 5 — QA, usability, go-live (Minggu 9–10) · 13 pts QA

### Community 185 - "Notulensi pengujian US1.5"
Cohesion: 0.33
Nodes (6): Acceptance criteria, Definition of Done, Keputusan desain yang mengikat, Langkah uji blackbox, Notulensi pengujian US1.5, Temuan

### Community 203 - "Notulensi pengujian US1.6"
Cohesion: 0.33
Nodes (6): Acceptance criteria, Definition of Done, Keputusan desain yang mengikat, Langkah uji blackbox, Notulensi pengujian US1.6, Temuan

### Community 204 - "Notulensi pengujian US3.4"
Cohesion: 0.40
Nodes (5): Acceptance criteria (F6 / PRD), Langkah uji blackbox: API, Langkah uji blackbox: UI, Notulensi pengujian US3.4, Temuan

### Community 205 - "Notulensi pengujian US1.8"
Cohesion: 0.40
Nodes (5): Acceptance criteria (PRD F23), Definition of Done, Langkah uji blackbox, Notulensi pengujian US1.8, Temuan

### Community 206 - "Notulensi pengujian US1.7"
Cohesion: 0.40
Nodes (5): Acceptance criteria (PRD F24 dan layar settings Figma), Definition of Done, Langkah uji blackbox, Notulensi pengujian US1.7, Temuan

### Community 207 - "Notulensi pengujian US3.1"
Cohesion: 0.40
Nodes (5): Acceptance criteria (PRD US3.1 / F9), Definition of Done (PRD §10), Langkah uji blackbox, Notulensi pengujian US3.1, Temuan

### Community 225 - "extends"
Cohesion: 0.50
Nodes (3): extends, prettier, next/core-web-vitals

### Community 226 - ".prettierrc.json"
Cohesion: 0.50
Nodes (3): semi, singleQuote, trailingComma

### Community 227 - "Kokonus Farm"
Cohesion: 0.50
Nodes (3): Cursor Agent (Superpowers), Kokonus Farm, Menjalankan lokal

### Community 228 - "tailwind.config.ts"
Cohesion: 0.50
Nodes (3): tailwindcss, tailwindcss-animate, config

### Community 247 - "10. Definition of Done"
Cohesion: 0.67
Nodes (3): 10. Definition of Done, Sprint, User story (semua WAJIB kecuali yang bertanda PENTING)

### Community 248 - "1. Visi produk"
Cohesion: 0.67
Nodes (3): 1. Visi produk, Misi, Tagline operasional

### Community 249 - "4. Lingkup"
Cohesion: 0.67
Nodes (3): 4. Lingkup, Dalam lingkup, Di luar lingkup (nanti / bukan skripsi)

### Community 251 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

## Knowledge Gaps
- **18 isolated node(s):** `next/core-web-vitals`, `prettier`, `@semantic-release/changelog`, `@semantic-release/git`, `@types/bcryptjs` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 529 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `laporan-panen.ts`, `siklus-produksi.ts`, `next-auth`, `foundation-panel.tsx`, `lib/varietas.ts`, `PageHeader`, `Input`, `lib/biaya.ts`, `lib/inventaris.ts`, `lib/jurnal.ts`, `lib/akun.ts`, `lib/active-pack.ts`, `package.json`, `prisma.ts`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `prettier`, `@semantic-release/changelog` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `laporan-panen.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09438775510204081 - nodes in this community are weakly interconnected._
- **Why does `@prisma/client` connect `lib/inventaris.ts` to `laporan-panen.ts`, `siklus-produksi.ts`, `next-auth`, `foundation-panel.tsx`, `lib/varietas.ts`, `PageHeader`, `seed.js`, `next`, `Input`, `lib/biaya.ts`, `lib/jurnal.ts`, `lib/akun.ts`, `lib/active-pack.ts`, `package.json`, `prisma.ts`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Should `siklus-produksi.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10105580693815988 - nodes in this community are weakly interconnected._
- **Why does `calculateHPP()` connect `laporan-panen.ts` to `notes.md`, `Kelompok kerja (relasi antar US)`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Should `next-auth` be split into smaller, more focused modules?**
  _Cohesion score 0.06769936890418818 - nodes in this community are weakly interconnected._