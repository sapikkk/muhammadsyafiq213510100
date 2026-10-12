#!/usr/bin/env python3
"""Hapus description / flowSteps / listDescription dari props CrudPageLayout saja."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "app"

SKIP_FILES = {
    APP / "admin/jurnal/page.tsx",  # listDescription = ringkasan filter aktif
}


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


def strip_crud_header(content: str) -> str:
    marker = "<CrudPageLayout"
    idx = content.find(marker)
    if idx == -1:
        return content
    close_idx = content.find("\n    />", idx)
    if close_idx == -1:
        close_idx = content.find("\n    >", idx)
    if close_idx == -1:
        return content
    block = content[idx:close_idx]
    for prop in ("flowSteps", "listDescription", "description", "createDescription"):
        block = remove_prop(block, prop)
    return content[:idx] + block + content[close_idx:]


def main() -> int:
    changed: list[Path] = []
    for path in sorted(APP.rglob("page.tsx")):
        if path in SKIP_FILES:
            continue
        original = path.read_text(encoding="utf-8")
        if "<CrudPageLayout" not in original:
            continue
        text = strip_crud_header(original)
        if text != original:
            path.write_text(text, encoding="utf-8")
            changed.append(path)
    for p in changed:
        print(p.relative_to(ROOT))
    print(f"Updated {len(changed)} files", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
