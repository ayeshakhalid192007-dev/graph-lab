# Shared state

Cross-loop state for all five loops. Per-task detail lives in each loop's own `state.md`; this file holds only what **crosses a loop boundary**.

**Status:** Loops 1–3 approved and merged to `main`. Loop 4 in progress. Loop 5 not started.

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

### Loop 2 gate — 2026-08-08

**Command:** `npm run verify:2` → `verify:1` (`sync:check` → `check:content-shape` → `typecheck` → `build`) → `check:links`

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
✓ Compiled successfully in 13.2s
  Finished TypeScript in 5.6s
✓ Generating static pages using 6 workers (89/89) in 19.1s

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /docs
└ ● /docs/[...slug]
  └ [+82 more paths]

> graph-lab@0.1.0 check:links
check:links OK — 17534 internal links across 90 pages all resolve

925 links point at 13 routes not built yet (see PENDING_ROUTES):
  /certification/     180 links   Loop 3 Task 14
  /patterns/          186 links   Loop 3 Task 11
  /patterns/<8 slugs>  12 links   Loop 3 Task 11
  /projects/          180 links   Loop 3 Task 13
  /resources/         187 links   Loop 3 Task 13
  /tracks/            180 links   Loop 3 Task 10
```

Against `gate.md`'s "what green must actually mean":

| Claim | Observed |
| --- | --- |
| `next build` emitted 86 doc pages plus the `/docs/` index | **86** `index.html` under `out/docs`; 89 routes, 90 HTML files counting `/_not-found` |
| `check:links` reported 0 unresolved internal links | **0** broken of **17,534** checked; 925 more point at 13 routes Loop 3 builds, each named with its owning task |
| `sync:check` still diffs 0 files | 0, against `af5321e3` — Loop 2 did not touch `content/` |
| `check:content-shape` still parses 7/7 and 6/6 | 7 quizzes, 6 flashcard sets |
| `tsc --noEmit` clean | silent, exit 0 |
| 20 mermaid fences across 20 files, each a `GraphDiagram` | **20**, and the 20 emitted routes set-compare *exactly* to the 20 source files (Task 8) |
| Every other fence highlighted by Shiki — 41 markdown, 23 other | **64** blocks: 41 markdown, 15 json, 3 yaml, 3 text, 2 jsonl (Task 7) |
| Three pages spot-checked by eye | **Four**, in both themes — see Task 9 in `../loop-2-render/state.md` |

**Beyond the gate's list:**
- **The link check was observed going red**, twice: an injected `<a href="/docs/no-such-page/">` gave `FAILED — 1 of 17535`, exit 1; a `PENDING_ROUTES` entry for a route that *does* exist gave `FAILED — 1 PENDING_ROUTES entries are now built and must be deleted`, exit 1. Both green again after reverting.
- **Re-run under `basePath`:** built and checked with `PAGES_BASE_PATH=/graph-lab` — identical 17,534 / 90 / 925. D9's arrangement holds for the checker too.

**Tasks completed:**
- **Task 5** — `lib/content.ts`, `lib/docs.ts`: 86 docs, 7 parts, 17 steps, 0 untitled, 17 sidebar sections.
- **Task 6** — `lib/links.ts`: 272 links across all 86 docs, 0 unresolved, after fixing two dead-route bugs in the plan's listing (D6).
- **Task 7** — the render pipeline: run over all 86 pages, 0 failures; 20 diagrams, 64 code blocks, 501 headings, 272 anchors (265 internal, 7 external).
- **Task 8** — the doc route: 86 pages emitted, sidebar and prev/next on all 86, breadcrumbs on 85, ToC on 66, 16 KB gzipped per page.
- **Task 9** — `check-links.mjs` and this gate.

**Carried forward:** D5–D9 (see below). One list Loop 3 must empty as it goes: **`PENDING_ROUTES` in `scripts/check-links.mjs`**, one line per task, failing the build if a line outlives the route it excuses.

**Status:** gate green, awaiting review. Loop 3 not started.

### Loop 3 gate — 2026-08-08

**Command:** `npm run verify:3` → `verify:2` → `verify:1` (`sync:check` → `check:content-shape` → `typecheck` → `build`) → `check:links`

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
> npm run build:starters
build:starters OK — 24 kits, 124 files
> next build
✓ Compiled successfully in 21.6s
  Finished TypeScript in 7.3s
✓ Generating static pages using 7 workers (130/130) in 30.8s

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /certification
├ ○ /docs
├ ● /docs/[...slug]      [+82 more paths]
├ ● /flashcards/[part]   [+3 more paths]
├ ○ /patterns
├ ● /patterns/[slug]     [+20 more paths]
├ ○ /projects
├ ● /quiz/[part]         [+4 more paths]
├ ○ /resources
└ ○ /tracks

> graph-lab@0.1.0 check:links
check:links OK — 18662 internal links across 131 pages all resolve
```

