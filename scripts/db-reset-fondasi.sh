#!/usr/bin/env bash
# Hapus SEMUA baris di database, terapkan ulang skema Prisma, seed fondasi (COA saja).
# PERINGATAN: tidak bisa dibatalkan. Pastikan DATABASE_URL mengarah ke DB yang benar.
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ "${CONFIRM_DB_RESET:-}" != "yes" ]]; then
  echo "Ini akan menghapus semua data di database yang di .env."
  echo "Jalankan: CONFIRM_DB_RESET=yes npm run db:reset"
  exit 1
fi

npx prisma db push --force-reset --accept-data-loss
npx prisma db seed

echo "Selesai. Database kosong + COA. Login Owner jika SEED_OWNER_* di .env sudah diisi."
