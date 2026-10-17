# Lime — persiapan ikon (varietas & agritech)

Status: **siap dipasang**, belum di-wire ke semua halaman wireframe.

## UI navigasi & aksi

- Satu pintu import: `@/components/lime/icon` (Carbon).
- Ukuran: 16 / 20 di baris, 24–32 empty state.
- Jangan import langsung dari `@carbon/icons-react` di `app/` atau `components/` (kecuali file `icon.tsx`).

## Varietas sayur

| Lapisan | Komponen | Kapan |
|---------|----------|--------|
| Wireframe | `VarietasGlyph` + `agritech-glyphs` | Tabel varietas hari ini |
| Lime | `VarietasListIcon` + `varietasCarbonIcon()` | Saat baris pakai `List` / tema Lime |

### Map kategori → Carbon

| Kategori (`varietasGlyphKey`) | Carbon |
|-------------------------------|--------|
| lettuce | `CropGrowth` |
| basil | `CropHealth` |
| tomato | `FruitBowl` |
| carrot | `Crop` |
| pepper | `CropHealth` |
| leaf (default) | `CropGrowth` |
| fallback | `AgricultureAnalytics` |

Logika nama: `lib/varietas-glyph.ts` (sama wireframe & Lime).

## Pasang nanti (contoh)

```tsx
import { List, ListItem } from "@/components/lime/ui/list";
import { VarietasListIcon } from "@/components/lime/varietas-list-icon";

<List>
  <ListItem
    leading={<VarietasListIcon nama={row.nama} />}
    title={row.nama}
    href={`/owner/varietas/${row.id}`}
  />
</List>
```

## Custom Figma agritech

Style guide Figma (lettuce / basil / tomato) belum di-inline ke Carbon. Jika PO minta bentuk persis Figma: tambah SVG monokrom di `components/lime/icons/` dan perluas `Icon` atau wrapper khusus — **setelah** audit Carbon vs Figma.

## shadcn.io vegetable

Kurasi outline monokrom saja; jangan emoji Fluent ke Lime. Lihat [`perencanaan-ui-figma-kokonus.md`](perencanaan-ui-figma-kokonus.md) §3.
