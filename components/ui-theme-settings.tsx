"use client";

import Link from "next/link";
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
    label: "Lime (contoh)",
    hint: "Hangat, aksen lime — pratinjau sistem design.how / arla6ka.",
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
          Lime hanya contoh. Matikan untuk kembali ke wireframe lo-fi.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap" role="group" aria-label="Pilih tema tampilan">
        {OPTIONS.map((opt) => {
          const active = theme === opt.id;
          return (
            <Button
              key={opt.id}
              type="button"
              variant={active ? "default" : "outline"}
              className="h-auto min-h-11 w-full flex-col items-start gap-0.5 px-3 py-2 text-left sm:max-w-xs sm:flex-1"
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
        Referensi skill:{" "}
        <Link
          href="https://github.com/arla6ka/skills/tree/main/systems/lime"
          className="font-medium text-primary underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          arla6ka/skills — Lime
        </Link>
        . Skill agent: `npx skills add arla6ka/skills` + `docs/skills/kokonus/lime-preview/SKILL.md`. Wireframe lo-fi tidak berubah saat Lime mati.
      </p>
    </section>
  );
}
