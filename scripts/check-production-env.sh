#!/usr/bin/env bash
# T5.6 — pastikan contoh env tidak mengaktifkan audit bypass (production hygiene).
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"
npm run check:audit-env
echo "check-production-env: ok (audit bypass tidak di file tracked / CI)"
