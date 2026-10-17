"use client";

import Link from "next/link";
import { KokonusLimeContoh } from "@/components/kokonus-lime-contoh";
import { Button } from "@/components/ui/button";
import { useUiTheme } from "@/components/ui-theme-provider";
import type { UiThemeId } from "@/lib/ui-theme";

const OPTIONS: { id: UiThemeId; label: string; hint: string }[] = [
  {
    id: "wireframe",
    label: "Wireframe lo-fi",
    hint: "Monokrom, sudut tajam — tampilan Kokonus bawaan.",
  },
  {
    id: "lime",
    label: "Lime Kokonus",
    hint: "Hijau farm, aksen lime, sudut lembut — selaras Figma & brand.",
  },
];

export function UiThemeSettings() {
  const { theme, setTheme } = useUiTheme();

  return (
    <section aria-labelledby="tampilan-title" className="space-y-3">
      <div>
        <h2 id="tampilan-title" className="text-lg font-semibold">
          Tampilan
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Wireframe monokrom untuk kerja harian. Lime memakai token brand yang sama di semua halaman.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Pilih tema tampilan">
        {OPTIONS.map((opt) => {
          const active = theme === opt.id;
          return (
            <Button
              key={opt.id}
              type="button"
              variant={active ? "default" : "outline"}
              className="h-auto min-h-11 w-full flex-col items-start gap-0.5 px-3 py-2 text-left whitespace-normal"
              aria-pressed={active}
              onClick={() => setTheme(opt.id)}
            >
              <span className="text-sm font-semibold">{opt.label}</span>
              <span
                className={
                  active ? "text-xs font-normal text-primary-foreground/85" : "text-xs font-normal text-muted-foreground"
                }
              >
                {opt.hint}
              </span>
            </Button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Referensi:{" "}
        <Link
          href="https://design.how/systems/lime"
          className="font-medium text-primary underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          design.how — Lime
        </Link>
        , skill agent di `.agents/skills/lime/`. Grafik produksi tetap monokrom (`lib/chart-monochrome.ts`) di wireframe.
      </p>

      <KokonusLimeContoh />
    </section>
  );
}
