"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ganttSegmentStyle, type GanttModel, type GanttRange } from "@/lib/project-hub-gantt";

export function ProjectHubGantt({ model }: { model: GanttModel }) {
  const range: GanttRange = model.range;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tahapan proyek</CardTitle>
        <CardDescription>{model.caption}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-b pb-2 text-center text-xs font-medium text-muted-foreground">
          {model.months.join(" · ")}
        </div>
        <ul className="space-y-3">
          {model.lanes.map((lane) => (
            <li key={lane.id} className="grid gap-1.5 sm:grid-cols-[7.5rem_1fr] sm:items-center">
              <span className="text-sm font-medium">{lane.label}</span>
              <div className="relative h-10 rounded-md border bg-muted/30">
                {lane.segments.map((seg) => {
                  const style = ganttSegmentStyle(seg, range);
                  return (
                    <div
                      key={`${lane.id}-${seg.label}-${seg.start}`}
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
