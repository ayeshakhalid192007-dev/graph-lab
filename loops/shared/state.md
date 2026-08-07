# Shared state

Cross-loop state for all five loops. Per-task detail lives in each loop's own `state.md`; this file holds only what **crosses a loop boundary**.

**Status:** Loop 1 complete, gate green, awaiting review. Loops 2–5 not started.

---

## Gate log

### Loop 1 gate — 2026-08-07

**Command:** `npm run verify:1` → `sync:check` → `check:content-shape` → `typecheck` → `build`

**Output:** exit 0.

```
> graph-lab@0.1.0 sync:check
sync:check OK — content/ matches af5321e3

> graph-lab@0.1.0 check:content-shape
check:content-shape OK — 7 quizzes, 6 flashcard sets parse as expected

> graph-lab@0.1.0 typecheck
> tsc --noEmit
(silent)

> graph-lab@0.1.0 build
> next build
✓ Compiled successfully in 4.8s
  Finished TypeScript in 3.5s
✓ Generating static pages using 4 workers (3/3) in 748ms

Route (app)
┌ ○ /
└ ○ /_not-found
○  (Static)  prerendered as static content
```

Against `gate.md`'s "what green must actually mean":

| Claim | Observed |
| --- | --- |
| `sync:check` diffed 0 files | 0, against `af5321e3c7684d7886b6b59f3af433073d64d3b0` |
| `check:content-shape` parsed 7/7 quizzes, 6/6 flashcard sets | 7 and 6, at the expected per-part counts 3/2/3/2/3/2/2 and 6/3/6/5/7/3 |
| `tsc --noEmit` clean | silent, exit 0 |
| `next build` emitted a static export | 2 routes, 4 `.html` files in `out/` |
| `content/` holds 86+ files | **224** copied — 86 doc `.md`, 25 pattern `.md`, 24 starter directories, 2 resources |
| `SOURCE.json` pins a real sha | `af5321e3…`, equal to the course repo's `origin/main` |
| `sync:check` observed going red on a hand-edit | **Yes — and it did not, first time.** See D2. Fixed, then red on `content/docs/README.md` (exit 1), red on `content/starters/audit-loop/README.md` (exit 1), green after revert. |

**Tasks completed:**
- **Task 1** — Next 16 static-export scaffold; `npm install` resolved 610 packages, `tsc --noEmit` exit 0.
- **Task 2** — `scripts/sync-docs.mjs` and the first sync: 224 files, byte-identical per `diff -r` (the only differences being the `.claude/` dotfile dirs the script deliberately skips), pinned to `af5321e3`.
- **Task 3** — `lib/parse-content.ts`, `check-sync.mjs`, `check-content-shape.mjs`. Step 5 caught the plan's `check-sync.mjs` as a check that could not fail; fixed under D2.
- **Task 4** — Blueprint tokens, theme provider and toggle, `Section`/`Panel`/`PillButton`, `NavBar`, layout, placeholder landing. Both palettes present in the emitted CSS; no shadows, no gradients.

**Carried forward:** D2 (sync:check is stricter than the plan), D3 (**Loop 3 and Loop 4 must each re-add their half of `prebuild`**), D4 (Next owns `tsconfig.json`). One trap for Loop 2 in `loops/loop-1-foundation/state.md`: `NavBar` links to six routes that do not exist yet, which `check:links` will flag at the Loop 2 gate.

**Status:** gate green, awaiting review.

---

## Gate ledger

One row per gate, appended when the gate goes green and the loop stops.

| Loop | Tasks | Gate command | Status | Date | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 — Foundation & pipeline | 1–4 | `npm run verify:1` | approved | 2026-08-07 | 224 files pinned to `af5321e3`; 7/7 quizzes, 6/6 flashcard sets; 2 routes exported. D2, D3, D4 recorded. Approved by the user on 2026-08-07 by instruction to start Loop 2. |
| 2 — Render layer & 86 doc pages | 5–9 | `npm run verify:2` | in progress | 2026-08-07 | Branch `loop-2-render`, off `loop-1-foundation`. |
| 3 — Interactive surfaces | 10–14 | `npm run verify:3` | not started | — | — |
| 4 — Landing, identity, search | 15–18 | `npm run verify:4` | not started | — | — |
| 5 — Polish, verify, deploy | 19–22 | `npm run verify:all` | not started | — | — |

Status values: `not started` → `in progress` → `gate green, awaiting review` → `approved`.

**A loop sets its own row to `gate green, awaiting review` and stops. Only the user moves a row to `approved`.**

---

## Cross-loop repairs

A loop that fixes a defect in an earlier loop's output records it here. Rule 1 in `loop.md`: fixing is allowed, starting later work is not.

Template:

