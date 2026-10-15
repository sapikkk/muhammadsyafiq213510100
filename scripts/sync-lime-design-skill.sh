#!/usr/bin/env bash
# Salin referensi Lime (contoh) dari vendor atau GitHub ke vendor/design/lime + .agents/skills/lime
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VENDOR="$ROOT/vendor/design/lime"
SKILL_DEST="$ROOT/.agents/skills/lime"
BASE_URL="https://raw.githubusercontent.com/arla6ka/skills/main/systems/lime"

mkdir -p "$VENDOR" "$SKILL_DEST"

copy_remote() {
  local file="$1"
  curl -fsSL "$BASE_URL/$file" -o "$VENDOR/$file"
}

for f in README.md SKILL.md tokens.css base.css styles.css; do
  copy_remote "$f" || echo "Lewati $f (gagal unduh)"
done

if [[ -f "$VENDOR/SKILL.md" ]]; then
  cp "$VENDOR/SKILL.md" "$SKILL_DEST/SKILL.md"
  cat > "$SKILL_DEST/README.md" <<'EOF'
# Lime (contoh Kokonus)

Skill upstream: [arla6ka/skills/systems/lime](https://github.com/arla6ka/skills/tree/main/systems/lime).

Di aplikasi: toggle **Pengaturan → Tampilan**. Default wireframe: `docs/skills/kokonus/ui-ringkas/SKILL.md`. Preview Lime: `docs/skills/kokonus/lime-preview/SKILL.md` + skill arla6ka (`npx skills add arla6ka/skills -y`).
EOF
  if [[ -f "$ROOT/docs/skills/kokonus/lime-preview/SKILL.md" ]]; then
    mkdir -p "$ROOT/.agents/skills/kokonus/lime-preview"
    cp "$ROOT/docs/skills/kokonus/lime-preview/SKILL.md" "$ROOT/.agents/skills/kokonus/lime-preview/"
  fi
fi

echo "Lime referensi → $VENDOR + $SKILL_DEST"
