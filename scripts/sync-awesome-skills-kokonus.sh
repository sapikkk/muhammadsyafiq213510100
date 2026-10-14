#!/usr/bin/env bash
# Salin skill awesome-skills terkurasi ke .agents/skills/awesome-<slug>/
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VENDOR="$ROOT/vendor/agents/awesome-skills/skills"
MANIFEST="$ROOT/docs/skills/awesome-skills-kokonus.manifest"
DEST="$ROOT/.agents/skills"

if [[ ! -d "$VENDOR" ]]; then
  echo "Submodule awesome-skills belum ada. Jalankan:" >&2
  echo "  git submodule update --init vendor/agents/awesome-skills" >&2
  exit 1
fi

mkdir -p "$DEST"
count=0
while IFS= read -r line || [[ -n "$line" ]]; do
  line="${line%%#*}"
  line="${line#"${line%%[![:space:]]*}"}"
  line="${line%"${line##*[![:space:]]}"}"
  [[ -z "$line" ]] && continue
  src="$VENDOR/$line"
  if [[ ! -f "$src/SKILL.md" ]]; then
    echo "Lewati (tidak ada): $line" >&2
    continue
  fi
  slug="$(basename "$line")"
  name="awesome-$slug"
  mkdir -p "$DEST/$name"
  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete "$src/" "$DEST/$name/"
  else
    cp -R "$src/"* "$DEST/$name/"
  fi
  count=$((count + 1))
done < "$MANIFEST"

echo "Awesome-skills Kokonus: $count skill → .agents/skills/awesome-*"
