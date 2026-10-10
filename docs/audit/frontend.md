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
| Low | Forms | server actions | Tanpa toast | **Done:** `useActionToast` di form utama |
| Low | Harvest approve | `client-approval` | API legacy + warna merah | **Fixed:** `apiFail` parse + Sonner |
| Low | `/admin/akun` | `akun-tree` | Tanpa filter | **Fixed:** cari kode/nama + toast toggle |
| Low | `/admin/infrastruktur` | `infrastruktur-pohon` | Tanpa filter | **Fixed:** cari GH/kolam |
| Low | Root `error.tsx` | Tanpa navigasi keluar | **Fixed:** link dashboard/login + toast |
| Low | Inventaris/varietas | `*-daftar` | List `<ul>` + Decimal ke client | **Fixed:** `DataTable` + `serializeItem` |
| Low | Mobile nav | `app-sidebar` | Drawer tidak tutup setelah klik | **Fixed:** `onNavigate` |
| Medium | `/admin/jurnal`, `/owner/jurnal` | `jurnal-daftar` | List link `<ul>` | **Fixed:** `DataTable` + URL `?q=` |
| Low | `/` | `app/page.tsx` | User login masih landing | **Fixed:** redirect ke dashboard |
| Low | `/admin/petani` | `petani-master-daftar` | Table statis | **Fixed:** `DataTable` + search |
| Low | Many lists | various | `Card` untuk KPI/detail | **Partial** — bukan listing CRUD |
| High | `admin/owner/petani` layouts | `listAlertStokMinimum` | Setiap navigasi: load semua item inventaris + filter JS; duplikat dengan dashboard/banner/tugas | **Fixed:** `lib/cached-queries.ts` (`React.cache`, query select lean); layout pakai `getStokRendahCount` |
| Medium | `/petani` dashboard | `daftarTugasPetani` | `listSiklusProduksi()` full history | **Fixed:** `listSiklusAktifCached` (take 80, status aktif) |
| Medium | `/owner` | KPI chart | `monthlySummary` + `kpiHidroponikMvp` tanpa dedup request | **Fixed:** `monthlySummaryCached`, `kpiHidroponikMvpCached` |
| Low | CRUD pages | `app/**/page.tsx` | Header custom + link “Kembali ke beranda” | **Fixed:** `CrudPageLayout` + `FlowSteps` Admin/Owner/Petani (mirror halaman operasi) |
| Low | Semua `DataTable` | `components/data-table.tsx` | Double scroll wrapper; header tidak sortable | **Fixed:** `Table noContainer`, sort UI, zebra rows, default page 12 |

## Responsif (belum diuji sistematis)

Agent berikutnya: Playwright viewport matrix + isi baris Fail di tabel atas.
