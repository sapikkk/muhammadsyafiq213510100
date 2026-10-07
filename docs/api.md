# Dokumentasi API

Semua endpoint JSON, butuh sesi NextAuth (cookie). Peran dicek di setiap handler. Jawaban error selalu `{ "error": "pesan" }` dengan status HTTP yang sesuai: 400 masukan salah, 401 belum masuk, 403 peran tidak berhak, 404 tidak ditemukan, 409 bentrok data unik.

## `/api/accounts` (US2.1, bagan akun)

| Method | Peran | Body | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Owner | - | 200, array akun terurut kode. Termasuk akun nonaktif, lihat field `aktif` |
| POST | Admin | `{ kode, nama, tipe, parentId? }` | 201, akun baru |
| PUT | Admin | `{ id, kode, nama, tipe, parentId? }` | 200, akun terbarui |
| PUT | Admin | `{ id, aktif: boolean }` | 200, soft delete atau aktifkan lagi |

Bentuk akun:

```json
{ "id": 40, "kode": "1600", "nama": "Perlengkapan Kebun", "tipe": "ASET", "parentId": 1, "aktif": true }
```

Aturan:

- `kode` angka saja, maksimal 20 digit, unik (409 jika bentrok).
- `tipe` salah satu `ASET`, `KEWAJIBAN`, `MODAL`, `PENDAPATAN`, `BEBAN`.
- `parentId` opsional. Induk harus ada, aktif, dan bertipe sama (400 jika tidak).
- Akun tidak bisa menjadi induk dirinya sendiri (400).
- Mengubah tipe akun yang punya anak bertipe lain ditolak (400).
- Nonaktifkan akun yang masih punya anak aktif ditolak (400). Nonaktif adalah soft delete; baris tetap ada untuk jurnal lama.

Contoh:

```bash
curl -b cookie.txt -H 'content-type: application/json' \
  -d '{"kode":"1600","nama":"Perlengkapan Kebun","tipe":"ASET","parentId":1}' \
  http://localhost:3000/api/accounts
```

## `/api/transactions` (US2.2, jurnal double-entry)

| Method | Peran | Body / query | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Owner | `?status=`, `?dari=`, `?sampai=` (YYYY-MM-DD) | 200, array jurnal dengan ringkasan baris |
| POST | Admin | `{ tanggal, keterangan, status: "DRAFT" \| "PENDING", baris: [{ akunId, debit, kredit }] }` | 201, jurnal baru |
| PUT | Admin | `{ id, aksi: "AJUKAN" }` | 200, status PENDING |
| PUT | Admin | `{ id, aksi: "SETUJUI" }` | 200, status APPROVED, saldo akun diperbarui |
| PUT | Admin | `{ id, aksi: "TOLAK", alasan }` | 200, status REJECTED |

Aturan:

- Minimal dua baris. Setiap baris: debit saja atau kredit saja, lebih dari nol.
- Total debit harus sama dengan total kredit (400 jika tidak).
- Hanya akun aktif tanpa anak (bukan akun induk x000) yang boleh diposting.
- Saldo field `Akun.saldo` hanya berubah saat `SETUJUI`, dalam transaksi DB.
- Normal balance: Aset dan Beban naik di debit; Kewajiban, Modal, Pendapatan naik di kredit.

Contoh pembelian tunai:

```bash
curl -b cookie.txt -H 'content-type: application/json' \
  -d '{"tanggal":"2026-10-08","keterangan":"Beli benih","status":"PENDING","baris":[{"akunId":9,"debit":"150000"},{"akunId":6,"kredit":"150000"}]}' \
  http://localhost:3000/api/transactions

curl -b cookie.txt -X PUT -H 'content-type: application/json' \
  -d '{"id":1,"aksi":"SETUJUI"}' \
  http://localhost:3000/api/transactions
```

## `/api/inventory` (US4.1, stok bahan)

| Method | Peran | Body | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Owner, Petani | - | 200, array item aktif dengan `stokSaatIni`, `stokMinimum`, `diBawahMinimum` |
| POST | Admin | `{ kode, nama, satuan, stokMinimum? }` | 201, item baru (stok awal 0) |

`satuan`: `GRAM`, `KG`, `PCS`, `PACK`, `LITER`. `kode` unik 2–30 karakter (409 jika bentrok).

## `/api/inventory/movement` (US4.1, log pergerakan)

| Method | Peran | Body / query | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Owner, Petani | `?itemId=` opsional | 200, riwayat pergerakan (terbaru dulu) |
| POST | Admin, Petani | `{ itemId, tipe, jumlah, keterangan? }` | 201, log + stok terbarui |

