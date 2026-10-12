# Audit UI: 91 halaman × Apple HIG × ui-ringkas × humanizer

Proyek Kokonus Farm (Next.js 14, shadcn, sidebar desktop + sheet mobile). **91 file** `app/**/page.tsx`, **~88 rute logis** (intercept `@detail` menduplikasi layar detail).

Referensi skill: `vendor/agents/apple-design-skill/SKILL.md`, `references/cross-platform.md`, `references/hig/{accessibility,layout,typography,color,writing,sidebars,sheets,entering-data,feedback}.md`. Copy: `docs/skills/kokonus/ui-ringkas/SKILL.md`.

## Ringkasan

**Rating: Good (perlu perbaikan Medium terpusat, tanpa Critical blokir rilis).**

Tesis desain: aplikasi operasional hidroponik berbasis peran (Owner / Admin / Petani), tipografi netral hitam-putih, navigasi sidebar berkelompok, CRUD daftar + detail drawer. Cocok dengan prinsip **Simplicity** dan **Familiarity** HIG untuk alat web desktop; belum sepenuhnya memenuhi target **Flexibility** (teks kecil, zoom sistem) dan **Craft** (eyebrow berulang, ikon duplikat).

Mayoritas halaman sudah selaras dengan **ui-ringkas**: tanpa `flowSteps`, hampir tanpa `description` di header CRUD, label Indonesia, kode internal di detail. Gap utama bukan per halaman, melainkan **komponen bersama** (sidebar, badge section, ukuran tap, mode gelap).

---

## Inventaris per kelompok layar

| Kelompok | Jumlah file | Peran | Pola UI | Keselarasan ui-ringkas | Temuan HIG utama |
|----------|-------------|-------|---------|------------------------|------------------|
| Hub beranda | 4 | `/`, `/admin`, `/owner`, `/petani` | `MetricCards`, `ChartCard`, `PageSection` | Judul cukup; metrik monochrome | `layout.md`: hierarki jelas; grafik grayscale = craft konsisten |
| Daftar CRUD | ~35 | inventaris, varietas, jurnal, penjualan, … | `CrudPageLayout` + tabel | Daftar tanpa kode; satu aksi header | `lists-and-tables.md`: baris klik ke detail OK |
| Detail penuh + intercept | ~34 | `[id]`, `@detail/(.)[id]` | `DetailLayout`, sheet parallel route | Kode di `detail-kode-strip` | `sheets.md`: drawer mobile ≈ sheet; perlu fokus keyboard |
| Form khusus | 4 | `*/baru`, `jurnal/koreksi` | Section + form | Copy ID | `entering-data.md`: validasi via toast OK |
| Keuangan / laporan | ~8 | arus-kas, evaluasi, laporan, akuntansi, piutang | Hub + tabel panjang | HPP/jurnal bahasa sederhana | `charting-data.md`: chart monochrome |
| Auth | 4 | login, lupa/ganti sandi, akses ditolak | Card centered | Pesan error jelas | `onboarding.md`: login tanpa iklan OK |
| Pengaturan | 1 | `/pengaturan` | Tab notifikasi & akun | ID | `settings.md`: pengaturan terpisah OK |

Intercept (`@detail`) dan halaman `[id]` **membagikan komponen detail yang sama**; perbaikan di `components/*-detail*.tsx` menyebar ke semua rute terkait.

---

## Delapan prinsip Apple (filter cepat)

| Prinsip | Kokonus hari ini |
|---------|------------------|
| Purpose | Setiap halaman CRUD satu tugas (daftar / tambah / detail). |
| Agency | Petani: siklus, pengiriman; Owner: koreksi jurnal terpisah. |
| Responsibility | Tutup buku, RBAC, akses ditolak. |
| Familiarity | Sidebar + header = pola admin web, bukan tab bar mobile native. |
| Flexibility | Responsif `md:`; teks kecil di sidebar/badge belum aman untuk zoom 200%. |
| Simplicity | Tanpa gradient/blur ( `check-banned-ui` ); copy CRUD ringkas. |
| Craft | Monochrome chart, Lucide konsisten sebagian; eyebrow grup berulang. |
| Delight | Minimal (sengaja); cocok domain operasional, bukan konsumen. |

---

## Temuan lintas 91 halaman (prioritas skill)

### Critical

Tidak ada blocker aksesibilitas terukur di kode (kontras `muted-foreground` ~4.5:1+ pada putih; fokus `focus-visible:outline` di `Button`). **Verifikasi runtime** (zoom 200%, VoiceOver/NVDA) tetap wajib sebelum klaim WCAG.

### High

1. **Ukuran teks di bawah minimum HIG untuk pengguna 40+**  
   - **What:** Badge section `text-[10px]` (`page-section.tsx`); label peran sidebar `text-[11px]` (`app-sidebar.tsx`).  
   - **Why:** `typography.md` / `accessibility.md`: teks UI mobile default 17 pt; web admin aman ≥12–14 px untuk metadata, ≥16 px untuk isi.  
   - **Fix:** Badge `text-xs` (12px), hilangkan uppercase dekoratif; sidebar metadata `text-xs` minimum; pertimbangkan `text-sm` pada link nav.

2. **Target sentuh di bawah 44 px (mobile)**  
   - **What:** `Button` default & `icon` = `h-10` (40px); beberapa link nav `min-h-9`.  
   - **Why:** `cross-platform.md`: 44 pt target mobile.  
   - **Fix:** Primary header pakai `size="lg"` atau `className="h-11"` (sudah di sebagian halaman); nav `min-h-11` di mobile sheet.

