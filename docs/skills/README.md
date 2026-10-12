# Skill markdown (Kokonus Farm)

Salinan **`SKILL.md`** (dan bundle besar via submodule + `sync-agent-skills.sh`). Dipakai agent + di-restore ke `.agents/skills/` (gitignore).

## Isi

| Folder / sumber | Jumlah (≈) | Sumber |
|-----------------|------------|--------|
| `akuntansi-hidroponik/` | 1 | Domain hidroponik (maintainer repo) |
| `kokonus/` | 4 | Adaptasi flow + ui-ringkas |
| `openaccountant/` | 44 | [openaccountant/skills](https://github.com/openaccountant/skills) |
| `karpathy-guidelines/` | 1 | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) |
| `semgrep/` | 1 (ringkas) | [semgrep/skills](https://github.com/semgrep/skills) — bundle lengkap via submodule |
| `apple-design/` | 1 (ringkas) | [dickwu/apple-design-skill](https://github.com/dickwu/apple-design-skill) — HIG + `references/` via submodule |
| Matt Pocock | 31 skill | [mattpocock/skills](https://github.com/mattpocock/skills) — hanya via `vendor/agents/mattpocock-skills` + sync |

**Agency Agents** (280+ persona) bukan `SKILL.md`; submodule `vendor/agents/agency-agents` → aturan Cursor `.mdc`. Lihat [`../cursor-vendor-agents.md`](../cursor-vendor-agents.md).

Daftar skill lokal lain yang pernah ada: [`../testing/DELETED-AGENTS-SKILLS-MANIFEST.md`](../testing/DELETED-AGENTS-SKILLS-MANIFEST.md).

## Restore ke `.agents/skills/` (mesin lokal)

```bash
git submodule update --init --recursive vendor/agents/
bash scripts/bootstrap-vendor-agents.sh
```

Atau hanya domain + openaccountant:

```bash
npx skills add openaccountant/skills -y
bash scripts/sync-agent-skills.sh
```

Superpowers (proses TDD/debug untuk US): submodule `.cursor/plugins/superpowers` — bukan folder ini.

Terakhir diperbarui: **2026-10-13**.