**`PENDING_ROUTES` is empty.** All seven hand-written entries and the derived per-slug block are gone — each deleted by the task that built its route, which is the only thing D10 accepts as a reason to delete one. There is no pending-routes footer under the `check:links` line any more, because there is nothing pending.

Against `gate.md`'s "what green must actually mean" — the number, not the word:

| Claim | Observed |
| --- | --- |
| `check:links` reported 0 unresolved internal links | **0** broken of **18,662** checked across 131 pages, and **0 pending** |
| `sync:check` still diffs 0 files | 0 — but against **256** files now, not 224. See R3 |
| `tsc --noEmit` clean | silent, exit 0. `npm run lint` also exit 0 |
| **4 tracks** render; every `firstStepRoute` points at a page that exists | **4**; the Task 10 probe printed `all 4 track routes resolve`, and in the browser G2's card links `/docs/04-part-2-the-dag-of-work/` |
| **17 roadmap steps** render, `ProgressTracker` records against them | **17** checkboxes. Ticking three moved the bar `Step 0 of 17` → `Step 3 of 17`, `aria-valuenow` 0 → 3, and **a reload came back at 3** |
| **23 patterns** browse; filters work across category, stage, tool | **23**. `A · Extraction` → 3; `+ B · Resolution` → 6 (OR within a group); `OpenCode` → 7; `OpenCode + storage` → 1 (AND across groups); `E · Checker + storage` → 0 with a message naming which filter to clear |
| **24 starter kits** have viewable files; the harness switcher works where a kit ships both | **24** payloads, **124 files**. **8 kits ship both** — 7 patterns plus `_template` — and the switcher swapped `.claude/agents` + `.claude/skills/extract-facts` for `opencode` + `opencode/skills/extract-facts` on `document-to-facts`, shared root files staying put. **Before R3 this number was 0**: the sync had dropped every `.claude/` tree |
| **7 quizzes** playable — reveal-answer and running tally both work | **7** `index.html` under `out/quiz`. Played Part 1 end to end: revealed all three answers, answered had-it / didn't / had-it, tally read 0 → 1 → 1, final screen `You marked 2 of 3 correct.`, `Start over` reset it |
| **6 flashcard sets** playable, with shuffle. Part 6 has none, by design | **6** under `out/flashcards`; no `/flashcards/6/`. Flip, Next, Previous and Shuffle all worked — shuffle returned the same six terms in a different order |
| **8 projects** render, each linking into `/docs/projects/…` | **8** cards, 8 distinct `/docs/projects/<slug>/` hrefs, all resolving. The page throws unless it counts exactly 8 |
| **10 sources** render, plus the anti-patterns summary | **10** `## N.` headings parsed and 10 matching `<h2 id>` anchors emitted; anti-patterns rendered below. The page throws unless it counts exactly 10 |
| The Graph Ready checklist unlocks at **7 of 7** and a certificate **actually downloaded** | Opened at `0 of 7 met`; the seven labels matched the doc's table verbatim; all seven flipped it to `7 of 7 met` / `SEVEN OF SEVEN · CERTIFICATE UNLOCKED`. Download disabled while the name was empty. **`graph-ready-ayesha-khalid.png` — 185,434 bytes, PNG 1600 × 1200 8-bit RGBA** — downloaded and opened |

