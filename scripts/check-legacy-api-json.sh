#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

if rg -n 'NextResponse\.json\(\s*\{\s*error' app/api 2>/dev/null; then
  echo "error: legacy API error shape { error: string } still used under app/api"
  echo "use apiFail() from lib/api-response.ts"
  exit 1
fi

echo "check-legacy-api-json: ok"
