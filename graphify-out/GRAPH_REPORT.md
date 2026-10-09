# Graph Report - muhammadsyafiq213510100  (2026-10-09)

## Corpus Check
- 238 files · ~72,166 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .example 1, .css 1)

## Summary
- 1483 nodes · 3676 edges · 100 communities (91 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 91 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2dc6f3ec`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- laporan-panen.ts
- next-auth
- lib/infrastruktur.ts
- foundation-panel.tsx
- lib/varietas.ts
- petani/route.ts
- 8. Product backlog bernomor
- Role
- siklus/[id]/page.tsx
- lib/biaya.ts
- lib/inventaris.ts
- Rencana Sprint & Backlog Agile — Kokonus Farm
- Notulensi 2026-10-09 — backlog, Graphify, US4.5, US2.4
- lib/jurnal.ts
- lib/sales-order.ts
- Notulensi pengujian US4.3
- lib/akun.ts
- Notulensi — 2026-10-09
- Kokonus Farm — panduan agent
- Input
- listAlertStokMinimum
- lib/active-pack.ts
- middleware.ts
- Testing — Kokonus Farm
- lib/pelanggan.ts
- package.json
- siklus-produksi.ts
- prisma
- agile/README.md
- 9. Alur pengguna end-to-end dan kriteria penerimaan
- monitor-produksi.ts
- @playwright/test
- next
- app/layout.tsx
- production/route.ts
- Kelompok kerja (relasi antar US)
- seed.js
- tugas-petani.ts
- Notulensi pengujian US4.2
- notes.md
- Skenario narasi UCD & Agile — Kokonus Farm
- main
- Sprint 1 — Fondasi & autentikasi
- user-story.md
- 6. Sprint 1: fondasi dan siapa yang boleh masuk (minggu 1–2)
- Panduan GitHub Project #1
- components.json
- Sprint 1 retro — Fondasi & autentikasi
- 3. Bagaimana UCD bekerja di Kokonus Farm
- Layar web (frame 1920×1080, nama `web-*` / `petani-*`)
- compilerOptions
- Notulensi pengujian US1.6
- prisma.ts
- Audit log — pelacakan progres (append-only)
- devDependencies
- Keputusan PO — pelacakan GitHub
- Kebijakan partial delivery & pelacakan
- Sprint 2 — Akuntansi, produksi, inventaris
- Notulensi pengujian US1.4
- Pelacakan Agile — Kokonus Farm
- 4. Agile: peran, artefak, irama, DoD
- 7. Sprint 2: Excel bertemu kolam (minggu 3–4)
- FINDING-02: Dev server stale — `/api/auth/session` 404 dan CSS preload 404
- assign-project-iterations.sh
- Timeline sprint — registry
- assign-milestones.sh
- dependencies
- PRD Agile — Kokonus Farm
- log-kegagalan.ts
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
1. `next` - 81 edges
2. `Input` - 57 edges
3. `next-auth` - 57 edges
4. `SubmitButton()` - 54 edges
5. `authOptions` - 48 edges
6. `cn()` - 36 edges
7. `@prisma/client` - 35 edges
8. `Badge()` - 33 edges
9. `prisma` - 29 edges
10. `react-dom` - 29 edges

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

## Communities (100 total, 9 thin omitted)

### Community 0 - "laporan-panen.ts"
Cohesion: 0.09
Nodes (41): FormState, submitHarvestReport(), dynamic, HarvestDetailAdminPage(), AdminHarvestPage(), dynamic, handleError(), POST() (+33 more)

### Community 1 - "next-auth"
Cohesion: 0.18
Nodes (16): changeOwnPassword(), currentUserId(), PasswordState, ProfileState, updateProfile(), registerPetani(), RegisterState, translate() (+8 more)

### Community 2 - "lib/infrastruktur.ts"
Cohesion: 0.09
Nodes (53): FormState, requireAdmin(), revalidate(), simpanGreenhouse(), simpanKolam(), simpanLahan(), toState(), ubahStatusKolam() (+45 more)

### Community 3 - "foundation-panel.tsx"
Cohesion: 0.08
Nodes (61): ClientApproval(), dynamic, JurnalDetailPage(), waktu, dynamic, AdminPage(), dynamic, formatter (+53 more)

### Community 4 - "lib/varietas.ts"
Cohesion: 0.11
Nodes (41): FormState, requireWrite(), revalidate(), simpanVarietas(), toState(), ubahStatusVarietas(), AdminVarietasPage(), dynamic (+33 more)

### Community 5 - "petani/route.ts"
Cohesion: 0.18
Nodes (21): simpanPetaniMaster(), AdminPetaniPage(), dynamic, GET(), handleError(), POST(), PUT(), requireRead() (+13 more)

### Community 6 - "8. Product backlog bernomor"
Cohesion: 0.22
Nodes (9): 8.2 Arsitektur (halaman Architecture), 8. Product backlog bernomor, EPIC-1 — Core Framework & Authentication, EPIC-2 — Akuntansi Double-Entry & HPP, EPIC-3 — Produksi, EPIC-4 — Inventaris & infrastruktur, EPIC-5 — Penjualan & pengiriman, EPIC-6 — Dashboard, visualisasi, ekspor (+1 more)

### Community 7 - "Role"
Cohesion: 0.19
Nodes (12): AksesDitolakPage(), Error(), NotFound(), StateScreen(), roleHome, JWT, next-auth, next-auth/jwt (+4 more)

### Community 8 - "siklus/[id]/page.tsx"
Cohesion: 0.15
Nodes (24): dynamic, PetaniSiklusDetailPage(), labelFase(), LogBaris, LogProduksiDaftar(), waktu, PindahFaseForm(), SiklusBaris (+16 more)

### Community 9 - "lib/biaya.ts"
Cohesion: 0.18
Nodes (22): assertAdmin(), simpanBiayaLangsung(), simpanOverhead(), AdminBiayaPage(), dynamic, GET(), PUT(), requireAdmin() (+14 more)

### Community 10 - "lib/inventaris.ts"
Cohesion: 0.13
Nodes (31): catatPergerakanAdmin(), catatPergerakanForm(), catatPergerakanPetani(), FormState, requireAdmin(), requireMovement(), simpanItemInventaris(), toState() (+23 more)

### Community 11 - "Rencana Sprint & Backlog Agile — Kokonus Farm"
Cohesion: 0.18
Nodes (10): 1. Status keseluruhan proyek, 2. Backlog belum selesai, 3. Kelompok kerja (relasi), 4. Eksekusi berikutnya (prioritas), 5. Testing & referensi (repo, bukan `.agents`), Rencana Sprint & Backlog Agile — Kokonus Farm, Sprint 2 (sisa), Sprint 3 (EPIC-5) (+2 more)

### Community 12 - "Notulensi 2026-10-09 — backlog, Graphify, US4.5, US2.4"
Cohesion: 0.17
Nodes (12): Notulensi 2026-10-09 — backlog, Graphify, US4.5, US2.4, Otomatisasi, US2.3 Override HPP & plastik, US2.4 Biaya langsung & overhead, US2.5 Klasifikasi susut, US3.5 Log kegagalan, US3.6 Tambal, monitor, timeline, US3.7 Dashboard petani (+4 more)

### Community 13 - "lib/jurnal.ts"
Cohesion: 0.15
Nodes (29): adminId(), ajukanJurnalAction(), barisDariForm(), bukanAdmin, JurnalFormState, putuskan(), setujuiJurnalAction(), simpanJurnal() (+21 more)

### Community 14 - "lib/sales-order.ts"
Cohesion: 0.10
Nodes (44): deliverSalesOrderAction(), deliveryRoleOk(), FormState, shipSalesOrderAction(), AdminPenjualanPage(), dynamic, PUT(), PUT() (+36 more)

### Community 15 - "Notulensi pengujian US4.3"
Cohesion: 0.22
Nodes (9): jumlah(), `/api/inventory/movement` (US4.1, log pergerakan), 8.1 Kamus data operasional (sign-off ERD), Acceptance criteria (Epic 4 / Figma low-stock), Definition of Done (PRD §10), Langkah uji blackbox: API, Langkah uji blackbox: UI, Notulensi pengujian US4.3 (+1 more)

### Community 16 - "lib/akun.ts"
Cohesion: 0.12
Nodes (35): AkunFormState, formToRecord(), requireAdmin(), saveAkun(), toggleAkun(), AkunPage(), dynamic, GET() (+27 more)

### Community 17 - "Notulensi — 2026-10-09"
Cohesion: 0.25
Nodes (7): Berikutnya, Branch, GitHub Project, Notulensi — 2026-10-09, Pull request, Ringkasan sesi, Uji disarankan

### Community 18 - "Kokonus Farm — panduan agent"
Cohesion: 0.29
Nodes (6): Backlog & pelacakan sprint, Graphify (wajib untuk eksplorasi kode), Humanizer (prosa), Kokonus Farm — panduan agent, Ponytail (implementasi), Superpowers (proses)

### Community 19 - "Input"
Cohesion: 0.05
Nodes (77): approvePasswordReset(), ApproveState, changePassword(), ChangeState, rejectPasswordReset(), requestPasswordReset(), RequestState, requireAdmin() (+69 more)

### Community 20 - "listAlertStokMinimum"
Cohesion: 0.20
Nodes (13): AdminLayout(), GET(), OwnerLayout(), PetaniLayout(), AppSidebar(), AppSidebarUsers(), getNavItems(), NavItem (+5 more)

### Community 21 - "lib/active-pack.ts"
Cohesion: 0.11
Nodes (35): FormState, pakaiActivePackAdmin(), pakaiActivePackForm(), pakaiActivePackPetani(), requirePack(), simpanActivePack(), simpanActivePackAdmin(), simpanActivePackPetani() (+27 more)

### Community 22 - "middleware.ts"
Cohesion: 0.60
Nodes (4): config, middleware(), redirectTo(), requiredRole()

### Community 23 - "Testing — Kokonus Farm"
Cohesion: 0.33
Nodes (5): Playwright (E2E), Sprint 5, Submodule referensi, TestCafe (opsional), Testing — Kokonus Farm

### Community 24 - "lib/pelanggan.ts"
Cohesion: 0.19
Nodes (20): FormState, submitPelanggan(), AdminPelangganPage(), dynamic, GET(), POST(), PUT(), requireRead() (+12 more)

### Community 25 - "package.json"
Cohesion: 0.08
Nodes (24): description, prettier, name, private, version, autoprefixer, clsx, eslint (+16 more)

### Community 26 - "siklus-produksi.ts"
Cohesion: 0.24
Nodes (17): FormState, mulaiSiklusSemai(), pindahFaseSiklus(), keTanggalIso(), buatSiklusSemai(), FASE_SEMAI, generateKodeBatch(), lanjutFase() (+9 more)

### Community 27 - "prisma"
Cohesion: 0.21
Nodes (15): dynamic, SiklusAsumsiPanel(), VarietasMeta, KolamOpt, PackOpt, SiklusForm(), VarietasOpt, BIJI_PER_GRAM_KISARAN (+7 more)

### Community 28 - "agile/README.md"
Cohesion: 0.19
Nodes (3): Sprint 3 — Penjualan & pengiriman (rencana), Sprint 4 — Dashboard, visualisasi, ekspor (rencana), Sprint 5 — QA, usability, go-live (rencana)

### Community 29 - "9. Alur pengguna end-to-end dan kriteria penerimaan"
Cohesion: 0.08
Nodes (25): 9. Alur pengguna end-to-end dan kriteria penerimaan, F10 — Pindah fase (HP), F11 — Catat kegagalan, F12 — Panen & harvest report, F13 — HPP & susut, F14 — Jurnal pembelian & COA, F15 — Active Pack, F16 — Movement stok (+17 more)

### Community 30 - "monitor-produksi.ts"
Cohesion: 0.29
Nodes (9): FormState, submitMonitorPertumbuhan(), MonitorPertumbuhanForm(), catatMonitorPertumbuhan(), FASE_MONITOR, kondisiMonitorOptions, MonitorError, MonitorInput (+1 more)

### Community 32 - "next"
Cohesion: 0.27
Nodes (9): AdminStokRendahPage(), dynamic, dynamic, OwnerStokRendahPage(), dynamic, PetaniStokRendahPage(), InventarisStokRendah(), Props (+1 more)

### Community 33 - "app/layout.tsx"
Cohesion: 0.38
Nodes (4): inter, metadata, RootLayout(), Providers()

### Community 34 - "production/route.ts"
Cohesion: 0.33
Nodes (11): GET(), handleError(), PUT(), GET(), handleError(), POST(), requireRead(), PetaniSiklusPage() (+3 more)

### Community 35 - "Kelompok kerja (relasi antar US)"
Cohesion: 0.15
Nodes (12): Daftar kerja prioritas (what to do next), G1 — **Journey panen → HPP → jurnal** (EPIC-2 + EPIC-3), G2 — **Produksi lapangan & timeline** (EPIC-3), G3 — **Master data operasional** (EPIC-1 + EPIC-4), G4 — **Penjualan end-to-end** (EPIC-5) — Sprint 3, G5 — **Owner visibility & laporan** (EPIC-2 + EPIC-6) — Sprint 4, G6 — **QA & go-live** (Sprint 5), Kelompok kerja (relasi antar US) (+4 more)

### Community 36 - "seed.js"
Cohesion: 0.15
Nodes (13): accounts, { hash }, seedInfrastruktur(), seedInventaris(), seedPetani(), prisma, { PrismaClient }, { seedAkun } (+5 more)

### Community 37 - "tugas-petani.ts"
Cohesion: 0.32
Nodes (9): dynamic, PetaniPage(), PetaniTugasPanel(), prioritasVariant(), waktu, daftarTugasPetani(), historiAktivitasPetani(), HistoriPetaniBaris (+1 more)

### Community 38 - "Notulensi pengujian US4.2"
Cohesion: 0.33
Nodes (6): Acceptance criteria (F15 / US4.2), Definition of Done (PRD §10), Langkah uji blackbox: API, Langkah uji blackbox: UI, Notulensi pengujian US4.2, Temuan

### Community 39 - "notes.md"
Cohesion: 0.18
Nodes (7): Analisis, Bukti dari log dev server, FINDING-01: Database Prisma Postgres lambat dan pool timeout, Findings lintas US, Gejala, Mitigasi yang sudah dilakukan, Rekomendasi sebelum demo / go-live staging

### Community 40 - "Skenario narasi UCD & Agile — Kokonus Farm"
Cohesion: 0.18
Nodes (11): 10. Sprint 5: uji UCD (minggu 9–10), 11. Dua puluh empat alur sebagai satu cerita, 12. Matriks: siapa pegang pena, 13. Out of scope, 14. Epilog, 1. Prolog: Excel yang pernah cukup, greenhouse yang tidak mau menunggu, 2. Visi, misi, dan janji skripsi, 5. Sprint 0: product backlog yang sudah bernomor (+3 more)

### Community 41 - "main"
Cohesion: 0.21
Nodes (10): Diagram stack (head → base), Merge stack ke `main`, PR paralel ke `main` (#46–#62), Setelah merge, Status (2026-10-09), Urutan merge ke `main` (bottom-up), akunAnak, akunInduk (+2 more)

### Community 42 - "Sprint 1 — Fondasi & autentikasi"
Cohesion: 0.20
Nodes (10): Sprint 1 — checklist demo, Sprint 1 — Fondasi & autentikasi, US1.1 — Setup Next.js 14 + TS + Tailwind + shadcn, US1.2 — Schema Prisma ERD, US1.3 — PostgreSQL + migrate/seed, US1.4 — NextAuth login/logout, US1.5 — Lupa sandi via Admin, US1.7 — Settings profil & matrix peran (+2 more)

### Community 43 - "user-story.md"
Cohesion: 0.20
Nodes (9): Acceptance criteria (tasklist), Catatan partial (isi jika menutup sebelum 100% AC), Definition of Done, DoD checklist (tasklist), Penutupan issue, Progress, Rencana teknis, Sprint · Epic (+1 more)

### Community 44 - "6. Sprint 1: fondasi dan siapa yang boleh masuk (minggu 1–2)"
Cohesion: 0.29
Nodes (7): 6. Sprint 1: fondasi dan siapa yang boleh masuk (minggu 1–2), Adegan F1. Login sukses, Adegan F23 (awal). Ditolak dan state jujur, Adegan F2. Login gagal, Adegan F3. Lupa sandi, Adegan F4. Register petani, Adegan F5. Logout

### Community 45 - "Panduan GitHub Project #1"
Cohesion: 0.33
Nodes (6): Iteration — actual start (PO 2026-10-09), Kolom, Mapping issue → sprint (PRD), Panduan GitHub Project #1, Repo vs Project, Views disarankan

### Community 46 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 47 - "Sprint 1 retro — Fondasi & autentikasi"
Cohesion: 0.33
Nodes (6): Action items (Sprint 2+), Apa yang berjalan baik, Hambatan, Keputusan proses, Ringkasan, Sprint 1 retro — Fondasi & autentikasi

### Community 48 - "3. Bagaimana UCD bekerja di Kokonus Farm"
Cohesion: 0.33
Nodes (6): 3.1 Empathize, 3.2 Define, 3.3 Ideate, 3.4 Prototype, 3.5 Test, 3. Bagaimana UCD bekerja di Kokonus Farm

### Community 49 - "Layar web (frame 1920×1080, nama `web-*` / `petani-*`)"
Cohesion: 0.11
Nodes (17): Admin (akuntansi / inventaris / harvest / SO), Architecture & Diagram, Auth & global, Celah / gap, Dashboard, Evaluasi & laporan, Halaman (35), Inventaris Figma — KOKONUS FARM (+9 more)

### Community 50 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+9 more)

### Community 51 - "Notulensi pengujian US1.6"
Cohesion: 0.33
Nodes (6): Acceptance criteria, Definition of Done, Keputusan desain yang mengikat, Langkah uji blackbox, Notulensi pengujian US1.6, Temuan

### Community 52 - "prisma.ts"
Cohesion: 0.33
Nodes (3): Client, globalForPrisma, PrismaTransaction

### Community 53 - "Audit log — pelacakan progres (append-only)"
Cohesion: 0.40
Nodes (5): 2026-10-07 — Sprint 1 selesai (inti), 2026-10-09 — Keputusan PO (partial, actual start, retro S1), 2026-10-09 — Registry Agile + sinkron GitHub, 2026-10-09 — Sprint 2 delivery (US4.5, US2.4), Audit log — pelacakan progres (append-only)

### Community 54 - "devDependencies"
Cohesion: 0.11
Nodes (19): devDependencies, autoprefixer, eslint, eslint-config-next, eslint-config-prettier, @playwright/test, postcss, prettier (+11 more)

### Community 55 - "Keputusan PO — pelacakan GitHub"
Cohesion: 0.40
Nodes (5): Backlog opsional (belum diputuskan massal), Cara memantau, Infrastruktur GitHub (status), Keputusan (final), Keputusan PO — pelacakan GitHub

### Community 56 - "Kebijakan partial delivery & pelacakan"
Cohesion: 0.40
Nodes (5): Format catatan partial (issue / sprint doc), GitHub — filter & label, Kebijakan partial delivery & pelacakan, Prinsip, Sinkron setelah merge

### Community 57 - "Sprint 2 — Akuntansi, produksi, inventaris"
Cohesion: 0.40
Nodes (4): Berikutnya (urutan), Sprint 2 — Akuntansi, produksi, inventaris, Temuan terbuka Sprint 2, US2.4 — tech snapshot

### Community 58 - "Notulensi pengujian US1.4"
Cohesion: 0.40
Nodes (5): Acceptance criteria, Definition of Done (PRD bagian 10), Langkah uji blackbox, Notulensi pengujian US1.4, Temuan

### Community 59 - "Pelacakan Agile — Kokonus Farm"
Cohesion: 0.50
Nodes (4): Alur kerja (acuan `sw-agiledevelopment`), Filter cepat (GitHub), Mulai dari sini, Pelacakan Agile — Kokonus Farm

### Community 60 - "4. Agile: peran, artefak, irama, DoD"
Cohesion: 0.50
Nodes (4): 4.1 Peran di lapangan dan di Scrum, 4.2 Artefak, 4.3 Irama lima sprint, 4. Agile: peran, artefak, irama, DoD

### Community 61 - "7. Sprint 2: Excel bertemu kolam (minggu 3–4)"
Cohesion: 0.50
Nodes (4): 7.1 Master, seperti bill of quantity, 7.2 Siklus sebagai proyek mini, 7.3 HPP: cost control 1992 dalam rumus greenhouse, 7. Sprint 2: Excel bertemu kolam (minggu 3–4)

### Community 62 - "FINDING-02: Dev server stale — `/api/auth/session` 404 dan CSS preload 404"
Cohesion: 0.50
Nodes (4): FINDING-02: Dev server stale — `/api/auth/session` 404 dan CSS preload 404, Gejala, Mitigasi, Penyebab

### Community 64 - "Timeline sprint — registry"
Cohesion: 0.67
Nodes (3): Milestone GitHub (repo due = target selesai), Timeline sprint — registry, Velocity & retro

### Community 75 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, bcryptjs, class-variance-authority, clsx, lucide-react, next, next-auth, @prisma/client (+7 more)

### Community 93 - "PRD Agile — Kokonus Farm"
Cohesion: 0.15
Nodes (13): 11. API (kerangka, target sprint), 12. Matriks RBAC (kerangka, nama peran Kokonus), 13. Risiko (dari register kerangka, konteks Kokonus), 14. Uji kesiapan (Sprint 5), 15. Glosarium singkat, 16. Out of scope / later (ulang operasional), 17. Cara pakai backlog, 2. Tujuan (+5 more)

### Community 94 - "log-kegagalan.ts"
Cohesion: 0.10
Nodes (33): FormState, submitLogKegagalan(), FormState, klasifikasiSusut(), AdminSusutPage(), dynamic, labelKategori(), LogKegagalanDaftar() (+25 more)

### Community 95 - "Catatan uji blackbox Kokonus Farm"
Cohesion: 0.15
Nodes (13): Acceptance criteria (F10 / US3.2), Acceptance criteria (F7 / PRD), Akun demo, Alur kerja per user story, Cara membaca, Catatan uji blackbox Kokonus Farm, Langkah uji blackbox: API, Langkah uji blackbox (API) (+5 more)

### Community 115 - "Dokumentasi API"
Cohesion: 0.15
Nodes (13): `/api/accounts` (US2.1, bagan akun), `/api/biaya/langsung` · `/api/biaya/overhead` (US2.4), `/api/harvest` (US3.3, laporan panen), `/api/infrastructure/lahan` · `/greenhouse` · `/kolam`, `/api/infrastructure` (US4.4, pohon lahan → greenhouse → kolam), `/api/inventory/alert` (US4.3, stok di bawah minimum), `/api/inventory` (US4.1, stok bahan), `/api/petani` (US4.5, master Petani ERD) (+5 more)

### Community 134 - "Varietas & harga retail (kisaran)"
Cohesion: 0.22
Nodes (8): Asumsi benih & media semai (hidroponik), Estimasi biji per gram, Kailan, Kale, Pakcoy, Rockwool, Selada, Varietas & harga retail (kisaran)

### Community 136 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, dev, dev:clean, format, format:check, lint, start (+3 more)

### Community 137 - "CHANGELOG.md"
Cohesion: 0.15
Nodes (12): 1.0.0 (2026-10-07), [1.1.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.0.0...v1.1.0) (2026-10-07), [1.2.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.1.0...v1.2.0) (2026-10-07), [1.3.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.2.0...v1.3.0) (2026-10-09), [1.4.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.3.0...v1.4.0) (2026-10-09), Bug Fixes, Bug Fixes, Features (+4 more)

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
Cohesion: 0.18
Nodes (10): Definition of Done — Kokonus Farm, Per sprint, Per user story (wajib kecuali bertanda PENTING), Template notulensi, Acceptance criteria, Definition of Done (PRD bagian 10), Keputusan desain yang mengikat, Langkah uji blackbox (+2 more)

### Community 183 - "Superpowers (Cursor Agent)"
Cohesion: 0.33
Nodes (5): Aktifkan di Cursor, Catatan, Perbarui versi, Setelah clone, Superpowers (Cursor Agent)

### Community 184 - "7. Rencana sprint"
Cohesion: 0.33
Nodes (6): 7. Rencana sprint, Sprint 1 — Fondasi & autentikasi (Minggu 1–2) · 34 pts inti, Sprint 2 — Akuntansi, produksi, inventaris (Minggu 3–4) · 55 pts, Sprint 3 — Penjualan & pengiriman (Minggu 5–6) · 34 pts, Sprint 4 — Dashboard & ekspor (Minggu 7–8) · 21 pts, Sprint 5 — QA, usability, go-live (Minggu 9–10) · 13 pts QA

### Community 185 - "Notulensi pengujian US1.5"
Cohesion: 0.33
Nodes (6): Acceptance criteria, Definition of Done, Keputusan desain yang mengikat, Langkah uji blackbox, Notulensi pengujian US1.5, Temuan

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
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 611 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `laporan-panen.ts`, `next-auth`, `lib/infrastruktur.ts`, `foundation-panel.tsx`, `lib/varietas.ts`, `petani/route.ts`, `Role`, `siklus/[id]/page.tsx`, `lib/biaya.ts`, `lib/inventaris.ts`, `lib/jurnal.ts`, `lib/sales-order.ts`, `lib/akun.ts`, `Input`, `listAlertStokMinimum`, `lib/active-pack.ts`, `middleware.ts`, `lib/pelanggan.ts`, `package.json`, `siklus-produksi.ts`, `monitor-produksi.ts`, `app/layout.tsx`, `production/route.ts`, `tugas-petani.ts`, `log-kegagalan.ts`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `prettier`, `@semantic-release/changelog` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `laporan-panen.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08735150244584207 - nodes in this community are weakly interconnected._
- **Why does `calculateHPP()` connect `laporan-panen.ts` to `Kelompok kerja (relasi antar US)`, `notes.md`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Should `lib/infrastruktur.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09086538461538461 - nodes in this community are weakly interconnected._
- **Why does `@prisma/client` connect `Input` to `laporan-panen.ts`, `next-auth`, `lib/infrastruktur.ts`, `foundation-panel.tsx`, `lib/varietas.ts`, `petani/route.ts`, `lib/biaya.ts`, `lib/inventaris.ts`, `lib/jurnal.ts`, `lib/sales-order.ts`, `lib/akun.ts`, `lib/active-pack.ts`, `lib/pelanggan.ts`, `package.json`, `siklus-produksi.ts`, `prisma`, `next`, `seed.js`, `prisma.ts`, `log-kegagalan.ts`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Should `foundation-panel.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07711950970377937 - nodes in this community are weakly interconnected._