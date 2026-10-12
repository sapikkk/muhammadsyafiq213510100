# Kokonus Farm

Aplikasi web untuk tata kelola biaya produksi hidroponik Kokonus Farm (greenhouse rakit apung, Pekanbaru).

[![GitHub stars](https://img.shields.io/github/stars/sapikkk/muhammadsyafiq213510100?style=flat-square)](https://github.com/sapikkk/muhammadsyafiq213510100/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/sapikkk/muhammadsyafiq213510100?style=flat-square)](https://github.com/sapikkk/muhammadsyafiq213510100/network/members)
[![GitHub issues](https://img.shields.io/github/issues/sapikkk/muhammadsyafiq213510100?style=flat-square)](https://github.com/sapikkk/muhammadsyafiq213510100/issues)
[![Node](https://img.shields.io/badge/node-%3E%3D18.18-339933?style=flat-square&logo=node.js&logoColor=white)](package.json)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Menghubungkan data budidaya, kegagalan/susut, inventaris, penjualan, dan pembukuan supaya HPP per lubang/kg/pack bisa dihitung dan dipakai untuk harga jual serta laporan keuangan.

<!-- Screenshot: tambahkan gambar dashboard setelah deploy publik -->
<!-- ![Dashboard Owner](docs/assets/dashboard-placeholder.png) -->

## Fitur utama

- **Peran (RBAC)** — Owner, Admin, dan Petani dengan menu dan hak akses berbeda.
- **Siklus produksi** — semai, fase tanam, log kegagalan, panen, dan abort gagal total.
- **Panen & HPP** — laporan panen menunggu persetujuan Admin; perhitungan HPP dan jurnal WIP otomatis saat disetujui.
- **Susut** — klasifikasi kegagalan normal vs abnormal untuk alokasi biaya.
- **Inventaris & active pack** — stok bahan, pergerakan, alert di bawah minimum.
- **Penjualan (sales order)** — draft, konfirmasi, DP, packing, pengiriman, pelunasan.
- **Jurnal & akuntansi** — jurnal manual/smart, persetujuan, kunci periode, laporan (arus kas, laba rugi, neraca).
- **Notifikasi** — pusat notifikasi per user dengan deep link ke halaman terkait (panen, jurnal, stok, SO, reset sandi, dll.).
- **Pengaturan** — profil, ganti sandi, matrix peran, inbox notifikasi.

## Tech stack

| Lapisan | Teknologi |
|--------|-----------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn/Radix UI |
| Tabel & chart | TanStack Table, Recharts |
| Auth | NextAuth.js (credentials), bcrypt |
| Data | PostgreSQL, Prisma ORM |
| Export | jsPDF, xlsx |
| Uji | Playwright, TestCafe, skrip `check:*` di `package.json` |

## Prasyarat

- **Node.js** ≥ 18.18
- **PostgreSQL** (lokal atau hosted; Prisma butuh `DATABASE_URL` dan `DIRECT_URL`)
- **npm** (atau pnpm/yarn; contoh di bawah memakai npm)

## Instalasi

```bash
git clone https://github.com/sapikkk/muhammadsyafiq213510100.git
cd muhammadsyafiq213510100
npm install
cp .env.example .env
```

Isi `.env` (lihat tabel di bawah), lalu migrasi dan seed **fondasi** (hanya bagan akun COA; tanpa data operasi demo):

```bash
npx prisma db push
npx prisma db seed
npm run dev
```

Opsional di `.env`: `SEED_OWNER_EMAIL` + `SEED_OWNER_PASSWORD` untuk satu akun Owner saat seed. Selain itu, isi varietas, inventaris, dan transaksi lewat aplikasi.

**Hapus semua data lalu mulai kosong:**

```bash
CONFIRM_DB_RESET=yes npm run db:reset
```

(Pastikan `DATABASE_URL` mengarah ke database yang benar — semua baris dihapus.)

Uji/sidang dengan data contoh: `npm run seed:demo-lengkap` (akun demo + inventaris + siklus).

Buka [http://localhost:3000](http://localhost:3000).

### Variabel lingkungan

| Variabel | Fungsi |
|----------|--------|
| `DATABASE_URL` | Koneksi PostgreSQL (bisa pooled di production) |
| `DIRECT_URL` | Koneksi langsung untuk migrasi Prisma |
| `NEXTAUTH_URL` | URL aplikasi (dev: `http://localhost:3000`) |
| `NEXTAUTH_SECRET` | Secret session NextAuth (string acak panjang) |
| `AUDIT_BYPASS_RBAC` | Hanya dev lokal: `true` + `NODE_ENV!==production` untuk audit semua route |
| `SEED_OWNER_EMAIL` / `SEED_OWNER_PASSWORD` | Opsional: Owner pertama saat `npm run seed` (min. 8 karakter sandi) |
| `SEED_OWNER_NAMA` | Opsional: nama tampilan Owner fondasi |

Dev DB lokal vs cloud: [`docs/deployment/dev-postgres-lokal.md`](docs/deployment/dev-postgres-lokal.md). Deploy production: [`docs/deployment/panduan-deploy-vercel-postgres.md`](docs/deployment/panduan-deploy-vercel-postgres.md).

## Perintah penting

```bash
npm run dev          # development
npm run build        # production build
npm run start        # jalankan build
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm run test:e2e     # Playwright (butuh browser ter-install)
npm run db:reset     # hapus semua data + seed fondasi (butuh CONFIRM_DB_RESET=yes)
npm run seed:demo-lengkap  # data demo penuh (uji/sidang)
npm run seed:demo    # alur demo penjualan/jurnal (butuh seed demo lengkap dulu)
```

Skrip verifikasi domain (jurnal balance, SO, panen-WIP, dll.) ada di bagian `check:*` pada `package.json`.

## Struktur direktori

```text
muhammadsyafiq213510100/
├── app/                 # Route App Router (admin, owner, petani, API)
│   ├── actions/         # Server Actions
│   └── api/             # Route handlers REST
├── components/          # UI & layout
├── lib/                 # Logika domain (HPP, jurnal, inventaris, SO, notifikasi, …)
├── prisma/              # Schema, seed, migrasi
├── docs/                # PRD, agile, UCD, deployment, uji
├── e2e/                 # Smoke Playwright
├── scripts/             # Audit & sync tooling
└── types/               # Tipe shared (peran, dll.)
```

Orientasi arsitektur untuk kontributor/agent: `AGENTS.md`, graf `graphify-out/` (jika sudah di-build).

## API (ringkas)

Kebanyakan layar memakai **Server Actions**; endpoint REST di `app/api/` dipakai untuk integrasi, export, dan beberapa alur mobile/legacy. Semua route dilindungi sesi kecuali auth.

| Method | Contoh path | Kegunaan |
|--------|-------------|----------|
| `*` | `/api/auth/[...nextauth]` | Login/logout NextAuth |
| `GET/POST` | `/api/production` | Siklus produksi |
| `POST` | `/api/harvest`, `/api/harvest/[id]/approve` | Panen |
| `GET/POST` | `/api/inventory`, `/api/inventory/movement` | Inventaris |
| `GET/POST` | `/api/sales-orders`, `/api/sales-orders/[id]/confirm` | Sales order |
| `GET/POST` | `/api/jurnal/smart` | Smart jurnal |
| `GET` | `/api/reports/monthly-summary`, `/api/export/cash-flow` | Laporan & export |

Daftar lengkap: `app/api/**/route.ts`.

## Dokumentasi & mekanisme kerja

Peta file Markdown untuk Agile, progres teknis, UCD, uji (black-box / UAT / SUS), blueprint v2, deploy, audit, dan alat agent. Mulai dari hub berikut, lalu turun ke dokumen anak.

### Konteks & backlog produk

| Dokumen | Isi |
|---------|-----|
| [`docs/project-context.md`](docs/project-context.md) | Tujuan, persona Owner, batasan lingkup |
| [`docs/prd-agile-kokonus-farm.md`](docs/prd-agile-kokonus-farm.md) | PRD, epic, alur F1–F24 |
| [`docs/progress-backlog.md`](docs/progress-backlog.md) | Urutan user story & status ringkas |
| [`docs/sprint-backlog-agile.md`](docs/sprint-backlog-agile.md) | Backlog sprint (mirror PRD) |
| [`docs/notes.md`](docs/notes.md) | Catatan terbuka / follow-up |
| [`docs/figma-flow-inventory.md`](docs/figma-flow-inventory.md) | Inventaris layar Figma |
| [`docs/api.md`](docs/api.md) | Kontrak API (acuan integrasi) |

### Agile — sprint, DoD, audit log

| Dokumen | Isi |
|---------|-----|
| [`docs/agile/README.md`](docs/agile/README.md) | **Hub Agile** — board, sync script, alur merge |
| [`docs/agile/timeline-registry.md`](docs/agile/timeline-registry.md) | Timeline 5 sprint (actual start, goal, velocity) |
| [`docs/agile/definition-of-done.md`](docs/agile/definition-of-done.md) | DoD story & sprint |
| [`docs/agile/partial-delivery-policy.md`](docs/agile/partial-delivery-policy.md) | Partial delivery & label GitHub |
| [`docs/agile/audit-log.md`](docs/agile/audit-log.md) | Log audit manajemen proyek |
| [`docs/agile/AC-VERIFIKASI-RISIKO.md`](docs/agile/AC-VERIFIKASI-RISIKO.md) | AC yang perlu verifikasi ulang |
| [`docs/agile/KONFIRMASI-GAP-GITHUB.md`](docs/agile/KONFIRMASI-GAP-GITHUB.md) | Gap docs vs GitHub (keputusan PO) |
| [`docs/agile/github-field-guide.md`](docs/agile/github-field-guide.md) | Project #1: Status, Iteration |
| [`docs/agile/merge-stack.md`](docs/agile/merge-stack.md) | Urutan merge PR / stack |
| [`docs/agile/UX-FLOW-PERF-REPORT.md`](docs/agile/UX-FLOW-PERF-REPORT.md) | Closeout UX flow & perf |
| [`docs/agile/sprints/sprint-01-fondasi.md`](docs/agile/sprints/sprint-01-fondasi.md) | Sprint 1 — fondasi & auth |
| [`docs/agile/sprints/sprint-02-operasi.md`](docs/agile/sprints/sprint-02-operasi.md) | Sprint 2 — operasi & akuntansi |
| [`docs/agile/sprints/sprint-03-penjualan.md`](docs/agile/sprints/sprint-03-penjualan.md) | Sprint 3 — penjualan |
| [`docs/agile/sprints/sprint-04-laporan.md`](docs/agile/sprints/sprint-04-laporan.md) | Sprint 4 — laporan |
| [`docs/agile/sprints/sprint-05-qa.md`](docs/agile/sprints/sprint-05-qa.md) | Sprint 5 — QA & go-live |
| [`docs/agile/retro/sprint-01-retro.md`](docs/agile/retro/sprint-01-retro.md) | Retrospective Sprint 1 |

**Board:** [GitHub Project #1](https://github.com/users/sapikkk/projects/1) · `npm run sync:agile-progress` · `npm run sync:project-board`

### UCD (User-Centered Design)

| Dokumen | Isi |
|---------|-----|
| [`docs/ucd/README.md`](docs/ucd/README.md) | Hub UCD & increment v2 |
| [`docs/ucd/increment-v2-akuntansi-logistik.md`](docs/ucd/increment-v2-akuntansi-logistik.md) | Persona, pain, HMW v2 |
| [`docs/skenario-narasi-ucd-agile.md`](docs/skenario-narasi-ucd-agile.md) | Narasi alur UCD + Agile v1 |
| [`docs/ux/FLOW-NAV.md`](docs/ux/FLOW-NAV.md) | Navigasi & alur per peran |

### Blueprint v2 (akuntansi & logistik)

| Dokumen | Isi |
|---------|-----|
| [`docs/blueprint/README.md`](docs/blueprint/README.md) | Hub blueprint |
| [`docs/blueprint/akuntansi-logistik-hidroponik.md`](docs/blueprint/akuntansi-logistik-hidroponik.md) | COA, WIP, Smart Jurnal |
| [`docs/blueprint/VALIDASI-BACKLOG-PRD.md`](docs/blueprint/VALIDASI-BACKLOG-PRD.md) | Validasi backlog vs PRD |
| [`docs/blueprint/GITHUB-BACKLOG-DRAFT.md`](docs/blueprint/GITHUB-BACKLOG-DRAFT.md) | Draft issue epic v2 |
| [`docs/blueprint/rencana-implementasi-epic-v2.md`](docs/blueprint/rencana-implementasi-epic-v2.md) | Rencana PR story v2-A.1–D.1 |

### Uji — black-box, UAT, SUS, E2E

| Dokumen | Isi |
|---------|-----|
| [`docs/testing/panduan-uji-dan-demo.md`](docs/testing/panduan-uji-dan-demo.md) | Playwright, seed demo, pelatihan go-live (T5.9) |
| [`docs/testing/README.md`](docs/testing/README.md) | Indeks testing |
| [`docs/tabel-blackbox-testing.md`](docs/tabel-blackbox-testing.md) | Tabel master 231 langkah blackbox (BB-ID) |
| [`docs/uji-blackbox.md`](docs/uji-blackbox.md) | Notulensi uji black-box per US (AC, DoD, temuan) |
| [`docs/testing/DELETED-AGENTS-SKILLS-MANIFEST.md`](docs/testing/DELETED-AGENTS-SKILLS-MANIFEST.md) | Manifest skill agent (referensi) |
| [`e2e/smoke.spec.ts`](e2e/smoke.spec.ts) | Smoke E2E |
| [`e2e/sprint5-usability.spec.ts`](e2e/sprint5-usability.spec.ts) | Usability Sprint 5 (T5.1–T5.3) |

SUS (10 butir, 6 responden) dan task usability dijelaskan di PRD § Sprint 5 dan [`docs/agile/sprints/sprint-05-qa.md`](docs/agile/sprints/sprint-05-qa.md).

### Deploy & operasi

| Dokumen | Isi |
|---------|-----|
| [`docs/deployment/panduan-deploy-vercel-postgres.md`](docs/deployment/panduan-deploy-vercel-postgres.md) | Deploy Vercel, go-live, FINDING-01 pool DB |

### Audit teknis (RBAC, perf, keamanan)

| Dokumen | Isi |
|---------|-----|
| [`docs/audit/README.md`](docs/audit/README.md) | Hub audit |
| [`docs/audit/SUMMARY.md`](docs/audit/SUMMARY.md) | Ringkasan audit |
| [`docs/audit/MERGE-READINESS.md`](docs/audit/MERGE-READINESS.md) | Kesiapan merge |
| [`docs/audit/AGENT-RUNBOOK.md`](docs/audit/AGENT-RUNBOOK.md) | Runbook audit agent |
| [`docs/audit/rbac.md`](docs/audit/rbac.md) | RBAC & bypass dev |
| [`docs/audit/security.md`](docs/audit/security.md) | Keamanan |
| [`docs/audit/frontend.md`](docs/audit/frontend.md) · [`backend.md`](docs/audit/backend.md) | Lapisan aplikasi |
| [`docs/audit/qa.md`](docs/audit/qa.md) · [`07-verification.md`](docs/audit/07-verification.md) | Verifikasi QA |

### Agent, Graphify, skills domain

| Dokumen | Isi |
|---------|-----|
| [`AGENTS.md`](AGENTS.md) | Panduan agent (Graphify, Superpowers, backlog) |
| [`docs/cursor-superpowers.md`](docs/cursor-superpowers.md) | Submodule Superpowers |
| [`docs/skills/README.md`](docs/skills/README.md) | Skills lokal |
| [`docs/cursor-vendor-agents.md`](docs/cursor-vendor-agents.md) | Agency Agents, Karpathy, Semgrep (submodule + bootstrap) |
| [`docs/skills/akuntansi-hidroponik/SKILL.md`](docs/skills/akuntansi-hidroponik/SKILL.md) | Skill domain akuntansi hidroponik |

### Domain & notulensi

| Dokumen | Isi |
|---------|-----|
| [`docs/asumsi-benih-media.md`](docs/asumsi-benih-media.md) | Asumsi benih & media |
| [`docs/notulensi-2026-10-09.md`](docs/notulensi-2026-10-09.md) | Notulensi rapat |

## Kontribusi

1. Fork repositori `sapikkk/muhammadsyafiq213510100`.
2. Buat branch dari `main` (satu user story = satu branch, lihat `AGENTS.md`).
3. Commit dengan pesan jelas; pastikan `npm run typecheck` dan `npm run build` lulus.
4. Buka pull request ke `main` dengan ringkasan dan rencana uji.

Issue dan board: [GitHub Project #1](https://github.com/users/sapikkk/projects/1).

## Lisensi & kredit

Repositori **private** milik [sapikkk](https://github.com/sapikkk). Belum ada file `LICENSE` di root; hubungi pemilik repo sebelum redistribusi.

Stack open source: Next.js, Prisma, NextAuth, Radix UI, TanStack Table, dan dependensi lain di `package.json`.

---

**Maintainer:** [@sapikkk](https://github.com/sapikkk) · **Repo:** [muhammadsyafiq213510100](https://github.com/sapikkk/muhammadsyafiq213510100)
