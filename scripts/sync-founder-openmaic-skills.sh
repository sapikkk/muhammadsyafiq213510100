#!/usr/bin/env bash
# Salin skill founder-skill + OpenMAIC ke .agents/skills/ (mesin lokal, gitignore).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/.agents/skills"
mkdir -p "$DEST"

rsync_skill_dir() {
  local src="$1"
  local name="$2"
  [[ -d "$src" ]] || return 0
  mkdir -p "$DEST/$name"
  if command -v rsync >/dev/null 2>&1; then
    rsync -a --exclude '.git' "$src/" "$DEST/$name/"
  else
    cp -R "$src/"* "$DEST/$name/"
  fi
}

FOUNDER="$ROOT/vendor/agents/founder-skill/skills"
if [[ -d "$FOUNDER" ]]; then
  for skill_dir in "$FOUNDER"/founder-*/; do
    [[ -d "$skill_dir" ]] || continue
    rsync_skill_dir "$skill_dir" "$(basename "$skill_dir")"
  done
fi

OPENMAIC="$ROOT/vendor/agents/openmaic/skills"
if [[ -d "$OPENMAIC/openmaic" ]]; then
  rsync_skill_dir "$OPENMAIC/openmaic" "openmaic"
fi
if [[ -d "$OPENMAIC/agent-runtime" ]]; then
  for skill_dir in "$OPENMAIC/agent-runtime"/*/; do
    [[ -f "$skill_dir/SKILL.md" ]] || continue
    base="$(basename "$skill_dir")"
    rsync_skill_dir "$skill_dir" "openmaic-${base}"
  done
fi

echo "Founder + OpenMAIC skills → .agents/skills/ ($(find "$DEST" -maxdepth 2 -name SKILL.md 2>/dev/null | wc -l | tr -d ' ') SKILL.md under tree)"
