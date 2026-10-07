# Inventaris Figma — KOKONUS FARM

Sumber: https://www.figma.com/design/vHP9l3QZucVlldDiDtk5RE/x  
File key: `vHP9l3QZucVlldDiDtk5RE`. Node tautan tugas: halaman `Web ` (`262:10298`).  
Alat: `get_metadata` + `use_figma` (bukan `get_design_context`). Skill dimuat: `figma-use`, `figma-design-to-code`.

## Halaman (35)

| Page id | Nama | Isi relevan PRD |
| --- | --- | --- |
| 262:10295 | Cover | Cover “KOKONUS FARM”, bukan layar aplikasi |
| 262:10298 | Web  | **Sumber utama layar website** + section auth/owner/admin/petani + spec master data |
| 388:73510 | Logo Design | Brand, bukan alur |
| 388:73511 | Mascot Design | Brand |
| 0:1 | PlayGround | Duplikat section web lama |
| 263:15198 | Architecture  | Flow chart, DFD, UML |
| 262:10284 | Readme | Dokumentasi desain |
| 262:10285 | Changelog | Dokumentasi desain |
| 262:10292 | Style Guide | Tokens visual |
| 262:10281 | Design Tokens | Tokens |
| 262:10282 | Color System | Tokens |
| 262:10283 | Typography | Tokens |
| 262:10290 | Assets | Komponen dokumentasi |
| 372:24356 | Icon Design | Ikon |
| 262:10280 | Local Components | Atom–organism + finance + web patterns |
| 280:17173–17175 | Design Atom / Molecule / Organism | Library UI |
| 372:26131 | Finance Design Component | Komponen keuangan generik + hidroponik |
| 372:25154 | Foundation | States checklist |
| 262:10299 | Mobile | **Layar HP 390×844 per modul** |
| 262:10300 | Reference | Referensi |
| 262:10291 | Diagram | Context, hierarchy, activity, BAB 3/4 |
| 262:10296 / 262:10297 | Lo-Fi / Hi-Fi | **Kosong** |
| 372:22882 | Screen | **Kosong** |
| 262:10293 | -----Wireframes----- | **Kosong** |
| 372:22732 | Archive Dont Use | Archive |
| 388:41904 | TRASH | Library template |
| sisanya | pemisah `-----` | Kosong |

## Peran di papan Web

Section: `01 — Shared & Authentication Flow`, `02 — Owner Entity & Flow`, `03 — Admin Entity & Flow`, `04 — Petani Entity & Flow`.  
Frame ringkas: `FLOW — OWNER`, `FLOW — ADMIN`, `FLOW — PETANI`.

Section produk bernomor:

1. Auth & Login  
2. Dashboard Owner / Admin / Petani  
3. Varietas & Infrastruktur  
4. Produksi & Siklus  
5. Kegagalan & Biaya  
6. Penjualan & Pelanggan  
7. Evaluasi & Laporan  
8. Petani (master SDM)  
11. Flow Petani (RBAC)

## Layar web (frame 1920×1080, nama `web-*` / `petani-*`)

### Auth & global

- web-login, web-auth-invalid-credentials  
- web-forgot-password, web-otp-verification, web-reset-password  
- web-register-employee  
- web-global-access-denied, web-global-empty-state, web-global-error-state, web-global-loading-state  
- web-settings, web-settings-profil, web-settings-notifikasi, web-settings-role-management, web-settings-edit-matrix, web-settings-edit-dropdown-open  
- web-state-screens  

### Dashboard

- web-dashboard-Owner, web-dashboard-owner-default, web-dashboard-owner-collapse  
- web-dashboard-admin, web-dashboard-petani  

### Master varietas & infrastruktur

- web-varietas-list/detail/form + delete-modal  
- web-1-0-manajemen-varietas-asumsi, web-1-0a-empty-state  
- web-1-1-parameter-varietas, tambah/edit/hapus/mode hapus  
- web-1-2-parameter-infrastruktur, edit infrastruktur  
- web-1-3-aktivasi-nonaktifkan-varietas + konfirmasi  
- web-infrastruktur, web-kolam-list/form, web-greenhouse-form, web-lahan-form  
- Spec frames: `01 Varietas` … `08 Kamus input dan aturan`; `01 · Daftar varietas` … `13 · Peta flow & catatan`

### Produksi

- web-siklus-list/detail/form-edit/delete-modal  
- web-mulai-siklus, web-siklus-semai, web-siklus-pindah-kolam, web-siklus-panen, web-siklus-log-aktivitas  

### Kegagalan, biaya, HPP

