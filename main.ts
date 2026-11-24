// The 3 AM Commit Message — writes one commit message to /output/entry.txt
//
// The line: three-beat escalation (prod -> deploy -> changelog) with the
// kicker as an action — the agent rolls back the record of its own promise.
// Duelled 3x10x2 against the top 10 of joke-demo-20261123: 10W, margin 18,
// best of 9 candidates across 3 rounds; beats the runner-up on C2.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "hotfix: rolled back prod, the deploy, and the changelog line where I promised this release was safe";

// Gate: UTF-8 text, 1 to 200 characters, not only whitespace, single line.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim() !== LINE) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back check: what landed matches the validated line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch");
}
console.log(`Wrote ${chars.length} characters, 1 line to ${outPath}`);
