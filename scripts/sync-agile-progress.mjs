#!/usr/bin/env node
/**
 * Tarik semua kartu GitHub Project #1 + timestamp issue/timeline → data/agile-progress.json
 * Butuh: gh auth login (scope read:project)
 */
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "data", "agile-progress.json");

const QUERY = `
query($cursor: String) {
  user(login: "sapikkk") {
    projectV2(number: 1) {
      title
      url
      fields(first: 30) {
        nodes {
          ... on ProjectV2IterationField {
            name
            configuration {
              iterations { id title startDate duration }
            }
          }
        }
      }
      items(first: 100, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id
          fieldValues(first: 25) {
            nodes {
              ... on ProjectV2ItemFieldSingleSelectValue {
                name
                field { ... on ProjectV2SingleSelectField { name } }
              }
              ... on ProjectV2ItemFieldIterationValue {
                title
                startDate
                duration
                field { ... on ProjectV2IterationField { name } }
              }
              ... on ProjectV2ItemFieldNumberValue {
                number
                field { ... on ProjectV2Field { name } }
              }
              ... on ProjectV2ItemFieldDateValue {
                date
                field { ... on ProjectV2Field { name } }
              }
            }
          }
          content {
            __typename
            ... on Issue {
              number
              title
              url
              state
              createdAt
              updatedAt
              closedAt
              body
              labels(first: 30) { nodes { name } }
              milestone { title }
              timelineItems(first: 80) {
                nodes {
                  __typename
                  ... on LabeledEvent { createdAt label { name } }
                  ... on UnlabeledEvent { createdAt label { name } }
                  ... on ClosedEvent { createdAt }
                  ... on ReopenedEvent { createdAt }
                  ... on AssignedEvent { createdAt assignee { ... on User { login } } }
                  ... on UnassignedEvent { createdAt assignee { ... on User { login } } }
                  ... on MilestonedEvent { createdAt milestoneTitle }
                  ... on DemilestonedEvent { createdAt milestoneTitle }
                  ... on RenamedTitleEvent { createdAt currentTitle previousTitle }
                  ... on IssueComment { createdAt }
                  ... on CrossReferencedEvent { createdAt }
                  ... on ConnectedEvent { createdAt }
                  ... on DisconnectedEvent { createdAt }
                  ... on ReferencedEvent { createdAt }
                  ... on SubscribedEvent { createdAt }
                  ... on MovedColumnsInProjectEvent { createdAt }
                }
              }
            }
            ... on PullRequest {
              number
              title
              url
              state
              createdAt
              updatedAt
              mergedAt
              closedAt
            }
            ... on DraftIssue {
              title
              body
              createdAt
            }
          }
        }
      }
    }
  }
}
`;

