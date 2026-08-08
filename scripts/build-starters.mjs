/**
 * Emits one JSON payload per starter kit for StarterViewer to fetch on demand.
 *
 * 24 kits with many files each would inflate every pattern page if inlined into
 * the prerendered HTML — the spec flags exactly this as a risk. Fetching a small
 * JSON when the reader opens a kit keeps the pattern pages light.
 *
 * Binary files and anything over 200 KB are listed but not inlined; the viewer
 * shows a "view on GitHub" link for those instead of megabytes of base64.
 *
 * Dot-directories are copied, not skipped: every kit's Claude Code half is
 * `.claude/skills/…`. See R3 in loops/shared/state.md.
 */
import { readdir, readFile, mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const STARTERS = join(root, "content", "starters");
const OUT = join(root, "public", "starters");
const MAX = 200 * 1024;
const BINARY = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".pdf", ".zip"]);

async function walk(dir, base = dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".DS_Store") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, base)));
    else out.push(relative(base, full));
  }
  return out;
}

if (!existsSync(STARTERS)) {
  console.error("content/starters not found. Run `npm run sync:latest`.");
  process.exit(1);
}

await mkdir(OUT, { recursive: true });
let kits = 0,
  files = 0;

for (const entry of await readdir(STARTERS, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dir = join(STARTERS, entry.name);
  const payload = [];
  for (const rel of (await walk(dir)).sort()) {
    const full = join(dir, rel);
    const { size } = await stat(full);
    const binary = BINARY.has(extname(rel).toLowerCase()) || size > MAX;
    payload.push({
      // POSIX separators: the viewer splits on "/" to build its tree, and a
      // Windows build would otherwise emit one flat unsplittable path.
      path: rel.split(/[\\/]/).join("/"),
      content: binary ? null : await readFile(full, "utf8"),
    });
    files++;
  }
  await writeFile(join(OUT, `${entry.name}.json`), JSON.stringify({ files: payload }));
  kits++;
}
console.log(`build:starters OK — ${kits} kits, ${files} files`);
