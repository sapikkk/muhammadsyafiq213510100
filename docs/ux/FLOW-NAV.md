# UX alur — Kokonus Farm

Tema visual tetap **monokrom** (hitam/putih). Perbaikan fokus pada **flow**, bukan dekorasi.

## Sidebar (`lib/nav-flow.ts`, `lib/nav-items.ts`)

Menu dikelompokkan per peran:

| Peran | Grup |
| --- | --- |
| Admin | Mulai · Produksi & stok · Penjualan · Akuntansi · Tim |
| Owner | Ringkasan · modul 1.0–7.0 · Kelola — lihat `lib/owner-epic-nav.ts` |
| Petani | Hari ini · Di lapangan · Logistik · Peringatan |

Item **Akuntansi** (`/admin/akuntansi`) ada di navigasi Admin.

## Pola halaman CRUD

Komponen:

- `PageCoachmark` / `FlowSteps` — tombol **Panduan** di **baris header** (`PageHeaderRow`, sejajar judul & aksi), langkah di dialog, catatan singkat, auto-tampil pertama kali (localStorage)
- `PageGuideToolbar` / `DetailLayoutToolbar` — panduan dari URL di detail `/[id]`, `/baru`, pengaturan, ganti sandi, invoice SO
- `PageSection` — judul + badge **Read / Create / Update**
- `CrudPageLayout` — header + daftar; form lewat `actions` (Sheet) bila sudah dimigrasi
- `FormSheet`, `ConfirmDialog`, `RowActions`, `AktifToggleDialog` — Tingkat A (pelanggan, petani master, owner pengguna): Tambah/Ubah Sheet + Nonaktifkan Dialog
- `DetailLayout` + `getRowHref` — Tingkat B varietas, inventaris, active pack: klik baris → **sheet lebar** (intercept `[id]`) atau halaman penuh jika URL dibuka langsung; Tambah Sheet; riwayat perubahan master (`RiwayatPerubahan`, varietas dulu)
- **Akun (Tingkat B pohon):** Tambah Sheet di header; Ubah/Nonaktifkan per node (Dialog); tanpa `?edit=`; Owner `mode="owner"`
- **Infrastruktur (Tingkat B pohon):** Tambah lahan/GH/kolam Sheet; status kolam Dialog per baris; Owner baca saja
- **Penjualan (Tingkat C):** `/admin/penjualan` daftar → `[id]` aksi per status; `/admin/penjualan/baru`; petani `/petani/pengiriman/[id]`
- **Siklus petani (Tingkat C):** `/petani/siklus/baru`; detail `[id]` — langkah berikutnya inline; monitor/tambal/kegagalan/abort via Dialog
- `admin-flow-dashboard.tsx` / `owner-flow-dashboard.tsx` — hub Admin/Owner

## Cakupan halaman (v1.28.0)

**Admin:** dashboard, pelanggan, inventaris, active pack, penjualan, jurnal, harvest, akuntansi, varietas, infrastruktur, stok rendah, susut, biaya, akun, petani.

**Owner:** dashboard, jurnal, laporan, biaya, arus kas, evaluasi, akun, prive, pengguna, inventaris, varietas, infrastruktur, stok rendah, petani (semua dengan **Panduan**).

**Petani:** dashboard, siklus (+ `/baru`), inventaris, active pack, varietas, stok rendah, pengiriman (+ detail `[id]`).

**Lain:** `/` (beranda), `/login`, `/lupa-sandi`, `/ganti-sandi`, `/akses-ditolak`, `/admin/jurnal/baru`, `/admin/penjualan/baru`, `/admin/penjualan/[id]/invoice`.

Halaman **detail** — soft navigation dari daftar membuka **DetailSheetFrame**; hard link / refresh tetap halaman penuh dengan “Kembali ke daftar”. Sidebar: grup **judul saja**, sub-menu **collapse**.

## Performa (request dedup)

`lib/cached-queries.ts` — `React.cache()` untuk:

- alert stok minimum (query lean; layout badge + banner + tugas petani)
- siklus aktif (dashboard petani)
- `monthlySummary` / `kpiHidroponikMvp` (dashboard owner)
- `listSiklusProduksi` (halaman biaya admin)

Catatan audit: `docs/audit/frontend.md`.

## Belum / opsional (bukan blocker deploy)

- Uji responsif sistematis (Playwright viewport matrix) — `docs/audit/frontend.md`
- Filter DB-side penuh untuk stok rendah (saat ini filter di app setelah select kolom minimal)

## Verifikasi

```bash
npm run typecheck
npm run build
npm run dev
# Login admin@ / owner@ / petani@ — sidebar grup, sort tabel, navigasi tanpa link “Kembali ke beranda” di halaman CRUD
```
