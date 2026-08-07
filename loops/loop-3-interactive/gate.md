# Loop 3 gate

```
npm run verify:3
```

Expands to: `verify:2` → which is `verify:1` (`sync:check` → `check:content-shape` → `typecheck` → `build`) → `check:links`

Cumulative on purpose — Loop 3 cannot silently break Loop 2's link check.

---

## Exit condition

`npm run verify:3` green, and every route in the spec's route table **except** `/`, sitemap, and `llms.txt` renders and works.

---

## What green must actually mean

`verify:3` is `verify:2` — it does **not** by itself prove the interactive surfaces work. The counts below are what actually gates this loop. Record the number, not the word:

- [ ] `check:links` reported **0 unresolved internal links**
- [ ] `sync:check` still diffs **0 files**
- [ ] `tsc --noEmit` clean
- [ ] **4 tracks** render; every `firstStepRoute` points at a page that exists
- [ ] **17 roadmap steps** render, and `ProgressTracker` records against them
- [ ] **23 patterns** browse; filters work across category A–G, stage, and tool
- [ ] **24 starter kits** have viewable files; the Claude Code / OpenCode switcher works where a kit ships both
- [ ] **7 quizzes** playable — reveal-answer and running tally both work
- [ ] **6 flashcard sets** playable, with shuffle. **Part 6 has none, by design**
- [ ] **8 projects** render, each linking into `/docs/projects/…`
- [ ] **10 sources** render, plus the anti-patterns summary
- [ ] The Graph Ready checklist unlocks at **7 of 7** and a certificate **actually downloaded** — name the file

---

## Goal lines this loop moves

From `shared/goal.md`. Not ticked here — Loop 5 Task 21 ticks them against the running site:

- *All seven quizzes and six flashcard sets are playable.*
- *The pattern browser filters correctly and every starter kit's files are viewable.*
- *The Graph Ready checklist unlocks and downloads a certificate.*

---

## Before stopping

- [ ] Every Task 10–14 checkbox in `tasks.md` ticked
- [ ] Corresponding step checkboxes ticked in the plan
- [ ] Five task entries in `state.md`, each with real verification output
- [ ] **`ProgressTracker`'s shipped props recorded** — Loop 4 reuses it on the landing page
- [ ] Gate entry appended to `shared/state.md`
- [ ] Loop 3 row set to `gate green, awaiting review`
- [ ] Any repairs, decisions, or blockers recorded
- [ ] Committed

---

## Report

1. The gate command and **its actual output**.
2. **The downloaded certificate** — the plan asks for this specifically.
3. Tasks 10–14, one line each.
4. Every count from the list above.
5. Anything under *Blockers*, *Cross-loop repairs*, *Decisions*, or *Known deviations*.
6. The Loop 4 command, from `loops/loop-4-landing/loop.md`.

Then **stop.** Do not start Loop 4.
