#!/usr/bin/env bash
# Pasang milestone Sprint 1–5 ke issue (butuh gh auth). Jalankan setelah milestone dibuat.
set -euo pipefail
REPO=sapikkk/muhammadsyafiq213510100

M1="Sprint 1 — Fondasi"
M2="Sprint 2 — Operasi"
M3="Sprint 3 — Penjualan"
M4="Sprint 4 — Laporan"
M5="Sprint 5 — QA"

for i in 2 3 4 5 6 7 8 9; do gh issue edit "$i" --repo "$REPO" --milestone "$M1" --add-label "sprint-1"; done
for i in 11 12 13 14 15 17 18 19 20 21 22 23 24 25 26 27 28; do gh issue edit "$i" --repo "$REPO" --milestone "$M2" --add-label "sprint-2"; done
for i in 29 30 31 32 33; do gh issue edit "$i" --repo "$REPO" --milestone "$M3" --add-label "sprint-3"; done
for i in 10 16 34 35 36 37 38; do gh issue edit "$i" --repo "$REPO" --milestone "$M4" --add-label "sprint-4"; done
for i in 39 40 41 42 43 44 45; do gh issue edit "$i" --repo "$REPO" --milestone "$M5" --add-label "sprint-5"; done

echo "Milestone assigned."
