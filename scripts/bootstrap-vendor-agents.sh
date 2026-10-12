#!/usr/bin/env bash
# Pasang skill/agent dari submodule vendor ke mesin lokal (Cursor rules + konversi Agency).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

git submodule update --init --recursive \
  vendor/agents/agency-agents \
  vendor/agents/andrej-karpathy-skills \
  vendor/agents/semgrep-skills

AGENCY="$ROOT/vendor/agents/agency-agents"
if [[ ! -x "$AGENCY/scripts/convert.sh" ]]; then
  echo "agency-agents tidak lengkap di $AGENCY" >&2
  exit 1
fi

echo "==> Agency Agents: konversi + symlink ke .cursor/rules/"
"$AGENCY/scripts/convert.sh" --tool cursor
"$AGENCY/scripts/install.sh" --tool cursor --no-interactive --link

echo "==> Semgrep + Karpathy + domain: sync ke .agents/skills/"
bash "$ROOT/scripts/sync-agent-skills.sh"

echo ""
echo "Selesai. Agency: @<slug-agent> di Cursor. Karpathy: rule always-on."
echo "Semgrep CLI (opsional): brew install semgrep  →  npm run semgrep:scan"
