# Referensi layout dashboard — analisis & prompt agent

**Perencanaan UI lengkap (Figma file `x`, brand, ikon varietas, audit komponen, favicon, kopsurat):** [`perencanaan-ui-figma-kokonus.md`](perencanaan-ui-figma-kokonus.md).

Dokumen ini merangkum referensi visual (farm SaaS, golf analytics, logistik, invoice Salesforce, CRM workspace, TaskLab, bento Oxelia, Monex, **LeaseFlow**) menjadi **satu arah layout** untuk Kokonus Farm. **Prioritas:** grid **bento** dan **kartu tidak biasa** (bukan deretan stat generik), tanpa meniru template Dribbble mentah.

## Ringkasan analisis

### Pola layout yang sama di hampir semua referensi

| Pola | Contoh di referensi | Cocok Kokonus? |
|------|---------------------|----------------|
| **Shell tetap:** sidebar kiri + header + area konten | My Farm, ArgoLogics, TaskLab, Monex | Ya — sudah dekat (`AppShell`, sidebar per peran) |
| **Grid bento** (kartu beda ukuran, bukan grid seragam) | Oxelia, TaskLab, Monex, My Farm | Ya — beranda petani sudah bento; perluas hati-hati |
| **Satu aksen kuat** (lime/kuning/hijau) untuk aksi & sorotan | Salesforce, Monex, Workspace, Oxelia | Ya di **tema Lime** (`--accent` satu); wireframe tetap monokrom |
| **Master–detail** (daftar kiri, detail kanan) | Salesforce Invoices | Ya untuk jurnal, SO, inventaris lebar |
| **Timeline / Gantt horizontal** | Oxelia, TaskLab | Ya untuk siklus tanam, tugas, Gantt docs (bukan chart library Lime) |
| **Konteks geo / peta besar** | My Farm, GOLFX, ArgoLogics | **Sebagian** — monitor kolam/diagram sudah ada; jangan peta dekoratif penuh layar tanpa data |
| **Glassmorphism / blur / dark neon** | GOLFX, TaskLab | **Tidak** — bentrok Lime (`anti-slop-no-decoration`) & wireframe |
| **Baris 4 kartu metrik identik** | My Farm (Total Plots, Crops, …) | **Hindari** — Lime `anti-slop-no-stat-cards`; ui-ringkas: metrik kecil 2–3 kolom, bukan hero stat |
| **Banyak warna status (pink/kuning/biru chart)** | GOLFX, ArgoLogics | Wireframe: **monokrom** (`chart-monochrome.ts`); Lime: status token saja |
| **Split dark atas / light bawah** | Monex | Opsional satu layar keuangan owner; jangan jadi default seluruh app |

### Map referensi → produk Kokonus

| Referensi | Ambil | Buang |
|-----------|-------|-------|
| **My Farm** | Sidebar icon, cuaca + tanah + tugas dalam bento, foto aktivitas nyata | 4 stat card sama besar; peta dominan tanpa aksi |
| **GOLFX** | Satu fokus per layar, data di atas konteks visual | Dark glass, neon penuh layar, pill nav generik |
| **ArgoLogics** | Map + panel bawah tiga kolom; driver/truk = analog pengiriman | Mini-KPI 2×2 yang semua teriak |
| **Salesforce Invoices** | Pill nav modul, filter bar, list + detail, **satu** tombol lime | Brand Salesforce; terlalu banyak glass |
| **Workspace CRM** | Timeline rapat di header, lead cards horizontal, satu kartu aktif hijau | KPI Deals/Won/Lost besar di atas (stat row) |
| **TaskLab / Oxelia bento** | Satu kartu hero lime, roadmap horizontal, meeting strip | Blur background, glass panel |
| **Monex** | Zona gelap untuk saldo + chart, zona terang untuk transaksi | Accent kuning (bukan lime); bubble chart hiasan |
| **LeaseFlow** | **Bento penuh**, pipeline horizontal kartu aneh, 3 kolom list bawah, **satu KPI pakai aksen penuh** | Enam metrik kotak identik (reduksi ke 4–5 + 1 sorot); domain properti |

### LeaseFlow — bento & kartu tidak biasa (prioritas layout)

Referensi: dashboard properti **LeaseFlow** (sidebar pill hitam, header sapaan + search + satu CTA hitam).

**Yang kita ambil (struktur, bukan copy leasing):**

