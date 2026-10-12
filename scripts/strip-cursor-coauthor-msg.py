#!/usr/bin/env python3
"""Git --msg-filter: hapus trailer Co-authored-by Cursor (stdin → stdout)."""
import sys

CURSOR_TRAILERS = frozenset(
    {
        "Co-authored-by: Cursor <cursoragent@cursor.com>",
        "Co-Authored-By: Cursor <cursoragent@cursor.com>",
    }
)


def strip(msg: str) -> str:
    lines = msg.splitlines()
    kept = [
        ln
        for ln in lines
        if ln.strip() not in CURSOR_TRAILERS
        and not (
            ln.strip().lower().startswith("co-authored-by:")
            and "cursoragent@cursor.com" in ln.lower()
        )
    ]
    out = "\n".join(kept)
    if kept and msg.endswith("\n"):
        out += "\n"
    return out


if __name__ == "__main__":
    sys.stdout.write(strip(sys.stdin.read()))
