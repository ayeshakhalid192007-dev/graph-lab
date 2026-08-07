# Loop 1 gate

```
npm run verify:1
```

Expands to: `sync:check` → `check:content-shape` → `typecheck` → `build`

---

## Exit condition

`npm run verify:1` green — a static export builds, `content/` holds 86+ synced files pinned to a commit, and both content checks pass.

---

## What green must actually mean

Read the output. Confirm each of these and record the number, not the word:

- [ ] `sync:check` diffed **0 files** against the commit pinned in `content/SOURCE.json`
- [ ] `check:content-shape` parsed **7/7 quizzes** and **6/6 flashcard sets**
- [ ] `tsc --noEmit` clean
- [ ] `next build` emitted a static export without error
- [ ] `content/` holds **86+ files** across `docs/`, `patterns/`, `starters/`, `resources/`
- [ ] `content/SOURCE.json` pins a real commit sha, not a placeholder
- [ ] `sync:check` was **observed going red** on a deliberate hand-edit and green again after revert (Task 3.5)

A gate that has never been observed failing is not known to work.

---

## Goal lines this loop moves

From `shared/goal.md`. None are *ticked* here — Loop 5 Task 21 ticks them against the running site — but this loop is what makes them reachable:

- `sync:check`, `check-content-shape`, `next build`, and `tsc --noEmit` all pass → **the pipeline half of the last DoD line is now real.**
- Everything else in the DoD depends on `content/` existing and the shell rendering.

---

## Before stopping

- [ ] Every Task 1–4 checkbox in `tasks.md` ticked
- [ ] Corresponding step checkboxes ticked in `plan/2026-08-07-graph-lab-implementation-plan.md`
- [ ] Four task entries in `state.md` — one per task, each with real verification output
- [ ] Gate entry appended to `shared/state.md`
- [ ] Loop 1 row in the Gate ledger set to `gate green, awaiting review`
- [ ] Any repairs, decisions, or blockers recorded in the right file
- [ ] Committed

---

## Report

1. The gate command and **its actual output**.
2. Tasks 1–4, one line each: what landed.
3. Anything under *Blockers*, *Cross-loop repairs*, *Decisions*, or *Open questions*.
4. The Loop 2 command, from `loops/loop-2-render/loop.md`, for the user to run when ready.

Then **stop.** Do not start Loop 2. Do not offer to. Do not begin "just the first task" of it.

The user reviews, moves the ledger row to `approved`, and starts Loop 2 by hand.
