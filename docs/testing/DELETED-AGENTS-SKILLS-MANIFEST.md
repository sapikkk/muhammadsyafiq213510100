# Daftar `SKILL.md` yang hilang saat hapus `.agents/` (2026-10-10)

Folder **`/Users/mpik/muhammadsyafiq213510100/.agents/skills/`** dihapus saat bersih-bersih cache (~742 MB). **Tidak ada salinan di git** (`.gitignore`: `.agents/`). Daftar di bawah = **rekonstruksi** dari:

1. Perintah resmi repo: `npx skills add openaccountant/skills -y` (44 skill flat).
2. Skill yang terdaftar di Cursor untuk proyek ini sebelum hapus (Ponytail, antislop, ui-craft, finance-skills monorepo, Playwright, sw-agiledevelopment, emilkowalski, whiteboard, dll.).

**Tidak dihapus (masih ada):**

| Lokasi | Contoh |
|--------|--------|
| `.cursor/rules/graphify.mdc` | Rule Graphify |
| `.cursor/skills/agent-skills-platform/**` | Platform + contoh skill |
| `docs/skills/akuntansi-hidroponik/SKILL.md` | Skill domain (di-commit) |

---

## A. OpenAccountant / keuangan (restore: `npx skills add openaccountant/skills -y`)

Path relatif: `.agents/skills/<nama>/SKILL.md`

```
bank-sync
break-even-calc
cash-flow-forecast
charitable-giving
client-profitability
contractor-tracking
custom-report
debt-payoff
depreciation-schedule
emergency-fund
expense-optimizer
financial-goals
home-office-deduction
import-transactions
insurance-audit
invoice-aging
lifestyle-creep
mileage-tracker
month-end-close
monthly-digest
multi-entity
net-worth
paypal-import
pricing-optimizer
profit-loss
quarterly-taxes
rental-property
revenue-concentration
runway-calculator
sales-tax-nexus
seasonal-patterns
smart-categorize
smart-split
spending-review
square-import
state-tax-estimator
stripe-import
subscription-audit
tax-penalty-calc
tax-prep
venmo-reconciler
wise-import
year-end-summary
zero-based-budget
```

---

## B. Skill proyek / Ponytail / UI / antislop (sumber install tidak tercatat di repo)

Path relatif di bawah `.agents/skills/` (satu folder = satu `SKILL.md` kecuali disebut nested):

```
adapt/SKILL.md
akuntansi-hidroponik/SKILL.md          # salinan/symlink ke docs/skills (sering di .agents)
animate/SKILL.md
antislop/SKILL.md
antislop-code/SKILL.md
antislop-copywriting/SKILL.md
antislop-human/SKILL.md
antislop-layoutmobile/SKILL.md
antislop-ui/SKILL.md
audit/SKILL.md
bolder/SKILL.md
brief/SKILL.md
clarify/SKILL.md
code-review-skill/SKILL.md
colorize/SKILL.md
craft/SKILL.md
critique/SKILL.md
delight/SKILL.md
distill/SKILL.md
extract/SKILL.md
finalize/SKILL.md
friction-log/SKILL.md
hallmark/SKILL.md
harden/SKILL.md
heuristic/SKILL.md
polish/SKILL.md
ponytail/SKILL.md
ponytail-audit/SKILL.md
ponytail-debt/SKILL.md
ponytail-gain/SKILL.md
ponytail-help/SKILL.md
ponytail-review/SKILL.md
quieter/SKILL.md
redesign/SKILL.md
remember/SKILL.md
sddesign/SKILL.md
shape/SKILL.md
start/SKILL.md
tokens/SKILL.md
typeset/SKILL.md
ui-craft/SKILL.md
ui-craft-dense-dashboard/SKILL.md
ui-craft-editorial/SKILL.md
ui-craft-minimal/SKILL.md
unhappy/SKILL.md
```

---

## C. `emilkowalski-skills` (nested)

```
emilkowalski-skills/skills/animate-expo/SKILL.md
emilkowalski-skills/skills/animate/SKILL.md
emilkowalski-skills/skills/animation-vocabulary/SKILL.md
emilkowalski-skills/skills/apple-design/SKILL.md
emilkowalski-skills/skills/ask-sonner/SKILL.md
emilkowalski-skills/skills/break-ui/SKILL.md
emilkowalski-skills/skills/emil-design-eng/SKILL.md
emilkowalski-skills/skills/find-animation-opportunities/SKILL.md
emilkowalski-skills/skills/improve-animations/SKILL.md
emilkowalski-skills/skills/mobile-native/SKILL.md
emilkowalski-skills/skills/write-swift/SKILL.md
```

