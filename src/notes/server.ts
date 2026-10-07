import { serve } from "@prisma/composer/service-rpc";
import service from "./service.ts";

const port = service.port();

const LINES = [
  "Kokonus Farm, rakit apung di Pekanbaru, 1.920 lubang tanam.",
  "Satu siklus, satu HPP, satu laba.",
  "Owner: Koko Nuswantoro.",
];

const handler = serve(service, {
  rpc: {
    line: async () => ({
      line: LINES[Math.floor(Math.random() * LINES.length)]!,
    }),
  },
});

export default handler;

Bun.serve({ port, hostname: "0.0.0.0", fetch: handler });
