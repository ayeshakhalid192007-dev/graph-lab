# Loop 1 — Foundation & Content Pipeline

**Tasks:** 1–4 · **Gate:** `npm run verify:1`

---

## Read first

`CLAUDE.md` → `shared/goal.md` → `shared/constraints.md` → `shared/state.md` → this file → `tasks.md` → the plan's Loop 1 section.

Loop 1 has no predecessor, so there is no previous `state.md` to read — but **do read `shared/state.md`**, which carries two decisions (D0, D1) that change what Task 1 does.

---

## Entry condition

`~/graph-engineering-course` exists on disk with a clean working tree and a pushed `main`.

**Check this before Task 2.** The sync pipeline copies from that repo and pins its commit; a dirty tree means the pinned sha does not describe what was copied.

---

## Exit condition

`npm run verify:1` green — a static export builds, `content/` holds 86+ synced files pinned to a commit, and both content checks pass.

---

## Scope

| Task | Builds |
| --- | --- |
| 1 | Repo scaffold — `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.nvmrc`, `.gitignore`, `lib/base-path.ts` |
| 2 | The content sync pipeline — `scripts/sync-docs.mjs`, `content/README.md`, the first real sync |
| 3 | CI checks — `lib/parse-content.ts`, `scripts/check-sync.mjs`, `scripts/check-content-shape.mjs` |
| 4 | Blueprint design tokens and the app shell — `app/globals.css`, theme components, `Section`/`Panel`/`PillButton`, `NavBar`, `app/layout.tsx`, a placeholder `app/page.tsx` |

This loop lays every foundation the other four stand on: the npm scripts they all run, the `content/` tree they all read, the design tokens they all style against, and the shell they all render into.

---

## What this loop must NOT touch

- **Anything in Tasks 5–22.** No doc route, no markdown pipeline, no interactive components, no landing page.
- **`app/page.tsx` beyond a placeholder.** Loop 4 Task 16 replaces it. A placeholder exists only so the export has a root route.
- **The `SearchDialog` slot in `NavBar`.** Loop 4 fills it. Until then that slot renders nothing.
- **`content/` by hand.** Constraint C1 — `sync-docs.mjs` is its only writer. Task 3 Step 5 proves that check works by deliberately hand-editing, watching it go red, and reverting.

---

## Adjustments from `shared/state.md`

Two decisions predate this loop. Read them in full; the short version:

**D0** — There is no root `LOOP-STATE.md`. Task 1 Step 7 is superseded: write task entries to `loops/loop-1-foundation/state.md` and the gate entry to `loops/shared/state.md`. Do not create a root `LOOP-STATE.md`.

**D1** — `~/graph-lab` already exists with git history, an `origin` remote, this scaffold, and `plan/`. **Do not re-run `git init`. Do not delete anything already in the tree.** `.gitignore` exists — extend it if entries are missing rather than overwriting. Run from `~/graph-lab`, not `~/graph-landing`.

---

## Watch for

- **Node >= 24 in three places, kept in step** — `.nvmrc`, `package.json` `engines`, and later `.github/workflows/deploy.yml`. `check-content-shape.mjs` imports a `.ts` directly; on older Node it dies with `ERR_UNKNOWN_FILE_EXTENSION`. Never lower one in isolation.
- **`verify:N` scripts are cumulative on purpose.** Write all of them in Task 1 even though only `verify:1` runs this loop.
- **Tailwind v4 configures through CSS.** There is no `tailwind.config.ts`. Do not create one.
- **`lib/parse-content.ts` has exactly one definition of the quiz and flashcard parsers**, imported both by the CI check and — in Loop 3 — by the rendered page. That is the point: a page can never disagree with the check that guards it.
- **The Blueprint palette shares nothing with `loop-lab`.** Structure is borrowed; visuals are not.

---

## The command

Run from `~/graph-lab`:

```
/loop Read ~/graph-lab/CLAUDE.md, ~/graph-lab/loops/shared/goal.md, ~/graph-lab/loops/shared/constraints.md, ~/graph-lab/loops/shared/state.md, and ~/graph-lab/loops/loop-1-foundation/loop.md. Execute Loop 1 only (Tasks 1-4) from ~/graph-lab/plan/2026-08-07-graph-lab-implementation-plan.md using superpowers:subagent-driven-development. Do the next unchecked step, run its verification command and read the output, tick the checkbox in both the plan and loops/loop-1-foundation/tasks.md, append an entry to loops/loop-1-foundation/state.md, and commit. Note decisions D0 and D1 in shared/state.md — there is no root LOOP-STATE.md, and the repo already exists with git history, so do not re-init or delete anything. When all Task 1-4 checkboxes are ticked and `npm run verify:1` is green, append the gate entry to loops/shared/state.md, STOP this loop permanently, and report the gate output. Do not start Loop 2.
```
