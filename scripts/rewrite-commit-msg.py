#!/usr/bin/env python3
"""Git --msg-filter: profesionalkan pesan commit (stdin → stdout)."""
import sys

msg = sys.stdin.read()
replacements = [
    ("tanpa konteks sidang/skripsi", "tona Panduan untuk produk"),
    ("start the thesis app", "scaffold aplikasi Kokonus Farm"),
    ("thesis app", "Kokonus Farm app"),
    ("sidang/skripsi", "jargon akademik"),
    (" sidang ", " presentasi "),
    (" skripsi", " dokumentasi capstone"),
    ("Skripsi", "Dokumentasi capstone"),
    ("thesis", "capstone"),
]
for old, new in replacements:
    if old in msg:
        msg = msg.replace(old, new)
sys.stdout.write(msg)