function ghGraphql(cursor) {
  const out = execFileSync(
    "gh",
    ["api", "graphql", "-f", `query=${QUERY}`, "-f", `cursor=${cursor ?? ""}`],
    { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
  );
  return JSON.parse(out);
}

function fieldsFromNodes(fieldValueNodes) {
  const map = {};
  for (const node of fieldValueNodes ?? []) {
    const fname = node.field?.name;
    if (!fname) continue;
    if (node.name != null) map[fname] = node.name;
    else if (node.title != null)
      map[fname] = {
        title: node.title,
        startDate: node.startDate,
        duration: node.duration,
      };
    else if (node.number != null) map[fname] = node.number;
    else if (node.date != null) map[fname] = node.date;
  }
  return map;
}

function timelineDetail(node) {
  const t = node.__typename;
  switch (t) {
    case "LabeledEvent":
      return `Label +${node.label?.name ?? "?"}`;
    case "UnlabeledEvent":
      return `Label −${node.label?.name ?? "?"}`;
    case "ClosedEvent":
      return "Issue ditutup";
    case "ReopenedEvent":
      return "Issue dibuka kembali";
    case "AssignedEvent":
      return `Assignee ${node.assignee?.login ?? "—"}`;
    case "UnassignedEvent":
      return `Unassign ${node.assignee?.login ?? "—"}`;
    case "MilestonedEvent":
      return `Milestone ${node.milestoneTitle ?? "?"}`;
    case "DemilestonedEvent":
      return `Milestone dihapus ${node.milestoneTitle ?? "?"}`;
    case "RenamedTitleEvent":
      return `Judul → ${node.currentTitle ?? "?"}`;
    case "IssueComment":
      return "Komentar";
    case "CrossReferencedEvent":
      return "Referensi silang";
    case "ConnectedEvent":
      return "Terhubung ke project/graph";
    case "DisconnectedEvent":
      return "Putus dari graph";
    case "ReferencedEvent":
      return "Referensi commit/PR";
    case "MovedColumnsInProjectEvent":
      return "Pindah kolom di project";
    default:
      return t?.replace(/Event$/, "") ?? "Event";
  }
}

async function main() {
  const items = [];
  let cursor = null;
  let projectMeta = null;
  let iterations = [];

  for (;;) {
    const data = ghGraphql(cursor);
    if (data.errors?.length) {
      console.error(JSON.stringify(data.errors, null, 2));
      process.exit(1);
    }
    const project = data.data?.user?.projectV2;
    if (!project) {
      console.error("Project tidak ditemukan");
      process.exit(1);
    }
    projectMeta = { title: project.title, url: project.url };
    for (const f of project.fields?.nodes ?? []) {
      if (f.configuration?.iterations) {
        iterations = f.configuration.iterations;
      }
    }
    for (const node of project.items.nodes) {
      const fields = fieldsFromNodes(node.fieldValues?.nodes);
      const c = node.content;
      if (!c) continue;
      const base = {
        projectItemId: node.id,
        contentType: c.__typename,
        status: fields.Status ?? null,
        priority: fields.Priority ?? null,
        size: fields.Size ?? null,
        estimate: fields.Estimate ?? null,
        iteration: fields.Iteration ?? null,
        startDate: fields["Start date"] ?? fields["start date"] ?? null,
        targetDate: fields["Target date"] ?? fields["target date"] ?? null,
      };
      if (c.__typename === "Issue") {
        const labels = c.labels?.nodes?.map((l) => l.name) ?? [];
        const events = (c.timelineItems?.nodes ?? []).map((ev) => ({
          at: ev.createdAt,
          kind: ev.__typename,
          detail: timelineDetail(ev),
        }));
        items.push({
          ...base,
          number: c.number,
          title: c.title,
          url: c.url,
          state: c.state,
          labels,
          milestone: c.milestone?.title ?? null,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
          closedAt: c.closedAt,
          events,
        });
      } else if (c.__typename === "PullRequest") {
        items.push({
          ...base,
          number: c.number,
          title: c.title,
          url: c.url,
          state: c.state,
          labels: [],
          milestone: null,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
          closedAt: c.closedAt ?? c.mergedAt,
          mergedAt: c.mergedAt,
          events: [],
        });
      } else if (c.__typename === "DraftIssue") {
        items.push({
          ...base,
          number: null,
          title: c.title,
          url: null,
          state: "DRAFT",
          labels: [],
          milestone: null,
          createdAt: c.createdAt,
          updatedAt: c.createdAt,
          closedAt: null,
          events: [],
        });
      }
    }
    const { hasNextPage, endCursor } = project.items.pageInfo;
    if (!hasNextPage) break;
    cursor = endCursor;
  }

  items.sort((a, b) => {
    const na = a.number ?? 99999;
    const nb = b.number ?? 99999;
    return na - nb;
  });

  const timeline = [];
  for (const item of items) {
    const ref = item.number ? `#${item.number}` : item.title.slice(0, 40);
    if (item.createdAt) {
      timeline.push({
        at: item.createdAt,
        kind: "Created",
        issueNumber: item.number,
        title: item.title,
        detail: `${ref} dibuat`,
        status: item.status,
        iteration:
          typeof item.iteration === "object" ? item.iteration?.title : item.iteration,
      });
    }
    for (const ev of item.events ?? []) {
      timeline.push({
        at: ev.at,
        kind: ev.kind,
        issueNumber: item.number,
        title: item.title,
        detail: `${ref}: ${ev.detail}`,
        status: item.status,
        iteration:
          typeof item.iteration === "object" ? item.iteration?.title : item.iteration,
      });
    }
    if (item.updatedAt && item.updatedAt !== item.createdAt) {
      timeline.push({
        at: item.updatedAt,
        kind: "IssueUpdated",
        issueNumber: item.number,
        title: item.title,
        detail: `${ref} diperbarui (metadata issue)`,
        status: item.status,
        iteration:
          typeof item.iteration === "object" ? item.iteration?.title : item.iteration,
      });
    }
    if (item.closedAt) {
      timeline.push({
        at: item.closedAt,
        kind: "IssueClosedAt",
        issueNumber: item.number,
        title: item.title,
        detail: `${ref} closedAt resmi`,
        status: item.status,
        iteration:
          typeof item.iteration === "object" ? item.iteration?.title : item.iteration,
      });
    }
    if (item.mergedAt) {
      timeline.push({
        at: item.mergedAt,
        kind: "Merged",
        issueNumber: item.number,
        title: item.title,
        detail: `${ref} PR merged`,
        status: item.status,
        iteration:
          typeof item.iteration === "object" ? item.iteration?.title : item.iteration,
      });
    }
  }

  timeline.sort((a, b) => new Date(a.at) - new Date(b.at));

  const byStatus = {};
  for (const item of items) {
    const s = item.status ?? "Tanpa status";
    byStatus[s] = (byStatus[s] ?? 0) + 1;
  }

  const payload = {
    syncedAt: new Date().toISOString(),
    timezone: "Asia/Jakarta",
    project: { ...projectMeta, totalItems: items.length, byStatus },
    iterations,
    registryNote:
      "Sprint actual start & milestone: docs/agile/timeline-registry.md",
    items,
    timeline,
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(payload, null, 2), "utf8");
  console.log(`OK ${OUT} — ${items.length} kartu, ${timeline.length} event timeline`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
