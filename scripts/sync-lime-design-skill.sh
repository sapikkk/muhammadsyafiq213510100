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

Di aplikasi: toggle **Pengaturan → Tampilan**. Default tetap wireframe lo-fi (`data-ui-theme="wireframe"`). Lime hanya memetakan token ke CSS shadcn — bukan migrasi komponen `@/components/lime/*`.
EOF
fi

echo "Lime referensi → $VENDOR + $SKILL_DEST"
