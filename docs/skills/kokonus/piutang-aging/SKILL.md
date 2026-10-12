---
name: piutang-aging
description: >
  Lacak piutang penjualan sayur (Sales Order) dan sisa bayar pelanggan — adaptasi invoice-aging untuk Kokonus Farm.
---

# Piutang & umur piutang (Kokonus)

## Overview
Analisis piutang usaha dari pesanan jual yang status pembayarannya `PIUTANG`, bukan dari faktur SaaS generik. Piutang timbul saat kirim (DELIVERED) jika uang diterima kurang dari total setelah uang muka.

## Sumber data repo
- `lib/sales-order-penerimaan.ts` — split kas vs piutang
- `lib/sales-order-delivery.ts` — jurnal pendapatan + piutang (akun 1200)
- `lib/sales-order-pembayaran.ts` — pelunasan
- UI: `/admin/penjualan`, `/admin/keuangan` (badge jumlah piutang)

## Workflow
1. Ambil daftar `Sales_Order` dengan `status_pembayaran = PIUTANG` dan tanggal kirim.
2. Untuk tiap pesanan: total, uang diterima, sisa piutang, nama pelanggan.
3. Kelompokkan umur dari tanggal kirim: 0–30, 31–60, 61–90, 90+ hari.
4. Rekomendasi: ingatkan Admin catat pelunasan lewat detail SO atau Smart Jurnal `TERIMA_PIUTANG`.
5. Jangan buat jurnal manual ganda jika pelunasan sudah lewat flow SO.

## Format laporan (contoh)

```
PIUTANG PENJUALAN — per [tanggal]
Pelanggan    Pesanan   Sisa        Umur
...
```
