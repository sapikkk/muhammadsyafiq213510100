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
