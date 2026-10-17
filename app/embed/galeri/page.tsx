import Link from "next/link";
import { listLandingKartuEmbed } from "@/lib/landing";

export default async function EmbedGaleriPage() {
  const cards = await listLandingKartuEmbed();

  return (
    <main className="min-h-dvh bg-background p-4 font-sans text-foreground">
      <h1 className="text-lg font-semibold">Kartu siap embed</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Centang &quot;Siap embed&quot; di Pengaturan → Landing. Tempel iframe ke sosmed atau situs lain.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const src = `/embed/kartu/${c.id}`;
          return (
            <li key={c.id} className="space-y-2 rounded border border-border p-3">
              <p className="text-sm font-medium">{c.judul}</p>
              <code className="block break-all text-xs text-muted-foreground">{`<iframe src="${src}" ... />`}</code>
              <Link href={src} className="text-xs font-medium underline" target="_blank" rel="noopener noreferrer">
                Pratinjau
              </Link>
            </li>
          );
        })}
      </ul>
      {cards.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Belum ada kartu embed aktif.</p>
      ) : null}
    </main>
  );
}