```
### R<n> — Loop <fixing> repaired Loop <origin>, <date>

**Symptom:** what was observed, and where.
**Cause:** which task's output was wrong, and why.
**Fix:** what changed, in which files.
**Verified by:** the command run, and what it printed.
```

_None yet._

---

## Decisions

Anything that binds later loops: a deviation from the plan, a dependency added, an interface changed, a deferred idea. Recording it here is what makes it visible to a loop that has no memory of the conversation.

Template:

```
### D<n> — <short title>, <date>, Loop <n>

**Decision:** what was decided.
**Because:** the reasoning.
**Affects:** which later tasks or loops need to know.
```

### D0 — Loop scaffold lives in `loops/`, 2026-08-07, pre-Loop-1

**Decision:** The loop-to-loop handoff is a `loops/` tree — `shared/` plus one folder per loop — rather than the single root-level `LOOP-STATE.md` named in the plan. `CLAUDE.md` at the repo root carries the standing rules and is read at the start of every session. The spec and plan are copied into `plan/` so loops are self-contained within the repo.

**Because:** Five loops appending to one flat file makes each loop read four loops' worth of irrelevant history to find its own handoff. Splitting per-loop state from cross-loop state means a loop reads `shared/` plus its own folder and nothing else. Copying the plan in puts checkbox progress under version control alongside the code it describes.

**Affects:** Loop 1 Task 1 Step 7 says to create `~/graph-lab/LOOP-STATE.md`. **That step is superseded** — write to `loops/loop-1-foundation/state.md` and `loops/shared/state.md` instead. Every later instruction in the plan reading "append to `LOOP-STATE.md`" means: append the task entry to your loop's `state.md`, and the gate entry to `shared/state.md`. Loop 1 should not create a root `LOOP-STATE.md`.

### D1 — `~/graph-lab` already exists, initialised and pushed, 2026-08-07, pre-Loop-1

**Decision:** The repo directory, its git history, and its `origin` remote were created ahead of Loop 1, when this scaffold was written. `origin` is `https://github.com/ayeshakhalid192007-dev/graph-lab` — private, default branch `main`.

**Because:** The scaffold and `CLAUDE.md` had to live somewhere version-controlled before any loop ran, and the user created the remote and asked for the scaffold to be pushed.

**Affects:**
- **Loop 1 Task 1 Step 1 is partly done.** `~/graph-lab` exists, `git init -b main` has run, and there are commits. **Do not re-run `git init` and do not delete anything already in the tree.** The remaining work in that step is `.nvmrc` and `.gitignore` — note that `.gitignore` already exists and should be extended, not overwritten, if it is missing entries.
- **All five loops run from `~/graph-lab`.** The plan's Loop Charter says to start Loop 1 from `~/graph-landing` because `~/graph-lab` did not yet exist; it does now, so that instruction no longer applies.
- **The plan and spec now live at `plan/` inside this repo.** Read them there. The copies in `~/graph-landing` are the drafting originals and are no longer the ones loops tick checkboxes in.
- **C18 is unchanged.** A remote existing does not pre-authorise the Loop 5 Task 22 deploy: pushing *site code*, writing the workflow, and enabling Pages still need explicit confirmation at that step.

### D2 — `check-sync.mjs` excludes by path, not by filename glob, 2026-08-07, Loop 1

**Decision:** Task 3 Step 2's `scripts/check-sync.mjs` as written in the plan diffs with `--exclude=SOURCE.json --exclude=README.md`. That is wrong and shipped a check that could not fail. It has been changed: the two hand-maintained files, `content/README.md` and `content/SOURCE.json`, are copied into the temp tree by exact path before the diff, and the diff then runs with **no exclusions at all**.

**Because:** `diff --exclude=README.md` matches the basename at every depth. `content/` holds **44** `README.md` files and only the root one is hand-written — the other 43 are course content: 17 doc-tree READMEs (real pages) and all 24 starter kits' READMEs (the primary file the Loop 3 starter viewer shows). The plan's version exempted every one of them from the byte comparison. Task 3 Step 5 caught this exactly as designed: appending a line to `content/docs/README.md` and running `npm run sync:check` printed `sync:check OK — content/ matches af5321e3`, exit 0. A gate that cannot go red is not a gate. After the fix the same edit prints `Files …/content/docs/README.md and …/docs/README.md differ`, exit 1, and an edit to `content/starters/audit-loop/README.md` is caught too; clean content is still green.

**Affects:** Nobody needs to change code — the script's interface and its npm script name are unchanged. But **`sync:check` is now strictly stricter than the plan describes**, and every later loop runs it inside `verify:2`/`verify:3`/`verify:4`/`verify:all`. A loop that touches any file under `content/` for any reason — including a starter-kit README it assumed was "just a readme" — will now go red where the plan's version would have stayed green. That is the intent. C1 is enforced across all 224 files, not 181 of them.

