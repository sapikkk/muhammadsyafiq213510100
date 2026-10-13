"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AgileProgressDashboard } from "@/components/agile-progress-dashboard";
import { ProjectHubGantt } from "@/components/project-hub-gantt";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type AgileProgressFile, SPRINT_REGISTRY, type AgileTimelineEntry } from "@/lib/agile-progress";
import { formatWaktuJakarta } from "@/lib/format";
import type { HubTab, HubTabId, LoadedHubDoc, ProjectHubPayload } from "@/lib/project-hub-content";

function DocPanel({ doc }: { doc: LoadedHubDoc }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base">{doc.title}</CardTitle>
          <Button type="button" variant="outline" size="sm" className="h-9" asChild>
            <Link href={doc.githubUrl} target="_blank" rel="noopener noreferrer">
              Buka di GitHub
            </Link>
          </Button>
        </div>
        <CardDescription className="font-mono text-xs">{doc.path}</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="max-h-[min(60vh,520px)] overflow-auto whitespace-pre-wrap rounded-md border bg-muted/40 p-4 text-xs leading-relaxed">
          {doc.body}
        </pre>
      </CardContent>
    </Card>
  );
}

function DocStack({ docs }: { docs?: LoadedHubDoc[] }) {
  if (!docs?.length) {
    return <p className="text-sm text-muted-foreground">Belum ada dokumen untuk tab ini.</p>;
  }
  return (
    <div className="space-y-4">
      {docs.map((doc) => (
        <DocPanel key={doc.path} doc={doc} />
      ))}
    </div>
  );
}

function SprintPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sprint & iteration (registry)</CardTitle>
        <CardDescription>Acuan PO — actual start di docs/agile/timeline-registry.md</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sprint</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Mulai</TableHead>
              <TableHead>Target selesai</TableHead>
              <TableHead>Issue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SPRINT_REGISTRY.map((s) => (
              <TableRow key={s.sprint}>
                <TableCell>{s.sprint}</TableCell>
                <TableCell className="font-medium">{s.iterationTitle}</TableCell>
                <TableCell>{s.actualStart}</TableCell>
                <TableCell>{s.targetEnd}</TableCell>
                <TableCell>{s.issues}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function TimelinePanel({ entries }: { entries: AgileTimelineEntry[] }) {
  const recent = [...entries].reverse().slice(0, 80);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline project</CardTitle>
        <CardDescription>
          80 event terakhir — npm run sync:agile-progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[640px] overflow-y-auto rounded-md border">
          <ul className="divide-y">
            {recent.map((ev, idx) => (
              <li key={`${ev.at}-${ev.issueNumber}-${idx}`} className="px-4 py-3 text-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <time className="font-mono text-xs text-muted-foreground" dateTime={ev.at ?? undefined}>
                    {ev.at ? formatWaktuJakarta(ev.at) : "—"}
                  </time>
                  <Badge variant="outline" className="text-[10px] font-normal">
                    {(ev.kind ?? "Event").replace(/Event$/, "")}
                  </Badge>
                </div>
                <p className="mt-1">{ev.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function VersionHeader({ hub }: { hub: ProjectHubPayload }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Versi produk</CardTitle>
        <CardDescription>Semver linier 1.x · semantic-release di branch main</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Badge>v{hub.version}</Badge>
        <Badge variant="secondary">{hub.prodUrl.replace("https://", "")}</Badge>
      </CardContent>
    </Card>
  );
}

export function ProjectHub({
  tabs,
  hub,
  agile,
}: {
  tabs: HubTab[];
  hub: ProjectHubPayload;
  agile: AgileProgressFile;
}) {
  const [active, setActive] = useState<HubTabId>("agile");

  const current = useMemo(() => tabs.find((t) => t.id === active) ?? tabs[0], [active, tabs]);
  const sectionDocs = hub.sections[active];

  return (
    <div className="space-y-6">
      <nav
        className="flex flex-wrap gap-2 border-b pb-4"
        aria-label="Bagian dokumentasi proyek"
      >
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            type="button"
            size="sm"
            variant={tab.id === active ? "default" : "outline"}
            className="h-10"
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </nav>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{current.label}</h2>
        <p className="text-sm text-muted-foreground">{current.description}</p>
        {current.externalHref ? (
          <Button type="button" variant="link" className="h-auto p-0 text-sm" asChild>
            <Link href={current.externalHref} target="_blank" rel="noopener noreferrer">
              Tautan eksternal
            </Link>
          </Button>
        ) : null}
      </div>

      {active === "agile" ? <AgileProgressDashboard data={agile} /> : null}
      {active === "sprint" ? (
        <>
          <SprintPanel />
          <DocStack docs={sectionDocs} />
        </>
      ) : null}
      {active === "timeline" ? <TimelinePanel entries={agile.timeline} /> : null}
      {active === "gantt" ? <ProjectHubGantt /> : null}
      {active === "version" ? (
        <>
          <VersionHeader hub={hub} />
          <DocStack docs={sectionDocs} />
        </>
      ) : null}
      {active === "ucd" ? <DocStack docs={sectionDocs} /> : null}
      {active === "blackbox" ? <DocStack docs={sectionDocs} /> : null}
      {active === "backlog" ? <DocStack docs={sectionDocs} /> : null}
      {active === "deploy" ? <DocStack docs={sectionDocs} /> : null}
      {active === "agile" ? <DocStack docs={sectionDocs} /> : null}
    </div>
  );
}
