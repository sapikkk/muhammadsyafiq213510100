import node from "@prisma/composer/node";
import { rpc } from "@prisma/composer/service-rpc";
import { compute } from "@prisma/composer-prisma-cloud";
import { notesContract } from "../notes/contract.ts";

export default compute({
  name: "web",
  deps: { notes: rpc(notesContract) },
  build: node({ module: import.meta.url, entry: "../../dist/web/server.mjs" }),
});