### D3 — `prebuild` is deferred, and Loops 3 and 4 must each re-add their half, 2026-08-07, Loop 1

**Decision:** The plan's Task 1 `package.json` contains `"prebuild": "node scripts/build-starters.mjs && node scripts/build-search-index.mjs"`. That key has been **removed from Loop 1's `package.json`** and replaced by a `"//prebuild"` comment key carrying the instruction. The `build:starters` and `build:search` script entries themselves are unchanged and still present.

- **Loop 3 Task 11**, on creating `scripts/build-starters.mjs`, adds `"prebuild": "npm run build:starters"`.
- **Loop 4 Task 15**, on creating `scripts/build-search-index.mjs`, extends it to `"prebuild": "npm run build:starters && npm run build:search"`.

**Because:** npm runs `prebuild` before every `build`. Those two scripts are not written until Loop 3 Task 11 and Loop 4 Task 15, so as the plan has it, `npm run build` — and therefore `verify:1`, `verify:2`, `verify:3`, and `verify:all` — is unrunnable from Task 1 until Loop 4 finishes. Observed: `npm run verify:1` exited 1 with `Error: Cannot find module '/home/ayesha-khalid/graph-lab/scripts/build-starters.mjs'`. The plan's package.json describes the finished repo and was dropped in at the first task; the generators have to be wired into `prebuild` as they are written, not before.

**Affects:** **Loop 3 and Loop 4 must not skip their half.** A build with no `prebuild` still succeeds — it just silently emits no `public/starters/<slug>.json` and no `public/search-index.json`. On a developer machine those files may linger from an earlier manual `npm run build:starters`, so the omission can pass local verification and only surface as an empty pattern browser and dead search on a clean CI checkout. A pointer to this decision has been added to `loops/loop-3-interactive/tasks.md` and `loops/loop-4-landing/tasks.md`.

### D4 — Next rewrote `tsconfig.json` on first build, 2026-08-07, Loop 1

**Decision:** Left as Next wrote it. `next build` reported *"The following mandatory changes were made to your tsconfig.json: `jsx` was set to `react-jsx`"* and added `.next/dev/types/**/*.ts` to `include`. The plan's Task 1 Step 4 specifies `"jsx": "preserve"`; the committed file now says `"jsx": "react-jsx"`.

**Because:** Next 16 enforces the automatic React runtime and rewrites the file itself on every build. Reverting to `preserve` would be undone on the next `npm run build` and would produce a spurious diff in every loop.

**Affects:** Nothing downstream — it is the setting Next requires. Recorded only so a later loop reading the plan does not "restore" `preserve` and then wonder why the file keeps changing back. `tsconfig.json` also reformats to one-array-entry-per-line on each build; that is Next's writer, not a hand edit.

### D5 — relative imports between `lib/` modules carry the `.ts` extension, 2026-08-07, Loop 2

**Decision:** `lib/docs.ts` imports `./content.ts`, not `./content` as the plan writes it. `tsconfig.json` gains `"allowImportingTsExtensions": true` (legal because `noEmit` is already true). **Every `lib/` module a later loop adds should follow the same convention** for its relative imports.

**Because:** the plan verifies these modules by running them under bare Node — Task 5 Step 3, Task 6 Step 2, and the equivalents in Loops 3 and 4 all do `node --experimental-strip-types -e 'import("./lib/….ts")…'`. Node's ESM resolver requires an explicit extension on relative specifiers; only the bundler's `moduleResolution: "bundler"` makes `./content` work. As written, Step 3 died with `ERR_MODULE_NOT_FOUND: Cannot find module '/home/ayesha-khalid/graph-lab/lib/content' imported from …/lib/docs.ts`. This is the same property Loop 1 relies on for `check-content-shape.mjs` importing `lib/parse-content.ts` — that file happened to have no relative imports of its own, so the gap did not show until now.

**Verified both ways:** `npm run typecheck` exit 0, and `next build` "Compiled successfully in 4.2s" — Turbopack resolves the explicit extension fine. So the one spelling satisfies the bundler, `tsc`, and bare Node.

**Affects:** Loop 3's `lib/patterns.ts` and `lib/tracks.ts`, and Loop 4's `lib/search.ts`. Write `from "./content.ts"`, not `from "./content"`, or your task's own Node-based verification step will not run.

### D6 — the plan's `resolveContentLink` shipped two dead-route bugs; both are fixed, 2026-08-07, Loop 2

**Decision:** `lib/links.ts` deviates from the plan's Task 6 Step 1 listing in two places.

1. **A `.md` link outside `docs/` now falls through** instead of returning `null`. The plan's version tests `resolved.endsWith(".md")` first and returns `null` when no doc owns that path — which is every file under `patterns/`, `starters/` and `resources/`, all of them markdown. The rules below it could never be reached.
2. **Pattern and starter slugs are validated against `content/`** via `listFiles()` before a `/patterns/<slug>/` route is emitted. The plan matches the slug shape with a regex and trusts it.

