# Lime (contoh) — toggle tampilan

Referensi upstream: [arla6ka/skills — systems/lime](https://github.com/arla6ka/skills/tree/main/systems/lime) · [design.how/systems/lime](https://design.how/systems/lime).

## Di aplikasi

- **Default:** wireframe lo-fi (`html[data-ui-theme="wireframe"]`) — monokrom, `--radius: 0`.
- **Contoh Lime:** `html[data-ui-theme="lime"]` — token hangat + aksen lime dipetakan ke variabel shadcn (`app/styles/ui-theme-lime.css`).
- **Toggle:** Pengaturan → Profil & sandi → bagian **Tampilan**. Pilihan disimpan di `localStorage` (`kokonus-ui-theme`).

Ini **bukan** migrasi penuh ke `@/components/lime/*` (Tailwind v4 + portal Lime). Skill agent disalin untuk referensi saat eksperimen UI.

## Sinkron skill lokal

```bash
bash scripts/bootstrap-arla6ka-design-skills.sh
```

Hasil: skill **arla6ka/skills** (6 skill), `vendor/design/lime/`, `.agents/skills/lime/`, `docs/skills/kokonus/lime-preview/SKILL.md` → `.agents/skills/kokonus/lime-preview/` (gitignore).
