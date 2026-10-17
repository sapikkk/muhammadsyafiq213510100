# Audit UI Lime — 95 halaman (2026-10-17)

**Wireframe** = default produksi (monokrom, radius 0). **Lime** = `localStorage` `kokonus-ui-theme` → `data-ui-theme=lime` + class `lime` pada body.

## Lapisan styling (tanpa ubah data)

| Lapisan | File | Cakupan |
|---------|------|---------|
| Token Lime | `components/lime/tokens.css` | DM Sans, Manrope, accent, status |
| Jembatan shadcn | `app/styles/ui-theme-lime.css` | CSS variables + owner keuangan hero |
| **Skin global Kokonus** | `app/styles/kokonus-lime-surfaces.css` | Tabel header pill, kartu radius, input, progress, alert, sidebar |
| Brand | `public/brand/*`, `KokonusBrandMark`, `KokonusBrandWordmark` | Ikon, wordmark, favicon `app/icon.png` |

Semua route di bawah **menerima skin global** saat Lime aktif (tabel, form, kartu, shell).

## Legenda kolom

| Kode | Arti |
|------|------|
| **G** | Global skin (cukup aktifkan Lime di Pengaturan) |
| **L** | Komponen Lime khusus (`@/components/lime/*` atau varietas/login) |
| **B** | Backlog layout Figma (laporan cetak, kartu rekening visual, donut proporsi) |

## Auth & umum (7)

| Route | G | L | B |
|-------|---|---|---|
| `/`, `/login` | ✓ | ✓ login | — |
| `/lupa-sandi`, `/ganti-sandi`, `/akses-ditolak` | ✓ | — | — |
| `/pengaturan` | ✓ | ✓ contoh + tema | — |
| `/notifikasi/buka/[id]` | ✓ | — | — |

## Owner (28)

| Route | G | L | B |
|-------|---|---|---|
| `/owner` (beranda) | ✓ | — | monitor sudah disederhanakan |
| `/owner/keuangan` | ✓ | — | proporsi sektor / donut |
| `/owner/laporan` | ✓ | — | laba rugi & neraca layout Figma |
| `/owner/rekening` | ✓ | — | kartu saldo stack (metafora visual) |
| `/owner/jurnal`, detail, koreksi | ✓ | — | — |
| `/owner/penjualan`, piutang, `[id]` | ✓ | — | tabel pill header |
| `/owner/inventaris`, stok-rendah | ✓ | — | inline alert warn |
| `/owner/varietas` | ✓ | ✓ daftar Lime | — |
| `/owner/akun`, biaya, arus-kas, prive, produksi, evaluasi, infrastruktur, petani, pengguna, kegagalan-susut | ✓ | — | — |

## Admin (39)

Semua `/admin/*` (dashboard, jurnal, penjualan, harvest, inventaris, varietas, keuangan, …): **G ✓**, **L** hanya jika varietas, **B** sama seperti owner untuk laporan/keuangan berat.

## Petani (21)

Semua `/petani/*` (beranda bento, siklus, inventaris, pengiriman, active-pack, varietas, stok-rendah): **G ✓**, **L** varietas, **B** kartu produksi/siklus progress ala Figma `PRODUCTION_*` PDF.

## Verifikasi manual (Lime aktif)

1. Pengaturan → **Lime Kokonus** → reload.
2. Owner beranda, keuangan, laporan, rekening — tabel header hijau, sudut kartu lembut.
3. Sidebar: ikon daun + wordmark PNG.
4. Login: wordmark + form Lime.
5. Favicon tab: kno lime (`app/icon.png`).
6. Wireframe: matikan Lime — monokrom kembali.

## Monitor kolam (owner / admin / petani)

Satu komponen: `MonitorKolamBeranda` → ringkas dulu, **Buka monitor lengkap** → `DashboardMonitorKolam`.

Tampilan lengkap (2026-10-17):

- Chip rentang: 7 / 30 / 90 / Tanggal lain
- Satu dropdown **Tampilan** (tabel + diagram, tanpa baris tombol lama)
- **Opsi lanjutan**: lokasi + ekspor (details)
- Diagram chart terpisah di beranda **dihapus** (duplikat)

## Organisme (backlog B — status)

| Item | Status |
|------|--------|
| `FilterChipGroup` | `components/kokonus/filter-chip-group.tsx` |
| `KokonusInlineAlert` | `components/kokonus/kokonus-inline-alert.tsx` (+ stok rendah) |
| `KokonusProgressBar` | `components/kokonus/kokonus-progress-bar.tsx` (+ `/owner/keuangan`) |
| Laba rugi Figma | `OwnerLaporanLabaRugiPresentasi` di `/owner/laporan` |
| Neraca bar total | `OwnerNeracaTampilan` pill hijau/lime |
| Kartu saldo rekening | `RekeningKasKartuStack` di `/owner/rekening` |
| Transfer wizard | Backlog |

## Daftar 95 route

Semua `app/**/page.tsx` — cakupan **G** saat Lime aktif kecuali catatan **B** di atas. Grup: auth 7 · owner 28 · admin 39 · petani 21.

*95 file `page.tsx` — tidak perlu edit per file jika skin global mencukupi; organisme di atas untuk gap **B**.*
