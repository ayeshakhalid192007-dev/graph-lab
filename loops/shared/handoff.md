# Handoff contract

Loops share no runtime state. A loop starts cold, knowing only what it reads from disk. **This file is the format of what it reads.**

---

## What a loop reads at start

In this order, every time:

1. `CLAUDE.md` — standing rules
2. `loops/shared/goal.md` — what the project is for
3. `loops/shared/constraints.md` — what binds every task
4. `loops/shared/state.md` — which gates cleared, what was repaired, what was decided
5. `loops/loop-N-*/loop.md` — its own scope and boundaries
6. `loops/loop-N-*/tasks.md` — its own checkboxes
7. `loops/loop-<N-1>-*/state.md` — the previous loop's log, if there is one
8. `plan/2026-08-07-graph-lab-implementation-plan.md` — its own task sections

It does **not** read the state files of loops other than its own and its immediate predecessor unless something points it there.

---

## What a loop writes

| Event | File | Section |
| --- | --- | --- |
| Task completed | `loops/loop-N-*/state.md` | Task log |
| Gate cleared | `loops/shared/state.md` | Gate ledger |
| Earlier loop's defect fixed | `loops/shared/state.md` | Cross-loop repairs |
| Decision binding later loops | `loops/shared/state.md` | Decisions |
| Blocked | `loops/loop-N-*/state.md` | Blockers — then stop |
| Spec deviation found | `loops/shared/state.md` | Known deviations |

---

## Task entry template

One entry per completed task, appended to your loop's `state.md`.

```markdown
### Task <n> — <title>

**Date:** YYYY-MM-DD
**Landed:** what now exists that did not before, in one or two sentences.
**Files:** created / modified, as paths.
**Produces:** the exported symbols and types later tasks import by name.
**Verified by:** the command run, and what it actually printed — a count, a
score, a page total. Not "green".
**Next loop needs to know:** anything non-obvious. Delete the line if nothing.
```

---

## Gate entry template

Appended to `shared/state.md` when your gate goes green and you stop.

```markdown
### Loop <n> gate — <date>

**Command:** `npm run verify:<n>`
**Output:** the actual result — what built, what counted, what passed.
**Tasks completed:** <range>, one line each.
**Carried forward:** repairs, decisions, or blockers the next loop must see.
**Status:** gate green, awaiting review.
```

Then set your row in the Gate ledger table to `gate green, awaiting review` and **stop.** Only the user moves it to `approved`.

---

## What "next loop needs to know" actually means

The next loop cannot see your reasoning, your terminal, or this conversation. Write the things that are true but not discoverable from the code:

- **An interface that differs from the plan.** The plan says `getRoadmap()` returns X; you returned Y and why.
- **A count that surprised you.** 87 doc files where the spec says 86, and which one is extra.
- **A workaround with a reason.** Something that looks wrong but is deliberate — say so, or a later loop will "fix" it.
- **A trap you hit.** A build that fails unless something runs first; an ordering dependency the plan does not state.
- **Something deferred.** Work you correctly did not do, so the next loop knows it is missing on purpose.

Do not write: restatements of the plan, narration of the process, or "everything went well".

---

## Interfaces are contracts

Each plan task has a **Consumes / Produces** block. `Produces` is what later tasks import **by name**. Record the real, shipped signature in your task entry — not the planned one, if they differ.

If a signature had to change, that is a *Decision* in `shared/state.md` naming which downstream tasks are affected. A renamed export that goes unrecorded is how a later loop's build breaks for a reason nobody can find.

---

## The rule that makes this work

**A loop stops permanently at its gate.** It does not hand off automatically, does not start the next loop, does not offer to. The user reads the report, reviews the work, and starts the next loop by hand.

That gap is the review. The handoff files exist so nothing is lost across it.
