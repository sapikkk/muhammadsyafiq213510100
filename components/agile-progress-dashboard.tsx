"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type AgileItem,
  type AgileProgressFile,
  type AgileTimelineEntry,
  SPRINT_REGISTRY,
  iterationLabel,
  countByIteration,
} from "@/lib/agile-progress";
import { formatWaktuJakarta } from "@/lib/format";

type ViewMode = "kartu" | "timeline" | "sprint";

function statusVariant(
  status: string | null,
): "default" | "secondary" | "outline" {
  if (status === "Done") return "default";
  if (status === "In progress") return "secondary";
  return "outline";
}

export function AgileProgressDashboard({ data }: { data: AgileProgressFile }) {
  const [view, setView] = useState<ViewMode>("kartu");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [iterationFilter, setIterationFilter] = useState<string>("all");
  const [query, setQuery] = useState("");

  const iterations = useMemo(() => {
    const set = new Set<string>();
    for (const item of data.items) set.add(iterationLabel(item.iteration));
    return Array.from(set).sort();
  }, [data.items]);

  const filteredItems = useMemo(() => {
    return data.items.filter((item) => {
      if (statusFilter !== "all" && (item.status ?? "") !== statusFilter)
        return false;
      if (
        iterationFilter !== "all" &&
        iterationLabel(item.iteration) !== iterationFilter
      )
        return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${item.number ?? ""} ${item.title} ${item.labels?.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [data.items, statusFilter, iterationFilter, query]);

  const filteredTimeline = useMemo(() => {
    const nums = new Set(
      filteredItems.map((i) => i.number).filter((n): n is number => n != null),
    );
    if (statusFilter === "all" && iterationFilter === "all" && !query.trim()) {
      return data.timeline;
    }
    return data.timeline.filter(
      (ev) => ev.issueNumber == null || nums.has(ev.issueNumber),
    );
  }, [data.timeline, filteredItems, statusFilter, iterationFilter, query]);

  const byIteration = useMemo(() => countByIteration(data.items), [data.items]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Agile · GitHub Project #1
          </p>
          <h2 className="text-2xl font-bold tracking-tight">{data.project.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {data.project.totalItems} kartu · sinkron{" "}
            <time dateTime={data.syncedAt}>{formatWaktuJakarta(data.syncedAt)}</time>{" "}
            WIB ·{" "}
            <a
              href={data.project.url}
              className="font-medium text-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Buka board
            </a>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(data.project.byStatus).map(([status, count]) => (
            <Badge key={status} variant={statusVariant(status)}>
              {status}: {count}
            </Badge>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Registry sprint (docs/agile)</CardTitle>
          <CardDescription>
            Actual start PO vs iteration di Project — progres kartu per sprint live dari GitHub.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sprint</TableHead>
                <TableHead>Actual start</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead className="text-right">Done / total (board)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SPRINT_REGISTRY.map((row) => {
                const live = byIteration.get(row.iterationTitle);
                return (
                  <TableRow key={row.sprint}>
                    <TableCell className="font-medium">{row.iterationTitle}</TableCell>
                    <TableCell>{row.actualStart}</TableCell>
                    <TableCell>{row.targetEnd}</TableCell>
                    <TableCell className="text-muted-foreground">{row.issues}</TableCell>
                    <TableCell className="text-right">
                      {live ? `${live.done} / ${live.total}` : "—"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Select value={view} onValueChange={(v) => setView(v as ViewMode)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tampilan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kartu">Semua kartu ({data.items.length})</SelectItem>
            <SelectItem value="timeline">
              Timeline ({data.timeline.length} event)
            </SelectItem>
            <SelectItem value="sprint">Per iteration</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua status</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
            <SelectItem value="In progress">In progress</SelectItem>
            <SelectItem value="Todo">Todo</SelectItem>
          </SelectContent>
        </Select>
        <Select value={iterationFilter} onValueChange={setIterationFilter}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Iteration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua iteration</SelectItem>
            {iterations.map((it) => (
              <SelectItem key={it} value={it}>
                {it}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          className="max-w-xs"
          placeholder="Cari # issue atau judul…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {view === "kartu" ? (
        <ItemsTable items={filteredItems} />
      ) : null}

      {view === "timeline" ? (
        <TimelineList entries={[...filteredTimeline].reverse()} />
      ) : null}

      {view === "sprint" ? (
        <div className="space-y-6">
          {iterations.map((it) => {
            const group = filteredItems.filter(
              (item) => iterationLabel(item.iteration) === it,
            );
            if (!group.length) return null;
            return (
              <Card key={it}>
                <CardHeader>
                  <CardTitle className="text-base">{it}</CardTitle>
                  <CardDescription>{group.length} kartu</CardDescription>
                </CardHeader>
                <CardContent>
                  <ItemsTable items={group} compact />
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : null}

      <p className="text-xs text-muted-foreground">
        Timestamp dari GitHub (created / updated / closed / timeline issue). Perbarui data:{" "}
        <code className="rounded bg-muted px-1">npm run sync:agile-progress</code>
      </p>
    </div>
  );
}

function ItemsTable({
  items,
  compact = false,
}: {
  items: AgileItem[];
  compact?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">#</TableHead>
            <TableHead>Judul</TableHead>
            {!compact ? <TableHead>Status</TableHead> : null}
            <TableHead>Iteration</TableHead>
            <TableHead>Dibuat (WIB)</TableHead>
            <TableHead>Diperbarui (WIB)</TableHead>
            <TableHead className="w-24" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.projectItemId}>
              <TableCell className="font-mono text-xs">
                {item.number ?? "—"}
              </TableCell>
              <TableCell className="max-w-md">
                <span className="line-clamp-2 text-sm">{item.title}</span>
                {item.labels?.length ? (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {item.labels.map((l) => (
                      <Badge key={l} variant="outline" className="text-[10px]">
                        {l}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </TableCell>
              {!compact ? (
                <TableCell>
                  <Badge variant={statusVariant(item.status)}>{item.status ?? "—"}</Badge>
                </TableCell>
              ) : null}
              <TableCell className="text-xs text-muted-foreground">
                {iterationLabel(item.iteration)}
              </TableCell>
              <TableCell className="whitespace-nowrap text-xs">
                {item.createdAt ? formatWaktuJakarta(item.createdAt) : "—"}
              </TableCell>
              <TableCell className="whitespace-nowrap text-xs">
                {item.updatedAt ? formatWaktuJakarta(item.updatedAt) : "—"}
              </TableCell>
              <TableCell>
                {item.url ? (
                  <Button asChild variant="ghost" size="sm">
                    <Link href={item.url} target="_blank" rel="noreferrer">
                      GH
                    </Link>
                  </Button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TimelineList({ entries }: { entries: AgileTimelineEntry[] }) {
  return (
    <div className="max-h-[640px] overflow-y-auto rounded-md border">
      <ul className="divide-y">
        {entries.map((ev, idx) => (
          <li key={`${ev.at}-${ev.issueNumber}-${idx}`} className="px-4 py-3 text-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <time
                className="font-mono text-xs text-muted-foreground"
                dateTime={ev.at ?? undefined}
              >
                {ev.at ? formatWaktuJakarta(ev.at) : "—"}
              </time>
              <Badge variant="outline" className="text-[10px] font-normal">
                {(ev.kind ?? "Event").replace(/Event$/, "")}
              </Badge>
            </div>
            <p className="mt-1">{ev.detail}</p>
            {ev.title ? (
              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                {ev.title}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
