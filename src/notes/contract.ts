import { contract, rpc } from "@prisma/composer/service-rpc";
import { type } from "arktype";

export const notesContract = contract({
  line: rpc({ input: type({}), output: type({ line: "string" }) }),
});
