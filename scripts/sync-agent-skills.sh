#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/.agents/skills"
mkdir -p "$DEST"

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
    if [[ -d "$SEMGREP_VENDOR/$skill" ]]; then
      mkdir -p "$DEST/$skill"
      if command -v rsync >/dev/null 2>&1; then
        rsync -a "$SEMGREP_VENDOR/$skill/" "$DEST/$skill/"
      else
        cp -R "$SEMGREP_VENDOR/$skill/"* "$DEST/$skill/"
      fi
    fi
  done
fi

echo "Skills synced to .agents/skills ($(find "$DEST" -name SKILL.md | wc -l | tr -d ' ') files)"