**Beyond the gate's list:**
- The walkthrough ran against the **built static export** served by a plain file server, not `npm run dev`, so what was exercised is what ships.
- Per-part quiz and flashcard counts came out **3/2/3/2/3/2/2** and **6/3/6/5/7/–/3**, identical to what Loop 1's gate recorded — which is the point of Task 12 importing `parseQuiz`/`parseFlashcards` instead of writing a second parser.
- `prebuild` was proven rather than assumed: `public/starters/` was deleted outright, and `npm run build` put all 24 payloads back.
- The only browser console error anywhere was a 404 on `/favicon.ico` from the bare file server. Loop 4 Task 18 owns the icon.

**Tasks completed:**
- **Task 10** — `lib/tracks.ts`, `TrackSelector`, `ProgressTracker`, `/tracks/`.
- **Task 11** — `lib/patterns.ts`, `build-starters.mjs`, `PatternBrowser`, `StarterViewer`, both pattern routes; `prebuild` wired; **R3**.
- **Task 12** — `Quiz`, `Flashcards`, 7 + 6 routes, on the CI-guarded parsers.
- **Task 13** — `/projects/` and `/resources/`.
- **Task 14** — `GraphReadyChecklist`, `CertificateGenerator`, `/certification/`, and this gate.

**Carried forward:** R3, D11, D12. One thing Loop 4 must not skip: **`prebuild` still reads `"npm run build:starters"` alone** — Task 15 extends it to `"npm run build:starters && npm run build:search"`, and D3's failure mode (a clean checkout shipping a dead search box, with local builds looking fine) is unchanged.

**Status:** approved 2026-08-08 — merged to `main` as PR #3.

---

## Gate ledger

One row per gate, appended when the gate goes green and the loop stops.

| Loop | Tasks | Gate command | Status | Date | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 — Foundation & pipeline | 1–4 | `npm run verify:1` | approved | 2026-08-07 | 224 files pinned to `af5321e3`; 7/7 quizzes, 6/6 flashcard sets; 2 routes exported. D2, D3, D4 recorded. Approved by the user on 2026-08-07 by instruction to start Loop 2. |
| 2 — Render layer & 86 doc pages | 5–9 | `npm run verify:2` | approved | 2026-08-08 | Branch `loop-2-render`. 86 doc pages, 20 diagrams, 64 code blocks, 17,534 links checked with 0 broken. Repairs R1, R2; decisions D5–D10. Approved by the user on 2026-08-08 by instruction to start Loop 3, the same signal that approved Loop 1. |
| 3 — Interactive surfaces | 10–14 | `npm run verify:3` | approved | 2026-08-08 | Branch `loop-3-interactive`. 131 pages, 18,662 links with 0 broken and `PENDING_ROUTES` empty. 4 tracks, 23 patterns, 24 kits, 7 quizzes, 6 flashcard sets, 8 projects, 10 sources, certificate downloaded. Repair R3; decisions D11, D12. Approved by the user on 2026-08-08 — merged to `main` as PR #3, then instructed to start Loop 4. |
| 4 — Landing, identity, search | 15–18 | `npm run verify:4` | in progress | — | Branch `loop-4-landing`, off `main` (which now carries Loops 1–3). |
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

### R1 — Loop 2 repaired Loop 1: `npm run lint` could not run, 2026-08-08

**Symptom:** `npm run lint` exited non-zero without linting anything, printing `TypeError: Converting circular structure to JSON` from inside `@eslint/eslintrc`'s `config-validator`. First observed during Loop 2 Task 8; `lint` is not in `verify:1` or `verify:2`, which is why Loop 1's gate went green over it. It **is** in `verify:all`, so Loop 5 would have hit it.

