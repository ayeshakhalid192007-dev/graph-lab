# `graph-lab` Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Execution mode:** This project uses **five separate, independent `/loop` instances — one per Loop section below, not one loop reused across sections and not one combined loop spanning the whole build.** Each loop is created fresh only after the previous loop's approval gate clears, and each stops permanently at its own gate. The exact `/loop` command to type for each is given in the Loop Charter. Loops share no runtime state; they hand off through two files on disk — this plan's checkboxes and `graph-lab/LOOP-STATE.md`.

**Date:** 2026-08-07
**Owner:** Ayesha Khalid
**Spec:** `2026-08-06-course-website-design.md` (approved) — that document is authoritative; where this plan and the spec disagree, the spec wins and this plan is wrong.

**Goal:** Ship `graph-lab` — a fully static Next.js site where a reader can work through the entire Graph Engineering course in a browser: all 86 doc pages, the 17-step roadmap, four skill tracks, 23 patterns with their 24 starter kits, 7 quizzes, 6 flashcard sets, 8 projects, 10 attributed sources, site search, and the Graph Ready certification flow.

**Architecture:** A separate repo at `~/graph-lab`. Course markdown is **copied in**, byte for byte, by `scripts/sync-docs.mjs` and pinned to a commit in `content/SOURCE.json`; `content/` is a build artifact that CI proves has not been hand-edited. `lib/markdown.ts` runs a remark/rehype pipeline that turns plain course markdown into React elements — **no MDX**, because course files must stay plain and GitHub-readable. Everything prerenders via `output: "export"`; every stateful feature is `localStorage`.

**Tech Stack:** Next.js 16.2.11 (App Router, static export), React 19.2.4, TypeScript 5, Tailwind CSS v4, unified/remark/rehype, Shiki (build-time highlighting), mermaid 11 (client-rendered), next-themes. Package manager: **npm**. Node: **24** (pinned in `.nvmrc`, `package.json` engines, and the deploy workflow).

---

## Global Constraints

Every task's requirements implicitly include this section.

- **`content/` is generated, never hand-edited.** `scripts/sync-docs.mjs` is its only writer. Any task that needs different content changes the course repo and re-syncs — it does not edit `content/`.
- **No course content is authored in `graph-lab`.** The single exception is the landing page's own hero and section copy, which is site chrome. That copy must be **independently worded from both `graph-engineering-course/README.md` and `docs/README.md`** — a third, fresh phrasing of the same pitch, not a paraphrase of either.
- **MDX is not used.** Course markdown stays plain. All component substitution is pattern-matching on ordinary markdown inside `lib/markdown.ts`.
- **Three components are deliberately NOT built:** `CodeTabs`, `Callout`, `CheckYourself`. Zero content exercises them (verified 2026-08-06 and re-verified 2026-08-07). Their degraded fallbacks are correct output, not bugs.
- **The three animated diagrams — `TwoGraphsSplit`, `LifecycleDiagram`, `SubgraphViewer` — are landing-page components only.** Embedding them in doc pages would require inventing a marker convention inside `docs/`, which is a course-content change and out of scope.
- **Node >= 24.** `scripts/check-content-shape.mjs` imports `lib/parse-content.ts` directly so the quiz/flashcard parsers have exactly one definition. Only Node >= 23.6 strips types from an imported `.ts` without a flag. Keep `.nvmrc`, `package.json` `engines`, and `.github/workflows/deploy.yml` in step — never lower one in isolation.
- **`basePath` comes from `PAGES_BASE_PATH`**, unset locally so the dev server serves from root, set to `/graph-lab` in CI.
- **Blueprint palette only.** Warm paper white / ink blue / graphite in light; deep slate / cyan in dark. No shadows, no gradients, no glow. Hairline rules instead of card borders. Nothing is copied from `loop-lab`'s palette or type scale — structure is borrowed, visuals are not.
- **All motion is suppressed under `prefers-reduced-motion: reduce`.**
- **Every interactive element gets a visible focus state and an accessible name.**
- **Creating the GitHub repo, pushing to it, and enabling Pages require explicit user confirmation** at Loop 5 Task 22. Everything before that is local.
- **Commit after every task.** Conventional-commit style messages, as shown in each task's final step.

---

## Loop Charter

Five loops. Each is a fresh `/loop` instance, self-paced (no interval argument — build work paces itself off verification results, not a clock).

| Loop | Scope | Tasks | Gate command |
| --- | --- | --- | --- |
| **1 — Foundation & pipeline** | Repo scaffold, sync pipeline, CI checks, Blueprint tokens, app shell | 1–4 | `npm run verify:1` |
| **2 — Render layer & 86 doc pages** | content/docs libs, link rewriting, markdown pipeline, doc route, link check | 5–9 | `npm run verify:2` |
| **3 — Interactive surfaces** | tracks, patterns, starters, quizzes, flashcards, projects, resources, certification | 10–14 | `npm run verify:3` |
| **4 — Landing, identity, search** | search index + dialog, landing page, animated diagrams, sitemap/llms.txt/404/OG | 15–18 | `npm run verify:4` |
| **5 — Polish, verify, deploy** | responsive, a11y, dual-theme, full DoD, deploy | 19–22 | `npm run verify:all` |

### Rules that apply to every loop

1. **A loop only ever touches its own tasks.** If a loop finds a defect in an earlier loop's output, it fixes it and records the fix in `LOOP-STATE.md` under "Cross-loop repairs" — it does not start new work from a later loop.
2. **A loop stops permanently at its gate.** No loop hands off to the next automatically. The user reviews, then starts the next loop by hand.
3. **`LOOP-STATE.md` is the handoff.** Every task appends one entry: task number, what landed, what the verification printed, anything the next loop needs to know.
4. **Verification before checkbox.** A checkbox is ticked only after the step's command was run and its output read. A red command means the task is not done.
5. **If a loop is blocked, it stops and reports** rather than inventing an answer. Blocked ≠ done.

### The five `/loop` commands

Type these one at a time, in order, each only after the previous loop's gate has been reviewed and approved. Run them from `~/graph-lab` once it exists (Loop 1 Task 1 creates it; start Loop 1 from `~/graph-landing`).

**Loop 1:**
```
/loop Read ~/graph-landing/2026-08-07-graph-lab-implementation-plan.md. Execute Loop 1 only (Tasks 1-4) using superpowers:subagent-driven-development. Do the next unchecked step, run its verification command and read the output, tick the checkbox, append to ~/graph-lab/LOOP-STATE.md, and commit. When all Task 1-4 checkboxes are ticked and `npm run verify:1` is green, STOP this loop permanently and report the gate output. Do not start Loop 2.
```

**Loop 2:**
```
/loop Read ~/graph-landing/2026-08-07-graph-lab-implementation-plan.md and ~/graph-lab/LOOP-STATE.md. Execute Loop 2 only (Tasks 5-9) using superpowers:subagent-driven-development. Do the next unchecked step, run its verification command and read the output, tick the checkbox, append to LOOP-STATE.md, and commit. When all Task 5-9 checkboxes are ticked and `npm run verify:2` is green, STOP this loop permanently and report the gate output. Do not start Loop 3.
```

**Loop 3:**
```
/loop Read ~/graph-landing/2026-08-07-graph-lab-implementation-plan.md and ~/graph-lab/LOOP-STATE.md. Execute Loop 3 only (Tasks 10-14) using superpowers:subagent-driven-development. Do the next unchecked step, run its verification command and read the output, tick the checkbox, append to LOOP-STATE.md, and commit. When all Task 10-14 checkboxes are ticked and `npm run verify:3` is green, STOP this loop permanently and report the gate output. Do not start Loop 4.
```

**Loop 4:**
```
/loop Read ~/graph-landing/2026-08-07-graph-lab-implementation-plan.md and ~/graph-lab/LOOP-STATE.md. Execute Loop 4 only (Tasks 15-18) using superpowers:subagent-driven-development. Do the next unchecked step, run its verification command and read the output, tick the checkbox, append to LOOP-STATE.md, and commit. When all Task 15-18 checkboxes are ticked and `npm run verify:4` is green, STOP this loop permanently and report the gate output. Do not start Loop 5.
```

**Loop 5:**
```
/loop Read ~/graph-landing/2026-08-07-graph-lab-implementation-plan.md and ~/graph-lab/LOOP-STATE.md. Execute Loop 5 only (Tasks 19-22) using superpowers:subagent-driven-development. Task 22 is BLOCKED until I explicitly confirm repo creation and Pages — stop and ask, do not create any remote repo. Do the next unchecked step, run its verification command and read the output, tick the checkbox, append to LOOP-STATE.md, and commit. When Tasks 19-21 are ticked and `npm run verify:all` is green, STOP and report; this is the final loop.
```

---

## File Structure

Created across the five loops. `~/graph-lab` is a sibling of `~/graph-engineering-course`.

```text
graph-lab/
├── .nvmrc                              "24"                                    L1
├── package.json  tsconfig.json  next.config.ts  postcss.config.mjs             L1
├── eslint.config.mjs  .gitignore                                               L1
├── LOOP-STATE.md                       loop-to-loop handoff log                L1
├── app/
│   ├── globals.css                     Blueprint tokens + Tailwind v4          L1
│   ├── layout.tsx                      shell: nav, footer, theme, dot-grid     L1
│   ├── page.tsx                        landing                                 L4
│   ├── not-found.tsx                   404                                     L4
│   ├── sitemap.ts                      generated sitemap                       L4
│   ├── docs/[...slug]/page.tsx         all 86 doc pages                        L2
│   ├── tracks/page.tsx                 G1–G4 + 17-step roadmap                 L3
│   ├── patterns/page.tsx               filterable browser over 23 patterns     L3
│   ├── patterns/[slug]/page.tsx        one spec + its starter kit              L3
│   ├── quiz/[part]/page.tsx            7 quizzes                               L3
│   ├── flashcards/[part]/page.tsx      6 flashcard sets                        L3
│   ├── projects/page.tsx               8 practice projects                     L3
│   ├── resources/page.tsx              10 sources + anti-patterns              L3
│   └── certification/page.tsx          Graph Ready checklist + certificate     L3
├── components/
│   ├── landing/  Hero TwoGraphsSplit LifecycleDiagram SubgraphViewer
│   │             Curriculum PatternGrid GetStarted Maintainers Footer          L4
│   ├── docs/     DocSidebar DocToc DocBreadcrumbs DocFooterNav                 L2
│   ├── content/  GraphDiagram CodeBlock                                        L2
│   ├── interactive/ ProgressTracker TrackSelector Quiz Flashcards
│   │                PatternBrowser StarterViewer GraphReadyChecklist
│   │                CertificateGenerator                                       L3
│   └── ui/       Section Panel PillButton ThemeToggle ThemeProvider
│                 SearchDialog NavBar ScrollAnimator                            L1/L4
├── lib/
│   ├── base-path.ts        PAGES_BASE_PATH helper                              L1
│   ├── parse-content.ts    quiz + flashcard parsers (shared with CI check)     L1
│   ├── content.ts          reads content/, frontmatter, SOURCE.json            L2
│   ├── docs.ts             slug map, roadmap, sidebar tree, prev/next          L2
│   ├── links.ts            relative .md link → site route                      L2
│   ├── markdown.ts         remark/rehype → React elements                      L2
│   ├── patterns.ts         registry.yaml + pattern specs + starter kits        L3
│   ├── tracks.ts           G1–G4 track definitions (structural data)           L3
│   └── search.ts           client-side index query                             L4
├── content/                GENERATED — never hand-edited
│   ├── docs/ patterns/ starters/ resources/  SOURCE.json  README.md            L1
├── public/
│   ├── search-index.json   GENERATED by build:search                           L4
│   ├── og-image.png  llms.txt                                                  L4
│   └── starters/<slug>.json  GENERATED kit file payloads                       L3
├── scripts/
│   ├── sync-docs.mjs  check-sync.mjs  check-content-shape.mjs                  L1
│   ├── build-starters.mjs                                                      L3
│   ├── build-search-index.mjs                                                  L4
│   └── check-links.mjs                                                         L2
└── .github/workflows/deploy.yml                                                L5
```

**Why `lib/parse-content.ts`, `lib/patterns.ts`, and `lib/tracks.ts` exist** — the spec's `lib/` listing is illustrative, not exhaustive. Pattern/starter loading and the quiz/flashcard parsers are real responsibilities that would otherwise bloat `content.ts`; `tracks.ts` holds the four G1–G4 track definitions, which are structural site data (the tracks table is not itself a rendered doc page), not course content.

---

# LOOP 1 — Foundation & Content Pipeline

**Entry condition:** `~/graph-engineering-course` exists on disk with a clean working tree and a pushed `main`.
**Exit condition:** `npm run verify:1` green — a static export builds, `content/` holds 86+ synced files pinned to a commit, and both content checks pass.

---

## Task 1: Scaffold the `graph-lab` repo