1. **Grid bento vertikal** — tiga band lebar, jarak lega (`gap-4`–`gap-6`), semua sudut `rounded-panel` (Lime) atau `0` (wireframe):
   - **Band atas:** strip metrik **kecil** (bukan hero). Satu sel saja pakai fill aksen penuh (conversion → analog: *persen panen sukses*, *SO lunas*, *kolam on-track*). Sisanya `bg-surface` / kartu putih wireframe — angka `text-2xl` max, trend kecil di samping, **bukan** enam kotak identik semua teriak.
   - **Band tengah (signature):** **Pipeline horizontal** 5–7 tahap — kartu **tidak biasa**:
     - Label tahap = pill di kiri atas (`Badge` / chip).
     - Isi tengah = **visual hatch** (wireframe: `repeating-linear-gradient` abu; Lime: `--accent-wash` + garis `--line-strong`, bukan chart library).
     - Bawah = angka besar **jumlah di tahap itu** (lead count → *siklus di fase X*, *SO status Y*, *tugas open*).
     - Tahap **selesai** (Leased): kartu **invert** (`bg-ink` / hitam wireframe, teks terang) + bar progress aksen di dasar — satu-satunya kartu gelap di baris.
     - Panah atau gap saja antar tahap; scroll horizontal di mobile (`overflow-x-auto`, snap).
   - **Band bawah:** **3 kolom bento** (1:1:1 desktop, stack mobile):
     - Kolom A: jadwal hari ini (waktu + nama + status pill).
     - Kolom B: butuh tindakan / review (snippet + tombol sekunder per baris).
     - Kolom C: stack 2–3 sub-kartu tipis (missing info, jatuh tempo, follow-up) — tinggi tidak seragam.

2. **Kartu sidebar opsional** — blok toggle (AI / Smart Jurnal) di nav: satu kartu rounded dengan switch, **bukan** icon tile dekoratif.

3. **Pill & status** — tag status pakai warna token (`success-tint`, `warn-tint`), bukan palet rainbow.

**Map ke Kokonus:**

| LeaseFlow | Kokonus |
|-----------|---------|
| Leasing pipeline | Siklus produksi (semai → transplant → panen) atau alur SO (draft → kirim → lunas) |
| Today's tours | Tugas / monitor kolam / pengiriman hari ini |
| AI conversations | Smart Jurnal / entri perlu review |
| Applications missing docs | Stok rendah, COA belum lengkap, jurnal draft |
| Conversion rate (kartu kuning) | **Satu** metrik pilihan PO per layar (mis. HPP bulan ini, % kolam aman) |

**Lime vs wireframe untuk kartu aneh:**

- Wireframe: hatch monokrom, invert tahap akhir = fill hitam + border tegas, radius 0.
- Lime: `--accent-wash` / hatch, invert = `--ink`, **satu** glow hanya pada CTA header (`View pipeline` → *Lihat alur panen*), bukan glow di setiap kartu pipeline.

**Anti-pola (tetap wajib):** baris 6 KPI sama besar tanpa hierarki; chart pie di dalam setiap kartu pipeline; glass/blur; eyebrow "Overview" di atas bento.

### Kesimpulan desain untuk Kokonus

**Thesis layout:** *Satu layar = satu urutan kerja* — petani/owner melihat **langkah berikutnya**, **satu angka yang penting**, dan **daftar yang bisa ditindak**, bukan pameran metrik.

- **Wireframe (produksi):** bento monokrom, radius 0, grafik grayscale, satu tombol utama per header (ui-ringkas).
- **Lime (preview / fase berikut):** hangat putih-abu, **satu** aksi glow lime, kartu hanya untuk blok yang ditindak, `List` / `BillSchedule` / `Insight` alih-alih stat tiles.

---

## Prompt untuk agent / desainer (salin ke chat)

