# Audit inventory — PHASE 0

Generated: 2026-10-09 · Branch: `chore/global-audit-bw-refactor` · App Router (Next.js 14).

## Tooling & rules loaded

| Source | Notes |
|--------|--------|
| `.cursor/rules/graphify.mdc` | Graphify before code exploration |
| `AGENTS.md` | Graphify, Superpowers, Ponytail |
| `.github/workflows/check.yml` | `npm ci`, `lint`, `typecheck` (no `build` in CI) |
| `.agents/skills/**` | Ponytail, UI craft, Playwright, agile — apply per phase |
| `docs/api.md` | API contract reference (may drift from `app/api`) |

**Not installed (relevant to master prompt):** `@tanstack/react-table`, `sonner`, `react-hook-form`, `zod` (verify before Phase 3/5 — may use ad-hoc validation today).

---

## Roles (RBAC)

| Role | Middleware prefix | Sidebar via `RoleHome` |
|------|-------------------|-------------------------|
| `OWNER` | `/owner/*` | `app/owner/layout.tsx` |
| `ADMIN` | `/admin/*` | `app/admin/layout.tsx` |
| `PEKERJA` (Petani) | `/petani/*` | `app/petani/layout.tsx` |

Central gate: `middleware.ts` + session `role` / `mustChangePassword`. API routes: per-handler session checks (no global API middleware).

**Pages without role sidebar:** `/`, `/login`, `/lupa-sandi`, `/ganti-sandi`, `/akses-ditolak`, `/pengaturan` (partial matcher). **Special:** `/admin/penjualan/[id]/invoice` (print-oriented).

---

## App routes (pages)

### Public / auth

| Route | File | Sidebar |
|-------|------|---------|
| `/` | `app/page.tsx` | No |
| `/login` | `app/login/page.tsx` | No |
| `/lupa-sandi` | `app/lupa-sandi/page.tsx` | No |
| `/ganti-sandi` | `app/ganti-sandi/page.tsx` | No |
| `/akses-ditolak` | `app/akses-ditolak/page.tsx` | No |
| `/pengaturan` | `app/pengaturan/page.tsx` | No (middleware only) |

### Owner (`/owner`)

| Route | File |
|-------|------|
| `/owner` | `app/owner/page.tsx` |
| `/owner/akun` | `app/owner/akun/page.tsx` |
| `/owner/jurnal` | `app/owner/jurnal/page.tsx` |
| `/owner/jurnal/[id]` | `app/owner/jurnal/[id]/page.tsx` |
| `/owner/prive` | `app/owner/prive/page.tsx` |
| `/owner/pengguna` | `app/owner/pengguna/page.tsx` |
| `/owner/biaya` | `app/owner/biaya/page.tsx` |
| `/owner/evaluasi` | `app/owner/evaluasi/page.tsx` |
| `/owner/arus-kas` | `app/owner/arus-kas/page.tsx` |
| `/owner/laporan` | `app/owner/laporan/page.tsx` |
| `/owner/inventaris` | `app/owner/inventaris/page.tsx` |
| `/owner/infrastruktur` | `app/owner/infrastruktur/page.tsx` |
| `/owner/varietas` | `app/owner/varietas/page.tsx` |
| `/owner/petani` | `app/owner/petani/page.tsx` |
| `/owner/stok-rendah` | `app/owner/stok-rendah/page.tsx` |

### Admin (`/admin`)

| Route | File |
|-------|------|
| `/admin` | `app/admin/page.tsx` |
| `/admin/akun` | `app/admin/akun/page.tsx` |
| `/admin/jurnal` | `app/admin/jurnal/page.tsx` |
| `/admin/jurnal/baru` | `app/admin/jurnal/baru/page.tsx` |
| `/admin/jurnal/[id]` | `app/admin/jurnal/[id]/page.tsx` |
| `/admin/inventaris` | `app/admin/inventaris/page.tsx` |
| `/admin/active-pack` | `app/admin/active-pack/page.tsx` |
| `/admin/infrastruktur` | `app/admin/infrastruktur/page.tsx` |
| `/admin/varietas` | `app/admin/varietas/page.tsx` |
| `/admin/petani` | `app/admin/petani/page.tsx` |
| `/admin/pelanggan` | `app/admin/pelanggan/page.tsx` |
| `/admin/penjualan` | `app/admin/penjualan/page.tsx` |
| `/admin/penjualan/[id]/invoice` | `app/admin/penjualan/[id]/invoice/page.tsx` |
| `/admin/harvest` | `app/admin/harvest/page.tsx` |
| `/admin/harvest/[id]` | `app/admin/harvest/[id]/page.tsx` |
| `/admin/biaya` | `app/admin/biaya/page.tsx` |
| `/admin/susut` | `app/admin/susut/page.tsx` |
| `/admin/stok-rendah` | `app/admin/stok-rendah/page.tsx` |