**Files:**
- Create: `~/graph-lab/package.json`
- Create: `~/graph-lab/tsconfig.json`
- Create: `~/graph-lab/next.config.ts`
- Create: `~/graph-lab/postcss.config.mjs`
- Create: `~/graph-lab/eslint.config.mjs`
- Create: `~/graph-lab/.nvmrc`
- Create: `~/graph-lab/.gitignore`
- Create: `~/graph-lab/LOOP-STATE.md`
- Create: `~/graph-lab/lib/base-path.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: the npm scripts every later task runs (`sync:latest`, `sync:check`, `check:content-shape`, `build`, `verify:1`…`verify:all`); `withBasePath(path: string): string` from `lib/base-path.ts`, imported by every component that emits a bare `href`/`src` string.

- [ ] **Step 1: Create the repo and pin Node**

```bash
mkdir -p ~/graph-lab && cd ~/graph-lab && git init -b main
echo 24 > .nvmrc
printf 'node_modules/\n.next/\nout/\n.env*.local\n.DS_Store\n' > .gitignore
```

- [ ] **Step 2: Write `package.json`**

```json
{
  "name": "graph-lab",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "//": "Node >=23.6 strips types from an imported .ts. scripts/check-content-shape.mjs imports lib/parse-content.ts so the quiz and flashcard parsers have exactly one definition; on older Node the check dies with ERR_UNKNOWN_FILE_EXTENSION. Keep in step with .nvmrc and .github/workflows/deploy.yml.",
    "node": ">=24"
  },
  "scripts": {
    "dev": "next dev",
    "sync:latest": "node scripts/sync-docs.mjs",
    "sync:check": "node scripts/check-sync.mjs",
    "check:content-shape": "node scripts/check-content-shape.mjs",
    "check:links": "node scripts/check-links.mjs",
    "build:starters": "node scripts/build-starters.mjs",
    "build:search": "node scripts/build-search-index.mjs",
    "prebuild": "node scripts/build-starters.mjs && node scripts/build-search-index.mjs",
    "build": "next build",
    "typecheck": "tsc --noEmit",
    "lint": "eslint",
    "verify:1": "npm run sync:check && npm run check:content-shape && npm run typecheck && npm run build",
    "verify:2": "npm run verify:1 && npm run check:links",
    "verify:3": "npm run verify:2",
    "verify:4": "npm run verify:2",
    "verify:all": "npm run sync:check && npm run check:content-shape && npm run typecheck && npm run lint && npm run build && npm run check:links"
  },
  "dependencies": {
    "next": "16.2.11",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "next-themes": "^0.4.6",
    "github-slugger": "^2.0.0",
    "gray-matter": "^4.0.3",
    "mermaid": "^11.0.0",
    "unified": "^11.0.5",
    "remark-parse": "^11.0.0",
    "remark-gfm": "^4.0.0",
    "remark-rehype": "^11.1.0",
    "rehype-raw": "^7.0.0",
    "rehype-slug": "^6.0.0",
    "rehype-react": "^8.0.0",
    "unist-util-visit": "^5.0.0",
    "hast-util-to-string": "^3.0.0",
    "shiki": "^3.0.0",
    "@shikijs/rehype": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "16.2.11"
  }
}
```

The `verify:N` scripts are cumulative on purpose: Loop 3 cannot silently break Loop 2's link check.

- [ ] **Step 3: Write `next.config.ts`**

```typescript
import type { NextConfig } from "next";

// GitHub Pages serves a project site from /<repo>, so the static export needs a
// matching basePath + assetPrefix or /_next assets 404. The deploy workflow sets
// PAGES_BASE_PATH=/graph-lab; local dev and `npm run build` leave it unset and
// serve from the root.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",              // fully static — deploy anywhere
  images: { unoptimized: true }, // required for static export
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,           // emit index.html per route so Pages serves it directly
};

export default nextConfig;
```

- [ ] **Step 4: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "content", "out"]
}
```

`content` is excluded so 86 markdown files never enter the TS program.

- [ ] **Step 5: Write `postcss.config.mjs` and `eslint.config.mjs`**

```javascript
// postcss.config.mjs
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
```

```javascript
// eslint.config.mjs
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: ["content/**", "out/**", ".next/**", "public/**"] },
];
```

- [ ] **Step 6: Write `lib/base-path.ts`**

```typescript
/**
 * GitHub Pages serves this site from /graph-lab, and Next only rewrites hrefs it
 * controls — a bare string in a `content` attribute, a canvas image source, or a
 * fetch() URL is left alone. Anything hand-built goes through withBasePath().
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
```

Add `NEXT_PUBLIC_BASE_PATH` to the build env alongside `PAGES_BASE_PATH` in Task 22's workflow — `process.env.PAGES_BASE_PATH` is not readable from client components.

- [ ] **Step 7: Write `LOOP-STATE.md`**

```markdown
# graph-lab loop state

Handoff log between the five `/loop` instances. One entry per completed task.
Plan: `~/graph-landing/2026-08-07-graph-lab-implementation-plan.md`

## Loop 1 — Foundation & pipeline

- Task 1: scaffold — <what landed, what verification printed>

## Cross-loop repairs

<a loop that fixes an earlier loop's defect records it here>
```

- [ ] **Step 8: Install and verify the scaffold builds**

```bash
cd ~/graph-lab && npm install && npx tsc --noEmit
```
Expected: install succeeds; `tsc` passes (nothing to typecheck yet beyond `lib/base-path.ts`). A config error here — not a missing-file error — means stop and fix before continuing.

- [ ] **Step 9: Commit**

```bash
cd ~/graph-lab
git add -A
git commit -m "chore: scaffold graph-lab — Next 16 static export, Tailwind v4, Node 24"
```

---

## Task 2: The content sync pipeline

**Files:**
- Create: `~/graph-lab/scripts/sync-docs.mjs`
- Create: `~/graph-lab/content/README.md` (written by hand once; `sync-docs.mjs` must preserve it)

**Interfaces:**
- Consumes: `~/graph-engineering-course` (override with `COURSE_REPO`).
- Produces: `content/docs/`, `content/patterns/`, `content/starters/`, `content/resources/` as byte-identical copies, and `content/SOURCE.json` with keys `repo`, `commit`, `syncedAt`, `files`. Every `lib/` module in Loop 2 reads from these paths.

- [ ] **Step 1: Write `scripts/sync-docs.mjs`**

```javascript
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
```

- [ ] **Step 2: Write `content/README.md`**

```markdown
# This directory is generated

Everything under `content/` is copied out of the course repo
[`graph-engineering-crash-course`](https://github.com/ayeshakhalid192007-dev/graph-engineering-crash-course)
by `scripts/sync-docs.mjs`, byte for byte, pinned to the commit recorded in
`SOURCE.json`.

**Do not edit anything here.** `npm run sync:check` re-runs the sync against the
pinned commit and diffs the result; a hand-edit turns the build red.

If a page reads wrong on the site, the fix belongs in the course repo's `docs/`.
Then run `npm run sync:latest` and commit the resulting diff.
```

- [ ] **Step 3: Run the first sync**

```bash
cd ~/graph-lab && mkdir -p content && npm run sync:latest
```
Expected: `Synced <n> files from … @ <sha>`. `<n>` should be ~200+ (86 docs, 25 pattern files, 24 starter kits' worth of files, 2 resources).

- [ ] **Step 4: Verify the copy is byte-identical and complete**

```bash
cd ~/graph-lab
diff -r content/docs ../graph-engineering-course/docs && echo "docs identical"
find content/docs -name '*.md' | wc -l          # expect 86
ls content/patterns/*.md | wc -l                # expect 25 (23 patterns + README + pattern-template)
ls -d content/starters/*/ | wc -l               # expect 24
cat content/SOURCE.json
```
Expected: `docs identical`, then `86`, `25`, `24`, and a SOURCE.json whose `commit` matches `git -C ../graph-engineering-course rev-parse HEAD`.

- [ ] **Step 5: Commit**

```bash
cd ~/graph-lab
git add -A
git commit -m "feat: add sync-docs pipeline and vendor course content pinned to a commit"
```

---

## Task 3: Sync and content-shape CI checks

**Files:**
- Create: `~/graph-lab/lib/parse-content.ts`
- Create: `~/graph-lab/scripts/check-sync.mjs`
- Create: `~/graph-lab/scripts/check-content-shape.mjs`

**Interfaces:**
- Consumes: `content/` and `content/SOURCE.json` (Task 2).
- Produces: `parseQuiz(body: string): QuizQuestion[]` and `parseFlashcards(body: string): Flashcard[]` from `lib/parse-content.ts`, where `QuizQuestion = { n: number; title: string; question: string; answer: string }` and `Flashcard = { term: string; definition: string }`. Loop 3 Task 12 imports these exact functions — the CI check and the rendered page share one parser, so a page can never disagree with the check that guards it.

- [ ] **Step 1: Write `lib/parse-content.ts`**

The shapes below were verified against the shipped content on 2026-08-07: a quiz section is `## N. Title`, then the question paragraph, then a `<details>` whose `<summary>` is `Reveal the answer`; a flashcard set is a `| Term | Definition |` GFM table whose term cells are bold.

```typescript
export type QuizQuestion = { n: number; title: string; question: string; answer: string };
export type Flashcard = { term: string; definition: string };

const SECTION = /^## (\d+)\.\s+(.+)$/gm;
const DETAILS = /<details>\s*<summary>\s*Reveal the answer\s*<\/summary>([\s\S]*?)<\/details>/;

/**
 * Splits a quiz.md into its numbered questions.
 *
 * Everything between a `## N. Title` heading and its <details> block is the
 * question; the <details> body is the answer. A section with no <details> is a
 * parse failure, not an empty question — check-content-shape.mjs fails the build
 * on it rather than shipping a quiz that silently stops after item two.
 */
export function parseQuiz(body: string): QuizQuestion[] {
  const starts = [...body.matchAll(SECTION)];
  return starts.map((match, i) => {
    const from = match.index! + match[0].length;
    const to = i + 1 < starts.length ? starts[i + 1].index! : body.length;
    const block = body.slice(from, to);
    const details = block.match(DETAILS);
    if (!details) {
      throw new Error(`Quiz section "${match[2]}" has no <details>…</details> answer block`);
    }
    return {
      n: Number(match[1]),
      title: match[2].trim(),
      question: block.slice(0, details.index!).trim(),
      answer: details[1].trim(),
    };
  });
}

/**
 * Reads the single `| Term | Definition |` table out of a flashcards.md.
 *
 * Term cells are bold in the source (`**Node**`); the asterisks are markup, not
 * part of the term, so they are stripped here rather than in the component.
 */
export function parseFlashcards(body: string): Flashcard[] {
  const cards: Flashcard[] = [];
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) continue;
    const cells = trimmed.slice(1, -1).split("|").map((c) => c.trim());
    if (cells.length !== 2) continue;
    if (/^-+$/.test(cells[0].replace(/[\s:]/g, ""))) continue;      // separator row
    if (cells[0] === "Term" && cells[1] === "Definition") continue; // header row
    const term = cells[0].replace(/^\*\*|\*\*$/g, "").trim();
    if (!term || !cells[1]) continue;
    cards.push({ term, definition: cells[1] });
  }
  return cards;
}
```

- [ ] **Step 2: Write `scripts/check-sync.mjs`**

```javascript
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
import { mkdtemp, rm, readFile } from "node:fs/promises";
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

  // SOURCE.json carries a fresh syncedAt timestamp on every run, so it is excluded
  // from the byte comparison; its `commit` is what matters and it was just used as
  // the input. content/README.md is hand-written and lives only in this repo.
  const args = ["-r", "-q", "--exclude=SOURCE.json", "--exclude=README.md", join(root, "content"), temp];
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
```

- [ ] **Step 3: Write `scripts/check-content-shape.mjs`**

```javascript
/**
 * Asserts the quiz and flashcard structures the site's parsers depend on.
 *
 * These are the only two places where a page reads *structure* out of course
 * markdown rather than just rendering it. A future content edit that changes the
 * shape must produce a red build, never a silently empty quiz page.
 *
 * Imports lib/parse-content.ts directly — Node >=23.6 strips the types — so the
 * check and the rendered page can never disagree about what parses.
 */
import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseQuiz, parseFlashcards } from "../lib/parse-content.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(root, "content", "docs");

// Verified against the shipped content on 2026-08-07. Part 6 has no flashcards
// file — that is intentional per the master plan, not a gap.
const EXPECTED_QUIZ = { 1: 3, 2: 2, 3: 3, 4: 2, 5: 3, 6: 2, 7: 2 };
const EXPECTED_CARDS = { 1: 6, 2: 3, 3: 6, 4: 5, 5: 7, 7: 3 };

const parts = (await readdir(DOCS, { withFileTypes: true }))
  .filter((e) => e.isDirectory() && /^\d+-part-(\d+)-/.test(e.name))
  .map((e) => ({ dir: e.name, part: Number(e.name.match(/^\d+-part-(\d+)-/)[1]) }))
  .sort((a, b) => a.part - b.part);

const failures = [];

for (const { dir, part } of parts) {
  try {
    const questions = parseQuiz(await readFile(join(DOCS, dir, "quiz.md"), "utf8"));
    if (questions.length !== EXPECTED_QUIZ[part]) {
      failures.push(`${dir}/quiz.md: parsed ${questions.length}, expected ${EXPECTED_QUIZ[part]}`);
    }
    for (const q of questions) {
      if (!q.question) failures.push(`${dir}/quiz.md: question ${q.n} has an empty body`);
      if (!q.answer) failures.push(`${dir}/quiz.md: question ${q.n} has an empty answer`);
    }
  } catch (err) {
    failures.push(`${dir}/quiz.md: ${err.message}`);
  }

  if (!(part in EXPECTED_CARDS)) continue;
  try {
    const cards = parseFlashcards(await readFile(join(DOCS, dir, "flashcards.md"), "utf8"));
    if (cards.length !== EXPECTED_CARDS[part]) {
      failures.push(`${dir}/flashcards.md: parsed ${cards.length}, expected ${EXPECTED_CARDS[part]}`);
    }
  } catch (err) {
    failures.push(`${dir}/flashcards.md: ${err.message}`);
  }
}

if (parts.length !== 7) failures.push(`found ${parts.length} part directories, expected 7`);

