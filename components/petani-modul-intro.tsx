import Link from "next/link";
import type { PetaniModulKey } from "@/lib/petani-modul-langkah";
import { petaniLangkahUntukModul } from "@/lib/petani-modul-langkah";

/** Satu baris konteks RBAC di bawah judul halaman petani (selaras alur beranda). */
export function PetaniModulIntro({ modul }: { modul: PetaniModulKey }) {
  const langkah = petaniLangkahUntukModul(modul);
  return (
    <p className="text-sm text-muted-foreground">
      <span className="font-medium text-foreground">
        Langkah {langkah.no} · {langkah.label}
      </span>
      {" — "}
      {langkah.hint}{" "}
      <Link href="/petani" scroll={false} className="font-medium text-primary underline-offset-4 hover:underline">
        Beranda
      </Link>
    </p>
  );
}
