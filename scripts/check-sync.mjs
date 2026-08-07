/**
 * Proves content/ has not been hand-edited.
 *
 * Re-runs the sync against the commit already pinned in content/SOURCE.json, into
 * a temp directory, and diffs that against content/. Any difference is a hand-edit
 * — content/ is a build artifact, and the whole single-source guarantee rests on it
 * being reproducible from the pinned commit alone.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { cp, mkdtemp, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const temp = await mkdtemp(join(tmpdir(), "graph-lab-sync-"));

try {
  await execFileAsync("node", [join(root, "scripts", "sync-docs.mjs")], {
    cwd: root,
    env: { ...process.env, SYNC_OUT: temp, SYNC_PINNED: "1" },
    maxBuffer: 32 * 1024 * 1024,
  });

  // content/SOURCE.json carries a fresh syncedAt on every run (its `commit` is what
  // matters, and it was just used as the input), and content/README.md is hand-written
  // and lives only in this repo. Those are the only two paths under content/ that are
  // not byte-copies of the course repo, so they are seeded into the temp tree by exact
  // path and the diff then runs with no exclusions.
  //
  // They are NOT passed as `--exclude=README.md` / `--exclude=SOURCE.json`: diff matches
  // those globs against every basename at every depth, which silently exempted the other
  // 43 README.md files under content/ — 17 doc pages and all 24 starter kits — from the
  // check. A hand-edit to any of them passed green. Verified 2026-08-07 by editing
  // content/docs/README.md and watching this script report OK.
  for (const seeded of ["README.md", "SOURCE.json"]) {
    await cp(join(root, "content", seeded), join(temp, seeded));
  }
  const args = ["-r", "-q", join(root, "content"), temp];
  try {
    await execFileAsync("diff", args, { maxBuffer: 32 * 1024 * 1024 });
  } catch (err) {
    console.error("content/ does not match the commit pinned in SOURCE.json.\n");
    console.error(err.stdout || err.message);
    console.error("\ncontent/ is generated. Fix the course repo and run `npm run sync:latest`.");
    process.exit(1);
  }

  const { commit } = JSON.parse(await readFile(join(root, "content", "SOURCE.json"), "utf8"));
  console.log(`sync:check OK — content/ matches ${commit.slice(0, 8)}`);
} finally {
  await rm(temp, { recursive: true, force: true });
}
