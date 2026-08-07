# CLAUDE.md — `graph-lab`

**Read this file at the start of every session, before any other action.** Everything below is binding.

---

## 1. What this repo is

`graph-lab` is a fully static Next.js site that renders the Graph Engineering course — 86 doc pages, a 17-step roadmap, four skill tracks, 23 patterns with 24 starter kits, 7 quizzes, 6 flashcard sets, 8 projects, 10 attributed sources, site search, and the Graph Ready certification flow.

The full goal statement lives in `loops/shared/goal.md`. **Read it before starting work.** It is the single definition of what "done" means; no loop invents its own.

| Document | Role |
| --- | --- |
| `plan/2026-08-06-course-website-design.md` | **The spec. Authoritative.** Where the plan and the spec disagree, the spec wins and the plan is wrong. |
| `plan/2026-08-07-graph-lab-implementation-plan.md` | The task-by-task implementation plan (Tasks 1–22). |
| `loops/shared/goal.md` | The one goal every loop reads. |
| `loops/shared/constraints.md` | Global constraints that apply to every task. |
| `loops/shared/loop.md` | The protocol every loop obeys. |
| `loops/shared/verification.md` | Gate commands and the verification discipline. |
| `loops/shared/handoff.md` | The loop-to-loop handoff contract. |
| `loops/shared/state.md` | Cross-loop state: gate ledger, cross-loop repairs, decisions. |
| `loops/loop-N-*/` | One folder per loop: `loop.md`, `tasks.md`, `gate.md`, `state.md`. |

---

## 2. Session start checklist

Do these four things before touching any file:

1. Read this file.
2. Read `loops/shared/goal.md` and `loops/shared/constraints.md`.
3. Read `loops/shared/state.md` to learn which gates have cleared.
4. Read the `loop.md`, `tasks.md`, and `state.md` of the loop you were asked to run. **If no loop was named, ask which loop — do not guess.**

---

## 3. Non-negotiable rules

These are the Global Constraints from the spec and plan. Every task inherits them.

### Content

- **`content/` is generated, never hand-edited.** `scripts/sync-docs.mjs` is its only writer. A task needing different content changes the course repo and re-syncs.
- **No course content is authored here.** The single exception is the landing page's own hero and section copy, which is site chrome — and it must be worded independently of both `graph-engineering-course/README.md` and `docs/README.md`. A third fresh phrasing, not a paraphrase of either.
- **MDX is not used.** Course markdown stays plain and GitHub-readable. All component substitution is pattern-matching on ordinary markdown inside `lib/markdown.ts`.

### Scope

- **`CodeTabs`, `Callout`, and `CheckYourself` are deliberately NOT built.** Zero content exercises them. Their degraded fallbacks are correct output, not bugs.
- **`TwoGraphsSplit`, `LifecycleDiagram`, `SubgraphViewer` are landing-page components only.** Embedding them in doc pages would need a marker convention inside `docs/`, which is a course-content change and out of scope.

### Platform

- **Node >= 24.** `scripts/check-content-shape.mjs` imports `lib/parse-content.ts` directly so the quiz and flashcard parsers have exactly one definition; only Node >= 23.6 strips types from an imported `.ts` without a flag. Keep `.nvmrc`, `package.json` `engines`, and `.github/workflows/deploy.yml` in step — **never lower one in isolation.**
- **`basePath` comes from `PAGES_BASE_PATH`** — unset locally so the dev server serves from root, `/graph-lab` in CI.

### Design

- **Blueprint palette only.** Warm paper white / ink blue / graphite in light; deep slate / cyan in dark. No shadows, no gradients, no glow. Hairline rules instead of card borders. Nothing is copied from `loop-lab`'s palette or type scale — structure is borrowed, visuals are not.
- **All motion is suppressed under `prefers-reduced-motion: reduce`.**
- **Every interactive element gets a visible focus state and an accessible name.**

### Process

- **Verification before checkbox.** A checkbox is ticked only after its command was run and its output read. A red command means the task is not done.
- **Commit after every task.** Conventional-commit style.
- **Creating the remote repo, pushing site code, and enabling Pages require explicit user confirmation** at Loop 5 Task 22.

---

## 4. The loop system

Five separate, independent `/loop` instances — **one per loop, not one loop reused across loops and not one combined loop spanning the whole build.**

| Loop | Scope | Tasks | Gate |
| --- | --- | --- | --- |
| 1 — Foundation & pipeline | Repo scaffold, sync pipeline, CI checks, Blueprint tokens, app shell | 1–4 | `npm run verify:1` |
| 2 — Render layer & 86 doc pages | content libs, link rewriting, markdown pipeline, doc route, link check | 5–9 | `npm run verify:2` |
| 3 — Interactive surfaces | tracks, patterns, starters, quizzes, flashcards, projects, resources, certification | 10–14 | `npm run verify:3` |
| 4 — Landing, identity, search | search index + dialog, landing page, animated diagrams, sitemap/llms.txt/404/OG | 15–18 | `npm run verify:4` |
| 5 — Polish, verify, deploy | responsive, a11y, dual-theme, full DoD, deploy | 19–22 | `npm run verify:all` |

Rules that apply to every loop — the long form is in `loops/shared/loop.md`:

1. **A loop only ever touches its own tasks.** A defect found in an earlier loop's output is fixed and recorded under "Cross-loop repairs" in `loops/shared/state.md` — it does not license starting a later loop's work.
2. **A loop stops permanently at its gate.** No loop hands off automatically. The user reviews, then starts the next loop by hand.
3. **State files are the handoff.** Every task appends one entry to its own `loops/loop-N-*/state.md`; every gate appends one entry to `loops/shared/state.md`.
4. **Verification before checkbox.**
5. **A blocked loop stops and reports** rather than inventing an answer. Blocked ≠ done.

---

## 5. Where things get written

| You did this | Write it here |
| --- | --- |
| Finished a task | Tick its boxes in `loops/loop-N-*/tasks.md`; append an entry to `loops/loop-N-*/state.md` |
| Passed a gate | Append to `loops/shared/state.md` → Gate ledger |
| Fixed an earlier loop's defect | `loops/shared/state.md` → Cross-loop repairs |
| Made a decision that binds later loops | `loops/shared/state.md` → Decisions |
| Got blocked | `loops/loop-N-*/state.md` → Blockers, then stop and report |

The plan's own checkboxes in `plan/2026-08-07-graph-lab-implementation-plan.md` are also ticked as steps complete. `tasks.md` per loop mirrors them at task granularity.

---

## 6. Conventions

- **Package manager:** npm. Not pnpm, not yarn, not bun.
- **Commits:** conventional-commit style — `feat:`, `fix:`, `chore:`, `docs:`. Each task's final step names its message.
- **Branch:** `main`.
- **Tech stack, pinned:** Next.js 16.2.11 (App Router, `output: "export"`), React 19.2.4, TypeScript 5, Tailwind CSS v4 (CSS-configured, no `tailwind.config.ts`), unified/remark/rehype, Shiki, mermaid 11, next-themes.
- **Never** add a dependency not listed in the plan's `package.json` without recording the reason in `loops/shared/state.md` → Decisions.

---

## 7. When in doubt

- The spec beats the plan. The plan beats your judgment. Your judgment beats silence — if all three are unclear, **stop and ask.**
- Do not mark work complete without running the verification and reading its output.
- Do not create remote repositories, push, or enable Pages without explicit confirmation for that specific action.
