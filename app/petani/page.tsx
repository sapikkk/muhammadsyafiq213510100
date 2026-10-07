import Link from "next/link";
import { RoleHome } from "@/components/role-home";

export default function PetaniPage() {
  return (
    <RoleHome role="PEKERJA">
      <nav aria-label="Modul Petani" className="flex flex-wrap gap-2">
        <Link
          href="/petani/inventaris"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Inventaris
        </Link>
        <Link
          href="/petani/active-pack"
          className="inline-flex h-11 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent"
        >
          Active pack
        </Link>
      </nav>
    </RoleHome>
  );
}
