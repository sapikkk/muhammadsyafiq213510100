import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = { params: { id: string } };

export default async function EmbedKartuPage({ params }: Props) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const row = await prisma.landing_Kartu.findFirst({
    where: { id, aktif: true, embedAktif: true },
  });
  if (!row) notFound();

  return (
    <div
      className="flex min-h-[280px] max-w-[420px] flex-col overflow-hidden border border-neutral-200 bg-white font-sans text-neutral-900"
      style={{ margin: 0 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={row.gambar} className="h-44 w-full object-cover" />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-base font-semibold leading-snug">{row.judul}</p>
        {row.teks ? <p className="text-xs leading-relaxed text-neutral-600">{row.teks}</p> : null}
        <p className="mt-auto pt-2 text-[10px] uppercase tracking-wide text-neutral-400">Kokonus Farm</p>
      </div>
    </div>
  );
}