```text
Konteks: Kokonus Farm — web Next.js, pengguna 40+, bahasa Indonesia di UI. Dua tema: (1) wireframe lo-fi default monokrom radius 0; (2) Lime preview design.how — warm grey, satu aksen #e4f222, komponen @/components/lime/*.

Referensi layout (gaya, bukan copy brand): dashboard **bento** — sidebar kiri, header sapaan + search + satu CTA primary, grid kartu **col-span bervariasi**. Prioritas visual: **LeaseFlow-style** — (1) strip metrik kecil dengan **tepat satu kartu aksen penuh** untuk KPI utama; (2) **baris pipeline horizontal** kartu tidak biasa: pill tahap, area hatch/striped di tengah, angka di bawah, tahap selesai kartu invert + bar aksen; (3) **tiga kolom** bawah: jadwal hari ini | perlu review | stack sub-kartu tindak lanjut. Lainnya: master-detail invoice (Salesforce), farm cuaca/tugas (My Farm), timeline siklus (Oxelia/TaskLab), split gelap saldo (Monex) — tanpa glass, tanpa dark neon full-page, tanpa enam kotak metrik identik tanpa sorotan.

Wajib patuhi:
- ui-ringkas: judul cukup, satu aksi utama per header, metrik pakai grid kecil 2–3 kolom bukan hero stat, grafik ChartCard + chart-monochrome di wireframe.
- Lime (jika tema lime): skill .agents/skills/lime — satu primary glow per view, token only, section h2 text-lg font-semibold, anti-slop (no eyebrow, no stat cards row, no icon tiles dekoratif, no gradient/blur).
- Apple HIG (web): touch 44px, kontras teks, keyboard focus, hierarchy jelas.

Struktur halaman target [ISI: mis. /petani beranda atau /owner keuangan]:
1. Header sticky: judul h1 satu, back jika perlu, ghost icon + satu Button primary (wireframe: hitam; lime: glow).
2. Main max-w-2xl (home/settings) atau max-w-5xl (tabel lebar), px-4 sm:px-6, section gap-8.
3. Bento grid (Tailwind grid, 12 kolom):
   - Baris 1: 4–6 sel metrik kecil (col-span-2 each); **1 sel** col-span-2 pakai bg aksen penuh (wireframe: bg-foreground text-background) untuk satu KPI pilihan.
   - Baris 2 (full width): pipeline 5–7 StageCard — komponen kustom: pill label, div hatch  min-h-24, angka tabular-nums, stage terakhir variant inverted + progress bar bawah.
   - Baris 3: col-span-4 + col-span-4 + col-span-4 — list jadwal | list review | column stack 2–3 mini-card.
   - Opsional di atas/bawah: cuaca/monitor kolam (col-span-5) + ringkasan satu kalimat (col-span-7).
   - Hindari Card di dalam Card; sub-kartu kolom C = sibling bordered panels, bukan nested shadow stack.
4. StageCard hatch CSS (wireframe): repeating-linear-gradient(-45deg, hsl(0 0% 90%) 0 4px, hsl(0 0% 96%) 4px 8px). Lime: token --accent-wash + --line border-field rounded-field.
5. Mobile: metrik 2 kolom; pipeline horizontal scroll snap; tiga kolom bawah jadi satu stack (pipeline → jadwal → review → follow-up).
6. Copy ID: kalimat pendek, sentence case, verb+objek pada tombol ("Lihat alur panen", bukan "Submit").

Deliverable: wireframe HTML/React dengan komponen existing (@/components/ui/* atau lime jika preview); jangan library chart baru di Lime preview kecuali sparkline Insight. Sebut asumsi data jika mock.

Jangan: glass blur, gradient background, emoji, Lorem, John Doe, uppercase tracking, sidebar aksi kritis di bottom, peta fullscreen dekoratif.
```

---

## Checklist review sebelum merge UI

- [ ] Satu aksi lime (atau primary wireframe) per layar?
- [ ] Metrik atas: maks 5–6 sel kecil + **tepat satu** sel aksen (bukan semua sama)?
- [ ] Pipeline: kartu tahap dengan hatch + invert di tahap akhir (bukan bar chart generik)?
- [ ] Bawah: 3 kolom bento (jadwal / review / stack tindak lanjut)?
- [ ] Grafik wireframe tetap monokrom?
- [ ] Heading navigasi pakai `<h2>` section, bukan label `text-xs` di atas judul?
- [ ] Layar 390px dan 1280px: grid tidak pecah, teks tidak `text-xs` untuk kalimat wajib dibaca?
- [ ] Tema wireframe unchanged saat toggle Lime mati?

---

## File terkait di repo

- `app/petani/page.tsx` — bento beranda petani (baseline)
- `docs/skills/kokonus/ui-ringkas/SKILL.md`
- `docs/skills/kokonus/lime-preview/SKILL.md`
- `.agents/skills/lime/SKILL.md` (lokal, gitignore — sync script)
