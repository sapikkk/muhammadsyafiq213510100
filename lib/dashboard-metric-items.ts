import type { MetricCardItem } from "@/components/metric-cards";
import type { KapasitasKolamRingkas } from "@/lib/produksi-kapasitas-types";
import { METRIC_ICON_BY_ID } from "@/lib/metric-icons";

export type DashboardBasePath = "/admin" | "/owner" | "/petani";

function kolamHref(base: DashboardBasePath): string {
  return base === "/petani" ? `${base}/siklus` : `${base}/infrastruktur`;
}

function siapJualHref(base: DashboardBasePath): string {
  if (base === "/admin") return `${base}/harvest`;
  if (base === "/owner") return `${base}/produksi`;
  return `${base}/siklus`;
}

function stokRendahHref(base: DashboardBasePath): string {
  return `${base}/stok-rendah`;
}

export function metricLubangTerisi(
  kap: KapasitasKolamRingkas,
  base: DashboardBasePath,
): MetricCardItem {
  if (kap.totalLubang <= 0) {
    return {
      id: "lubang-terisi",
      icon: METRIC_ICON_BY_ID["lubang-terisi"],
      label: "Lubang terisi",
      value: "—",
      emptyState: {
        message: "Belum ada lubang kolam terdaftar.",
        actionLabel: base === "/petani" ? "Buka siklus tanam" : "Atur lahan dan kolam",
        href: kolamHref(base),
      },
    };
  }
  return {
    id: "lubang-terisi",
    icon: METRIC_ICON_BY_ID["lubang-terisi"],
    label: "Lubang terisi",
    value: `${kap.pctTerisi}%`,
    hint: `${kap.lubangTerisi} dari ${kap.totalLubang} lubang`,
  };
}

export function metricSiapJual(
  siapJual: number,
  kap: KapasitasKolamRingkas,
  base: DashboardBasePath,
): MetricCardItem {
  if (kap.totalLubang <= 0) {
    return {
      id: "siap-jual",
      icon: METRIC_ICON_BY_ID["siap-jual"],
      label: "Lubang siap jual",
      value: "—",
      emptyState: {
        message: "Kapasitas kolam belum diatur.",
        actionLabel: base === "/petani" ? "Buka siklus tanam" : "Atur lahan dan kolam",
        href: kolamHref(base),
      },
    };
  }
  if (siapJual <= 0) {
    return {
      id: "siap-jual",
      icon: METRIC_ICON_BY_ID["siap-jual"],
      label: "Lubang siap jual",
      value: "—",
      emptyState: {
        message: "Belum ada lubang siap jual.",
        actionLabel:
          base === "/admin" ? "Setujui panen" : base === "/owner" ? "Lihat produksi" : "Lihat siklus",
        href: siapJualHref(base),
      },
    };
  }
  return {
    id: "siap-jual",
    icon: METRIC_ICON_BY_ID["siap-jual"],
    label: "Lubang siap jual",
    value: siapJual,
  };
}

export function metricStokRendah(count: number, base: DashboardBasePath): MetricCardItem {
  if (count > 0) {
    return {
      id: "stok-rendah",
      icon: METRIC_ICON_BY_ID["stok-rendah"],
      label: "Stok di bawah minimum",
      value: count,
      hint: "Perlu cek stok barang",
      followUp: {
        actionLabel: "Lihat stok rendah",
        href: stokRendahHref(base),
      },
    };
  }
  return {
    id: "stok-rendah",
    icon: METRIC_ICON_BY_ID["stok-rendah"],
    label: "Stok di bawah minimum",
    value: count,
    hint: "Semua stok di atas minimum.",
    followUp: {
      actionLabel: "Cek stok barang",
      href: `${base}/inventaris`,
    },
  };
}

export function metricTugasPetani(count: number): MetricCardItem {
  if (count <= 0) {
    return {
      id: "tugas",
      icon: METRIC_ICON_BY_ID.tugas,
      label: "Tugas hari ini",
      value: "—",
      emptyState: {
        message: "Tidak ada tugas terbuka hari ini.",
        actionLabel: "Buka siklus tanam",
        href: "/petani/siklus",
      },
    };
  }
  return {
    id: "tugas",
    icon: METRIC_ICON_BY_ID.tugas,
    label: "Tugas hari ini",
    value: count,
  };
}
