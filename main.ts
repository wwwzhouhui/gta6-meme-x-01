// Entry program for the gta6-meme-x-01 bounty (Node 22, standard library only).
// Its only job: copy POST.json from the repository root into /output, where the
// gate reads the post's address. The post itself is the entry — the house reads
// it from X (first picture + text) and hands it to the judge.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });
try {
  copyFileSync(join(botDir, "POST.json"), join(outputDir, "POST.json"));
} catch (error) {
  console.error(`Could not copy POST.json out of ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}
