# Dokumentasi API

Semua endpoint butuh sesi NextAuth (cookie). Peran dicek di setiap handler.

## Kontrak JSON (route CRUD & laporan)

Sukses:

```json
{ "ok": true, "data": … }
```

Gagal:

```json
{ "ok": false, "error": { "code": "FORBIDDEN", "message": "…", "fields": {} } }
```

Status HTTP: 400 masukan salah, 401 belum masuk, 403 peran tidak berhak, 404 tidak ditemukan, 409 bentrok data unik, 500 kesalahan server.

Klien browser/server action internal boleh tetap memakai bentuk lama `{ "error": "pesan" }` sampai diseragamkan. Untuk fetch dari front-end gunakan `lib/api-client.ts`.

## Export file

`GET /api/export/*` mengembalikan PDF atau XLSX jika berhasil. Jika ditolak (auth/RBAC), respons JSON memakai kontrak `ok: false` di atas, bukan file.

## `/api/accounts` (US2.1, bagan akun)

| Method | Peran | Body | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Owner | - | 200, array akun terurut kode. Termasuk akun nonaktif, lihat field `aktif` |
| POST | Admin | `{ kode, nama, tipe, parentId? }` | 201, akun baru |
| PUT | Admin | `{ id, kode, nama, tipe, parentId? }` | 200, akun terbarui |
| PUT | Admin | `{ id, aktif: boolean }` | 200, soft delete atau aktifkan lagi |

Bentuk akun:

```json
{ "id": 40, "kode": "1600", "nama": "Perlengkapan Kebun", "tipe": "ASET", "parentId": 1, "aktif": true, "isSystem": false }
```

Aturan:

- `kode` angka saja, maksimal 20 digit, unik (409 jika bentrok).
- `tipe` salah satu `ASET`, `KEWAJIBAN`, `MODAL`, `PENDAPATAN`, `BEBAN`.
- `parentId` opsional. Induk harus ada, aktif, dan bertipe sama (400 jika tidak).
- Akun tidak bisa menjadi induk dirinya sendiri (400).
- Mengubah tipe akun yang punya anak bertipe lain ditolak (400).
- Nonaktifkan akun yang masih punya anak aktif ditolak (400). Nonaktif adalah soft delete; baris tetap ada untuk jurnal lama.
- Akun dengan `isSystem: true` (COA standar seed): ubah `kode`, `tipe`, `parentId`, atau nonaktif ditolak (400). Hanya `nama` boleh diubah.

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

## `/api/production/[id]/phase` (US3.2, pindah fase)

| Method | Peran | Body | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Owner, Petani | - | 200, ringkasan siklus + fase berikutnya |
| PUT | Petani | `{ konfirmasi: true, catatan? }` | 200, fase baru + log |

Urutan fase (hanya maju): SEMAI → SPROUT_DAUN → TAMBAL → PINDAH_KOLAM → PENDEWASAAN → PANEN → SELESAI.  
Saat masuk `PINDAH_KOLAM` / `PANEN` tanggal terkait diisi otomatis. Log disimpan di `Log_Produksi`.

UI: `/petani/siklus/[id]` — tombol besar + checkbox konfirmasi.

## `/api/harvest` (US3.3, laporan panen)

| Method | Peran | Body | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Owner | `?status=PENDING` opsional | 200, daftar laporan |
| POST | Petani | `{ siklusId, jumlahLayak, jumlahTidakLayak, beratLayakGram, beratTidakLayakGram, catatan? }` | 201 |

Satu laporan per siklus. Hanya saat fase `PANEN`. Status awal `PENDING`.  
UI Petani: form di `/petani/siklus/[id]`. Admin: `/admin/harvest` (baca).

Approve/reject: `POST /api/harvest/[id]/approve`, `POST /api/harvest/[id]/reject` (Admin). Detail `/admin/harvest/[id]`.

Saat approve (v2): jurnal otomatis `sumber=AUTO` — **Dr 1350** persediaan sayur, **Dr 5300** (jika susut abnormal), **Cr 1360** WIP; HPP per lubang di `HPP`; pengakuan **5100** tetap saat SO delivered.

## `/api/petani` (US4.5, master Petani ERD)

| Method | Peran | Body | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Owner | - | 200, array petani |
| POST | Admin | `{ nama, gajiBulanan }` | 201 |
| PUT | Admin | `{ id, nama, gajiBulanan }` | 200 |

