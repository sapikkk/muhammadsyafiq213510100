# Perencanaan UI — Figma × Kokonus Farm

Dokumen perencanaan layout, komponen, brand, dan ikon. Sumber desain: file Figma [`x`](https://www.figma.com/design/vHP9l3QZucVlldDiDtk5RE/x) (Kokonus Farm). Implementasi kode mengikuti **dua tema**: wireframe lo-fi (produksi) dan **Lime** (preview), plus jembatan shadcn di `app/styles/ui-theme-lime.css`.

Terhubung: [`referensi-layout-dashboard-prompt.md`](referensi-layout-dashboard-prompt.md) · [`lime-migration-audit.md`](lime-migration-audit.md)

---

## 1. Peta frame Figma → produk

| Node Figma | Isi (dari metadata) | Target app |
|------------|---------------------|------------|
| [262:10295 Cover](https://www.figma.com/design/vHP9l3QZucVlldDiDtk5RE/x?node-id=262-10295) | Masthead brand, hero judul dokumen, index meta, footer kredit | **Kopsurat PDF/XLSX**, halaman cover ekspor, metadata laporan |
| [388:73510 Logo Design](https://www.figma.com/design/vHP9l3QZucVlldDiDtk5RE/x?node-id=388-73510) | Emblem light/dark, wordmark, sidebar header vector | **`public/brand/`**, sidebar, favicon, OG |
| [280:13294 Color system](https://www.figma.com/design/vHP9l3QZucVlldDiDtk5RE/x?node-id=280-13294) | Primary Green, Accent Lime, semantic scales | Token map → Lime + wireframe + `ui-theme-lime.css` |
| [414:42531 Style guide](https://www.figma.com/design/vHP9l3QZucVlldDiDtk5RE/x?node-id=414-42531) | Logo usage, typography roles, **agritech icons**, component states | Aturan ikon, button states, copy ID |
| [414:42945](https://www.figma.com/design/vHP9l3QZucVlldDiDtk5RE/x?node-id=414-42945) | (UI kit / layar — cek frame sibling di file) | Shell, kartu, form |
| [414:43294](https://www.figma.com/design/vHP9l3QZucVlldDiDtk5RE/x?node-id=414-43294) | Komponen / pattern | Sheet, dialog, tabel |
| [280:41389](https://www.figma.com/design/vHP9l3QZucVlldDiDtk5RE/x?node-id=280-41389) | Layout / grid | Bento owner & petani |
| [372:26506](https://www.figma.com/design/vHP9l3QZucVlldDiDtk5RE/x?node-id=372-26506) | Modul / alur | Nav owner keuangan |
| [372:26131](https://www.figma.com/design/vHP9l3QZucVlldDiDtk5RE/x?node-id=372-26131) | Detail / master | Varietas, SO, jurnal |

**Prinsip merge:** ambil **struktur & hierarki** dari Figma; jangan salin eyebrow/marketing, glass, atau emoji icon pack mentah.

---

## 2. Brand & aset (logo → favicon → cetak)

### 2.1 File repo (sudah diekspor dari Figma Logo Design)

| Aset | Path | Pemakaian |
|------|------|-----------|
| Emblem terang | `public/brand/kokonus-emblem-light.svg` | Sidebar terang, login, PDF header (fase 2 raster) |
| Emblem gelap | `public/brand/kokonus-emblem-dark.svg` | Sidebar dark / hero Monex |
| Komponen | `components/kokonus-brand-mark.tsx` | `<Image>` emblem |

**Belum di repo (ambil dari Figma):** wordmark horizontal (`414:42620`, `388:73584`), sidebar header vector (`604:21303`), PNG 512 untuk PWA.

### 2.2 Favicon & tab browser

| Permukaan | Spesifikasi | Status |
|-----------|-------------|--------|
| `app/icon.tsx` | 32×32, Primary Green `#1a3d2e`, aksen lime pada daun | **Draft** (vektor sederhana) |
| `app/apple-icon.tsx` | 180×180, emblem penuh | Backlog |
| `manifest` / PWA | `icons[]` 192 + 512 dari emblem PNG | Backlog |
| OG / share | `opengraph-image` dengan lockup brand | Backlog |

### 2.3 Kopsurat & ekspor PDF/XLSX

| Elemen Figma Cover | Implementasi |
|--------------------|--------------|
| Brand lockup | `lib/export-brand.ts` + header jsPDF di `lib/pdf-table-document.ts` |
| Judul dokumen | `ExportDocument.title` (sudah ada) |
| Subtitle / filter | `subtitleLines` |
| Footer kredit | Backlog: footer setiap halaman PDF (`EXPORT_BRAND.footerLeft/Right`) |
| Logo raster di PDF | Backlog: embed PNG emblem (jsPDF `addImage`) — SVG perlu konversi build-time |

Semua route `/api/export/*` memakai `pdfBufferFromExportDocument` atau `pdf-simple.ts` — satu titik injeksi brand.

---

## 3. Ikonografi

### 3.1 Aturan (Style guide + Lime)

| Lapisan | Set | Aturan |
|---------|-----|--------|
| Navigasi & aksi UI | Carbon via `@/components/lime/icon` (tema Lime) / Lucide (wireframe sementara) | Satu set per tema; jangan campur di satu baris |
| Agritech / varietas | **`components/icons/agritech-glyphs.tsx`** — garis monokrom | Mirip Figma Lettuce/Basil/Tomato; **bukan** emoji [shadcn vegetable pack](https://www.shadcn.io/icons/tag/vegetable) |
| shadcn.io vegetable | Kurasi 6–8 outline (mis. `icon-park-outline-carrot`, `game-icons-lettuce`) | Instal via CLI hanya jika bentuk cocok wireframe; hindari Fluent Emoji flat |

### 3.2 Varietas sayur (preview implementasi)

| Komponen | Perilaku |
|----------|----------|
| `lib/varietas-glyph.ts` | Map nama → `lettuce \| tomato \| carrot \| pepper \| basil \| leaf` |
| `components/varietas-glyph.tsx` | Mark bulat 32px di tabel (ListIcon-style, bukan tile besar) |
| `components/varietas-daftar.tsx` | Kolom mark + nama |

**Langkah berikut:** halaman detail varietas (`varietas-detail.tsx`), kartu bento petani, dan field pilih varietas di siklus — glyph yang sama.

---

## 4. Audit komponen UI (atom → organisme)

Legenda: **WF** wireframe `@/components/ui/*` · **LM** `@/components/lime/*` · **FG** selaras Figma · **Gap** belum selaras

### 4.1 Atom

| Komponen | Lokasi | WF | LM | FG | Catatan |
|----------|--------|----|----|-----|---------|
| Button | `ui/button`, `lime/ui/button` | ✓ | ✓ | states di Style guide | Satu primary per view (Lime glow) |
| Input, Textarea, Select | `ui/*` | ✓ | partial | ✓ | Field Lime belum diinstal |
| Badge / chip | `ui/badge` | ✓ | — | status chip Figma | |
| Amount / angka | `formatRupiah`, `lime/ui/amount` | ✓ | ✓ | Manrope di Lime | IDR adapter untuk `Amount` backlog |

### 4.2 Molekul

| Komponen | Lokasi | Gap utama |
|----------|--------|-----------|
| FormSheet | `form-sheet.tsx` | Lebar sheet, header, tombol tutup — samakan padding Figma |
| DetailSheetFrame | `detail-sheet-frame.tsx` | Master-detail invoice pattern |
| ConfirmDialog | `confirm-dialog.tsx` | AlertDialog Lime |
| DataTable | `data-table.tsx` | Typography + density Style guide |
| MetricCards | `metric-cards.tsx` | Kurangi pemakaian (anti-stat-cards); ganti Balance/List |
| ChartCard | `chart-card.tsx` | Monokrom wireframe OK |

### 4.3 Overlay

| Pola | Pemakaian | FG |
|------|-----------|-----|
| Sheet kanan | Form varietas, SO, rekening | ✓ |
| Dialog | Konfirmasi, ekspor lembar | ✓ |
| Popover | Notifikasi | partial |

### 4.4 Layout & shell

| Komponen | FG | Tindakan |
|----------|-----|----------|
| `AppShellLayout` + `AppSidebar` | Brand lockup | Emblem Figma **sudah** di sidebar |
| `CrudPageLayout` | Header + satu aksi | Samakan tinggi header 56px |
| `OwnerKeuanganDashboardLayout` | Monex + LeaseFlow | Lihat referensi layout |
| `DashboardBento` | Bento 6 col | Petani beranda |

### 4.5 Halaman prioritas migrasi Lime / Figma

1. `/owner/varietas`, `/petani/varietas`, `/admin/varietas` — glyph + tabel
2. `/owner/keuangan` — layout sudah baru
3. `/login`, `/pengaturan` — brand + tema
4. Ekspor laporan — kopsurat penuh
5. Sisa CRUD — swap Sheet/Field bertahap

---

## 5. Tipografi & warna (ringkas)

| Role Figma | App |
|------------|-----|
| DM Sans | Prosa (Lime + `next/font`) |
| Manrope | Angka tabular |
| Primary Green / Accent Lime | Lime `--accent`; wireframe hitam-putih |
| Inter | Body wireframe default |

---

## 6. Responsive

| Breakpoint | Aturan |
|------------|--------|
| 390px | Satu kolom; pipeline horizontal scroll; touch 44px |
| 768px | Sidebar → sheet menu (sudah) |
| 1280px | Bento 6 kolom; tabel lebar `max-w-5xl` |

---

## 7. Backlog implementasi (urutan PO)

| # | Item | Verifikasi |
|---|------|------------|
| 1 | Wordmark SVG + login header | Visual vs Figma 388:73584 |
| 2 | PDF footer + logo raster | Unduh jurnal PDF |
| 3 | Apple touch + manifest icons | Lighthouse PWA |
| 4 | Instal Lime Table, Field, Dialog; hook varietas | Lint Lime |
| 5 | Ganti Lucide nav → Carbon di scope `.lime` | Satu tema aktif |
| 6 | Kurasi 8 ikon shadcn vegetable → `agritech-glyphs` v2 | Review varietas demo seed |
| 7 | Token warna Figma → `docs/design/token-map-figma-lime.md` | PO sign-off |

---

## 8. Checklist sebelum rilis visual

- [ ] Emblem hanya dari `public/brand/` (bukan Lucide Leaf)
- [ ] Varietas: glyph monokrom, bukan emoji warna
- [ ] Satu aksi primary per layar
- [ ] PDF: nama legal + tagline di header
- [ ] Favicon tidak lagi huruf «K» generik (target: emblem final)
- [ ] Tema Lime: DM Sans + Manrope angka

*Terakhir diperbarui: 2026-10-16 — sesi audit UI / Figma / varietas.*
