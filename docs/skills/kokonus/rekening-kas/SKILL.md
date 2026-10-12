# Rekening kas & bank (Kokonus)

## Kapan dipakai

Owner menambah rekening tunai, bank, atau e-wallet. Admin memilih rekening saat DP, pelunasan, packing, dan catat uang otomatis.

## Data

- Model: `Rekening_Kas` → satu `Akun` daun di bawah 1100 atau 1110.
- Katalog dropdown: `lib/indonesia-institusi-keuangan.ts` (statis).
- Logo: npm [`idn-finlogos`](https://github.com/hafidznoor/idn-finlogos) + `components/institusi-keuangan-icon.tsx`. Perhatikan lisensi aset (CC BY-NC) untuk penggunaan komersial merek.

## Halaman

- Kelola: `/owner/rekening`
- Saldo beranda Owner: `RekeningSaldoWidget`
- Form pembayaran: `sumberKas` = kode akun rekening (bukan hanya 1100/1110).

## Setelah deploy / reset DB

```bash
node --env-file=.env scripts/ensure-rekening-kas.js
```

## Cuaca beranda

- `WEATHER_LAT`, `WEATHER_LON`, `WEATHER_LABEL` di `.env`
- Sumber: Open-Meteo (bukan Google Weather API berbayar).
