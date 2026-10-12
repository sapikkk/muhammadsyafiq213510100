# Skill markdown (Kokonus Farm)

Salinan **`SKILL.md` saja** — tanpa skrip Python/installer. Dipakai agent + bisa di-restore ke `.agents/skills/` (gitignore).

## Isi

| Folder | Jumlah | Sumber |
|--------|--------|--------|
| `akuntansi-hidroponik/` | 1 | Domain hidroponik (maintainer repo) |
| `kokonus/` | 4 | Adaptasi flow + ui-ringkas |
| `openaccountant/` | 44 | [openaccountant/skills](https://github.com/openaccountant/skills) |

Daftar skill lokal lain yang pernah ada (Ponytail, finance-skills monorepo, dll.): [`../testing/DELETED-AGENTS-SKILLS-MANIFEST.md`](../testing/DELETED-AGENTS-SKILLS-MANIFEST.md).

## Restore ke `.agents/skills/` (mesin lokal)

```bash
# Keuangan umum (44 skill)
npx skills add openaccountant/skills -y

# Domain (sudah di repo)
mkdir -p .agents/skills/akuntansi-hidroponik
cp docs/skills/akuntansi-hidroponik/SKILL.md .agents/skills/akuntansi-hidroponik/

# Salin dari docs (disarankan — termasuk kokonus + akuntansi-hidroponik):
bash scripts/sync-agent-skills.sh
```

Superpowers (proses TDD/debug): submodule `.cursor/plugins/superpowers` — bukan folder ini.

Terakhir diperbarui: **2026-10-10**.
