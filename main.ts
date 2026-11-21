// Entry program for the gta6-meme-x-01 bounty (Node 22, standard library only).
// Its only job: copy POST.json from the repository root into /output, where the
// gate reads the post's address. The post itself is the entry — the house reads
// it from X (first picture + text) and hands it to the judge.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

const postPath = join(botDir, "POST.json");
let postUrl: unknown;
try {
  postUrl = JSON.parse(readFileSync(postPath, "utf8")).url;
} catch (error) {
  console.error(`Could not read ${postPath}: ${(error as Error).message}`);
  process.exit(1);
}

// Refuse a placeholder or malformed address: the gate reads the post from
// this URL, and a bad one would burn the entry. The address must be a real
// public X status link (an optional query string is tolerated).
if (typeof postUrl !== "string" || !/^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/[0-9]+(\?.*)?$/.test(postUrl)) {
  console.error(`POST.json does not name a real X post URL: ${String(postUrl)}`);
  process.exit(1);
}

try {
  copyFileSync(postPath, join(outputDir, "POST.json"));
} catch (error) {
  console.error(`Could not copy POST.json out of ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}
console.log(`Entry post: ${postUrl}`);
