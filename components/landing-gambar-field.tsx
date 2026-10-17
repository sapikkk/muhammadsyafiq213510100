"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type Props = {
  name: string;
  label: string;
  defaultValue: string;
  required?: boolean;
};

export function LandingGambarField({ name, label, defaultValue, required }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setBusy(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/landing/gambar?filename=${encodeURIComponent(file.name)}`,
        {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        },
      );
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Unggah gagal.");
      } else {
        setValue(data.url);
      }
    } catch {
      setError("Jaringan gagal. Coba lagi.");
    }
    setBusy(false);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        required={required}
      />
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex min-h-11 cursor-pointer items-center rounded-md border border-input px-3 text-sm hover:bg-muted/50">
          {busy ? "Mengunggah…" : "Unggah file"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            disabled={busy}
            onChange={onPickFile}
          />
        </label>
        <span className="text-xs text-muted-foreground">Maks 4 MB · Blob SIN1 · atau path/URL</span>
      </div>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt="" src={value} className="mt-1 h-16 max-w-full rounded border object-cover" />
      ) : null}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
