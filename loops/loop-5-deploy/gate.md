# Loop 5 gate

```
npm run verify:all
```

Expands to: `sync:check` → `check:content-shape` → `typecheck` → `lint` → `build` → `check:links`

The only gate that runs `lint`. Everything the four earlier gates checked, plus ESLint.

---

## Exit condition — two parts

**1. Tasks 19–21 complete and `npm run verify:all` green.** This is the loop's real gate, reachable without any confirmation.

**2. Task 22 is BLOCKED** pending explicit user confirmation of the deploy. Constraint C18. The remote already holding this scaffold does **not** pre-authorise it — see D1 in `../shared/state.md`.

Report the first as done and the second as awaiting an answer. **Blocked ≠ done.**

---

## What green must actually mean

`verify:all` proves the pipeline. It does **not** prove the manual passes. Both lists gate this loop.

### Scripted

- [ ] `sync:check` diffs **0 files** against the pinned commit
- [ ] `check:content-shape` parses **7/7 quizzes**, **6/6 flashcard sets**
- [ ] `tsc --noEmit` clean
- [ ] `eslint` clean
- [ ] `next build` emits the full static export — record the route count
- [ ] `check:links` reports **0 unresolved internal links**

### Observed

- [ ] Every page type checked at **375, 768, 1280** — sidebar collapses below 768
- [ ] Keyboard-only pass clean — visible focus state and accessible name on every interactive element
- [ ] **Three Lighthouse accessibility scores recorded** — landing, one doc page, `/certification/` — **no critical issues outstanding**
- [ ] Every page type seen in **both themes**
- [ ] **All 20 mermaid diagrams legible in dark mode**
- [ ] Shiki dual-theme **actually switches**
- [ ] **No flash of wrong theme** on hard refresh, both themes

---

## The Definition of Done

**This is the only place the DoD gets ticked.** All ten bullets in `../shared/goal.md`, walked line by line against the running site (Task 21 Step 2).

For each: record **what was checked and what was observed** — the actual count, the actual behaviour. Not "done".

**Any bullet that cannot be confirmed is a defect to fix now, not a note to file.**

---

## Before stopping

- [ ] Task 19, 20, 21 checkboxes in `tasks.md` ticked
- [ ] Corresponding step checkboxes ticked in the plan
- [ ] Four task entries in `state.md`
- [ ] Three Lighthouse scores recorded
- [ ] All ten DoD bullets ticked in `../shared/goal.md`, each with evidence
- [ ] Every defect found in an earlier loop's output **fixed** and recorded under *Cross-loop repairs* in `shared/state.md`
- [ ] Gate entry appended to `shared/state.md`
- [ ] Loop 5 row set to `gate green, awaiting review`
- [ ] Committed

---

## Report

1. `npm run verify:all` and **its actual output**.
2. The ten DoD bullets, each with what was observed.
3. Three Lighthouse scores.
4. Tasks 19–21, one line each.
5. Every cross-loop repair made.
6. **Task 22 blocked** — ask whether to proceed with writing the deploy workflow, pushing site code, enabling Pages, and amending the course repo's `docs/README.md`.

Then **stop.** This is the final loop; there is no loop after it. Do not create any remote repo, push site code, enable Pages, or touch `~/graph-engineering-course` until the user answers.
