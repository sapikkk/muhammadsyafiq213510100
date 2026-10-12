#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v semgrep >/dev/null 2>&1; then
  echo "Semgrep belum terpasang." >&2
  echo "  brew install semgrep" >&2
  echo "  atau: python3 -m pip install semgrep" >&2
  exit 1
fi

CONFIG="${1:-.semgrep.yml}"
if [[ ! -f "$CONFIG" ]]; then
  echo "Config tidak ditemukan: $CONFIG" >&2
  exit 1
fi

semgrep scan --config "$CONFIG" --error
