"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useFormState } from "react-dom";
import type { Landing_Konten } from "@prisma/client";
import {
  deleteLandingKartu,
  moveLandingKartu,
  saveLandingKartu,
  saveLandingKonten,
} from "@/app/actions/landing";
import {
  LANDING_BAGIAN,
  LANDING_BAGIAN_LABEL,
  type LandingBagianId,
} from "@/lib/landing-bagian";
import type { LandingKartuView } from "@/lib/landing";
import { LandingGambarField } from "@/components/landing-gambar-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  konten: Landing_Konten;
  kartu: LandingKartuView[];
};

const initial: { error?: string; ok?: string } = {};

export function LandingPengaturanPanel({ konten, kartu }: Props) {
  const [bagian, setBagian] = useState<LandingBagianId>("FACILITIES");
  const [editId, setEditId] = useState<number | null>(null);
  const [kontenState, kontenAction] = useFormState(saveLandingKonten, initial);
  const [kartuState, kartuAction] = useFormState(saveLandingKartu, initial);

  const filtered = useMemo(
    () => kartu.filter((k) => k.bagian === bagian).sort((a, b) => a.urutan - b.urutan),
    [kartu, bagian],
  );

  const editing = editId != null ? filtered.find((k) => k.id === editId) : null;

  const totalKartu = kartu.length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" type="button">
          <Link href="/" target="_blank" rel="noopener noreferrer">
            Lihat landing
          </Link>
        </Button>
        <Button asChild variant="outline" type="button">
          <Link href="/tentang" target="_blank" rel="noopener noreferrer">
            Lihat tentang kami
          </Link>
        </Button>
        <Button asChild variant="outline" type="button">
          <Link href="/embed/galeri" target="_blank" rel="noopener noreferrer">
            Kartu embed
          </Link>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Total <strong>{totalKartu}</strong> kartu di database. Tiap bagian (mis. Modul fasilitas) bisa
        puluhan kartu — pakai <strong>Tambah kartu</strong>, bukan hanya empat gambar hero di bawah. Unggah
        via Blob atau path <code className="text-xs">/landing/…</code>. Bagian &quot;Stok kartu sosmed&quot; untuk
        iframe embed; &quot;Tentang kami&quot; untuk halaman <code className="text-xs">/tentang</code>.
      </p>

      <details className="group rounded-lg border bg-card" >
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-4 py-3 text-base font-semibold [&::-webkit-details-marker]:hidden">
          <span>Teks & gambar utama</span>
          <span className="text-sm text-muted-foreground group-open:rotate-180" aria-hidden="true">⌄</span>
        </summary>
        <form action={kontenAction} className="flex flex-col gap-4 border-t p-4">
        <Field label="Judul hero" name="heroJudul" defaultValue={konten.heroJudul} />
        <Field label="Lead hero" name="heroLead" defaultValue={konten.heroLead} textarea />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tombol hero" name="heroCta" defaultValue={konten.heroCta} />
          <LandingGambarField
            label="Gambar latar hero"
            name="heroGambarLatar"
            defaultValue={konten.heroGambarLatar}
          />
          <LandingGambarField
            label="Gambar pratinjau hero"
            name="heroGambarPratinjau"
            defaultValue={konten.heroGambarPratinjau}
          />
          <LandingGambarField
            label="Gambar panel gelap"
            name="fundraisingGambarGelap"
            defaultValue={konten.fundraisingGambarGelap}
          />
        </div>
        <Field label="Judul tim (athlete)" name="athleteJudul" defaultValue={konten.athleteJudul} />
        <Field label="Teks tim" name="athleteTeks" defaultValue={konten.athleteTeks} />
        <LandingGambarField label="Gambar tim" name="athleteGambar" defaultValue={konten.athleteGambar} />
        <Field
          label="Judul statistik"
          name="verificationJudul"
          defaultValue={konten.verificationJudul}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Stat fundraising" name="fundraisingStat" defaultValue={konten.fundraisingStat} />
          <Field
            label="Catatan fundraising"
            name="fundraisingCatatan"
            defaultValue={konten.fundraisingCatatan}
          />
          <Field
            label="Judul panel gelap"
            name="fundraisingJudulGelap"
            defaultValue={konten.fundraisingJudulGelap}
          />
          <Field label="Tombol fundraising" name="fundraisingTombol" defaultValue={konten.fundraisingTombol} />
        </div>
        <Field
          label="Teks panel gelap"
          name="fundraisingTeksGelap"
          defaultValue={konten.fundraisingTeksGelap}
          textarea
        />
        <Field
          label="Judul footer"
          name="footerJudul"
          defaultValue={konten.footerJudul}
          hint='Pill hijau: bungkus kata dengan {{teks}}, mis. Kebun {{hidroponik}} untuk tim.'
        />
        <Field label="Teks footer" name="footerTeks" defaultValue={konten.footerTeks} textarea />
        {kontenState.error ? <p className="text-sm text-destructive">{kontenState.error}</p> : null}
        {kontenState.ok ? <p className="text-sm text-muted-foreground">{kontenState.ok}</p> : null}
        <Button type="submit" className="w-fit">
          Simpan teks
        </Button>
        </form>
      </details>

      <div className="flex flex-col gap-4 rounded-lg border p-4">
        <h2 className="text-base font-semibold">
          Kartu per bagian ({filtered.length} / {totalKartu})
        </h2>
        <label htmlFor="bagian-pilih" className="text-sm font-medium">
          Bagian
        </label>
        <select
          id="bagian-pilih"
          className="h-11 max-w-md rounded-md border border-input bg-background px-3 text-sm"
          value={bagian}
          onChange={(e) => {
            setBagian(e.target.value as LandingBagianId);
            setEditId(null);
          }}
        >
          {LANDING_BAGIAN.map((b) => (
            <option key={b} value={b}>
              {LANDING_BAGIAN_LABEL[b]}
            </option>
          ))}
        </select>

        <ul className="flex flex-col gap-2">
          {filtered.map((k) => (
            <li
              key={k.id}
              className="flex flex-wrap items-center gap-2 rounded-md border px-3 py-2 text-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={k.gambar} className="size-10 rounded object-cover" />
              <span className="min-w-0 flex-1 font-medium">{k.judul || "(avatar)"}</span>
              <Button type="button" variant="outline" size="sm" onClick={() => setEditId(k.id)}>
                Ubah
              </Button>
              <form
                action={async (fd) => {
                  await moveLandingKartu(fd);
                }}
              >
                <input type="hidden" name="id" value={k.id} />
                <input type="hidden" name="dir" value="up" />
                <Button type="submit" variant="ghost" size="sm">
                  ↑
                </Button>
              </form>
              <form
                action={async (fd) => {
                  await moveLandingKartu(fd);
                }}
              >
                <input type="hidden" name="id" value={k.id} />
                <input type="hidden" name="dir" value="down" />
                <Button type="submit" variant="ghost" size="sm">
                  ↓
                </Button>
              </form>
              <form
                action={async (fd) => {
                  await deleteLandingKartu(fd);
                }}
              >
                <input type="hidden" name="id" value={k.id} />
                <Button type="submit" variant="outline" size="sm" className="text-destructive">
                  Hapus
                </Button>
              </form>
            </li>
          ))}
        </ul>

        <form action={kartuAction} className="mt-2 flex flex-col gap-3 border-t pt-4">
          <h3 className="text-sm font-semibold">{editing ? "Ubah kartu" : "Tambah kartu"}</h3>
          <input type="hidden" name="bagian" value={bagian} />
          {editing ? <input type="hidden" name="id" value={editing.id} /> : <input type="hidden" name="aktif" value="true" />}
          <Field label="Judul" name="judul" defaultValue={editing?.judul ?? ""} />
          <Field label="Meta (link footer / angka stat / varian kartu)" name="meta" defaultValue={editing?.meta ?? ""} />
          <Field
            label="Label (badge / kolom footer)"
            name="label"
            defaultValue={editing?.label ?? ""}
            hint={
              bagian === "FOOTER"
                ? "Kolom footer: fasilitas · tentang · sosial · ikon (chip bawah brand)."
                : undefined
            }
          />
          <Field label="Teks" name="teks" defaultValue={editing?.teks ?? ""} textarea />
          <LandingGambarField
            key={editing?.id ?? "new"}
            label="Gambar"
            name="gambar"
            defaultValue={editing?.gambar ?? "/landing/"}
            required
          />
          <Field label="Slug embed (opsional, unik)" name="slug" defaultValue={editing?.slug ?? ""} />
          {editing ? (
            <>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="aktif" defaultChecked={editing.aktif} />
                Tampil di landing / tentang
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="embedAktif" defaultChecked={editing.embedAktif} />
                Siap embed sosmed
              </label>
              {editing.embedAktif ? (
                <p className="text-xs text-muted-foreground">
                  Iframe:{" "}
                  <code className="break-all">{`<iframe src="/embed/kartu/${editing.id}" width="420" height="320" />`}</code>
                </p>
              ) : null}
            </>
          ) : (
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="embedAktif" />
              Siap embed sosmed
            </label>
          )}
          {kartuState.error ? <p className="text-sm text-destructive">{kartuState.error}</p> : null}
          {kartuState.ok ? <p className="text-sm text-muted-foreground">{kartuState.ok}</p> : null}
          <div className="flex flex-wrap gap-2">
            <Button type="submit">{editing ? "Simpan kartu" : "Tambah kartu"}</Button>
            {editing ? (
              <Button type="button" variant="ghost" onClick={() => setEditId(null)}>
                Batal
              </Button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  textarea,
  required,
  hint,
}: {
  label: string;
  name: string;
  defaultValue: string;
  textarea?: boolean;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {textarea ? (
        <Textarea id={name} name={name} defaultValue={defaultValue} rows={3} required={required} />
      ) : (
        <Input id={name} name={name} defaultValue={defaultValue} required={required} />
      )}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
