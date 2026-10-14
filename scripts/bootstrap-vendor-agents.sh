#!/usr/bin/env bash
# Pasang skill/agent dari submodule vendor ke mesin lokal (Cursor rules + konversi Agency).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

git submodule update --init --recursive \
  vendor/agents/agency-agents \
  vendor/agents/andrej-karpathy-skills \
  vendor/agents/semgrep-skills \
  vendor/agents/mattpocock-skills \
  vendor/agents/apple-design-skill \
  vendor/agents/ponytail

# awesome-skills punya nested submodule rusak di upstream — init tanpa --recursive
git submodule update --init vendor/agents/awesome-skills

AGENCY="$ROOT/vendor/agents/agency-agents"
if [[ ! -x "$AGENCY/scripts/convert.sh" ]]; then
  echo "agency-agents tidak lengkap di $AGENCY" >&2
  exit 1
fi

echo "==> Agency Agents: konversi + symlink ke .cursor/rules/"
"$AGENCY/scripts/convert.sh" --tool cursor
"$AGENCY/scripts/install.sh" --tool cursor --no-interactive --link

echo "==> Semgrep, Karpathy, Matt Pocock, Apple, Ponytail, awesome-kurasi, domain: sync ke .agents/skills/"
bash "$ROOT/scripts/sync-agent-skills.sh"

PONYTAIL_HOOKS="$ROOT/vendor/agents/ponytail/scripts/cursor-hooks.js"
if [[ -f "$PONYTAIL_HOOKS" ]]; then
  echo "==> Ponytail: hooks proyek (.cursor/hooks.json) — mode default full via /ponytail full"
  node "$PONYTAIL_HOOKS" install --project
  echo "  (Jangan symlink ponytail.mdc always-on; bentrok Karpathy — lihat docs/agent/cursor-agent-stack.md)"
fi

echo ""
echo "Selesai."
echo "  Slash: /kokonus atau /all  (semua skill — docs/skills/kokonus-sesi-penuh.md)"
echo "  Agency: @<slug-agent> di Cursor"
echo "  Ponytail: /ponytail full | lite | ultra | off"
echo "  Matt Pocock: skill code-review, triage, … di .agents/skills/"
echo "  Awesome terkurasi: awesome-* di .agents/skills/"
echo "  Caveman (opsional global): bash scripts/install-caveman-cursor.sh"
echo "  Semgrep CLI (opsional): brew install semgrep  →  npm run semgrep:scan"
