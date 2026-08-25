/**
 * Emits public/search-index.json for the site's own search. No external service.
 *
 * The document text comes from lib/markdown.ts's `toHast`, not from a second
 * markdown parser written here — D7 in loops/shared/state.md is explicit about it.
 * A private "what counts as a heading" implementation in a build script is exactly
 * the drift Loop 1 avoided by giving the quiz and flashcard parsers one definition.
 * Same reason lib/docs.ts supplies the route table and the section labels.
 *
 * Two token maps, deliberately: `inverted` over titles and headings, `body` over
 * body prose. The plan says to index titles and headings ONLY, and to let the
 * excerpt carry body matching — but the excerpt is ~300 characters, so a word that
 * appears in paragraph twelve is unfindable. Measured: `heartbeat` occurs in four
 * doc pages and returned nothing. The spec's Definition of Done requires search to
 * work for "a term drawn from a body paragraph", so the plan's rule cannot stand.
 * See D13. The body map costs 121 KB and the whole index still lands near 181 KB,
 * comfortably inside the spec's ~400 KB cap, so nothing is traded away for it.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public", "search-index.json");
const LIMIT = 400 * 1024;
const EXCERPT = 300;

const { getAllDocs, getSidebarTree } = await import(join(root, "lib", "docs.js"));
const { toHast } = await import(join(root, "lib", "markdown.js"));

/** Section label per section key, from the one list lib/docs.ts already keeps. */
const LABELS = new Map(getSidebarTree().map((g) => [g.section, g.label]));

/** Visible prose only: code blocks and diagrams are not sentences a reader searches. */
const SKIP = new Set(["pre", "code", "code-block", "graph-diagram", "style", "script"]);

function textOf(node, out = []) {
  if (node.type === "text") out.push(node.value);
  else if (!(node.type === "element" && SKIP.has(node.tagName))) {
    for (const child of node.children ?? []) textOf(child, out);
  }
  return out;
}

/** Truncate at a word boundary — a half-word excerpt reads like a bug. */
function excerptOf(text) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= EXCERPT) return clean;
  const cut = clean.slice(0, EXCERPT);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

const tokenize = (s) => s.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 1);

const docs = getAllDocs();
const records = [];
const bodyTokens = [];

for (const doc of docs) {
  const source = readFileSync(join(root, "content", doc.repoPath), "utf8");
  const { tree, headings } = await toHast(source, doc.repoPath);
  const prose = textOf(tree).join(" ");
  records.push({
    route: doc.route,
    title: doc.title,
    section: LABELS.get(doc.section) ?? "Overview",
    headings: headings.map((h) => h.text),
    excerpt: excerptOf(prose.replace(doc.title, "")),
  });
  bodyTokens.push(new Set(tokenize(prose)));
}

/**
 * Three shapes, tried largest first. The spec caps the download at ~400 KB and
 * names dropping body excerpts as the mitigation; dropping the body token map is
 * the stage past that, and it is last because it is the one that costs a
 * Definition-of-Done line (D13).
 */
function build({ excerpts, bodyIndex }) {
  const inverted = {};
  records.forEach((rec, i) => {
    for (const token of new Set([...tokenize(rec.title), ...rec.headings.flatMap(tokenize)])) {
      (inverted[token] ??= []).push(i);
    }
  });

  const body = {};
  if (bodyIndex) {
    bodyTokens.forEach((tokens, i) => {
      for (const token of tokens) {
        // A token already carried by the title/heading map does not need a second
        // entry — search.ts scores it from `inverted` and never consults `body`.
        if (!inverted[token]?.includes(i)) (body[token] ??= []).push(i);
      }
    });
  }

  return JSON.stringify({
    records: excerpts ? records : records.map((r) => ({ ...r, excerpt: "" })),
    inverted,
    body,
  });
}

await mkdir(dirname(OUT), { recursive: true });

const STAGES = [
  { excerpts: true, bodyIndex: true, note: "" },
  { excerpts: false, bodyIndex: true, note: " — FALLBACK: body excerpts dropped, index exceeded 400 KB" },
  { excerpts: false, bodyIndex: false, note: " — FALLBACK: excerpts AND body index dropped; body-paragraph search is now degraded" },
];

let json = "";
let note = "";
for (const stage of STAGES) {
  json = build(stage);
  note = stage.note;
  if (Buffer.byteLength(json) <= LIMIT) break;
}

await writeFile(OUT, json);
const bytes = Buffer.byteLength(json);
const parsed = JSON.parse(json);
console.log(
  `build:search OK — ${records.length} pages, ` +
    `${Object.keys(parsed.inverted).length} title/heading tokens, ` +
    `${Object.keys(parsed.body).length} body-only tokens, ` +
    `${bytes} bytes (${(bytes / 1024).toFixed(1)} KB)${note}`,
);
