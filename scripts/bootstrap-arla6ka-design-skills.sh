#!/usr/bin/env bash
# Skill design.how / arla6ka + referensi Lime (contoh preview Kokonus).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> arla6ka/skills (build-design-system, ui-review, token-mapping, …)"
npx skills add arla6ka/skills -y

echo "==> Lime upstream (vendor/design/lime + .agents/skills/lime)"
bash "$ROOT/scripts/sync-lime-design-skill.sh"

echo "==> Kokonus lime-preview + ui-ringkas ke .agents/skills/"
bash "$ROOT/scripts/sync-agent-skills.sh"

echo "Selesai. Lime preview: docs/skills/kokonus/lime-preview/SKILL.md"