Bukan akun login (`User`). UI: `/admin/petani`, `/owner/petani` (baca).

## `/api/biaya/langsung` · `/api/biaya/overhead` (US2.4)

| Endpoint | Method | Peran | Catatan |
| --- | --- | --- | --- |
| `/api/biaya/langsung?siklusId=` | GET, PUT | Admin | Update nutrisi & listrik; subtotal dihitung ulang |
| `/api/biaya/overhead` | GET, POST | Admin | Overhead periode; dipakai alokasi HPP saat approve |

UI: `/admin/biaya`.

## `/api/sales-orders` (v2-E.1, DP & pembayaran SO)

| Method | Peran | Body / path | Jawaban |
| --- | --- | --- | --- |
| GET | Admin, Owner | - | 200, daftar SO (termasuk `jumlah_dp`, `status_pembayaran`, `jurnal_dp_id`) |
| POST | Admin | lihat field di bawah | 201, SO DRAFT |

Field POST (camelCase): `pelangganId`, `catatan?`, `jumlahDp?` (default 0), `akunDpId?` (akun KEWAJIBAN; default 2200 jika DP &gt; 0), `baris[]` dengan `siklusId`, `jenis` (`CURAH`/`PACK`), `jumlah`, `lubangTerpakai`, `hargaSatuan`.

Aturan DP:

- `jumlahDp` ≤ total SO; jika &gt; 0 wajib ada akun kewajiban uang muka.
- Posting DP **bukan** pendapatan: Dr Kas/Bank (`sumberKas`: 1100|1110) Cr akun DP.

| Method | Peran | Path | Jawaban |
| --- | --- | --- | --- |
| PUT | Admin | `/api/sales-orders/[id]/confirm` | 200, status CONFIRMED |
| POST | Admin | `/api/sales-orders/[id]/dp` | 200, body opsional `{ sumberKas?: "1100"|"1110" }` |

UI: `/admin/penjualan` — form DP + tombol **Catat DP** setelah konfirmasi SO.

| Method | Peran | Path | Jawaban |
| --- | --- | --- | --- |
| POST | Admin | `/api/sales-orders/[id]/pelunasan` | 200, `{ nominal, sumberKas? }` → Dr Kas Cr piutang, status `LUNAS` jika sisa 0 |

Deliver SO dengan DP: jurnal pendapatan Dr uang muka + Dr piutang. Tanpa DP: Dr kas/bank (`sumberKas` di PUT deliver & form UI). Packing & prive: pilih 1100/1110 sama.

## `/api/jurnal/smart` (v2-F.2, Smart Jurnal)

| Method | Peran | Body | Jawaban |
| --- | --- | --- | --- |
| POST | Admin | lihat di bawah | 201, `{ id, status, sumber: "SMART" }` |

Field POST: `tipe` (enum di `lib/smart-jurnal.ts`), `nominal`, `sumberKas` (`1100` \| `1110`, kecuali penyusutan), `tujuanKas` (wajib jika `TRANSFER_KAS`), `tanggal`, `catatan?`, `status?`, `adminOverridePeriod?`.

Tipe (subset blueprint): beban 5230, prive, modal, **transfer kas**, pinjaman/hutang 2100, beli aset 1500, bunga 5500, penyusutan 5210/1510.

UI: `/admin/jurnal/baru` tab **Smart Jurnal**; jurnal manual tetap di tab kedua.

## Period lock (v2-H.1)

| UI | Peran | Catatan |
| --- | --- | --- |
| `/admin/akuntansi` | Admin | Set `periode_tutup`; POST jurnal dengan tanggal lebih awal ditolak |
| Form jurnal / Smart | Admin | Checkbox **override period lock** (keputusan PO) |

Lib: `lib/period-lock.ts` — dipanggil dari `createJurnal` dan Smart Jurnal.

## Penyusutan otomatis (v2-H.2)

| UI | Peran | Catatan |
| --- | --- | --- |
| `/admin/akuntansi` | Admin | Form **Catat penyusutan bulan** → `catatPenyusutanBulan` |

Σ `Greenhouse.depresiasi_per_bulan` → Dr 5210 Cr 1510; `Biaya_Overhead` terakhir `depresiasi_listrik` → Dr 5220 Cr 1530. Idempotent per bulan.
