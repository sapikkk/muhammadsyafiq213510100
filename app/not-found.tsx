import Link from "next/link";
import { StateScreen } from "@/components/state-screen";

export default function NotFound() {
  return (
    <StateScreen
      title="Halaman tidak ada"
      description="Alamat yang Anda buka tidak ditemukan."
    >
      <Link
        href="/"
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
      >
        Kembali ke beranda
      </Link>
    </StateScreen>
  );
}