### Petani (`/petani`)

| Route | File |
|-------|------|
| `/petani` | `app/petani/page.tsx` |
| `/petani/inventaris` | `app/petani/inventaris/page.tsx` |
| `/petani/active-pack` | `app/petani/active-pack/page.tsx` |
| `/petani/varietas` | `app/petani/varietas/page.tsx` |
| `/petani/siklus` | `app/petani/siklus/page.tsx` |
| `/petani/siklus/[id]` | `app/petani/siklus/[id]/page.tsx` |
| `/petani/pengiriman` | `app/petani/pengiriman/page.tsx` |
| `/petani/stok-rendah` | `app/petani/stok-rendah/page.tsx` |

### Global UI shells

| File | Scope |
|------|--------|
| `app/layout.tsx` | Root (no sidebar) |
| `app/loading.tsx` | Root loading |
| `app/error.tsx` | Root error (no sidebar) |
| `app/not-found.tsx` | 404 (no sidebar) |

---

## API route handlers (`app/api`)

| Path | Methods (typical) | Domain |
|------|-------------------|--------|
| `/api/auth/[...nextauth]` | * | Auth |
| `/api/accounts` | CRUD | COA |
| `/api/transactions` | GET | Jurnal |
| `/api/varietas` | * | Varietas |
| `/api/customers` | * | Pelanggan |
| `/api/petani` | * | Petani ERD |
| `/api/harvest`, `/api/harvest/[id]/approve|reject` | * | Panen |
| `/api/production`, `/api/production/[id]/phase` | * | Siklus/fase |
| `/api/inventory/*` | * | Stok, pack, alert |
| `/api/infrastructure/*` | * | Lahan/GH/kolam |
| `/api/biaya/langsung`, `/api/biaya/overhead` | * | Biaya |
| `/api/sales-orders/*` | * | SO lifecycle |
| `/api/reports/*` | GET | Laporan |
| `/api/export/*` | GET | PDF/XLSX |

---

## Server Actions (`app/actions`)

`register`, `prive`, `owner-users`, `sales-order`, `varietas`, `tambal`, `susut`, `siklus`, `profile`, `petani-master`, `pelanggan`, `monitor`, `kegagalan`, `jurnal`, `inventaris`, `infrastruktur`, `harvest`, `biaya`, `akun`, `active-pack`, `password`.

---

## Prisma models (touch map summary)

| Model | Primary UI/API |
|-------|----------------|
| User, PasswordResetRequest | Auth, `/owner/pengguna`, register |
| Akun, Jurnal, JurnalBaris | COA, jurnal, export |
| Lahan, Greenhouse, Kolam | Infrastruktur |
| Varietas | Varietas CRUD |
| Siklus_Produksi, Log_Produksi, Laporan_Panen, Log_Kegagalan | Produksi/panen |
| Biaya_Langsung, Biaya_Overhead, HPP | Biaya/HPP |
| ItemInventaris, ActivePack, PergerakanInventaris | Inventaris |
| Pelanggan, Sales_Order, Sales_Order_Baris, Penjualan | Penjualan |
| Petani | Master petani |
| Laporan_LabaRugi, Neraca, Arus_Kas, Pinjaman_Modal | Mostly report placeholders / future |

---

## UI audit flags (pre-refactor)

| Check | Count / location |
|-------|------------------|
| `Card` usage | Multiple pages (owner dashboard, evaluasi, arus-kas, admin home, login, foundation-panel, owner-kpi-cards) |
| `shadow-*` in UI | `components/ui/card.tsx`, `dialog.tsx`, `select.tsx`, invoice page |
| `--destructive` red, `--radius` 0.5rem | `globals.css` |
| `console.*` in app | `app/error.tsx`, `app/admin/harvest/[id]/page.tsx` |
| Recharts (color charts) | Owner dashboard/biaya — conflicts with strict B&W brief |
| DataTable / TanStack | **Not present** — lists use `<ul>`, custom tables, forms |

---

## Next phases (planned)

1. PHASE 1 — `AUDIT_BYPASS_RBAC` dev-only in middleware/helper  
2. PHASE 2 — B&W tokens, ban shadows/gradients, sidebar on all authenticated shells  
3. PHASE 3+ — DataTable, CRUD standardization, errors/toaster, dept audits  

See `01-baseline.md` for command results before changes.
