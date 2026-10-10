# UX alur — Kokonus Farm

Tema visual tetap **monokrom** (hitam/putih). Perbaikan fokus pada **flow**, bukan dekorasi.

## Sidebar (`lib/nav-flow.ts`, `lib/nav-items.ts`)

Menu dikelompokkan per peran:

| Peran | Grup |
| --- | --- |
| Admin | Mulai · Produksi & stok · Penjualan · Akuntansi · Tim |
| Owner | Ringkasan · Keuangan · Operasi · Kelola |
| Petani | Hari ini · Di lapangan · Logistik · Peringatan |

Item **Akuntansi** (`/admin/akuntansi`) ada di navigasi Admin.

## Pola halaman CRUD

Komponen:

- `FlowSteps` — langkah 1–n di atas konten
- `PageSection` — judul + badge **Read / Create / Update**
- `CrudPageLayout` — gabungan header + alur + daftar + form
- `admin-flow-dashboard.tsx` / `owner-flow-dashboard.tsx` — hub Admin/Owner

## Cakupan halaman (v1.28.0)

**Admin:** dashboard, pelanggan, inventaris, active pack, penjualan, jurnal, harvest, akuntansi, varietas, infrastruktur, stok rendah, susut, biaya, akun, petani.

**Owner:** dashboard, jurnal, laporan, biaya, arus kas, evaluasi, akun, prive, pengguna, inventaris, varietas, infrastruktur, stok rendah, petani.

**Petani:** dashboard, siklus, inventaris, active pack, varietas, stok rendah, pengiriman.

Halaman **detail** (`jurnal/[id]`, harvest `[id]`, invoice, siklus `[id]`) tetap link “Kembali ke daftar” — drill-down, bukan CRUD list.

## Performa (request dedup)

`lib/cached-queries.ts` — `React.cache()` untuk:

- alert stok minimum (query lean; layout badge + banner + tugas petani)
- siklus aktif (dashboard petani)
- `monthlySummary` / `kpiHidroponikMvp` (dashboard owner)
- `listSiklusProduksi` (halaman biaya admin)

Catatan audit: `docs/audit/frontend.md`.

## Belum / opsional (bukan blocker deploy)

- Tabel HTML manual di Owner arus kas & evaluasi (bisa diseragamkan ke `DataTable` later)
- Uji responsif sistematis (Playwright viewport matrix) — `docs/audit/frontend.md`
- Filter DB-side penuh untuk stok rendah (saat ini filter di app setelah select kolom minimal)

## Verifikasi

```bash
npm run typecheck
npm run build
npm run dev
# Login admin@ / owner@ / petani@ — sidebar grup, sort tabel, navigasi tanpa link “Kembali ke beranda” di halaman CRUD
```