**Cause:** Task 1 Step 5's `eslint.config.mjs` loads `eslint-config-next` through `FlatCompat`, the pattern Next 14 and 15 needed. **`eslint-config-next` 16.2.11 ships flat configs directly** — `eslint-config-next/core-web-vitals` and `/typescript` each export a plain array. Handing an already-flat config to eslintrc made it fail schema validation, and the crash came from its *error formatter* choking on the circular plugin object, so the actual complaint was never printed.

**Fix:** `eslint.config.mjs` imports the two flat configs and spreads them, with no `FlatCompat` and no `@eslint/eslintrc` involvement. The default export is assigned to a named const first, satisfying `import/no-anonymous-default-export`.

**Verified by:** `npm run lint` now runs to completion. It immediately found three real problems — two of them repaired here and in R2, one in Loop 2's own `lib/markdown.ts` (`react/no-children-prop`, fixed in `e298676`). Clean afterwards, exit 0.

### R2 — Loop 2 repaired Loop 1: `ThemeToggle` set state in an effect, 2026-08-08

**Symptom:** `react-hooks/set-state-in-effect` error on `components/ui/ThemeToggle.tsx:8`, plus a visible blank placeholder in the toggle on every first paint.

**Cause:** Task 4's toggle used the `mounted` flag pattern — `useEffect(() => setMounted(true), [])` — to avoid rendering a theme-dependent label during SSR. It works, but it costs a cascading render and guarantees a frame where the button shows neither label, which is the same class of problem C15's "no flash of wrong theme on load" exists to prevent.

**Fix:** both labels now live in the DOM and CSS picks between them with the `dark:` variant. next-themes already sets `.dark` on `<html>` from a blocking script before first paint, so the correct label is right on the first frame with no state and no effect. `resolvedTheme` is read only inside `onClick`, which cannot fire before hydration. The accessible name comes from the visible label plus an `sr-only` phrase rather than `aria-label`, so it cannot fall out of step with what is displayed.

**Verified by:** `npm run lint` exit 0; the emitted HTML carries both labels and the `sr-only` phrases, and the toggle is the only `<button>` on a doc page without an `aria-label` — correctly, because it now names itself from its content.

### R3 — Loop 3 repaired Loop 1: the sync dropped every starter kit's Claude Code half, 2026-08-08

**Symptom:** no starter kit in `content/` ships a `.claude/` tree. Only 8 of the 24 kits had any harness files at all, all of them `opencode/`. Found at Task 11 Step 4, where the gate requires "the Claude Code / OpenCode switcher works where a kit ships both" — and *no* kit shipped both, so the switcher could never render. Loop 1's own gate entry records this in passing as "the only differences being the `.claude/` dotfile dirs the script deliberately skips", read at the time as harmless.

**Cause:** Task 2's `scripts/sync-docs.mjs` walked with `if (entry.name.startsWith(".") || entry.name === "node_modules") continue;`. A blanket leading-dot test is the right instinct for `.git` and `.DS_Store`, but the course repo puts each kit's Claude Code half at `starters/<slug>/.claude/skills/…` and `.claude/agents/…`. Confirmed against the pinned commit: `git ls-tree -r af5321e3 -- starters` lists **32 `.claude/` files across all 24 kits**, none of which reached `content/`. `lib/content.ts`'s `listFiles()` carried the same skip, so even a re-sync would have stayed invisible to the site.

**Fix:** the walk now uses an explicit denylist — `.git`, `.gitignore`, `.DS_Store`, `node_modules` — instead of a leading-dot test, and `listFiles()` no longer skips dot entries. Re-synced with `SYNC_PINNED=1` so the content stayed on `af5321e3` rather than drifting to whatever the course repo's `main` holds today.

**Verified by:** `content/` went from 224 to **256** files, the difference being exactly the 32 `.claude/` files. `npm run sync:check` → `sync:check OK — content/ matches af5321e3`, so the byte-for-byte guarantee still holds at the same pin. `npm run build:starters` → `24 kits, 124 files`, and **8 kits now carry both a `.claude/` and an `opencode/` tree** — the 7 patterns whose frontmatter declares `tools: [Claude Code, OpenCode]`, plus `_template`. Those 7 pattern pages render the harness switcher.

