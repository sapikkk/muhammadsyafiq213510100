# Blueprint Akuntansi & Logistik Sistem Hidroponik Greenhouse

> Dokumen acuan (*Source of Truth*) untuk perombakan skema database, API HPP, dan modul akuntansi.  
> Status: **draft** — validasi: [`VALIDASI-BACKLOG-PRD.md`](./VALIDASI-BACKLOG-PRD.md).  
> Catatan: bukan pengganti konsultasi akuntan/dosen.

---

## 0. Ringkasan eksekutif

1. Stok/biaya hanya berubah lewat peristiwa **Approve**.
2. Satuan dasar sayur: **lubang/batang** (bukan kg/pack di gudang).
3. Jurnal otomatis + **Smart Jurnal** (pengguna awam).
4. Akun inti **`is_system`** agar otomatisasi aman.

---

## 1. Alur panen & siklus

| Aturan | Penjelasan |
| --- | --- |
| Laporan PENDING | Tidak ubah stok/total susut |
| APPROVE | Baru update `jumlah_layak_jual`, `total_susut`, HPP, jurnal |
| Reject + ajukan ulang | Aman (no double count) |
| Abort / gagal total | Biaya siklus → **5300**, WIP nol |

```
PERSEMAIAN → PEMBESARAN → SIAP_PANEN → PANEN_DIAJUKAN → (APPROVE) → SELESAI
     |              |              |                |
     +--------------+--------------+----------------+→ ABORT
                                                  └→ (REJECT) → SIAP_PANEN
```

**Akumulasi siklus (WIP):** benih, nutrisi, media, alokasi listrik/air/TK → Dr WIP Cr persediaan/beban dialokasi.  
**Approve panen:** Dr Persediaan Sayur Cr WIP (+ susut normal ke HPP).  
**Abort:** Dr 5300 Cr WIP.

---

## 2. Benih tanpa timbangan

- Kapasitas pack: `kapasitas_lubang = berat_pack × biji_per_gram / biji_per_lubang`.
- Semai N lubang → potong proporsional pack + beban HPP ke siklus.
- **Pack habis:** Dr Beban Penyesuaian Cr Persediaan Benih.

---

## 3. Dynamic bundling

- Gudang: lubang/batang; plastik saat SO.
- Input SO: jumlah pack + lubang terpakai → HPP order + moving average per varietas.
- DELIVERED: HPP sayur + plastik; kresek → Beban Pengiriman.

---

## 4. DP & multi-payment

- DP → **Uang Muka Pelanggan** (bukan pendapatan).
- Pendapatan saat **DELIVERED**; Kas tunai vs bank terpisah.
- Kolom SO: `jumlah_dp`, `akun_dp_id`, `jumlah_pelunasan`, `akun_pelunasan_id`, `status_pembayaran`.

---

## 5. Pekerja & keamanan

- Hapus tabel `Petani` (gaji via Smart Jurnal bulanan).
- **`is_system`** pada akun inti (Kas, persediaan, WIP, uang muka, HPP, 5300, modal, prive, …).

---

## 6. Smart Jurnal

Form: *"Saya ingin mencatat [Tipe] sebesar [Nominal] menggunakan [Sumber Kas]"* — pasangan D/K terkunci.  
Tipe 1–6 (beban, prive, modal, aset, pinjaman, cicilan) + 7–17 (pembelian bahan, hutang, penyusutan, transfer kas, …).  
Fallback: Jurnal Manual. Metadata: `sumber = SMART | AUTO`. Koreksi: jurnal pembalik; **period closing**.

---

## 7. Chart of accounts (usulan)

| Kode | Nama | Tipe | is_system |
| --- | --- | --- | --- |
| 1100 | Kas Tunai | Aset | Ya |
| 1110 | Kas Bank | Aset | Ya |
| 1200 | Piutang Usaha | Aset | Ya |
| 1300–1360 | Persediaan (benih, nutrisi, media, plastik, **WIP**, sayur curah) | Aset | Ya |
| 1590 | Akumulasi Penyusutan | Kontra | Ya |
| 2100 | Hutang Usaha | Kewajiban | Ya |
| 2200 | Uang Muka Pelanggan | Kewajiban | Ya |
| 3100–3300 | Modal, Prive, Laba ditahan | Ekuitas | Ya |
| 4100 | Pendapatan Penjualan | Pendapatan | Ya |
| 5100 | HPP | Beban pokok | Ya |
| 5300 | Kerugian Susut Abnormal | Beban | Ya |
| 5400 | Beban Penyesuaian Persediaan | Beban | Ya |
| 6300 | Beban Pengiriman | Beban | Ya |

*(Daftar lengkap + akun operasional: lihat draft PO asli §7.)*

---

## 8. Eksplorasi (ringkas)

- **SAK EMKM / biaya** vs PSAK 69 — sistem pakai cost + WIP (batasan skripsi).
- HPP siklus = benih + nutrisi + media + alokasi + (penyusutan opsional); **HPP/lubang = total / layak jual**.
- Alokasi overhead: MVP per lubang aktif.
- Laporan: laba rugi, neraca, arus kas, modal, HPP per siklus, susut.
- KPI: yield, susut %, margin pack, BEP lubang, perputaran persediaan.
- Skenario tepi: retur, kadaluarsa, panen bertahap, batal SO+DP, hibah aset — lihat draft §8.8.

---

## 9. Rencana implementasi (8 fase)

| Fase | Pekerjaan |
| --- | --- |
| 1 | Schema: `is_system`, hapus `Petani`, kolom bayar SO, kas split |
| 2 | Panen approve-only + Abort |
| 3 | Pack kapasitas lubang + pack habis |
| 4 | Dynamic bundling + API HPP order |
| 5 | Jurnal DP / DELIVERED / pelunasan |
| 6 | Smart Jurnal |
| 7 | Laporan + KPI dashboard |
| 8 | Penyusutan otomatis, period lock, reversal |

---

## 10. Checklist validasi sebelum coding

Lihat checklist di [`VALIDASI-BACKLOG-PRD.md`](./VALIDASI-BACKLOG-PRD.md) §6.

---

## 11. Sinkronisasi backlog/PRD

Dijawab di [`VALIDASI-BACKLOG-PRD.md`](./VALIDASI-BACKLOG-PRD.md) §1–§4. **Epic v2 belum dibuat di GitHub.**

Terakhir disimpan repo: 2026-10-10.
