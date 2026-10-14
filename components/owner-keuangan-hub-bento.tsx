import Link from "next/link";
import {
  ArrowLeftRight,
  BookOpen,
  FileSpreadsheet,
  Landmark,
  PiggyBank,
  ScrollText,
} from "lucide-react";
import { BentoSection, BentoSlot, DashboardBento } from "@/components/dashboard-bento";
import { Card } from "@/components/ui/card";

const PINTASAN = [
  {
    href: "/owner/jurnal",
    label: "Jurnal umum",
    hint: "Catatan debit dan kredit harian",
    icon: ScrollText,
  },
  {
    href: "/owner/laporan?laporan=laba-rugi",
    label: "Laba & neraca",
    hint: "Laporan hasil dan posisi keuangan",
    icon: FileSpreadsheet,
  },
  {
    href: "/owner/arus-kas",
    label: "Arus kas",
    hint: "Operasi, investasi, pendanaan",
    icon: ArrowLeftRight,
  },
  {
    href: "/owner/akun",
    label: "Bagan akun",
    hint: "Buku besar per akun",
    icon: BookOpen,
  },
  {
    href: "/owner/rekening",
    label: "Kas & bank",
    hint: "Saldo rekening tunai dan bank",
    icon: Landmark,
  },
  {
    href: "/owner/prive",
    label: "Ambil pribadi",
    hint: "Pencairan pribadi dari kas",
    icon: PiggyBank,
  },
] as const;

export function OwnerKeuanganHubBento() {
  return (
    <BentoSection title="Pintasan laporan">
      <DashboardBento>
        {PINTASAN.map((item) => {
          const Icon = item.icon;
          return (
            <BentoSlot key={item.href} span={2}>
              <Link href={item.href} className="block h-full min-h-[5.5rem]">
                <Card className="flex h-full flex-col gap-2 p-4 transition-colors hover:bg-muted/40">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.hint}</span>
                </Card>
              </Link>
            </BentoSlot>
          );
        })}
      </DashboardBento>
    </BentoSection>
  );
}