if (failures.length) {
  console.error("Content shape check failed:\n" + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}
console.log(`check:content-shape OK — 7 quizzes, 6 flashcard sets parse as expected`);
```

- [ ] **Step 4: Run both checks**

```bash
cd ~/graph-lab && npm run sync:check && npm run check:content-shape
```
Expected: `sync:check OK — content/ matches <sha>` then `check:content-shape OK — 7 quizzes, 6 flashcard sets parse as expected`.

- [ ] **Step 5: Prove `sync:check` actually catches a hand-edit**

```bash
cd ~/graph-lab
printf '\nedited by hand\n' >> content/docs/README.md
npm run sync:check; echo "exit=$?"
git checkout content/docs/README.md
```
Expected: it fails, prints the diff, and `exit=1`. A green result here means the check is not doing its job — stop and fix it. Restore the file afterward.

- [ ] **Step 6: Commit**

```bash
cd ~/graph-lab
git add lib/parse-content.ts scripts/check-sync.mjs scripts/check-content-shape.mjs
git commit -m "feat: add sync:check and content-shape CI gates with shared parsers"
```

---

## Task 4: Blueprint design tokens and the app shell

**Files:**
- Create: `~/graph-lab/app/globals.css`
- Create: `~/graph-lab/app/layout.tsx`
- Create: `~/graph-lab/components/ui/ThemeProvider.tsx`
- Create: `~/graph-lab/components/ui/ThemeToggle.tsx`
- Create: `~/graph-lab/components/ui/NavBar.tsx`
- Create: `~/graph-lab/components/ui/Section.tsx`
- Create: `~/graph-lab/components/ui/Panel.tsx`
- Create: `~/graph-lab/components/ui/PillButton.tsx`
- Create: `~/graph-lab/app/page.tsx` (temporary placeholder; Loop 4 Task 16 replaces it)

**Interfaces:**
- Consumes: `withBasePath` (Task 1).
- Produces: the CSS custom properties every later component styles against — `--paper`, `--ink`, `--graphite`, `--rule`, `--accent`, `--surface`, `--muted` — plus `<Section>`, `<Panel>`, `<PillButton>` from `components/ui/`. `Section` takes `{ id?: string; className?: string; children: React.ReactNode }`; `Panel` takes `{ className?: string; children: React.ReactNode }` and draws hairline rules with corner ticks; `PillButton` takes `{ href: string; variant?: "solid" | "outline"; children: React.ReactNode }`.

- [ ] **Step 1: Write `app/globals.css`**

Tailwind v4 configures through CSS, not a `tailwind.config.ts`. Both palettes below are chosen for this site and share nothing with `loop-lab`.

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  /* Blueprint — light: warm paper, ink blue, graphite */
  --paper: #f7f5f0;
  --surface: #fffdf8;
  --ink: #16324f;
  --graphite: #3d4450;
  --muted: #6b7280;
  --rule: #cfc9bd;
  --accent: #1d4ed8;
  --grid-dot: #d6d0c4;
}

.dark {
  /* Blueprint — dark: deep slate, cyan */
  --paper: #0e141b;
  --surface: #141c25;
  --ink: #e6edf3;
  --graphite: #b7c2cd;
  --muted: #8b97a4;
  --rule: #263544;
  --accent: #22d3ee;
  --grid-dot: #1e2b38;
}

@theme inline {
  --color-paper: var(--paper);
  --color-surface: var(--surface);
  --color-ink: var(--ink);
  --color-graphite: var(--graphite);
  --color-muted: var(--muted);
  --color-rule: var(--rule);
  --color-accent: var(--accent);
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: ui-monospace, "SF Mono", "Cascadia Code", "JetBrains Mono", monospace;
}

body {
  background-color: var(--paper);
  color: var(--ink);
  /* Faint dot grid — the drafting surface. No gradients, no shadows anywhere. */
  background-image: radial-gradient(var(--grid-dot) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Monospace carries the identity: node names, edge labels, section numbers,
   buttons, and code. Body prose is the sans face. The alternation is deliberate. */
.mono { font-family: var(--font-mono); font-feature-settings: "calt" 0; }

/* Corner ticks — the Panel treatment, drawn rather than bordered. */
.tick::before, .tick::after {
  content: ""; position: absolute; width: 8px; height: 8px;
  border-color: var(--rule); border-style: solid;
}
.tick::before { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
.tick::after  { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Write `components/ui/ThemeProvider.tsx` and `ThemeToggle.tsx`**

```tsx
// components/ui/ThemeProvider.tsx
"use client";
import { ThemeProvider as NextThemes } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemes>
  );
}
```

```tsx
// components/ui/ThemeToggle.tsx
"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Before mount the server-rendered HTML has no theme, so render a same-size
  // placeholder rather than a wrong icon that would flip on hydration.
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="mono border border-rule px-2 py-1 text-xs text-graphite hover:text-ink"
    >
      {mounted ? (dark ? "LIGHT" : "DARK") : "     "}
    </button>
  );
}
```

- [ ] **Step 3: Write `components/ui/Section.tsx`, `Panel.tsx`, `PillButton.tsx`**

```tsx
// components/ui/Section.tsx
export function Section({ id, className = "", children }:
  { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 ${className}`}>
      {children}
    </section>
  );
}
```

```tsx
// components/ui/Panel.tsx
/** Hairline rule plus corner ticks — the Blueprint stand-in for a card border. */
export function Panel({ className = "", children }:
  { className?: string; children: React.ReactNode }) {
  return (
    <div className={`tick relative border border-rule bg-surface p-5 ${className}`}>
      {children}
    </div>
  );
}
```

```tsx
// components/ui/PillButton.tsx
import Link from "next/link";

export function PillButton({ href, variant = "solid", children }:
  { href: string; variant?: "solid" | "outline"; children: React.ReactNode }) {
  const styles = variant === "solid"
    ? "bg-accent text-paper hover:opacity-90"
    : "border border-rule text-ink hover:border-accent";
  return (
    <Link href={href} className={`mono inline-flex items-center px-4 py-2 text-sm tracking-tight ${styles}`}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 4: Write `components/ui/NavBar.tsx`**

Server component. Renders the wordmark (`graph-lab`, mono) linking to `/`, then `Link`s to `/docs/00-start-here/`, `/tracks/`, `/patterns/`, `/projects/`, `/resources/`, `/certification/`, then a slot for `SearchDialog`'s trigger (Loop 4 fills it — until then render nothing there) and `<ThemeToggle />`. Below 768px the links collapse behind a `<details>`-based disclosure so no JavaScript is needed for the mobile menu. Bottom edge is a 1px `border-rule`, no shadow.

- [ ] **Step 5: Write `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { NavBar } from "@/components/ui/NavBar";

export const metadata: Metadata = {
  title: { default: "graph-lab", template: "%s — graph-lab" },
  description:
    "Work through Graph Engineering in the browser: 86 pages, 23 patterns, 24 starter kits, quizzes, and the Graph Ready certification.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <a href="#main" className="mono sr-only focus:not-sr-only focus:absolute focus:p-3">
            Skip to content
          </a>
          <NavBar />
          <main id="main">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Write a placeholder `app/page.tsx`**

```tsx
import { Section } from "@/components/ui/Section";

// Placeholder so the export has a root route. Loop 4 Task 16 replaces this
// wholesale with the real landing page.
export default function Home() {
  return (
    <Section>
      <h1 className="mono text-2xl">graph-lab</h1>
      <p className="mt-4 text-graphite">Landing page lands in Loop 4.</p>
    </Section>
  );
}
```

- [ ] **Step 7: Run the Loop 1 gate**

```bash
cd ~/graph-lab && npm run verify:1
```
Expected: `sync:check OK`, `check:content-shape OK`, tsc silent, and `next build` emitting `out/` with `index.html`. Then check both themes render:

```bash
npm run dev &
sleep 4 && curl -sf http://localhost:3000/ > /dev/null && echo "dev server OK"
kill %1
```

- [ ] **Step 8: Commit and record loop state**

```bash
cd ~/graph-lab
git add -A
git commit -m "feat: add Blueprint design tokens, theme provider, and app shell"
```
Append Task 1–4 entries to `LOOP-STATE.md`, then **STOP Loop 1 permanently** and report the `verify:1` output.

---

# LOOP 2 — Render Layer and the 86 Doc Pages

**Entry condition:** Loop 1 gate approved.
**Exit condition:** `npm run verify:2` green — all 86 doc pages in `out/`, 20 mermaid diagrams present, every internal link resolves.

---

## Task 5: `lib/content.ts` and `lib/docs.ts`

**Files:**
- Create: `~/graph-lab/lib/content.ts`
- Create: `~/graph-lab/lib/docs.ts`

**Interfaces:**
- Consumes: `content/` (Loop 1 Task 2).
- Produces, imported by name by every page in Loops 2–4:
  - `contentRoot: string`
  - `readContent(relPath: string): string`
  - `listFiles(tree: string, ext?: string): string[]` — paths relative to `content/`
  - `getSource(): { repo: string; commit: string; syncedAt: string; files: number }`
  - `type DocMeta = { slug: string[]; route: string; title: string; repoPath: string; section: string; part: number | null }`
  - `getAllDocs(): DocMeta[]`
  - `getDoc(slug: string[]): DocMeta & { body: string }`
  - `getSidebarTree(): { section: string; label: string; docs: DocMeta[] }[]`
  - `getRoadmap(): { part: number; dir: string; title: string; steps: DocMeta[] }[]` — 7 parts, 17 steps total
  - `getPrevNext(slug: string[]): { prev: DocMeta | null; next: DocMeta | null }`

- [ ] **Step 1: Write `lib/content.ts`**

```typescript
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

export const contentRoot = join(process.cwd(), "content");

export function readContent(relPath: string): string {
  const full = join(contentRoot, relPath);
  if (!existsSync(full)) throw new Error(`No content file at ${relPath}`);
  return readFileSync(full, "utf8");
}

/** Every file under content/<tree>, recursively, as paths relative to content/. */
export function listFiles(tree: string, ext = ""): string[] {
  const root = join(contentRoot, tree);
  if (!existsSync(root)) return [];
  const out: string[] = [];
  (function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (!ext || entry.name.endsWith(ext)) out.push(relative(contentRoot, full));
    }
  })(root);
  return out.sort();
}

export type Source = { repo: string; commit: string; syncedAt: string; files: number };

export function getSource(): Source {
  return JSON.parse(readContent("SOURCE.json")) as Source;
}

/** First `# ` heading, or the filename humanised if a file somehow has none. */
export function firstHeading(body: string, fallback: string): string {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}
```

- [ ] **Step 2: Write `lib/docs.ts`**

```typescript
import { listFiles, readContent, firstHeading } from "./content";

export type DocMeta = {
  slug: string[];      // ["03-part-1-the-memory-problem", "step-1-…"]
  route: string;       // "/docs/03-part-1-the-memory-problem/step-1-…/"
  title: string;
  repoPath: string;    // "docs/03-part-1-…/step-1-….md" — the path in the course repo
  section: string;     // top-level directory, or "" for docs/README.md
  part: number | null; // 1–7 for the seven Part directories, else null
};

/**
 * Human labels for the top-level directories, in sidebar order. Directory names
 * are already numbered for sort order, so the order here is just the sorted set;
 * the labels exist because "02-foundations" is a path, not a heading.
 */
const SECTIONS: [string, string][] = [
  ["", "Overview"],
  ["00-start-here", "Start here"],
  ["01-prerequisites", "Prerequisites"],
  ["02-foundations", "Foundations"],
  ["03-part-1-the-memory-problem", "Part 1 · The memory problem"],
  ["04-part-2-the-dag-of-work", "Part 2 · The DAG of work"],
  ["05-part-3-the-graph-of-facts", "Part 3 · The graph of facts"],
  ["06-part-4-working-from-the-graph", "Part 4 · Working from the graph"],
  ["07-part-5-the-graph-of-loops", "Part 5 · The graph of loops"],
  ["08-part-6-one-graph-end-to-end", "Part 6 · One graph end to end"],
  ["09-part-7-staying-grounded", "Part 7 · Staying grounded"],
  ["methods", "Methods"],
  ["operating", "Operating"],
  ["advanced", "Advanced"],
  ["projects", "Projects"],
  ["assessments", "Assessments"],
  ["appendix", "Appendix"],
];

let cache: DocMeta[] | null = null;

export function getAllDocs(): DocMeta[] {
  if (cache) return cache;
  cache = listFiles("docs", ".md").map((repoPath) => {
    const rel = repoPath.slice("docs/".length).replace(/\.md$/, "");
    const parts = rel.split("/");
    // A README is the index of its directory: docs/foo/README.md → /docs/foo/.
    const slug = parts[parts.length - 1] === "README" ? parts.slice(0, -1) : parts;
    const body = readContent(repoPath);
    const section = slug.length > 1 || parts[parts.length - 1] === "README" ? (slug[0] ?? "") : "";
    const partMatch = section.match(/^\d+-part-(\d+)-/);
    return {
      slug,
      route: `/docs/${slug.join("/")}${slug.length ? "/" : ""}`,
      title: firstHeading(body, slug[slug.length - 1] ?? "Overview"),
      repoPath,
      section,
      part: partMatch ? Number(partMatch[1]) : null,
    };
  });
  // Sidebar order = directory order = the numeric prefixes the course already uses.
  const rank = new Map(SECTIONS.map(([dir], i) => [dir, i]));
  cache.sort((a, b) =>
    (rank.get(a.section) ?? 99) - (rank.get(b.section) ?? 99) ||
    a.repoPath.localeCompare(b.repoPath));
  return cache;
}

export function getDoc(slug: string[]): DocMeta & { body: string } {
  const key = slug.join("/");
  const meta = getAllDocs().find((d) => d.slug.join("/") === key);
  if (!meta) throw new Error(`No doc for slug: /${key}`);
  return { ...meta, body: readContent(meta.repoPath) };
}

export function getSidebarTree() {
  const docs = getAllDocs();
  return SECTIONS
    .map(([dir, label]) => ({ section: dir, label, docs: docs.filter((d) => d.section === dir) }))
    .filter((group) => group.docs.length > 0);
}

/**
 * The seven Parts and their step pages, in order.
 *
 * A step file is `step-N-*.md`; README, quiz, flashcards, and labs/ are part of the
 * Part but are not steps, so the 17-step count the progress tracker reports stays
 * the roadmap's 17 and not "every file under a Part directory".
 */
export function getRoadmap() {
  return SECTIONS
    .filter(([dir]) => /^\d+-part-\d+-/.test(dir))
    .map(([dir, title]) => ({
      part: Number(dir.match(/^\d+-part-(\d+)-/)![1]),
      dir,
      title,
      steps: getAllDocs()
        .filter((d) => d.section === dir && /^step-\d+-/.test(d.slug[d.slug.length - 1] ?? ""))
        .sort((a, b) => a.repoPath.localeCompare(b.repoPath)),
    }));
}

/** Flat reading order across every doc, used for prev/next at the page footer. */
export function getPrevNext(slug: string[]) {
  const docs = getAllDocs();
  const i = docs.findIndex((d) => d.slug.join("/") === slug.join("/"));
  return {
    prev: i > 0 ? docs[i - 1] : null,
    next: i >= 0 && i < docs.length - 1 ? docs[i + 1] : null,
  };
}
```

- [ ] **Step 3: Verify the counts the spec promises**

```bash
cd ~/graph-lab && node --experimental-strip-types -e '
import("./lib/docs.ts").then(({ getAllDocs, getRoadmap }) => {
  const docs = getAllDocs();
  const roadmap = getRoadmap();
  console.log("docs:", docs.length);
  console.log("parts:", roadmap.length);
  console.log("steps:", roadmap.reduce((n, p) => n + p.steps.length, 0));
  console.log("untitled:", docs.filter((d) => !d.title).length);
});'
```
Expected: `docs: 86`, `parts: 7`, `steps: 17`, `untitled: 0`. If `steps` is not 17, the step-file regex is wrong — fix it here, not downstream.

- [ ] **Step 4: Typecheck and commit**

```bash
cd ~/graph-lab && npm run typecheck
git add lib/content.ts lib/docs.ts
git commit -m "feat: add content and docs loaders — 86 pages, 7 parts, 17 steps"
```

---

## Task 6: `lib/links.ts` — relative markdown links to site routes

**Files:**
- Create: `~/graph-lab/lib/links.ts`

**Interfaces:**
- Consumes: `getAllDocs()` (Task 5).
- Produces: `resolveContentLink(href: string, fromRepoPath: string): { href: string; external: boolean } | null`. Returns `null` when the link resolves to no known page — Task 9's link check treats that as a failure rather than shipping a dead link. Task 7's rehype plugin is its only caller.

- [ ] **Step 1: Write `lib/links.ts`**

```typescript
import { posix } from "node:path";
import { getAllDocs } from "./docs";

/**
 * Rewrites a link found inside course markdown to a site route.
 *
 * The course files link each other the way GitHub renders them — relative paths
 * with a .md extension, e.g. ../02-foundations/glossary.md#node. Those resolve
 * correctly on GitHub and 404 on the site, so they are resolved here exactly the
 * way GitHub resolves them (relative to the *directory* of the linking file) and
 * then mapped through the known route table.
 *
 * Returns null for a link that resolves to no known page. That is deliberate:
 * check-links.mjs turns it into a red build, which is the only thing that keeps a
 * folder rename in the course repo from silently producing 404s.
 */
export function resolveContentLink(
  href: string,
  fromRepoPath: string,
): { href: string; external: boolean } | null {
  if (!href) return null;
  if (/^(https?:|mailto:|tel:)/i.test(href)) return { href, external: true };
  if (href.startsWith("#")) return { href, external: false };          // same-page anchor
  if (href.startsWith("/")) return { href, external: false };          // already a site route

  const [path, hash] = href.split("#");
  if (!path) return { href, external: false };

  const resolved = posix.normalize(posix.join(posix.dirname(fromRepoPath), path));

  // A .md link maps to whatever route that file owns.
  if (resolved.endsWith(".md")) {
    const doc = getAllDocs().find((d) => d.repoPath === resolved);
    if (!doc) return null;
    return { href: doc.route + (hash ? `#${hash}` : ""), external: false };
  }

  // A directory link maps to that directory's README route.
  const asReadme = posix.join(resolved, "README.md");
  const dirDoc = getAllDocs().find((d) => d.repoPath === asReadme);
  if (dirDoc) return { href: dirDoc.route + (hash ? `#${hash}` : ""), external: false };

  // Links into patterns/ and starters/ point at their own site routes.
  const pattern = resolved.match(/^patterns\/([a-z0-9-]+)\.md$/);
  if (pattern && pattern[1] !== "README" && pattern[1] !== "pattern-template") {
    return { href: `/patterns/${pattern[1]}/`, external: false };
  }
  const starter = resolved.match(/^starters\/([a-z0-9-]+)(\/.*)?$/);
  if (starter) return { href: `/patterns/${starter[1]}/`, external: false };

  return null;
}
```

- [ ] **Step 2: Sanity-check the resolver against real links**

```bash
cd ~/graph-lab && node --experimental-strip-types -e '
Promise.all([import("./lib/links.ts"), import("./lib/docs.ts")]).then(([L, D]) => {
  const md = /\]\(([^)\s]+)\)/g;
  let total = 0, dead = 0;
  for (const doc of D.getAllDocs()) {
    const body = require("node:fs").readFileSync("content/" + doc.repoPath, "utf8");
    for (const m of body.matchAll(md)) {
      total++;
      if (L.resolveContentLink(m[1], doc.repoPath) === null) { dead++; console.log("DEAD", doc.repoPath, "->", m[1]); }
    }
  }
  console.log(`${total} links, ${dead} unresolved`);
});'
```
Expected: a total in the hundreds and **0 unresolved**. Any `DEAD` line is either a resolver bug or a genuinely broken link in the course repo — read the path and decide which before moving on; if it is a broken course link, fix it in the course repo and re-sync rather than loosening the resolver.

- [ ] **Step 3: Typecheck and commit**

```bash
cd ~/graph-lab && npm run typecheck
git add lib/links.ts
git commit -m "feat: rewrite relative markdown links to site routes"
```

---

## Task 7: `lib/markdown.ts`, `CodeBlock`, `GraphDiagram`

**Files:**
- Create: `~/graph-lab/lib/markdown.ts`
- Create: `~/graph-lab/components/content/CodeBlock.tsx`
- Create: `~/graph-lab/components/content/GraphDiagram.tsx`

**Interfaces:**
- Consumes: `resolveContentLink` (Task 6).
- Produces: `renderMarkdown(body: string, repoPath: string): Promise<{ content: React.ReactElement; headings: Heading[] }>` where `Heading = { depth: 2 | 3; id: string; text: string }`. Tasks 8, 11, 13, and 14 all render course markdown through this one function.

- [ ] **Step 1: Write `components/content/GraphDiagram.tsx`**

```tsx
"use client";
import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Renders one mermaid fence to SVG in the browser.
 *
 * Mermaid runs client-side, so the diagram is absent from the prerendered HTML —
 * accepted in the spec's risk list. The source text stays in the DOM as a <pre>
 * until the SVG replaces it, so a reader without JavaScript sees the diagram's
 * source rather than a blank space, and a diagram that fails to parse degrades to
 * the same thing instead of throwing.
 *
 * mermaid is imported dynamically so its ~1 MB never enters the initial bundle of
 * the 66 pages that contain no diagram.
 */
export function GraphDiagram({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mermaid = (await import("mermaid")).default;
      // Explicit dark theme: mermaid's default renders near-black on the dark
      // surface and the diagram becomes unreadable.
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: resolvedTheme === "dark" ? "dark" : "neutral",
        themeVariables:
          resolvedTheme === "dark"
            ? { primaryColor: "#141c25", primaryTextColor: "#e6edf3", lineColor: "#22d3ee", fontFamily: "ui-monospace, monospace" }
            : { primaryColor: "#fffdf8", primaryTextColor: "#16324f", lineColor: "#1d4ed8", fontFamily: "ui-monospace, monospace" },
      });
      try {
        const { svg } = await mermaid.render(`d-${id}`, chart);
        if (!cancelled) setSvg(svg);
      } catch {
        if (!cancelled) setSvg(null); // keep the source fallback
      }
    })();
    return () => { cancelled = true; };
  }, [chart, id, resolvedTheme]);

  if (svg) {
    return (
      <figure
        ref={container}
        className="tick relative my-6 overflow-x-auto border border-rule bg-surface p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }
  return (
    <figure className="tick relative my-6 border border-rule bg-surface p-4">
      <pre className="mono overflow-x-auto text-xs text-graphite">{chart}</pre>
    </figure>
  );
}
```

- [ ] **Step 2: Write `components/content/CodeBlock.tsx`**

Shiki highlights at build time, so this is a server component with zero client JS. It receives already-highlighted HTML from the rehype pipeline and only supplies the frame plus a copy button.

```tsx
import { CopyButton } from "@/components/ui/CopyButton";

export function CodeBlock({ lang, html, raw }:
  { lang: string; html: string; raw: string }) {
  return (
    <div className="tick relative my-5 border border-rule bg-surface">
      <div className="flex items-center justify-between border-b border-rule px-3 py-1">
        <span className="mono text-[11px] uppercase tracking-wider text-muted">{lang || "text"}</span>
        <CopyButton text={raw} />
      </div>
      <div className="overflow-x-auto p-3 text-sm [&_pre]:bg-transparent" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
```

Also create `components/ui/CopyButton.tsx` — a `"use client"` button with `navigator.clipboard.writeText(text)`, an `aria-label` of `Copy code`, and a two-second `Copied` state.

- [ ] **Step 3: Write `lib/markdown.ts`**

```typescript
import { Fragment, type ReactElement } from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import rehypeReact from "rehype-react";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Root, Element } from "hast";
import { resolveContentLink } from "./links";
import { GraphDiagram } from "@/components/content/GraphDiagram";
import { CodeBlock } from "@/components/content/CodeBlock";

export type Heading = { depth: 2 | 3; id: string; text: string };

/**
 * A ```mermaid fence is not code to highlight — it is a diagram. This runs BEFORE
 * shiki so shiki never sees a language it has no grammar for, and replaces the
 * <pre><code> with a <graph-diagram> element that rehype-react maps to the client
 * component.
 */
function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "pre" || !parent || index === undefined) return;
      const code = node.children.find(
        (c): c is Element => c.type === "element" && c.tagName === "code",
      );
      const className = (code?.properties?.className as string[] | undefined) ?? [];
      if (!code || !className.includes("language-mermaid")) return;
      parent.children[index] = {
        type: "element",
        tagName: "graph-diagram",
        properties: { chart: toString(code) },
        children: [],
      };
    });
  };
}