### Medium

3. **Eyebrow grup hampir di semua halaman modul** (~51 file): "Keuangan", "Produksi & stok" — redundan dengan sidebar (`writing.md`: satu pekerjaan per elemen). **Fix:** hapus `eyebrow` kecuali auth/landing; andalkan sidebar + judul H1.

4. **Mode gelap:** token `.dark` ada, **tanpa toggle** (`dark-mode.md`: ikuti sistem). **Fix:** `prefers-color-scheme` di root layout atau toggle di pengaturan.

5. **Navigasi Owner padat** (~18 item): `sidebars.md` — pertimbangkan search field atau hub "Modul keuangan" sebagai satu pintu (sebagian sudah ada di `/owner/keuangan`).

6. **Ikon duplikat:** `Wallet` untuk modul keuangan dan rekening (`icons.md`). **Fix:** `Landmark` / `CreditCard` untuk rekening.

7. **Login masih punya `description` + coachmark** (`ui-ringkas` §1–2): acceptable untuk auth; ringkas coachmark jika PO tidak minta onboarding.

8. **`listDescription` dinamis** hanya di `admin/jurnal/page.tsx` — pastikan satu kalimat, bukan paragraf.

### Low

9. Badge internal masih memakai prop `"Read"|"Create"` (dev vocabulary); label layar sudah "Lihat"/"Buat" — OK untuk pengguna.

10. `--radius: 0rem`: craft tajam konsisten; bukan pelanggaran HIG.

---

## Matriks per peran (semua rute `page.tsx`)

### Admin (36 file)

Beranda, inventaris, active-pack, infrastruktur, varietas, harvest, susut, stok-rendah, keuangan, pelanggan, penjualan (+ piutang, baru, invoice), jurnal (+ baru), akuntansi, akun, biaya, petani — masing-masing list/detail/intercept. **Selaras ui-ringkas.** Perbaikan: eyebrow, tap target tombol "Tambah" di header.

### Owner (32 file)

Mirip admin + arus-kas, evaluasi, laporan, produksi, kegagalan-susut, prive, rekening, pengguna, koreksi jurnal. **Beban nav** paling tinggi; andalkan hub keuangan.

### Petani (18 file)

Beranda monitor, siklus (+ baru), active-pack, inventaris, varietas, pengiriman, stok-rendah. **Paling dekat pola mobile**; prioritaskan sheet menu + ukuran tap di lapangan.

### Publik / shared (5 file)

`/`, login, lupa/ganti sandi, akses ditolak, pengaturan, notifikasi/buka.

---

## Urutan penyesuaian (improvement mode Apple skill)

1. **Aksesibilitas (komponen):** `page-section.tsx`, `app-sidebar.tsx`, `button.tsx` default height mobile.  
2. **Konvensi web:** hapus eyebrow massal (skrip atau grep); perbaiki ikon nav.  
3. **Craft:** pertahankan monochrome chart; satu aksen hijau hanya di logo (sudah).  
4. **Copy:** jalankan humanizer pada teks baru di `lib/ui-copy.ts` dan notifikasi; hindari jargon EN di UI.  
5. **Verifikasi:** Playwright smoke + uji manual zoom 200% pada 3 peran × 3 halaman representatif (beranda, daftar, detail).

---

## Halaman representatif (audit mendalam)

| Halaman | Thesis layar | What works | Perbaikan utama |
|---------|--------------|------------|-----------------|
| `/owner` | Ringkasan keuangan 6 bulan | MetricCards + chart monochrome | Section badge kecil |
| `/admin/jurnal` | Daftar + filter catatan | Filter `listDescription` singkat | Tombol aksi `h-11` seragam |
| `/petani/siklus/[id]` | Timeline produksi | Section tersegmentasi | Timeline `text-xs` → `text-sm` di komponen |
| `/login` | Masuk cepat | Error in-form + toast | Coachmark opsional PO |
| `/admin/penjualan/[id]` | Pesanan + HPP | Detail terpisah invoice | Copy sales-order panjang di tabel |

---

## Checklist "pas" skill per halaman (self-service)

Untuk setiap `page.tsx` baru atau refactor:

- [ ] Judul H1 satu baris; tanpa `description` kecuali auth/onboarding disetujui PO  
- [ ] Maksimal satu tombol utama `h-11` di header  
- [ ] Tabel: label manusia saja; kode hanya di detail  
- [ ] Section: judul Indonesia; badge ≥12 px  
- [ ] Uji tab keyboard pada form dan sheet detail  
- [ ] Prosa UI lewat humanizer jika >1 kalimat  

---

## Lampiran: daftar file `page.tsx`

Lihat output repositori:

```bash
find app -name page.tsx | sort
```

Total: **91** path (commit saat audit **2026-10-13**).

## Implementasi design system (branch `chore/design-system-monochrome-flow`)

- Eyebrow dihapus di seluruh `app/` + detail (`scripts/strip-page-eyebrows.py`).
- Tanpa shadow/gradient (`check-banned-ui` lulus); popover/nav pakai border saja.
- Tombol default & icon `h-11`; spacing layout seragam `gap-6`.
- API `PageHeader`, `CrudPageLayout`, `DetailLayout` tanpa eyebrow.

Terakhir diperbarui: **2026-10-13**.