---

## D. `finance-skills` (monorepo — banyak path nested)

```
finance-skills/plugins/data-providers/skills/finance-sentiment/SKILL.md
finance-skills/plugins/data-providers/skills/fintel-data/SKILL.md
finance-skills/plugins/data-providers/skills/hormuz-strait/SKILL.md
finance-skills/plugins/data-providers/skills/hyperliquid-reader/SKILL.md
finance-skills/plugins/data-providers/skills/tradingview-mcp/SKILL.md
finance-skills/plugins/data-providers/skills/tradingview-reader/SKILL.md
finance-skills/plugins/market-analysis/skills/company-valuation/SKILL.md
finance-skills/plugins/market-analysis/skills/earnings-preview/SKILL.md
finance-skills/plugins/market-analysis/skills/earnings-recap/SKILL.md
finance-skills/plugins/market-analysis/skills/estimate-analysis/SKILL.md
finance-skills/plugins/market-analysis/skills/etf-premium/SKILL.md
finance-skills/plugins/market-analysis/skills/options-payoff/SKILL.md
finance-skills/plugins/market-analysis/skills/saas-valuation-compression/SKILL.md
finance-skills/plugins/market-analysis/skills/sepa-strategy/SKILL.md
finance-skills/plugins/market-analysis/skills/stock-correlation/SKILL.md
finance-skills/plugins/market-analysis/skills/stock-liquidity/SKILL.md
finance-skills/plugins/market-analysis/skills/yfinance-data/SKILL.md
finance-skills/plugins/social-readers/skills/discord-reader/SKILL.md
finance-skills/plugins/social-readers/skills/linkedin-reader/SKILL.md
finance-skills/plugins/social-readers/skills/opencli-reader/SKILL.md
finance-skills/plugins/social-readers/skills/telegram-reader/SKILL.md
finance-skills/plugins/social-readers/skills/twitter-reader/SKILL.md
finance-skills/plugins/social-readers/skills/yc-reader/SKILL.md
finance-skills/plugins/skill-creator/skills/skill-creator/SKILL.md
finance-skills/plugins/startup-tools/skills/startup-analysis/SKILL.md
finance-skills/plugins/ui-tools/skills/generative-ui/SKILL.md
```

---

## E. Playwright (`@playwright` tools skills)

```
playwright/packages/playwright-core/src/tools/skills/playwright-cli/SKILL.md
playwright/packages/playwright-core/src/tools/skills/playwright-component-testing/SKILL.md
playwright/packages/playwright-core/src/tools/skills/playwright-trace/SKILL.md
```

---

## F. `sw-agiledevelopment`

```
sw-agiledevelopment/sw-code-review/SKILL.md
sw-agiledevelopment/sw-execute-plan/SKILL.md
sw-agiledevelopment/sw-finishing-branch/SKILL.md
sw-agiledevelopment/sw-parallel-debugging/SKILL.md
sw-agiledevelopment/sw-requirements-clarification/SKILL.md
sw-agiledevelopment/sw-subagent-development/SKILL.md
sw-agiledevelopment/sw-systematic-debugging/SKILL.md
sw-agiledevelopment/sw-task-verification/SKILL.md
sw-agiledevelopment/sw-technical-spec/SKILL.md
sw-agiledevelopment/sw-test-driven-dev/SKILL.md
sw-agiledevelopment/sw-using-agiledevelopment/SKILL.md
sw-agiledevelopment/sw-working-plan/SKILL.md
sw-agiledevelopment/sw-writing-skills/SKILL.md
```

---

## G. Whiteboard

```
whiteboard/packages/agent-plugins/pi/skills/whiteboard/SKILL.md
```

---

## Restore minimal (dokumentasi repo)

```bash
cd /Users/mpik/muhammadsyafiq213510100
npx skills add openaccountant/skills -y
# → 44 skill di .agents/skills/
```

Skill **B–G** perlu di-install ulang dari sumber asli (marketplace / `npx skills add <repo>` / clone manual) — **URL asli tidak tercatat** di git. Cek riwayat shell lokal atau catatan pribadi jika pernah menambahkan Ponytail / finance-skills / Playwright.

**Domain (tetap di repo):** `docs/skills/akuntansi-hidroponik/SKILL.md` — tidak ikut terhapus.

Terakhir diperbarui: **2026-10-10**.
