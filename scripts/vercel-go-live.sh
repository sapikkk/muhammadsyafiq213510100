#!/usr/bin/env bash
# Deploy Kokonus Farm ke Vercel + schema + seed — semua dari terminal.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

TEAM="${VERCEL_TEAM:-muhammad1111syafiq-gmailcoms-projects}"
PROJECT="${VERCEL_PROJECT:-kokonusfarm}"
ENV_FILE="${ENV_FILE:-$ROOT/.env.vercel}"

red() { printf '\033[31m%s\033[0m\n' "$*"; }
green() { printf '\033[32m%s\033[0m\n' "$*"; }

if ! command -v vercel >/dev/null 2>&1; then
  red "Vercel CLI belum ada. Pasang: npm i -g vercel"
  exit 1
fi

if ! vercel whoami >/dev/null 2>&1; then
  red "Belum login Vercel. Jalankan dulu (buka browser):"
  echo "  vercel login"
  exit 1
fi

green "1/6 — Link ke project $PROJECT (team: $TEAM)"
vercel link --yes --project "$PROJECT" --scope "$TEAM"

if [[ ! -f "$ENV_FILE" ]]; then
  red "File $ENV_FILE belum ada."
  echo "Salin contoh: cp scripts/env.vercel.example .env.vercel"
  echo "Isi DATABASE_URL, DIRECT_URL, NEXTAUTH_SECRET, NEXTAUTH_URL."
  echo ""
  echo "Database dari terminal (Neon gratis, sekali login browser):"
  echo "  npx neonctl@latest auth"
  echo "  npx neonctl@latest projects create --name kokonusfarm-prod"
  echo "  npx neonctl@latest connection-string --pooled   # → DATABASE_URL"
  echo "  npx neonctl@latest connection-string            # → DIRECT_URL"
  exit 1
fi

# shellcheck disable=SC1090
set -a
source "$ENV_FILE"
set +a

for key in DATABASE_URL DIRECT_URL NEXTAUTH_SECRET NEXTAUTH_URL; do
  if [[ -z "${!key:-}" ]]; then
    red "Kosong: $key di $ENV_FILE"
    exit 1
  fi
done

push_env() {
  local name=$1
  local value=$2
  local env
  for env in production preview development; do
    if vercel env ls "$env" --scope "$TEAM" 2>/dev/null | grep -q "${name}"; then
      printf '%s' "$value" | vercel env update "$name" "$env" --scope "$TEAM" --yes
    else
      printf '%s' "$value" | vercel env add "$name" "$env" --scope "$TEAM" --yes
    fi
  done
}

green "2/6 — Upload env ke Vercel (Production + Preview + Development)"
push_env DATABASE_URL "$DATABASE_URL"
push_env DIRECT_URL "$DIRECT_URL"
push_env NEXTAUTH_SECRET "$NEXTAUTH_SECRET"
push_env NEXTAUTH_URL "$NEXTAUTH_URL"
push_env AUDIT_BYPASS_RBAC "false"

green "3/6 — prisma db push (DB cloud)"
npx prisma db push

green "4/6 — seed demo"
node --env-file="$ENV_FILE" prisma/seed.js

green "5/6 — deploy production"
vercel deploy --prod --yes --scope "$TEAM" --archive=tgz

green "6/6 — selesai"
echo "Buka: ${NEXTAUTH_URL%/}/login"
echo "Demo: owner@kokonus.farm / KokonusDemo2026"
