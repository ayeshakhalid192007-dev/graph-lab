/**
 * Verifies every internal link in the static export resolves to a real file.
 *
 * The course content is vendored from another repo and its internal links are
 * rewritten from relative markdown paths to site routes at build time. That
 * rewrite is driven by the route table in lib/docs.ts, so renaming a directory in
 * the course repo — an ordinary thing to do — silently turns links into 404s that
 * nothing else would catch until a reader hit one.
 *
 * Usage: npm run build && npm run check:links
 */
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "out");
const basePath = process.env.PAGES_BASE_PATH || "";

/**
 * Routes that are linked to but deliberately not built yet, each owned by a later
 * loop. Without this the Loop 2 gate cannot go green: NavBar links to six routes
 * from every page, and real course prose links to /patterns/ and /resources/ —
 * all correct output against a site that is only partly built.
 *
 * Two rules keep this from rotting into a way to hide real breakage:
 *
 *   1. Entries are exact routes, never prefixes. /patterns/ being pending does
 *      not excuse a broken /patterns/anchor-and-freeze/.
 *   2. An entry whose route DOES exist is itself an error. Building the route is
 *      what deletes the line, so the list can only shrink.
 *
 * Delete each line in the task that builds the route. The list must be empty
 * before Loop 5 Task 21 walks the Definition of Done.
 */
const PENDING_ROUTES = new Map([
  // Empty as of Loop 3 Task 14. Every route the spec's route table names is built
  // except /sitemap.xml, /llms.txt and the landing page, which Loop 4 owns and
  // which nothing links to by a route this checker would see.
  //
  // /quizzes/ and /flashcards/ were listed here too. Neither is in the spec's
  // route table and the Loop 2 gate recorded zero links to either, so Task 12
  // deleted the lines rather than inventing index routes to justify them — D12.
]);

if (!existsSync(OUT)) {
  console.error("out/ not found. Run `npm run build` first.");
  process.exit(1);
}

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_next") continue;
      out.push(...(await htmlFiles(full)));
    } else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

/** trailingSlash: true means every route is a directory holding index.html. */
function resolves(rel) {
  const target = rel.endsWith("/") ? join(OUT, rel, "index.html") : join(OUT, rel);
  return existsSync(target) || existsSync(`${target}.html`) || existsSync(join(OUT, rel, "index.html"));
}

const HREF = /(?:href|src)="([^"]+)"/g;
const files = await htmlFiles(OUT);
const broken = [];
const pendingHits = new Map();
let checked = 0;

for (const file of files) {
  const html = await readFile(file, "utf8");
  for (const [, href] of html.matchAll(HREF)) {
    if (/^(https?:|mailto:|tel:|#|data:)/i.test(href)) continue;
    const [path] = href.split("#");
    if (!path || !path.startsWith("/")) continue;
    checked++;
    const rel = basePath && path.startsWith(basePath) ? path.slice(basePath.length) : path;
    if (resolves(rel)) continue;
    if (PENDING_ROUTES.has(rel)) {
      pendingHits.set(rel, (pendingHits.get(rel) ?? 0) + 1);
      continue;
    }
    broken.push(`${file.slice(OUT.length)} -> ${href}`);
  }
}

// A pending route that now exists is a stale entry. Left alone it would quietly
// exempt a route from checking forever, which is exactly what this list must not
// become, so it fails the check until the line is deleted.
const stale = [...PENDING_ROUTES.keys()].filter((route) => resolves(route));

if (broken.length || stale.length) {
  if (broken.length) {
    console.error(`check:links FAILED — ${broken.length} of ${checked} internal links do not resolve:\n`);
    for (const b of [...new Set(broken)].slice(0, 60)) console.error(`  ${b}`);
  }
  if (stale.length) {
    console.error(`\ncheck:links FAILED — ${stale.length} PENDING_ROUTES entries are now built and must be deleted:\n`);
    for (const s of stale) console.error(`  ${s}  (${PENDING_ROUTES.get(s)})`);
  }
  process.exit(1);
}

console.log(`check:links OK — ${checked} internal links across ${files.length} pages all resolve`);
if (pendingHits.size) {
  const total = [...pendingHits.values()].reduce((a, b) => a + b, 0);
  console.log(`\n${total} links point at ${pendingHits.size} routes not built yet (see PENDING_ROUTES):`);
  for (const [route, count] of [...pendingHits].sort()) {
    console.log(`  ${route.padEnd(18)} ${String(count).padStart(4)} links   ${PENDING_ROUTES.get(route)}`);
  }
}