**Because:** Step 2's probe over all 86 docs printed **12 `DEAD` lines** on the plan's logic — `docs/README.md` → `../patterns/README.md`, `../starters/README.md`, `../resources/sources.md`; six step pages → `../../resources/sources.md`; `docs/methods/pattern-picker.md` → `../../patterns/README.md`; two cheatsheets → `../../../starters/README.md`. None of those are broken course links; all are the resolver failing to reach its own later branches. After the fix: **272 links, 0 unresolved.**

The second bug is the quieter one. Bug 1 fails loudly at the link check; bug 2 fails *silently* — `patterns/renamed-away.md` resolved to `/patterns/renamed-away/`, a route with no page behind it, and because `resolveContentLink` never returned `null` the check had nothing to flag. A resolver that invents routes defeats the point of returning `null` at all.

**Affects:**
- **Task 9's `check-links.mjs` must treat a `null` from `resolveContentLink` as a failure**, not as "unknown, skip". That is the entire mechanism protecting against a folder rename in the course repo.
- **Loop 3 must not rename a pattern or starter slug away from its `content/` filename.** The route slug and the file stem are now the same string by construction; `/patterns/<slug>/` pages must be generated from `content/patterns/*.md` stems, or real links go null.
- **Expect the Loop 2 gate to flag `/patterns/` and `/resources/`.** Real content links resolve there and those routes are Loop 3's. This is correct resolver output against an incomplete site — Task 9 decides how the check handles not-yet-built routes. Do not weaken the resolver to make the gate green.

### D7 — the render pipeline splits `toHast` from `renderMarkdown`, 2026-08-08, Loop 2

**Decision:** `lib/markdown.ts` exports **two** functions rather than the one the plan lists. `toHast(body, repoPath)` runs the whole remark/rehype pipeline and stops at hast; `renderMarkdown(body, repoPath)` calls it and maps the result to React, importing `GraphDiagram` and `CodeBlock` with a lazy `await import()` instead of at module scope. `lib/markdown.ts` contains no JSX — it uses `createElement`. The interface the plan promised is unchanged: `renderMarkdown` still returns `{ content, headings }`.

**Because:** the plan's own Task 7 Step 4 verifies the module with `node --experimental-strip-types -e 'import("./lib/markdown.ts")'`, and the module as the plan writes it cannot be loaded that way twice over. Node's type stripping does not compile JSX, and a static `import … from "@/components/content/GraphDiagram"` resolves to a `.tsx` that bare Node rejects outright — confirmed: `TypeError: Unknown file extension ".tsx"`. Splitting the seam makes the pipeline core verifiable under Node while leaving the React path to the bundler, where it belongs.

**Affects:**
- **Pages call `renderMarkdown`.** `toHast` is the lower layer; it does no React mapping.
- **Loop 4 Task 15 should build the search index on `toHast`.** `scripts/build-search-index.mjs` runs under plain Node, and this is the supported way to get course markdown reduced to structured text without importing React into a build script. Do not re-implement a second markdown parser there — a second definition of "what a heading is" is exactly the drift Loop 1 avoided with `lib/parse-content.ts`.
- **Any `lib/` module a later loop wants verifiable under bare Node must avoid JSX and `.tsx` imports.** This is the same property D5 protects with explicit `.ts` extensions; D7 is its second half.

### D8 — `CodeBlock` receives React children, not an HTML string, 2026-08-08, Loop 2

**Decision:** the plan's `CodeBlock({ lang, html, raw })` ships as `CodeBlock({ lang, raw, children })`. A rehype step wraps each fence in a `<code-block lang raw>` element **before** shiki runs; shiki then highlights the `<pre>` still nested inside, and the highlighted markup reaches the component as ordinary React children.

**Because:** `@shikijs/rehype` does `parent.children[index] = fragment` — it *replaces* the `<pre>` node rather than annotating it, so the raw source and language must be captured onto a wrapper beforehand or they are gone. Given a wrapper, passing children is strictly better than passing `html`: producing an HTML string would mean serialising hast back to HTML with `hast-util-to-html`, which is **not in the plan's `package.json`** and would need a dependency Decision under C10 — to undo work the pipeline had already done.

**Affects:** Loop 3's starter-kit file viewer and any other surface that frames code. Use `CodeBlock` with children. The one visible consequence is that `raw` is optional: a code block with no captured source renders without a copy button rather than with a button that copies nothing.

---

## Open questions for the user

Questions a loop hit, recorded rather than guessed at. A loop that adds one here stops (Rule 5).

_None yet._

---

## Known deviations from the spec

The spec is authoritative. Anything this build does differently, and why, goes here so the gap is visible rather than silent.

_None yet._
