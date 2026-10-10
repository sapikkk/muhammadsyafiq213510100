#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

fail=0
for file in $(grep -rl '"use client"' app components --include='*.tsx' --include='*.ts' 2>/dev/null || true); do
  bad=$(grep -E 'from "@/lib/(prisma|inventaris|jurnal|varietas|active-pack|tugas-petani|monitor-produksi|log-kegagalan|susut|siklus-produksi|auth|cached-queries|pack-kapasitas-lubang)"' "$file" 2>/dev/null | grep -v 'import type' || true)
  if [[ -n "$bad" ]]; then
    echo "CLIENT PRISMA LEAK: $file"
    echo "$bad"
    fail=1
  fi
done

if [[ "$fail" -ne 0 ]]; then
  echo "Gunakan lib/*-types.ts, *-labels.ts, pack-kapasitas-lubang-math.ts"
  exit 1
fi
echo "check-client-prisma: OK"