`tipe`:

- `IN` — stok bertambah sebesar `jumlah`.
- `OUT` — stok berkurang; 400 jika stok tidak cukup.
- `ADJUST` — stok diset ke `jumlah` (opname); **wajib** `keterangan`.

`jumlah` harus > 0, maksimal 3 desimal. Pembaruan stok atomik dalam transaksi DB.

## `/api/inventory/active-pack` (US4.2)

| Method | Peran | Body / query | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Petani | `?aktif=1` opsional | 200, daftar active pack |
| POST | Admin, Petani | `{ kode, itemId, hargaPack, jumlahUnit, keterangan? }` | 201, pack baru (`sisaUnit` = `jumlahUnit`) |
| PUT | Admin, Petani | `{ id, aksi: "PAKAI", jumlah }` | 200, sisa berkurang; `status` `HABIS` jika sisa 0 |

`biayaPerUnit` = `hargaPack` ÷ `jumlahUnit` (4 desimal). Owner tidak berhak (403).

## `/api/inventory/alert` (US4.3, stok di bawah minimum)

| Method | Peran | Body | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Owner, Petani | - | 200, `{ jumlah, items[] }` |

Setiap item memuat field inventaris plus `kekurangan` (selisih minimum − stok saat ini). Hanya item **aktif** dengan `stokSaatIni` &lt; `stokMinimum`. UI: `/admin/stok-rendah`, `/petani/stok-rendah`, `/owner/stok-rendah`, banner di beranda per peran.

Alias: `GET /api/inventory/alerts` (respon sama).

## `/api/infrastructure` (US4.4, pohon lahan → greenhouse → kolam)

| Method | Peran | Body | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Owner | - | 200, `{ totalKapasitasLubang, lahan[] }` nested |

## `/api/infrastructure/lahan` · `/greenhouse` · `/kolam`

| Method | Path | Peran | Body | Jawaban |
| --- | --- | --- | --- | --- |
| POST | `.../lahan` | Admin | `{ nilaiSewa, masaSewa }` | 201, hitung `amortisasi_per_bulan` |
| POST | `.../greenhouse` | Admin | `{ lahanId, nama, nilaiInvestasi, umurEkonomis }` | 201, hitung `depresiasi_per_bulan` |
| POST | `.../kolam` | Admin | `{ greenhouseId, nama, kapasitasLubang, status? }` | 201, status default `MENGANGGUR` |
| PUT | `.../kolam` | Admin | `{ id, status }` | 200, `MENGANGGUR` atau `TERPAKAI` |

Petani tidak berhak (403). Seed demo: 4 kolam × 480 lubang = **1.920** total.

## `/api/varietas` (US3.4, master varietas & asumsi)

| Method | Peran | Body / query | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Owner, Petani | `?aktif=1` hanya status AKTIF | 200, array varietas |
| POST | Admin, Owner | lihat field di bawah | 201 |
| PUT | Admin, Owner | `{ id, status }` (`AKTIF` / `NONAKTIF`) | 200 |

Field POST (camelCase): `nama`, `hargaBenihPerGram`, `bijiPerGram`, `dayaKecambah`, `lamaSemai`, `lamaDiKolam`, `beratRataRataPanen`, `beratPerPack`, `hargaJualCurah`, `hargaJualPack`, `status?` (default AKTIF).

UI: `/admin/varietas`, `/owner/varietas` (form + daftar), `/petani/varietas` (baca, hanya aktif). Nonaktif di UI wajib centang konfirmasi.

## `/api/production` (US3.1, mulai siklus semai)

| Method | Peran | Body | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Owner, Petani | - | 200, daftar siklus |
| POST | Petani | lihat field di bawah | 201, siklus baru fase `SEMAI` |

Field POST: `varietasId`, `kolamId`, `tanggalSemai` (YYYY-MM-DD), `jumlahDisemai`, `activePackBenihId`, `jumlahBenihPakai`, opsional `activePackMediaId` + `jumlahMediaPakai`.

Aturan:

- Varietas harus `AKTIF`. Jumlah disemai ≤ kapasitas lubang kolam.
- Active pack benih (dan media jika diisi) dipotong dalam transaksi yang sama; gagal = rollback.
- `kode_batch` unik, pola `GH…-A1-YYMMDD-NNN` dari greenhouse/kolam/tanggal.
- Kolam `MENGANGGUR` → `BERPRODUKSI` saat siklus pertama dibuat.

UI: `/petani/siklus`.