**Worth noting:** the four synced trees contain no other dot entries, so this skip was dropping the Claude Code side of the pattern library and nothing else.

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

### D9 — markdown-rewritten links are prefixed with `basePath` at render time, 2026-08-08, Loop 2

**Decision:** `lib/links.ts` keeps returning bare logical routes (`/docs/…`), and `lib/markdown.ts` applies `withBasePath()` to every internal href as it writes it into the tree. The prefix is added at the rendering seam, not in the resolver.

**Because:** the pipeline emits **plain `<a>` elements**, and Next only rewrites hrefs it controls — `next/link`, `next/image`, its own asset URLs. A bare `/docs/…` in course prose would have resolved correctly on a local build, where `PAGES_BASE_PATH` is unset, and 404'd on the project site at `/graph-lab/` (C8). Nothing before Task 8 had ever built with the variable set, so this was invisible. Verified by building with `PAGES_BASE_PATH=/graph-lab`: **zero** bare `/path` hrefs remain in the emitted HTML.

Keeping `links.ts` pure matters for Task 9: `check-links.mjs` reasons about logical routes, and a resolver that already carried a deployment-specific prefix would force the checker to strip it back off.

**Affects:**
- **Loop 3 and Loop 4: any hand-built `href` or `src` string must go through `withBasePath()`.** Anything rendered by `next/link` is already handled. The ones to watch are `fetch("/search-index.json")` in Loop 4 Task 15 and the starter-kit payload fetches in Loop 3 Task 11 — neither is an href Next controls.
- **`withBasePath()` reads `NEXT_PUBLIC_BASE_PATH`, while `next.config.ts` reads `PAGES_BASE_PATH`.** Two variables, deliberately: `PAGES_BASE_PATH` is not readable from client components. The plan's Task 22 workflow sets **both**, and they must stay equal — if only one is set, half the links get a prefix and half do not, and the local build will not show it.

### D10 — `check-links.mjs` carries a `PENDING_ROUTES` list that Loop 3 empties line by line, 2026-08-08, Loop 2

**Decision:** `scripts/check-links.mjs` deviates from the plan's Task 9 listing in three ways.

1. It scans `src="…"` as well as `href="…"`.
2. It holds a `PENDING_ROUTES` map of routes that are linked to but deliberately not built yet, each valued with the task that builds it. A hit is reported as pending rather than broken.
3. **A `PENDING_ROUTES` entry whose route now exists fails the check.** The list can only shrink.

Seven entries are hand-written — `/tracks/`, `/patterns/`, `/projects/`, `/resources/`, `/certification/`, `/quizzes/`, `/flashcards/` — and one more is derived per pattern and starter slug found in `content/`, so `/patterns/<slug>/` is pending only for slugs that really exist. Entries are exact routes, never prefixes: `/patterns/` being pending does not excuse a broken `/patterns/anchor-and-freeze/`.

**Because:** the plan's version cannot go green at the Loop 2 gate and says nothing about it. `NavBar` links five routes from all 90 pages, and real course prose links `/patterns/` and `/resources/` — 925 links to 13 routes that Loop 3 builds. The three ways out are to weaken `lib/links.ts` (D6 explicitly forbids it — a resolver that invents routes is worse than one that fails), to skip the gate, or to name the exemptions with an expiry. Deriving the pattern slugs from `content/` rather than allowlisting the whole `/patterns/` subtree keeps a genuinely broken pattern link broken, and rule 3 is what stops the list becoming permanent: building the route is what deletes the line.

