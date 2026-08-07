# Loop 1 state — Foundation & Content Pipeline

**Tasks:** 1–4 · **Gate:** `npm run verify:1` · **Status:** not started

Per-task log for this loop. Cross-loop material — gate entries, repairs to earlier loops, decisions binding later loops — goes in `../shared/state.md` instead.

---

## Task log

One entry per completed task, appended as it lands. Template from `../shared/handoff.md`:

```markdown
### Task <n> — <title>

**Date:** YYYY-MM-DD
**Landed:** what now exists that did not before.
**Files:** created / modified, as paths.
**Produces:** exported symbols and types later tasks import by name.
**Verified by:** the command run, and what it actually printed — a count, a
score, a page total. Not "green".
**Next loop needs to know:** anything non-obvious. Delete if nothing.
```

### Task 1 — Scaffold the `graph-lab` repo

**Date:** 2026-08-07
**Landed:** The Next 16 static-export scaffold. `npm install` now resolves 610 packages; `tsc --noEmit` runs clean over `lib/base-path.ts`. Every `verify:N` script exists in `package.json` from the start, cumulative as the plan specifies, even though only `verify:1` runs this loop.
**Files:** created `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `.nvmrc`, `lib/base-path.ts`. `.gitignore` already existed with exactly the five entries the plan asks for — left untouched, not overwritten (D1).
**Produces:** npm scripts `sync:latest`, `sync:check`, `check:content-shape`, `check:links`, `build:starters`, `build:search`, `build`, `typecheck`, `lint`, `verify:1`–`verify:4`, `verify:all`. From `lib/base-path.ts`: `basePath: string` and `withBasePath(path: string): string`.
**Verified by:** `npm install` — "added 610 packages, and audited 611 packages in 10m". `npx tsc --noEmit` — no output, `exit=0`. `node -e "import('@eslint/eslintrc')"` — resolves, `FlatCompat` is a function (it is a transitive dep of eslint, not a direct one; `eslint.config.mjs` imports it and the plan's `devDependencies` do not list it).
**Next loop needs to know:**
- **`prebuild` is a landmine for this loop's gate.** `package.json` has `"prebuild": "node scripts/build-starters.mjs && node scripts/build-search-index.mjs"`, and those two scripts are not created until Loop 3 Task 11 and Loop 4 Task 15. npm runs `prebuild` before every `build`, so `npm run build` — and therefore `verify:1` — cannot pass until this is resolved. Written as the plan specifies rather than pre-emptively patched; handled at Task 4 Step 7 where the gate first runs it.
- **3 high-severity advisories from `npm audit`**, all transitive under the pinned `next@16.2.11`: `postcss <=8.5.22` (4 advisories) and `sharp <0.35.0` (libvips CVEs). `npm audit fix --force` wants `next@16.3.0`, which would break the C10 version pin. Not applied. Both are build-time-only for this site — the export is static, and `images.unoptimized` means `sharp` is never invoked. Flagged for the user rather than silently resolved either way.
- Three untracked stray files sit at the repo root — `2026-08-06-course-website-design.md` and `2026-08-07-graph-lab-implementation-plan.md` (byte-identical duplicates of the canonical copies in `plan/`), and `day-4-plan.md` (a plan from the *course* repo, unrelated to graph-lab). Left untracked and uncommitted; the plan's `git add -A` steps would sweep them in, so commits in this loop name their files explicitly.

---

## Blockers

A blocker stops this loop. Record it here, then stop and report — do not invent an answer and do not work around it silently. Blocked ≠ done.

```markdown
### B<n> — <short title>, <date>

**Blocked at:** Task <n>, Step <n>.
**What is needed:** the specific input, decision, or clarification.
**What was tried:** so the user does not repeat it.
**Cannot proceed because:** why guessing would be wrong.
```

_None._

---

## Notes

Working observations that are not yet handoff material — counts seen, oddities noticed, things to confirm. Anything here that turns out to matter to a later loop gets promoted into a task entry's *Next loop needs to know*, or into `../shared/state.md`.

**Pre-loop baseline, 2026-08-07:** repo directory, git history, `origin` remote, `CLAUDE.md`, `loops/`, and `plan/` all exist before Task 1 begins. See D1 in `../shared/state.md` — Task 1 Step 1 must not re-init git or delete existing files.
