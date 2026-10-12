#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v semgrep >/dev/null 2>&1; then
  echo "Semgrep belum terpasang." >&2
  echo "  python3 -m pip install --user semgrep" >&2
  echo "  (PATH: ~/Library/Python/3.11/bin jika perlu)" >&2
  echo "  atau: brew install semgrep" >&2
  exit 1
fi

PACKS=(
  p/typescript
  p/javascript
  p/nextjs
  p/secrets
  p/owasp-top-ten
)

CONFIG_ARGS=()
for pack in "${PACKS[@]}"; do
  CONFIG_ARGS+=(--config "$pack")
done

semgrep scan "${CONFIG_ARGS[@]}" \
  --exclude vendor \
  --exclude graphify-out \
  --exclude .next \
  --exclude node_modules \
  --error \
  .
