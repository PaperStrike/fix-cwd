#!/usr/bin/env node
import spawn from "cross-spawn";
import { realpathSync } from "node:fs";

const cwd = realpathSync.native(process.cwd());
const [cmd, ...args] = process.argv.slice(2);

const child = spawn(cmd, args, { stdio: "inherit", cwd });

process.on("SIGTERM", () => child.kill("SIGTERM"));
process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGBREAK", () => child.kill("SIGBREAK"));
process.on("SIGHUP", () => child.kill("SIGHUP"));

child.on("exit", (code, signal) => {
  if (signal === "SIGINT") {
    process.exit(0);
  }
  process.exit(code ?? 1);
});
