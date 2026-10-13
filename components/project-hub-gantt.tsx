"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GANTT_LANES,
  GANTT_MONTHS,
  GANTT_RANGE,
  ganttSegmentStyle,
} from "@/lib/project-hub-gantt";

export function ProjectHubGantt() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gantt proyek</CardTitle>
        <CardDescription>
          Desain, program, QA, deploy — {GANTT_RANGE.start} s/d {GANTT_RANGE.end}. Refactor lane
          bisa mengikuti sprint board.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 border-b pb-2 text-center text-xs font-medium text-muted-foreground">
          {GANTT_MONTHS.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <ul className="space-y-3">
          {GANTT_LANES.map((lane) => (
            <li key={lane.id} className="grid gap-1.5 sm:grid-cols-[7.5rem_1fr] sm:items-center">
              <span className="text-sm font-medium">{lane.label}</span>
              <div className="relative h-10 rounded-md border bg-muted/30">
                {lane.segments.map((seg) => {
                  const style = ganttSegmentStyle(seg);
                  return (
                    <div
                      key={`${lane.id}-${seg.label}`}
                      className="absolute top-1 bottom-1 flex items-center overflow-hidden rounded-sm border border-foreground/80 bg-foreground px-1 text-[10px] font-medium leading-tight text-background"
                      style={style}
                      title={`${seg.label} (${seg.start} → ${seg.end})`}
                    >
                      <span className="truncate">{seg.label}</span>
                    </div>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
