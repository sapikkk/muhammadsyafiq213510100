import service from "./service.ts";

const { notes } = service.load();
const port = service.port();

Bun.serve({
  port,
  hostname: "0.0.0.0",
  fetch: async () => {
    const { line } = await notes.line({});
    return new Response(`${line}\n`, {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
});
