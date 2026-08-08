/**
 * Vendors the course content into content/ so the static export can render it.
 *
 * The course lives in a different repo (graph-engineering-crash-course); this app
 * is graph-lab. Rather than a submodule — which would force `submodules: recursive`
 * into the Pages workflow and friction into every clone — the files are copied in
 * and committed, pinned to one commit recorded in content/SOURCE.json.
 *
 * Files are copied BYTE FOR BYTE. No banners, no injected frontmatter, no rewriting.
 * A file on the site must be textually identical to the file on GitHub, because
 * scripts/check-sync.mjs proves that property on every push and a single added
 * character would (correctly) turn the build red.
 *
 * Usage:
 *   npm run sync:latest                        # ../graph-engineering-course
 *   COURSE_REPO=/path/to/course npm run sync:latest
 *   SYNC_OUT=/tmp/x node scripts/sync-docs.mjs # used by check-sync.mjs
 *   SYNC_PINNED=1 node scripts/sync-docs.mjs   # sync the commit already in SOURCE.json
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = process.env.COURSE_REPO || join(root, "..", "graph-engineering-course");
const CONTENT = process.env.SYNC_OUT || join(root, "content");
const REPO = "ayeshakhalid192007-dev/graph-engineering-crash-course";

/** Trees copied out of the course repo, and where they land under content/. */
const TREES = ["docs", "patterns", "starters", "resources"];

/** Every file under `dir`, recursively, relative to `dir`. Dotfiles skipped. */
async function walk(dir, base = dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, base)));
    else out.push(relative(base, full));
  }
  return out;
}

if (!existsSync(source)) {
  console.error(`Course repo not found at ${source}. Set COURSE_REPO.`);
  process.exit(1);
}

// When pinning, check the recorded commit out into a detached worktree first, so
// `sync:check` compares against the same bytes the site was built from rather than
// whatever main happens to hold today.
let workdir = source;
let tempWorktree = null;
if (process.env.SYNC_PINNED) {
  const pinned = JSON.parse(readFileSync(join(root, "content", "SOURCE.json"), "utf8"));
  tempWorktree = join(root, ".sync-pinned");
  await rm(tempWorktree, { recursive: true, force: true });
  await execFileAsync("git", ["worktree", "add", "--detach", tempWorktree, pinned.commit], { cwd: source });
  workdir = tempWorktree;
}

try {
  // content/README.md is hand-written and explains that this directory is generated.
  // Preserve it across the wipe.
  const readmePath = join(CONTENT, "README.md");
  const readme = existsSync(readmePath) ? await readFile(readmePath, "utf8") : null;

  await rm(CONTENT, { recursive: true, force: true });
  await mkdir(CONTENT, { recursive: true });
  if (readme) await writeFile(readmePath, readme);

  let copied = 0;
  for (const tree of TREES) {
    const from = join(workdir, tree);
    if (!existsSync(from)) {
      console.warn(`  skip ${tree} (not in course repo)`);
      continue;
    }
    for (const rel of await walk(from)) {
      const body = await readFile(join(from, rel));   // Buffer — byte for byte
      const dest = join(CONTENT, tree, rel);
      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, body);
      copied++;
    }
  }

  const { stdout: sha } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: workdir });
  await writeFile(
    join(CONTENT, "SOURCE.json"),
    JSON.stringify(
      { repo: REPO, commit: sha.trim(), syncedAt: new Date().toISOString(), files: copied },
      null,
      2,
    ) + "\n",
  );
  console.log(`Synced ${copied} files from ${workdir} @ ${sha.trim().slice(0, 8)} into ${CONTENT}`);
} finally {
  if (tempWorktree) {
    await execFileAsync("git", ["worktree", "remove", "--force", tempWorktree], { cwd: source }).catch(() => {});
  }
}