**Affects:**
- **Loop 3 deletes a line in each of Tasks 10–14** — `/tracks/` in 10, `/patterns/` and the per-slug loop in 11, `/quizzes/` and `/flashcards/` in 12, `/projects/` and `/resources/` in 13, `/certification/` in 14. Forgetting to delete one **fails `verify:3`** with a message naming the line. That is the intended behaviour, not a bug to work around.
- **The list must be empty before Loop 5 Task 21** walks the Definition of Done. A non-empty list at that point means a route in the spec's route table was never built.
- **`check-links.mjs` reads `PAGES_BASE_PATH`.** Against a basePath build with the variable unset, every internal link fails at once. The Task 22 workflow must export it for the check step, not only for the build step — the same pairing D9 describes for `NEXT_PUBLIC_BASE_PATH`.

---

## Open questions for the user

Questions a loop hit, recorded rather than guessed at. A loop that adds one here stops (Rule 5).

_None yet._

---

## Known deviations from the spec

The spec is authoritative. Anything this build does differently, and why, goes here so the gap is visible rather than silent.

_None yet._

### D11 — the pattern browser's "tool" filter is real frontmatter, not `core`/`extended`, 2026-08-08, Loop 3

**Decision:** `PatternMeta` gains `tools: string[]`, read from each pattern spec's own YAML frontmatter with `gray-matter`. `getPatternFacets().tools` returns `["Claude Code", "OpenCode"]`, derived from the specs rather than hardcoded. `core` stays on `PatternMeta` and is shown on each card as `core` / `extended`, but it is **not** the tool filter.

**Because:** the plan's Task 11 Step 1 states outright *"There is no `tool` field — the spec's 'tool' filter is `core: true` (core) vs `false` (extended)."* That conclusion was drawn from `registry.yaml`, which indeed has no tool field. But the spec's line 185 says `PatternBrowser` "Filters across category A–G, stage, and tool", and every pattern spec's frontmatter carries `tools: [Claude Code]` or `tools: [Claude Code, OpenCode]` — 16 and 7 of the 23 respectively. Spec beats plan, and a real field beats a proxy: filtering by `core` would have answered a different question than the one the filter is labelled with, and it would have been unfalsifiable, since nothing would look broken. The 7 patterns declaring both tools are exactly the 7 kits that ship both a `.claude/` and an `opencode/` tree, so the frontmatter is accurate.

**Affects:** anything reading `PatternMeta`. `getPatternFacets()` now returns tool *names*, not the `["core", "extended"] as const` tuple the plan listed, so its `tools` field is `string[]` and not a literal union. Loop 4's landing-page pattern grid should use `core` for "the core kit" framing and `tools` only where it means the harness.

### D12 — `/quizzes/` and `/flashcards/` index routes are not built, 2026-08-08, Loop 3

**Decision:** Task 12 deletes the `/quizzes/` and `/flashcards/` lines from `PENDING_ROUTES` without building either route. Only the per-Part routes `/quiz/[part]/` and `/flashcards/[part]/` are built.

**Because:** the spec's route table has no index route for either — it lists `/quiz/[part]/` and `/flashcards/[part]/` and nothing else. The two entries were written into `PENDING_ROUTES` speculatively at Loop 2 Task 9, and the Loop 2 gate output confirms they were never hit: the 925 pending links resolved to 13 other routes, zero to these two. Deleting an entry nothing links to removes a line that could only ever grant a silent exemption. D10's rule 3 is satisfied either way — the routes do not exist, so the entries are not stale, they are simply unnecessary.

**Affects:** the Parts are reachable through `/tracks/`, which links each Part panel to its quiz and flashcard set, and through the doc pages themselves. If Loop 4 or Loop 5 wants a "all quizzes" landing surface it is new work against the spec, not a route this loop skipped.

### D13 — the search index covers body tokens, not just titles and headings, 2026-08-08, Loop 4

**Decision:** `public/search-index.json` carries **two** token maps: `inverted` over titles and headings, and `body` over body prose. `lib/search.ts` scores them in three bands — title 10, heading 4, body 1, each doubled on an exact rather than prefix match. The plan's Task 15 Step 1 says to build the inverted index over *"title and headings only (not body — that is what keeps the file small)"* and to let the 300-character excerpt carry body matching. That instruction is not followed.