- web-kegagalan, form, detail  
- web-hpp, web-hpp-detail  
- web-biaya-langsung-form, web-biaya-overhead-form, web-biaya-delete-modal  

### Penjualan

- web-penjualan-list/form/edit/invoice/cancel-modal, web-pesanan-detail  
- web-pelanggan-list/form  

### Evaluasi & laporan

- web-evaluasi, form, detail  
- web-laporan-laba-rugi, web-laporan-filter, web-laporan-export  

### Owner (keuangan kerangka Agile)

- web-owner-coa-readonly, journal-list-filter, cost-breakdown-drilldown  
- web-owner-inventory-list, sales-order-list  
- web-owner-report-balance-sheet, income-statement, export-report-dialog  
- web-owner-prive-form, web-owner-user-management  

### Admin (akuntansi / inventaris / harvest / SO)

- COA list/form/deactivate  
- journal list/form/approval/reject  
- harvest-report list/review-hpp/reject, hpp-override  
- inventory list/item-form/movement-form/history, active-pack list/form, low-stock  
- sales-order-confirm, delivery list/detail, export-progress  

### Petani (operasi + RBAC flow)

- web-Petani / web-petani + form/detail/delete  
- petani-01-dashboard … petani-08-histori-progress  
- web-petani-tugas, log-form, inventory, movement, active-pack, low-stock  
- web-petani-delivery-list/detail/status-confirm  

## Mobile (page `262:10299`, section `Mobile`)

1. Auth & Onboarding: splash-screen, onboarding-1..3, login-screen, forgot-password, otp-verification, reset-password, register-employee  
2. Dashboard & Navigasi: dashboard-Owner/admin/petani, notification-center, profile-settings, edit-profile, change-password, logout-confirmation, about-app  
3. Varietas & Infrastruktur: varietas-list/detail/form, kolam-list/detail, greenhouse-list/detail, Petani-list/detail  
4. Produksi & Siklus: siklus-list, mulai-siklus, semai-benih, monitor-pertumbuhan, pindah-kolam, panen-sortasi, tambal-susulan, siklus-detail, siklus-timeline  
5. Kegagalan, Biaya & HPP: log-kegagalan-list, catat-kegagalan, kegagalan-detail, biaya-langsung, biaya-overhead, hpp-summary, alokasi-overhead, klasifikasi-susut, lahan-detail  
6. Penjualan: penjualan-list, pesanan-baru, pesanan-detail, packing-distribusi, catat-pendapatan, riwayat-penjualan, pelanggan-list/detail/form  
7. Evaluasi & Laporan: (section ada; metadata terpotong di tool; cek child section `7. Evaluasi & Laporan Keuangan`)

## Architecture & Diagram

- Architecture: Flow CHART, Data Flow Diagram, UML  
- Diagram: Context Diagram, Hierarchy Chart — Sistem Manajemen Usaha Hidroponik, activity diagram, BAB 3, BAB 4  
- Web page juga memuat `Flow Chart 1.0 : Manajemen Varietas & Asumsi`, `Entity Relation Diagram`, `Hirearchy Cart` (typo hierarchy)

## Celah / gap

1. Halaman Lo-Fi, Hi-Fi, Screen, Wireframes **kosong** — hi-fi ada di page `Web ` dan `Mobile`, bukan di slot bernama Hi-Fi.  
2. Nama kerangka workbook (“Kebun Hijau”, DWC, persona Budi/Siti/Agus) **tidak** dipakai di Figma; Figma memakai Kokonus Farm, rakit apung, Owner/Admin/Petani.  
3. Figma punya modul **varietas/asumsi, infrastruktur, kegagalan/susut, evaluasi, packing, forgot/OTP, settings** yang tidak diuraikan sebagai 20 US workbook; PRD memetakannya ke 6 epic yang sama.  
4. Komponen Finance Design memuat layar generik (kripto, trading, pajak) — **bukan alur produk**; jangan di-backlog.  
5. PlayGround menduplikasi section web; pakai page `Web ` sebagai sumber kebenaran layar.  
6. Beberapa frame nama `web-*` muncul dua kali (kemungkinan instance/copy di PlayGround).  
7. Register di mobile bernama `register-employee`; Google Doc: Admin yang mendaftarkan petani, bukan self-signup publik.  
8. Typo layer: `Hirearchy Cart`, spasi di `Web `.  
9. Cover hanya 1 section; tidak ada IA lengkap di Cover.  
10. Status sprint “Selesai” di xlsx adalah status contoh Kebun Hijau — **bukan** status kode Kokonus Farm (Google Doc: status kode diisi setelah modul dikode).
