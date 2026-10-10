import { writeFileSync } from "fs";
import path from "path";
import { execSync } from "child_process";

export default async function globalSetup() {
  const root = process.cwd();
  const id = execSync("node scripts/reset-e2e-siklus.js", {
    cwd: root,
    encoding: "utf8",
    env: process.env,
  }).trim();
  writeFileSync(path.join(root, "e2e", ".demo-siklus-id"), id);
}
