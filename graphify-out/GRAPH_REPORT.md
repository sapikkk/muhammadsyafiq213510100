# Graph Report - muhammadsyafiq213510100  (2026-10-09)

## Corpus Check
- 193 files · ~58,824 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .example 1, .css 1)

## Summary
- 1230 nodes · 3039 edges · 75 communities (67 shown, 8 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 72 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `00e0cc1d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- laporan-panen.ts
- siklus-produksi.ts
- lib/infrastruktur.ts
- Input
- lib/varietas.ts
- petani/route.ts
- next-auth
- app-sidebar.tsx
- SubmitButton
- lib/biaya.ts
- lib/inventaris.ts
- Rencana Sprint & Backlog Agile — Kokonus Farm
- overhead/route.ts
- lib/jurnal.ts
- pengaturan/page.tsx
- Skenario narasi UCD & Agile — Kokonus Farm
- lib/akun.ts
- Notulensi — 2026-10-09
- Kokonus Farm — panduan agent
- inventory/route.ts
- 6. Sprint 1: fondasi dan siapa yang boleh masuk (minggu 1–2)
- lib/active-pack.ts
- 3. Bagaimana UCD bekerja di Kokonus Farm
- Testing — Kokonus Farm
- package.json
- FINDING-01: Database Prisma Postgres lambat dan pool timeout
- 4. Agile: peran, artefak, irama, DoD
- 7. Sprint 2: Excel bertemu kolam (minggu 3–4)
- 9. Alur pengguna end-to-end dan kriteria penerimaan
- Notulensi pengujian US3.2
- @playwright/test
- seed.js
- components.json
- Layar web (frame 1920×1080, nama `web-*` / `petani-*`)
- compilerOptions
- devDependencies
- FINDING-02: Dev server stale — `/api/auth/session` 404 dan CSS preload 404
- dependencies
- PRD Agile — Kokonus Farm
- Kelompok kerja (relasi antar US)
- Catatan uji blackbox Kokonus Farm
- Dokumentasi API
- Varietas & harga retail (kisaran)
- scripts
- CHANGELOG.md
- Konteks proyek — KOKONUS FARM
- next
- app/layout.tsx
- Notulensi pengujian US2.1
- Notulensi pengujian US2.2
- Notulensi pengujian US4.1
- Notulensi pengujian USX.Y
- Superpowers (Cursor Agent)
- 7. Rencana sprint
- Notulensi pengujian US1.5
- registerPetani
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
1. `next` - 71 edges
2. `next-auth` - 48 edges
3. `Input` - 44 edges
4. `SubmitButton()` - 42 edges
5. `authOptions` - 39 edges
6. `cn()` - 34 edges
7. `@prisma/client` - 30 edges
8. `Badge()` - 29 edges
9. `Button` - 27 edges
10. `react` - 25 edges

## Surprising Connections (you probably didn't know these)
- `Acceptance criteria (PRD US2.2)` --references--> `JurnalActions()`  [INFERRED]
  docs/uji-blackbox.md → components/jurnal-actions.tsx
- `G1 — **Journey panen → HPP → jurnal** (EPIC-2 + EPIC-3)` --references--> `calculateHPP()`  [INFERRED]
  docs/progress-backlog.md → lib/hpp.ts
- `Temuan` --references--> `buatSiklusSemai()`  [INFERRED]
  docs/uji-blackbox.md → lib/siklus-produksi.ts
- `Mitigasi yang sudah dilakukan` --references--> `registerPetani()`  [INFERRED]
  docs/uji-blackbox.md → app/actions/register.ts
- `Temuan` --references--> `registerPetani()`  [INFERRED]
  docs/uji-blackbox.md → app/actions/register.ts

## Import Cycles
- None detected.

## Communities (75 total, 8 thin omitted)

### Community 0 - "laporan-panen.ts"
Cohesion: 0.09
Nodes (37): FormState, submitHarvestReport(), AdminHarvestPage(), dynamic, handleError(), POST(), GET(), handleError() (+29 more)

### Community 1 - "siklus-produksi.ts"
Cohesion: 0.05
Nodes (84): FormState, submitLogKegagalan(), FormState, mulaiSiklusSemai(), pindahFaseSiklus(), AdminSusutPage(), dynamic, GET() (+76 more)

### Community 2 - "lib/infrastruktur.ts"
Cohesion: 0.09
Nodes (53): FormState, requireAdmin(), revalidate(), simpanGreenhouse(), simpanKolam(), simpanLahan(), toState(), ubahStatusKolam() (+45 more)

### Community 3 - "Input"
Cohesion: 0.07
Nodes (70): ClientApproval(), dynamic, HarvestDetailAdminPage(), dynamic, JurnalDetailPage(), waktu, dynamic, JurnalPage() (+62 more)

### Community 4 - "lib/varietas.ts"
Cohesion: 0.11
Nodes (41): FormState, requireWrite(), revalidate(), simpanVarietas(), toState(), ubahStatusVarietas(), AdminVarietasPage(), dynamic (+33 more)

### Community 5 - "petani/route.ts"
Cohesion: 0.22
Nodes (18): simpanPetaniMaster(), GET(), handleError(), POST(), PUT(), requireRead(), requireWrite(), dynamic (+10 more)

### Community 6 - "next-auth"
Cohesion: 0.13
Nodes (17): ApproveState, ChangeState, RequestState, PasswordState, ProfileState, RegisterState, FormState, handler (+9 more)

### Community 7 - "app-sidebar.tsx"
Cohesion: 0.17
Nodes (15): AppSidebar(), AppSidebarUsers(), getNavItems(), NavItem, config, middleware(), redirectTo(), requiredRole() (+7 more)

### Community 8 - "SubmitButton"
Cohesion: 0.08
Nodes (49): approvePasswordReset(), rejectPasswordReset(), requestPasswordReset(), requireAdmin(), klasifikasiSusut(), AdminActivePackPage(), dynamic, AdminInventarisPage() (+41 more)

### Community 9 - "lib/biaya.ts"
Cohesion: 0.26
Nodes (15): assertAdmin(), simpanBiayaLangsung(), simpanOverhead(), GET(), PUT(), requireAdmin(), BiayaError, createOverhead() (+7 more)

### Community 10 - "lib/inventaris.ts"
Cohesion: 0.09
Nodes (39): catatPergerakanAdmin(), catatPergerakanForm(), catatPergerakanPetani(), FormState, requireAdmin(), requireMovement(), simpanItemInventaris(), toState() (+31 more)

### Community 11 - "Rencana Sprint & Backlog Agile — Kokonus Farm"
Cohesion: 0.18
Nodes (10): 1. Status keseluruhan proyek, 2. Backlog belum selesai, 3. Kelompok kerja (relasi), 4. Eksekusi berikutnya (prioritas), 5. Testing & referensi (repo, bukan `.agents`), Rencana Sprint & Backlog Agile — Kokonus Farm, Sprint 2 (sisa), Sprint 3 (EPIC-5) (+2 more)

### Community 12 - "overhead/route.ts"
Cohesion: 0.44
Nodes (7): AdminBiayaPage(), dynamic, GET(), POST(), requireAdmin(), listOverhead(), serializeOverhead()

### Community 13 - "lib/jurnal.ts"
Cohesion: 0.11
Nodes (36): adminId(), ajukanJurnalAction(), barisDariForm(), bukanAdmin, JurnalFormState, putuskan(), setujuiJurnalAction(), simpanJurnal() (+28 more)

### Community 14 - "pengaturan/page.tsx"
Cohesion: 0.43
Nodes (6): changeOwnPassword(), currentUserId(), updateProfile(), dynamic, PengaturanPage(), AccountSettings()

### Community 15 - "Skenario narasi UCD & Agile — Kokonus Farm"
Cohesion: 0.18
Nodes (11): 10. Sprint 5: uji UCD (minggu 9–10), 11. Dua puluh empat alur sebagai satu cerita, 12. Matriks: siapa pegang pena, 13. Out of scope, 14. Epilog, 1. Prolog: Excel yang pernah cukup, greenhouse yang tidak mau menunggu, 2. Visi, misi, dan janji skripsi, 5. Sprint 0: product backlog yang sudah bernomor (+3 more)

### Community 16 - "lib/akun.ts"
Cohesion: 0.12
Nodes (35): AkunFormState, formToRecord(), requireAdmin(), saveAkun(), toggleAkun(), AkunPage(), dynamic, GET() (+27 more)

### Community 17 - "Notulensi — 2026-10-09"
Cohesion: 0.25
Nodes (7): Berikutnya, Branch, GitHub Project, Notulensi — 2026-10-09, Pull request, Ringkasan sesi, Uji disarankan

### Community 18 - "Kokonus Farm — panduan agent"
Cohesion: 0.29
Nodes (6): Backlog, Graphify (wajib untuk eksplorasi kode), Humanizer (prosa), Kokonus Farm — panduan agent, Ponytail (implementasi), Superpowers (proses)

### Community 19 - "inventory/route.ts"
Cohesion: 0.36
Nodes (7): GET(), GET(), handleError(), POST(), requireRole(), serializeAlertStok(), serializeItem()

### Community 20 - "6. Sprint 1: fondasi dan siapa yang boleh masuk (minggu 1–2)"
Cohesion: 0.29
Nodes (7): 6. Sprint 1: fondasi dan siapa yang boleh masuk (minggu 1–2), Adegan F1. Login sukses, Adegan F23 (awal). Ditolak dan state jujur, Adegan F2. Login gagal, Adegan F3. Lupa sandi, Adegan F4. Register petani, Adegan F5. Logout

### Community 21 - "lib/active-pack.ts"
Cohesion: 0.18
Nodes (24): FormState, pakaiActivePackAdmin(), pakaiActivePackForm(), pakaiActivePackPetani(), requirePack(), simpanActivePack(), simpanActivePackAdmin(), simpanActivePackPetani() (+16 more)

### Community 22 - "3. Bagaimana UCD bekerja di Kokonus Farm"
Cohesion: 0.33
Nodes (6): 3.1 Empathize, 3.2 Define, 3.3 Ideate, 3.4 Prototype, 3.5 Test, 3. Bagaimana UCD bekerja di Kokonus Farm

### Community 23 - "Testing — Kokonus Farm"
Cohesion: 0.33
Nodes (5): Playwright (E2E), Sprint 5, Submodule referensi, TestCafe (opsional), Testing — Kokonus Farm

### Community 25 - "package.json"
Cohesion: 0.07
Nodes (26): description, prettier, name, private, version, autoprefixer, clsx, eslint (+18 more)

### Community 26 - "FINDING-01: Database Prisma Postgres lambat dan pool timeout"
Cohesion: 0.40
Nodes (5): Analisis, Bukti dari log dev server, FINDING-01: Database Prisma Postgres lambat dan pool timeout, Gejala, Rekomendasi sebelum demo sidang

### Community 27 - "4. Agile: peran, artefak, irama, DoD"
Cohesion: 0.50
Nodes (4): 4.1 Peran di lapangan dan di Scrum, 4.2 Artefak, 4.3 Irama lima sprint, 4. Agile: peran, artefak, irama, DoD

### Community 28 - "7. Sprint 2: Excel bertemu kolam (minggu 3–4)"
Cohesion: 0.50
Nodes (4): 7.1 Master, seperti bill of quantity, 7.2 Siklus sebagai proyek mini, 7.3 HPP: cost control 1992 dalam rumus greenhouse, 7. Sprint 2: Excel bertemu kolam (minggu 3–4)

### Community 29 - "9. Alur pengguna end-to-end dan kriteria penerimaan"
Cohesion: 0.08
Nodes (25): 9. Alur pengguna end-to-end dan kriteria penerimaan, F10 — Pindah fase (HP), F11 — Catat kegagalan, F12 — Panen & harvest report, F13 — HPP & susut, F14 — Jurnal pembelian & COA, F15 — Active Pack, F16 — Movement stok (+17 more)

### Community 30 - "Notulensi pengujian US3.2"
Cohesion: 0.50
Nodes (4): Acceptance criteria (F10 / US3.2), Langkah uji blackbox (API), Notulensi pengujian US3.2, Temuan

### Community 36 - "seed.js"
Cohesion: 0.12
Nodes (19): Alur kerja per user story, Peta branch dan PR, accounts, akunAnak, akunInduk, seedAkun(), { hash }, seedInfrastruktur() (+11 more)

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

### Community 74 - "FINDING-02: Dev server stale — `/api/auth/session` 404 dan CSS preload 404"
Cohesion: 0.22
Nodes (9): FINDING-02: Dev server stale — `/api/auth/session` 404 dan CSS preload 404, Findings lintas US, Gejala, Mitigasi, Notulensi 2026-10-09 — backlog, Graphify, US4.5, US2.4, Otomatisasi, Penyebab, US2.4 Biaya langsung & overhead (+1 more)

### Community 75 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, bcryptjs, class-variance-authority, clsx, lucide-react, next, next-auth, @prisma/client (+7 more)

### Community 93 - "PRD Agile — Kokonus Farm"
Cohesion: 0.15
Nodes (13): 11. API (kerangka, target sprint), 12. Matriks RBAC (kerangka, nama peran Kokonus), 13. Risiko (dari register kerangka, konteks Kokonus), 14. Uji kesiapan (Sprint 5), 15. Glosarium singkat, 16. Out of scope / later (ulang operasional), 17. Cara pakai backlog, 2. Tujuan (+5 more)

### Community 94 - "Kelompok kerja (relasi antar US)"
Cohesion: 0.15
Nodes (12): Daftar kerja prioritas (what to do next), G1 — **Journey panen → HPP → jurnal** (EPIC-2 + EPIC-3), G2 — **Produksi lapangan & timeline** (EPIC-3), G3 — **Master data operasional** (EPIC-1 + EPIC-4), G4 — **Penjualan end-to-end** (EPIC-5) — Sprint 3, G5 — **Owner visibility & laporan** (EPIC-2 + EPIC-6) — Sprint 4, G6 — **QA & go-live** (Sprint 5), Kelompok kerja (relasi antar US) (+4 more)

### Community 95 - "Catatan uji blackbox Kokonus Farm"
Cohesion: 0.17
Nodes (12): Acceptance criteria, Acceptance criteria (F7 / PRD), Akun demo, Cara membaca, Catatan uji blackbox Kokonus Farm, Definition of Done (PRD bagian 10), Langkah uji blackbox, Langkah uji blackbox: API (+4 more)

### Community 115 - "Dokumentasi API"
Cohesion: 0.05
Nodes (41): jumlah(), `/api/accounts` (US2.1, bagan akun), `/api/biaya/langsung` · `/api/biaya/overhead` (US2.4), `/api/harvest` (US3.3, laporan panen), `/api/infrastructure/lahan` · `/greenhouse` · `/kolam`, `/api/infrastructure` (US4.4, pohon lahan → greenhouse → kolam), `/api/inventory/active-pack` (US4.2), `/api/inventory/alert` (US4.3, stok di bawah minimum) (+33 more)

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

### Community 150 - "next"
Cohesion: 0.30
Nodes (7): changePassword(), AksesDitolakPage(), GantiSandiPage(), NotFound(), StateScreen(), roleHome, next

### Community 151 - "app/layout.tsx"
Cohesion: 0.38
Nodes (4): inter, metadata, RootLayout(), Providers()

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

### Community 203 - "registerPetani"
Cohesion: 0.22
Nodes (9): registerPetani(), translate(), Acceptance criteria, Definition of Done, Keputusan desain yang mengikat, Langkah uji blackbox, Mitigasi yang sudah dilakukan, Notulensi pengujian US1.6 (+1 more)

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
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 512 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `laporan-panen.ts`, `siklus-produksi.ts`, `lib/infrastruktur.ts`, `Input`, `lib/varietas.ts`, `petani/route.ts`, `next-auth`, `app-sidebar.tsx`, `SubmitButton`, `lib/biaya.ts`, `lib/inventaris.ts`, `overhead/route.ts`, `lib/jurnal.ts`, `pengaturan/page.tsx`, `lib/akun.ts`, `inventory/route.ts`, `lib/active-pack.ts`, `app/layout.tsx`, `package.json`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `prettier`, `@semantic-release/changelog` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `laporan-panen.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08603145235892692 - nodes in this community are weakly interconnected._
- **Why does `@prisma/client` connect `SubmitButton` to `laporan-panen.ts`, `siklus-produksi.ts`, `lib/infrastruktur.ts`, `Input`, `lib/varietas.ts`, `petani/route.ts`, `next-auth`, `seed.js`, `lib/biaya.ts`, `lib/inventaris.ts`, `lib/jurnal.ts`, `lib/akun.ts`, `lib/active-pack.ts`, `package.json`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `siklus-produksi.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05121293800539083 - nodes in this community are weakly interconnected._
- **Why does `Catatan uji blackbox Kokonus Farm` connect `Catatan uji blackbox Kokonus Farm` to `seed.js`, `Notulensi pengujian US2.1`, `Notulensi pengujian US2.2`, `Notulensi pengujian US4.1`, `registerPetani`, `Notulensi pengujian US3.4`, `Notulensi pengujian US1.8`, `Notulensi pengujian US1.7`, `Notulensi pengujian US3.1`, `Dokumentasi API`, `notes.md`, `Notulensi pengujian US1.5`, `Notulensi pengujian US3.2`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Should `lib/infrastruktur.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09176587301587301 - nodes in this community are weakly interconnected._