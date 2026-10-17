import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AccountSettings } from "@/components/account-settings";
import { UiThemeSettings } from "@/components/ui-theme-settings";
import { NotifikasiSection } from "@/components/notifikasi-section";
import { OwnerUserCreateSheet, OwnerUserDaftar } from "@/components/owner-user-panel";
import { PageHeaderRow } from "@/components/page-header-row";
import { PengaturanTimSubnav } from "@/components/pengaturan-tim-panel";
import { PetaniMasterDaftar } from "@/components/petani-master-daftar";
import { RoleMatrix } from "@/components/role-matrix";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { listUsersForOwner } from "@/lib/owner-users";
import { listPetani, serializePetani } from "@/lib/petani";
import { prisma } from "@/lib/prisma";
import { LandingPengaturanPanel } from "@/components/landing-pengaturan-panel";
import { getLandingKontenForEdit, listLandingKartuAll } from "@/lib/landing";

export const dynamic = "force-dynamic";

type Search = { bagian?: string; tim?: string };

export default async function PengaturanPage({ searchParams }: { searchParams: Search }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  const role = session?.user?.role;
  const bagian = searchParams.bagian ?? "profil";

  if (bagian === "tim" && role !== "OWNER") {
    redirect("/pengaturan?bagian=profil");
  }

  if (bagian === "landing" && role !== "ADMIN" && role !== "OWNER") {
    redirect("/pengaturan?bagian=profil");
  }

  const user = userId
    ? await prisma.user.findUnique({
        where: { id: userId },
        select: { nama: true },
      })
    : null;
  const nama = user?.nama ?? session?.user?.name ?? "";

  return (
    <>
      <PageHeaderRow title="Pengaturan" />

      {bagian === "profil" ? (
        <div className="flex flex-col gap-6">
          <UiThemeSettings />
          {userId ? <AccountSettings nama={nama} /> : null}
          <RoleMatrix />
        </div>
      ) : null}

      {bagian === "notifikasi" && userId ? <NotifikasiSection userId={userId} /> : null}

      {bagian === "tim" && role === "OWNER" ? (
        <TimOwnerPanel tim={searchParams.tim ?? "petani"} />
      ) : null}

      {bagian === "landing" && (role === "ADMIN" || role === "OWNER") ? (
        <LandingPengaturanSection />
      ) : null}
    </>
  );
}

async function LandingPengaturanSection() {
  const [konten, kartu] = await Promise.all([getLandingKontenForEdit(), listLandingKartuAll()]);
  return <LandingPengaturanPanel konten={konten} kartu={kartu} />;
}

async function TimOwnerPanel({ tim }: { tim: string }) {
  const tab = tim === "pengguna" ? "pengguna" : "petani";

  if (tab === "petani") {
    const rows = await listPetani();
    return (
      <div className="flex flex-col gap-4">
        <Suspense fallback={null}>
          <PengaturanTimSubnav />
        </Suspense>
        <PetaniMasterDaftar rows={rows.map(serializePetani)} mode="owner" />
      </div>
    );
  }

  const users = await listUsersForOwner();
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={null}>
        <PengaturanTimSubnav />
      </Suspense>
      <div className="flex justify-end">
        <OwnerUserCreateSheet
          trigger={
            <Button type="button" className="h-11">
              Tambah akun
            </Button>
          }
        />
      </div>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Memuat daftar…</p>}>
        <OwnerUserDaftar users={users} />
      </Suspense>
    </div>
  );
}
