# Agent runbook — global audit (Kokonus Farm)

Branch kerja: `chore/global-audit-bw-refactor`. Jangan merge ke `main` tanpa PO.

## Sebelum menyentuh kode

1. `graphify query "<pertanyaan>"` — wajib (`.cursor/rules/graphify.mdc`).
2. Baca `docs/audit/00-inventory.md` + `01-baseline.md`.
3. Lokal: `AUDIT_BYPASS_RBAC=true` di `.env` (huruf kecil), restart `npm run dev`.
4. Verifikasi sidebar **Menu (audit)**.

## Per sesi agent (1–3 jam)

| Step | Perintah / aksi |
|------|------------------|
| Baseline | `npm run typecheck && npm run lint && npm run check:audit-env && npm run check:banned-ui` |
| Scope | Satu prefix: `/owner/*`, `/admin/*`, atau `/petani/*` — jangan seluruh repo sekaligus |
| Browser | Buka tiap route inventory; 360 / 768 / 1280; catat Pass/Fail |
| Backend | `graphify path "<page>" "<lib>"`; uji API dengan session yang sama (bypass on/off) |
| Fix | Commit kecil: `fix(audit): …`, `style(audit): …`, `docs(audit): …` |
| Graph | Setelah edit TS: `graphify update .` |

## Format temuan (`docs/audit/frontend.md` / `backend.md`)

```markdown
| Sev | Route / endpoint | File | Temuan | Fix |
|-----|------------------|------|--------|-----|
| High | /owner/akun | lib/akun.ts | Decimal ke client | buildClientTree |
```

Severity: **Critical** (data/security), **High** (crash/hydration), **Medium** (UX/RBAC drift), **Low** (copy/spacing).

## Checklist per halaman

- Sidebar + header (`RoleHome`)
- Tanpa shadow/gradient (`check:banned-ui`)
- CRUD: submit → toast (`lib/notify`) → data refresh
- Error: tidak white screen; `error.tsx` / pesan server
- RBAC: bypass **off** → uji satu flow forbidden

## Larangan

- Commit `AUDIT_BYPASS_RBAC=true`
- Hapus/short-circuit RBAC produksi
- Force-push; amend commit yang sudah di-push
- Refactor DataTable + toaster + layout sekaligus (pecah PR)

## Selesai sprint audit

- `docs/audit/SUMMARY.md` — Done/Partial/Blocked per fase master prompt
- Bypass off di `.env` lokal
- `npm run build` clean
- Opsional: perluas `e2e/` untuk 1 flow CRUD per entitas kritikal

## Cursor / jaringan (proxy)

Jika **Network Diagnostics → Agent/Chat Failed** (HTTP/2 proxy): agent cloud/streaming bisa putus; audit **lokal** (build, Playwright, edit file) tetap jalan. Gunakan agent di mesin dev atau VPN/proxy yang mendukung bidirectional streaming.
