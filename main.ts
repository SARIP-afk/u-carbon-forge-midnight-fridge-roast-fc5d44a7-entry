// Write one midnight fridge roast to /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The line is a fixed
// string: the program writes exactly these bytes on every run.
//
// The line (99 chars, 101 bytes) won a 6-candidate head-to-head against the
// judge brief: the fridge locks at midnight and posts a closure notice signed
// "Management" — the petty rule itself, as the fridge's own bureaucracy.
// Full comparison:
// u-carbon-forge-midnight-fridge-roast-fc5d44a7-candidates.md.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My fridge locks at midnight and tapes a note to the door: 'Closed for your own good. — Management.'";

// Gate mirror: the house gate accepts 1-200 characters of non-whitespace
// text. Fail loudly here rather than write a line the gate would refuse.
// Note: no trailing newline — writeFileSync writes exactly LINE, so the
// gated file is 99 chars / 101 bytes, matching the char count the gate
// measures.
if (LINE.length < 1 || LINE.length > 200 || !LINE.trim()) {
  throw new Error(`entry line is ${LINE.length} chars, outside the 1-200 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, { encoding: "utf-8" });
