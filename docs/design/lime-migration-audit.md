# Audit Lime — komponen UI & halaman (2026-10-16)

Ringkasan gap integrasi **Lime** (`@/components/lime/*`, token `--fg` / `--accent`) vs **wireframe + shadcn** (`@/components/ui/*`, `data-ui-theme=wireframe`).

## Font (permintaan PO)

| Peran | Sebelum | Target |
|-------|---------|--------|
| Prosa UI Lime | Hanken Grotesk | **DM Sans** (`--font-sans`) |
| Angka / tabular | ui-monospace | **Manrope** (`--font-mono` + `.tabular-nums`) |

Implementasi: `app/layout.tsx` (next/font), `components/lime/tokens.css`, `components/lime/base.css`, `app/styles/ui-theme-lime.css`.

## Komponen

### Lime terpasang (`components/lime/`)

| File | Dipakai app? |
|------|----------------|
| ui/button, card, input, list, switch, amount, status, bill-schedule, collapsible | Hanya preview Pengaturan / blok contoh |
| ai/approval-request, autonomy-rule | `kokonus-lime-contoh.tsx` |
| blocks/settings-rules, assistant-approval, assistant-alert | Contoh + settings block |

**Total paket Lime ~20+ di registry; terinstal lokal ~9 ui + 3 blocks.** Belum diinstal: Field, Select, Table, Dialog, Balance, Insight, home block, dll.

### shadcn legacy (`components/ui/`)

button, card, input, textarea, select, table, dialog, sheet, badge, sonner — dipakai **seluruh** `app/` dan mayoritas `components/`.

### Jembatan tema

- `html[data-ui-theme=lime]` + `body.lime` + `LimePortalProvider` → token Lime untuk overlay.
- `app/styles/ui-theme-lime.css` → variabel shadcn agar nav/kartu lama tidak patah.
- **Tidak** mengganti import `@/components/ui/*` otomatis.

## Halaman — status Lime

Legenda: **W** wireframe only · **B** jembatan CSS lime · **L** import `@/components/lime/*`

| Rute | W | B | L | Catatan |
|------|---|---|---|---------|
| `/pengaturan` | ✓ | ✓ | ✓ | `KokonusLimeContoh` |
| `/login` | ✓ | ✓ | ✓ | Emblem + Input/Button Lime saat tema lime |
| `/*/varietas` (admin/owner/petani) | ✓ | ✓ | ✓ | `VarietasDaftarLime` (List + Carbon) |
| `/owner/keuangan` | ✓ | ✓ | — | Layout Monex/LeaseFlow (2026-10-16); masih `@/components/ui` |
| `/owner/*` (28 halaman lain) | ✓ | ✓ | — | MetricCards, lucide, Card |
| `/admin/*` | ✓ | ✓ | — | sama |
| `/petani/*` | ✓ | ✓ | — | bento petani ada, bukan Lime |
| `/login`, `/lupa-sandi`, … | ✓ | ✓ | — | form shadcn |

**95** file `page.tsx`; **4+** alur pakai komponen Lime langsung saat `data-ui-theme=lime` (Pengaturan, login, varietas).

## Prioritas migrasi (disarankan)

1. **Shell global** — font + token sudah; pertahankan wireframe default.
2. **`/owner/keuangan`** — layout referensi (gelap saldo + pipeline + 3 kolom); ganti MetricCards baris 9 kartu.
3. **`/owner/penjualan/piutang`** — Table/List Lime + `formatAmount` IDR adapter.
4. **Form owner/admin** — Field + Input Lime per layar saat tema lime (dual render opsional).
5. **Instal paket Lime** — table, dialog, empty, error-state, balance (shadcn add URL skill).

## Pola anti-slop (temuan audit)

| Temuan | Lokasi | Perbaikan |
|--------|--------|-----------|
| Baris metrik seragam 9 kartu | `owner-dashboard-keuangan-panel` | Diganti layout Monex + strip kecil |
| Icon tile dekoratif | `owner-keuangan-hub-bento` | Link teks tanpa lucide tile |
| Lucide vs Carbon | hampir semua owner/admin | Bertahap: Carbon hanya di scope `.lime` |

## Verifikasi

- [ ] `npm run build`
- [ ] Tema wireframe: radius 0, monokrom
- [ ] Tema lime (Pengaturan): DM Sans, angka Manrope, satu glow primary per layar contoh
- [ ] `/owner/keuangan` responsif 390px / 1280px

Referensi layout: `docs/design/referensi-layout-dashboard-prompt.md`.

**Perencanaan Figma + brand + ikon varietas:** `docs/design/perencanaan-ui-figma-kokonus.md`.

### Ikon & brand (2026-10-16)

| Item | Status |
|------|--------|
| Emblem SVG Figma → `public/brand/` | Diekspor |
| Sidebar `KokonusBrandMark` | Terpasang |
| Glyph varietas tabel | `VarietasGlyph` + agritech monokrom |
| shadcn.io vegetable pack | **Kurasi** — pakai outline monokrom, bukan emoji (lihat perencanaan §3) |
| Lime varietas (Carbon) | **Siap** — `VarietasListIcon`, `lib/lime/varietas-carbon-icon.ts` ([lime-icons-prep.md](lime-icons-prep.md)) |
| Kopsurat PDF | Header teks brand; logo raster backlog |
