# Loop 1 tasks

Tasks 1–4. Full detail — code, config, exact file contents — is in `plan/2026-08-07-graph-lab-implementation-plan.md` under each task's heading. This file tracks task-level progress and carries what a loop needs at a glance.

**Tick a box only after its command was run and its output read.** Red means not done.

---

## Task 1 — Scaffold the `graph-lab` repo

*Plan: `## Task 1` · 9 steps*

**Creates:** `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.nvmrc`, `.gitignore`, `lib/base-path.ts`

**Produces:** the npm scripts every later task runs (`sync:latest`, `sync:check`, `check:content-shape`, `build`, `verify:1`…`verify:all`); `withBasePath(path: string): string` from `lib/base-path.ts`, imported by every component that emits a bare `href`/`src`.

**Consumes:** nothing.

- [ ] 1.1 Create the repo and pin Node — **see D1: repo and git already exist, do not re-init or delete**
- [ ] 1.2 Write `package.json` — all `verify:N` scripts now, cumulative on purpose
- [ ] 1.3 Write `next.config.ts` — `output: "export"`, `images.unoptimized`, `trailingSlash: true`, basePath from `PAGES_BASE_PATH`
- [ ] 1.4 Write `tsconfig.json`
- [ ] 1.5 Write `postcss.config.mjs` and `eslint.config.mjs`
- [ ] 1.6 Write `lib/base-path.ts`
- [ ] 1.7 ~~Write `LOOP-STATE.md`~~ — **superseded by D0.** Write to `loops/loop-1-foundation/state.md` instead; do not create a root `LOOP-STATE.md`
- [ ] 1.8 Install and verify the scaffold builds
- [ ] 1.9 Commit

**Task done when:** `npm install` succeeds and a bare `next build` emits a static export.

---

## Task 2 — The content sync pipeline

*Plan: `## Task 2` · 5 steps*

**Creates:** `scripts/sync-docs.mjs`, `content/README.md`, and the synced `content/` tree.

**Produces:** `content/docs/`, `content/patterns/`, `content/starters/`, `content/resources/` as **byte-identical** copies, plus `content/SOURCE.json` with keys `repo`, `commit`, `syncedAt`, `files`. Every `lib/` module in Loop 2 reads from these paths.

**Consumes:** `~/graph-engineering-course` at a clean, pushed `main`.

- [ ] 2.1 Write `scripts/sync-docs.mjs` — the only writer of `content/`; no added banners, no added frontmatter
- [ ] 2.2 Write `content/README.md` — states the directory is generated, names the script, says where to make the fix instead
- [ ] 2.3 Run the first sync
- [ ] 2.4 Verify the copy is byte-identical and complete
- [ ] 2.5 Commit

**Task done when:** four trees are copied byte-for-byte, `SOURCE.json` pins a real commit sha, and the file count matches the source.

---

## Task 3 — Sync and content-shape CI checks

*Plan: `## Task 3` · 6 steps*

**Creates:** `lib/parse-content.ts`, `scripts/check-sync.mjs`, `scripts/check-content-shape.mjs`

**Produces:** `parseQuiz(body: string): QuizQuestion[]` and `parseFlashcards(body: string): Flashcard[]`, where `QuizQuestion = { n: number; title: string; question: string; answer: string }` and `Flashcard = { term: string; definition: string }`. **Loop 3 Task 12 imports these exact functions** — the CI check and the rendered page share one parser, so a page can never disagree with the check that guards it.

- [ ] 3.1 Write `lib/parse-content.ts`
- [ ] 3.2 Write `scripts/check-sync.mjs` — re-syncs the pinned commit into a temp dir and diffs
- [ ] 3.3 Write `scripts/check-content-shape.mjs` — imports `lib/parse-content.ts` directly (**needs Node >= 23.6**)
- [ ] 3.4 Run both checks
- [ ] 3.5 **Prove `sync:check` actually catches a hand-edit** — edit a synced file, watch it go red, revert, watch it go green
- [ ] 3.6 Commit

**Task done when:** both checks pass on clean content, and `sync:check` has been *observed* failing on a hand-edit. Expected shapes: 7 quizzes with heading counts equal to `<details>` counts (3, 2, 3, 2, 3, 2, 2); 6 flashcard sets with bold term cells (6, 3, 6, 5, 7, 3 rows).

---

## Task 4 — Blueprint design tokens and the app shell

*Plan: `## Task 4` · 8 steps*

**Creates:** `app/globals.css`, `components/ui/ThemeProvider.tsx`, `ThemeToggle.tsx`, `Section.tsx`, `Panel.tsx`, `PillButton.tsx`, `NavBar.tsx`, `app/layout.tsx`, placeholder `app/page.tsx`

**Produces:** the Blueprint token set and the shell every page in Loops 2–4 renders into.

- [ ] 4.1 Write `app/globals.css` — Blueprint tokens + Tailwind v4 (**CSS-configured; no `tailwind.config.ts`**)
- [ ] 4.2 Write `ThemeProvider.tsx` and `ThemeToggle.tsx`
- [ ] 4.3 Write `Section.tsx`, `Panel.tsx`, `PillButton.tsx`
- [ ] 4.4 Write `NavBar.tsx` — leave the `SearchDialog` slot rendering nothing; **Loop 4 fills it**
- [ ] 4.5 Write `app/layout.tsx` — nav, footer, theme, dot-grid
- [ ] 4.6 Write a placeholder `app/page.tsx` — **Loop 4 Task 16 replaces it**
- [ ] 4.7 **Run the Loop 1 gate** — `npm run verify:1`
- [ ] 4.8 Commit and record loop state

**Task done when:** `npm run verify:1` is green and the shell renders in both themes.

---

## Gate

- [ ] `npm run verify:1` green
- [ ] All Task 1–4 boxes above ticked
- [ ] Four entries in `state.md`, one per task
- [ ] Gate entry appended to `shared/state.md`, row set to `gate green, awaiting review`
- [ ] **Stopped.** Loop 2 not started.

See `gate.md`.
