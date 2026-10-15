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

## Implementasi saat ini (bukan migrasi penuh)

- Preview global: `app/styles/ui-theme-lime.css` memetakan token → variabel shadcn (Tailwind v3).
- Komponen `@/components/lime/*` dari design.how **belum** wajib; tambah hanya jika PO setuju migrasi bertahap.
- Uji preview: toggle Lime → buka beberapa halaman; matikan → wireframe identik seperti sebelum toggle.

## Agent

- Task **UI baru / polish Lime**: baca `vendor/design/lime/SKILL.md`, gunakan `ui-review` sebelum selesai.
- Task **wireframe / bug / default**: hanya `ui-ringkas`, abaikan Lime.
