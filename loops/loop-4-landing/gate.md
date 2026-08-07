# Loop 4 gate

```
npm run verify:4
```

Expands to: `verify:2` → which is `verify:1` (`sync:check` → `check:content-shape` → `typecheck` → `build`) → `check:links`

Cumulative on purpose — Loop 4 cannot silently break Loop 2's link check.

---

## Exit condition

`npm run verify:4` green, and **every** route in the spec's route table now renders — `/`, `/docs/[...slug]/`, `/tracks/`, `/patterns/`, `/patterns/[slug]/`, `/quiz/[part]/`, `/flashcards/[part]/`, `/projects/`, `/resources/`, `/certification/`, `/sitemap.xml`, `/llms.txt`, `/404`.

After this loop the site is feature-complete. Loop 5 polishes and deploys it; it does not add surfaces.

---

## What green must actually mean

Record the number, not the word:

- [ ] `check:links` reported **0 unresolved internal links** — now including the landing page
- [ ] `sync:check` still diffs **0 files**
- [ ] `tsc --noEmit` clean
- [ ] `/` renders the real landing page — **Loop 1's placeholder is gone**
- [ ] The `SearchDialog` slot in `NavBar` is **filled**, not empty
- [ ] Search returned correct results for **three known terms**: one from a body paragraph, one from a heading, one from a page title
- [ ] `public/search-index.json` is **under ~400 KB** pre-compression — record the actual size. Over that, headings-only is the fallback
- [ ] The index loads **lazily** — nothing downloaded before the first keystroke or `Cmd/Ctrl-K`
- [ ] All three animated diagrams render, and **all motion is suppressed** under `prefers-reduced-motion: reduce` — verified, not assumed
- [ ] `/sitemap.xml`, `/llms.txt`, and `/404` all emit
- [ ] The landing copy is a **third independent phrasing** — checked against both `~/graph-engineering-course/README.md` and `content/docs/README.md`, not just written

---

## Goal lines this loop moves

From `shared/goal.md`. Not ticked here — Loop 5 Task 21 ticks them against the running site:

- *Search returns correct results for a term drawn from a body paragraph, a heading, and a page title.*

Everything else in the DoD is now **reachable** — Loop 5 verifies the whole list against the running site.

---

## Before stopping

- [ ] Every Task 15–18 checkbox in `tasks.md` ticked
- [ ] Corresponding step checkboxes ticked in the plan
- [ ] Four task entries in `state.md`, each with real verification output
- [ ] **Landing copy drafted under "Landing copy" in `state.md`** — reviewable on its own, not only as JSX
- [ ] Search index size recorded
- [ ] Gate entry appended to `shared/state.md`
- [ ] Loop 4 row set to `gate green, awaiting review`
- [ ] Any repairs, decisions, or blockers recorded
- [ ] Committed

---

## Report

1. The gate command and **its actual output**.
2. **The landing copy**, quoted — it is the only new prose in the project and deserves its own review.
3. The search index size, and the three test terms with their results.
4. Tasks 15–18, one line each.
5. Anything under *Blockers*, *Cross-loop repairs*, *Decisions*, or *Known deviations*.
6. The Loop 5 command, from `loops/loop-5-deploy/loop.md`.

Then **stop.** Do not start Loop 5. Loop 5 contains the deploy, which is gated on explicit confirmation — do not move toward it.
