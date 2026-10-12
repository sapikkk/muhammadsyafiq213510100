# Skill & agent vendor (Cursor)

Submodule + skrip pasang ulang skill pihak ketiga untuk Kokonus Farm.

## Submodule

| Path | Repo | Isi |
|------|------|-----|
| `vendor/agents/agency-agents` | [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | 280+ persona agent → aturan Cursor (`.mdc`) |
| `vendor/agents/andrej-karpathy-skills` | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | Prinsip coding LLM (Karpathy) |
| `vendor/agents/semgrep-skills` | [semgrep/skills](https://github.com/semgrep/skills) | Skill agent Semgrep (scan, rule YAML, keamanan) |

Repo [semgrep/semgrep](https://github.com/semgrep/semgrep) adalah **mesin CLI**, bukan paket skill; skill resmi ada di `semgrep/skills`.

## Pasang / perbarui (mesin lokal)

```bash
git submodule update --init --recursive vendor/agents/
bash scripts/bootstrap-vendor-agents.sh
```

`bootstrap-vendor-agents.sh`:

1. Menjalankan `convert.sh` + `install.sh --link` Agency → symlink `.cursor/rules/<agent>.mdc` (tidak di-commit; lihat `.gitignore`).
2. Menjalankan `scripts/sync-agent-skills.sh` → salin skill ke `.agents/skills/` (gitignore).

Aturan **Karpathy** di-commit: `.cursor/rules/karpathy-guidelines.mdc` (`alwaysApply: true`). Sinkronkan teks dari submodule jika upstream berubah.

## Agency Agents di Cursor

Setelah bootstrap, panggil agent lewat `@` + slug, misalnya:

```
@frontend-developer Tinjau komponen ini untuk aksesibilitas.
@security-auditor Cek route API ini sebelum rilis.
```

Hanya tim tertentu:

```bash
vendor/agents/agency-agents/scripts/install.sh --tool cursor --division engineering,security,testing --link --no-interactive
```

Daftar tim: `vendor/agents/agency-agents/scripts/install.sh --list teams`

## Semgrep

- **Skill agent:** `semgrep`, `code-security`, `llm-security` (via `sync-agent-skills.sh`).
- **CLI:** `brew install semgrep` atau `pip install semgrep`.
- **Scan proyek:** `npm run semgrep:scan` (memakai `.semgrep.yml`).

Terakhir diperbarui: **2026-10-13**.
