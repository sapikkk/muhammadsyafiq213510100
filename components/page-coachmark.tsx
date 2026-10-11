"use client";

import { CircleHelp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { tipsForCoachKey } from "@/lib/coach-tips";

export type FlowStep = {
  label: string;
  detail: string;
};

const STORAGE_PREFIX = "kokonus-coach-dismissed:";

export type PageCoachmarkProps = {
  /** Unik per halaman, mis. `owner-laporan` */
  pageKey: string;
  steps: FlowStep[];
  /** Judul dialog — default "Panduan halaman" */
  title?: string;
  intro?: string;
  /** Tips UAT; jika kosong diisi dari lib/coach-tips.ts */
  tips?: string[];
  /** Tampil otomatis saat pertama kali (localStorage) */
  autoOnFirstVisit?: boolean;
};

function CoachDialog({
  open,
  onOpenChange,
  title,
  intro,
  steps,
  tips,
  onDismissForever,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  intro?: string;
  steps: FlowStep[];
  tips: string[];
  onDismissForever: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {intro ? <DialogDescription>{intro}</DialogDescription> : null}
        </DialogHeader>
        {steps.length > 0 ? (
          <ol className="space-y-4 text-sm">
            {steps.map((step, index) => (
              <li key={`${step.label}-${index}`} className="flex gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-foreground text-xs font-semibold"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <div className="min-w-0 space-y-0.5">
                  <p className="font-medium">{step.label}</p>
                  <p className="text-muted-foreground">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : null}
        {tips.length > 0 ? (
          <div className="border-t pt-4 text-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Tips pengguna
            </p>
            <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="flex flex-col gap-2 pt-2">
          <Button type="button" className="h-10 w-full" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full"
            onClick={() => {
              onDismissForever();
              onOpenChange(false);
            }}
          >
            Mengerti — jangan tampilkan otomatis lagi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function PageCoachmark({
  pageKey,
  steps,
  title = "Panduan halaman",
  intro = "Ikuti langkah dari atas ke bawah. Cocok untuk uji blackbox dan UAT.",
  tips,
  autoOnFirstVisit = true,
}: PageCoachmarkProps) {
  const [coachOpen, setCoachOpen] = useState(false);
  const resolvedTips = tips?.length ? tips : tipsForCoachKey(pageKey);
  const storageKey = `${STORAGE_PREFIX}${pageKey}`;

  const dismissForever = useCallback(() => {
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      /* private mode */
    }
  }, [storageKey]);

  const hasGuide = steps.length > 0 || resolvedTips.length > 0;

  useEffect(() => {
    if (!autoOnFirstVisit || !hasGuide) return;
    try {
      if (!localStorage.getItem(storageKey)) {
        setCoachOpen(true);
      }
    } catch {
      /* ignore */
    }
  }, [autoOnFirstVisit, hasGuide, storageKey]);

  if (!hasGuide) return null;

  return (
    <>
      <div className="flex justify-end" data-coachmark={pageKey}>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 gap-1.5 text-xs"
          onClick={() => setCoachOpen(true)}
          aria-label="Buka panduan halaman"
        >
          <CircleHelp className="h-3.5 w-3.5" aria-hidden />
          Panduan
        </Button>
      </div>
      <CoachDialog
        open={coachOpen}
        onOpenChange={setCoachOpen}
        title={title}
        intro={intro}
        steps={steps}
        tips={resolvedTips}
        onDismissForever={dismissForever}
      />
    </>
  );
}

/** Coachmark dari URL saat halaman belum mendefinisikan langkah sendiri. */
export function PageCoachmarkFromPath() {
  const pathname = usePathname();
  const meta = resolveCoachMeta(pathname);
  if (!meta) return null;
  return <PageCoachmark pageKey={meta.pageKey} steps={meta.steps} title={meta.title} />;
}

function resolveCoachMeta(pathname: string): {
  pageKey: string;
  title: string;
  steps: FlowStep[];
} | null {
  if (pathname === "/login") {
    return {
      pageKey: "login",
      title: "Panduan masuk",
      steps: [
        { label: "Email & sandi", detail: "Isi keduanya lalu klik Masuk." },
        { label: "Peran", detail: "Sistem mengarahkan ke dashboard Owner, Admin, atau Petani." },
        { label: "Lupa sandi", detail: "Petani minta reset ke Admin; profil di Pengaturan." },
      ],
    };
  }
  if (pathname === "/pengaturan") {
    return {
      pageKey: "pengaturan",
      title: "Pengaturan akun",
      steps: [
        { label: "Profil", detail: "Perbarui nama tampilan jika perlu." },
        { label: "Sandi", detail: "Ganti sandi — wajib setelah reset dari Owner." },
      ],
    };
  }
  const staticMatchers: { pattern: RegExp; pageKey: string; title: string; steps: FlowStep[] }[] = [
    {
      pattern: /^\/ganti-sandi\/?$/,
      pageKey: "ganti-sandi",
      title: "Ganti sandi",
      steps: [
        { label: "Sandi lama", detail: "Wajib benar sebelum sandi baru disimpan." },
        { label: "Konfirmasi", detail: "Ulangi sandi baru — lalu lanjut ke dashboard." },
      ],
    },
    {
      pattern: /^\/akses-ditolak\/?$/,
      pageKey: "akses-ditolak",
      title: "Akses ditolak",
      steps: [
        { label: "Peran", detail: "Menu dan URL dibatasi per Owner / Admin / Petani." },
        { label: "Keluar", detail: "Kembali ke dashboard Anda lewat tombol di bawah." },
      ],
    },
    {
      pattern: /^\/admin\/jurnal\/baru\/?$/,
      pageKey: "admin-jurnal-baru",
      title: "Jurnal baru",
      steps: [
        { label: "Tipe", detail: "Smart Jurnal (17 tipe) atau baris manual." },
        { label: "Approve", detail: "Saldo dan laporan berubah setelah disetujui." },
      ],
    },
    {
      pattern: /^\/admin\/penjualan\/baru\/?$/,
      pageKey: "admin-penjualan-baru",
      title: "Buat sales order",
      steps: [
        { label: "Pelanggan & batch", detail: "Pilih baris pesanan valid." },
        { label: "Draft", detail: "Lanjut konfirmasi stok di detail SO." },
      ],
    },
    {
      pattern: /^\/petani\/siklus\/baru\/?$/,
      pageKey: "petani-siklus-baru",
      title: "Mulai semai baru",
      steps: [
        { label: "Varietas & kolam", detail: "Pastikan kolam siap dan pack cukup." },
        { label: "Submit", detail: "Batch baru muncul di daftar siklus aktif." },
      ],
    },
  ];
  for (const m of staticMatchers) {
    if (m.pattern.test(pathname)) {
      return { pageKey: m.pageKey, title: m.title, steps: m.steps };
    }
  }
  const detailMatchers: { pattern: RegExp; pageKey: string; title: string; steps: FlowStep[] }[] = [
    {
      pattern: /^\/admin\/penjualan\/\d+\/invoice\/?$/,
      pageKey: "admin-penjualan-invoice",
      title: "Invoice penjualan",
      steps: [
        { label: "Pratinjau", detail: "Layout cetak di bawah tombol Cetak." },
        { label: "Kembali", detail: "Ke detail SO untuk status dan pembayaran." },
      ],
    },
    {
      pattern: /^\/owner\/varietas\/\d+$/,
      pageKey: "detail-varietas",
      title: "Detail varietas",
      steps: [
        { label: "Parameter", detail: "Baca HPP dan harga jual master." },
        { label: "Ubah", detail: "Tombol aksi — form sheet." },
        { label: "Riwayat", detail: "Perubahan tercatat per user." },
      ],
    },
    {
      pattern: /^\/(owner|admin|petani)\/inventaris\/\d+$/,
      pageKey: "detail-inventaris",
      title: "Detail inventaris",
      steps: [
        { label: "Stok", detail: "Saldo saat ini vs minimum." },
        { label: "Pergerakan", detail: "IN/OUT/ADJUST di Admin/Petani." },
      ],
    },
    {
      pattern: /^\/(owner|admin)\/jurnal\/\d+$/,
      pageKey: "detail-jurnal",
      title: "Detail jurnal",
      steps: [
        { label: "Baris", detail: "Periksa akun debit dan kredit." },
        { label: "Status", detail: "Draft vs APPROVED." },
      ],
    },
    {
      pattern: /^\/(admin|owner)\/penjualan\/\d+$/,
      pageKey: "detail-sales-order",
      title: "Detail sales order",
      steps: [
        { label: "Status", detail: "Menentukan aksi yang boleh dilakukan." },
        { label: "Baris", detail: "Batch, jumlah, subtotal per item." },
      ],
    },
    {
      pattern: /^\/petani\/pengiriman\/\d+$/,
      pageKey: "petani-pengiriman-detail",
      title: "Detail pengiriman",
      steps: [
        { label: "Status SO", detail: "Ikuti alur kirim dan terima." },
        { label: "Baris", detail: "Periksa batch dan jumlah sebelum konfirmasi." },
      ],
    },
    {
      pattern: /^\/admin\/harvest\/\d+$/,
      pageKey: "admin-harvest",
      title: "Review panen",
      steps: [
        { label: "Sortasi", detail: "Layak vs tidak layak jual." },
        { label: "HPP", detail: "Preview sebelum approve." },
        { label: "Approve", detail: "Menulis HPP dan jurnal persediaan." },
      ],
    },
    {
      pattern: /^\/petani\/siklus\/\d+$/,
      pageKey: "petani-siklus",
      title: "Detail batch",
      steps: [
        { label: "Langkah berikutnya", detail: "Pindah fase atau kirim laporan panen." },
        { label: "Aksi", detail: "Monitor, tambal, atau abort via dialog." },
      ],
    },
    {
      pattern: /^\/(admin|petani)\/active-pack\/\d+$/,
      pageKey: "admin-active-pack",
      title: "Detail active pack",
      steps: [
        { label: "Sisa", detail: "Unit tersisa setelah dipakai semai." },
        { label: "Pakai", detail: "Kurangi stok saat dipakai di lapangan." },
      ],
    },
  ];
  for (const m of detailMatchers) {
    if (m.pattern.test(pathname)) {
      return { pageKey: m.pageKey, title: m.title, steps: m.steps };
    }
  }
  return null;
}
