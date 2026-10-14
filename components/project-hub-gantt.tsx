"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ganttDayHeaders,
  ganttSegmentStyle,
  ganttUsesDayScale,
  inclusiveDayCount,
  type GanttModel,
  type GanttRange,
} from "@/lib/project-hub-gantt";

function DayGridTrack({
  range,
  dayCount,
  segments,
  laneId,
}: {
  range: GanttRange;
  dayCount: number;
  segments: GanttModel["lanes"][0]["segments"];
  laneId: string;
}) {
  return (
    <div className="relative min-h-11 rounded-md border bg-muted/20">
      <div
        className="absolute inset-0 grid divide-x divide-border/50"
        style={{ gridTemplateColumns: `repeat(${dayCount}, minmax(0, 1fr))` }}
        aria-hidden
      >
        {Array.from({ length: dayCount }, (_, i) => (
          <div key={i} className="bg-muted/25" />
        ))}
      </div>
      {segments.map((seg) => {
        const style = ganttSegmentStyle(seg, range);
        return (
          <div
            key={`${laneId}-${seg.label}-${seg.start}`}
            className="absolute top-1 bottom-1 z-10 flex items-center justify-center overflow-hidden rounded-sm border border-foreground/80 bg-foreground px-1.5 text-[10px] font-medium leading-tight text-background"
            style={style}
            title={`${seg.label} (${seg.start} → ${seg.end})`}
          >
            <span className="line-clamp-2 text-center">{seg.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function ProjectHubGantt({ model }: { model: GanttModel }) {
  const range = model.range;
  const dayCount = model.dayCount ?? inclusiveDayCount(range);
  const dayScale = model.scale === "day" || ganttUsesDayScale(range);
  const headers = dayScale ? ganttDayHeaders(dayCount) : model.months;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tahapan proyek</CardTitle>
        <CardDescription>{model.caption}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {dayScale ? (
          <div
            className="grid gap-1 border-b pb-2 text-center text-[10px] font-medium text-muted-foreground sm:text-xs"
            style={{ gridTemplateColumns: `repeat(${dayCount}, minmax(0, 1fr))` }}
          >
            {headers.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        ) : (
          <div className="border-b pb-2 text-center text-xs font-medium text-muted-foreground">
            {model.months.join(" · ")}
          </div>
        )}

        <ul className="space-y-3">
          {model.lanes.map((lane) => (
            <li key={lane.id} className="grid gap-1.5 sm:grid-cols-[7.5rem_1fr] sm:items-stretch">
              <span className="text-sm font-medium sm:pt-2">{lane.label}</span>
              {dayScale ? (
                <DayGridTrack
                  range={range}
                  dayCount={dayCount}
                  segments={lane.segments}
                  laneId={lane.id}
                />
              ) : (
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
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
