#!/usr/bin/env bash
# Caveman untuk Cursor (global ~/.cursor). Opsional — tidak dijalankan otomatis bootstrap.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
INSTALLER="$ROOT/vendor/agents/caveman/installer/install.js"

if [[ ! -f "$INSTALLER" ]]; then
  echo "Submodule caveman belum ada:" >&2
  echo "  git submodule update --init vendor/agents/caveman" >&2
  exit 1
fi

echo "==> Caveman Cursor (skills + hooks di ~/.cursor; bisa bentrok dengan ponytail hooks — baca docs/agent/cursor-agent-stack.md)"
node "$INSTALLER" --only cursor --non-interactive

echo "Selesai. Mode caveman: kirim /caveman atau /caveman help di chat Cursor."