/** Rewrites every relative markdown link to its site route, per lib/links.ts. */
function rehypeSiteLinks(repoPath: string) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href !== "string") return;
      const resolved = resolveContentLink(href, repoPath);
      if (!resolved) return; // left as-is; check-links.mjs reports it against out/
      node.properties!.href = resolved.href;
      if (resolved.external) {
        node.properties!.target = "_blank";
        node.properties!.rel = "noopener noreferrer";
      }
    });
  };
}

/** Collects h2/h3 into the page's table of contents. rehype-slug has already run. */
function rehypeCollectHeadings(sink: Heading[]) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const id = node.properties?.id;
      if (typeof id !== "string") return;
      sink.push({ depth: node.tagName === "h2" ? 2 : 3, id, text: toString(node) });
    });
  };
}

/** Shiki themes matched to the Blueprint palette in both modes. */
const SHIKI = { themes: { light: "github-light", dark: "github-dark-dimmed" } } as const;

export async function renderMarkdown(
  body: string,
  repoPath: string,
): Promise<{ content: ReactElement; headings: Heading[] }> {
  const headings: Heading[] = [];

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })  // course markdown contains <details>
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeCollectHeadings, headings)
    .use(rehypeMermaid)
    .use(rehypeSiteLinks, repoPath)
    .use(rehypeShiki, SHIKI)
    .use(rehypeReact, {
      Fragment,
      jsx: (jsxRuntime as never as { jsx: unknown }).jsx,
      jsxs: (jsxRuntime as never as { jsxs: unknown }).jsxs,
      components: {
        "graph-diagram": ({ chart }: { chart: string }) => <GraphDiagram chart={chart} />,
      },
    } as never)
    .process(body);

  return { content: file.result as ReactElement, headings };
}
```

Note on `CodeBlock`: `@shikijs/rehype` emits its own `<pre class="shiki">`. Wire `CodeBlock` in by adding a small rehype step after shiki that wraps each `pre.shiki` in a `<code-block lang raw>` element and mapping that in the `components` map above — same mechanism as `graph-diagram`. Keep the raw text on the element before shiki replaces the children.

- [ ] **Step 4: Verify the pipeline against the hardest real page**

```bash
cd ~/graph-lab && node --experimental-strip-types -e '
import("./lib/markdown.ts").then(async (M) => {
  const fs = await import("node:fs");
  const p = "docs/02-foundations/the-two-graphs.md";
  const { headings } = await M.renderMarkdown(fs.readFileSync("content/" + p, "utf8"), p);
  console.log("headings:", headings.length, headings.slice(0, 3));
});'
```
Expected: a non-zero heading count with real ids and text. An exception here is a pipeline wiring bug — fix before Task 8.

- [ ] **Step 5: Typecheck and commit**

```bash
cd ~/graph-lab && npm run typecheck
git add lib/markdown.ts components/content components/ui/CopyButton.tsx
git commit -m "feat: add remark/rehype render pipeline with Shiki, mermaid, and link rewriting"
```

---

## Task 8: The doc route and its chrome

**Files:**
- Create: `~/graph-lab/app/docs/[...slug]/page.tsx`
- Create: `~/graph-lab/components/docs/DocSidebar.tsx`
- Create: `~/graph-lab/components/docs/DocToc.tsx`
- Create: `~/graph-lab/components/docs/DocBreadcrumbs.tsx`
- Create: `~/graph-lab/components/docs/DocFooterNav.tsx`

**Interfaces:**
- Consumes: `getAllDocs`, `getDoc`, `getSidebarTree`, `getPrevNext` (Task 5); `renderMarkdown` (Task 7).
- Produces: the single component that renders all 86 pages. Every later fix to how a doc renders happens here, never in a per-page component.

- [ ] **Step 1: Write `components/docs/DocSidebar.tsx`**

Server component. Takes `{ activeRoute: string }`. Renders `getSidebarTree()` as `<nav aria-label="Course contents">` — one `<details open>` per section, labelled by `group.label`, containing the section's docs as links. The entry matching `activeRoute` gets `aria-current="page"` and an accent left rule. Below 768px the whole sidebar is inside a single collapsed `<details>` labelled `Contents`, so it costs no JavaScript. Sticky at `lg:` and up, `max-h-[calc(100vh-4rem)] overflow-y-auto`.

- [ ] **Step 2: Write `components/docs/DocToc.tsx`**

Client component. Takes `{ headings: Heading[] }`. Renders an `<nav aria-label="On this page">` of h2/h3 anchors, indenting depth 3. Uses an `IntersectionObserver` to mark the heading currently in view with `aria-current="true"`; the observer is skipped entirely when `matchMedia("(prefers-reduced-motion: reduce)").matches` is false is irrelevant — highlight is not motion, so keep it, but do not animate the transition. Renders nothing when `headings.length < 2`.

- [ ] **Step 3: Write `components/docs/DocBreadcrumbs.tsx` and `DocFooterNav.tsx`**

`DocBreadcrumbs` takes `{ doc: DocMeta }` and renders `graph-lab / <section label> / <title>` in mono, with the section linking to that section's index route when one exists. `DocFooterNav` takes `{ prev, next }: ReturnType<typeof getPrevNext>` and renders two hairline-ruled blocks — previous on the left, next on the right — each showing `← Previous` / `Next →` in mono above the page title. Renders one side only when the other is `null`.

- [ ] **Step 4: Write `app/docs/[...slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { getAllDocs, getDoc, getPrevNext } from "@/lib/docs";
import { renderMarkdown } from "@/lib/markdown";
import { DocSidebar } from "@/components/docs/DocSidebar";
import { DocToc } from "@/components/docs/DocToc";
import { DocBreadcrumbs } from "@/components/docs/DocBreadcrumbs";
import { DocFooterNav } from "@/components/docs/DocFooterNav";

export function generateStaticParams() {
  // docs/README.md owns /docs/ itself, whose slug array is empty. A catch-all
  // route cannot match an empty segment list under `output: "export"`, so that one
  // page is emitted by app/docs/page.tsx instead — see Step 5.
  return getAllDocs().filter((d) => d.slug.length > 0).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  return { title: doc.title };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  const { content, headings } = await renderMarkdown(doc.body, doc.repoPath);
  const { prev, next } = getPrevNext(slug);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[16rem_minmax(0,1fr)_14rem]">
      <DocSidebar activeRoute={doc.route} />
      <article className="min-w-0">
        <DocBreadcrumbs doc={doc} />
        <div className="prose-blueprint mt-6">{content}</div>
        <DocFooterNav prev={prev} next={next} />
      </article>
      <DocToc headings={headings} />
    </div>
  );
}
```

Add a `.prose-blueprint` block to `app/globals.css` styling `h1`–`h4`, `p`, `ul`, `ol`, `table`, `blockquote`, `details`, and `a` against the Blueprint tokens — mono for headings and inline `code`, sans for prose, hairline `border-rule` on table cells, `details` rendered as a bordered disclosure. This replaces a typography plugin; do not add one.

- [ ] **Step 5: Write `app/docs/page.tsx` for the `/docs/` index**

```tsx
import { getDoc, getPrevNext } from "@/lib/docs";
import { renderMarkdown } from "@/lib/markdown";
import { DocSidebar } from "@/components/docs/DocSidebar";
import { DocFooterNav } from "@/components/docs/DocFooterNav";

