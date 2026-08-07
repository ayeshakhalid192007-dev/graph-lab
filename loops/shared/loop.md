# Shared loop protocol

**Every loop obeys this file.** A loop's own `loop.md` adds scope and boundaries on top; it never contradicts what is here.

---

## Execution model

Five separate, independent `/loop` instances — **one per loop.** Not one loop reused across loops. Not one combined loop spanning the whole build.

Each loop is created fresh only after the previous loop's gate has been reviewed and approved by the user. Each stops permanently at its own gate.

**Loops share no runtime state.** They hand off through files on disk:

```
plan/2026-08-07-graph-lab-implementation-plan.md   step checkboxes
loops/loop-N-*/tasks.md                            task checkboxes
loops/loop-N-*/state.md                            that loop's log
loops/shared/state.md                              gate ledger, cross-loop repairs, decisions
```

Loops are **self-paced** — no interval argument. Build work paces itself off verification results, not a clock.

---

## The five rules

### 1. A loop only ever touches its own tasks

Your loop's task range is in your `loop.md`. Work outside it is out of bounds.

If you find a defect in an earlier loop's output, **fix it** — a broken foundation is not something to build on — and record the fix in `shared/state.md` under *Cross-loop repairs*. That is a repair, not a licence to start a later loop's work.

If you find that a later loop's task would be convenient to do now, **do not do it.** Note it in `shared/state.md` under *Decisions* and leave it.

### 2. A loop stops permanently at its gate

No loop hands off to the next automatically. When your gate is green:

1. Append the gate entry to `shared/state.md`.
2. Report the gate command's actual output.
3. **Stop.** Do not start the next loop, do not offer to, do not begin "just the first task" of it.

The user reviews, then starts the next loop by hand.

### 3. State files are the handoff

Every completed task appends **one entry** to your loop's `state.md`, using the template in `handoff.md`. Every cleared gate appends one entry to `shared/state.md`.

An entry records what landed, **what the verification actually printed**, and anything the next loop needs to know. "Task 7 done" is not an entry.

### 4. Verification before checkbox

A checkbox is ticked only after its command was run **and its output read**. A red command means the task is not done.

Never write "should pass", "will pass", or "passes" about a command you did not run. Evidence before assertions, always.

### 5. A blocked loop stops and reports

Blocked ≠ done. If a step cannot proceed — missing input, an ambiguity the spec does not settle, a decision that is the user's to make — record it under *Blockers* in your loop's `state.md`, stop, and report. Do not invent an answer and do not work around it silently.

---

## The per-task cycle

```
read      the next unchecked task in tasks.md, and its section in the plan
build     exactly what that task's Files and Interfaces sections describe
verify    run the task's verification command; read the output
tick      the checkboxes — in tasks.md and in the plan
record    append one entry to loops/loop-N-*/state.md
commit    conventional-commit message, as the task's final step names it
```

Then repeat with the next unchecked task. When the last task in your range is ticked, run the gate.

---

## Interfaces are contracts

Each task in the plan has a **Consumes / Produces** block. The `Produces` half is a contract that later tasks — often in later loops — import by name.

- Do not rename an exported symbol a later task imports.
- Do not change a type signature the plan states.
- If a signature in the plan is genuinely wrong, that is a *Decision*: record it in `shared/state.md`, state what changed and which downstream tasks are affected, then proceed.

---

## Sub-skill

Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to work the plan task by task.

---

## Scope discipline

A loop is a fence, not a suggestion. The two failure modes to watch for in yourself:

**Creep forward** — "this is quick, and Loop 4 needs it anyway." It breaks the review gate, which is the whole point of the structure. Don't.

**Creep sideways** — polishing, refactoring, or improving something the task did not ask for. The plan is deliberate about what is and is not built. If something looks wrong, it is a *Decision* to record, not a licence to rewrite.

---

## Reporting at the gate

When you stop, report:

1. The gate command you ran and **its actual output**.
2. Each task in your range, one line: what landed.
3. Anything under *Blockers*, *Cross-loop repairs*, or *Decisions* the user should see.
4. The exact `/loop` command for the next loop — from that loop's `loop.md` — so the user can start it when ready.
