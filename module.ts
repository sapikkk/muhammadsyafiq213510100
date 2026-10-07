import { module } from "@prisma/composer";
import notesService from "./src/notes/service.ts";
import webService from "./src/web/service.ts";

export default module("muhammadsyafiq213510100", ({ provision }) => {
  const notes = provision(notesService);
  provision(webService, { deps: { notes: notes.rpc } });
});
