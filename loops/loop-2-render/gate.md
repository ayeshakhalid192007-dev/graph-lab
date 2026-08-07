# Loop 2 gate

```
npm run verify:2
```

Expands to: `verify:1` (`sync:check` → `check:content-shape` → `typecheck` → `build`) → `check:links`

Cumulative on purpose — Loop 2 cannot silently break Loop 1's content checks.

---

## Exit condition

`npm run verify:2` green, and every route in the spec's route table **except** `/`, sitemap, and `llms.txt` (which are Loop 4) renders and works.

---

## What green must actually mean

Read the output. Record the number, not the word:

- [ ] `next build` emitted **86 doc pages** at `/docs/[...slug]/`, plus the `/docs/` index
- [ ] `check:links` reported **0 unresolved internal links**
- [ ] `sync:check` still diffs **0 files** — Loop 2 did not touch `content/`
- [ ] `check:content-shape` still parses **7/7 quizzes** and **6/6 flashcard sets**
- [ ] `tsc --noEmit` clean
- [ ] **20 mermaid fences** found across **20 files**, each rendering as `GraphDiagram`
- [ ] Every other fence syntax-highlighted by Shiki — **41 markdown**, **23 json/yaml/text/jsonl**
- [ ] Three pages spot-checked **by eye** (Task 9.3), not just by exit code

---

## Goal lines this loop moves

From `shared/goal.md`. Not ticked here — Loop 5 Task 21 ticks them against the running site — but this loop is what makes them true:

- *Every one of the 86 doc pages renders, reachable from the sidebar, with working prev/next.*
- *All 20 mermaid diagrams render as SVG in both themes; every fenced code block is syntax highlighted; every internal link resolves.*
- *`check-links` passes* — the last DoD line gains its third check.

---

## Before stopping

- [ ] Every Task 5–9 checkbox in `tasks.md` ticked
- [ ] Corresponding step checkboxes ticked in the plan
- [ ] Five task entries in `state.md`, each with real verification output
- [ ] **The shipped signatures from Tasks 5, 6, and 7 recorded** — Loops 3 and 4 import them by name
- [ ] Gate entry appended to `shared/state.md`
- [ ] Loop 2 row set to `gate green, awaiting review`
- [ ] Any repairs, decisions, or blockers recorded
- [ ] Committed

---

## Report

1. The gate command and **its actual output**.
2. Tasks 5–9, one line each.
3. The interface signatures Loops 3 and 4 will import.
4. Anything under *Blockers*, *Cross-loop repairs*, *Decisions*, or *Known deviations*.
5. The Loop 3 command, from `loops/loop-3-interactive/loop.md`.

Then **stop.** Do not start Loop 3.