export default async function DocsIndex() {
  const doc = getDoc([]);
  const { content } = await renderMarkdown(doc.body, doc.repoPath);
  const { next } = getPrevNext([]);
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <DocSidebar activeRoute="/docs/" />
      <article className="min-w-0">
        <div className="prose-blueprint">{content}</div>
        <DocFooterNav prev={null} next={next} />
      </article>
    </div>
  );
}
```

- [ ] **Step 6: Build and count the emitted pages**

```bash
cd ~/graph-lab && npm run build
find out/docs -name index.html | wc -l       # expect 86
grep -rl 'graph-diagram\|mermaid' out/docs | wc -l   # expect 20
```
Expected: `86` and `20`. A short count means `generateStaticParams` is dropping pages — fix it before the link check.

- [ ] **Step 7: Commit**

```bash
cd ~/graph-lab
git add app/docs components/docs app/globals.css
git commit -m "feat: render all 86 doc pages with sidebar, toc, breadcrumbs, and prev/next"
```

---

## Task 9: `scripts/check-links.mjs`

**Files:**
- Create: `~/graph-lab/scripts/check-links.mjs`

**Interfaces:**
- Consumes: the emitted `out/` directory (Task 8).
- Produces: a non-zero exit on any internal link that resolves to no emitted file. Wired into `verify:2` and every later `verify:N`.

- [ ] **Step 1: Write `scripts/check-links.mjs`**

```javascript
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

const HREF = /href="([^"]+)"/g;
const files = await htmlFiles(OUT);
const broken = [];
let checked = 0;

