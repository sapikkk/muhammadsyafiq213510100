#!/usr/bin/env python3
"""Hapus prop eyebrow= dari app/ dan components/ (layout lebih jelas via sidebar + judul)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGETS = [ROOT / "app", ROOT / "components"]


def find_matching_brace(s: str, start: int) -> int:
    depth = 0
    i = start
    in_str = None
    escape = False
    while i < len(s):
        c = s[i]
        if in_str:
            if escape:
                escape = False
            elif c == "\\":
                escape = True
            elif c == in_str:
                in_str = None
            i += 1
            continue
        if c in ("'", '"', "`"):
            in_str = c
            i += 1
            continue
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    raise ValueError("unbalanced braces")


def remove_prop(content: str, prop: str) -> str:
    pattern = re.compile(rf"\s+{re.escape(prop)}=")
    while True:
        m = pattern.search(content)
        if not m:
            break
        start = m.start()
        i = m.end()
        if i >= len(content):
            break
        if content[i] == '"':
            end = content.find('"', i + 1)
            if end == -1:
                break
            content = content[:start] + content[end + 1 :]
            continue
        if content[i] == "{":
            end = find_matching_brace(content, i)
            content = content[:start] + content[end:]
            continue
        break
    return content


def strip_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    if "eyebrow=" not in text:
        return False
    new = remove_prop(text, "eyebrow")
    if new != text:
        path.write_text(new, encoding="utf-8")
        return True
    return False


def main() -> int:
    changed = 0
    for base in TARGETS:
        for path in base.rglob("*.tsx"):
            if strip_file(path):
                print(path.relative_to(ROOT))
                changed += 1
    print(f"strip-page-eyebrows: {changed} file(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
