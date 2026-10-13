"use client";

import type { ExportDocument } from "@/lib/export-document-types";

export function EksporPratinjauTabel({ doc }: { doc: ExportDocument | null }) {
  if (!doc) {
    return (
      <p className="text-sm text-muted-foreground">Pratinjau belum dimuat. Tekan «Lihat pratinjau».</p>
    );
  }

  return (
    <div className="max-h-64 space-y-4 overflow-auto rounded-md border p-3 text-sm">
      <div>
        <p className="font-medium">{doc.title}</p>
        {doc.subtitleLines?.map((line) => (
          <p key={line} className="text-muted-foreground">
            {line}
          </p>
        ))}
      </div>
      {doc.sections.map((sec, i) => (
        <div key={sec.title ?? i}>
          {sec.title ? <p className="mb-1 font-medium">{sec.title}</p> : null}
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b">
                {sec.headers.map((h) => (
                  <th key={h} className="py-1 pr-2 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sec.rows.slice(0, 12).map((row, ri) => (
                <tr key={ri} className="border-b border-dashed">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-1 pr-2 align-top text-muted-foreground">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {sec.rows.length > 12 ? (
            <p className="mt-1 text-xs text-muted-foreground">
              … {sec.rows.length - 12} baris lagi di file unduhan.
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
