"use client";

import type { ExportDocument } from "@/lib/export-document-types";
import { normalizeExportDocument } from "@/lib/export-align";
import { cn } from "@/lib/utils";

export function EksporPratinjauTabel({ doc }: { doc: ExportDocument | null }) {
  if (!doc) {
    return (
      <p className="text-sm text-muted-foreground">Pratinjau belum dimuat. Tekan «Lihat pratinjau».</p>
    );
  }

  const normalized = normalizeExportDocument(doc);

  return (
    <div
      className={cn(
        "h-full min-h-[14rem] max-h-[min(52vh,36rem)] space-y-4 overflow-auto rounded-md border bg-muted/15 p-4 text-sm",
      )}
    >
      <div>
        <p className="text-base font-semibold">{normalized.title}</p>
        {normalized.subtitleLines?.map((line) => (
          <p key={line} className="text-sm text-muted-foreground">
            {line}
          </p>
        ))}
      </div>
      {normalized.sections.map((sec, i) => {
        const right = new Set(sec.alignRight ?? []);
        return (
        <div key={sec.title ?? i} className="overflow-x-auto">
          {sec.title ? <p className="mb-2 font-medium">{sec.title}</p> : null}
          <table className="w-full min-w-max border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                {sec.headers.map((h, ci) => (
                  <th
                    key={h}
                    className={cn(
                      "whitespace-nowrap px-2 py-2 pr-4 font-medium",
                      right.has(ci) ? "text-right tabular-nums" : "text-left",
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sec.rows.slice(0, 12).map((row, ri) => (
                <tr key={ri} className="border-b border-dashed">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={cn(
                        "whitespace-nowrap px-2 py-1.5 pr-4 align-top text-muted-foreground",
                        right.has(ci) ? "text-right tabular-nums" : "text-left",
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {sec.rows.length > 12 ? (
            <p className="mt-2 text-xs text-muted-foreground">
              … {sec.rows.length - 12} baris lagi di file unduhan.
            </p>
          ) : null}
        </div>
        );
      })}
    </div>
  );
}
