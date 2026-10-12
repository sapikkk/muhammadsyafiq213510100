#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
chmod +x "$ROOT/.githooks/prepare-commit-msg" "$ROOT/.githooks/commit-msg"
git -C "$ROOT" config core.hooksPath .githooks
echo "Git hooks: core.hooksPath=.githooks (Co-authored-by Cursor dihapus otomatis)."