**Because:** it cannot satisfy the spec. The Definition of Done requires *"Search returns correct results for a term drawn from a body paragraph, a heading, and a page title"*, and with a ~300-character excerpt a word in paragraph twelve is simply unreachable. Measured on the plan's own design: **`heartbeat` appears in 4 doc pages and returned NO RESULTS**; so did `idempotent`-class terms generally. Average excerpt length came out at 296 characters against pages many thousands of characters long, so this was not an edge case — body search was broken for almost the whole corpus.

The plan's reason for the restriction was file size, and that reason is measurable: the body map costs **121 KB**, taking the whole index from 59.4 KB to **175.7 KB**. The spec's cap is ~400 KB. Nothing is traded away — the constraint the plan was protecting is still satisfied with 224 KB to spare. Body tokens that already appear in a page's title or headings are skipped rather than stored twice.

**Affects:**
- **The fallback ladder now has three stages, not two.** Full → drop excerpts → drop the body map. The spec names dropping excerpts as *the* mitigation, so the body map is shed last: it is the stage that costs a Definition-of-Done line, and `build-search-index.mjs` says so in the message it prints.
- **`SearchIndex.body` is optional** in `lib/search.ts`. A future index built at a fallback stage still loads and still searches; body-paragraph hits just stop appearing.
- **Loop 5 Task 21** should test a body-paragraph term when it walks the DoD, not only a title and a heading. `heartbeat` is a known-good one, and it is the term that exposed this.

### D14 — `sharp` added as a devDependency to rasterise the OG image, 2026-08-08, Loop 4

**Decision:** `sharp` is added to `devDependencies`. It is not in the plan's `package.json`, so C10 requires this entry. It is used by exactly one file, `scripts/generate-og.mjs`, which is a manually-run generator (`npm run build:og`) and is **not** part of `prebuild` — nothing in the normal build, the gate, or CI imports it.

**Because:** Task 18 Step 4 asks for a 1200×630 PNG produced by a committed, deterministic script — "draw it as SVG and rasterise" is one of the two routes the plan names. Nothing already in the tree can turn vector art into a raster: there is no canvas, no rasteriser, and Node has none built in. The realistic alternatives were all worse — hand-rolling a PNG encoder over `zlib` cannot render text; `next/og` needs font binaries committed to the repo because Satori does not read system fonts; and rasterising with the Playwright that happens to be installed on this machine would produce a script no one else could re-run. `sharp` renders the SVG including its text, verified before committing to it.

**Affects:**
- **`public/og-image.png` is committed**, unlike `public/starters/` and `public/search-index.json`, which are gitignored and regenerated by `prebuild`. The PNG is a build artifact of a script that runs rarely, so the artifact is the thing that ships and the script is there to explain and reproduce it.
- **A clean CI checkout never runs `sharp`.** `npm ci` installs it, but no build step invokes it, so the Pages workflow at Task 22 does not depend on it working in that environment.
- **Text rendering is the one non-deterministic part.** The geometry is computed, but glyphs come from the host's fonts, so regenerating on a machine with a different monospace face will shift the text slightly. Recorded rather than solved: committing a font file to fix it costs more than the drift is worth.

### D15 — `app/sitemap.ts` must declare `dynamic = "force-static"`, 2026-08-08, Loop 4

**Decision:** `app/sitemap.ts` exports `export const dynamic = "force-static"`. The plan's Task 18 Step 1 does not mention it.

**Because:** a sitemap is a route handler, and under `output: "export"` Next refuses to build one that has not been told it never needs to run at request time. Observed, as a hard build failure rather than a warning: `Failed to collect page data for /sitemap.xml`, with the real cause one frame up — `export const dynamic = "force-static"/export const revalidate not configured on route "/sitemap.xml" with "output: export"`. The gate went red until the line was added.

**Affects:** any future route handler this project adds — `robots.ts`, a feed, an API-shaped file — needs the same export. It is a property of `output: "export"`, not of the sitemap.
