# Konteks proyek — KOKONUS FARM

## Tujuan yang bertahan

- Digitalisasi tata kelola biaya produksi hidroponik Kokonus Farm (Pekanbaru, rakit apung, kapasitas 1.920 lubang tanam) melalui website.
- Menyatukan data budidaya, kegagalan/susut, biaya, penjualan, dan laporan keuangan agar HPP per lubang, per kilogram, dan per pack dapat dihitung, lalu menjadi dasar harga jual dan evaluasi laba.
- Mengembangkan dengan **Agile Scrum** (5 sprint × 2 minggu, 6 epic) dipadukan **User-Centered Design** (empathize → define → ideate → prototype → test).
- Peran pengguna nyata: **Owner** (Koko Nuswantoro), **Admin**, **Petani/Pekerja** (Marzuki, Darusman, Widi Antoni, Hudzaifah Mutahajjid).

## Persona Owner (fakta, bukan naskah)

Fakta yang dipakai di PRD dan naskah UCD. Cerita lengkap: `skenario-narasi-ucd-agile.md`.

| | |
| --- | --- |
| Nama | Koko Nuswantoro |
| Peran sistem | Owner Kokonus Farm |
| Latar kerja | Pensiunan BUMN Adhi Karya; bekerja di Adhi Karya sejak 1992 |
| Keahlian akuntansi lapangan | Pernah cost control di departemen keuangan konstruksi; terbiasa Excel |
| Keahlian budidaya | Delapan tahun terakhir belajar hidroponik dengan berbagai macam instalasi |
| Usaha | Greenhouse rakit apung Pekanbaru, kapasitas 1.920 lubang tanam |

## Batasan

- Lingkup produk v1: requirement, design, development, testing. **Pemeliharaan jangka panjang di luar lingkup rilis ini.**
- IoT/sensor lingkungan **tidak** termasuk.
- File format naskah akademik dan workbook kerangka **hanya dibaca**, tidak diubah di repo produk.
- Google Doc studi kasus **hanya dibaca**, tidak diedit dari repo ini.
- Website belum diimplementasi pada slice ini; yang diantar adalah PRD Agile + folder repositori.

## Hierarki sumber jika bentrok

1. Workbook *Kebun Hijau — Agile & UCD Framework v1.0.0* → bentuk proses, epic, sprint, UCD, DoD, RBAC, API.
2. Figma `x` (fileKey `vHP9l3QZucVlldDiDtk5RE`) → layar, alur, peran, state UI.
3. Google Doc studi kasus → konteks lapangan, rumusan, batasan, HPP rakit apung.

Domain bisnis memakai nama **Kokonus Farm** dan metode **rakit apung**, bukan nama produk contoh “Kebun Hijau” / DWC pada workbook, kecuali sebagai analogi kerangka.

## Sumber (read-only)

| Sumber | Lokasi | Perlakuan |
| --- | --- | --- |
| Figma (desain & arsitektur) | https://www.figma.com/design/vHP9l3QZucVlldDiDtk5RE/x?node-id=262-10298 | Inspect saja |
| Google Doc (studi kasus) | https://docs.google.com/document/d/1d5XGFNGALq00PRY-5H8FOd96UrXjW5aYcrNXScwWDN0/edit?tab=t.0 | Baca saja, jangan sunting |
| Format naskah SAPIK | `FORMAT_SKRIPSI_SAPIK.docx` (tidak disalin ke repo ini) | Referensi eksternal; repo fokus produk |
| Kerangka Agile & UCD | `Kebun-Hijau-Agile-UCD-Framework-v1.0.0.xlsx` (tidak disalin ke repo ini) | Acuan backlog/sprint/UCD; jangan ubah xlsx |

## Deliverable terkait

- PRD Agile: `prd-agile-kokonus-farm.md`
- Naskah narasi UCD + Agile: `skenario-narasi-ucd-agile.md`
- Inventaris layar: `figma-flow-inventory.md`
