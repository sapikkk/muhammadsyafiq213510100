#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

fail=0

check_file() {
  local f="$1"
  if [[ -f "$f" ]] && grep -qE '^[[:space:]]*AUDIT_BYPASS_RBAC[[:space:]]*=[[:space:]]*["'\'']?true["'\'']?[[:space:]]*$' "$f"; then
    echo "error: AUDIT_BYPASS_RBAC must not be true in committed file: $f"
    fail=1
  fi
}

for f in .env.example .env .env.development .env.production .env.test; do
  check_file "$f"
done

if git grep -nE 'AUDIT_BYPASS_RBAC=(["'\'']?)true\1?' -- ':!.env.local' ':!scripts/check-audit-env.sh' 2>/dev/null; then
  echo "error: AUDIT_BYPASS_RBAC=true found in tracked sources"
  fail=1
fi

if [[ "$fail" -ne 0 ]]; then
  exit 1
fi

echo "check-audit-env: ok"
