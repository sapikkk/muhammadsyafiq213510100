# Graph Report - muhammadsyafiq213510100  (2026-10-09)

## Corpus Check
- 203 files · ~61,377 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .example 1, .css 1)

## Summary
- 1277 nodes · 3200 edges · 84 communities (76 shown, 8 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 74 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4f679bef`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- laporan-panen.ts
- siklus-produksi.ts
- lib/infrastruktur.ts
- foundation-panel.tsx
- lib/varietas.ts
- PageHeader
- next
- app-sidebar.tsx
- Input
- lib/biaya.ts
- lib/inventaris.ts
- Rencana Sprint & Backlog Agile — Kokonus Farm
- siklus/[id]/page.tsx
- lib/jurnal.ts
- pengaturan/page.tsx
- Skenario narasi UCD & Agile — Kokonus Farm
- lib/akun.ts
- Notulensi — 2026-10-09
- Kokonus Farm — panduan agent
- tambal-susulan.ts
- 6. Sprint 1: fondasi dan siapa yang boleh masuk (minggu 1–2)
- lib/active-pack.ts
- 3. Bagaimana UCD bekerja di Kokonus Farm
- Testing — Kokonus Farm
- package.json
- FINDING-01: Database Prisma Postgres lambat dan pool timeout
- 4. Agile: peran, artefak, irama, DoD
- 7. Sprint 2: Excel bertemu kolam (minggu 3–4)
- 9. Alur pengguna end-to-end dan kriteria penerimaan
- siklus-form.tsx
- @playwright/test
- format.ts
- password.ts
- Notulensi pengujian US4.3
- 8. Product backlog bernomor
- seed.js
- harvest/page.tsx
- Notulensi pengujian US4.2
- approve/route.ts
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
- akses-ditolak/page.tsx
- app/layout.tsx
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
2. `next-auth` - 50 edges
3. `Input` - 48 edges
4. `SubmitButton()` - 46 edges
5. `authOptions` - 41 edges
6. `cn()` - 36 edges
7. `Badge()` - 31 edges
8. `@prisma/client` - 31 edges
9. `Button` - 27 edges
10. `prisma` - 26 edges

## Surprising Connections (you probably didn't know these)
- `Mitigasi yang sudah dilakukan` --references--> `registerPetani()`  [INFERRED]
  docs/uji-blackbox.md → app/actions/register.ts
- `Temuan` --references--> `registerPetani()`  [INFERRED]
  docs/uji-blackbox.md → app/actions/register.ts
- `Acceptance criteria (PRD US2.2)` --references--> `JurnalActions()`  [INFERRED]
  docs/uji-blackbox.md → components/jurnal-actions.tsx
- `Temuan` --references--> `buatSiklusSemai()`  [INFERRED]
  docs/uji-blackbox.md → lib/siklus-produksi.ts
- ``/api/inventory/movement` (US4.1, log pergerakan)` --references--> `jumlah()`  [INFERRED]
  docs/api.md → components/jurnal-form.tsx

## Import Cycles
- None detected.

## Communities (84 total, 8 thin omitted)

### Community 0 - "laporan-panen.ts"
Cohesion: 0.23
Nodes (15): FormState, submitHarvestReport(), handleError(), POST(), handleError(), POST(), HarvestError, HarvestInput (+7 more)

### Community 1 - "siklus-produksi.ts"
Cohesion: 0.17
Nodes (26): FormState, mulaiSiklusSemai(), pindahFaseSiklus(), GET(), handleError(), PUT(), GET(), handleError() (+18 more)

### Community 2 - "lib/infrastruktur.ts"
Cohesion: 0.09
Nodes (53): FormState, requireAdmin(), revalidate(), simpanGreenhouse(), simpanKolam(), simpanLahan(), toState(), ubahStatusKolam() (+45 more)

### Community 3 - "foundation-panel.tsx"
Cohesion: 0.08
Nodes (59): assertAdmin(), simpanBiayaLangsung(), simpanOverhead(), ClientApproval(), dynamic, HarvestDetailAdminPage(), JurnalPage(), AdminLayout() (+51 more)

### Community 4 - "lib/varietas.ts"
Cohesion: 0.11
Nodes (41): FormState, requireWrite(), revalidate(), simpanVarietas(), toState(), ubahStatusVarietas(), AdminVarietasPage(), dynamic (+33 more)

### Community 5 - "PageHeader"
Cohesion: 0.10
Nodes (34): simpanPetaniMaster(), AdminPetaniPage(), dynamic, AdminSusutPage(), dynamic, GET(), handleError(), POST() (+26 more)

### Community 6 - "next"
Cohesion: 0.20
Nodes (12): registerPetani(), RegisterState, translate(), FormState, FormState, handler, GET(), authOptions (+4 more)

### Community 7 - "app-sidebar.tsx"
Cohesion: 0.15
Nodes (18): AppSidebar(), AppSidebarUsers(), getNavItems(), NavItem, `/api/petani` (US4.5, master Petani ERD), EPIC-1 — Core Framework & Authentication, config, middleware() (+10 more)

### Community 8 - "Input"
Cohesion: 0.21
Nodes (17): changePassword(), requestPasswordReset(), GantiSandiPage(), LupaSandiPage(), PackAktif, HarvestForm(), InventarisItemForm(), AkunPosting (+9 more)

### Community 9 - "lib/biaya.ts"
Cohesion: 0.20
Nodes (19): AdminBiayaPage(), dynamic, GET(), PUT(), requireAdmin(), GET(), POST(), requireAdmin() (+11 more)

### Community 10 - "lib/inventaris.ts"
Cohesion: 0.06
Nodes (64): catatPergerakanAdmin(), catatPergerakanForm(), catatPergerakanPetani(), FormState, requireAdmin(), requireMovement(), simpanItemInventaris(), toState() (+56 more)

### Community 11 - "Rencana Sprint & Backlog Agile — Kokonus Farm"
Cohesion: 0.18
Nodes (10): 1. Status keseluruhan proyek, 2. Backlog belum selesai, 3. Kelompok kerja (relasi), 4. Eksekusi berikutnya (prioritas), 5. Testing & referensi (repo, bukan `.agents`), Rencana Sprint & Backlog Agile — Kokonus Farm, Sprint 2 (sisa), Sprint 3 (EPIC-5) (+2 more)

### Community 12 - "siklus/[id]/page.tsx"
Cohesion: 0.16
Nodes (22): dynamic, PetaniSiklusDetailPage(), labelFase(), LogBaris, LogProduksiDaftar(), waktu, SiklusBaris, SiklusTimeline() (+14 more)

### Community 13 - "lib/jurnal.ts"
Cohesion: 0.10
Nodes (38): adminId(), ajukanJurnalAction(), barisDariForm(), bukanAdmin, JurnalFormState, putuskan(), setujuiJurnalAction(), simpanJurnal() (+30 more)

### Community 14 - "pengaturan/page.tsx"
Cohesion: 0.33
Nodes (8): changeOwnPassword(), currentUserId(), PasswordState, ProfileState, updateProfile(), dynamic, PengaturanPage(), AccountSettings()

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

### Community 19 - "tambal-susulan.ts"
Cohesion: 0.15
Nodes (17): FormState, submitMonitorPertumbuhan(), submitTambalSusulan(), MonitorPertumbuhanForm(), catatMonitorPertumbuhan(), FASE_MONITOR, kondisiMonitorOptions, MonitorError (+9 more)

### Community 20 - "6. Sprint 1: fondasi dan siapa yang boleh masuk (minggu 1–2)"
Cohesion: 0.29
Nodes (7): 6. Sprint 1: fondasi dan siapa yang boleh masuk (minggu 1–2), Adegan F1. Login sukses, Adegan F23 (awal). Ditolak dan state jujur, Adegan F2. Login gagal, Adegan F3. Lupa sandi, Adegan F4. Register petani, Adegan F5. Logout

### Community 21 - "lib/active-pack.ts"
Cohesion: 0.13
Nodes (35): FormState, pakaiActivePackAdmin(), pakaiActivePackForm(), pakaiActivePackPetani(), requirePack(), simpanActivePack(), simpanActivePackAdmin(), simpanActivePackPetani() (+27 more)

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
Cohesion: 0.17
Nodes (11): Analisis, Bukti dari log dev server, FINDING-01: Database Prisma Postgres lambat dan pool timeout, FINDING-02: Dev server stale — `/api/auth/session` 404 dan CSS preload 404, Findings lintas US, Gejala, Gejala, Mitigasi (+3 more)

### Community 27 - "4. Agile: peran, artefak, irama, DoD"
Cohesion: 0.50
Nodes (4): 4.1 Peran di lapangan dan di Scrum, 4.2 Artefak, 4.3 Irama lima sprint, 4. Agile: peran, artefak, irama, DoD

### Community 28 - "7. Sprint 2: Excel bertemu kolam (minggu 3–4)"
Cohesion: 0.50
Nodes (4): 7.1 Master, seperti bill of quantity, 7.2 Siklus sebagai proyek mini, 7.3 HPP: cost control 1992 dalam rumus greenhouse, 7. Sprint 2: Excel bertemu kolam (minggu 3–4)

### Community 29 - "9. Alur pengguna end-to-end dan kriteria penerimaan"
Cohesion: 0.08
Nodes (25): 9. Alur pengguna end-to-end dan kriteria penerimaan, F10 — Pindah fase (HP), F11 — Catat kegagalan, F12 — Panen & harvest report, F13 — HPP & susut, F14 — Jurnal pembelian & COA, F15 — Active Pack, F16 — Movement stok (+17 more)

### Community 30 - "siklus-form.tsx"
Cohesion: 0.20
Nodes (16): dynamic, PetaniSiklusPage(), SiklusAsumsiPanel(), VarietasMeta, SiklusDaftar(), KolamOpt, PackOpt, SiklusForm() (+8 more)

### Community 32 - "format.ts"
Cohesion: 0.18
Nodes (11): dynamic, JurnalBaruPage(), barisKosong(), JurnalForm(), tambah(), keTanggalIso(), qty, rupiah (+3 more)

### Community 33 - "password.ts"
Cohesion: 0.27
Nodes (8): approvePasswordReset(), ApproveState, ChangeState, rejectPasswordReset(), RequestState, requireAdmin(), PendingReset, ResetRequests()

### Community 34 - "Notulensi pengujian US4.3"
Cohesion: 0.22
Nodes (9): jumlah(), `/api/inventory/movement` (US4.1, log pergerakan), 8.1 Kamus data operasional (sign-off ERD), Acceptance criteria (Epic 4 / Figma low-stock), Definition of Done (PRD §10), Langkah uji blackbox: API, Langkah uji blackbox: UI, Notulensi pengujian US4.3 (+1 more)

### Community 35 - "8. Product backlog bernomor"
Cohesion: 0.25
Nodes (8): 8.2 Arsitektur (halaman Architecture), 8. Product backlog bernomor, EPIC-2 — Akuntansi Double-Entry & HPP, EPIC-3 — Produksi, EPIC-4 — Inventaris & infrastruktur, EPIC-5 — Penjualan & pengiriman, EPIC-6 — Dashboard, visualisasi, ekspor, Sprint 5 — QA (bukan epic fitur)

### Community 36 - "seed.js"
Cohesion: 0.15
Nodes (13): accounts, { hash }, seedInfrastruktur(), seedInventaris(), seedPetani(), prisma, { PrismaClient }, { seedAkun } (+5 more)

### Community 37 - "harvest/page.tsx"
Cohesion: 0.48
Nodes (6): AdminHarvestPage(), dynamic, GET(), HarvestAdminDaftar(), listLaporanPanen(), serializeLaporanPanen()

### Community 38 - "Notulensi pengujian US4.2"
Cohesion: 0.33
Nodes (6): Acceptance criteria (F15 / US4.2), Definition of Done (PRD §10), Langkah uji blackbox: API, Langkah uji blackbox: UI, Notulensi pengujian US4.2, Temuan

### Community 39 - "approve/route.ts"
Cohesion: 0.83
Nodes (3): handleError(), POST(), approveLaporanPanen()

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
Cohesion: 0.25
Nodes (8): Notulensi 2026-10-09 — backlog, Graphify, US4.5, US2.4, Otomatisasi, US2.4 Biaya langsung & overhead, US2.5 Klasifikasi susut, US3.5 Log kegagalan, US3.6 Tambal, monitor, timeline, US3.7 Dashboard petani, US4.5 Master petani

### Community 75 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, bcryptjs, class-variance-authority, clsx, lucide-react, next, next-auth, @prisma/client (+7 more)

### Community 93 - "PRD Agile — Kokonus Farm"
Cohesion: 0.15
Nodes (13): 11. API (kerangka, target sprint), 12. Matriks RBAC (kerangka, nama peran Kokonus), 13. Risiko (dari register kerangka, konteks Kokonus), 14. Uji kesiapan (Sprint 5), 15. Glosarium singkat, 16. Out of scope / later (ulang operasional), 17. Cara pakai backlog, 2. Tujuan (+5 more)

### Community 94 - "prisma.ts"
Cohesion: 0.06
Nodes (49): FormState, submitLogKegagalan(), klasifikasiSusut(), labelKategori(), LogKegagalanDaftar(), Row, KlasifikasiBaris(), LogMenunggu (+41 more)

### Community 95 - "Catatan uji blackbox Kokonus Farm"
Cohesion: 0.15
Nodes (15): Acceptance criteria, Acceptance criteria (F10 / US3.2), Akun demo, Alur kerja per user story, Cara membaca, Catatan uji blackbox Kokonus Farm, Definition of Done (PRD bagian 10), Langkah uji blackbox (+7 more)

### Community 115 - "Dokumentasi API"
Cohesion: 0.17
Nodes (12): `/api/accounts` (US2.1, bagan akun), `/api/biaya/langsung` · `/api/biaya/overhead` (US2.4), `/api/harvest` (US3.3, laporan panen), `/api/infrastructure/lahan` · `/greenhouse` · `/kolam`, `/api/infrastructure` (US4.4, pohon lahan → greenhouse → kolam), `/api/inventory/alert` (US4.3, stok di bawah minimum), `/api/inventory` (US4.1, stok bahan), `/api/production/[id]/phase` (US3.2, pindah fase) (+4 more)

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

### Community 150 - "akses-ditolak/page.tsx"
Cohesion: 0.36
Nodes (5): AksesDitolakPage(), Error(), NotFound(), StateScreen(), roleHome

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
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 527 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `laporan-panen.ts`, `siklus-produksi.ts`, `lib/infrastruktur.ts`, `foundation-panel.tsx`, `lib/varietas.ts`, `PageHeader`, `app-sidebar.tsx`, `Input`, `lib/biaya.ts`, `lib/inventaris.ts`, `siklus/[id]/page.tsx`, `lib/jurnal.ts`, `pengaturan/page.tsx`, `lib/akun.ts`, `tambal-susulan.ts`, `lib/active-pack.ts`, `akses-ditolak/page.tsx`, `app/layout.tsx`, `package.json`, `password.ts`, `approve/route.ts`, `prisma.ts`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `prettier`, `@semantic-release/changelog` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `lib/infrastruktur.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09176587301587301 - nodes in this community are weakly interconnected._
- **Why does `@prisma/client` connect `lib/inventaris.ts` to `laporan-panen.ts`, `siklus-produksi.ts`, `lib/infrastruktur.ts`, `foundation-panel.tsx`, `lib/varietas.ts`, `PageHeader`, `next`, `seed.js`, `Input`, `lib/biaya.ts`, `lib/jurnal.ts`, `lib/akun.ts`, `tambal-susulan.ts`, `lib/active-pack.ts`, `package.json`, `prisma.ts`, `siklus-form.tsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Should `foundation-panel.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08072707832130446 - nodes in this community are weakly interconnected._
- **Why does `Catatan uji blackbox Kokonus Farm` connect `Catatan uji blackbox Kokonus Farm` to `Notulensi pengujian US4.3`, `Notulensi pengujian US2.1`, `Notulensi pengujian US2.2`, `Notulensi pengujian US4.1`, `Notulensi pengujian US4.2`, `Notulensi pengujian US4.4`, `Notulensi pengujian US1.6`, `Notulensi pengujian US3.4`, `Notulensi pengujian US1.8`, `Notulensi pengujian US1.7`, `Notulensi pengujian US3.1`, `Notulensi pengujian US1.5`, `FINDING-01: Database Prisma Postgres lambat dan pool timeout`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Should `lib/varietas.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11450980392156863 - nodes in this community are weakly interconnected._