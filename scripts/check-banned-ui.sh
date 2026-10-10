#!/usr/bin/env bash
# Fail if banned decorative UI tokens reappear (flat B&W design system).
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

GLOBS=( "app" "components" "lib" )
PATTERNS=(
  'shadow-sm'
  'shadow-md'
  'shadow-lg'
  'shadow-xl'
  'shadow-2xl'
  'drop-shadow'
  'backdrop-blur'
  'bg-gradient-'
  'from-[a-z]'
  'via-[a-z]'
  'to-[a-z]'
  'linear-gradient'
  'radial-gradient'
)

fail=0
for pat in "${PATTERNS[@]}"; do
  hits=$(rg -n "$pat" "${GLOBS[@]}" --glob '*.tsx' --glob '*.css' --glob '*.ts' 2>/dev/null \
    | grep -vE 'slide-(in-from|out-to)-' || true)
  if [[ -n "$hits" ]]; then
    echo "$hits"
    echo "error: banned UI pattern: $pat"
    fail=1
  fi
done

if [[ "$fail" -ne 0 ]]; then
  exit 1
fi

echo "check-banned-ui: ok"
