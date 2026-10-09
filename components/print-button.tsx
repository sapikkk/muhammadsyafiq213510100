"use client";

export function PrintButton({ label = "Cetak" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-9 items-center rounded-md bg-primary px-3 text-sm text-primary-foreground"
    >
      {label}
    </button>
  );
}
