# Audit responsif & tipografi (2026-10-15)

Cakupan: **95 halaman** `app/**/page.tsx` lewat **design system bersama** (bukan edit per file).

## Target

- Layout aman **100px–640px+** tanpa scroll horizontal di shell.
- Tabel: scroll horizontal di dalam kartu (`DataTable`).
- Tipografi: skala fluid + hierarki konsisten (judul halaman / section / detail).

## Perubahan inti

| Lapisan | File | Efek ke semua halaman |
|---------|------|------------------------|
| Root fluid type | `app/globals.css` | `clamp()` 13–16px, `overflow-x: clip`, `text-wrap` |
| Token kelas | `lib/ui-typography.ts` | `pageTitleClass`, `sectionTitleClass`, `detailTitleClass` |
| Shell | `app-shell-layout.tsx` | Padding/gap/header mengecil di &lt;220px |
| CRUD | `crud-page-layout`, `page-header`, `page-section`, `page-header-row` | Judul & lead konsisten |
| Detail | `detail-layout.tsx` | Judul responsif + `min-w-0` |
| Beranda | `dashboard-bento`, `metric-cards` | **1 kolom** &lt;220px, 2 kolom setelahnya |
| Tabel | `data-table`, `lib/table-cell-text.ts` | Sel full-width sempit; tabel scroll-x |
| Auth | `login/page.tsx`, `ganti-sandi` | Padding sempit, `min-w-0` |

## Halaman petani

Semua rute `app/petani/**` memakai `RoleHome` → `AppShellLayout` + pola `CrudPageLayout` / `DetailLayout` / `DataTable` di atas. Tidak perlu patch per `page.tsx`.

## Uji manual disarankan

1. DevTools → lebar **100px**, **320px**, **390px** — Beranda petani, Siklus baru, Daftar inventaris, Pengiriman detail.
2. Pastikan menu hamburger terbuka, toast terlihat, tidak ada overflow body.
3. Tabel: geser horizontal hanya di dalam border tabel.

## Batas realistis

Di **100px** teks sangat kecil; yang dijamin: **tidak pecah layout**, konten **terbungkus** atau **scroll-x lokal**. Untuk baca nyaman, PO tetap menganjurkan ≥320px.
