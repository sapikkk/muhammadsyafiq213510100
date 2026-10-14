import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { PengaturanTabs } from "@/components/pengaturan-tabs";
import { authOptions } from "@/lib/auth";

export default async function PengaturanLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const showTimTab = session?.user?.role === "OWNER";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <Suspense fallback={null}>
        <PengaturanTabs showTimTab={showTimTab} />
      </Suspense>
      {children}
    </div>
  );
}
