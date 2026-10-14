#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/.agents/skills"
mkdir -p "$DEST"

rsync_skill_dir() {
  local src="$1"
  local name="$2"
  if [[ ! -d "$src" ]]; then
    return 0
  fi
  mkdir -p "$DEST/$name"
  if command -v rsync >/dev/null 2>&1; then
    rsync -a "$src/" "$DEST/$name/"
  else
    cp -R "$src/"* "$DEST/$name/"
  fi
}

if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete "$ROOT/docs/skills/openaccountant/" "$DEST/"
else
  rm -rf "$DEST"/*
  cp -R "$ROOT/docs/skills/openaccountant/"* "$DEST/"
fi

mkdir -p "$DEST/akuntansi-hidroponik" "$DEST/kokonus/piutang-aging" "$DEST/kokonus/tutup-bulan" "$DEST/kokonus/smart-jurnal-audit" "$DEST/kokonus/ui-ringkas"
cp "$ROOT/docs/skills/akuntansi-hidroponik/SKILL.md" "$DEST/akuntansi-hidroponik/"
cp "$ROOT/docs/skills/kokonus/piutang-aging/SKILL.md" "$DEST/kokonus/piutang-aging/"
cp "$ROOT/docs/skills/kokonus/tutup-bulan/SKILL.md" "$DEST/kokonus/tutup-bulan/"
cp "$ROOT/docs/skills/kokonus/smart-jurnal-audit/SKILL.md" "$DEST/kokonus/smart-jurnal-audit/"
cp "$ROOT/docs/skills/kokonus/ui-ringkas/SKILL.md" "$DEST/kokonus/ui-ringkas/"

if [[ -f "$ROOT/docs/skills/karpathy-guidelines/SKILL.md" ]]; then
  mkdir -p "$DEST/karpathy-guidelines"
  cp "$ROOT/docs/skills/karpathy-guidelines/SKILL.md" "$DEST/karpathy-guidelines/"
fi

SEMGREP_VENDOR="$ROOT/vendor/agents/semgrep-skills/skills"
if [[ -d "$SEMGREP_VENDOR" ]]; then
  for skill in semgrep code-security llm-security; do
    rsync_skill_dir "$SEMGREP_VENDOR/$skill" "$skill"
  done
fi

MATT="$ROOT/vendor/agents/mattpocock-skills/skills"
if [[ -d "$MATT" ]]; then
  for cat in engineering productivity misc; do
    [[ -d "$MATT/$cat" ]] || continue
    for skill_dir in "$MATT/$cat"/*/; do
      [[ -d "$skill_dir" ]] || continue
      rsync_skill_dir "$skill_dir" "$(basename "$skill_dir")"
    done
  done
fi

PONY="$ROOT/vendor/agents/ponytail/skills"
if [[ -d "$PONY" ]]; then
  for skill_dir in "$PONY"/*/; do
    [[ -d "$skill_dir" ]] || continue
    [[ -f "$skill_dir/SKILL.md" ]] || continue
    rsync_skill_dir "$skill_dir" "$(basename "$skill_dir")"
  done
fi

APPLE="$ROOT/vendor/agents/apple-design-skill"
if [[ -f "$APPLE/SKILL.md" ]]; then
  mkdir -p "$DEST/apple-design"
  if command -v rsync >/dev/null 2>&1; then
    rsync -a \
      --exclude '.git' \
      --exclude '.github' \
      "$APPLE/" "$DEST/apple-design/"
  else
    cp "$APPLE/SKILL.md" "$DEST/apple-design/"
    cp -R "$APPLE/references" "$DEST/apple-design/" 2>/dev/null || true
  fi
fi

if [[ -x "$ROOT/scripts/sync-awesome-skills-kokonus.sh" ]]; then
  bash "$ROOT/scripts/sync-awesome-skills-kokonus.sh"
fi

echo "Skills synced to .agents/skills ($(find "$DEST" -name SKILL.md | wc -l | tr -d ' ') files)"
