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

---

## Open questions for the user

Questions a loop hit, recorded rather than guessed at. A loop that adds one here stops (Rule 5).

_None yet._

---

## Known deviations from the spec

The spec is authoritative. Anything this build does differently, and why, goes here so the gap is visible rather than silent.

_None yet._
