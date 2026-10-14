# Audit halaman Petani (PEKERJA)

**Peran:** Petani · **Base URL:** `/petani` · **Prod contoh:** [kokonusfarm.vercel.app/petani](https://kokonusfarm.vercel.app/petani)  
**Tanggal:** 2026-10-15 · **Format temuan:** [`../standards/format-temuan-audit.md`](../standards/format-temuan-audit.md)

Cakupan: semua rute layar petani + sheet/detail (parallel routes). Tipografi responsif global: [`responsive-typography-2026-10-15.md`](responsive-typography-2026-10-15.md).

## Inventaris rute

| Rute | Judul UI | Pola layout | US / modul |
|------|----------|-------------|------------|
| `/petani` | Beranda | Bento + metrik + monitor + alur 4 langkah | US3.6 / US3.7 |
| `/petani/siklus` | Siklus tanam | CRUD + filter GH/kolam + dialog monitor | US3.1–3.3 |
| `/petani/siklus/baru` | (form semai) | DetailLayout + SiklusForm | US3.1 |
| `/petani/siklus/[id]` | (baris produksi) | DetailLayout + fase/timeline | US3.2–3.3 |
| `/petani/inventaris` | Stok barang | CRUD + detail sheet | US4.1 |
| `/petani/inventaris/[id]` | Detail item | DetailLayout | US4.1 |
| `/petani/active-pack` | Paket siap pakai | CRUD | US4.2 |
| `/petani/active-pack/[id]` | Detail pack | DetailLayout | US4.2 |
| `/petani/varietas` | Varietas | CRUD read-heavy | US3.4 |
| `/petani/varietas/[id]` | Info tanam | DetailLayout | US3.4 |
| `/petani/pengiriman` | Pengiriman | CRUD | US5.3 |
| `/petani/pengiriman/[id]` | Detail kirim | DetailLayout | US5.3 |
| `/petani/stok-rendah` | Stok rendah | CRUD alert | US4.3 |
| *(error)* | `app/petani/error.tsx` | StateScreen | US1.8 |

Nav sidebar ( [`lib/nav-flow.ts`](../../lib/nav-flow.ts) ): Beranda, Siklus tanam, Paket siap pakai, Stok barang, Varietas, Pengiriman, Stok rendah (via peringatan).

## Checklist singkat (semua halaman)

| Kriteria | Status | Catatan |
|----------|--------|---------|
| Bahasa Indonesia di judul/ tombol | **Lulus** | Ekspor, Mulai semai, Simpan monitor kolam, … |
| Shell `RoleHome` + menu mobile | **Lulus** | Hamburger + sidebar |
| Tanpa kode batch di label utama daftar | **Lulus** | Varietas · GH / Kolam ( [`lib/produksi-ui-labels.ts`](../../lib/produksi-ui-labels.ts) ) |
| Tabel scroll-x lokal | **Lulus** | `DataTable` |
| Toast / pesan error manusia | **Lulus** | `lib/pesan-ui.ts`, `petani-url-toast` |
| Lebar 320–390px | **Lulus** (manual disarankan) | Monitor dialog + stepper di screenshot prod OK |

## PETANI-01 — Badge izin RBAC (Read/Lihat) di layar petani

| | |
|--|--|
| **Severity** | Minor |
| **Status** | Selesai |
| **Tanggal** | 2026-10-15 |
| **Lokasi** | Semua `CrudPageLayout` petani, detail petani, beranda monitor |

### Konteks

Badge **Read** / **Lihat** menandai izin RBAC internal — membingungkan petani (bukan admin).

### Perbaikan (2026-10-15)

- `hidePermissionBadges` di semua halaman daftar petani.
- `hidePermissionBadge` di detail siklus, semai baru, varietas/inventaris/pack/pengiriman (mode petani), monitor beranda.
- Label izin tetap Indonesia di admin/owner lewat `lib/permission-section-badge.ts`.

## PETANI-02 — Dialog «Monitor kolam hari ini»

| | |
|--|--|
| **Severity** | Info |
| **Status** | Lulus (UX) |
| **Tanggal** | 2026-10-15 |
| **Lokasi** | `components/monitor-kolam-form.tsx`, `components/siklus-daftar-petani.tsx` |

### Konteks

Dari prod: filter kolam → buka monitor → PPM / pH / suhu dengan stepper.

### Bukti

- Judul dialog bahasa Indonesia.
- Tombol **Simpan monitor kolam** jelas.
- Stepper banyak tombol; di lebar ~390px masih muat (wrap baris stepper).

### Perbaikan (2026-10-15)

- `AngkaStepperField` `compactOnNarrow`: layar ≤479px hanya langkah tengah (±10 PPM, ±0,1 pH/suhu); tombol `h-11`.
- Dialog monitor: `sm:max-w-md`.

## PETANI-03 — Alur semai baru

| | |
|--|--|
| **Severity** | Info |
| **Status** | Lulus |
| **Lokasi** | `/petani/siklus/baru`, `components/siklus-form.tsx` |

Rockwool/benih, validasi, toast sukses — selaras US3.1; e2e T5.1 menguji pindah fase batch demo.

## Uji manual disarankan (PO)

1. Login `petani@kokonus.farm` → Beranda → **Kerjakan tugas** / **Mulai semai**.
2. **Siklus tanam** → filter GH/kolam → **Monitor kolam hari ini** → simpan.
3. **Stok rendah** → link ke inventaris.
4. **Pengiriman** → buka satu baris detail sheet.
5. DevTools 320px: menu, dialog monitor, tidak overflow body.

Terakhir diperbarui: **2026-10-15**.
