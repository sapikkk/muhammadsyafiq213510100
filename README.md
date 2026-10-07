# Kokonus Farm

Aplikasi pertama untuk repositori [sapikkk/muhammadsyafiq213510100](https://github.com/sapikkk/muhammadsyafiq213510100).

Dua layanan Prisma Composer:

- `notes` menyimpan kalimat fakta usaha (rakit apung, 1.920 lubang, Owner Koko Nuswantoro).
- `web` memanggil `notes` dan mengembalikan satu kalimat sebagai teks.

Push ke `main` menjalankan dua workflow:

- `prisma-deploy` memasang dependensi, membangun, lalu men-deploy ke Prisma Compute (proyek yang sudah dihubungkan di Console).
- `Release` menjalankan [semantic-release](https://github.com/semantic-release/semantic-release). Versi, changelog, dan GitHub Release mengikuti [Conventional Commits](https://www.conventionalcommits.org/). Paket ini `private`, jadi tidak diterbitkan ke npm.

## Commit yang memicu rilis

| Pesan | Versi |
| --- | --- |
| `fix: ...` | patch |
| `feat: ...` | minor |
| `feat!: ...` atau `BREAKING CHANGE:` | major |

`chore:`, `docs:`, `ci:`, dan `refactor:` tidak menaikkan versi. Commit rilis memakai `[skip ci]` supaya tidak memicu deploy kedua.

## Menjalankan lokal

Butuh Node.js 22.18 atau lebih baru, dan Bun.

```bash
npm install
npm run build
npm run typecheck
npx prisma dev module.ts
```

Lalu buka URL `web` yang dicetak CLI (biasanya `http://localhost:3001`).
