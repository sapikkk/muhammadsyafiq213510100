# Graph Report - muhammadsyafiq213510100  (2026-10-09)

## Corpus Check
- 287 files · ~84,977 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 5, .example 1, .css 1)

## Summary
- 1722 nodes · 4508 edges · 111 communities (102 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 105 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `733324a0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- laporan-panen.ts
- siklus/[id]/page.tsx
- lib/infrastruktur.ts
- FoundationPanel
- lib/varietas.ts
- formatRupiah
- 8. Product backlog bernomor
- next
- siklus-produksi.ts
- lib/biaya.ts
- @prisma/client
- Rencana Sprint & Backlog Agile — Kokonus Farm
- Notulensi 2026-10-09 — backlog, Graphify, US4.5, US2.4
- prisma.ts
- lib/sales-order.ts
- Notulensi pengujian US4.3
- lib/akun.ts
- Notulensi — 2026-10-09
- Kokonus Farm — panduan agent
- monitor-produksi.ts
- admin/active-pack/page.tsx
- lib/active-pack.ts
- owner-user-panel.tsx
- Testing — Kokonus Farm
- lib/pelanggan.ts
- package.json
- format.ts
- lib/susut.ts
- agile/README.md
- 9. Alur pengguna end-to-end dan kriteria penerimaan
- listAlertStokMinimum
- isRoleAllowed
- PageHeader
- app/layout.tsx
- siklus-form.tsx
- Kelompok kerja (relasi antar US)
- seed.js
- foundation-panel.tsx
- Notulensi pengujian US4.2
- cn
- Skenario narasi UCD & Agile — Kokonus Farm
- main
- cash-flow.ts
- user-story.md
- Audit inventory — PHASE 0
- Panduan GitHub Project #1
- components.json
- Sprint 1 retro — Fondasi & autentikasi
- middleware.ts
- Layar web (frame 1920×1080, nama `web-*` / `petani-*`)
- compilerOptions
- inventaris-stok-rendah.tsx
- admin/petani/page.tsx
- Audit log — pelacakan progres (append-only)
- devDependencies
- Keputusan PO — pelacakan GitHub
- Kebijakan partial delivery & pelacakan
- Sprint 2 — Akuntansi, produksi, inventaris
- tambal-susulan.ts
- Pelacakan Agile — Kokonus Farm
- 10. Definition of Done
- harvest/route.ts
- petani/route.ts
- assign-project-iterations.sh
- Timeline sprint — registry
- assign-milestones.sh
- Input
- owner-evaluation.ts
- actions/jurnal.ts
- langsung/route.ts
- Baseline — before global audit (PHASE 0)
- keTanggalIso
- cost-breakdown/route.ts
- monthly-summary.ts
- app-sidebar.tsx
- dependencies
- Notulensi pengujian US3.1
- Sprint 1 — Fondasi & autentikasi
- register.ts
- Button
- greenhouse/route.ts
- lahan/route.ts
- Notulensi pengujian US1.6
- check-audit-env.sh
- audit/README.md
- alert/route.ts
- Notulensi pengujian US3.2
- PRD Agile — Kokonus Farm
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
- extends
- .prettierrc.json
- Kokonus Farm
- next.config.mjs

## God Nodes (most connected - your core abstractions)
1. `isRoleAllowed()` - 117 edges
2. `next` - 101 edges
3. `Input` - 66 edges
4. `next-auth` - 64 edges
5. `SubmitButton()` - 61 edges
6. `authOptions` - 55 edges
7. `PageHeader()` - 47 edges
8. `@prisma/client` - 47 edges
9. `formatRupiah()` - 45 edges
10. `prisma` - 41 edges

## Surprising Connections (you probably didn't know these)
- `Mitigasi yang sudah dilakukan` --references--> `registerPetani()`  [INFERRED]
  docs/uji-blackbox.md → app/actions/register.ts
- `Temuan` --references--> `registerPetani()`  [INFERRED]
  docs/uji-blackbox.md → app/actions/register.ts
- `Acceptance criteria (PRD US2.2)` --references--> `JurnalActions()`  [INFERRED]
  docs/uji-blackbox.md → components/jurnal-actions.tsx
- `Roles (RBAC)` --references--> `RoleHome()`  [INFERRED]
  docs/audit/00-inventory.md → components/role-home.tsx
- `G1 — **Journey panen → HPP → jurnal** (EPIC-2 + EPIC-3)` --references--> `calculateHPP()`  [INFERRED]
  docs/progress-backlog.md → lib/hpp.ts

## Import Cycles
- 3-file cycle: `lib/hpp-override.ts -> lib/laporan-panen.ts -> lib/hpp.ts -> lib/hpp-override.ts`

## Communities (111 total, 9 thin omitted)

### Community 0 - "laporan-panen.ts"
Cohesion: 0.11
Nodes (28): AdminHarvestPage(), dynamic, handleError(), POST(), GET(), HarvestAdminDaftar(), Row, US2.3 — detail AC vs implementasi (+20 more)

### Community 1 - "siklus/[id]/page.tsx"
Cohesion: 0.12
Nodes (28): dynamic, PetaniSiklusDetailPage(), KegagalanForm(), labelKategori(), LogKegagalanDaftar(), Row, labelFase(), LogBaris (+20 more)

### Community 2 - "lib/infrastruktur.ts"
Cohesion: 0.11
Nodes (47): FormState, requireAdmin(), revalidate(), simpanGreenhouse(), simpanKolam(), simpanLahan(), toState(), ubahStatusKolam() (+39 more)

### Community 3 - "FoundationPanel"
Cohesion: 0.38
Nodes (13): FoundationPanel(), PetaniMasterDaftar(), Row, Access, Cell(), RoleMatrix(), rows, Table (+5 more)

### Community 4 - "lib/varietas.ts"
Cohesion: 0.11
Nodes (41): FormState, requireWrite(), revalidate(), simpanVarietas(), toState(), ubahStatusVarietas(), AdminVarietasPage(), dynamic (+33 more)

### Community 5 - "formatRupiah"
Cohesion: 0.23
Nodes (22): AdminPage(), dynamic, formatter, LoginPage(), defaultMonth(), dynamic, OwnerArusKasPage(), Search (+14 more)

### Community 6 - "8. Product backlog bernomor"
Cohesion: 0.18
Nodes (11): `/api/petani` (US4.5, master Petani ERD), 8.2 Arsitektur (halaman Architecture), 8. Product backlog bernomor, EPIC-1 — Core Framework & Authentication, EPIC-2 — Akuntansi Double-Entry & HPP, EPIC-3 — Produksi, EPIC-4 — Inventaris & infrastruktur, EPIC-5 — Penjualan & pengiriman (+3 more)

### Community 7 - "next"
Cohesion: 0.18
Nodes (15): FormState, FormState, FormState, handler, dynamic, authOptions, roleHome, next (+7 more)

### Community 8 - "siklus-produksi.ts"
Cohesion: 0.17
Nodes (26): FormState, mulaiSiklusSemai(), pindahFaseSiklus(), GET(), handleError(), PUT(), GET(), handleError() (+18 more)

### Community 9 - "lib/biaya.ts"
Cohesion: 0.25
Nodes (14): AdminBiayaPage(), dynamic, GET(), POST(), requireAdmin(), BiayaError, createOverhead(), listOverhead() (+6 more)

### Community 10 - "@prisma/client"
Cohesion: 0.08
Nodes (47): catatPergerakanAdmin(), catatPergerakanForm(), catatPergerakanPetani(), FormState, requireAdmin(), requireMovement(), simpanItemInventaris(), toState() (+39 more)

### Community 11 - "Rencana Sprint & Backlog Agile — Kokonus Farm"
Cohesion: 0.18
Nodes (10): 1. Status keseluruhan proyek, 2. Backlog belum selesai, 3. Kelompok kerja (relasi), 4. Eksekusi berikutnya (prioritas), 5. Testing & referensi (repo, bukan `.agents`), Rencana Sprint & Backlog Agile — Kokonus Farm, Sprint 2 (sisa), Sprint 3 (EPIC-5) (+2 more)

### Community 12 - "Notulensi 2026-10-09 — backlog, Graphify, US4.5, US2.4"
Cohesion: 0.06
Nodes (31): Analisis, Bukti dari log dev server, FINDING-01: Database Prisma Postgres lambat dan pool timeout, FINDING-02: Dev server stale — `/api/auth/session` 404 dan CSS preload 404, Findings lintas US, Gejala, Gejala, Mitigasi (+23 more)

### Community 13 - "prisma.ts"
Cohesion: 0.06
Nodes (57): dynamic, JurnalDetailPage(), waktu, dynamic, JurnalPage(), GET(), GET(), handleError() (+49 more)

### Community 14 - "lib/sales-order.ts"
Cohesion: 0.07
Nodes (46): dynamic, SalesOrderInvoicePage(), dynamic, PetaniPengirimanPage(), PrintButton(), cancelSalesOrder(), createReversalJurnal(), parseAlasan() (+38 more)

### Community 15 - "Notulensi pengujian US4.3"
Cohesion: 0.22
Nodes (9): jumlah(), `/api/inventory/movement` (US4.1, log pergerakan), 8.1 Kamus data operasional (sign-off ERD), Acceptance criteria (Epic 4 / Figma low-stock), Definition of Done (PRD §10), Langkah uji blackbox: API, Langkah uji blackbox: UI, Notulensi pengujian US4.3 (+1 more)

### Community 16 - "lib/akun.ts"
Cohesion: 0.10
Nodes (40): AkunFormState, formToRecord(), requireAdmin(), saveAkun(), toggleAkun(), AkunPage(), dynamic, GET() (+32 more)

### Community 17 - "Notulensi — 2026-10-09"
Cohesion: 0.25
Nodes (7): Berikutnya, Branch, GitHub Project, Notulensi — 2026-10-09, Pull request, Ringkasan sesi, Uji disarankan

### Community 18 - "Kokonus Farm — panduan agent"
Cohesion: 0.29
Nodes (6): Backlog & pelacakan sprint, Graphify (wajib untuk eksplorasi kode), Humanizer (prosa), Kokonus Farm — panduan agent, Ponytail (implementasi), Superpowers (proses)

### Community 19 - "monitor-produksi.ts"
Cohesion: 0.27
Nodes (8): submitMonitorPertumbuhan(), catatMonitorPertumbuhan(), FASE_MONITOR, kondisiMonitorOptions, MonitorError, MonitorInput, parseMonitorInput(), FaseProduksi

### Community 20 - "admin/active-pack/page.tsx"
Cohesion: 0.30
Nodes (12): AdminActivePackPage(), dynamic, dynamic, PetaniActivePackPage(), ActivePackDaftar(), Row, ActivePackForm(), ActivePackPakaiForm() (+4 more)

### Community 21 - "lib/active-pack.ts"
Cohesion: 0.16
Nodes (27): FormState, pakaiActivePackAdmin(), pakaiActivePackForm(), pakaiActivePackPetani(), requirePack(), simpanActivePack(), simpanActivePackAdmin(), simpanActivePackPetani() (+19 more)

### Community 22 - "owner-user-panel.tsx"
Cohesion: 0.22
Nodes (15): createOwnerUser(), OwnerUserState, requireOwnerId(), resetOwnerUserPassword(), dynamic, OwnerPenggunaPage(), OwnerUserPanel(), ResetPasswordForm() (+7 more)

### Community 23 - "Testing — Kokonus Farm"
Cohesion: 0.33
Nodes (5): Playwright (E2E), Sprint 5, Submodule referensi, TestCafe (opsional), Testing — Kokonus Farm

### Community 24 - "lib/pelanggan.ts"
Cohesion: 0.25
Nodes (16): FormState, submitPelanggan(), GET(), POST(), PUT(), requireRead(), createPelanggan(), parseAlamat() (+8 more)

### Community 25 - "package.json"
Cohesion: 0.05
Nodes (36): description, engines, node, prettier, name, overrides, picomatch, prisma (+28 more)

### Community 26 - "format.ts"
Cohesion: 0.19
Nodes (10): dynamic, OwnerBiayaPage(), Search, COLORS, OwnerCostPie(), qty, rupiah, tanggalIso (+2 more)

### Community 27 - "lib/susut.ts"
Cohesion: 0.15
Nodes (19): FormState, submitLogKegagalan(), klasifikasiSusut(), catatLogKegagalan(), KegagalanError, parseHariHidup(), parseKegagalanInput(), parsePenyebab() (+11 more)

### Community 28 - "agile/README.md"
Cohesion: 0.19
Nodes (3): Sprint 3 — Penjualan & pengiriman (rencana), Sprint 4 — Dashboard, visualisasi, ekspor (rencana), Sprint 5 — QA, usability, go-live (rencana)

### Community 29 - "9. Alur pengguna end-to-end dan kriteria penerimaan"
Cohesion: 0.08
Nodes (25): 9. Alur pengguna end-to-end dan kriteria penerimaan, F10 — Pindah fase (HP), F11 — Catat kegagalan, F12 — Panen & harvest report, F13 — HPP & susut, F14 — Jurnal pembelian & COA, F15 — Active Pack, F16 — Movement stok (+17 more)

### Community 30 - "listAlertStokMinimum"
Cohesion: 0.21
Nodes (14): AdminLayout(), OwnerLayout(), PetaniLayout(), dynamic, PetaniPage(), PetaniTugasPanel(), prioritasVariant(), waktu (+6 more)

### Community 31 - "isRoleAllowed"
Cohesion: 0.24
Nodes (16): handleError(), POST(), requireRead(), GET(), GET(), PUT(), PUT(), PUT() (+8 more)

### Community 32 - "PageHeader"
Cohesion: 0.16
Nodes (12): dynamic, HarvestDetailAdminPage(), defaultMonth(), dynamic, OwnerLaporanPage(), Search, dynamic, OwnerPrivePage() (+4 more)

### Community 33 - "app/layout.tsx"
Cohesion: 0.38
Nodes (4): inter, metadata, RootLayout(), Providers()

### Community 34 - "siklus-form.tsx"
Cohesion: 0.22
Nodes (15): dynamic, PetaniSiklusPage(), SiklusAsumsiPanel(), VarietasMeta, KolamOpt, PackOpt, SiklusForm(), VarietasOpt (+7 more)

### Community 35 - "Kelompok kerja (relasi antar US)"
Cohesion: 0.15
Nodes (12): Daftar kerja prioritas (what to do next), G1 — **Journey panen → HPP → jurnal** (EPIC-2 + EPIC-3), G2 — **Produksi lapangan & timeline** (EPIC-3), G3 — **Master data operasional** (EPIC-1 + EPIC-4), G4 — **Penjualan end-to-end** (EPIC-5) — Sprint 3, G5 — **Owner visibility & laporan** (EPIC-2 + EPIC-6) — Sprint 4, G6 — **QA & go-live** (Sprint 5), Kelompok kerja (relasi antar US) (+4 more)

### Community 36 - "seed.js"
Cohesion: 0.12
Nodes (16): accounts, akunAnak, akunInduk, seedAkun(), { hash }, seedInfrastruktur(), seedInventaris(), seedPetani() (+8 more)

### Community 37 - "foundation-panel.tsx"
Cohesion: 0.19
Nodes (13): assertAdmin(), simpanBiayaLangsung(), simpanOverhead(), BiayaAdminPanel(), OverheadRow, SiklusOpt, people, SelectContent (+5 more)

### Community 38 - "Notulensi pengujian US4.2"
Cohesion: 0.33
Nodes (6): Acceptance criteria (F15 / US4.2), Definition of Done (PRD §10), Langkah uji blackbox: API, Langkah uji blackbox: UI, Notulensi pengujian US4.2, Temuan

### Community 39 - "cn"
Cohesion: 0.36
Nodes (12): ajukanJurnalAction(), putuskan(), setujuiJurnalAction(), tolakJurnalAction(), JurnalActions(), LogoutButton(), DialogContent, DialogDescription (+4 more)

### Community 40 - "Skenario narasi UCD & Agile — Kokonus Farm"
Cohesion: 0.06
Nodes (32): 10. Sprint 5: uji UCD (minggu 9–10), 11. Dua puluh empat alur sebagai satu cerita, 12. Matriks: siapa pegang pena, 13. Out of scope, 14. Epilog, 1. Prolog: Excel yang pernah cukup, greenhouse yang tidak mau menunggu, 2. Visi, misi, dan janji skripsi, 3.1 Empathize (+24 more)

### Community 41 - "main"
Cohesion: 0.36
Nodes (7): Diagram stack (head → base), Merge stack ke `main`, PR paralel ke `main` (#46–#62), Setelah merge, Status (2026-10-09), Urutan merge ke `main` (bottom-up), main()

### Community 42 - "cash-flow.ts"
Cohesion: 0.12
Nodes (26): GET(), GET(), GET(), buildBalanceSheet(), buildCashFlow(), CashFlowCategory, CashFlowError, CashFlowMovement (+18 more)

### Community 43 - "user-story.md"
Cohesion: 0.20
Nodes (9): Acceptance criteria (tasklist), Catatan partial (isi jika menutup sebelum 100% AC), Definition of Done, DoD checklist (tasklist), Penutupan issue, Progress, Rencana teknis, Sprint · Epic (+1 more)

### Community 44 - "Audit inventory — PHASE 0"
Cohesion: 0.13
Nodes (14): Admin (`/admin`), API route handlers (`app/api`), App routes (pages), Audit inventory — PHASE 0, Global UI shells, Next phases (planned), Owner (`/owner`), Petani (`/petani`) (+6 more)

### Community 45 - "Panduan GitHub Project #1"
Cohesion: 0.33
Nodes (6): Iteration — actual start (PO 2026-10-09), Kolom, Mapping issue → sprint (PRD), Panduan GitHub Project #1, Repo vs Project, Views disarankan

### Community 46 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 47 - "Sprint 1 retro — Fondasi & autentikasi"
Cohesion: 0.33
Nodes (6): Action items (Sprint 2+), Apa yang berjalan baik, Hambatan, Keputusan proses, Ringkasan, Sprint 1 retro — Fondasi & autentikasi

### Community 48 - "middleware.ts"
Cohesion: 0.21
Nodes (11): Implementasi, PHASE 1 — RBAC audit mode, Temuan (a) saat audit — bug/perilaku, Temuan (b) RBAC tidak konsisten (sebelum/di luar bypass), Verifikasi, requireActionRole(), isAuditBypassRbac(), config (+3 more)

### Community 49 - "Layar web (frame 1920×1080, nama `web-*` / `petani-*`)"
Cohesion: 0.11
Nodes (17): Admin (akuntansi / inventaris / harvest / SO), Architecture & Diagram, Auth & global, Celah / gap, Dashboard, Evaluasi & laporan, Halaman (35), Inventaris Figma — KOKONUS FARM (+9 more)

### Community 50 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+9 more)

### Community 51 - "inventaris-stok-rendah.tsx"
Cohesion: 0.26
Nodes (8): AdminStokRendahPage(), dynamic, dynamic, OwnerStokRendahPage(), dynamic, PetaniStokRendahPage(), InventarisStokRendah(), Props

### Community 52 - "admin/petani/page.tsx"
Cohesion: 0.36
Nodes (8): AdminPetaniPage(), dynamic, GET(), dynamic, OwnerPetaniPage(), PetaniMasterForm(), listPetani(), serializePetani()

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

### Community 58 - "tambal-susulan.ts"
Cohesion: 0.36
Nodes (7): submitTambalSusulan(), catatTambalSusulan(), FASE_TAMBAL, parseDecimal(), parseTambalInput(), TambalError, TambalInput

### Community 59 - "Pelacakan Agile — Kokonus Farm"
Cohesion: 0.50
Nodes (4): Alur kerja (acuan `sw-agiledevelopment`), Filter cepat (GitHub), Mulai dari sini, Pelacakan Agile — Kokonus Farm

### Community 60 - "10. Definition of Done"
Cohesion: 0.67
Nodes (3): 10. Definition of Done, Sprint, User story (semua WAJIB kecuali yang bertanda PENTING)

### Community 61 - "harvest/route.ts"
Cohesion: 0.43
Nodes (5): FormState, submitHarvestReport(), handleError(), POST(), kirimLaporanPanen()

### Community 62 - "petani/route.ts"
Cohesion: 0.31
Nodes (12): simpanPetaniMaster(), handleError(), POST(), PUT(), requireWrite(), createPetani(), parseMoney(), parseNama() (+4 more)

### Community 64 - "Timeline sprint — registry"
Cohesion: 0.67
Nodes (3): Milestone GitHub (repo due = target selesai), Timeline sprint — registry, Velocity & retro

### Community 66 - "Input"
Cohesion: 0.05
Nodes (73): approvePasswordReset(), ApproveState, changePassword(), ChangeState, rejectPasswordReset(), requestPasswordReset(), RequestState, requireAdmin() (+65 more)

### Community 67 - "owner-evaluation.ts"
Cohesion: 0.38
Nodes (6): dec(), nol, ownerEvaluation(), OwnerEvaluationResult, pct(), SiklusMarginRow

### Community 68 - "actions/jurnal.ts"
Cohesion: 0.47
Nodes (5): adminId(), barisDariForm(), bukanAdmin, JurnalFormState, simpanJurnal()

### Community 69 - "langsung/route.ts"
Cohesion: 0.73
Nodes (5): GET(), PUT(), requireAdmin(), listBiayaLangsungBySiklus(), serializeBiayaLangsung()

### Community 70 - "Baseline — before global audit (PHASE 0)"
Cohesion: 0.33
Nodes (5): Baseline — before global audit (PHASE 0), Bundle note, CI (`.github/workflows/check.yml`), Commands, Pre-existing gaps (input to later phases)

### Community 71 - "keTanggalIso"
Cohesion: 0.60
Nodes (4): dynamic, JurnalBaruPage(), keTanggalIso(), listAkunPosting()

### Community 72 - "cost-breakdown/route.ts"
Cohesion: 0.60
Nodes (3): GET(), costBreakdown(), CostBreakdownError

### Community 73 - "monthly-summary.ts"
Cohesion: 0.36
Nodes (6): labelFromKey(), monthKeyFromDate(), monthlySummary(), MonthlySummaryResult, MonthPoint, nol

### Community 74 - "app-sidebar.tsx"
Cohesion: 0.60
Nodes (5): AppSidebar(), AppSidebarUsers(), getAuditNavItems(), getNavItems(), NavItem

### Community 75 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, bcryptjs, class-variance-authority, clsx, jspdf, lucide-react, next, next-auth (+10 more)

### Community 76 - "Notulensi pengujian US3.1"
Cohesion: 0.40
Nodes (5): Acceptance criteria (PRD US3.1 / F9), Definition of Done (PRD §10), Langkah uji blackbox, Notulensi pengujian US3.1, Temuan

### Community 77 - "Sprint 1 — Fondasi & autentikasi"
Cohesion: 0.20
Nodes (10): Sprint 1 — checklist demo, Sprint 1 — Fondasi & autentikasi, US1.1 — Setup Next.js 14 + TS + Tailwind + shadcn, US1.2 — Schema Prisma ERD, US1.3 — PostgreSQL + migrate/seed, US1.4 — NextAuth login/logout, US1.5 — Lupa sandi via Admin, US1.7 — Settings profil & matrix peran (+2 more)

### Community 78 - "register.ts"
Cohesion: 0.40
Nodes (5): registerPetani(), RegisterState, translate(), US1.6 — Register petani (User login), bcryptjs

### Community 79 - "Button"
Cohesion: 0.20
Nodes (11): ClientApproval(), AksesDitolakPage(), Error(), NotFound(), HomePage(), StateScreen(), Button, ButtonProps (+3 more)

### Community 80 - "greenhouse/route.ts"
Cohesion: 0.83
Nodes (3): handleError(), POST(), requireAdmin()

### Community 81 - "lahan/route.ts"
Cohesion: 0.83
Nodes (3): handleError(), POST(), requireAdmin()

### Community 82 - "Notulensi pengujian US1.6"
Cohesion: 0.33
Nodes (6): Acceptance criteria, Definition of Done, Keputusan desain yang mengikat, Langkah uji blackbox, Notulensi pengujian US1.6, Temuan

### Community 86 - "Notulensi pengujian US3.2"
Cohesion: 0.50
Nodes (4): Acceptance criteria (F10 / US3.2), Langkah uji blackbox (API), Notulensi pengujian US3.2, Temuan

### Community 93 - "PRD Agile — Kokonus Farm"
Cohesion: 0.11
Nodes (19): 11. API (kerangka, target sprint), 12. Matriks RBAC (kerangka, nama peran Kokonus), 13. Risiko (dari register kerangka, konteks Kokonus), 14. Uji kesiapan (Sprint 5), 15. Glosarium singkat, 16. Out of scope / later (ulang operasional), 17. Cara pakai backlog, 1. Visi produk (+11 more)

### Community 95 - "Catatan uji blackbox Kokonus Farm"
Cohesion: 0.14
Nodes (14): Acceptance criteria, Acceptance criteria (F7 / PRD), Akun demo, Alur kerja per user story, Cara membaca, Catatan uji blackbox Kokonus Farm, Definition of Done (PRD bagian 10), Langkah uji blackbox (+6 more)

### Community 115 - "Dokumentasi API"
Cohesion: 0.17
Nodes (12): `/api/accounts` (US2.1, bagan akun), `/api/biaya/langsung` · `/api/biaya/overhead` (US2.4), `/api/harvest` (US3.3, laporan panen), `/api/infrastructure/lahan` · `/greenhouse` · `/kolam`, `/api/infrastructure` (US4.4, pohon lahan → greenhouse → kolam), `/api/inventory/alert` (US4.3, stok di bawah minimum), `/api/inventory` (US4.1, stok bahan), `/api/production/[id]/phase` (US3.2, pindah fase) (+4 more)

### Community 134 - "Varietas & harga retail (kisaran)"
Cohesion: 0.22
Nodes (8): Asumsi benih & media semai (hidroponik), Estimasi biji per gram, Kailan, Kale, Pakcoy, Rockwool, Selada, Varietas & harga retail (kisaran)

### Community 136 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, check:audit-env, dev, dev:clean, format, format:check, lint (+4 more)

### Community 137 - "CHANGELOG.md"
Cohesion: 0.07
Nodes (26): 1.0.0 (2026-10-07), [1.10.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.9.0...v1.10.0) (2026-10-09), [1.11.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.10.0...v1.11.0) (2026-10-09), [1.1.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.0.0...v1.1.0) (2026-10-07), [1.2.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.1.0...v1.2.0) (2026-10-07), [1.3.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.2.0...v1.3.0) (2026-10-09), [1.4.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.3.0...v1.4.0) (2026-10-09), [1.5.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.4.0...v1.5.0) (2026-10-09) (+18 more)

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

### Community 225 - "extends"
Cohesion: 0.50
Nodes (3): extends, prettier, next/core-web-vitals

### Community 226 - ".prettierrc.json"
Cohesion: 0.50
Nodes (3): semi, singleQuote, trailingComma

### Community 227 - "Kokonus Farm"
Cohesion: 0.50
Nodes (3): Cursor Agent (Superpowers), Kokonus Farm, Menjalankan lokal

## Knowledge Gaps
- **18 isolated node(s):** `next/core-web-vitals`, `prettier`, `@semantic-release/changelog`, `@semantic-release/git`, `@types/bcryptjs` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 701 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `laporan-panen.ts`, `siklus/[id]/page.tsx`, `lib/infrastruktur.ts`, `lib/varietas.ts`, `formatRupiah`, `siklus-produksi.ts`, `lib/biaya.ts`, `@prisma/client`, `prisma.ts`, `lib/sales-order.ts`, `lib/akun.ts`, `admin/active-pack/page.tsx`, `lib/active-pack.ts`, `owner-user-panel.tsx`, `lib/pelanggan.ts`, `package.json`, `format.ts`, `lib/susut.ts`, `listAlertStokMinimum`, `isRoleAllowed`, `PageHeader`, `app/layout.tsx`, `cash-flow.ts`, `middleware.ts`, `inventaris-stok-rendah.tsx`, `harvest/route.ts`, `petani/route.ts`, `Input`, `actions/jurnal.ts`, `langsung/route.ts`, `cost-breakdown/route.ts`, `app-sidebar.tsx`, `register.ts`, `Button`, `greenhouse/route.ts`, `lahan/route.ts`, `alert/route.ts`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `isRoleAllowed()` (e.g. with `Implementasi` and `Temuan (b) RBAC tidak konsisten (sebelum/di luar bypass)`) actually correct?**
  _`isRoleAllowed()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `next/core-web-vitals`, `prettier`, `@semantic-release/changelog` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `laporan-panen.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11428571428571428 - nodes in this community are weakly interconnected._
- **Why does `@prisma/client` connect `@prisma/client` to `laporan-panen.ts`, `siklus/[id]/page.tsx`, `lib/infrastruktur.ts`, `lib/varietas.ts`, `formatRupiah`, `siklus-produksi.ts`, `lib/biaya.ts`, `prisma.ts`, `lib/sales-order.ts`, `lib/akun.ts`, `admin/active-pack/page.tsx`, `lib/active-pack.ts`, `owner-user-panel.tsx`, `lib/pelanggan.ts`, `package.json`, `lib/susut.ts`, `siklus-form.tsx`, `seed.js`, `cash-flow.ts`, `inventaris-stok-rendah.tsx`, `tambal-susulan.ts`, `petani/route.ts`, `Input`, `owner-evaluation.ts`, `monthly-summary.ts`, `register.ts`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `siklus/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12162162162162163 - nodes in this community are weakly interconnected._
- **Why does `calculateHPP()` connect `PageHeader` to `laporan-panen.ts`, `Kelompok kerja (relasi antar US)`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._