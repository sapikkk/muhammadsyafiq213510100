#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

fail=0

check_file() {
  local f="$1"
  if [[ -f "$f" ]] && grep -qE '^[[:space:]]*AUDIT_BYPASS_RBAC[[:space:]]*=[[:space:]]*["'\'']?true["'\'']?[[:space:]]*$' "$f"; then
    echo "error: AUDIT_BYPASS_RBAC must not be true in tracked file: $f"
    fail=1
  fi
}

while IFS= read -r f; do
  [[ -n "$f" ]] && check_file "$f"
done < <(git ls-files '.env.example' '.env.development' '.env.production' '.env.test' '.env' 2>/dev/null || true)

if git grep -nE '^[[:space:]]*AUDIT_BYPASS_RBAC[[:space:]]*=[[:space:]]*["'\'']?true["'\'']?[[:space:]]*$' \
  -- '.github/**' 2>/dev/null; then
  echo "error: AUDIT_BYPASS_RBAC=true in GitHub workflow env"
  fail=1
fi

if [[ "$fail" -ne 0 ]]; then
  exit 1
fi

echo "check-audit-env: ok"
