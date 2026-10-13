import "server-only";

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import packageJson from "@/package.json";

export type HubTabId =
  | "agile"
  | "sprint"
  | "timeline"
  | "gantt"
  | "version"
  | "ucd"
  | "blackbox"
  | "backlog"
  | "deploy";

export type HubDocEntry = {
  title: string;
  path: string;
};

export type HubTab = {
  id: HubTabId;
  label: string;
  description: string;
  docs?: HubDocEntry[];
  externalHref?: string;
};

const REPO = "https://github.com/sapikkk/muhammadsyafiq213510100";

export const HUB_TABS: HubTab[] = [
  {
    id: "agile",
    label: "Agile",
    description: "Standar tim, definisi selesai, dan status sinkron dengan GitHub.",
    externalHref: "https://github.com/users/sapikkk/projects/1",
    docs: [
      { title: "Panduan agile", path: "docs/agile/README.md" },
      { title: "Definition of Done", path: "docs/agile/definition-of-done.md" },
      { title: "Partial delivery", path: "docs/agile/partial-delivery-policy.md" },
      { title: "AC verifikasi risiko", path: "docs/agile/AC-VERIFIKASI-RISIKO.md" },
      { title: "Konfirmasi gap GitHub", path: "docs/agile/KONFIRMASI-GAP-GITHUB.md" },
      { title: "Panduan field Project", path: "docs/agile/github-field-guide.md" },
      { title: "UX flow & perf (closeout)", path: "docs/agile/UX-FLOW-PERF-REPORT.md" },
    ],
  },
  {
    id: "sprint",
    label: "Sprint",
    description: "Jadwal resmi dan rencana kerja per iterasi.",
    docs: [
      { title: "Timeline registry", path: "docs/agile/timeline-registry.md" },
      { title: "Sprint 1 · fondasi", path: "docs/agile/sprints/sprint-01-fondasi.md" },
      { title: "Sprint 2 · operasi", path: "docs/agile/sprints/sprint-02-operasi.md" },
      { title: "Sprint 3 · penjualan", path: "docs/agile/sprints/sprint-03-penjualan.md" },
      { title: "Sprint 4 · laporan", path: "docs/agile/sprints/sprint-04-laporan.md" },
      { title: "Sprint 5 · QA", path: "docs/agile/sprints/sprint-05-qa.md" },
      { title: "Retro sprint 1", path: "docs/agile/retro/sprint-01-retro.md" },
    ],
  },
  {
    id: "timeline",
    label: "Linimasa",
    description: "Riwayat issue dan pull request selama proyek berjalan.",
  },
  {
    id: "gantt",
    label: "Gantt",
    description: "Desain, pengembangan, uji, dan rilis — mengikuti tanggal commit di repo.",
  },
  {
    id: "version",
    label: "Versi & rilis",
    description: "Nomor versi, catatan perubahan, dan aturan merge ke produksi.",
    externalHref: REPO,
    docs: [
      { title: "CHANGELOG (semantic-release)", path: "CHANGELOG.md" },
      { title: "Konfigurasi semantic-release", path: ".releaserc.json" },
      { title: "Audit log proyek", path: "docs/agile/audit-log.md" },
      { title: "Merge stack", path: "docs/agile/merge-stack.md" },
      { title: "Workflow release (CI)", path: ".github/workflows/release.yml" },
    ],
  },
  {
    id: "ucd",
    label: "Desain produk",
    description: "UCD, blueprint akuntansi, dan rencana increment v2.",
    docs: [
      { title: "UCD README", path: "docs/ucd/README.md" },
      { title: "Increment v2 akuntansi", path: "docs/ucd/increment-v2-akuntansi-logistik.md" },
      { title: "Blueprint README", path: "docs/blueprint/README.md" },
      { title: "Blueprint akuntansi hidroponik", path: "docs/blueprint/akuntansi-logistik-hidroponik.md" },
      { title: "Rencana epic v2", path: "docs/blueprint/rencana-implementasi-epic-v2.md" },
      { title: "Validasi backlog PRD", path: "docs/blueprint/VALIDASI-BACKLOG-PRD.md" },
      { title: "Skenario narasi UCD + agile", path: "docs/skenario-narasi-ucd-agile.md" },
    ],
  },
  {
    id: "blackbox",
    label: "Uji blackbox",
    description: "Daftar skenario uji dan catatan hasil pengujian.",
    docs: [
      { title: "Tabel blackbox testing", path: "docs/tabel-blackbox-testing.md" },
      { title: "Uji blackbox (notulensi)", path: "docs/uji-blackbox.md" },
    ],
  },
  {
    id: "backlog",
    label: "Backlog",
    description: "Progress proyek, backlog sprint, dan dokumen kebutuhan produk.",
    docs: [
      { title: "Progress & backlog", path: "docs/progress-backlog.md" },
      { title: "Sprint backlog agile", path: "docs/sprint-backlog-agile.md" },
      { title: "PRD agile Kokonus Farm", path: "docs/prd-agile-kokonus-farm.md" },
      { title: "Project context", path: "docs/project-context.md" },
    ],
  },
  {
    id: "deploy",
    label: "Deploy",
    description: "Panduan deploy, data demo sidang, dan lingkungan produksi.",
    externalHref: "https://kokonusfarm.vercel.app",
    docs: [
      { title: "Panduan uji & demo", path: "docs/testing/panduan-uji-dan-demo.md" },
      { title: "Testing README", path: "docs/testing/README.md" },
      { title: "Data demo sidang", path: "docs/testing/DEMO-DATA.md" },
      { title: "Pelatihan 6 pengguna", path: "docs/testing/pelatihan-6-pengguna.md" },
      { title: "Deploy Vercel + Postgres", path: "docs/deployment/panduan-deploy-vercel-postgres.md" },
      { title: "Go-live Vercel (skrip)", path: "docs/deployment/vercel-go-live.md" },
      { title: "FINDING-01 pool DB", path: "docs/deployment/FINDING-01-db-pool.md" },
      { title: "Postgres lokal dev", path: "docs/deployment/dev-postgres-lokal.md" },
    ],
  },
];

function loadDoc(relativePath: string, maxChars = 40_000): string {
  const full = join(process.cwd(), relativePath);
  if (!existsSync(full)) {
    return `Dokumen belum ada di repo: ${relativePath}`;
  }
  const text = readFileSync(full, "utf8");
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n\n… (dokumen dipotong — buka file lengkap di repo)`;
}

export type LoadedHubDoc = { title: string; path: string; body: string; githubUrl: string };

export type ProjectHubPayload = {
  version: string;
  repoUrl: string;
  prodUrl: string;
  sections: Partial<Record<HubTabId, LoadedHubDoc[]>>;
};

export function loadProjectHubContent(): ProjectHubPayload {
  const repoUrl =
    packageJson.repository?.url?.replace("git+", "").replace(".git", "") ?? REPO;
  const sections: Partial<Record<HubTabId, LoadedHubDoc[]>> = {};

  for (const tab of HUB_TABS) {
    if (!tab.docs?.length) continue;
    sections[tab.id] = tab.docs.map((d) => ({
      title: d.title,
      path: d.path,
      body: loadDoc(d.path),
      githubUrl: `${repoUrl}/blob/main/${d.path}`,
    }));
  }

  return {
    version: packageJson.version,
    repoUrl,
    prodUrl: "https://kokonusfarm.vercel.app",
    sections,
  };
}
