import "server-only";

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import packageJson from "@/package.json";

export type HubTabId =
  | "agile"
  | "sprint"
  | "timeline"
  | "version"
  | "ucd"
  | "blackbox"
  | "backlog"
  | "skills"
  | "deploy";

export type HubTab = {
  id: HubTabId;
  label: string;
  description: string;
  docPath?: string;
  externalHref?: string;
};

export const HUB_TABS: HubTab[] = [
  {
    id: "agile",
    label: "Agile",
    description: "Registry sprint, DoD, board GitHub Project #1.",
    docPath: "docs/agile/README.md",
    externalHref: "https://github.com/users/sapikkk/projects/1",
  },
  {
    id: "sprint",
    label: "Sprint & iteration",
    description: "Lima sprint v1 — actual start dan issue.",
    docPath: "docs/agile/timeline-registry.md",
  },
  {
    id: "timeline",
    label: "Timeline",
    description: "Milestone dari sinkron board (data/agile-progress.json).",
  },
  {
    id: "version",
    label: "Version control",
    description: "Semver produk, audit log, repositori Git.",
    docPath: "docs/agile/audit-log.md",
    externalHref: "https://github.com/sapikkk/muhammadsyafiq213510100",
  },
  {
    id: "ucd",
    label: "UCD v2",
    description: "Increment akuntansi & logistik pasca go-live.",
    docPath: "docs/ucd/README.md",
  },
  {
    id: "blackbox",
    label: "Blackbox",
    description: "Register langkah uji black-box.",
    docPath: "docs/tabel-blackbox-testing.md",
  },
  {
    id: "backlog",
    label: "Backlog",
    description: "Ringkasan progress & epic terbuka.",
    docPath: "docs/progress-backlog.md",
  },
  {
    id: "skills",
    label: "Skills",
    description: "Skill agent domain, keuangan, dan vendor.",
    docPath: "docs/skills/README.md",
  },
  {
    id: "deploy",
    label: "Deploy & uji",
    description: "Vercel, seed demo, panduan uji sidang.",
    docPath: "docs/testing/panduan-uji-dan-demo.md",
  },
];

function loadDoc(relativePath: string, maxChars = 48_000): string {
  const full = join(process.cwd(), relativePath);
  if (!existsSync(full)) {
    return `Dokumen belum ada di repo: ${relativePath}`;
  }
  const text = readFileSync(full, "utf8");
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n\n… (dokumen dipotong — buka file lengkap di repo)`;
}

export type ProjectHubPayload = {
  version: string;
  repoUrl: string;
  prodUrl: string;
  docs: Partial<Record<HubTabId, string>>;
};

export function loadProjectHubContent(): ProjectHubPayload {
  const docs: Partial<Record<HubTabId, string>> = {};
  for (const tab of HUB_TABS) {
    if (tab.docPath) docs[tab.id] = loadDoc(tab.docPath);
  }
  return {
    version: packageJson.version,
    repoUrl: packageJson.repository?.url?.replace("git+", "").replace(".git", "") ?? "",
    prodUrl: "https://kokonusfarm.vercel.app",
    docs,
  };
}
