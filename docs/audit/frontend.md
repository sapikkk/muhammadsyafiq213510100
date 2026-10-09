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
| Low | Forms | jurnal/akun/pengaturan/inventaris | Tanpa toast | **Partial:** `useActionToast` |
| Low | Inventaris/varietas | `*-daftar` | List `<ul>` + Decimal ke client | **Fixed:** `DataTable` + `serializeItem` |
| Low | Mobile nav | `app-sidebar` | Drawer tidak tutup setelah klik | **Fixed:** `onNavigate` |
| Low | Many lists | various | `Card` untuk KPI/detail | **Partial** — bukan listing CRUD |

## Responsif (belum diuji sistematis)

Agent berikutnya: Playwright viewport matrix + isi baris Fail di tabel atas.
