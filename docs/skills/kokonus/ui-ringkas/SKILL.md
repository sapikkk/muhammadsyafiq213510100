# UI ringkas (Kokonus)

Teks di layar (`app/`, `components/`): bahasa Indonesia, kalimat pendek, tanpa jargon Inggris di UI.

## Prinsip

1. **Judul cukup.** Hindari paragraf di bawah judul halaman dan di bawah judul tabel daftar.
2. **Panduan opsional.** Ikon `?` saja di **bawah** halaman (`PageGuideFooter` / AppShell); teks panjang hanya di dialog (`lib/coach-meta.ts`, `lib/coach-tips.ts`). Jangan tombol “Panduan” di header.
3. **Daftar = aksi.** Tabel & dropdown: **hanya label manusia** (nama, lokasi, varietas). **Kode internal tidak di daftar** — hanya di **halaman detail** lewat `components/detail-kode-strip.tsx` (blok terpisah, bukan di bawah judul baris). Dropdown: `lib/inventaris-ui-labels.ts` (nama saja). Produksi: `lib/produksi-ui-labels.ts`. Jurnal detail: nama akun di tabel; kode akun di section «Kode akun (referensi)». Catat uang: `lib/smart-jurnal-catalog.ts` tanpa angka COA.
4. **Tipografi tabel.** Teks panjang: `lib/table-cell-text.ts` (`truncate`, `text-sm`, `title` untuk hover).
5. **Metrik & grafik keuangan.** Angka pakai `MetricCards` (kartu kecil, grid 2–3 kolom). Grafik di `ChartCard`, tinggi ~`h-52`, warna `lib/chart-monochrome.ts` (grayscale).
6. **Ikon.** Pakai Lucide (sudah di proyek, MIT): peta di `lib/nav-icons.ts` + `lib/nav-items.ts`. Keuangan: `Wallet`, `Banknote`, `Coins`, `Landmark`. Tanaman: `Sprout`, `LeafyGreen`, `LandPlot`. Jangan duplikat `Layers` untuk semua menu.
7. **Tombol.** Satu aksi utama per header (`Button` `h-11`); sekunder `variant="outline"`.
6. **Prosa.** Saat menulis ulang copy, pakai humanizer + pola [anti-slop-writing](https://github.com/adenaufal/anti-slop-writing) (Bahasa Indonesia).

## Atom → organism (design system)

| Lapisan | Contoh |
|--------|--------|
| Token | Tailwind + shadcn (`text-muted-foreground`, `border-border`) |
| Atom | `Button`, `Badge`, `Input` |
| Molecule | `PageSection`, `PageHeaderRow`, `DataTable` |
| Organism | `CrudPageLayout`, `FinanceHubPanel`, `AkunTree` |

Jangan menambah lapisan layout baru untuk copy; ubah props `title` / hapus `description`.

## Pembersihan massal

```bash
python3 scripts/strip-crud-page-prose.py
```

Mengosongkan `description`, `flowSteps`, `listDescription` pada `CrudPageLayout` di `app/**/page.tsx` (kecuali daftar pengecualian di skrip).
