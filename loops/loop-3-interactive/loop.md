# Loop 3 — Interactive Course Surfaces

**Tasks:** 10–14 · **Gate:** `npm run verify:3`

---

## Read first

`CLAUDE.md` → `shared/goal.md` → `shared/constraints.md` → `shared/state.md` → this file → `tasks.md` → `../loop-2-render/state.md` → the plan's Loop 3 section.

---

## Entry condition

**Loop 2 gate approved.** Check the Gate ledger in `shared/state.md`: the Loop 2 row must read `approved`. If it does not, stop and say so.

---

## Exit condition

`npm run verify:3` green, and every route in the spec's route table **except** `/`, sitemap, and `llms.txt` (Loop 4) renders and works.

---

## Scope

| Task | Builds |
| --- | --- |
| 10 | `lib/tracks.ts`, `ProgressTracker`, `TrackSelector`, `app/tracks/page.tsx` — G1–G4 and the 17-step roadmap |
| 11 | `lib/patterns.ts`, `scripts/build-starters.mjs`, `PatternBrowser`, `StarterViewer`, both pattern routes |
| 12 | `Quiz`, `Flashcards`, and their routes — 7 quizzes, 6 flashcard sets |
| 13 | `app/projects/page.tsx`, `app/resources/page.tsx` — 8 projects, 10 sources |
| 14 | `GraphReadyChecklist`, `CertificateGenerator`, `app/certification/page.tsx` |

Every component in this loop is a **client component**, and **all persistence is `localStorage`** — constraint C6. No backend, no accounts.

---

## What this loop must NOT touch

- **Anything in Tasks 15–22.** No search, no landing page, no animated diagrams, no sitemap, no deploy.
- **`app/page.tsx`** — still Loop 1's placeholder. Loop 4 Task 16 replaces it.
- **The `SearchDialog` slot in `NavBar`** — Loop 4 fills it.
- **`content/`** — constraint C1.
- **The quiz and flashcard parsers.** They already exist as `parseQuiz` and `parseFlashcards` in `lib/parse-content.ts` from Loop 1 Task 3. **Import them; do not write a second parser.** That is the whole point: the CI check and the rendered page share one definition, so a page can never disagree with the check that guards it.

---

## Watch for

- **Part 6 has no flashcards file.** 7 quizzes, 6 flashcard sets — quiz-only by design, per the master plan. A missing Part 6 flashcard set is **not** a bug to fix.
- **`lib/tracks.ts` is structural site data, not course content.** The four G1–G4 track definitions are site data because the tracks table is not itself a rendered doc page. This does not license writing course prose anywhere else — constraint C2 still holds.
- **Verify track routes are real before shipping them.** Task 10 Step 5 checks that each track's `firstStepRoute` points at a page that actually exists.
- **Starter kit volume.** 24 kits with many files each inflate the static export. `StarterViewer` loads file contents from generated JSON on demand (`scripts/build-starters.mjs` → `public/starters/<slug>.json`) rather than inlining every file into the page.
- **Assert the counts.** 23 patterns, 24 starter kits, 7 quizzes, 6 flashcard sets, 8 projects, 10 sources, 4 tracks, 17 roadmap steps.
- **Every interactive element needs a visible focus state and an accessible name** — constraint C14. This loop builds most of the interactive surface; getting it right here saves Loop 5 Task 19 from a long list.
- **All motion suppressed under `prefers-reduced-motion: reduce`** — constraint C13. The flashcard flip counts.

---

## The command

Run from `~/graph-lab`:

```
/loop Read ~/graph-lab/CLAUDE.md, ~/graph-lab/loops/shared/goal.md, ~/graph-lab/loops/shared/constraints.md, ~/graph-lab/loops/shared/state.md, ~/graph-lab/loops/loop-3-interactive/loop.md, and ~/graph-lab/loops/loop-2-render/state.md. Confirm the Loop 2 row in the Gate ledger reads approved before starting. Execute Loop 3 only (Tasks 10-14) from ~/graph-lab/plan/2026-08-07-graph-lab-implementation-plan.md using superpowers:subagent-driven-development. Import parseQuiz and parseFlashcards from lib/parse-content.ts — do not write a second parser. Do the next unchecked step, run its verification command and read the output, tick the checkbox in both the plan and loops/loop-3-interactive/tasks.md, append an entry to loops/loop-3-interactive/state.md, and commit. When all Task 10-14 checkboxes are ticked and `npm run verify:3` is green, append the gate entry to loops/shared/state.md, STOP this loop permanently, and report the gate output plus the downloaded certificate. Do not start Loop 4.
```
