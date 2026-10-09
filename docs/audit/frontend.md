# PHASE 6.1 — Frontend audit log

Append-only. Agent menambah baris per sesi.

| Sev | Route | File | Temuan | Fix / status |
|-----|-------|------|--------|----------------|
| High | `/owner/akun`, `/admin/akun` | `lib/akun.ts` | Prisma `Decimal` (`saldo`) ikut ke `AkunTree` → hydration warning | **Fixed:** `buildClientTree`, `toAkunEdit` |
| Medium | `/pengaturan` | `app/pengaturan/page.tsx` | Tanpa sidebar role shell | **Fixed:** `app/pengaturan/layout.tsx` + `RoleHome` |
| Medium | `/owner`, `/owner/biaya` | `owner-*-chart.tsx` | Pie/bar warna brand | **Fixed:** skala abu-abu |
| Medium | `/ganti-sandi`, `/akses-ditolak`, 404, loading | layouts | Tanpa sidebar | **Fixed:** `SessionShell` |
| Medium | `/owner/*` errors | `app/owner/error.tsx` | Error di luar shell | **Fixed:** segment `error.tsx` + toast |
| Low | `/`, `/login` | inventory | Landing/login tanpa sidebar | **Deferred** — public |
| Low | `/owner/pengguna` | `owner-user-panel` | List `<ul>` bukan tabel | **Fixed:** `DataTable` pilot |
| Low | `/admin/pelanggan` | `pelanggan-daftar` | List `<ul>` | **Fixed:** `DataTable` |
| Medium | Role layouts | `role-home` | Sidebar hilang di mobile | **Fixed:** `AppShellLayout` + menu Dialog |
| Low | Forms | admin CRUD utama | Tanpa toast | **Partial:** SO, pelanggan, varietas, infra, biaya, akun tree, login |
| Low | `/admin/akun` | `akun-tree` | Tanpa filter | **Fixed:** cari kode/nama + toast toggle |
| Low | `/admin/infrastruktur` | `infrastruktur-pohon` | Tanpa filter | **Fixed:** cari GH/kolam |
| Low | Root `error.tsx` | Tanpa navigasi keluar | **Fixed:** link dashboard/login + toast |
| Low | Inventaris/varietas | `*-daftar` | List `<ul>` + Decimal ke client | **Fixed:** `DataTable` + `serializeItem` |
| Low | Mobile nav | `app-sidebar` | Drawer tidak tutup setelah klik | **Fixed:** `onNavigate` |
| Medium | `/admin/jurnal`, `/owner/jurnal` | `jurnal-daftar` | List link `<ul>` | **Fixed:** `DataTable` + URL `?q=` |
| Low | `/` | `app/page.tsx` | User login masih landing | **Fixed:** redirect ke dashboard |
| Low | `/admin/petani` | `petani-master-daftar` | Table statis | **Fixed:** `DataTable` + search |
| Low | Many lists | various | `Card` untuk KPI/detail | **Partial** — bukan listing CRUD |

## Responsif (belum diuji sistematis)

Agent berikutnya: Playwright viewport matrix + isi baris Fail di tabel atas.
