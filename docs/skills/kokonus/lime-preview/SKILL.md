# Lime preview (Kokonus)

Tema **contoh** [Lime](https://github.com/arla6ka/skills/tree/main/systems/lime) — hanya saat pengguna memilih **Lime (contoh)** di Pengaturan → Tampilan (`localStorage`: `kokonus-ui-theme=lime`).

## Dua mode (jangan campur)

| Mode | `html` | Skill UI |
|------|--------|----------|
| **Wireframe lo-fi** (default produksi) | `data-ui-theme="wireframe"` | [`ui-ringkas/SKILL.md`](../ui-ringkas/SKILL.md) — monokrom, radius 0, shadcn `@/components/ui/*` |
| **Lime preview** | `data-ui-theme="lime"` + `data-system="lime"` | Skill Lime upstream + arla6ka di bawah |

**Jangan** mengubah wireframe saat memperbaiki Lime. **Jangan** menaruh kelas `lime`, token `--accent` Lime, atau gaya hangat ke komponen bawaan kecuali dibungkus `[data-ui-theme="lime"]` / variabel shadcn yang sudah di-override di `app/styles/ui-theme-lime.css`.

## Skill arla6ka (mesin lokal)

Pasang / refresh:

```bash
npx skills add arla6ka/skills -y
bash scripts/sync-lime-design-skill.sh
bash scripts/sync-agent-skills.sh
```

| Skill | Kapan |
|-------|--------|
| `vendor/design/lime/SKILL.md` → `.agents/skills/lime` | Aturan komponen & token Lime asli |
| `build-design-system`, `token-mapping`, `ui-review`, `component-docs`, `migrate-design-system`, `design-system-boss` | Audit, mapping token, review layar Lime |
| `ui-ringkas` | Tetap untuk copy ID dan wireframe |

## Implementasi saat ini (migrasi bertahap)

- **Theme resmi:** `npx shadcn@latest add https://design.how/r/lime/theme.json` → `components/lime/{tokens,base,styles}.css`, `lib/lime/portal.tsx`, import `@/components/lime/styles.css` di `app/layout.tsx`.
- **Tailwind v4** + `@tailwindcss/postcss` (app shadcn); utilitas Lime hanya di dalam `.lime` / `[data-system="lime"]`.
- **Jembatan shadcn:** `app/styles/ui-theme-lime.css` (variabel HSL saat `data-ui-theme="lime"`).
- **Komponen:** `@/components/lime/*` (contoh: `blocks/settings-rules`, `ui/list`, `ui/switch`, `ai/autonomy-rule`). Pratinjau: `components/kokonus-lime-contoh.tsx` di Pengaturan → Tampilan.
- **Grafik:** wireframe tetap `lib/chart-monochrome.ts` (grayscale); tidak diubah saat Lime preview.
- **Lint Lime (opsional):** `npx shadcn@latest add https://design.how/r/lime/lint.json` lalu `npx eslint -c lime.eslint.config.mjs .`
- Uji: toggle Lime → Pengaturan + beberapa halaman shadcn; matikan → wireframe monokrom, radius 0.

## Agent

- Task **UI baru / polish Lime**: baca `vendor/design/lime/SKILL.md`, gunakan `ui-review` sebelum selesai.
- Task **wireframe / bug / default**: hanya `ui-ringkas`, abaikan Lime.
