# Skill & agent vendor (Cursor)

Submodule + skrip pasang ulang skill pihak ketiga untuk Kokonus Farm.

**Stack lengkap:** [`cursor-agent-stack.md`](cursor-agent-stack.md) · **Hub docs:** [`../README.md`](../README.md)

## Submodule

| Path | Repo | Isi |
|------|------|-----|
| `vendor/agents/agency-agents` | [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | 280+ persona agent → aturan Cursor (`.mdc`) |
| `vendor/agents/andrej-karpathy-skills` | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | Prinsip coding LLM (Karpathy) |
| `vendor/agents/semgrep-skills` | [semgrep/skills](https://github.com/semgrep/skills) | Skill agent Semgrep (scan, rule YAML, keamanan) |
| `vendor/agents/mattpocock-skills` | [mattpocock/skills](https://github.com/mattpocock/skills) | Skill engineering / productivity / misc |
| `vendor/agents/apple-design-skill` | [dickwu/apple-design-skill](https://github.com/dickwu/apple-design-skill) | Review UI/UX berbasis Apple HIG + referensi `references/hig/` |
| `vendor/agents/ponytail` | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | YAGNI implementasi; hooks + 6 skill |
| `vendor/agents/caveman` | [JuliusBrussee/caveman](https://github.com/juliusbrussee/caveman) | Gaya agent + cavecrew (install Cursor opsional) |
| `vendor/agents/awesome-skills` | [theneoai/awesome-skills](https://github.com/theneoai/awesome-skills) | 956 skill upstream; proyek sync **kurasi** saja |
| `vendor/agents/founder-skill` | [Jakeschincariol/founder-skill](https://github.com/Jakeschincariol/founder-skill) | 11 skill validasi bisnis → `.agents/skills/founder-*` |
| `vendor/agents/openmaic` | [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | Skill kelas multi-agent + runtime pedagogi → `.agents/skills/openmaic*` |

Detail founder/OpenMAIC: [`founder-openmaic.md`](founder-openmaic.md).

**Router slash `/`:** [`cursor-agent-stack.md`](cursor-agent-stack.md).

Repo [semgrep/semgrep](https://github.com/semgrep/semgrep) adalah **mesin CLI**, bukan paket skill; skill resmi ada di `semgrep/skills`.

## Pasang / perbarui (mesin lokal)

```bash
git submodule update --init --recursive vendor/agents/
bash scripts/bootstrap-vendor-agents.sh
```

`bootstrap-vendor-agents.sh`:

1. Menjalankan `convert.sh` + `install.sh --link` Agency → symlink `.cursor/rules/<agent>.mdc` (tidak di-commit; lihat `.gitignore`).
2. Menjalankan `scripts/sync-agent-skills.sh` → salin skill ke `.agents/skills/` (gitignore).
3. Menjalankan `scripts/sync-founder-openmaic-skills.sh` → founder-* + openmaic* (gitignore).

Aturan di-commit:

| File | Perilaku |
|------|----------|
| `karpathy-guidelines.mdc` | always-on |
| `apple-design-skill.mdc` | aktif pada `app/**`, `components/**`; review HIG + gabung dengan `ui-ringkas` untuk copy ID |

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

## Matt Pocock (real engineering)

Skill disalin dari `vendor/agents/mattpocock-skills/skills/{engineering,productivity,misc}/` (bukan folder `deprecated` / `in-progress`).

Contoh pemicuan di chat:

- `tdd`, `code-review`, `diagnosing-bugs`, `implement-spec`, `triage`, `pr`

Proses TDD/debug **Superpowers** (submodule `.cursor/plugins/superpowers`) tetap dipakai untuk US Kokonus; skill Matt Pocock bisa melengkapi alur implementasi/review — pilih satu alur per task, jangan campur dua skill TDD sekaligus.

Update upstream: `git submodule update --remote vendor/agents/mattpocock-skills && bash scripts/sync-agent-skills.sh`

Alternatif resmi: [skills.sh](https://skills.sh/mattpocock/skills) — `npx skills add mattpocock/skills -a cursor` (hindari dobel install).

## Apple design (HIG)

- Bundle lengkap (123 halaman HIG) ada di submodule + `.agents/skills/apple-design/` setelah sync.
- Rule proyek: `.cursor/rules/apple-design-skill.mdc`.
- Contoh prompt: _"Review halaman Beranda ini terhadap HIG; copy tetap Indonesia per ui-ringkas."_
- Install alternatif: `npx skills add dickwu/apple-design-skill -a cursor`.

## Semgrep

- **Skill agent:** `semgrep`, `code-security`, `llm-security` (via `sync-agent-skills.sh`).
- **CLI:** `brew install semgrep` atau `pip install semgrep`.
- **Scan proyek:** `npm run semgrep:scan` (memakai `.semgrep.yml`).

## Ponytail

Bootstrap menjalankan `node vendor/agents/ponytail/scripts/cursor-hooks.js install --project` → `.cursor/hooks.json` (gitignore). Mode: `/ponytail full|lite|ultra|off`. Jangan pasang symlink `ponytail.mdc` always-on bersama Karpathy.

## Awesome-skills (kurasi)

Manifest: `docs/skills/awesome-skills-kokonus.manifest` · skrip: `scripts/sync-awesome-skills-kokonus.sh` (via bootstrap).

## Caveman

Opsional: `bash scripts/install-caveman-cursor.sh` (mengubah `~/.cursor/`).

Terakhir diperbarui: **2026-10-15**.