for (const file of files) {
  const html = await readFile(file, "utf8");
  for (const [, href] of html.matchAll(HREF)) {
    if (/^(https?:|mailto:|tel:|#|data:)/i.test(href)) continue;
    const [path] = href.split("#");
    if (!path || !path.startsWith("/")) continue;
    checked++;
    const rel = basePath && path.startsWith(basePath) ? path.slice(basePath.length) : path;
    // trailingSlash: true means every route is a directory holding index.html.
    const target = rel.endsWith("/") ? join(OUT, rel, "index.html") : join(OUT, rel);
    if (!existsSync(target) && !existsSync(`${target}.html`) && !existsSync(join(OUT, rel, "index.html"))) {
      broken.push(`${file.slice(OUT.length)} -> ${href}`);
    }
  }
}

if (broken.length) {
  console.error(`check:links FAILED — ${broken.length} of ${checked} internal links do not resolve:\n`);
  for (const b of [...new Set(broken)].slice(0, 60)) console.error(`  ${b}`);
  process.exit(1);
}
console.log(`check:links OK — ${checked} internal links across ${files.length} pages all resolve`);
```

- [ ] **Step 2: Run the Loop 2 gate**

```bash
cd ~/graph-lab && npm run verify:2
```
Expected: every earlier check green, then `check:links OK — <n> internal links across <m> pages all resolve`.

- [ ] **Step 3: Spot-check three pages by eye**

```bash
cd ~/graph-lab && npm run dev
```
Open `/docs/00-start-here/`, `/docs/02-foundations/the-two-graphs/` (has a mermaid diagram), and `/docs/09-part-7-staying-grounded/quiz/`. Confirm: diagram renders as SVG in both themes, code blocks are highlighted, the sidebar marks the current page, the ToC tracks scrolling, prev/next work.

- [ ] **Step 4: Commit and record loop state**

```bash
cd ~/graph-lab
git add scripts/check-links.mjs
git commit -m "feat: fail the build on any unresolved internal link"
```
Append Task 5–9 entries to `LOOP-STATE.md`, then **STOP Loop 2 permanently** and report the `verify:2` output.

---

# LOOP 3 — Interactive Course Surfaces

**Entry condition:** Loop 2 gate approved.
**Exit condition:** `npm run verify:3` green and every route in the spec's route table (except `/`, sitemap, and llms.txt, which are Loop 4) renders and works.

---

## Task 10: Tracks page, `TrackSelector`, `ProgressTracker`

**Files:**
- Create: `~/graph-lab/lib/tracks.ts`
- Create: `~/graph-lab/app/tracks/page.tsx`
- Create: `~/graph-lab/components/interactive/TrackSelector.tsx`
- Create: `~/graph-lab/components/interactive/ProgressTracker.tsx`

**Interfaces:**
- Consumes: `getRoadmap()` (Task 5).
- Produces: `TRACKS: Track[]` from `lib/tracks.ts` where `Track = { id: "G1"|"G2"|"G3"|"G4"; name: string; level: string; startsKnowing: string; finishesAbleTo: string; steps: string[]; firstStepRoute: string }`; `ProgressTracker` takes `{ steps: DocMeta[] }` and is reused on `/tracks/` and (Loop 4) the landing page.

- [ ] **Step 1: Write `lib/tracks.ts`**

Transcribed from the four-track table in the course repo's `graph-plan.md` §12.1 (lines 253–256), verified 2026-08-07. This is structural site data — the table is not itself a rendered doc page — which is why it is hardcoded here rather than parsed.

```typescript
export type Track = {
  id: "G1" | "G2" | "G3" | "G4";
  name: string;
  level: string;
  startsKnowing: string;
  finishesAbleTo: string;
  covers: string;
  firstStepRoute: string;
};

/**
 * The four skill tracks, from graph-plan.md §12.1.
 *
 * firstStepRoute must be a route getAllDocs() actually returns — a track card
 * linking to a 404 is worse than no card. Task 10 Step 5 asserts all four resolve,
 * and check-links.mjs catches it again against the emitted export.
 */
export const TRACKS: Track[] = [
  {
    id: "G1",
    name: "Foundations",
    level: "Beginner",
    startsKnowing: "Loop Engineering — heartbeat, spine, maker/checker",
    finishesAbleTo:
      "explain why one memory file stops working past one loop; tell the two graphs apart",
    covers: "Prerequisites, Foundations, Part 1",
    firstStepRoute: "/docs/01-prerequisites/",
  },
  {
    id: "G2",
    name: "Practitioner",
    level: "Intermediate",
    startsKnowing: "the two-graph split",
    finishesAbleTo:
      "run a fact through extraction → resolution → provenance; build a subgraph and a grounded checker",
    covers: "Parts 2–4, Projects 2–6",
    firstStepRoute: "/docs/04-part-2-the-dag-of-work/",
  },
  {
    id: "G3",
    name: "Engineer",
    level: "Advanced",
    startsKnowing: "how to build and read one graph",
    finishesAbleTo:
      "wire multiple loops into a governance graph; name and fix the four failure modes",
    covers: "Part 5, Projects 7–8, the pattern library",
    firstStepRoute: "/docs/07-part-5-the-graph-of-loops/",
  },
  {
    id: "G4",
    name: "Ultra-Pro",
    level: "Expert",
    startsKnowing: "how to ship one graph",
    finishesAbleTo:
      "decide when not to build one; run graphs at scale; author new patterns",
    covers: "Parts 6–7, advanced tier, certification",
    firstStepRoute: "/docs/08-part-6-one-graph-end-to-end/",
  },
];
```

- [ ] **Step 2: Write `components/interactive/ProgressTracker.tsx`**

```tsx
"use client";
import { useEffect, useState } from "react";
import type { DocMeta } from "@/lib/docs";

const KEY = "graph-lab:progress";

/**
 * Reading progress across the 17 roadmap steps, kept in localStorage.
 *
 * No accounts, no backend — the spec's non-goals are explicit about it. The set is
 * read once on mount rather than during render so the server-rendered markup and
 * the first client render agree.
 */
export function ProgressTracker({ steps }: { steps: DocMeta[] }) {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setDone(new Set(JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[]));
    } catch { /* corrupt value — start clean rather than throwing on every page */ }
    setReady(true);
  }, []);

  function toggle(route: string) {
    setDone((prev) => {
      const next = new Set(prev);
      next.has(route) ? next.delete(route) : next.add(route);
      localStorage.setItem(KEY, JSON.stringify([...next]));
      return next;
    });
  }

  const count = ready ? steps.filter((s) => done.has(s.route)).length : 0;

  return (
    <div>
      <p className="mono text-sm text-graphite">
        Step {count} of {steps.length}
      </p>
      <div className="mt-2 h-1 w-full bg-rule" role="progressbar"
           aria-valuenow={count} aria-valuemin={0} aria-valuemax={steps.length}
           aria-label="Course progress">
        <div className="h-full bg-accent" style={{ width: `${(count / steps.length) * 100}%` }} />
      </div>
      <ul className="mt-4 space-y-1">
        {steps.map((s) => (
          <li key={s.route} className="flex items-start gap-2">
            <input
              id={`p-${s.route}`}
              type="checkbox"
              checked={done.has(s.route)}
              onChange={() => toggle(s.route)}
              className="mt-1"
            />
            <label htmlFor={`p-${s.route}`} className="text-sm">
              <a href={s.route} className="underline-offset-2 hover:underline">{s.title}</a>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 3: Write `components/interactive/TrackSelector.tsx`**

Client component, no props — imports `TRACKS`. Renders the four tracks as `<Panel>` cards in a responsive grid; selecting one (keyboard-reachable `<button>`, `aria-pressed`) expands its "you start knowing / you finish able to / covers steps N–M" detail and shows a `PillButton` to `firstStepRoute`. Selection is component state only — not persisted, since it is a browsing aid rather than progress.

- [ ] **Step 4: Write `app/tracks/page.tsx`**

Server component. Renders `<TrackSelector />`, then the full 17-step roadmap from `getRoadmap()` as seven `<Panel>`s (one per Part, mono part number, sans title) each listing its steps, and `<ProgressTracker steps={allSteps} />` where `allSteps` is the flattened 17.

- [ ] **Step 5: Verify the track routes are real, then build and commit**

```bash
cd ~/graph-lab && node --experimental-strip-types -e '
Promise.all([import("./lib/tracks.ts"), import("./lib/docs.ts")]).then(([T, D]) => {
  const routes = new Set(D.getAllDocs().map((d) => d.route));
  const bad = T.TRACKS.filter((t) => !routes.has(t.firstStepRoute));
  console.log(bad.length ? "BAD firstStepRoute: " + bad.map((t) => t.id + " " + t.firstStepRoute).join(", ") : "all 4 track routes resolve");
});'
npm run build && npm run check:links
git add lib/tracks.ts app/tracks components/interactive
git commit -m "feat: add tracks page, track selector, and localStorage progress tracker"
```
Expected: `all 4 track routes resolve`, then a green build and link check.

---

## Task 11: Pattern browser and starter viewer

**Files:**
- Create: `~/graph-lab/lib/patterns.ts`
- Create: `~/graph-lab/scripts/build-starters.mjs`
- Create: `~/graph-lab/app/patterns/page.tsx`
- Create: `~/graph-lab/app/patterns/[slug]/page.tsx`
- Create: `~/graph-lab/components/interactive/PatternBrowser.tsx`
- Create: `~/graph-lab/components/interactive/StarterViewer.tsx`

**Interfaces:**
- Consumes: `content/patterns/registry.yaml`, `content/patterns/*.md`, `content/starters/*/` (Loop 1 Task 2); `renderMarkdown` (Task 7).
- Produces: `type PatternMeta = { slug: string; category: string; stage: string; cost: string; core: boolean; title: string }`, `getAllPatterns(): PatternMeta[]`, `getPatternBySlug(slug: string): PatternMeta & { body: string; repoPath: string; starterSlug: string | null }`. `build-starters.mjs` emits `public/starters/<slug>.json` shaped `{ files: { path: string; content: string | null }[] }`.

- [ ] **Step 1: Write `lib/patterns.ts`**

The registry's real shape, verified 2026-08-07: a top-level `patterns:` key holding a flat list of `name`, `category` (`A-extraction` … `G-…`), `stage`, `cost`, `core`. There is no `tool` field — the spec's "tool" filter is `core: true` (core) vs `false` (extended).

```typescript
import { readContent, listFiles, firstHeading } from "./content";

export type PatternMeta = {
  slug: string;
  category: string;   // "A-extraction", "B-resolution", …
  stage: string;      // "write" | "read" | "governance" | "storage"
  cost: string;       // "low" | "medium" | "high"
  core: boolean;      // core kit vs extended
  title: string;      // first # heading of the spec
};

/**
 * Parses patterns/registry.yaml.
 *
 * NOT a general YAML implementation — it handles exactly the shape the registry
 * uses: a `patterns:` key holding a list of flat maps with unquoted scalar values.
 * This mirrors the course repo's scripts/validate-registry.mjs deliberately, so
 * the site and the course's own validator agree about what the registry says
 * rather than diverging through two implementations. If the registry ever grows a
 * nested value, both parsers get replaced, not extended.
 */
function parseFlatYamlList(text: string): Record<string, string | boolean>[] {
  const items: Record<string, string | boolean>[] = [];
  let current: Record<string, string | boolean> | null = null;
  for (const line of text.split("\n")) {
    if (/^\s*-\s+name:/.test(line)) {
      if (current) items.push(current);
      current = {};
    }
    const m = line.match(/^\s*-?\s*(\w+):\s*(.+?)\s*$/);
    if (m && current) {
      const [, key, raw] = m;
      current[key] = raw === "true" ? true : raw === "false" ? false : raw;
    }
  }
  if (current) items.push(current);
  return items;
}

let cache: PatternMeta[] | null = null;

export function getAllPatterns(): PatternMeta[] {
  if (cache) return cache;
  const entries = parseFlatYamlList(readContent("patterns/registry.yaml"));
  cache = entries.map((entry) => {
    const slug = String(entry.name);
    return {
      slug,
      category: String(entry.category ?? ""),
      stage: String(entry.stage ?? ""),
      cost: String(entry.cost ?? ""),
      core: entry.core === true,
      title: firstHeading(readContent(`patterns/${slug}.md`), slug),
    };
  });
  // README.md and pattern-template.md are not registry entries, so they never
  // appear here. A count other than 23 means the registry changed — fail loudly
  // rather than quietly shipping a browser that is missing a pattern.
  if (cache.length !== 23) {
    throw new Error(`registry.yaml parsed to ${cache.length} patterns, expected 23`);
  }
  return cache;
}

export function getPatternBySlug(slug: string) {
  const meta = getAllPatterns().find((p) => p.slug === slug);
  if (!meta) throw new Error(`No pattern named ${slug}`);
  const starters = new Set(
    listFiles("starters").map((p) => p.split("/")[1]).filter(Boolean),
  );
  return {
    ...meta,
    body: readContent(`patterns/${slug}.md`),
    repoPath: `patterns/${slug}.md`,
    starterSlug: starters.has(slug) ? slug : null,
  };
}

/** The distinct filter values the browser offers, derived rather than hardcoded. */
export function getPatternFacets() {
  const patterns = getAllPatterns();
  const uniq = (xs: string[]) => [...new Set(xs)].sort();
  return {
    categories: uniq(patterns.map((p) => p.category)),
    stages: uniq(patterns.map((p) => p.stage)),
    tools: ["core", "extended"] as const,
  };
}
```

- [ ] **Step 2: Write `scripts/build-starters.mjs`**

```javascript
/**
 * Emits one JSON payload per starter kit for StarterViewer to fetch on demand.
 *
 * 24 kits with many files each would inflate every pattern page if inlined into
 * the prerendered HTML — the spec flags exactly this as a risk. Fetching a small
 * JSON when the reader opens a kit keeps the pattern pages light.
 *
 * Binary files and anything over 200 KB are listed but not inlined; the viewer
 * shows a "view on GitHub" link for those instead of megabytes of base64.
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
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
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
let kits = 0, files = 0;

for (const entry of await readdir(STARTERS, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dir = join(STARTERS, entry.name);
  const payload = [];
  for (const rel of (await walk(dir)).sort()) {
    const full = join(dir, rel);
    const { size } = await stat(full);
    const binary = BINARY.has(extname(rel).toLowerCase()) || size > MAX;
    payload.push({ path: rel, content: binary ? null : await readFile(full, "utf8") });
    files++;
  }
  await writeFile(join(OUT, `${entry.name}.json`), JSON.stringify({ files: payload }));
  kits++;
}
console.log(`build:starters OK — ${kits} kits, ${files} files`);
```

Expected on first run: `build:starters OK — 24 kits, <n> files`.

- [ ] **Step 3: Write `components/interactive/PatternBrowser.tsx`**

Client component, props `{ patterns: PatternMeta[]; facets: ReturnType<typeof getPatternFacets> }`. Three filter groups as `<fieldset>`s with real `<legend>`s — category (`A-extraction` … rendered as `A · Extraction`), stage, and tool (`core` matches `p.core === true`, `extended` matches `false`) — each option a toggle `<button aria-pressed>`. Filters combine as AND across groups and OR within a group. Results render as `<Panel>` cards linking to `/patterns/<slug>/`, with a live `aria-live="polite"` count (`23 patterns` / `4 patterns`). A no-results state names which filter to clear rather than showing an empty grid.

- [ ] **Step 4: Write `components/interactive/StarterViewer.tsx`**

Client component, props `{ slug: string }`. On mount, `fetch(withBasePath(`/starters/${slug}.json`))`. Left pane: file tree (directories as `<details>`, files as buttons). Right pane: the selected file's content in a `<pre>`. When the kit ships both a `claude/` and an `opencode/` tree, render a two-option tool switcher above the tree that scopes which subtree is shown. Files with `content: null` show "Binary or oversized — view on GitHub" plus a link built from `getSource().repo` and `commit`. Loading and error states are both explicit; a failed fetch must not render an empty pane.

- [ ] **Step 5: Write both pattern routes**

`app/patterns/page.tsx` — server component, `getAllPatterns()` and `getPatternFacets()` → `<PatternBrowser patterns={…} facets={…} />`, with an intro paragraph in site-chrome wording.

`app/patterns/[slug]/page.tsx` — `generateStaticParams` from `getAllPatterns()`; renders the pattern spec through `renderMarkdown(pattern.body, pattern.repoPath)`, then the starter kit. `starterSlug` is `string | null`, so narrow it rather than passing it straight through — `StarterViewer` takes a non-null `slug`:

```tsx
{pattern.starterSlug ? (
  <StarterViewer slug={pattern.starterSlug} />
) : (
  <p className="mono mt-8 text-sm text-muted">No starter kit ships with this pattern.</p>
)}
```

- [ ] **Step 6: Build, verify counts, commit**

```bash
cd ~/graph-lab && npm run build
find out/patterns -maxdepth 1 -type d | tail -n +2 | wc -l   # expect 23
ls public/starters/*.json | wc -l                            # expect 24
npm run check:links
git add lib/patterns.ts scripts/build-starters.mjs app/patterns components/interactive
git commit -m "feat: add pattern browser, pattern pages, and on-demand starter viewer"
```

---

## Task 12: Quizzes and flashcards

**Files:**
- Create: `~/graph-lab/app/quiz/[part]/page.tsx`
- Create: `~/graph-lab/app/flashcards/[part]/page.tsx`
- Create: `~/graph-lab/components/interactive/Quiz.tsx`
- Create: `~/graph-lab/components/interactive/Flashcards.tsx`

**Interfaces:**
- Consumes: `parseQuiz`, `parseFlashcards`, `QuizQuestion`, `Flashcard` from `lib/parse-content.ts` (Loop 1 Task 3) — the same functions `check-content-shape.mjs` runs in CI, so a page can never disagree with the check that guards it. Also `getRoadmap()` (Task 5).
- Produces: `Quiz` takes `{ part: number; questions: QuizQuestion[] }`; `Flashcards` takes `{ part: number; cards: Flashcard[] }`.

- [ ] **Step 1: Write `components/interactive/Quiz.tsx`**

```tsx
"use client";
import { useState } from "react";
import type { QuizQuestion } from "@/lib/parse-content";

/**
 * One question at a time, reveal the answer, running tally.
 *
 * Self-assessment, not grading: the reader says whether they got it, because the
 * course's answers are prose judgments, not multiple choice. The tally is honest
 * about that — it counts what the reader claimed, and nothing is sent anywhere.
 */
export function Quiz({ part, questions }: { part: number; questions: QuizQuestion[] }) {
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [scored, setScored] = useState<boolean[]>([]);
  const q = questions[i];
  const done = i >= questions.length;

  if (done) {
    const right = scored.filter(Boolean).length;
    return (
      <div className="tick relative border border-rule bg-surface p-6">
        <p className="mono text-sm text-muted">PART {part} · COMPLETE</p>
        <p className="mt-2 text-2xl">You marked {right} of {questions.length} correct.</p>
        <button
          type="button"
          onClick={() => { setI(0); setRevealed(false); setScored([]); }}
          className="mono mt-4 border border-rule px-3 py-1 text-sm hover:border-accent"
        >
          Start over
        </button>
      </div>
    );
  }

  function record(correct: boolean) {
    setScored((s) => [...s, correct]);
    setRevealed(false);
    setI((n) => n + 1);
  }

  return (
    <div className="tick relative border border-rule bg-surface p-6">
      <p className="mono text-sm text-muted">
        PART {part} · QUESTION {i + 1} OF {questions.length}
      </p>
      <h2 className="mono mt-2 text-lg">{q.n}. {q.title}</h2>
      <p className="mt-4 whitespace-pre-line">{q.question}</p>

      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="mono mt-6 bg-accent px-4 py-2 text-sm text-paper"
        >
          Reveal the answer
        </button>
      ) : (
        <div className="mt-6 border-t border-rule pt-4">
          <p className="whitespace-pre-line text-graphite">{q.answer}</p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => record(true)}
              className="mono border border-rule px-3 py-1 text-sm hover:border-accent">
              I had it
            </button>
            <button type="button" onClick={() => record(false)}
              className="mono border border-rule px-3 py-1 text-sm hover:border-accent">
              I didn&apos;t
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Write `components/interactive/Flashcards.tsx`**

Client component. One card at a time: term face, `Flip` button (also `Space`/`Enter` on the card itself, which is a `<button>` so it is keyboard-reachable by default), definition face, then `Previous` / `Next` and a `Shuffle` that reorders with Fisher-Yates and resets to the first card. The flip is a CSS transform that is disabled under `prefers-reduced-motion` — the definition still appears, it just does not rotate. Position shown as `CARD 3 OF 6` in mono.

- [ ] **Step 3: Write both routes**

```tsx
// app/quiz/[part]/page.tsx
import { notFound } from "next/navigation";
import { readContent } from "@/lib/content";
import { getRoadmap } from "@/lib/docs";
import { parseQuiz } from "@/lib/parse-content";
import { Quiz } from "@/components/interactive/Quiz";
import { Section } from "@/components/ui/Section";

export function generateStaticParams() {
  return getRoadmap().map((p) => ({ part: String(p.part) }));
}

export default async function QuizPage({ params }: { params: Promise<{ part: string }> }) {
  const { part } = await params;
  const entry = getRoadmap().find((p) => String(p.part) === part);
  if (!entry) notFound();
  const questions = parseQuiz(readContent(`docs/${entry.dir}/quiz.md`));
  return (
    <Section className="max-w-3xl">
      <h1 className="mono text-2xl">{entry.title} — Quiz</h1>
      <div className="mt-8"><Quiz part={entry.part} questions={questions} /></div>
    </Section>
  );
}
```

`app/flashcards/[part]/page.tsx` mirrors this with `parseFlashcards` and `flashcards.md`, except `generateStaticParams` filters out Part 6 — it has no flashcards file, by design — so the route emits six pages, not seven.

- [ ] **Step 4: Build, verify counts, commit**

```bash
cd ~/graph-lab && npm run build
find out/quiz -name index.html | wc -l         # expect 7
find out/flashcards -name index.html | wc -l   # expect 6
git add app/quiz app/flashcards components/interactive/Quiz.tsx components/interactive/Flashcards.tsx
git commit -m "feat: add 7 quizzes and 6 flashcard sets sharing the CI-guarded parsers"
```

---

## Task 13: Projects and resources pages

**Files:**
- Create: `~/graph-lab/app/projects/page.tsx`
- Create: `~/graph-lab/app/resources/page.tsx`

**Interfaces:**
- Consumes: `getAllDocs()`, `readContent`, `renderMarkdown`.

- [ ] **Step 1: Write `app/projects/page.tsx`**

Server component. Takes the docs whose `section === "projects"`, drops the section README, and renders the remaining eight as `<Panel>` cards in a grid — title from `DocMeta.title`, a one-line excerpt taken from the first paragraph after the `#` heading, and a link into `/docs/projects/<slug>/`. Above the grid, render `docs/projects/README.md` through `renderMarkdown` so the section's own framing is course content, not restated site copy. Assert eight cards and throw with the actual count if not.

- [ ] **Step 2: Write `app/resources/page.tsx`**

Server component. Renders `content/resources/sources.md` through `renderMarkdown` (all ten attributed sources, unmodified), then a compact anti-patterns section rendered from `content/docs/operating/anti-patterns.md` — both paths verified to exist on 2026-08-07. Each is rendered, not restated; the page's own contribution is the two section headings and the ordering.

- [ ] **Step 3: Build, verify, commit**

```bash
cd ~/graph-lab && npm run build && npm run check:links
git add app/projects app/resources
git commit -m "feat: add projects and resources pages"
```

---

## Task 14: Certification

**Files:**
- Create: `~/graph-lab/app/certification/page.tsx`
- Create: `~/graph-lab/components/interactive/GraphReadyChecklist.tsx`
- Create: `~/graph-lab/components/interactive/CertificateGenerator.tsx`

**Interfaces:**
- Consumes: `content/docs/assessments/graph-ready-certification.md` for the seven criteria — read the file and take the wording from it rather than retyping it.
- Produces: `GraphReadyChecklist` owns the checked state and renders `CertificateGenerator` itself once all seven are checked; `CertificateGenerator` takes `{ criteria: string[] }`.

- [ ] **Step 1: Write `components/interactive/GraphReadyChecklist.tsx`**

Client component. Seven `<input type="checkbox">` with real `<label>`s, state persisted to `localStorage` under `graph-lab:graph-ready` and read on mount (same mount-then-read pattern as `ProgressTracker`, for the same hydration reason). A live region announces `4 of 7 met`. All seven checked renders `<CertificateGenerator />`; fewer renders a mono line stating how many remain. The seven criteria strings are passed in as a prop from the page, which parses them out of the doc — the component does not hardcode them.

- [ ] **Step 2: Write `components/interactive/CertificateGenerator.tsx`**

Client component. A text `<input>` for the reader's name (labelled `Name on the certificate`, no accounts, nothing sent anywhere), then a `Download certificate` button that draws to a 1600×1200 `<canvas>`: Blueprint dot grid, hairline rule border with corner ticks, `GRAPH READY` in mono, the typed name, the date, and the seven criteria as small mono lines. Export with `canvas.toBlob` → object URL → `<a download="graph-ready-<name>.png">` → `URL.revokeObjectURL`. The button is disabled with an explanatory `aria-describedby` when the name field is empty.

- [ ] **Step 3: Write `app/certification/page.tsx`**

Server component. Renders `content/docs/assessments/graph-ready-certification.md` through `renderMarkdown`, then parses the seven criteria out of that same file's `## The checklist` table — verified 2026-08-07 as a `| # | Item | Where it comes from |` table with rows 1–7. That page states outright that it is authoritative and the component "implements it and does not extend it", so the strings come from the file, never from a constant here.

```tsx
/**
 * The seven Graph Ready criteria, read from the doc that defines them.
 *
 * Hardcoding these would create a second copy that can drift from the course
 * page — exactly the failure this whole site is built to avoid. The count check
 * is not defensive noise: the certificate asserts all seven were met, so a
 * six-item checklist would make the site issue a false claim.
 */
function getCriteria(body: string): string[] {
  const table = body.split("## The checklist")[1]?.split("\n## ")[0] ?? "";
  const items = table
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\|\s*\d+\s*\|/.test(line))
    .map((line) => line.split("|")[2]?.trim() ?? "");
  if (items.length !== 7 || items.some((i) => !i)) {
    throw new Error(`graph-ready-certification.md yielded ${items.length} criteria, expected 7`);
  }
  return items;
}
```

- [ ] **Step 4: Run the Loop 3 gate**

```bash
cd ~/graph-lab && npm run verify:3
```
Then in `npm run dev`, walk the whole flow by hand: filter the pattern browser to one category and confirm the count; open a kit and switch tools; play a full quiz to the tally; flip and shuffle a flashcard set; check all seven certification boxes, type a name, download the PNG, and open it.

- [ ] **Step 5: Commit and record loop state**

```bash
cd ~/graph-lab
git add app/certification components/interactive
git commit -m "feat: add Graph Ready checklist and canvas certificate generator"
```
Append Task 10–14 entries to `LOOP-STATE.md`, then **STOP Loop 3 permanently** and report the `verify:3` output plus the downloaded certificate.

---

# LOOP 4 — Landing Page, Blueprint Identity, Search

**Entry condition:** Loop 3 gate approved.
**Exit condition:** `npm run verify:4` green, search returns correct results for a title term, a heading term, and a body term, and the landing page is complete.

---

## Task 15: Search — index, query, dialog

**Files:**
- Create: `~/graph-lab/scripts/build-search-index.mjs`
- Create: `~/graph-lab/lib/search.ts`
- Create: `~/graph-lab/components/ui/SearchDialog.tsx`
- Modify: `~/graph-lab/components/ui/NavBar.tsx` (mount the trigger)

**Interfaces:**
- Consumes: `content/docs` and `lib/docs.ts`'s route table.
- Produces: `public/search-index.json` shaped `{ records: SearchRecord[]; inverted: Record<string, number[]> }` with `SearchRecord = { route: string; title: string; section: string; headings: string[]; excerpt: string }`; `search(index: SearchIndex, query: string, limit?: number): { record: SearchRecord; score: number }[]` from `lib/search.ts`.

- [ ] **Step 1: Write `scripts/build-search-index.mjs`**

Import `lib/docs.ts` (Node 24 strips the types) so the route table has one definition. For each of the 86 docs emit one record: `route`, `title`, `section` label, every `##`/`###` heading text, and a body excerpt — markdown stripped of fences, links reduced to their text, truncated at a word boundary near 300 characters. Build `inverted` over lowercased, de-punctuated tokens of **title and headings only** (not body — that is what keeps the file small). Print the emitted byte size. **If it exceeds 400 KB, drop `excerpt` from every record and re-emit**, printing that the headings-only fallback was taken — this is the spec's stated mitigation, not an improvisation.

- [ ] **Step 2: Write `lib/search.ts`**

```typescript
export type SearchRecord = {
  route: string; title: string; section: string; headings: string[]; excerpt: string;
};
export type SearchIndex = { records: SearchRecord[]; inverted: Record<string, number[]> };

const tokenize = (s: string) =>
  s.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 1);

/**
 * Scored local matching — no external service, no third-party script.
 *
 * Title hits outrank heading hits outrank body hits, so searching a page's own
 * name puts that page first even when a dozen other pages mention it in passing.
 * The inverted index covers title and headings; the body is scanned only across
 * the records those tokens already surfaced, which keeps a keystroke cheap.
 */
export function search(index: SearchIndex, query: string, limit = 20) {
  const tokens = tokenize(query);
  if (!tokens.length) return [];

  const scores = new Map<number, number>();
  const bump = (i: number, by: number) => scores.set(i, (scores.get(i) ?? 0) + by);

  for (const token of tokens) {
    for (const key of Object.keys(index.inverted)) {
      if (!key.startsWith(token)) continue;          // prefix match, so "prov" finds "provenance"
      const exact = key === token ? 2 : 1;
      for (const i of index.inverted[key]) {
        const rec = index.records[i];
        if (tokenize(rec.title).some((t) => t.startsWith(token))) bump(i, 10 * exact);
        else bump(i, 4 * exact);
      }
    }
    for (const [i, rec] of index.records.entries()) {
      if (rec.excerpt.toLowerCase().includes(token)) bump(i, 1);
    }
  }

  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([i, score]) => ({ record: index.records[i], score }));
}
```

- [ ] **Step 3: Write `components/ui/SearchDialog.tsx`**

Client component. A trigger button showing `Search ⌘K`. Opens a `<dialog>` — real `showModal()`, so focus trapping and `Esc` come from the platform rather than hand-rolled. `Cmd/Ctrl-K` opens it; the listener is registered once in a `useEffect`. **The index is fetched lazily on the first keystroke or first open, never on page load** — that is the whole point of the design. Results group under their `section` label, are keyboard-navigable with arrow keys, and `Enter` navigates. `role="listbox"`/`option`, an `aria-live` count, and an explicit empty state naming the query.

- [ ] **Step 4: Verify search against three known terms**

```bash
cd ~/graph-lab && npm run build:search && ls -la public/search-index.json
node --experimental-strip-types -e '
import("./lib/search.ts").then(async (S) => {
  const index = JSON.parse(require("node:fs").readFileSync("public/search-index.json", "utf8"));
  for (const q of ["glossary", "provenance", "subgraph budget"]) {
    console.log(q, "->", S.search(index, q, 3).map((r) => r.record.route));
  }
});'
```
Expected: the file is under 400 KB, and each query's top hit is a page that genuinely is about that term — `glossary` must return `/docs/02-foundations/glossary/` first. If it does not, the scoring is wrong; fix it here.

- [ ] **Step 5: Commit**

```bash
cd ~/graph-lab
git add scripts/build-search-index.mjs lib/search.ts components/ui/SearchDialog.tsx components/ui/NavBar.tsx
git commit -m "feat: add lazily-loaded local site search with scored matching"
```

---

## Task 16: The landing page

**Files:**
- Modify: `~/graph-lab/app/page.tsx` (replaces the Task 4 placeholder wholesale)
- Create: `~/graph-lab/components/landing/Hero.tsx`
- Create: `~/graph-lab/components/landing/Curriculum.tsx`
- Create: `~/graph-lab/components/landing/PatternGrid.tsx`
- Create: `~/graph-lab/components/landing/GetStarted.tsx`
- Create: `~/graph-lab/components/landing/Maintainers.tsx`
- Create: `~/graph-lab/components/landing/Footer.tsx`

**Interfaces:**
- Consumes: `getRoadmap()`, `getAllPatterns()`, `getSource()`.

- [ ] **Step 1: Write the copy first, separately**

Before writing any component, open both `~/graph-engineering-course/README.md` and `content/docs/README.md`, read how each phrases the pitch, and write the landing copy as a **third independent phrasing** — same claim, different sentences. This is the one place in the whole project where new prose is written; the Global Constraints require it be independent of both existing versions. Draft it in `LOOP-STATE.md` under "Landing copy" so the wording is reviewable on its own before it is buried in JSX.

- [ ] **Step 2: Write `components/landing/Hero.tsx`**

The drafted headline and subhead, a `PillButton` to `/docs/00-start-here/` and an outline one to `/tracks/`, and a mono stat strip — `86 PAGES · 23 PATTERNS · 24 STARTER KITS · 7 QUIZZES` — with those numbers computed from `getAllDocs().length` and `getAllPatterns().length`, never typed as literals that can rot.

- [ ] **Step 3: Write `Curriculum.tsx`, `PatternGrid.tsx`, `GetStarted.tsx`, `Maintainers.tsx`, `Footer.tsx`**

`Curriculum` — the seven Parts from `getRoadmap()` as a numbered list of `<Panel>`s with each Part's step count, linking to `/tracks/`. `PatternGrid` — the 23 patterns as a dense mono grid of slug chips linking to their pages, with a link to `/patterns/`. `GetStarted` — three numbered steps (read Start here → pick a track → clone a starter kit) with the clone command in a mono block plus a copy button. `Maintainers` — attribution and a link to the course repo. `Footer` — repo link, licence, and the sync provenance line from `getSource()`: `Content synced from <commit sha, 8 chars> on <syncedAt date>`, which is what makes the pinned-commit lag visible rather than hidden, per the spec's risk section.

- [ ] **Step 4: Write `app/page.tsx`** composing Hero → TwoGraphsSplit (Task 17) → Curriculum → PatternGrid → GetStarted → Maintainers → Footer, each inside a `<Section>`.

- [ ] **Step 5: Build and check the copy against the constraint**

```bash
cd ~/graph-lab && npm run build
```
Then diff the landing copy by eye against both READMEs. Any sentence that appears in either, or is a light paraphrase of one, gets rewritten now.

- [ ] **Step 6: Commit**

```bash
cd ~/graph-lab
git add app/page.tsx components/landing
git commit -m "feat: add landing page with independently worded site copy"
```

---

## Task 17: The three animated diagrams

**Files:**
- Create: `~/graph-lab/components/landing/TwoGraphsSplit.tsx`
- Create: `~/graph-lab/components/landing/LifecycleDiagram.tsx`
- Create: `~/graph-lab/components/landing/SubgraphViewer.tsx`
- Create: `~/graph-lab/components/ui/ScrollAnimator.tsx`
- Modify: `~/graph-lab/app/page.tsx` (place all three)

**Interfaces:**
- Consumes: nothing from `content/` — these are landing-page site chrome, not doc-page components. Per Global Constraints they are **not** registered for use inside doc pages; doing so would require inventing a marker convention in `docs/`.
- Produces: `ScrollAnimator` takes `{ children: React.ReactNode; className?: string }` and adds a `.in-view` class when its subtree first intersects the viewport, so every diagram shares one observer implementation.

- [ ] **Step 1: Write `components/ui/ScrollAnimator.tsx`**

Client component wrapping an `IntersectionObserver` at `threshold: 0.25`, adding `.in-view` once and then disconnecting. **When `matchMedia("(prefers-reduced-motion: reduce)").matches`, it adds `.in-view` immediately on mount and never observes** — reduced motion means the finished state, not no state.

- [ ] **Step 2: Write `TwoGraphsSplit.tsx`**

Hand-built inline SVG, not mermaid: a work-history graph on the left and a fact graph on the right, split by a hairline rule. Edges draw themselves via `stroke-dasharray`/`stroke-dashoffset` transitioning to 0 under `.in-view`; nodes snap in with a short `transform` transition, staggered by `transition-delay`. Props `{ highlightSide?: "work-history" | "fact" }` dims the other side. Add `role="img"` and an `aria-label` describing what the diagram shows, since the animation carries meaning a screen reader otherwise never gets.

- [ ] **Step 3: Write `LifecycleDiagram.tsx`**

Inline SVG of extraction → resolution → provenance as three linked stages, props `{ activeStage?: "extraction" | "resolution" | "provenance" }`, same draw-in treatment, same `role="img"` + `aria-label`.

- [ ] **Step 4: Write `SubgraphViewer.tsx`**

Props `{ fullGraph: { nodes: string[]; edges: [string, string][] }; subgraphNodeIds: string[] }`. Renders the full graph and dims everything outside `subgraphNodeIds`; a toggle button switches between "full graph" and "bounded subgraph" with `aria-pressed`, and the dimming is a color transition, not a layout change, so nothing reflows.

- [ ] **Step 5: Place all three on the landing page and verify reduced motion**

Add `TwoGraphsSplit` after the hero, `LifecycleDiagram` in the curriculum section, `SubgraphViewer` before Get Started. Then verify in the browser with `prefers-reduced-motion: reduce` forced on (Chrome DevTools → Rendering → Emulate CSS media feature): all three must appear fully drawn, immediately, with no animation.

- [ ] **Step 6: Commit**

```bash
cd ~/graph-lab
git add components/landing components/ui/ScrollAnimator.tsx app/page.tsx
git commit -m "feat: add three animated landing diagrams with reduced-motion support"
```

---

## Task 18: Sitemap, llms.txt, 404, OG image, metadata

**Files:**
- Create: `~/graph-lab/app/sitemap.ts`
- Create: `~/graph-lab/app/not-found.tsx`
- Create: `~/graph-lab/scripts/generate-llms-txt.mjs` (add to `prebuild`)
- Create: `~/graph-lab/public/og-image.png`
- Modify: `~/graph-lab/app/layout.tsx` (openGraph + metadataBase)

**Interfaces:**
- Consumes: `getAllDocs()`, `getAllPatterns()`, `getRoadmap()`.

- [ ] **Step 1: Write `app/sitemap.ts`**

Enumerate every emitted route — `/`, the 86 docs, `/tracks/`, `/patterns/` plus 23 pattern pages, 7 quizzes, 6 flashcard sets, `/projects/`, `/resources/`, `/certification/` — from the same loaders the pages use. Read the origin from `NEXT_PUBLIC_SITE_URL`, defaulting to `https://ayeshakhalid192007-dev.github.io/graph-lab`.

- [ ] **Step 2: Write `scripts/generate-llms-txt.mjs`**

Import `lib/docs.ts` so the route list has one definition. Emit `public/llms.txt`: the site name, one line of description, then every route with its title grouped under section headings. Add it to `prebuild` alongside the other two generators.

- [ ] **Step 3: Write `app/not-found.tsx`**

Blueprint-styled 404 — mono `404`, one line of copy, links to `/`, `/docs/00-start-here/`, and a hint that `⌘K` searches.

- [ ] **Step 4: Create `public/og-image.png`**

1200×630, original artwork in the Blueprint palette: dot grid, the wordmark in mono, a hairline-ruled panel with corner ticks, a small node-and-edge motif. Generate it deterministically with a small node script writing to canvas, or draw it as SVG and rasterise — either way, **commit the script that produced it** next to the PNG so it can be regenerated rather than becoming an unexplained binary.

- [ ] **Step 5: Wire metadata in `app/layout.tsx`**

Add `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ayeshakhalid192007-dev.github.io/graph-lab")`, `openGraph` with `images: ["/og-image.png"]`, `type: "website"`, and a matching `twitter: { card: "summary_large_image" }`.

- [ ] **Step 6: Run the Loop 4 gate**

```bash
cd ~/graph-lab && npm run verify:4
grep -c '<loc>' out/sitemap.xml    # expect ~130
head -20 out/llms.txt
```

- [ ] **Step 7: Commit and record loop state**

```bash
cd ~/graph-lab
git add app/sitemap.ts app/not-found.tsx app/layout.tsx scripts/generate-llms-txt.mjs public/og-image.png scripts/generate-og.mjs
git commit -m "feat: add sitemap, llms.txt, 404, and Open Graph metadata"
```
Append Task 15–18 entries to `LOOP-STATE.md`, then **STOP Loop 4 permanently** and report the `verify:4` output.

---

# LOOP 5 — Polish, Verification, Deploy

**Entry condition:** Loop 4 gate approved.
**Exit condition:** every line of the spec's Definition of Done confirmed; Task 22 either completed with explicit user confirmation or explicitly deferred.

---

## Task 19: Responsive and accessibility pass

**Files:** Modify across `components/` and `app/` as issues are found. No new files expected.

- [ ] **Step 1: Check every page type at 375, 768, and 1280**

Landing, a doc page, `/tracks/`, `/patterns/`, a pattern page with a starter kit, a quiz, a flashcard set, `/projects/`, `/resources/`, `/certification/`, and the 404. At 375 confirm no horizontal scroll on the body — wide tables, code blocks, and diagrams each scroll inside their own container. **Below 768 the doc sidebar must be collapsed**, per the spec's DoD; fix `DocSidebar` here if it is not.

- [ ] **Step 2: Keyboard-only pass**

Tab through the whole site with no mouse. Every interactive element must be reachable, show a visible focus ring, and be operable with `Enter`/`Space`. Specifically check: the nav disclosure, `SearchDialog` (open with `⌘K`, arrow through results, `Esc` closes and returns focus to the trigger), pattern filters, the starter file tree, quiz buttons, flashcard flip, checklist checkboxes, and the certificate download.

- [ ] **Step 3: Lighthouse accessibility on three pages**

Run the Chrome DevTools Lighthouse accessibility category against the landing page, one doc page, and `/certification/`. Fix everything it flags as critical. Record the three scores in `LOOP-STATE.md`.

- [ ] **Step 4: Commit**

```bash
cd ~/graph-lab && git add -A && git commit -m "fix: responsive and accessibility pass across every page type"
```

---

## Task 20: Both-themes pass

**Files:** Modify as issues are found.

- [ ] **Step 1: Check every page type in both themes.** Toggle with `ThemeToggle` and confirm contrast on: body prose, mono labels, hairline rules against both surfaces, `Panel` corner ticks, the accent on buttons and links, and disabled states.
- [ ] **Step 2: Check all 20 mermaid diagrams in dark mode specifically.** Node fills, edge lines, and label text must all be legible against `--paper` dark. If any diagram is unreadable, adjust `GraphDiagram`'s `themeVariables` — not the course content.
- [ ] **Step 3: Check Shiki in both themes.** Confirm the dual-theme CSS variables actually switch; a code block that stays light-themed in dark mode means the `@shikijs/rehype` dual-theme wiring needs its `.dark` selector configured.
- [ ] **Step 4: Confirm no flash of wrong theme on load** on a hard refresh in both themes.
- [ ] **Step 5: Commit**

```bash
cd ~/graph-lab && git add -A && git commit -m "fix: dual-theme pass including mermaid and Shiki legibility"
```

---

## Task 21: Full Definition of Done verification

**Files:** Modify `LOOP-STATE.md`.

- [ ] **Step 1: Run the full gate**

```bash
cd ~/graph-lab && npm run verify:all
```

- [ ] **Step 2: Walk the spec's Definition of Done line by line**

Open `~/graph-landing/2026-08-06-course-website-design.md` and confirm each of its ten DoD bullets against the running site. For each, record in `LOOP-STATE.md` what was checked and what was observed — not "done", but the actual count or the actual behaviour. Any bullet that cannot be confirmed is a defect to fix now, not a note to file.

- [ ] **Step 3: Verify the emitted export one more time**

```bash
cd ~/graph-lab
find out -name index.html | wc -l                        # total routes
find out/docs -name index.html | wc -l                   # 86
du -sh out && du -h public/search-index.json
```

- [ ] **Step 4: Commit**

```bash
cd ~/graph-lab && git add -A && git commit -m "chore: record full definition-of-done verification"
```

---

## Task 22: Deploy — BLOCKED pending explicit confirmation

**This task does not start until the user confirms, in this session, all three of:**

1. **Create the public GitHub repo `graph-lab`** under `ayeshakhalid192007-dev`.
2. **Push `main` to it.**
3. **Enable GitHub Pages** with the GitHub Actions source, publishing at `https://ayeshakhalid192007-dev.github.io/graph-lab/`.

**Do not create any repository, remote, deploy token, or Pages configuration on an inference from earlier context.** The spec is explicit that this step needs a direct go-ahead. If confirmation has not been given, stop here, report that Tasks 19–21 are complete and the site builds locally, and leave Task 22 unchecked.

**Files (once unblocked):**
- Create: `~/graph-lab/.github/workflows/deploy.yml`
- Create: `~/graph-lab/README.md`
- Modify: `~/graph-engineering-course/docs/README.md` (the one change this project makes to the course repo)

- [ ] **Step 1 (once unblocked): Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
  workflow_dispatch:

# Least-privilege token scoped for Pages deployment.
permissions:
  contents: read
  pages: write
  id-token: write

# One deploy at a time; a newer push supersedes an in-flight run.
concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          # 24, not 20: check-content-shape.mjs imports lib/parse-content.ts so the
          # quiz and flashcard parsers have one definition, and only Node >=23.6
          # strips types from an imported .ts without a flag. Kept in step with
          # .nvmrc and package.json engines — do not lower it in isolation.
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci

      # content/ must match the commit pinned in SOURCE.json. This is the check
      # that makes content/ a build artifact rather than a second editable copy.
      - run: npm run sync:check
        env:
          COURSE_REPO: ${{ runner.temp }}/course
        # sync:check needs the course repo to diff against.
      - name: Fetch the pinned course repo
        run: |
          git clone --filter=blob:none https://github.com/ayeshakhalid192007-dev/graph-engineering-crash-course.git "${{ runner.temp }}/course"

      - run: npm run check:content-shape
      - run: npm run typecheck
      - name: Build static export
        env:
          PAGES_BASE_PATH: /graph-lab
          NEXT_PUBLIC_BASE_PATH: /graph-lab
          NEXT_PUBLIC_SITE_URL: https://ayeshakhalid192007-dev.github.io/graph-lab
        run: npm run build
      - name: Validate links in the export
        env:
          PAGES_BASE_PATH: /graph-lab
        run: npm run check:links
      - name: Disable Jekyll (serve _next/*)
        run: touch ./out/.nojekyll
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Reorder the clone step above `sync:check` when writing the file — the clone must run first. Verify the ordering locally before pushing.

- [ ] **Step 2: Write `~/graph-lab/README.md`** — what the repo is, that `content/` is generated and how to refresh it (`npm run sync:latest`), the local dev command, the four verification commands, and a link to the live site.

- [ ] **Step 3: Create the repo and push (only after confirmation)**

```bash
cd ~/graph-lab
gh repo create ayeshakhalid192007-dev/graph-lab --public --source=. --remote=origin --push
gh api -X POST repos/ayeshakhalid192007-dev/graph-lab/pages -f build_type=workflow
```

- [ ] **Step 4: Watch the run and verify the live site**

```bash
cd ~/graph-lab && gh run watch
curl -sI https://ayeshakhalid192007-dev.github.io/graph-lab/ | head -1
curl -sI https://ayeshakhalid192007-dev.github.io/graph-lab/docs/02-foundations/glossary/ | head -1
```
Expected: `HTTP/2 200` for both. Then open the live site and confirm CSS, a mermaid diagram, search, and one starter kit all work under `/graph-lab` — a wrong `basePath` shows up as an unstyled page or a 404 on the starter JSON, and only shows up here.

- [ ] **Step 5: Amend the course repo's `docs/README.md`**

`docs/README.md` currently reads *"there is exactly one copy of the content, not two that can drift apart."* A pinned snapshot in a second repo is a narrow exception. Add one sentence noting that the website builds from a commit-pinned snapshot of these same files, linking to `graph-lab`. **This is the only change this project makes to the course repo.**

```bash
cd ~/graph-engineering-course
git add docs/README.md
git commit -m "docs: note that graph-lab builds from a commit-pinned snapshot of docs/"
git push
```

- [ ] **Step 6: Final commit, record loop state, stop**

```bash
cd ~/graph-lab && git add -A && git commit -m "feat: deploy graph-lab to GitHub Pages" && git push
```
Append Task 19–22 entries to `LOOP-STATE.md` with the live URL, then **STOP Loop 5 permanently**. This is the final loop — there is no loop after it.

---

## Deviations from the spec, and one open decision

Everything below is flagged rather than silently absorbed.

**1. Mermaid rendering — spec says client-side; `loop-lab` already does better.** The spec chooses client-side mermaid and lists "diagrams absent from prerendered HTML" as an accepted risk. `loop-lab`'s `sync-docs.mjs` instead pre-renders every mermaid fence to a committed SVG at sync time, keyed by a hash of the source, so its pages ship *zero* diagram JavaScript and the diagrams exist in the static HTML. With only 20 diagrams here, that approach is cheap and strictly better on weight, SEO, and no-JS readers. **This plan implements the spec's client-side version.** If you want the pre-rendered version instead, say so before Loop 2 starts — the change is confined to `scripts/sync-docs.mjs` (add the render step) and `components/content/GraphDiagram.tsx` (becomes a server component reading the SVG), and it removes `mermaid` from `dependencies` entirely.

**2. Additions to the spec's `lib/` listing.** `lib/patterns.ts`, `lib/parse-content.ts`, and `lib/tracks.ts` are not in the spec's illustrative file tree. Each has a stated reason in the File Structure section; none changes any spec decision.

**3. Tailwind v4, not v3.** The spec does not name a version. v4 configures through CSS with no `tailwind.config.ts`, which is what `loop-lab` runs and what the Blueprint token block above assumes.

**4. `/docs/` index needs its own route file.** A catch-all `[...slug]` cannot match an empty segment list under `output: "export"`, so `docs/README.md` gets `app/docs/page.tsx`. This is a Next.js constraint, not a design change.

**5. Starter kit payloads are fetched, not inlined.** The spec lists this as the mitigation if the build grows unwieldy. With 24 kits it is adopted from the start rather than kept in reserve — inlining first and refactoring later would mean writing `StarterViewer` twice.
