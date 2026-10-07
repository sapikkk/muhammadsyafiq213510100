import node from "@prisma/composer/node";
import { compute } from "@prisma/composer-prisma-cloud";
import { notesContract } from "./contract.ts";

export default compute({
  name: "notes",
  deps: {},
  build: node({ module: import.meta.url, entry: "../../dist/notes/server.mjs" }),
  expose: { rpc: notesContract },
});
