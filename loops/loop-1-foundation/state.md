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

### Task 2 — The content sync pipeline

**Date:** 2026-08-07
**Landed:** `content/` now holds the course's `docs/`, `patterns/`, `starters/`, and `resources/` trees, copied byte for byte and pinned to a commit. `scripts/sync-docs.mjs` is the only writer.
**Files:** created `scripts/sync-docs.mjs`, `content/README.md`; generated `content/docs/`, `content/patterns/`, `content/starters/`, `content/resources/`, `content/SOURCE.json`.
**Produces:** `content/SOURCE.json` with keys `repo`, `commit`, `syncedAt`, `files` — currently `{ repo: "ayeshakhalid192007-dev/graph-engineering-crash-course", commit: "af5321e3c7684d7886b6b59f3af433073d64d3b0", files: 224 }`. Every Loop 2 `lib/` module reads from these four paths.
**Verified by:** `npm run sync:latest` — "Synced 224 files from /home/ayesha-khalid/graph-engineering-course @ af5321e3". `diff -r` per tree: `docs identical`, `patterns identical`, `resources identical`; `starters` reported 24 `Only in …: .claude` lines, and `diff -r -x '.*'` then printed clean — the difference is entirely the dotfile directories `walk()` deliberately skips, not a copy defect. Counts: `find content/docs -name '*.md'` = **86**, `ls content/patterns/*.md` = **25**, `ls -d content/starters/*/` = **24**. `content/SOURCE.json` `commit` equals `git -C ../graph-engineering-course rev-parse HEAD` = `af5321e3c7684d7886b6b59f3af433073d64d3b0`, which also equals `origin/main`.
**Next loop needs to know:**
- **The 24 "starter kits" include `_template`.** The directories are `_template` plus 23 real kits — matching the 23 pattern specs one-to-one. The plan's Step 4 check (`ls -d content/starters/*/ | wc -l` → 24) passes because it counts `_template`, and the spec's headline figure of 24 kits appears to come from the same count. **Loop 3 Task 11 has to decide whether the browser shows 24 entries or 23 real kits plus a hidden template** — do not assume the count is a bug either way.
- **Each starter kit's `.claude/` directory was not copied.** `walk()` skips dotfiles by design, so `_template/.claude/agents/graph-verifier.md`, `.claude/skills/example-skill/SKILL.md`, and the equivalents in all 23 kits are absent from `content/`. Loop 3's starter viewer therefore cannot show them. Deliberate, per the script the plan specifies.
- The course repo was moved from `spec/course-website` to `main` before this sync, on the user's instruction, so the pinned sha is one that exists on `origin`. `spec/course-website` still exists locally, unpushed, holding one extra commit that touches only `specs/`.

### Task 3 — Sync and content-shape CI checks

**Date:** 2026-08-07
**Landed:** The two content gates. `sync:check` proves `content/` is reproducible from the pinned commit; `check:content-shape` proves the 7 quizzes and 6 flashcard sets still parse. The quiz and flashcard parsers have exactly one definition, imported by the CI check today and by Loop 3's pages later.
**Files:** created `lib/parse-content.ts`, `scripts/check-sync.mjs`, `scripts/check-content-shape.mjs`.
**Produces:** from `lib/parse-content.ts` — `parseQuiz(body: string): QuizQuestion[]` and `parseFlashcards(body: string): Flashcard[]`, with `QuizQuestion = { n: number; title: string; question: string; answer: string }` and `Flashcard = { term: string; definition: string }`. Signatures are exactly as the plan specifies; **Loop 3 Task 12 can import them as written.**
**Verified by:**
- `npm run sync:check` — `sync:check OK — content/ matches af5321e3`, exit 0.
- `npm run check:content-shape` — `check:content-shape OK — 7 quizzes, 6 flashcard sets parse as expected`, exit 0. Parsed against the expected per-part counts: quizzes 3/2/3/2/3/2/2, flashcards 6/3/6/5/7/3 with Part 6 absent by design.
- Step 5, first attempt: appended a line to `content/docs/README.md`, ran `sync:check`, got `sync:check OK — content/ matches af5321e3`, **exit 0 — the check failed to fail.** Cause and fix in D2 (`shared/state.md`).
- Step 5, after the fix: edit to `content/docs/README.md` → `Files …/content/docs/README.md and /tmp/graph-lab-sync-rv6XEo/docs/README.md differ`, exit 1. Edit to `content/starters/audit-loop/README.md` → likewise differ, exit 1. Both reverted, `sync:check` green again, `git status content/` clean.
**Next loop needs to know:**
- **`sync:check` is stricter than the plan's text.** See D2. It now compares all 224 files including every nested `README.md`. Nothing to change on your side; just do not be surprised when touching `content/` turns it red, and do not "fix" the missing `--exclude` flags back in.
- **`check:content-shape` prints a Node warning before its OK line:** `[MODULE_TYPELESS_PACKAGE_JSON] … lib/parse-content.ts is not specified and it doesn't parse as CommonJS. Reparsing as ES module`. Cosmetic — it is the cost of importing a `.ts` from a `.mjs` without `"type": "module"` in `package.json`. Adding that key is not in the plan and was not done. Exit code is 0.

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
